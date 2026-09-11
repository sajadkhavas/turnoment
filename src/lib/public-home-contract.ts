import { z } from "zod";

const stableIdSchema = z.string().trim().regex(/^[A-Za-z0-9_-]{1,128}$/);
const slugSchema = z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const labelSchema = z.string().trim().min(1).max(240);
const imageSchema = z.string().trim().min(1).max(1000);
const nonNegativeIntSchema = z.number().int().nonnegative();

export const publicHomeTournamentRegistrationStateSchema = z.enum(["open", "filling", "closed", "unavailable"]);
export type PublicHomeTournamentRegistrationState = z.infer<typeof publicHomeTournamentRegistrationStateSchema>;

export const publicHomeTournamentLifecycleSchema = z.enum(["upcoming", "live", "completed", "cancelled"]);
export type PublicHomeTournamentLifecycle = z.infer<typeof publicHomeTournamentLifecycleSchema>;

export const publicHomeTrendSchema = z.enum(["up", "down", "flat"]);
export type PublicHomeTrend = z.infer<typeof publicHomeTrendSchema>;

export const publicHomeDateBucketSchema = z.enum(["today", "tomorrow", "weekend", "week"]);
export type PublicHomeDateBucket = z.infer<typeof publicHomeDateBucketSchema>;

const publicGameIdentitySchema = z
  .object({
    gameId: stableIdSchema,
    slug: slugSchema,
    name: labelSchema,
  })
  .strict();

export const publicHomeStatsSchema = z
  .object({
    activeGamingCenters: nonNegativeIntSchema,
    openOrUpcomingTournaments: nonNegativeIntSchema,
    registeredPlayers: nonNegativeIntSchema,
  })
  .strict();

export const publicHomeFinderSchema = z
  .object({
    games: z.array(publicGameIdentitySchema).max(30),
    cities: z.array(z.object({ value: stableIdSchema, label: labelSchema }).strict()).max(50),
    dateBuckets: z.array(z.object({ value: publicHomeDateBucketSchema, label: labelSchema }).strict()).max(4),
  })
  .strict();

export const publicHomePopularGameSchema = publicGameIdentitySchema
  .extend({
    platformLabel: labelSchema,
    imageUrl: imageSchema,
    activeTournamentCount: nonNegativeIntSchema,
  })
  .strict();

export const publicHomeTournamentSchema = z
  .object({
    tournamentId: stableIdSchema,
    tournamentSlug: slugSchema,
    title: labelSchema,
    game: publicGameIdentitySchema,
    venue: z
      .object({
        gamingCenterId: stableIdSchema,
        name: labelSchema,
        verified: z.boolean(),
        city: labelSchema,
        district: labelSchema,
      })
      .strict(),
    startsAt: z.string().datetime({ offset: true }),
    timezone: z.string().trim().min(1).max(80),
    formatLabel: labelSchema,
    capacity: z.number().int().positive(),
    registeredCount: nonNegativeIntSchema,
    entryFee: nonNegativeIntSchema,
    fixedPrize: nonNegativeIntSchema,
    registrationState: publicHomeTournamentRegistrationStateSchema,
    lifecycleState: publicHomeTournamentLifecycleSchema,
  })
  .strict()
  .superRefine((item, ctx) => {
    if (item.registeredCount > item.capacity) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["registeredCount"], message: "Registered count cannot exceed capacity." });
    }
    if (item.lifecycleState === "completed" || item.lifecycleState === "cancelled") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["lifecycleState"], message: "Featured Home tournaments must be current/future inventory." });
    }
    if ((item.registrationState === "open" || item.registrationState === "filling") && item.lifecycleState !== "upcoming") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["registrationState"], message: "Registration-open projection requires upcoming lifecycle." });
    }
  });

export const publicHomeGamingCenterSchema = z
  .object({
    gamingCenterId: stableIdSchema,
    name: labelSchema,
    verified: z.boolean(),
    rating: z.number().min(0).max(5).nullable(),
    reviewCount: nonNegativeIntSchema.nullable(),
    city: labelSchema,
    district: labelSchema,
    imageUrl: imageSchema,
    equipmentLabels: z.array(labelSchema).max(12),
    upcomingTournamentCount: nonNegativeIntSchema,
  })
  .strict()
  .superRefine((item, ctx) => {
    if ((item.rating === null) !== (item.reviewCount === null)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["rating"], message: "Rating and review count must be projected together." });
    }
  });

export const publicHomeRankingEntrySchema = z
  .object({
    rank: z.number().int().positive(),
    player: z
      .object({
        playerId: stableIdSchema,
        username: z.string().trim().min(1).max(80),
        gamerTag: z.string().trim().min(1).max(80),
      })
      .strict(),
    city: labelSchema.nullable(),
    rating: z.number().int(),
    finalizedMatches: nonNegativeIntSchema,
    wins: nonNegativeIntSchema,
    trend: publicHomeTrendSchema,
  })
  .strict()
  .superRefine((entry, ctx) => {
    if (entry.wins > entry.finalizedMatches) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["wins"], message: "Wins cannot exceed finalized matches." });
    }
  });

export const publicHomeRankingPreviewSchema = z
  .object({
    game: publicGameIdentitySchema,
    entries: z.array(publicHomeRankingEntrySchema).max(10),
  })
  .strict();

const publicHomeShowdownPlayerSchema = z
  .object({
    playerId: stableIdSchema,
    username: z.string().trim().min(1).max(80),
    gamerTag: z.string().trim().min(1).max(80),
    city: labelSchema.nullable(),
    rating: z.number().int(),
    recordLabel: labelSchema.nullable(),
  })
  .strict();

export const publicHomeShowdownSchema = z
  .object({
    tournamentId: stableIdSchema.nullable(),
    tournamentSlug: slugSchema.nullable(),
    matchId: stableIdSchema.nullable(),
    eyebrow: labelSchema,
    title: labelSchema,
    subtitle: labelSchema,
    startsAt: z.string().datetime({ offset: true }),
    timezone: z.string().trim().min(1).max(80),
    venueName: labelSchema,
    playerA: publicHomeShowdownPlayerSchema,
    playerB: publicHomeShowdownPlayerSchema,
  })
  .strict()
  .superRefine((showdown, ctx) => {
    if ((showdown.tournamentId === null) !== (showdown.tournamentSlug === null)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["tournamentSlug"], message: "Tournament ID and slug must be projected together." });
    }
    if (showdown.playerA.playerId === showdown.playerB.playerId) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["playerB", "playerId"], message: "Showdown participants must be distinct." });
    }
  });

export const publicHomePageSchema = z
  .object({
    schemaVersion: z.literal(1),
    stats: publicHomeStatsSchema.nullish(),
    finder: publicHomeFinderSchema,
    popularGames: z.array(publicHomePopularGameSchema).max(12),
    featuredTournaments: z.array(publicHomeTournamentSchema).max(6),
    featuredGamingCenters: z.array(publicHomeGamingCenterSchema).max(6),
    rankingPreview: publicHomeRankingPreviewSchema.nullish(),
    featuredShowdown: publicHomeShowdownSchema.nullish(),
  })
  .strict()
  .superRefine((page, ctx) => {
    const unique = (items: string[], path: (string | number)[]) => {
      if (new Set(items).size !== items.length) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path, message: "Projected identities must be unique." });
      }
    };
    unique(page.finder.games.map((item) => item.gameId), ["finder", "games"]);
    unique(page.finder.cities.map((item) => item.value), ["finder", "cities"]);
    unique(page.popularGames.map((item) => item.gameId), ["popularGames"]);
    unique(page.featuredTournaments.map((item) => item.tournamentId), ["featuredTournaments"]);
    unique(page.featuredGamingCenters.map((item) => item.gamingCenterId), ["featuredGamingCenters"]);
    if (page.rankingPreview) unique(page.rankingPreview.entries.map((item) => item.player.playerId), ["rankingPreview", "entries"]);
  });

export type PublicHomePageData = z.infer<typeof publicHomePageSchema>;
export type PublicHomeTournament = z.infer<typeof publicHomeTournamentSchema>;
export type PublicHomeGamingCenter = z.infer<typeof publicHomeGamingCenterSchema>;
export type PublicHomePopularGame = z.infer<typeof publicHomePopularGameSchema>;
export type PublicHomeRankingPreview = z.infer<typeof publicHomeRankingPreviewSchema>;
export type PublicHomeShowdown = z.infer<typeof publicHomeShowdownSchema>;

export interface PublicHomeRepository {
  getHome(): Promise<PublicHomePageData>;
}

export interface PublicHomeFinderSearch {
  game?: string;
  city?: string;
  date?: PublicHomeDateBucket;
}

export function compactHomeFinderSearch(input: { game: string; city: string; date: string }): PublicHomeFinderSearch {
  return {
    game: input.game || undefined,
    city: input.city || undefined,
    date: publicHomeDateBucketSchema.safeParse(input.date).success ? (input.date as PublicHomeDateBucket) : undefined,
  };
}
