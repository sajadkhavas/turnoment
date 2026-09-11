import { z } from "zod";

const stableKeySchema = z.string().trim().regex(/^[A-Za-z0-9_-]{1,128}$/);
const slugSchema = z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const labelSchema = z.string().trim().min(1).max(240);
const nonNegativeIntSchema = z.number().int().nonnegative();
const positiveIntSchema = z.number().int().positive();

export const tournamentDiscoveryDateSchema = z.enum(["today", "tomorrow", "weekend", "week"]);
export const tournamentDiscoveryStatusSchema = z.enum(["open", "filling", "closed", "upcoming"]);
export const tournamentDiscoveryFormatSchema = z.enum(["1v1", "team", "single-elim", "double-elim", "round-robin"]);
export const tournamentDiscoveryPriceSchema = z.enum(["free", "lt300", "300-500", "gt500"]);
export const tournamentDiscoverySortSchema = z.enum(["suggested", "soonest", "limited", "cheapest", "prize"]);
export const tournamentDiscoveryLifecycleSchema = z.enum([
  "registration_open",
  "filling",
  "registration_closed",
  "upcoming",
  "check_in",
  "in_progress",
  "completed",
  "cancelled",
]);
export const tournamentDiscoveryRegistrationSchema = z.enum(["open", "filling", "closed", "upcoming", "unavailable"]);

export type TournamentDiscoveryDate = z.infer<typeof tournamentDiscoveryDateSchema>;
export type TournamentDiscoveryStatus = z.infer<typeof tournamentDiscoveryStatusSchema>;
export type TournamentDiscoveryFormat = z.infer<typeof tournamentDiscoveryFormatSchema>;
export type TournamentDiscoveryPrice = z.infer<typeof tournamentDiscoveryPriceSchema>;
export type TournamentDiscoverySort = z.infer<typeof tournamentDiscoverySortSchema>;
export type TournamentDiscoveryLifecycle = z.infer<typeof tournamentDiscoveryLifecycleSchema>;
export type TournamentDiscoveryRegistrationState = z.infer<typeof tournamentDiscoveryRegistrationSchema>;

export interface TournamentDiscoverySearch {
  game?: string;
  city?: string;
  date?: TournamentDiscoveryDate;
  status?: TournamentDiscoveryStatus;
  format?: TournamentDiscoveryFormat;
  price?: TournamentDiscoveryPrice;
  verified?: true;
  sort?: TournamentDiscoverySort;
  page?: number;
}

export interface TournamentDiscoveryQuery {
  game?: string;
  city?: string;
  date?: TournamentDiscoveryDate;
  status?: TournamentDiscoveryStatus;
  format?: TournamentDiscoveryFormat;
  price?: TournamentDiscoveryPrice;
  verified: boolean;
  sort: TournamentDiscoverySort;
  page: number;
}

function stableKey(value: unknown) {
  return typeof value === "string" && stableKeySchema.safeParse(value).success ? value : undefined;
}

function enumValue<T extends z.ZodEnum<[string, ...string[]]>>(schema: T, value: unknown): z.infer<T> | undefined {
  const result = schema.safeParse(value);
  return result.success ? result.data : undefined;
}

function positivePage(value: unknown) {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) return value;
  if (typeof value === "string" && /^\d+$/.test(value)) {
    const parsed = Number(value);
    if (Number.isSafeInteger(parsed) && parsed > 0) return parsed;
  }
  return undefined;
}

export function normalizeTournamentDiscoverySearch(search: Record<string, unknown>): TournamentDiscoverySearch {
  const sort = enumValue(tournamentDiscoverySortSchema, search.sort);
  const page = positivePage(search.page);
  return {
    game: stableKey(search.game),
    city: stableKey(search.city),
    date: enumValue(tournamentDiscoveryDateSchema, search.date),
    status: enumValue(tournamentDiscoveryStatusSchema, search.status),
    format: enumValue(tournamentDiscoveryFormatSchema, search.format),
    price: enumValue(tournamentDiscoveryPriceSchema, search.price),
    verified: search.verified === true || search.verified === "true" ? true : undefined,
    sort: sort && sort !== "suggested" ? sort : undefined,
    page: page && page > 1 ? page : undefined,
  };
}

export function buildTournamentDiscoveryQuery(search: TournamentDiscoverySearch): TournamentDiscoveryQuery {
  return {
    game: search.game,
    city: search.city,
    date: search.date,
    status: search.status,
    format: search.format,
    price: search.price,
    verified: search.verified === true,
    sort: search.sort ?? "suggested",
    page: search.page ?? 1,
  };
}

export function compactTournamentDiscoverySearch(query: TournamentDiscoveryQuery): TournamentDiscoverySearch {
  return {
    game: query.game,
    city: query.city,
    date: query.date,
    status: query.status,
    format: query.format,
    price: query.price,
    verified: query.verified ? true : undefined,
    sort: query.sort !== "suggested" ? query.sort : undefined,
    page: query.page > 1 ? query.page : undefined,
  };
}

export function hasTournamentDiscoveryFacets(search: TournamentDiscoverySearch) {
  return Object.values(search).some((value) => value !== undefined);
}

const gameIdentitySchema = z
  .object({
    gameId: stableKeySchema,
    slug: slugSchema,
    name: labelSchema,
  })
  .strict();

const cityOptionSchema = z
  .object({
    value: stableKeySchema,
    label: labelSchema,
  })
  .strict();

export const tournamentDiscoveryMoneySchema = z
  .object({
    amount: nonNegativeIntSchema,
    currency: z.literal("IRR"),
  })
  .strict();

export const tournamentDiscoveryCapacitySchema = z
  .object({
    limit: positiveIntSchema,
    registered: nonNegativeIntSchema,
    remaining: nonNegativeIntSchema,
  })
  .strict()
  .superRefine((capacity, ctx) => {
    if (capacity.registered > capacity.limit) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["registered"], message: "Registered count cannot exceed capacity." });
    }
    if (capacity.remaining !== Math.max(0, capacity.limit - capacity.registered)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["remaining"], message: "Remaining capacity must match authoritative totals." });
    }
  });

export const tournamentDiscoveryItemSchema = z
  .object({
    tournamentId: stableKeySchema,
    tournamentSlug: slugSchema,
    title: labelSchema,
    game: gameIdentitySchema,
    venue: z
      .object({
        gamingCenterId: stableKeySchema,
        name: labelSchema,
        verified: z.boolean(),
        city: labelSchema,
        district: labelSchema,
      })
      .strict(),
    lifecycleState: tournamentDiscoveryLifecycleSchema,
    registrationState: tournamentDiscoveryRegistrationSchema,
    startsAt: z.string().datetime({ offset: true }),
    timezone: z.string().trim().min(1).max(80),
    displayDate: labelSchema,
    displayTime: labelSchema,
    formatLabel: labelSchema,
    bracketFormatLabel: labelSchema,
    capacity: tournamentDiscoveryCapacitySchema,
    entryFee: tournamentDiscoveryMoneySchema,
    fixedPrize: tournamentDiscoveryMoneySchema,
  })
  .strict()
  .superRefine((item, ctx) => {
    if (
      (item.lifecycleState === "completed" || item.lifecycleState === "cancelled") &&
      (item.registrationState === "open" || item.registrationState === "filling")
    ) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["registrationState"], message: "Completed/cancelled tournaments cannot accept registration." });
    }
  });

const activeQuerySchema = z
  .object({
    game: stableKeySchema.optional(),
    city: stableKeySchema.optional(),
    date: tournamentDiscoveryDateSchema.optional(),
    status: tournamentDiscoveryStatusSchema.optional(),
    format: tournamentDiscoveryFormatSchema.optional(),
    price: tournamentDiscoveryPriceSchema.optional(),
    verified: z.boolean(),
    sort: tournamentDiscoverySortSchema,
    page: positiveIntSchema,
  })
  .strict();

const paginationSchema = z
  .object({
    currentPage: positiveIntSchema,
    totalPages: positiveIntSchema,
    totalItems: nonNegativeIntSchema,
    pageSize: positiveIntSchema,
  })
  .strict();

export const tournamentDiscoveryPageSchema = z
  .object({
    schemaVersion: z.literal(1),
    filters: z
      .object({
        games: z.array(gameIdentitySchema).max(100),
        cities: z.array(cityOptionSchema).max(100),
      })
      .strict(),
    activeQuery: activeQuerySchema,
    featuredTournamentId: stableKeySchema.nullable(),
    items: z.array(tournamentDiscoveryItemSchema).max(100),
    pagination: paginationSchema,
  })
  .strict()
  .superRefine((page, ctx) => {
    const unique = (values: string[], path: (string | number)[]) => {
      if (new Set(values).size !== values.length) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path, message: "Projected identities must be unique." });
      }
    };
    unique(page.filters.games.map((game) => game.gameId), ["filters", "games"]);
    unique(page.filters.cities.map((city) => city.value), ["filters", "cities"]);
    unique(page.items.map((item) => item.tournamentId), ["items"]);
    unique(page.items.map((item) => item.tournamentSlug), ["items"]);

    if (page.items.length > page.pagination.pageSize) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["items"], message: "Page items cannot exceed pageSize." });
    }
    if (page.pagination.totalItems === 0 && page.items.length !== 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["pagination", "totalItems"], message: "Zero totalItems requires an empty page." });
    }
    if (page.featuredTournamentId && !page.items.some((item) => item.tournamentId === page.featuredTournamentId)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["featuredTournamentId"], message: "Featured tournament must belong to the current page projection." });
    }
  });

export type TournamentDiscoveryMoney = z.infer<typeof tournamentDiscoveryMoneySchema>;
export type TournamentDiscoveryItem = z.infer<typeof tournamentDiscoveryItemSchema>;
export type TournamentDiscoveryPageData = z.infer<typeof tournamentDiscoveryPageSchema>;

export interface TournamentDiscoveryRepository {
  getDiscovery(query: TournamentDiscoveryQuery): Promise<TournamentDiscoveryPageData>;
}
