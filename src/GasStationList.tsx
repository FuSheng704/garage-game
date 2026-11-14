
import React, { useEffect, useMemo, useRef, useState } from 'react';
import pitMainBg from './assets/pit-bg.png';
import pitBg from './assets/pit-bg.png';
import glitterBullet from './assets/glitter-bullet.png';
import helmetImg from './assets/helmet.png';
import osbornTableBg from './assets/osborn-table-bg.png';
import osbornHand from './assets/osborn-hand.png';
import './GasStationList.css';
import { apiRequest } from './api/client';

interface BackendRecordItem {
  id: number;
  category_id: number;
  title: string;
  category_name: string;
  summary?: string | null;
  content: string | null;
  event_overview?: string | null;
  problem_points?: string | null;
  demands?: string | null;
  rights_copy?: string | null;
  handling_status?: string | null;
  related_url?: string | null;
  created_at: string;
}

interface BackendResp {
  records: BackendRecordItem[];
}

interface RecordItem {
  id: number;
  shortTitle: string;
  categoryId: number;
  legacyContent: string;
  title: string;
  subDesc: string;
  category: string;
  date: string;
  dateKey: number;
  status: '未处理' | '已修改' | '有回应' | '暂无状态';
  overview: string;
  issue: string;
  demand: string;
  textContent: string;
  link: string;
}

function legacyPlainText(value: string | null): string {
  if (!value) return '';
  if (!/<[a-z][^>]*>/i.test(value)) return value;
  const template = document.createElement('template');
  template.innerHTML = value;
  template.content.querySelectorAll('script, style, template').forEach((element) => element.remove());
  template.content.querySelectorAll('br, p, div, li').forEach((element) => element.after('\n'));
  return template.content.textContent?.trim() ?? '';
}

function safeRelatedUrl(value?: string | null): string {
  if (!value) return '';
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '';
  } catch {
    return '';
  }
}

type DetailBlockKey =
  | 'legacyContent'
  | 'overview'
  | 'issue'
  | 'demand'
  | 'text'
  | 'link';

// 设计画布尺寸
const DESIGN_WIDTH = 1591;
const DESIGN_HEIGHT = 895;

// 动画时长
const PANEL_MOTION_MS = 480;
const DETAIL_REVEAL_DELAY_MS = 100;

type StagePosition = {
  scale: number;
  left: number;
  top: number;
  isMobile: boolean;
  isPortrait: boolean;
};

/**
 * 等比缩放
 *
 * 只使用一个 scale。
 * 不使用 scaleX、scaleY 分别缩放。
 *
 * 窗口比例与设计稿不一致时：
 * 页面完整显示，居中留白，不拉伸。
 */
function calculateStagePosition(
  viewportWidth: number,
  viewportHeight: number
): StagePosition {
  const width = Math.max(1, viewportWidth);
  const height = Math.max(1, viewportHeight);

  // 桌面端沿用原有 1591×895 画布与等比缩放逻辑，不改动其布局。
  // 1024px 以下切换到 Figma 的 667×375 移动端横屏画布；
  // 竖屏使用同一套元素的 375×667 重排布局。
  const isMobile = width < 1024;
  const isPortrait = isMobile && height >= width;
  const designWidth = isMobile ? (isPortrait ? 375 : 667) : DESIGN_WIDTH;
  const designHeight = isMobile ? (isPortrait ? 667 : 375) : DESIGN_HEIGHT;

  const scale = Math.min(width / designWidth, height / designHeight);

  return {
    scale,
    left: (width - designWidth * scale) / 2,
    top: (height - designHeight * scale) / 2,
    isMobile,
    isPortrait,
  };
}

function useStagePosition(): StagePosition {
  const [position, setPosition] = useState<StagePosition>(() =>
    typeof window === 'undefined'
      ? { scale: 1, left: 0, top: 0, isMobile: false, isPortrait: false }
      : calculateStagePosition(
          window.innerWidth,
          window.innerHeight
        )
  );

  useEffect(() => {
    const resize = () => {
      setPosition(
        calculateStagePosition(
          window.innerWidth,
          window.innerHeight
        )
      );
    };

    resize();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return position;
}

function backendToFrontend(
  backendItem: BackendRecordItem
): RecordItem {
  const date = new Date(backendItem.created_at);
  const validDate = Number.isFinite(date.getTime());
  const month = validDate
    ? new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit' }).formatToParts(date)
    : [];
  const year = Number(month.find((part) => part.type === 'year')?.value);
  const monthNumber = Number(month.find((part) => part.type === 'month')?.value);
  const statuses = { unhandled: '未处理', modified: '已修改', responded: '有回应' } as const;
  const status = backendItem.handling_status;

  return {
    id: backendItem.id,
    shortTitle: backendItem.title.slice(0, 12),
    title: backendItem.title,
    subDesc: backendItem.summary ?? '',
    categoryId: backendItem.category_id,
    category: backendItem.category_name,
    date: validDate ? `${year}.${monthNumber}` : '—',
    dateKey: validDate ? year * 100 + monthNumber : 0,
    status: status === 'unhandled' || status === 'modified' || status === 'responded'
      ? statuses[status]
      : '暂无状态',
    overview: backendItem.event_overview ?? '',
    issue: backendItem.problem_points ?? '',
    demand: backendItem.demands ?? '',
    textContent: backendItem.rights_copy ?? '',
    legacyContent: legacyPlainText(backendItem.content),
    link: safeRelatedUrl(backendItem.related_url),
  };
}

type DetailGlyphKind =
  | 'overview'
  | 'issue'
  | 'demand'
  | 'text'
  | 'link'
  | 'progress'
  | 'copy'
  | 'external';

const DetailGlyph: React.FC<{
  kind: DetailGlyphKind;
  size?: number;
}> = ({ kind, size = 21 }) => {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...common}
    >
      {kind === 'overview' && (
        <path d="M12 2c2 3.2-1 5.5 2.4 8.2.5-2 1.9-3 2.6-3.5 1 2.3 3.4 5.3 3.4 8.4A7.4 7.4 0 0 1 12 22a7.4 7.4 0 0 1-7.4-6.9c0-3.5 2.1-6.2 4.4-8.1-.2 3 1.5 4.2 2.2 4.5C12.7 8.8 11.6 5.5 12 2Z M12 14c1.7 2 2.4 3.1 2.4 4.1a2.4 2.4 0 0 1-4.8 0c0-1.2.8-2.5 2.4-4.1Z" />
      )}

      {kind === 'issue' && (
        <>
          <circle cx="10.6" cy="10.6" r="7" />
          <path d="m16 16 5 5" />
        </>
      )}

      {kind === 'demand' && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v6M12 7h.01" />
        </>
      )}

      {kind === 'text' && (
        <>
          <path d="M6 2.5h8l5 5V21H6z" />
          <path d="M14 2.5v5h5M9 12h7M9 16h7" />
        </>
      )}

      {kind === 'link' && (
        <>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 9.5v5M9.5 12h5" />
        </>
      )}

      {kind === 'progress' && (
        <path d="m4 4 8 8-8 8M12 4l8 8-8 8" />
      )}

      {kind === 'copy' && (
        <>
          <rect x="8" y="8" width="12" height="13" rx="2" />
          <path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2" />
        </>
      )}

      {kind === 'external' && (
        <>
          <path d="M13 4h7v7M20 4l-9 9" />
          <path d="M20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6" />
        </>
      )}
    </svg>
  );
};

const GasStationPage: React.FC = () => {
  const stage = useStagePosition();

  const [page, setPage] =
    useState<'splash' | 'list'>('splash');

  const [selectedItem, setSelectedItem] =
    useState<RecordItem | null>(null);

  const [panelCollapsed, setPanelCollapsed] =
    useState(false);

  const [detailVisible, setDetailVisible] =
    useState(false);

  const closeTimerRef = useRef<number | null>(null);
  const revealTimerRef = useRef<number | null>(null);

  // 复制结果使用非阻塞提示，电脑端和移动端均自动消失。
  const [copyToast, setCopyToast] = useState('');
  const copyToastTimerRef = useRef<number | null>(null);

  const [searchKey, setSearchKey] = useState('');
  // 移动端按 Figma：默认只显示右上角搜索图标，点击后展开搜索框。
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] =
    useState<number | undefined>(undefined);

  const [listError, setListError] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);

  const [recordList, setRecordList] =
    useState<RecordItem[]>([]);

  const [loading, setLoading] = useState(false);

  const [isBgmPlaying, setIsBgmPlaying] =
    useState(false);

  const [startYear, setStartYear] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  const [endMonth, setEndMonth] = useState('');

  const audioRef = useRef<HTMLAudioElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }

      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current);
      }

      if (copyToastTimerRef.current !== null) {
        window.clearTimeout(copyToastTimerRef.current);
      }
    };
  }, []);

  const clearMotionTimers = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (page !== 'list') return;

    const controller = new AbortController();
    setLoading(true);
    setListError(false);

    apiRequest<BackendResp>('/v1/rights-records', {
      auth: false,
      responseType: 'json',
      signal: controller.signal,
    })
      .then((response) => {
        if (!controller.signal.aborted) setRecordList(response.records.map(backendToFrontend));
      })
      .catch(() => {
        if (!controller.signal.aborted) setListError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [page, reloadCount]);

  const categoryMap = useMemo(() => Array.from(
    new Map(recordList.map((item) => [item.categoryId, item.category])),
    ([id, name]) => ({ id, name })
  ).sort((left, right) => left.id - right.id), [recordList]);

  const filteredRecords = useMemo(() => {
    const start =
      startYear && startMonth
        ? Number(startYear) * 100 +
          Number(startMonth)
        : null;

    const end =
      endYear && endMonth
        ? Number(endYear) * 100 +
          Number(endMonth)
        : null;

    const keyword = searchKey.trim().toLowerCase();

    return recordList.filter((item) => {
      if (selectedCategoryId !== undefined && item.categoryId !== selectedCategoryId) return false;
      if (keyword && !item.legacyContent.toLowerCase().includes(keyword)) return false;

      if (
        start !== null &&
        item.dateKey < start
      ) {
        return false;
      }

      if (
        end !== null &&
        item.dateKey > end
      ) {
        return false;
      }

      return true;
    });
  }, [
    recordList,
    selectedCategoryId,
    searchKey,
    startYear,
    startMonth,
    endYear,
    endMonth,
  ]);

  const showCopyToast = (message: string) => {
    if (copyToastTimerRef.current !== null) {
      window.clearTimeout(copyToastTimerRef.current);
    }

    setCopyToast(message);
    copyToastTimerRef.current = window.setTimeout(() => {
      setCopyToast('');
      copyToastTimerRef.current = null;
    }, 1500);
  };

  const copyText = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      showCopyToast('复制成功');
    } catch {
      showCopyToast('复制失败，请重试');
    }
  };

  const backToList = () => {
    clearMotionTimers();

    setPanelCollapsed(false);
    setDetailVisible(false);

    closeTimerRef.current =
      window.setTimeout(() => {
        setSelectedItem(null);
        closeTimerRef.current = null;
      }, PANEL_MOTION_MS);
  };

  const handleClickItem = (item: RecordItem) => {
    if (
      panelCollapsed &&
      selectedItem?.id === item.id
    ) {
      backToList();
      return;
    }

    clearMotionTimers();

    const wasCollapsed = panelCollapsed;

    setSelectedItem(item);
    setPanelCollapsed(true);
    setMobileSearchOpen(false);

    if (!wasCollapsed) {
      setDetailVisible(false);

      revealTimerRef.current =
        window.setTimeout(() => {
          setDetailVisible(true);
          revealTimerRef.current = null;
        }, DETAIL_REVEAL_DELAY_MS);
    } else {
      setDetailVisible(true);
    }
  };

  const backToSplash = () => {
    clearMotionTimers();

    audioRef.current?.pause();

    setIsBgmPlaying(false);
    setSelectedItem(null);
    setPanelCollapsed(false);
    setDetailVisible(false);
    setMobileSearchOpen(false);
    setPage('splash');
  };

  const toggleBGM = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isBgmPlaying) {
      audio.pause();
      setIsBgmPlaying(false);
    } else {
      void audio
        .play()
        .then(() => {
          setIsBgmPlaying(true);
        })
        .catch((error: unknown) => {
          console.warn(
            'BGM 播放失败，请确认 public/bgm.mp3 存在。',
            error
          );
        });
    }
  };

  const handleCategoryClick = (
    catId: number | undefined
  ) => {
    setSelectedCategoryId((prev) =>
      prev === catId ? undefined : catId
    );
  };

  const changeDateInput = (
    value: string,
    setter: (v: string) => void,
    maxLength: number
  ) => {
    setter(
      value.replace(/\D/g, '').slice(0, maxLength)
    );
  };

  // 只清空发布日期范围，不影响搜索词和问题类型筛选。
  const clearDateFilter = () => {
    setStartYear('');
    setStartMonth('');
    setEndYear('');
    setEndMonth('');
  };

  const renderRow = (
    item: RecordItem,
    index: number,
    collapsed: boolean
  ) => {
    const seqNo = String(index + 1).padStart(
      2,
      '0'
    );

    return (
      <button
        type="button"
        key={item.id}
        className={`pit-record ${
          collapsed ? 'pit-record--small' : ''
        } ${
          selectedItem?.id === item.id
            ? 'pit-record--selected'
            : ''
        }`}
        onClick={() => handleClickItem(item)}
        title={
          panelCollapsed &&
          selectedItem?.id === item.id
            ? '再次点击返回完整列表'
            : item.title
        }
        tabIndex={
          panelCollapsed === collapsed ? 0 : -1
        }
      >
        <span className="pit-record-index">
          <span>{seqNo[0]}</span>
          {seqNo[1]}
        </span>

        <span className="pit-record-main">
          <span className="pit-record-title">
            {collapsed
              ? item.shortTitle
              : item.title}
          </span>

          {!collapsed && (
            <span className="pit-record-summary">
              {item.subDesc}
            </span>
          )}
        </span>

        {!collapsed && (
          <>
            <span className="pit-record-category">
              <span
                className={`pit-category-tag pit-category-tag--${
                  item.category === '生日活动' ||
                  item.category === '文案内容' ||
                  item.category === '线下活动'
                    ? 'blue'
                    : 'red'
                }`}
              >
                {item.category}
              </span>
            </span>

            <span className="pit-record-date">
              {item.date}
            </span>

            <span
              className={`pit-record-status pit-record-status--${
                item.status === '未处理'
                  ? 'pending'
                  : item.status === '已修改'
                  ? 'updated'
                  : item.status === '有回应' ? 'replied' : 'unknown'
              }`}
            >
              <span className="pit-status-dot" />
              {item.status}
            </span>
          </>
        )}
      </button>
    );
  };

  const renderDetailBlock = (
    key: DetailBlockKey,
    chinese: string,
    english: string,
    kind: DetailGlyphKind,
    className = ''
  ) => {
    if (!selectedItem) return null;

    const value =
      selectedItem[
        key === 'text' ? 'textContent' : key
      ];

    const isBulletList =
      (key === 'issue' || key === 'demand') &&
      Boolean(value);

    const isNumberedText =
      key === 'text' &&
      /^1[.、]/.test(value.trim());

    return (
      <section
        className={`pit-detail-block ${className}`}
        key={key}
      >
        <div className="pit-detail-block-heading">
          <div className="pit-detail-block-toggle">
            <span className="pit-detail-glyph">
              <DetailGlyph kind={kind} />
            </span>

            <span className="pit-detail-block-cn">
              {chinese}
            </span>

            <span className="pit-detail-block-en">
              {english}
            </span>
          </div>

          {(key === 'text' || key === 'legacyContent') && value && (
            <button
              type="button"
              className="pit-detail-copy-icon"
              onClick={() => void copyText(value)}
              aria-label={`复制${chinese}`}
              title={`复制${chinese}`}
            >
              <DetailGlyph
                kind="copy"
                size={17}
              />
            </button>
          )}
        </div>

        {key === 'link' ? (
            <div className="pit-detail-address-actions">
              <div className="pit-detail-link-control">
                <button
                  type="button"
                  onClick={() => void copyText(value)}
                  disabled={!value}
                  title="复制维权地址"
                >
                  <DetailGlyph
                    kind="link"
                    size={16}
                  />
                  复制链接
                </button>

                {value && (
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="在新窗口打开维权地址"
                    title="打开维权地址"
                  >
                    <DetailGlyph
                      kind="external"
                      size={17}
                    />
                  </a>
                )}
              </div>
            </div>
          ) : isBulletList ? (
            <ul className="pit-detail-block-body pit-detail-bullets">
              {value
                .split('\n')
                .filter(Boolean)
                .map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
            </ul>
          ) : isNumberedText ? (
            <ol className="pit-detail-block-body pit-detail-numbered">
              {value
                .split('\n')
                .filter(Boolean)
                .map((line, i) => (
                  <li key={i}>
                    {line.replace(
                      /^\d+[.、]\s*/,
                      ''
                    )}
                  </li>
                ))}
            </ol>
          ) : (
            <p className="pit-detail-block-body" style={{ whiteSpace: 'pre-wrap' }}>
              {value || '暂无内容'}
            </p>
          )}
      </section>
    );
  };

  return (
    <div className="pit-viewport">
      <div
        className={`pit-stage${stage.isMobile ? ' pit-stage--mobile' : ''}${stage.isPortrait ? ' pit-stage--portrait' : ''}`}
        style={{
          transform: `translate(${stage.left}px, ${stage.top}px) scale(${stage.scale})`,
        }}
      >
        {page === 'splash' ? (
          <div
            className="pit-splash"
            style={{
              backgroundImage: `url(${pitMainBg})`,
            }}
          >
            <button
              type="button"
              className="pit-splash-entry"
              onClick={() => setPage('list')}
              title="点击屏幕，进入维修区讯号系统"
              aria-label="进入维修区讯号系统"
            />
          </div>
        ) : (
          <main
            className="pit-scene"
            style={{
              backgroundImage: `url(${pitBg})`,
            }}
          >
            <div
              className="pit-scene-shade"
              aria-hidden="true"
            />

            <audio
              ref={audioRef}
              src="/bgm.mp3"
              loop
            />

            <header
              className={`pit-header ${
                selectedItem
                  ? 'pit-header--detail'
                  : ''
              }`}
            >
              <button
                type="button"
                className="pit-back"
                onClick={backToSplash}
                aria-label="返回开屏主页"
                title="返回开屏主页"
              >
                <svg
                  viewBox="0 0 55 52"
                  width="55"
                  height="52"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M28 4 L7 26 L28 48 M49 4 L28 26 L49 48"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinejoin="miter"
                  />
                </svg>
              </button>

              <div className="pit-brand">
                <h1>维修区讯号</h1>
                <div>PIT SIGNAL</div>
              </div>

              <img
                className="pit-mobile-header-signature"
                src={osbornHand}
                alt=""
                aria-hidden="true"
              />

              <div
                className="pit-red-slash"
                aria-hidden="true"
              />

              <div className="pit-headline">
                <div>
                  查看最新维权事件，获取参与方式并跟进处理结果
                </div>
                <p>
                  TRACK THE ISSUES. TAKE ACTION.
                  SEE THE RESULTS.
                </p>
              </div>

              <button
                type="button"
                className="pit-system"
                onClick={toggleBGM}
                title={
                  isBgmPlaying
                    ? '暂停 BGM'
                    : '播放 BGM'
                }
              >
                <span>
                  R1 // Glitter Bullet
                  <br />
                  PIT system
                </span>

                <span
                  className="pit-system-chevrons"
                  aria-hidden="true"
                >
                  »
                </span>
              </button>

              <form
                className={`pit-search ${
                  panelCollapsed
                    ? 'pit-search--hidden'
                    : ''
                } ${mobileSearchOpen ? 'pit-search--mobile-open' : ''}`}
                aria-hidden={panelCollapsed}
                onSubmit={(event) => {
                  event.preventDefault();
                  searchRef.current?.blur();
                  setMobileSearchOpen(false);
                }}
              >
                <svg
                  className="pit-search-icon"
                  viewBox="0 0 24 24"
                  width="25"
                  height="25"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="10.5"
                    cy="10.5"
                    r="7.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M16.5 16.5 L22 22"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  />
                </svg>

                <input
                  tabIndex={
                    panelCollapsed ? -1 : 0
                  }
                  ref={searchRef}
                  value={searchKey}
                  onChange={(event) =>
                    setSearchKey(
                      event.target.value
                    )
                  }
                  placeholder="搜索维权正文…"
                  aria-label="搜索维权正文"
                />

                <span className="pit-search-enter">
                  / ENTER
                </span>

                <button
                  type="submit"
                  tabIndex={
                    panelCollapsed ? -1 : 0
                  }
                >
                  搜索
                </button>
              </form>

              <button
                type="button"
                className={`pit-mobile-search-toggle${panelCollapsed ? ' pit-mobile-search-toggle--hidden' : ''}${mobileSearchOpen ? ' pit-mobile-search-toggle--open' : ''}`}
                onClick={() => {
                  setMobileSearchOpen((open) => !open);
                  if (!mobileSearchOpen) {
                    window.requestAnimationFrame(() => searchRef.current?.focus());
                  }
                }}
                aria-label={mobileSearchOpen ? '收起搜索' : '展开搜索'}
                aria-expanded={mobileSearchOpen}
                title={mobileSearchOpen ? '收起搜索' : '展开搜索'}
                tabIndex={stage.isMobile && !panelCollapsed ? 0 : -1}
              >
                {mobileSearchOpen ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                    <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
                    <circle cx="10.5" cy="10.5" r="7.5" stroke="currentColor" strokeWidth="2.2" />
                    <path d="M16.5 16.5 L22 22" stroke="currentColor" strokeWidth="2.2" />
                  </svg>
                )}
              </button>
            </header>

            <section
              className={`pit-table ${
                panelCollapsed
                  ? 'pit-table--collapsed'
                  : ''
              }`}
              aria-label="维权事件列表"
            >
              <div
                className="pit-table-view pit-table-view--full"
                aria-hidden={panelCollapsed}
              >
                <div className="pit-table-head">
                  <span className="pit-table-head-index">
                    #
                  </span>
                  <span>
                    维权标题 <small>ISSUE</small>
                  </span>
                  <span>
                    分类 <small>CATEGORY</small>
                  </span>
                  <span>
                    发布/更新{' '}
                    <small>CATEGORY</small>
                  </span>
                  <span>
                    处理情况{' '}
                    <small>STATUS</small>
                  </span>
                </div>

                <div className="pit-table-body">
                  <div
                    className="pit-table-watermark"
                    style={{
                      backgroundImage: `url(${osbornTableBg})`,
                    }}
                    aria-hidden="true"
                  />

                  {loading ? (
                    <div className="pit-table-empty">
                      加载中...
                    </div>
                  ) : listError ? (
                    <div className="pit-table-empty">
                      加载失败。 <button type="button" onClick={() => setReloadCount((count) => count + 1)}>重试</button>
                    </div>
                  ) : filteredRecords.length === 0 ? (
                    <div className="pit-table-empty">
                      暂无数据
                    </div>
                  ) : (
                    filteredRecords.map(
                      (item, index) =>
                        renderRow(
                          item,
                          index,
                          false
                        )
                    )
                  )}
                </div>
              </div>

              <div
                className="pit-table-view pit-table-view--small"
                aria-hidden={!panelCollapsed}
              >
                <div className="pit-table-head">
                  <span className="pit-table-head-index">
                    #
                  </span>

                  <button
                    type="button"
                    className="pit-table-small-heading"
                    onClick={backToList}
                    tabIndex={
                      panelCollapsed ? 0 : -1
                    }
                    title="返回完整列表"
                  >
                    维权标题{' '}
                    <small>ISSUE</small>
                  </button>
                </div>

                <div className="pit-table-body">
                  {loading ? (
                    <div className="pit-table-empty">
                      加载中...
                    </div>
                  ) : listError ? (
                    <div className="pit-table-empty">
                      加载失败。 <button type="button" onClick={() => setReloadCount((count) => count + 1)}>重试</button>
                    </div>
                  ) : filteredRecords.length === 0 ? (
                    <div className="pit-table-empty">
                      暂无数据
                    </div>
                  ) : (
                    filteredRecords.map(
                      (item, index) =>
                        renderRow(
                          item,
                          index,
                          true
                        )
                    )
                  )}
                </div>
              </div>
            </section>

            <aside
              className={`pit-filter ${
                panelCollapsed
                  ? 'pit-filter--hidden'
                  : ''
              }`}
              aria-label="筛选条件"
              aria-hidden={panelCollapsed}
            >
              <div className="pit-filter-heading">
                问题类型 <span>Filter</span>
              </div>

              <div className="pit-filter-buttons">
                {categoryMap.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    tabIndex={
                      panelCollapsed ? -1 : 0
                    }
                    className={
                      selectedCategoryId ===
                        cat.id
                        ? 'pit-filter-active'
                        : ''
                    }
                    onClick={() =>
                      handleCategoryClick(cat.id)
                    }
                    aria-pressed={
                      selectedCategoryId ===
                        cat.id
                    }
                  >
                    {cat.name}
                  </button>
                ))}

              </div>

              <div className="pit-date-heading">
                发布日期 <span>Date</span>
                <button
                  type="button"
                  className="pit-date-clear"
                  onClick={clearDateFilter}
                  tabIndex={panelCollapsed ? -1 : 0}
                  aria-label="清空筛选日期"
                  title="清空筛选日期"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 7h16M9 7V4h6v3M6.5 7l.7 13h9.6l.7-13M10 11v6M14 11v6" />
                  </svg>
                </button>
              </div>

              <div className="pit-date-inputs">
                <div className="pit-date-line">
                  <input
                    tabIndex={
                      panelCollapsed ? -1 : 0
                    }
                    aria-label="开始年份"
                    inputMode="numeric"
                    value={startYear}
                    onChange={(e) =>
                      changeDateInput(
                        e.target.value,
                        setStartYear,
                        4
                      )
                    }
                  />
                  <span>年</span>

                  <input
                    tabIndex={
                      panelCollapsed ? -1 : 0
                    }
                    aria-label="开始月份"
                    inputMode="numeric"
                    value={startMonth}
                    onChange={(e) =>
                      changeDateInput(
                        e.target.value,
                        setStartMonth,
                        2
                      )
                    }
                  />
                  <span>月</span>
                </div>

                <div className="pit-date-line">
                  <input
                    tabIndex={
                      panelCollapsed ? -1 : 0
                    }
                    aria-label="结束年份"
                    inputMode="numeric"
                    value={endYear}
                    onChange={(e) =>
                      changeDateInput(
                        e.target.value,
                        setEndYear,
                        4
                      )
                    }
                  />
                  <span>年</span>

                  <input
                    tabIndex={
                      panelCollapsed ? -1 : 0
                    }
                    aria-label="结束月份"
                    inputMode="numeric"
                    value={endMonth}
                    onChange={(e) =>
                      changeDateInput(
                        e.target.value,
                        setEndMonth,
                        2
                      )
                    }
                  />
                  <span>月</span>
                </div>

                <span className="pit-date-to">
                  至
                </span>
              </div>
            </aside>

            <div
              className={`pit-right-decoration ${
                panelCollapsed
                  ? 'pit-right-decoration--hidden'
                  : ''
              }`}
              aria-hidden="true"
            >
              <img
                className="pit-bullet"
                src={glitterBullet}
                alt=""
              />

              <img
                className="pit-helmet"
                src={helmetImg}
                alt=""
              />
            </div>

            {selectedItem && (
              <>
                <section
                  className={`pit-detail ${
                    detailVisible
                      ? 'pit-detail--visible'
                      : ''
                  }`}
                  aria-label="维权事件详情"
                  aria-hidden={!detailVisible}
                >
                  <div className="pit-detail-top">
                    <img
                      className="pit-detail-top-watermark"
                      src={osbornTableBg}
                      alt=""
                      aria-hidden="true"
                    />

                    <img
                      className="pit-detail-top-signature"
                      src={osbornHand}
                      alt=""
                      aria-hidden="true"
                    />

                    <img
                      className="pit-detail-top-emblem"
                      src={osbornTableBg}
                      alt=""
                      aria-hidden="true"
                    />

                    <span className="pit-detail-kicker">
                      ISSUE
                    </span>

                    <h2>
                      <button
                        type="button"
                        className="pit-detail-title-return"
                        onClick={backToList}
                        title="点击标题返回完整列表"
                      >
                        {selectedItem.title}
                      </button>
                    </h2>

                    <span
                      className={`pit-category-tag pit-category-tag--${
                        selectedItem.category ===
                          '生日活动' ||
                        selectedItem.category ===
                          '线下活动'
                          ? 'blue'
                          : 'red'
                      } pit-detail-category`}
                    >
                      {selectedItem.category}
                    </span>

                    <p className="pit-detail-summary">
                      {selectedItem.subDesc}
                    </p>
                  </div>

                  <div className="pit-detail-content">
                    <div className="pit-detail-columns">
                      <div className="pit-detail-column pit-detail-column--left">
                        {renderDetailBlock(
                          'overview',
                          '事件概述',
                          'OVERVIEW',
                          'overview',
                          'pit-detail-block--overview'
                        )}

                        {renderDetailBlock(
                          'issue',
                          '问题点',
                          'ISSUES',
                          'issue',
                          'pit-detail-block--issue'
                        )}

                        {renderDetailBlock(
                          'link',
                          '维权地址',
                          'ADDRESS',
                          'link',
                          'pit-detail-block--address'
                        )}
                      </div>

                      <div className="pit-detail-column pit-detail-column--middle">
                        {selectedItem.legacyContent && !selectedItem.textContent &&
                          renderDetailBlock('legacyContent', '维权正文', 'CONTENT', 'text')}
                        {renderDetailBlock(
                          'demand',
                          '具体诉求',
                          'DEMANDS',
                          'demand',
                          'pit-detail-block--demand'
                        )}

                        {renderDetailBlock(
                          'text',
                          '维权文案',
                          'TEXT',
                          'text',
                          'pit-detail-block--text'
                        )}
                      </div>

                      <div className="pit-detail-column pit-detail-column--progress">
                        <div className="pit-detail-block-heading pit-detail-progress-heading">
                          <span className="pit-detail-glyph">
                            <DetailGlyph kind="progress" />
                          </span>

                          <span className="pit-detail-block-cn">
                            当前进展
                          </span>

                          <span className="pit-detail-block-en">
                            PROGRESS
                          </span>
                        </div>

                        <span
                          className={`pit-detail-progress-status pit-detail-progress-status--${
                            selectedItem.status ===
                            '未处理'
                              ? 'pending'
                              : selectedItem.status ===
                                '已修改'
                              ? 'updated'
                              : selectedItem.status === '有回应' ? 'replied' : 'unknown'
                          }`}
                        >
                          <span className="pit-status-dot" />
                          {selectedItem.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                <div
                  className={`pit-detail-decoration ${
                    detailVisible
                      ? 'pit-detail-decoration--visible'
                      : ''
                  }`}
                  aria-hidden="true"
                >
                  <img
                    className="pit-detail-bullet"
                    src={glitterBullet}
                    alt=""
                  />

                  <img
                    className="pit-detail-helmet"
                    src={helmetImg}
                    alt=""
                  />
                </div>
              </>
            )}

            <div className="pit-footer-text">
              ALL FOR OSBORN
            </div>
          </main>
        )}
      </div>

      {/* 放在缩放画布外，避免移动端提示文字随画布缩小。 */}
      {copyToast && (
        <div className="pit-copy-toast" role="status" aria-live="polite">
          {copyToast}
        </div>
      )}
    </div>
  );
};

export default GasStationPage;
