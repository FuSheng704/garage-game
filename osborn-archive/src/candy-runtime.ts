import { createCandyApi, type CandyApiOptions } from './candy-api';

// Host login module must call configureCandyApi before rendering ArchivePage.
// No token is guessed, persisted or bundled by this module.
let options: CandyApiOptions = {
  baseUrl: import.meta.env.VITE_CANDY_API_BASE_URL || '/api',
  getToken: () => null,
  // Markdown main contract; override after backend resolves the conflicting docs.
  updateOwnPath: import.meta.env.VITE_CANDY_UPDATE_OWN_PATH || '/candy/goods/updateown',
};
export function configureCandyApi(value: Partial<CandyApiOptions>) { options = { ...options, ...value }; }
export const candyApi = createCandyApi({
  get baseUrl() { return options.baseUrl; },
  getToken: () => options.getToken(),
  get updateOwnPath() { return options.updateOwnPath; },
});
