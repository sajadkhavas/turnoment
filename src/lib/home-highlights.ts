import { z } from "zod";
import { getDataAdapterMode } from "./data-adapter";

const schema = z.object({
  leaders: z.array(z.object({
    rank: z.number().int().positive(),
    username: z.string().min(1),
    name: z.string().min(1),
    avatarUrl: z.string().nullable(),
    wins: z.number().int().nonnegative(),
    level: z.number().int().positive(),
  })).max(20),
  games: z.array(z.object({
    gameId: z.string(),
    slug: z.string(),
    name: z.string(),
    imageUrl: z.string().nullable(),
  })).max(12),
});

export type HomeHighlights = z.infer<typeof schema>;

export async function getHomeHighlights(signal: AbortSignal): Promise<HomeHighlights | undefined> {
  const base = import.meta.env.VITE_API_BASE_URL?.trim();
  if (getDataAdapterMode() !== "api" || !base) return;
  try {
    const response = await fetch(new URL("/api/v1/discovery/home/highlights/", base), {
      signal: AbortSignal.any([signal, AbortSignal.timeout(2500)]),
      headers: { Accept: "application/json" },
    });
    if (response.ok) return schema.parse(await response.json());
  } catch {
    // The tournament finder remains usable when highlights are unavailable.
  }
}

export function gameImage(path: string | null) {
  if (!path) return;
  try {
    if (path.startsWith("/") && !path.startsWith("//") && !path.includes("\\")) {
      const base = import.meta.env.VITE_API_BASE_URL?.trim();
      return base ? new URL(path, base).href : path;
    }
    const url = new URL(path);
    if (url.protocol === "https:" && !url.username && !url.password) return url.href;
  } catch {
    // Missing artwork uses the game icon.
  }
}
