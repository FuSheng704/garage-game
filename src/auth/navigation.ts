import { useLocation, useNavigate } from "react-router-dom";

export function getSafeRedirect(raw: string | null | undefined): string {
  if (!raw) return "/home";
  let target = raw;
  try { target = decodeURIComponent(raw); } catch { return "/home"; }
  if (!target.startsWith("/") || target.startsWith("//") || target === "/login" || target.startsWith("/login?")) return "/home";
  return target;
}
export function buildLoginPath(location: Pick<Location, "pathname" | "search" | "hash">): string {
  const target = `${location.pathname}${location.search}${location.hash}`;
  return `/login?redirect=${encodeURIComponent(target)}`;
}
export function useGoLogin() {
  const location = useLocation(); const navigate = useNavigate();
  return () => navigate(buildLoginPath(location));
}
