import { z } from "zod";

const stableKeySchema = z.string().trim().regex(/^[A-Za-z0-9_-]{1,128}$/);
const slugSchema = z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const usernameSchema = z.string().trim().regex(/^[a-z0-9][a-z0-9_-]{1,63}$/);
const labelSchema = z.string().trim().min(1).max(160);
const nonNegativeIntSchema = z.number().int().nonnegative();
const positiveIntSchema = z.number().int().positive();

export const playerRankingTypeSchema = z.enum(["tournament", "challenge"]);
export type PlayerRankingType = z.infer<typeof playerRankingTypeSchema>;

export interface PlayerRankingSearch {
  game?: string;
  season?: string;
  region?: string;
  type?: PlayerRankingType;
  page?: number;
}

export interface PlayerRankingQuery {
  game?: string;
  season?: string;
  region?: string;
  type: PlayerRankingType;
  page: number;
}

function stableSlug(value: unknown) {
  return typeof value === "string" && slugSchema.safeParse(value).success ? value : undefined;
}

function positivePage(value: unknown) {
  if (typeof value === "number" && Number.isSafeInteger(value) && value > 0) return value;
  if (typeof value === "string" && /^\d+$/.test(value)) {
    const parsed = Number(value);
    if (Number.isSafeInteger(parsed) && parsed > 0) return parsed;
  }
  return undefined;
}

export function normalizePlayerRankingSearch(search: Record<string, unknown>): PlayerRankingSearch {
  const page = positivePage(search.page);
  const type = playerRankingTypeSchema.safeParse(search.type).success
    ? (search.type as PlayerRankingType)
    : undefined;

  return {
    game: stableSlug(search.game),
    season: stableSlug(search.season),
    region: stableSlug(search.region),
    type: type === "challenge" ? "challenge" : undefined,
    page: page && page > 1 ? page : undefined,
  };
}

export function buildPlayerRankingQuery(search: PlayerRankingSearch): PlayerRankingQuery {
  return {
    game: search.game,
    season: search.season,
    region: search.region,
    type: search.type ?? "tournament",
    page: search.page ?? 1,
  };
}

export function compactPlayerRankingSearch(query: PlayerRankingQuery): PlayerRankingSearch {
  return {
    game: query.game,
    season: query.season,
    region: query.region,
    type: query.type === "challenge" ? "challenge" : undefined,
    page: query.page > 1 ? query.page : undefined,
  };
}

export function hasPlayerRankingFacets(search: PlayerRankingSearch) {
  return Object.values(search).some((value) => value !== undefined);
}

const gameIdentitySchema = z
  .object({
    gameId: stableKeySchema,
    slug: slugSchema,
    name: labelSchema,
  })
  .strict();

const cityIdentitySchema = z
  .object({
    cityId: stableKeySchema,
    slug: slugSchema,
    name: labelSchema,
  })
  .strict();

const rankingFacetSchema = z
  .object({
    id: stableKeySchema,
    slug: slugSchema,
    label: labelSchema,
  })
  .strict();

const rankingTypeFacetSchema = z
  .object({
    id: playerRankingTypeSchema,
    label: labelSchema,
  })
  .strict();

const movementSchema = z
  .object({
    direction: z.enum(["up", "down", "flat"]),
    positions: nonNegativeIntSchema.max(999),
  })
  .strict()
  .superRefine((movement, ctx) => {
    if (movement.direction === "flat" && movement.positions !== 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["positions"],
        message: "Flat movement must have zero positions.",
      });
    }
    if (movement.direction !== "flat" && movement.positions === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["positions"],
        message: "Directional movement must include a positive position count.",
      });
    }
  });

export const playerRankingItemSchema = z
  .object({
    playerId: stableKeySchema,
    username: usernameSchema,
    gamerTag: labelSchema,
    city: cityIdentitySchema,
    game: gameIdentitySchema,
    rank: positiveIntSchema,
    rating: nonNegativeIntSchema,
    ratingType: playerRankingTypeSchema,
    played: nonNegativeIntSchema,
    wins: nonNegativeIntSchema,
    losses: nonNegativeIntSchema,
    draws: nonNegativeIntSchema,
    movement: movementSchema,
  })
  .strict()
  .superRefine((player, ctx) => {
    if (player.wins + player.losses + player.draws !== player.played) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["played"],
        message: "Wins, losses and draws must sum to played matches.",
      });
    }
  });

const activeQuerySchema = z
  .object({
    game: slugSchema,
    season: slugSchema,
    region: slugSchema.optional(),
    type: playerRankingTypeSchema,
    page: positiveIntSchema,
  })
  .strict();

const paginationSchema = z
  .object({
    currentPage: positiveIntSchema,
    totalPages: positiveIntSchema,
    totalItems: nonNegativeIntSchema,
    pageSize: positiveIntSchema.max(100),
  })
  .strict();

export const playerRankingPageSchema = z
  .object({
    schemaVersion: z.literal(1),
    filters: z
      .object({
        games: z.array(gameIdentitySchema).min(1).max(100),
        seasons: z.array(rankingFacetSchema).min(1).max(50),
        regions: z.array(rankingFacetSchema).max(100),
        types: z.array(rankingTypeFacetSchema).length(2),
      })
      .strict(),
    activeQuery: activeQuerySchema,
    items: z.array(playerRankingItemSchema).max(100),
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
    unique(page.filters.games.map((game) => game.slug), ["filters", "games"]);
    unique(page.filters.seasons.map((season) => season.id), ["filters", "seasons"]);
    unique(page.filters.seasons.map((season) => season.slug), ["filters", "seasons"]);
    unique(page.filters.regions.map((region) => region.id), ["filters", "regions"]);
    unique(page.filters.regions.map((region) => region.slug), ["filters", "regions"]);
    unique(page.filters.types.map((type) => type.id), ["filters", "types"]);
    unique(page.items.map((player) => player.playerId), ["items"]);
    unique(page.items.map((player) => player.username), ["items"]);
    unique(page.items.map((player) => String(player.rank)), ["items"]);

    if (!page.filters.games.some((game) => game.slug === page.activeQuery.game)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["activeQuery", "game"], message: "Active game must be a projected game facet." });
    }
    if (!page.filters.seasons.some((season) => season.slug === page.activeQuery.season)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["activeQuery", "season"], message: "Active season must be a projected season facet." });
    }
    if (page.activeQuery.region && !page.filters.regions.some((region) => region.slug === page.activeQuery.region)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["activeQuery", "region"], message: "Active region must be a projected region facet." });
    }
    if (!page.filters.types.some((type) => type.id === page.activeQuery.type)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["activeQuery", "type"], message: "Active ranking type must be projected." });
    }

    if (page.items.length > page.pagination.pageSize) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["items"], message: "Page items cannot exceed pageSize." });
    }

    for (let index = 0; index < page.items.length; index += 1) {
      const item = page.items[index];
      if (item.game.slug !== page.activeQuery.game) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["items", index, "game"], message: "Every row must match the active game." });
      }
      if (item.ratingType !== page.activeQuery.type) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["items", index, "ratingType"], message: "Every row must match the active ranking type." });
      }
      if (index > 0 && item.rank <= page.items[index - 1].rank) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["items", index, "rank"], message: "Rows must be ordered by ascending authoritative rank." });
      }
    }

    const expectedTotalPages = Math.max(1, Math.ceil(page.pagination.totalItems / page.pagination.pageSize));
    if (page.pagination.totalPages !== expectedTotalPages) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["pagination", "totalPages"], message: "totalPages must match totalItems and pageSize." });
    }
    if (page.pagination.currentPage > page.pagination.totalPages) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["pagination", "currentPage"], message: "currentPage cannot exceed totalPages." });
    }
    if (page.activeQuery.page !== page.pagination.currentPage) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["activeQuery", "page"], message: "activeQuery.page must match pagination.currentPage." });
    }
    if (page.pagination.totalItems === 0 && page.items.length !== 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["items"], message: "Zero totalItems requires an empty page." });
    }
  });

export type PlayerRankingItem = z.infer<typeof playerRankingItemSchema>;
export type PlayerRankingPageData = z.infer<typeof playerRankingPageSchema>;

export interface PlayerRankingRepository {
  getRanking(query: PlayerRankingQuery): Promise<PlayerRankingPageData>;
}
