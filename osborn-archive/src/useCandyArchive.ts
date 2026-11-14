import { useEffect, useRef, useState } from 'react';
import { candyApi } from './candy-runtime';
import { CandyApiError, type CandyGoods, type CandyQuery } from './candy-api';
import type { ArchiveItem } from './ArchivePage';

interface Criteria { open: boolean; category: string; query: string; status: string; sort: string; }
export function mapGoods(item: CandyGoods): ArchiveItem {
  return { id: String(item.id), name: item.goods_name, category: item.category, series: item.series_name || '', size: item.size, material: item.material, imageUrl: item.cover_img.img_url || item.cover_img.thumbnail_url, owned: item.own_status === 1, favorite: item.own_status === 2, quantity: item.count, price: String(item.total_value) };
}
export function useCandyArchive(criteria: Criteria, initial?: ArchiveItem[], onLoginRequired?: () => void) {
  const [records,setRecords]=useState<ArchiveItem[]>(initial || []);
  const [selected,setSelected]=useState<ArchiveItem|null>(null);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const [page,setPage]=useState(1);
  const [revision,refresh]=useState(0);
  const generation=useRef(0), pages=useRef(1), busy=useRef(false), detail=useRef<AbortController | undefined>(undefined), saving=useRef(new Set<string>());
  const key=JSON.stringify([criteria.category,criteria.query,criteria.status,criteria.sort]);
  const currentKey=useRef(key);
  useEffect(()=>{
    if(!criteria.open)return;
    if(currentKey.current!==key){currentKey.current=key;setPage(1);setRecords([]);setSelected(null);detail.current?.abort();if(page!==1)return;}
    const controller=new AbortController(), version=++generation.current;
    busy.current=true;setLoading(true);setError('');
    const timer=setTimeout(async()=>{
      const query: CandyQuery={ category:criteria.category,keyword:criteria.query,page,sort:criteria.sort==='收藏优先'?'collect_first':criteria.sort==='持有优先'?'own_first':'newest',filter_mode:({'全部':'all','已拥有':'owned','未拥有':'not_owned','已收藏':'collected'} as Record<string,CandyQuery['filter_mode']>)[criteria.status] || 'all' };
      try {const result=await candyApi.list(query,controller.signal);if(controller.signal.aborted||version!==generation.current)return;pages.current=result.pages;const mapped=result.list.map(mapGoods);setRecords(old=>page===1?mapped:[...old,...mapped.filter(item=>!old.some(x=>x.id===item.id))]);}
      catch(reason){if(!controller.signal.aborted&&version===generation.current)setError(reason instanceof Error?reason.message:'加载失败');}
      finally {if(!controller.signal.aborted&&version===generation.current){busy.current=false;setLoading(false);}}
    },250);
    return ()=>{clearTimeout(timer);controller.abort();};
  },[criteria.open,key,page,revision]);
  useEffect(()=>()=>detail.current?.abort(),[]);
  async function select(item: ArchiveItem|null) {
    detail.current?.abort();setSelected(null);if(!item)return;
    const controller=new AbortController();detail.current=controller;
    try {const result=await candyApi.detail(Number(item.id),controller.signal);if(!controller.signal.aborted)setSelected(mapGoods(result));}
    catch(reason){if(!controller.signal.aborted)setError(reason instanceof Error?reason.message:'详情加载失败');}
  }
  async function save(item: ArchiveItem) {
    if(saving.current.has(item.id))throw new Error('正在保存，请稍候');
    saving.current.add(item.id);
    try {await candyApi.updateOwn({goods_id:Number(item.id),own_status:item.owned?1:item.favorite?2:0,count:item.quantity,total_value:Number(item.price)});
      setRecords(old=>old.map(x=>x.id===item.id?item:x));setSelected(old=>old?.id===item.id?item:old);setError('');setPage(1);refresh(x=>x+1);
    } catch(reason){if(reason instanceof CandyApiError && reason.status===401) onLoginRequired?.();setError(reason instanceof Error?reason.message:'保存失败');throw reason;}
    finally {saving.current.delete(item.id);}
  }
  return {records,selected,select,save,error,loading,loadMore:()=>{if(!busy.current&&page<pages.current){busy.current=true;setPage(x=>x+1);}}};
}
