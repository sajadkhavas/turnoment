import type { TournamentQuery } from "@/lib/contracts/tournament";

const DATE_VALUES = new Set(["all", "today", "tomorrow", "weekend", "week"]);
const STATUS_VALUES = new Set(["all", "open", "filling", "closed", "upcoming"]);
const FORMAT_VALUES = new Set(["all", "1v1", "team", "single-elim", "double-elim", "round-robin"]);
const PRICE_VALUES = new Set(["all", "free", "lt300", "300-500", "gt500"]);
const SORT_VALUES = new Set(["suggested", "soonest", "limited", "cheapest", "prize"]);
const SAFE_SLUG = /^[a-z0-9-]+$/;

export interface TournamentSearch {
  game?: string;
  city?: string;
  date?: string;
  status?: string;
  format?: string;
  price?: string;
  verified?: boolean;
  sort?: string;
}

export const defaultTournamentQuery: TournamentQuery = {
  game: "all",
  city: "all",
  date: "all",
  status: "all",
  format: "all",
  price: "all",
  verified: false,
  sort: "suggested",
};

function enumValue(value: unknown, allowed: Set<string>): string | undefined {
  return typeof value === "string" && allowed.has(value) ? value : undefined;
}

function slugValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toLowerCase();
  return normalized && SAFE_SLUG.test(normalized) ? normalized : undefined;
}

export function parseTournamentSearch(search: Record<string, unknown>): TournamentSearch {
  return {
    game: slugValue(search.game),
    city: slugValue(search.city),
    date: enumValue(search.date, DATE_VALUES),
    status: enumValue(search.status, STATUS_VALUES),
    format: enumValue(search.format, FORMAT_VALUES),
    price: enumValue(search.price, PRICE_VALUES),
    verified: search.verified === true || search.verified === "true" ? true : undefined,
    sort: enumValue(search.sort, SORT_VALUES),
  };
}

export function toTournamentQuery(search: TournamentSearch): TournamentQuery {
  return {
    game: search.game ?? defaultTournamentQuery.game,
    city: search.city ?? defaultTournamentQuery.city,
    date: search.date ?? defaultTournamentQuery.date,
    status: search.status ?? defaultTournamentQuery.status,
    format: search.format ?? defaultTournamentQuery.format,
    price: search.price ?? defaultTournamentQuery.price,
    verified: search.verified ?? defaultTournamentQuery.verified,
    sort: search.sort ?? defaultTournamentQuery.sort,
  };
}

export function compactTournamentSearch(search: Partial<TournamentQuery>): TournamentSearch {
  return {
    game: search.game && search.game !== defaultTournamentQuery.game ? search.game : undefined,
    city: search.city && search.city !== defaultTournamentQuery.city ? search.city : undefined,
    date: search.date && search.date !== defaultTournamentQuery.date ? search.date : undefined,
    status: search.status && search.status !== defaultTournamentQuery.status ? search.status : undefined,
    format: search.format && search.format !== defaultTournamentQuery.format ? search.format : undefined,
    price: search.price && search.price !== defaultTournamentQuery.price ? search.price : undefined,
    verified: search.verified ? true : undefined,
    sort: search.sort && search.sort !== defaultTournamentQuery.sort ? search.sort : undefined,
  };
}
