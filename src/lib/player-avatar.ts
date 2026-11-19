export function avatarSource(path: string | null | undefined) {
  if (!path || !/^\/(?!\/)[A-Za-z0-9/_.-]+$/.test(path)) return undefined;
  const base = import.meta.env.VITE_API_BASE_URL?.trim();
  return base ? new URL(path, base).href : path;
}

export function sessionAvatarPath(profile: unknown) {
  if (!profile || typeof profile !== "object") return undefined;
  const { avatar_key, avatarUrl, avatar_url } = profile as Record<string, unknown>;
  for (const path of [avatarUrl, avatar_url, avatar_key]) {
    if (typeof path !== "string") continue;
    if (/^\/api\/v1\/media\/photos\/[a-f0-9-]{36}\/image\/$/i.test(path)) return path;
    if (/^players\/(?:[\w-]+\/)*[\w.-]+\.(?:webp|png|jpe?g|avif)$/i.test(path)) {
      return `/media/${path}`;
    }
    if (/^\/media\/players\/(?:[\w-]+\/)*[\w.-]+\.(?:webp|png|jpe?g|avif)$/i.test(path)) {
      return path;
    }
  }
}
