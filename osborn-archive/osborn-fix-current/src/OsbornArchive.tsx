import { useEffect, useMemo, useState } from 'react';
import { Search, ArrowDownUp, ChevronDown, Tags, Ruler, LibraryBig, Layers, Package, Hash, Coins, Camera, Minus, Plus } from 'lucide-react';
import './OsbornArchive.css';

const A = '/assets/';
type Category = '徽章' | '纸片' | '礼盒' | '亚克力' | '挂件' | '摆件' | '其他';
type Filter = '全部' | '已拥有' | '未拥有' | '已收藏';
type Item = { id: number; name: string; category: Category; size: string; series: string; material: string; owned: boolean; favorite: boolean; quantity: number; price: number; };
const categories: { label: Category; icon: string }[] = [
  { label: '徽章', icon: 'cat' }, { label: '纸片', icon: 'paper' },
  { label: '礼盒', icon: 'dog' }, { label: '亚克力', icon: 'acrylic' },
  { label: '挂件', icon: 'charm' }, { label: '摆件', icon: 'stand' },
  { label: '其他', icon: 'other' },
];
const INITIAL_ITEMS: Item[] = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1, name: 'NAME', category: '徽章', size: '—', series: '—', material: '—',
  owned: false, favorite: false, quantity: 0, price: 0,
}));
const STORAGE_KEY = 'osborn-archive-items-v1';
function loadItems(): Item[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) { const parsed: unknown = JSON.parse(raw); if (Array.isArray(parsed)) return INITIAL_ITEMS.map(item => ({ ...item, ...(parsed.find((v: Item) => v.id === item.id) ?? {}) })); } } catch { /* use defaults */ }
  return INITIAL_ITEMS;
}
export default function OsbornArchive() {
  // 按 Figma 1464×1086 基准画板整体等比例缩放，避免大屏/小屏元素错位。
  const [stageScale, setStageScale] = useState(() => Math.min(1, (window.innerWidth - 48) / 1464, (window.innerHeight - 32) / 1086));
  useEffect(() => {
    const updateScale = () => setStageScale(Math.max(0.1, Math.min(1, (window.innerWidth - 48) / 1464, (window.innerHeight - 32) / 1086)));
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);
  const [items, setItems] = useState<Item[]>(loadItems);
  const [category, setCategory] = useState<Category>('徽章');
  const [filter, setFilter] = useState<Filter>('全部');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('默认排序');
  const [selectedId, setSelectedId] = useState(1);
  const [draft, setDraft] = useState({ owned: false, quantity: 0, price: 0 });
  const [message, setMessage] = useState('');
  const [productImages, setProductImages] = useState<Record<number, string>>({});
  const selected = items.find(item => item.id === selectedId) ?? items[0];
  useEffect(() => { setDraft({ owned: selected.owned, quantity: selected.quantity, price: selected.price }); }, [selectedId, items]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }, [items]);
  const visible = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    const list = items.filter(item => item.category === category && (
      filter === '全部' || (filter === '已拥有' && item.owned) ||
      (filter === '未拥有' && !item.owned) || (filter === '已收藏' && item.favorite)
    ) && (!normalized || [item.name, item.category, item.series, String(item.id)].some(value => value.toLowerCase().includes(normalized))));
    if (sort === '名称排序') list.sort((a,b) => a.name.localeCompare(b.name,'zh-CN') || a.id - b.id);
    if (sort === '编号倒序') list.sort((a,b) => b.id - a.id);
    if (sort === '编号正序') list.sort((a,b) => a.id - b.id);
    return list;
  }, [items, category, filter, search, sort]);
  function toggleFavorite(id: number) { setItems(prev => prev.map(item => item.id === id ? {...item, favorite: !item.favorite } : item)); }
  function save() { setItems(prev => prev.map(item => item.id === selectedId ? {...item, ...draft, quantity: Math.max(0, Math.floor(draft.quantity)), price: Math.max(0, draft.price)} : item)); setMessage('保存成功'); window.setTimeout(() => setMessage(''), 2000); }
  return <div className="osborn-page">
    <main className="archive-stage" style={{ zoom: stageScale }}>
      <div className="archive-frame">
        <div className="file-stack" aria-hidden="true"><span/><span/><span/></div>
        <div className="archive-board">
          <header className="archive-header">
            <div className="archive-identity"><img src={A+'avatar.png'} alt=""/><h1>官谷档案</h1></div>
            <div className="archive-motto"><span>赏金猎人萧逸接受委托，不限时间，任凭差遣。</span><small>YES, Madam.</small></div>
            <div className="archive-id"><img className="identity-tag" src={A+'tag.png'} alt=""/><img className="identity-words" src={A+'id-text.png'} alt="S - OSBORN XIAO YI ID1037796112332"/></div>
            <img className="top-gun" src={A+'top-gun.png'} alt=""/>
          </header>
          <nav className="archive-toolbar" aria-label="商品分类">
            <div className="category-row">{categories.map(entry => <button key={entry.label} className={'category-btn '+(category === entry.label ? 'active' : '')} onClick={() => {setCategory(entry.label);setFilter('全部');}}><img src={A+entry.icon+'.png'} alt=""/><span>{entry.label}</span></button>)}</div>
            <label className="search-box"><Search size={19}/><input aria-label="搜索谷子名称、系列、角色" value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜索谷子名称、系列、角色…"/></label>
            <div className="sort-wrap"><ArrowDownUp size={19}/><select aria-label="排序方式" value={sort} onChange={e=>setSort(e.target.value)}><option>默认排序</option><option>编号正序</option><option>编号倒序</option><option>名称排序</option></select><ChevronDown size={13}/></div>
          </nav>
          <div className="archive-body">
            <aside className="filter-rail" aria-label="持有与收藏筛选">{(['全部','已拥有','未拥有','已收藏'] as Filter[]).map(f => <button key={f} className={'rail-tab '+(filter===f?'selected':'')} onClick={()=>setFilter(f)}><span>{f}</span><img src={A+'pin.png'} alt=""/></button>)}</aside>
            <section className="card-paper" aria-label="谷子列表"><div className="card-grid">{visible.map(item => <article className={'product-card '+(selectedId===item.id?'is-selected':'')} key={item.id}><button className="card-select" onClick={()=>setSelectedId(item.id)} aria-label={'查看第 '+item.id+' 个 '+item.name}><img src={A+(item.favorite?'card-filled.png':'card-outline.png')} alt={item.name}/>{productImages[item.id] && <img className="card-custom-image" src={productImages[item.id]} alt="商品图"/>}{item.name !== 'NAME' && <span className="card-custom-name">{item.name}</span>}</button><button className="favorite-hit" onClick={()=>toggleFavorite(item.id)} aria-label={item.favorite?'取消收藏':'收藏'} title={item.favorite?'取消收藏':'收藏'} /></article>)}</div>{!visible.length && <div className="empty-list">暂无符合条件的档案</div>}</section>
            <aside className="details-sheet" aria-label="档案详情">
              <div className="detail-heading"><div className="stamp"><img src={A+'longday-stamp.png'} alt="LONGDAY"/></div><div><strong>任务档案<span>NO. 1123</span></strong><small>MISSION NOTICE</small></div></div>
              <div className="illustration">
                <img className="detail-single-art" src={A+'detail-paper-stack.png'} alt="航海主题档案展示图"/>
                <img className="floral floral-left" src={A+'ornament-floral-top.png'} alt=""/>
                <img className="floral floral-right" src={A+'floral-corner.png'} alt=""/>
              </div>
              <img className="banner" src={A+'banner.png'} alt=""/>
              <div className="detail-content"><input className="product-name-input" aria-label="商品名称（可编辑）" title="点击编辑商品名称" value={selected.name} onChange={e=>setItems(prev=>prev.map(item=>item.id===selectedId?{...item,name:e.target.value}:item))}/><img className="sign" src={A+'signature.png'} alt=""/><div className="meta-lines"><div><Tags size={17}/><span>商品分类</span><em>{selected.category}</em></div><div><Ruler size={17}/><span>商品尺寸</span><em>{selected.size}</em></div><div><LibraryBig size={17}/><span>系列作品</span><em>{selected.series}</em></div><div><Layers size={17}/><span>材质工艺</span><em>{selected.material}</em></div></div>
              <div className="collection-panel">
                <div className="collection-title"><img src={A+'ornament-medallion.png'} alt=""/><b>我的收藏</b><small>MY COLLECTION</small></div>
                <div className="form-line"><label><Package size={18}/>持有状态</label><div className="toggle-owned"><button className={!draft.owned?'chosen':''} onClick={()=>setDraft(d=>({...d,owned:false,quantity:0}))}>未拥有</button><button className={draft.owned?'chosen':''} onClick={()=>setDraft(d=>({...d,owned:true}))}>已拥有</button></div></div>
                <div className="form-line"><label><Hash size={18}/>数量</label><div className="quantity"><button onClick={()=>setDraft(d=>({...d,quantity:Math.max(0,d.quantity-1)}))} aria-label="减少数量"><Minus size={15}/></button><input aria-label="持有数量" type="number" min="0" value={draft.quantity} onChange={e=>setDraft(d=>({...d,quantity:Math.max(0,Number(e.target.value))}))}/><button onClick={()=>setDraft(d=>({...d,quantity:d.quantity+1,owned:true}))} aria-label="增加数量"><Plus size={15}/></button></div></div>
                <div className="form-line"><label><Coins size={18}/>购入价格</label><div className="price"><span>￥</span><input aria-label="购入价格" type="number" min="0" step="0.01" value={draft.price} onChange={e=>setDraft(d=>({...d,price:Math.max(0,Number(e.target.value))}))}/></div></div>
                <button className="save-button" onClick={save}><Camera size={18}/>保存记录</button>
              </div>{message && <div className="save-message" role="status">{message}</div>}</div>
            </aside>
          </div>
        </div>
        <img className="anchor-wave-decoration" src={A+'anchor-wave-corner.png'} alt="" aria-hidden="true"/>
      </div>
    </main>
  </div>;
}
