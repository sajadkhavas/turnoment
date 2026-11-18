export function avatarSource(path: string | null | undefined) {
  if (!path || !/^\/(?!\/)[A-Za-z0-9/_.-]+$/.test(path)) return undefined;
  const base = import.meta.env.VITE_API_BASE_URL?.trim();
  return base ? new URL(path, base).href : path;
}
