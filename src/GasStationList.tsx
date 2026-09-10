import React, { useState, useRef, useEffect } from 'react';
// ========== 方案2：图片全部从src/assets导入 ==========
import pitMainBg from './assets/pit-main-bg.png';
import pitBg from './assets/pit-bg.jpg';
import glitterBullet from './assets/glitter-bullet.png';
import helmetImg from './assets/helmet.png';
import osbornTableBg from './assets/osborn-table-bg.png';
import osbornHand from './assets/osborn-hand.png';

// ========== 后端接口返回 TS 类型 ==========
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

// 前端业务对象
interface RecordItem {
  id: number;
  shortTitle: string;
  title: string;
  subDesc: string;
  category: string;
  date: string;
  status: '未处理' | '已修改' | '有回应';
  overview: string;
  issue: string;
  demand: string;
  textContent: string;
  link: string;
}

// ========== 每行固定高度 ==========
const ITEM_ROW_HEIGHT = 80;

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

  if (keyword && keyword.trim() !== '') {
    const kw = keyword.trim().toLowerCase();
    list = list.filter(
      (item) =>
        item.title.toLowerCase().includes(kw) ||
        (item.summary && item.summary.toLowerCase().includes(kw)) ||
        item.content.toLowerCase().includes(kw)
    );
  }

  return { records: list };
}

// ========== 分类映射 ==========
const categoryMap = [
  { id: 1, name: '生日活动' },
  { id: 2, name: '文案内容' },
  { id: 3, name: '角色设定' },
  { id: 4, name: '美术物料' },
  { id: 5, name: '线下活动' },
];

type CollapseKey = 'overview' | 'issue' | 'demand' | 'text' | 'link';

const GasStationPage: React.FC = () => {
  const [page, setPage] = useState<'splash' | 'list'>('splash');
  const [selectedItem, setSelectedItem] = useState<RecordItem | null>(null);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [collapseMap, setCollapseMap] = useState<Record<CollapseKey, boolean>>({
    overview: true,
    issue: true,
    demand: true,
    text: true,
    link: true,
  });

  const [searchKey, setSearchKey] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);

  const [recordList, setRecordList] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [isBgmPlaying, setIsBgmPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 后端数据转前端
  function backendToFrontend(backendItem: BackendRecordItem): RecordItem {
    const d = new Date(backendItem.created_at);
    const formatDate = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;

    return {
      id: backendItem.id,
      shortTitle: backendItem.title.slice(0, 12),
      title: backendItem.title,
      subDesc: backendItem.summary ?? '',
      category: backendItem.category_name,
      date: formatDate,
      status: '未处理',
      overview: backendItem.summary ?? '',
      issue: '待后端扩展此字段',
      demand: '待后端扩展此字段',
      textContent: backendItem.content,
      link: backendItem.related_url ?? '',
    };
  }

  // 加载列表
  const loadRecordList = async () => {
    if (page !== 'list') return;
    setLoading(true);

    try {
      const resp = await mockFetchIssueList(selectedCategoryId, searchKey);
      const frontendData = resp.records.map((r) => backendToFrontend(r));
      setRecordList(frontendData);
    } catch (e) {
      console.error('获取列表失败', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecordList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedCategoryId, searchKey]);

  // 复制
  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('复制成功');
    } catch {
      alert('复制失败');
    }
  };

  // 折叠
  const toggleCollapse = (key: CollapseKey) => {
    setCollapseMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 点击列表项
  const handleClickItem = (item: RecordItem) => {
    setSelectedItem(item);
    setPanelCollapsed(true);
    setCollapseMap({
      overview: true,
      issue: true,
      demand: true,
      text: true,
      link: true,
    });
  };

  const backToList = () => {
    setSelectedItem(null);
    setPanelCollapsed(false);
  };

  const backToSplash = () => {
    setSelectedItem(null);
    setPanelCollapsed(false);
    setPage('splash');
  };

  // BGM
  const toggleBGM = () => {
    if (!audioRef.current) return;
    if (isBgmPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsBgmPlaying(!isBgmPlaying);
  };

  // 筛选：同一项二次点击取消
  const handleCategoryClick = (catId: number | undefined) => {
    if (selectedCategoryId === catId) {
      setSelectedCategoryId(undefined);
    } else {
      setSelectedCategoryId(catId);
    }
  };

  // 状态颜色
  const getStatusColor = (status: string) => {
    if (status === '未处理') return 'bg-yellow-400';
    if (status === '已修改') return 'bg-green-400';
    return 'bg-blue-400';
  };

  // 分类标签样式
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case '生日活动':
        return 'bg-red-900/40 border-red-500/60 text-red-200';
      case '文案内容':
        return 'bg-blue-900/40 border-blue-500/60 text-blue-200';
      case '角色设定':
        return 'bg-purple-900/40 border-purple-500/60 text-purple-200';
      case '美术物料':
        return 'bg-orange-900/40 border-orange-500/60 text-orange-200';
      case '线下活动':
        return 'bg-green-900/40 border-green-500/60 text-green-200';
      default:
        return 'bg-gray-700/40 border-gray-500/60 text-gray-200';
    }
  };

  // ========== 开屏页 ==========
  if (page === 'splash') {
    return (
      <div
        className="w-screen h-screen relative overflow-hidden"
        style={{
          backgroundImage: `url(${pitMainBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          onClick={() => setPage('list')}
          className="absolute top-[4%] left-[2%] w-[36%] h-[72%] cursor-pointer"
          title="点击屏幕，进入维修区讯号系统"
        />
      </div>
    );
  }

  // ========== 列表页 ==========
  return (
    <div
      className="min-h-screen text-gray-100 relative overflow-hidden"
      style={{
        backgroundImage: `url(${pitBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      {/* ⚠️ BGM音频文件：音频不属于图片，仍然放在public目录，路径不变 */}
      <audio ref={audioRef} src="/bgm.mp3" loop />

      {/* ========== 右下角装饰：GlitterBullet 徽章 + 前景头盔 ========== */}
      <div className="absolute bottom-0 right-0 z-0 pointer-events-none overflow-hidden">
        <div className="relative" style={{ width: '460px', height: '360px', right: '40px' }}>
          <img
            src={glitterBullet}
            alt="glitter bullet logo"
            className="absolute w-full h-full object-contain"
            style={{ left: '100px', top: '10px', opacity: '0.75', filter: 'brightness(1.4)' }}
          />
          <img
            src={helmetImg}
            alt="racing helmet"
            className="absolute w-[360px] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            style={{ right: '-70px', bottom: '30px' }}
          />
        </div>
      </div>

      {/* 顶部 */}
      <header className="relative z-20 flex justify-between items-start p-6 pb-4 border-b border-red-900/40 bg-black/40 backdrop-blur-sm">
        <div className="flex items-end gap-6">
          <button
            onClick={backToSplash}
            className="text-red-500 text-xl hover:text-red-400 leading-none"
            title="返回开屏主页"
          >
            ⌂
          </button>
          <div>
            <h1 className="text-4xl font-bold text-white leading-none">维修区讯号</h1>
            <p className="text-red-500 text-xl font-semibold mt-1 leading-none">PIT SIGNAL</p>
          </div>
          <div className="mb-1">
            <p className="text-gray-200 text-sm">查看最新维权事件，获取参与方式并跟进处理结果</p>
            <p className="text-gray-400 text-xs mt-0.5">
              View latest issue, get instructions and track feedback progress
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-xs text-gray-400">
            R1 // Glitter Bullet PIT system
            <button
              onClick={toggleBGM}
              className="ml-4 border border-gray-500 px-3 py-1 rounded bg-black/60 hover:border-red-500 transition"
            >
              {isBgmPlaying ? 'PAUSE BGM' : 'PLAY BGM'}
            </button>
          </div>
          <div className="flex items-stretch">
            <input
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="搜索关键词/标题/标签..."
              className="bg-neutral-900/80 border border-gray-700 px-3 py-1.5 w-72 rounded-l-md focus:outline-none focus:border-red-500 text-sm"
            />
            <button
              className="bg-red-600 px-4 py-1.5 rounded-r-md hover:bg-red-700 transition text-sm flex items-center justify-center"
            >
              搜索
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex gap-5 p-5 items-start">
        {/* ========== 左侧列表容器：固定高度 720px ========== */}
        <div
          className={`transition-all duration-500 border border-red-800/60 rounded-lg overflow-hidden min-h-0 relative
            ${panelCollapsed ? 'w-56' : 'flex-1'}
          `}
          style={{
            height: '720px',
            backgroundImage: `url(${osbornTableBg})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-neutral-900/70"></div>

          {/* Osborn 手写签名 */}
          <img
            src={osbornHand}
            alt="Osborn"
            className="absolute top-3 right-8 h-20 object-contain opacity-40 z-30 pointer-events-none select-none brightness-150"
          />

          <div className="relative z-10 h-full flex flex-col">
            {!panelCollapsed ? (
              <>
                {/* 展开模式表头 */}
                <div className="grid grid-cols-[56px_1fr_110px_110px_110px] px-4 py-2 text-[20px] border-b border-gray-800 bg-gray-200/80 text-black">
                  <span>#</span>
                  <span className="flex flex-col">
                    <span>维权标题</span>
                    <span className="text-[14px]">ISSUE</span>
                  </span>
                  <span className="-ml-[20px] flex flex-col">
                    <span>分类</span>
                    <span className="text-[14px]">CATEGORY</span>
                  </span>
                  <span className="-ml-[10px] flex flex-col">
                    <span>发布/更新</span>
                    <span className="text-[14px]">DATE</span>
                  </span>
                  <span className="flex flex-col">
                    <span>处理情况</span>
                    <span className="text-[14px]">STATUS</span>
                  </span>
                </div>

                {/* 滚动区 */}
                <div className="flex-1 min-h-0 overflow-y-auto">
                  {loading ? (
                    <div className="p-6 text-center text-gray-400">加载中...</div>
                  ) : recordList.length === 0 ? (
                    <div className="p-6 text-center text-gray-400">暂无数据</div>
                  ) : (
                    recordList.map((item, index) => {
                      const seqNo = String(index + 1).padStart(2, '0');
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleClickItem(item)}
                          className={`grid grid-cols-[56px_1fr_110px_110px_110px] px-4 border-t border-gray-800 cursor-pointer transition items-center
                            ${
                              selectedItem?.id === item.id
                                ? 'bg-neutral-700/70 border-l-2 border-red-500'
                                : ''
                            }
                            ${index % 2 === 0 ? 'bg-neutral-900/40' : 'bg-neutral-800/30'}
                            hover:bg-neutral-800/50
                          `}
                          style={{ height: `${ITEM_ROW_HEIGHT}px` }}
                        >
                          <span
                            className={`font-bold text-[18px] ${
                              (index + 1) % 2 === 1 ? 'text-red-500' : 'text-white'
                            }`}
                          >
                            {seqNo}
                          </span>

                          <div className="min-w-0">
                            <div className="font-semibold text-[16px] truncate">{item.title}</div>
                            <div className="text-[13px] text-gray-400 mt-0.5 truncate">
                              {item.subDesc}
                            </div>
                          </div>

                          <span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[14px] border ${getCategoryStyle(
                                item.category
                              )}`}
                            >
                              {item.category}
                            </span>
                          </span>

                          <span className="text-[15px] text-gray-300">{item.date}</span>

                          <span className="flex items-center gap-2 text-[14px]">
                            <span
                              className={`w-2 h-2 rounded-full ${getStatusColor(
                                item.status
                              )}`}
                            ></span>
                            {item.status}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            ) : (
              <>
                {/* 收缩窄面板表头 */}
                <div className="px-4 py-2 border-b border-gray-800 bg-gray-200/80 text-black">
                  <span className="flex flex-col">
                    <span className="text-[20px]">维权标题</span>
                    <span className="text-[14px]">ISSUE</span>
                  </span>
                </div>

                {/* 窄模式列表滚动区 */}
                <div className="flex-1 min-h-0 overflow-y-auto">
                  {loading ? (
                    <div className="p-6 text-center text-gray-400">加载中...</div>
                  ) : recordList.length === 0 ? (
                    <div className="p-6 text-center text-gray-400">暂无数据</div>
                  ) : (
                    recordList.map((item, index) => {
                      const seqNo = String(index + 1).padStart(2, '0');
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleClickItem(item)}
                          className={`px-4 border-t border-gray-800 cursor-pointer transition flex items-center
                            ${
                              selectedItem?.id === item.id
                                ? 'bg-neutral-700/70 border-l-2 border-red-500'
                                : ''
                            }
                            hover:bg-neutral-800/50
                          `}
                          style={{ height: `${ITEM_ROW_HEIGHT}px` }}
                        >
                          <span
                            className={`font-bold text-[18px] mr-2 ${
                              (index + 1) % 2 === 1 ? 'text-red-500' : 'text-white'
                            }`}
                          >
                            {seqNo}
                          </span>
                          <span className="text-[16px] truncate">{item.shortTitle}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ========== 右侧筛选 ========== */}
        {!panelCollapsed && (
          <div className="w-72 border border-red-800/60 bg-neutral-900/60 rounded-lg p-4 h-fit">
            <h3 className="text-base font-semibold mb-2">
              问题类型 <span className="text-xs text-gray-400">Filter</span>
            </h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => handleCategoryClick(undefined)}
                className={`px-2 py-1.5 rounded text-xs border transition ${
                  selectedCategoryId === undefined
                    ? 'bg-red-800/50 border-red-500 text-red-100'
                    : 'bg-neutral-800/60 border-gray-700 hover:border-gray-500'
                }`}
              >
                全部
              </button>
              {categoryMap.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-2 py-1.5 rounded text-xs border transition ${
                    selectedCategoryId === cat.id
                      ? 'bg-red-800/50 border-red-500 text-red-100'
                      : 'bg-neutral-800/60 border-gray-700 hover:border-gray-500'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <h4 className="text-base font-semibold mb-2">
              发布日期 <span className="text-xs text-gray-400">Date</span>
            </h4>
            <div className="space-y-2">
              <input
                type="date"
                className="w-full bg-neutral-800/70 border border-gray-700 p-1.5 rounded text-xs"
              />
              <div className="text-center text-xs text-gray-400">至</div>
              <input
                type="date"
                className="w-full bg-neutral-800/70 border border-gray-700 p-1.5 rounded text-xs"
              />
            </div>
          </div>
        )}

        {/* ========== 详情面板：统一为截图式卡片布局，固定高度 720px ========== */}
        {selectedItem && (
          <div
            className="flex-1 border border-red-800/60 bg-neutral-900/70 rounded-lg relative overflow-hidden flex flex-col"
            style={{ height: '720px' }}
          >

            <img
              src={osbornTableBg}
              alt="osborn detail bg"
              className="absolute top-4 right-6 h-56 object-contain opacity-60 z-40 pointer-events-none select-none"
            />

            {/* 顶部标题区 */}
            <div className="relative z-20 p-5 pb-3 border-b border-gray-800 bg-neutral-900/80">
              <button
                onClick={backToList}
                className="text-red-500 text-sm hover:text-red-400 mb-2"
              >
                « 返回列表
              </button>

              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-2xl font-bold truncate">{selectedItem.title}</h2>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs border ${getCategoryStyle(
                        selectedItem.category
                      )}`}
                    >
                      {selectedItem.category}
                    </span>
                    <span className="text-sm text-gray-400">{selectedItem.date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 中间折叠内容区 */}
            <div className="relative z-20 flex-1 min-h-0 overflow-y-auto p-5 space-y-3">
              <div className="border border-gray-700 rounded bg-neutral-900/70">
                <button
                  onClick={() => toggleCollapse('overview')}
                  className="w-full flex justify-between p-3 bg-neutral-800/80 text-left text-sm"
                >
                  <span>📌 事件概述 OVERVIEW</span>
                  <span>{collapseMap.overview ? '▼' : '▶'}</span>
                </button>
                {collapseMap.overview && (
                  <div className="p-3 text-sm whitespace-pre-line">
                    {selectedItem.overview}
                    <button
                      onClick={() => copyText(selectedItem.overview)}
                      className="mt-2 px-2 py-1 bg-neutral-700 text-xs rounded hover:bg-neutral-600"
                    >
                      复制概述
                    </button>
                  </div>
                )}
              </div>

              <div className="border border-gray-700 rounded bg-neutral-900/70">
                <button
                  onClick={() => toggleCollapse('issue')}
                  className="w-full flex justify-between p-3 bg-neutral-800/80 text-left text-sm"
                >
                  <span>❗ 问题点 ISSUES</span>
                  <span>{collapseMap.issue ? '▼' : '▶'}</span>
                </button>
                {collapseMap.issue && (
                  <div className="p-3 text-sm whitespace-pre-line">
                    {selectedItem.issue}
                    <button
                      onClick={() => copyText(selectedItem.issue)}
                      className="mt-2 px-2 py-1 bg-neutral-700 text-xs rounded hover:bg-neutral-600"
                    >
                      复制问题点
                    </button>
                  </div>
                )}
              </div>

              <div className="border border-gray-700 rounded bg-neutral-900/70">
                <button
                  onClick={() => toggleCollapse('demand')}
                  className="w-full flex justify-between p-3 bg-neutral-800/80 text-left text-sm"
                >
                  <span>🎯 具体诉求 DEMANDS</span>
                  <span>{collapseMap.demand ? '▼' : '▶'}</span>
                </button>
                {collapseMap.demand && (
                  <div className="p-3 text-sm whitespace-pre-line">
                    {selectedItem.demand}
                    <button
                      onClick={() => copyText(selectedItem.demand)}
                      className="mt-2 px-2 py-1 bg-neutral-700 text-xs rounded hover:bg-neutral-600"
                    >
                      复制诉求
                    </button>
                  </div>
                )}
              </div>

              <div className="border border-gray-700 rounded bg-neutral-900/70">
                <button
                  onClick={() => toggleCollapse('text')}
                  className="w-full flex justify-between p-3 bg-neutral-800/80 text-left text-sm"
                >
                  <span>📝 维权文案 TEXT</span>
                  <span>{collapseMap.text ? '▼' : '▶'}</span>
                </button>
                {collapseMap.text && (
                  <div className="p-3 text-sm whitespace-pre-line">
                    {selectedItem.textContent}
                    <button
                      onClick={() => copyText(selectedItem.textContent)}
                      className="mt-2 px-2 py-1 bg-neutral-700 text-xs rounded hover:bg-neutral-600"
                    >
                      复制文案
                    </button>
                  </div>
                )}
              </div>

              <div className="border border-gray-700 rounded bg-neutral-900/70">
                <button
                  onClick={() => toggleCollapse('link')}
                  className="w-full flex justify-between p-3 bg-neutral-800/80 text-left text-sm"
                >
                  <span>🔗 维权地址 ADDRESS</span>
                  <span>{collapseMap.link ? '▼' : '▶'}</span>
                </button>
                {collapseMap.link && (
                  <div className="p-3 flex items-center gap-3 text-sm">
                    {selectedItem.link ? (
                      <a
                        href={selectedItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline break-all"
                      >
                        {selectedItem.link}
                      </a>
                    ) : (
                      <span className="text-gray-400">暂无链接</span>
                    )}
                    <button
                      onClick={() => copyText(selectedItem.link)}
                      className="px-2 py-1 bg-neutral-700 text-xs rounded hover:bg-neutral-600 whitespace-nowrap"
                    >
                      复制链接
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 底部状态区：处理状态 + 操作按钮 */}
            <div className="relative z-20 mt-auto p-4 border-t border-gray-800 bg-neutral-900/80">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">处理状态：</span>
                  <span className="flex items-center gap-2 text-sm">
                    <span
                      className={`w-2 h-2 rounded-full ${getStatusColor(
                        selectedItem.status
                      )}`}
                    ></span>
                    {selectedItem.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-neutral-700 text-xs rounded hover:bg-neutral-600">
                    参与方式
                  </button>
                  <button className="px-3 py-1.5 bg-neutral-700 text-xs rounded hover:bg-neutral-600">
                    时间线
                  </button>
                  <button className="px-3 py-1.5 bg-red-700 text-xs rounded hover:bg-red-600">
                    处理结果
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GasStationPage;