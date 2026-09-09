import { z } from "zod";

export const gameTournamentStatusSchema = z.enum(["open", "filling", "closed", "upcoming"]);
export const gameTournamentFormatSchema = z.enum(["1v1", "team", "single-elim", "double-elim", "round-robin"]);
export const gameTournamentDateBucketSchema = z.enum(["today", "tomorrow", "weekend", "week", "later"]);

export const gameTournamentSummarySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  game: z.string().min(1),
  gameId: z.string().min(1),
  gamingCenterId: z.string().min(1),
  formatKind: gameTournamentFormatSchema,
  bracket: z.string().min(1),
  dateBucket: gameTournamentDateBucketSchema,
  venue: z.string().min(1),
  venueVerified: z.boolean(),
  city: z.string().min(1),
  district: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  format: z.string().min(1),
  capacity: z.number().int().positive(),
  registered: z.number().int().nonnegative(),
  entryFee: z.number().int().nonnegative(),
  fixedPrize: z.number().int().nonnegative(),
  status: gameTournamentStatusSchema,
}).superRefine((value, ctx) => {
  if (value.registered > value.capacity) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["registered"],
      message: "registered cannot exceed capacity",
    });
  }
});

export const gameRankingEntrySchema = z.object({
  rank: z.number().int().positive(),
  gamerTag: z.string().min(1),
  city: z.string().min(1),
  rating: z.number().int().nonnegative(),
  played: z.number().int().nonnegative(),
  wins: z.number().int().nonnegative(),
  trend: z.enum(["up", "down", "flat"]),
});

export const gameRankingSchema = z.object({
  state: z.enum(["active", "inactive", "empty"]),
  entries: z.array(gameRankingEntrySchema).max(10),
});

export const gameCenterSummarySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  verified: z.boolean(),
  city: z.string().min(1),
  district: z.string().min(1),
  rating: z.number().min(0).max(5).nullable(),
  reviews: z.number().int().nonnegative().nullable(),
  image: z.string().min(1).nullable(),
  equipment: z.array(z.string().min(1)),
});

export const gameCompetitiveFormatSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
  teamSize: z.number().int().positive().nullable(),
});

export const gameDetailSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  detailVersion: z.string().min(1),
  publicationState: z.enum(["published", "archived"]),
  name: z.string().min(1),
  shortName: z.string().min(1),
  description: z.string().min(20),
  heroImage: z.string().min(1).nullable(),
  platforms: z.array(z.string().min(1)).min(1),
  competitiveFormats: z.array(gameCompetitiveFormatSchema),
  stats: z.object({
    openTournamentCount: z.number().int().nonnegative(),
    upcomingTournamentCount: z.number().int().nonnegative(),
    supportingCenterCount: z.number().int().nonnegative(),
    rankedPlayerCount: z.number().int().nonnegative(),
  }),
  tournaments: z.array(gameTournamentSummarySchema),
  ranking: gameRankingSchema,
  centers: z.array(gameCenterSummarySchema),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(20),
  }),
});

export type GameTournamentSummary = z.infer<typeof gameTournamentSummarySchema>;
export type GameRankingEntry = z.infer<typeof gameRankingEntrySchema>;
export type GameRanking = z.infer<typeof gameRankingSchema>;
export type GameCenterSummary = z.infer<typeof gameCenterSummarySchema>;
export type GameCompetitiveFormat = z.infer<typeof gameCompetitiveFormatSchema>;
export type GameDetail = z.infer<typeof gameDetailSchema>;
