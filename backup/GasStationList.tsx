
import React, { useEffect, useMemo, useRef, useState } from 'react';
import pitMainBg from './assets/pit-bg.png';
import pitBg from './assets/pit-bg.png';
import glitterBullet from './assets/glitter-bullet.png';
import helmetImg from './assets/helmet.png';
import osbornTableBg from './assets/osborn-table-bg.png';
import osbornHand from './assets/osborn-hand.png';
import './GasStationList.css';

// ========== 后端接口类型 ==========
interface BackendRecordItem {
  id: number;
  category_id: number;
  title: string;
  category_name: string;
  summary?: string;
  content: string;
  related_url?: string;
  created_at: string;
}

interface BackendResp {
  records: BackendRecordItem[];
}

interface RecordItem {
  id: number;
  shortTitle: string;
  title: string;
  subDesc: string;
  category: string;
  date: string;
  dateKey: number;
  status: '未处理' | '已修改' | '有回应';
  overview: string;
  issue: string;
  demand: string;
  textContent: string;
  link: string;
}

// ========== 模拟后端数据库 ==========
const mockBackendDb: BackendRecordItem[] = [
  {
    id: 1001,
    category_id: 1,
    title: '萧逸26年生日相关',
    category_name: '生日活动',
    summary: '关于萧逸2026年生日活动的美术、UI、卡面及物料设计反馈',
    content:
      '1. 正确绘制萧逸五官保证其精致度，正视睁眼看镜头让玩家感知情绪。\n2. 保证萧逸生日卡面，突出【小主】主题，与日常卡有区分。\n3. 禁止使用黑手手绘，提高眼睛精致度，必须贴合前期原画设定，规避设计抄袭风险。\n4. 活动场景采用【深蓝】【浅蓝】混搭，增加赛道其他动物场景含量，拒绝局限于蛋糕。\n5. 增加文本量保证质量，约会以萧逸为核心展开，保证情感线占比。\n6. 认真审视生日物料，明确萧逸蓝色代表色，单项设计以黑色为主。',
    related_url: 'https://example.com/link1',
    created_at: '2026-08-10T10:00:00+08:00',
  },
  {
    id: 1002,
    category_id: 2,
    title: '「全速等待」文案相关',
    category_name: '文案内容',
    summary: '其他男主新卡电话文案使用「全速等待」引发争议',
    content: '核查全文，替换相似表述，调整句式，规避撞梗风险，保留故事内核。',
    related_url: 'https://example.com/link2',
    created_at: '2026-08-11T10:00:00+08:00',
  },
  {
    id: 1003,
    category_id: 3,
    title: '动物恶龙造型相关',
    category_name: '角色设定',
    summary: '[恶龙]是萧逸的重要设定，反对任何污名及弱化行为',
    content: '坚守官方基础人设，不做脱离原作的衍生捆绑设定，把控二创引导边界。',
    related_url: 'https://example.com/link3',
    created_at: '2026-08-12T10:00:00+08:00',
  },
  {
    id: 1004,
    category_id: 4,
    title: '250好感度情头相关',
    category_name: '美术物料',
    summary: '萧逸250好感度情头背景缺少装饰，蓝色配色问题',
    content: '调整背景配色，增加细节装饰，统一画面光影风格，贴合萧逸蓝色主调。',
    related_url: 'https://example.com/link4',
    created_at: '2026-08-13T10:00:00+08:00',
  },
  {
    id: 1005,
    category_id: 5,
    title: '音乐会打call票根颜色相关',
    category_name: '线下活动',
    summary: '萧逸音乐会快闪打call卡紫颜色引发反馈',
    content: '重新调整票根色彩，以萧逸代表色为主，优化版式与图文排版。',
    related_url: 'https://example.com/link5',
    created_at: '2026-08-14T10:00:00+08:00',
  },
  {
    id: 1006,
    category_id: 4,
    title: '赛车涂装配色优化',
    category_name: '美术物料',
    summary: '赛车外观涂装色彩与线条细节优化反馈',
    content: '优化赛车主体蓝黑配色，修正线条锯齿，增加专属标识细节。',
    related_url: 'https://example.com/link6',
    created_at: '2026-09-01T10:00:00+08:00',
  },
  {
    id: 1007,
    category_id: 2,
    title: '主线剧情台词校对',
    category_name: '文案内容',
    summary: '主线部分台词人设偏差，需要校对修正',
    content: '统一萧逸人物说话口吻，修正OOC台词，梳理对话逻辑。',
    related_url: 'https://example.com/link7',
    created_at: '2026-09-02T10:00:00+08:00',
  },
];

// ========== 第一条记录的详情展示内容 ==========
const screenshotDetailForFirstRecord = {
  overview:
    '针对萧逸2026年生日活动的整体美术、卡面、服装立绘、文案及宣发内容提出优化意见，希望生日活动能够更突出萧逸个人特色与角色设定，提升整体完成度与专属感。',

  issue: [
    '主题创意不足：生日主题与日常内容区分度较弱，对萧逸个人设定挖掘不足。',
    '美术表现存在偏差：卡面人物五官、神态、构图及配色等表现未充分突出角色特色。',
    '服装立绘问题：服饰风格与细节丰富度不足，部分立绘姿势及角色塑造存在争议。',
    '文案与内容不足：剧情、恋爱细节及角色中心度有进一步提升空间。',
    '宣发与周边欠缺：生日宣发力度、内容审核及周边设计的角色关联性不足。',
  ].join('\n'),

  demand: [
    '深入萧逸人设进行生日主题创新，增强生日卡与日常卡面的差异化。',
    '优化卡面五官、神态、构图、光影及配色，保证角色形象稳定准确。',
    '丰富服装、发型及配饰设计，提升精致度与多样性，并避免争议性立绘表现。',
    '增加以萧逸为核心的剧情和恋爱内容，提高文本量与情感完整度。',
    '加强生日活动宣发及内容审核，周边设计更多结合萧逸代表性元素。',
  ].join('\n'),
};

// ========== 模拟接口 ==========
async function mockFetchIssueList(
  category_id?: number,
  keyword?: string
): Promise<BackendResp> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  let list = [...mockBackendDb];

  if (category_id !== undefined) {
    list = list.filter((item) => item.category_id === category_id);
  }

  if (keyword?.trim()) {
    const kw = keyword.trim().toLowerCase();

    list = list.filter(
      (item) =>
        item.title.toLowerCase().includes(kw) ||
        (item.summary?.toLowerCase().includes(kw) ?? false) ||
        item.content.toLowerCase().includes(kw)
    );
  }

  return { records: list };
}

// ========== 分类 ==========
const categoryMap = [
  { id: 1, name: '生日活动' },
  { id: 4, name: '美术物料' },
  { id: 2, name: '文案内容' },
  { id: 3, name: '角色设定' },
  { id: 5, name: '线下活动' },
];

type CollapseKey = 'overview' | 'issue' | 'demand' | 'text' | 'link';

const initialCollapse: Record<CollapseKey, boolean> = {
  overview: true,
  issue: true,
  demand: true,
  text: true,
  link: true,
};

// ========== Figma 画板尺寸及动画参数 ==========
const DESIGN_WIDTH = 1591;
const DESIGN_HEIGHT = 895;

// 列表收缩和展开时间
const PANEL_MOTION_MS = 480;

// 详情开始淡入的延迟
const DETAIL_REVEAL_DELAY_MS = 100;

// ========== 页面自适应缩放 ==========
function useStagePosition() {
  const [position, setPosition] = useState({
    scale: 1,
    left: 0,
    top: 0,
  });

  useEffect(() => {
    const resize = () => {
      const scale = Math.min(
        window.innerWidth / DESIGN_WIDTH,
        window.innerHeight / DESIGN_HEIGHT
      );

      setPosition({
        scale,
        left: (window.innerWidth - DESIGN_WIDTH * scale) / 2,
        top: (window.innerHeight - DESIGN_HEIGHT * scale) / 2,
      });
    };

    resize();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return position;
}

// ========== 后端数据转前端数据 ==========
function backendToFrontend(
  backendItem: BackendRecordItem
): RecordItem {
  const d = new Date(backendItem.created_at);

  const shortTitles: Record<number, string> = {
    1001: '26年生日',
    1002: '「全速等待」文案',
    1003: '恶龙塑相关',
    1004: '250情头相关',
    1005: '音乐会票根相关',
  };

  return {
    id: backendItem.id,
    shortTitle:
      shortTitles[backendItem.id] ??
      backendItem.title.slice(0, 12),

    title: backendItem.title,
    subDesc: backendItem.summary ?? '',
    category: backendItem.category_name,

    date: `${d.getFullYear()}.${d.getMonth() + 1}`,
    dateKey: d.getFullYear() * 100 + d.getMonth() + 1,

    status: '未处理',

    overview:
      backendItem.id === 1001
        ? screenshotDetailForFirstRecord.overview
        : backendItem.summary ?? '',

    issue:
      backendItem.id === 1001
        ? screenshotDetailForFirstRecord.issue
        : '待后端扩展此字段',

    demand:
      backendItem.id === 1001
        ? screenshotDetailForFirstRecord.demand
        : '待后端扩展此字段',

    textContent: backendItem.content,
    link: backendItem.related_url ?? '',
  };
}

// ========== 详情区图标 ==========
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

// ==========================================
// 主页面
// ==========================================
const GasStationPage: React.FC = () => {
  const stage = useStagePosition();

  // 页面状态
  const [page, setPage] = useState<'splash' | 'list'>('splash');

  // 当前选中的记录
  const [selectedItem, setSelectedItem] =
    useState<RecordItem | null>(null);

  // 是否处于左侧窄列表模式
  const [panelCollapsed, setPanelCollapsed] = useState(false);

  // 详情是否可见，用于渐入渐出
  const [detailVisible, setDetailVisible] = useState(false);

  // 动画计时器
  const closeTimerRef = useRef<number | null>(null);
  const revealTimerRef = useRef<number | null>(null);

  // 详情区折叠状态
  const [collapseMap, setCollapseMap] =
    useState<Record<CollapseKey, boolean>>({
      ...initialCollapse,
    });

  // 搜索与筛选
  const [searchKey, setSearchKey] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<number | undefined>(undefined);
  const [otherOnly, setOtherOnly] = useState(false);

  // 列表数据
  const [recordList, setRecordList] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 音乐
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);

  // 日期
  const [startYear, setStartYear] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  const [endMonth, setEndMonth] = useState('');

  const audioRef = useRef<HTMLAudioElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // ========== 动画计时器清理 ==========
  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }

      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current);
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

  // ========== 加载数据 ==========
  useEffect(() => {
    if (page !== 'list') return;

    let active = true;

    setLoading(true);

    mockFetchIssueList(selectedCategoryId, searchKey)
      .then((resp) => {
        if (active) {
          setRecordList(resp.records.map(backendToFrontend));
        }
      })
      .catch((error: unknown) => {
        if (active) {
          console.error('获取列表失败', error);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [page, selectedCategoryId, searchKey]);

  // ========== 日期与其他分类筛选 ==========
  const filteredRecords = useMemo(() => {
    const start =
      startYear && startMonth
        ? Number(startYear) * 100 + Number(startMonth)
        : null;

    const end =
      endYear && endMonth
        ? Number(endYear) * 100 + Number(endMonth)
        : null;

    return recordList.filter((item) => {
      if (
        otherOnly &&
        categoryMap.some((cat) => cat.name === item.category)
      ) {
        return false;
      }

      if (start !== null && item.dateKey < start) {
        return false;
      }

      if (end !== null && item.dateKey > end) {
        return false;
      }

      return true;
    });
  }, [
    recordList,
    otherOnly,
    startYear,
    startMonth,
    endYear,
    endMonth,
  ]);

  // ========== 复制文本 ==========
  const copyText = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      alert('复制成功');
    } catch {
      alert('复制失败');
    }
  };

  // ========== 折叠详情内容 ==========
  const toggleCollapse = (key: CollapseKey) => {
    setCollapseMap((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // ==========================================
  // 核心动画：返回完整列表
  // ==========================================
  const backToList = () => {
    clearMotionTimers();

    // 先让左侧列表展开
    setPanelCollapsed(false);

    // 同时让详情渐隐
    setDetailVisible(false);

    // 等待动画完成后，再移除详情
    closeTimerRef.current = window.setTimeout(() => {
      setSelectedItem(null);
      closeTimerRef.current = null;
    }, PANEL_MOTION_MS);
  };

  // ==========================================
  // 核心动画：点击维权记录
  // ==========================================
  const handleClickItem = (item: RecordItem) => {
    // 如果已经选中当前记录，再次点击就返回完整列表
    if (panelCollapsed && selectedItem?.id === item.id) {
      backToList();
      return;
    }

    clearMotionTimers();

    const wasCollapsed = panelCollapsed;

    // 设置选中记录
    setSelectedItem(item);

    // 左侧表格开始收缩
    setPanelCollapsed(true);

    // 重置详情折叠状态
    setCollapseMap({ ...initialCollapse });

    if (!wasCollapsed) {
      // 从完整列表进入详情：
      // 先收缩，再让右侧详情渐渐出现
      setDetailVisible(false);

      revealTimerRef.current = window.setTimeout(() => {
        setDetailVisible(true);
        revealTimerRef.current = null;
      }, DETAIL_REVEAL_DELAY_MS);
    } else {
      // 已经在详情模式下，切换其他记录
      setDetailVisible(true);
    }
  };

  // ========== 返回开屏页 ==========
  const backToSplash = () => {
    clearMotionTimers();

    setSelectedItem(null);
    setPanelCollapsed(false);
    setDetailVisible(false);
    setPage('splash');
  };

  // ========== BGM ==========
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

  // ========== 分类点击 ==========
  const handleCategoryClick = (catId: number | undefined) => {
    setOtherOnly(false);

    setSelectedCategoryId((prev) =>
      prev === catId ? undefined : catId
    );
  };

  // ========== 日期输入 ==========
  const changeDateInput = (
    value: string,
    setter: (v: string) => void,
    maxLength: number
  ) => {
    setter(value.replace(/\D/g, '').slice(0, maxLength));
  };

  // ==========================================
  // 渲染表格记录
  // ==========================================
  const renderRow = (
    item: RecordItem,
    index: number,
    collapsed: boolean
  ) => {
    const seqNo = String(index + 1).padStart(2, '0');

    return (
      <button
        type="button"
        key={item.id}
        className={[
          'pit-record',
          collapsed ? 'pit-record--small' : '',
          selectedItem?.id === item.id
            ? 'pit-record--selected'
            : '',
        ].join(' ')}
        onClick={() => handleClickItem(item)}
        title={
          panelCollapsed && selectedItem?.id === item.id
            ? '再次点击返回完整列表'
            : item.title
        }
        tabIndex={panelCollapsed === collapsed ? 0 : -1}
      >
        <span className="pit-record-index">
          <span>{seqNo[0]}</span>
          {seqNo[1]}
        </span>

        <span className="pit-record-main">
          <span className="pit-record-title">
            {collapsed ? item.shortTitle : item.title}
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
                    : 'replied'
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

  // ==========================================
  // 渲染详情区模块
  // ==========================================
  const renderDetailBlock = (
    key: CollapseKey,
    chinese: string,
    english: string,
    kind: DetailGlyphKind,
    className = ''
  ) => {
    if (!selectedItem) return null;

    const value =
      selectedItem[key === 'text' ? 'textContent' : key];

    const isBulletList =
      (key === 'issue' || key === 'demand') &&
      selectedItem.id === 1001;

    const isNumberedText =
      key === 'text' && /^1[.、]/.test(value.trim());

    return (
      <section
        className={`pit-detail-block ${className}`}
        key={key}
      >
        <div className="pit-detail-block-heading">
          <button
            type="button"
            className="pit-detail-block-toggle"
            onClick={() => toggleCollapse(key)}
            aria-expanded={collapseMap[key]}
            title={`${
              collapseMap[key] ? '收起' : '展开'
            }${chinese}`}
          >
            <span className="pit-detail-glyph">
              <DetailGlyph kind={kind} />
            </span>

            <span className="pit-detail-block-cn">
              {chinese}
            </span>

            <span className="pit-detail-block-en">
              {english}
            </span>
          </button>

          {key === 'text' && (
            <button
              type="button"
              className="pit-detail-copy-icon"
              onClick={() => void copyText(value)}
              aria-label="复制维权文案"
              title="复制维权文案"
            >
              <DetailGlyph kind="copy" size={17} />
            </button>
          )}
        </div>

        {collapseMap[key] &&
          (key === 'link' ? (
            <div className="pit-detail-address-actions">
              <div className="pit-detail-link-control">
                <button
                  type="button"
                  onClick={() => void copyText(value)}
                  disabled={!value}
                  title="复制维权地址"
                >
                  <DetailGlyph kind="link" size={16} />
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
                    {line.replace(/^\d+[.、]\s*/, '')}
                  </li>
                ))}
            </ol>
          ) : (
            <p className="pit-detail-block-body">
              {value || '暂无内容'}
            </p>
          ))}
      </section>
    );
  };

  // ==========================================
  // 页面渲染
  // ==========================================
  return (
    <div className="pit-viewport">
      <div
        className="pit-stage"
        style={{
          transform: `translate(${stage.left}px, ${stage.top}px) scale(${stage.scale})`,
        }}
      >
        {/* ========== 开屏页 ========== */}
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
          // ========== 维修区讯号页面 ==========
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

            {/* ========== 顶部标题区域 ========== */}
            <header
              className={`pit-header ${
                selectedItem ? 'pit-header--detail' : ''
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

              <div
                className="pit-red-slash"
                aria-hidden="true"
              />

              <div className="pit-headline">
                <div>
                  查看最新维权事件，获取参与方式并跟进处理结果
                </div>
                <p>
                  TRACK THE ISSUES. TAKE ACTION. SEE THE RESULTS.
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

              {/* 搜索框：进入详情后渐隐 */}
              <form
                className={`pit-search ${
                  panelCollapsed
                    ? 'pit-search--hidden'
                    : ''
                }`}
                aria-hidden={panelCollapsed}
                onSubmit={(event) => {
                  event.preventDefault();
                  searchRef.current?.blur();
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
                  tabIndex={panelCollapsed ? -1 : 0}
                  ref={searchRef}
                  value={searchKey}
                  onChange={(event) =>
                    setSearchKey(event.target.value)
                  }
                  placeholder="搜索关键词/标题/标签..."
                  aria-label="搜索关键词、标题或标签"
                />

                <span className="pit-search-enter">
                  / ENTER
                </span>

                <button
                  type="submit"
                  tabIndex={panelCollapsed ? -1 : 0}
                >
                  搜索
                </button>
              </form>
            </header>

            {/* =====================================
                左侧表格
                通过 CSS 平滑改变外框宽度
                两种表格内容交叉淡入淡出
               ===================================== */}
            <section
              className={`pit-table ${
                panelCollapsed
                  ? 'pit-table--collapsed'
                  : ''
              }`}
              aria-label="维权事件列表"
            >
              {/* ========== 完整列表 ========== */}
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
                    发布/更新 <small>CATEGORY</small>
                  </span>

                  <span>
                    处理情况 <small>STATUS</small>
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
                  ) : filteredRecords.length === 0 ? (
                    <div className="pit-table-empty">
                      暂无数据
                    </div>
                  ) : (
                    filteredRecords.map((item, index) =>
                      renderRow(item, index, false)
                    )
                  )}
                </div>
              </div>

              {/* ========== 收缩后的窄列表 ========== */}
              <div
                className="pit-table-view pit-table-view--small"
                aria-hidden={!panelCollapsed}
              >
                <div className="pit-table-head">
                  <span className="pit-table-head-index">
                    #
                  </span>

                  {/* 点击表头返回完整列表 */}
                  <button
                    type="button"
                    className="pit-table-small-heading"
                    onClick={backToList}
                    tabIndex={panelCollapsed ? 0 : -1}
                    title="返回完整列表"
                  >
                    维权标题 <small>ISSUE</small>
                  </button>
                </div>

                <div className="pit-table-body">
                  {loading ? (
                    <div className="pit-table-empty">
                      加载中...
                    </div>
                  ) : filteredRecords.length === 0 ? (
                    <div className="pit-table-empty">
                      暂无数据
                    </div>
                  ) : (
                    filteredRecords.map((item, index) =>
                      renderRow(item, index, true)
                    )
                  )}
                </div>
              </div>
            </section>

            {/* ========== 右侧筛选区域 ========== */}
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
                    tabIndex={panelCollapsed ? -1 : 0}
                    className={
                      selectedCategoryId === cat.id &&
                      !otherOnly
                        ? 'pit-filter-active'
                        : ''
                    }
                    onClick={() =>
                      handleCategoryClick(cat.id)
                    }
                    aria-pressed={
                      selectedCategoryId === cat.id &&
                      !otherOnly
                    }
                  >
                    {cat.name}
                  </button>
                ))}

                <button
                  type="button"
                  tabIndex={panelCollapsed ? -1 : 0}
                  className={
                    otherOnly
                      ? 'pit-filter-active'
                      : ''
                  }
                  onClick={() => {
                    setSelectedCategoryId(undefined);
                    setOtherOnly((prev) => !prev);
                  }}
                  aria-pressed={otherOnly}
                >
                  其他
                </button>
              </div>

              <div className="pit-date-heading">
                发布日期 <span>Date</span>
              </div>

              <div className="pit-date-inputs">
                <div className="pit-date-line">
                  <input
                    tabIndex={panelCollapsed ? -1 : 0}
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
                    tabIndex={panelCollapsed ? -1 : 0}
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
                    tabIndex={panelCollapsed ? -1 : 0}
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
                    tabIndex={panelCollapsed ? -1 : 0}
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

            {/* ========== 列表页右下角装饰 ========== */}
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

            {/* =====================================
                详情页
                退出时不立即卸载
                等左侧表格展开动画结束后再移除
               ===================================== */}
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
                  {/* 详情顶部 */}
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

                    {/* 点击详情大标题返回列表 */}
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
                        selectedItem.category === '生日活动' ||
                        selectedItem.category === '线下活动'
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

                  {/* 详情正文 */}
                  <div className="pit-detail-content">
                    <div className="pit-detail-columns">
                      {/* 左栏 */}
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

                      {/* 中栏 */}
                      <div className="pit-detail-column pit-detail-column--middle">
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

                      {/* 右栏：当前进展 */}
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
                            selectedItem.status === '未处理'
                              ? 'pending'
                              : selectedItem.status === '已修改'
                                ? 'updated'
                                : 'replied'
                          }`}
                        >
                          <span className="pit-status-dot" />
                          {selectedItem.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 详情页右下角装饰 */}
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

            {/* 底部文字 */}
            <div className="pit-footer-text">
              ALL FOR OSBORN
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default GasStationPage;
