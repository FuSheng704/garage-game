import { useState } from 'react';
import { useCandyArchive } from './useCandyArchive';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import ZoomViewport from './ZoomViewport';
import DesktopEntrance from './figma/Node5750_22893';
import MobileEntrance from './figma/Node7041_3583';
import DetailArtwork from './figma/Node6301_2243';
import Frame from './figma/Node6301_2154';
import Heading from './figma/Node6301_2174';
import Categories from './figma/Node6301_2201';
import Tabs from './figma/Node6301_2380';
import MobileDetailArtwork from './figma/Node7020_4850';
import MobileNote from './figma/Node7376_4588';
import { FiSearch } from 'react-icons/fi';
import MobileFrame from './figma/Node7020_3108';
import MobileHeading from './figma/Node7020_3128';
import MobileTabs from './figma/Node7020_4319';
import MobileCategories from './figma/Node7020_4851';
import Sort from './figma/Node6448_3038';
import './garage-candy.css';

export interface ArchiveItem { id: string; name: string; category: string; series: string; imageUrl: string; owned: boolean; favorite: boolean; quantity: number; price: string; size?: string; material?: string; }
interface ArchivePageProps { items?: ArchiveItem[]; onBack?: () => void; onLoginRequired?: () => void; initialOpen?: boolean; }

/** Integration: list input {category, query, sort}; output {items: ArchiveItem[]}.
 * Routing: entrance -> archive; outside click -> entrance; garden route supplied by host.
 * Data is loaded through the documented candy API; no mock fallback or local record persistence.
 */
export default function ArchivePage({ items, onBack, onLoginRequired, initialOpen = false }: ArchivePageProps) {
  const [open, setOpen] = useState(initialOpen);
  const [status, setStatus] = useState('全部');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('徽章');
  const [mobileSearchOpen,setMobileSearchOpen]=useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState('默认排序');
  const { records: visible, selected, select: setSelected, save: updateRecord, error: storageError, loading, loadMore } = useCandyArchive({open,category,query,status,sort}, items, onLoginRequired);
  function statusClick(event: React.MouseEvent) {
    const name = (event.target as HTMLElement).closest('button')?.dataset.name?.split(' / ')[0];
    if (name && ['全部', '已拥有', '未拥有', '已收藏'].includes(name)) setStatus(name);
  }
  function categoryClick(event: React.MouseEvent) {
    const button = (event.target as HTMLElement).closest('button');
    const text = button?.textContent?.trim();
    if (text && ['徽章','纸片','礼盒','亚克力','挂件','摆件','其他'].includes(text)) setCategory(text);
  }
  return <ZoomViewport><main className="relative h-full overflow-hidden bg-[#050d0f]">
    <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(/assets/figma/8f682889-ca65-48de-af8d-9bbbb8f7ef41.png)'}} />
    {storageError && <p role="alert" className="absolute bottom-0 z-50 bg-[#050d0f] p-2">{storageError}</p>}
    {!open ? <>
      <div className="hidden min-[1024px]:block relative h-[1080px] w-[1920px]" onClick={event => { const button=(event.target as HTMLElement).closest('button'); if(button?.dataset.name?.includes('打开图鉴')) setOpen(true); if(button?.dataset.name?.includes('返回花园')) onBack?.(); }}><DesktopEntrance /></div>
      <div className="min-[1024px]:hidden relative h-[375px] w-[667px]" onClick={event=>{const name=(event.target as HTMLElement).closest('button')?.dataset.name; if(name?.includes('图鉴'))setOpen(true); if(name?.includes('返回花园'))onBack?.();}}><MobileEntrance /></div>
    </> : <>
      <button aria-label="关闭档案，返回入口" className="absolute inset-0" onClick={()=>setOpen(false)} />
      <section aria-label="官谷图鉴" className="relative ml-auto hidden h-[1081px] w-[1457px] min-[1024px]:block">
        <div className="pointer-events-none absolute inset-0"><div className="absolute inset-0"><Frame /></div><div className="absolute left-0 top-0 h-[171.178px] w-[1441.077px]"><Heading /></div></div>
        <div className="absolute left-[104.498px] top-[97.531px] h-[71.656px] w-[1311.698px]" onClick={categoryClick}><Categories /></div>
        <input aria-label="搜索谷子名称、系列、角色" value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索谷子名称、系列、角色…" className="absolute left-[1020px] top-[121px] h-[28px] w-[208px] bg-[#050d0f] text-[13.933px]" />
        <div className="absolute left-[1253px] top-[111.46px] z-20"><Sort value={sort as "默认排序" | "收藏优先" | "持有优先"} propValue={sortOpen?'展开':'收起'} onToggle={()=>setSortOpen(v=>!v)} onChange={value=>{setSort(value);setSortOpen(false);}} /></div>
        <div className="absolute left-[16.919px] top-[189.092px] h-[692.672px] w-[82.603px]" onClick={statusClick}><Tabs selected={status} /></div>
        <img alt="" src="/assets/figma/0f59f9f8-ff18-4428-98d8-2e1bac4e7d88.png" className="pointer-events-none absolute left-[86.584px] top-[155.254px] h-[851.907px] w-[873.802px]" />
        <img alt="" src="/assets/anchor-wave-corner.png" className="pointer-events-none absolute left-[0px] top-[622px] h-[460px] w-[414px] max-w-none z-20" />
        <div className="absolute left-[94.584px] top-[176.058px] h-[780px] w-[857.802px] overflow-y-auto px-[22.852px] py-[20px] [scrollbar-width:none]" onScroll={event=>{const el=event.currentTarget;if(el.scrollHeight-el.scrollTop-el.clientHeight<40)loadMore();}}><ItemGrid items={visible} loading={loading} onSelect={setSelected} onFavorite={item=>{void updateRecord({...item,favorite:!item.favorite,owned:false}).catch(()=>{});}} /></div>
        {selected && <RecordEditor key={selected.id} item={selected} onSave={updateRecord} onClose={()=>setSelected(null)} />}
      </section>
      <section aria-label="移动端官谷图鉴" className="relative ml-auto h-[375px] w-[505.525px] min-[1024px]:hidden">
        <div className="pointer-events-none absolute inset-0 z-0"><div className="absolute inset-0"><MobileFrame /></div><div className="absolute left-0 top-0 h-[59.392px] w-[500px]"><MobileHeading /></div><div className="absolute left-0 top-0 h-[59.392px] w-[500px]"><MobileNote /></div></div>
        <div className="absolute left-[5.871px] top-[42.5px] h-[240px] w-[28.66px]" onClick={statusClick}><MobileTabs selected={status} /></div>
        <div aria-hidden="true" className="pointer-events-none absolute left-[36.525px] top-[40.5px] z-10 h-[43px] w-[462px] bg-[#050b0d]" />
        <div className="absolute left-[37.525px] top-[40.5px] z-10 h-[43px] w-[313px] overflow-x-auto" onClick={categoryClick}><MobileCategories /></div>
        <button aria-label="展开移动搜索" onClick={()=>setMobileSearchOpen(true)} className="absolute left-[365.525px] top-[45.5px] z-10 flex h-[31px] w-[31px] items-center justify-center rounded-[13.104px] border border-[#293841] bg-[#050d0f]"><FiSearch size={11.395}/></button>
        <div className="absolute left-[405px] top-[49px] z-20 origin-top-left scale-[0.57]"><Sort value={sort as "默认排序"|"收藏优先"|"持有优先"} propValue={sortOpen?'展开':'收起'} onToggle={()=>setSortOpen(v=>!v)} onChange={value=>{setSort(value);setSortOpen(false);}} /></div>
        {mobileSearchOpen && <div className="absolute left-[120.097px] top-[40.5px] z-30 h-[41px] w-[276.429px] rounded-[6.143px] bg-[#050b0d]">
          <div className="absolute left-[4.61px] top-[7.41px] flex h-[26.209px] w-[219.607px] items-center gap-[6.143px] rounded-[16.893px] border-[0.768px] border-[#293841] pl-[9.214px]"><FiSearch size={8.75}/><input autoFocus aria-label="搜索谷子" value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索名称、系列、角色…" className="min-w-0 flex-1 bg-transparent text-[9.98px] outline-none" /></div>
          <button onClick={()=>{setMobileSearchOpen(false);setQuery('');}} className="absolute left-[228.82px] top-[7.41px] h-[26.209px] w-[43px] text-[10.75px]">取消</button>
        </div>}
        <img alt="" src="/assets/figma/0f59f9f8-ff18-4428-98d8-2e1bac4e7d88.png" className="pointer-events-none absolute left-[30px] top-[84px] h-[259px] w-[289px]" />
        <img alt="" src="/assets/anchor-wave-corner.png" className="pointer-events-none absolute left-0 top-[215px] z-20 h-[160px] w-[144px]" />
        <div className="absolute left-[37.525px] top-[90.5px] h-[249px] w-[281px] overflow-y-auto px-[7px]" onScroll={event=>{const el=event.currentTarget;if(el.scrollHeight-el.scrollTop-el.clientHeight<40)loadMore();}}><ItemGrid items={visible} loading={loading} onSelect={setSelected} onFavorite={item=>{void updateRecord({...item,favorite:!item.favorite,owned:false}).catch(()=>{});}} mobile /></div>
        {selected && <RecordEditor key={selected.id} item={selected} onSave={updateRecord} onClose={()=>setSelected(null)} mobile />}
      </section>
    </>}
  </main></ZoomViewport>;
}

interface ItemGridProps { loading?: boolean; items: ArchiveItem[]; onSelect: (item: ArchiveItem)=>void; mobile?: boolean; onFavorite: (item: ArchiveItem)=>void; }
function ItemGrid({items,onSelect,onFavorite,mobile,loading}:ItemGridProps){return <div className={`grid ${mobile?'grid-cols-3 gap-x-[6px] gap-y-[6px]':'grid-cols-4 gap-x-[7.962px] gap-y-[12.938px]'}`}>
  {items.length === 0 && !loading && <p role="status" className="col-span-full p-4 text-center text-[#fff4dc]">暂无商品数据或没有匹配结果</p>}
  {items.map(item=><div key={item.id} className={`relative text-[#161811] ${mobile?'h-[77.273px] w-[85px]':'h-[179.139px] w-[197.053px]'}`}>
    <img alt="" src="/assets/figma/38eab712-b3c1-4165-996b-6df634acab95.png" className="pointer-events-none absolute max-w-none" style={{left:'-8.08%',top:'-8.89%',width:'116.16%',height:'117.78%'}} />
    <img alt="" src="/assets/figma/4ea866f9-3e01-433e-8d48-31106f024f53.png" className="pointer-events-none absolute left-[-5.56%] top-[-8.33%] w-[107.08%] max-w-none opacity-[57%]" />
    <img alt="" src="/assets/figma/a117c115-25ea-40e9-9d74-372ac6c900e8.svg" className="pointer-events-none absolute left-[2.02%] top-[2.22%] h-[95.56%] w-[95.96%]" />
    <button aria-label={`查看${item.name}`} onClick={()=>onSelect(item)} onDoubleClick={()=>onFavorite(item)} className="absolute inset-0 w-full">
      <img src={item.imageUrl} alt="" className="absolute left-[18.69%] top-[8.33%] h-[68.89%] w-[62.63%] object-contain"/><span className={`absolute left-1/2 top-[88.33%] -translate-x-1/2 -translate-y-1/2 w-[88%] truncate font-semibold ${mobile ? 'text-[8.5px] leading-[13.67px]' : 'text-[19.81px] leading-[31.695px]'}`}>{item.name}</span>
    </button>
    <button aria-label={`${item.favorite?'取消收藏':'收藏'}${item.name}`} aria-pressed={item.favorite} onClick={()=>onFavorite(item)} className={`absolute bottom-[12%] left-[4%] z-10 flex items-center justify-center ${mobile?'h-[27px] w-[27px]':'h-[32px] w-[32px]'}`}>{item.favorite?<FaHeart size={mobile?9.444:16} color="#ff4a19"/>:<FaRegHeart size={mobile?9.444:16} color="#ff4a19"/>}</button>
  </div>)}
</div>;}

interface RecordEditorProps { item: ArchiveItem; mobile?: boolean; onClose: ()=>void; onSave: (item: ArchiveItem)=>Promise<void>; }
function RecordEditor({item,mobile,onSave}:RecordEditorProps){
  const [quantity,setQuantity]=useState(item.quantity);const [price,setPrice]=useState(item.price);const [owned,setOwned]=useState(item.owned);const [error,setError]=useState('');
  if (!mobile) return <aside className="absolute left-[934.429px] top-[165.206px] h-[887.194px] w-[520.345px]">
    <DetailArtwork category={item.category} size={item.size} material={item.material} onPriceChange={setPrice} name={item.name} imageUrl={item.imageUrl} series={item.series} quantity={quantity} price={price} owned={owned} onOwned={setOwned} onQuantity={setQuantity} onSave={()=>{if(!Number.isSafeInteger(quantity)||quantity<0||!/^\d+(\.\d{1,2})?$/.test(price)){setError('请填写非负整数数量和有效金额');return;}void onSave({...item,quantity,price,owned,favorite:owned?false:item.favorite}).then(()=>setError('')).catch(reason=>setError(reason instanceof Error?reason.message:'保存失败'));}} />
    {error && <p role="status" className="absolute bottom-[35px] left-[60px] text-[#161811]">{error}</p>}
  </aside>;
  return <aside className="absolute left-[319.525px] top-[85.5px] h-[269px] w-[179px] overflow-y-auto overflow-x-hidden [scrollbar-width:none]">
    <MobileDetailArtwork category={item.category} size={item.size} material={item.material} name={item.name} imageUrl={item.imageUrl} series={item.series} quantity={quantity} price={price} owned={owned} onOwned={setOwned} onQuantity={setQuantity} onPriceChange={setPrice} onSave={()=>{if(!/^\d+(\.\d{1,2})?$/.test(price)){setError('请填写有效金额');return;}void onSave({...item,quantity,price,owned,favorite:owned?false:item.favorite}).then(()=>setError('')).catch(reason=>setError(reason instanceof Error?reason.message:'保存失败'));}} />
    {error && <p role="status" className="absolute bottom-0 bg-[#f2e5cc] text-[8px] text-[#161811]">{error}</p>}
    {/* save input {id:item.id,owned,quantity,price}; output {record,updatedAt}; host integration required */}
  </aside>;
}

