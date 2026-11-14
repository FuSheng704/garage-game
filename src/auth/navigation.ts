import { useLocation, useNavigate } from "react-router-dom";

export function getSafeRedirect(raw: string | null | undefined): string {
  if (!raw) return "/home";
  const invalid = (value: string) => Array.from(value).some(c => c.charCodeAt(0) <= 32 || c.charCodeAt(0) === 127 || c === "\\");
  try {
    const decoded = decodeURIComponent(raw);
    if (!raw.startsWith("/") || raw.startsWith("//") || invalid(raw) || invalid(decoded)) return "/home";
    const url = new URL(raw, "https://auth.invalid");
    const path = decodeURIComponent(url.pathname);
    if (url.origin !== "https://auth.invalid" || path.startsWith("//") || /^\/login(?:\/|$)/i.test(path)) return "/home";
    return url.pathname + url.search + url.hash;
  } catch { return "/home"; }
}
export function buildLoginPath(location: Pick<Location, "pathname" | "search" | "hash">): string {
  const target = `${location.pathname}${location.search}${location.hash}`;
  return `/login?redirect=${encodeURIComponent(target)}`;
}
export function useGoLogin() {
  const location = useLocation(); const navigate = useNavigate();
  return () => navigate(buildLoginPath(location));
}
