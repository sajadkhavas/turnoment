import { z } from "zod";
import { getDataAdapterMode } from "@/lib/data-adapter";

const card = z.object({
  id: z.string().uuid(), name: z.string(),
  image: z.string().nullable(),
  center: z.object({ id: z.string(), name: z.string() }),
  wins: z.number().int().nonnegative(), level: z.number().int().positive(),
});
const pagination = { page: z.number().int().positive(), pages: z.number().int().positive() };
const list = z.object({ items: z.array(card), ...pagination });
const detail = card.extend({
  memberCount: z.number().int().nonnegative(),
  members: z.array(z.object({ username: z.string(), gamerTag: z.string() })),
  ...pagination,
});

export type TeamCard = z.infer<typeof card>;
export const teamIdSchema = z.string().uuid();

async function read(path: string, query: Record<string, string>, signal?: AbortSignal) {
  const base = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!base) throw new Error("Public teams API URL is missing.");
  const url = new URL("/api/v1/public/teams/" + path, base);
  url.search = new URLSearchParams(query).toString();
  const response = await fetch(url, { signal, headers: { Accept: "application/json" } });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Public teams API unavailable.");
  return response.json() as Promise<unknown>;
}

export async function listPublicTeams(query: Record<string, string>, signal?: AbortSignal) {
  if (getDataAdapterMode() !== "api") return { items: [], page: 1, pages: 1 };
  return list.parse(await read("", query, signal));
}

export async function getPublicTeam(id: string, page: number, signal?: AbortSignal) {
  if (getDataAdapterMode() !== "api") return null;
  const data = await read(teamIdSchema.parse(id) + "/", { page: String(page) }, signal);
  return data === null ? null : detail.parse(data);
}

export function publicTeamPage(value: unknown) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 && page < 1_000_000 ? page : 1;
}

export function safeTeamImage(value: string | null) {
  if (!value) return undefined;
  if (value.startsWith("/api/v1/media/")) {
    const base = import.meta.env.VITE_API_BASE_URL?.trim();
    return base ? new URL(value, base).href : value;
  }
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && !url.username && !url.password) return url.href;
  } catch { /* fall back to the team icon */ }
}
