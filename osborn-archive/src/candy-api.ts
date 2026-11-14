/** Contracts from 糖果屋.md and 萧与逸之恋（糖果屋）.docx. */
export interface CandyCover { img_key: string; img_url: string; thumbnail_url: string; pos_x: number; pos_y: number; }
export interface CandyGoods { id: number; goods_name: string; category: string; series_name: string; size: string; material: string; cover_img: CandyCover; sort_time: string; own_status: 0 | 1 | 2; count: number; total_value: number; }
export interface CandyPage { list: CandyGoods[]; total: number; page: number; size: number; pages: number; }
export interface CandyQuery { keyword?: string; category?: string; sort?: 'newest' | 'oldest' | 'own_first' | 'collect_first'; filter_mode?: 'all' | 'owned' | 'not_owned' | 'collected'; page?: number; }
export interface CandyOwnInput { goods_id: number; own_status: 0 | 1 | 2; count: number; total_value: number; }
export interface CandyAdminInput { goods_name: string; category: string; series_name?: string; size?: string; material?: string; cover_img: CandyCover; sort_time: string; }
export interface CandyResult { code: number; msg: string; goods_id?: number; }
export interface CandyApiOptions { baseUrl: string; getToken: () => string | null | Promise<string | null>; updateOwnPath: string; }

export class CandyApiError extends Error {
  constructor(message: string, public status: number) { super(message); this.name = 'CandyApiError'; }
}

/** Token stays with the host login module; never bake credentials into source/env. */
export function createCandyApi(options: CandyApiOptions) {

  async function request<T>(path: string, init: RequestInit = {}, auth: 'required' | 'optional' = 'required'): Promise<T> {
    if (!path.startsWith('/') || path.startsWith('//')) throw new Error('接口路径必须是站内绝对路径');
    const token = await options.getToken();
    if (!token && auth === 'required') throw new CandyApiError('请先登录', 401);
    const headers = new Headers(init.headers);
    if (token) headers.set('Authorization', `Bearer ${token}`);
    if (init.body) headers.set('Content-Type', 'application/json');
    const response = await fetch(`${options.baseUrl.replace(/\/$/, '')}${path}`, { ...init, headers });
    const body: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      const data = body as { msg?: unknown; detail?: unknown } | null;
      const message = typeof data?.msg === 'string' ? data.msg : typeof data?.detail === 'string' ? data.detail : `请求失败（${response.status}）`;
      throw new CandyApiError(message, response.status);
    }
    const result = body as { code?: number; msg?: string } | null;
    if (result?.code !== undefined && result.code !== 200) throw new CandyApiError(result.msg || '操作失败', result.code);
    return body as T;
  }
  const idPath = (id: number) => {
    if (!Number.isSafeInteger(id) || id < 1) throw new Error('无效的谷子 ID');
    return `/candy/goods/${id}`;
  };
  return {
    async list(query: CandyQuery = {}, signal?: AbortSignal) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(query)) if (value !== undefined && value !== '') params.set(key, String(value));
      const page = await request<CandyPage>(`/candy/goods/list?${params}`, { signal }, 'optional');
      if (!page || !Array.isArray(page.list) || !Number.isInteger(page.pages)) throw new Error('图鉴列表响应格式错误');
      return page;
    },
    detail: (id: number, signal?: AbortSignal) => request<CandyGoods>(idPath(id), { signal }, 'optional'),
    updateOwn(input: CandyOwnInput) {
      idPath(input.goods_id);
      if (![0, 1, 2].includes(input.own_status) || !Number.isSafeInteger(input.count) || input.count < 0 || !Number.isSafeInteger(input.total_value) || input.total_value < 0) throw new Error('状态、数量和总价值必须符合接口整数约束');
      if (!options.updateOwnPath) throw new Error('尚未确认更新持有状态的接口路径');
      return request<CandyResult>(options.updateOwnPath, { method: 'POST', body: JSON.stringify(input) });
    },
    myOwn: (category?: string, signal?: AbortSignal) => request<CandyGoods[]>(`/candy/my/own${category ? `?${new URLSearchParams({ category })}` : ''}`, { signal }),
    add: (input: CandyAdminInput) => request<CandyResult>('/candy/admin/goods/add', { method: 'POST', body: JSON.stringify(input) }),
    edit: (id: number, input: CandyAdminInput) => request<CandyResult>(idPath(id).replace('/goods/', '/admin/goods/'), { method: 'PUT', body: JSON.stringify(input) }),
    remove: (id: number) => request<CandyResult>(idPath(id).replace('/goods/', '/admin/goods/'), { method: 'DELETE' }),
  };
}
