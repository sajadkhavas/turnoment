import { z } from "zod";

export const tournamentStatusSchema = z.enum(["open", "filling", "closed", "upcoming"]);
export type TournamentStatus = z.infer<typeof tournamentStatusSchema>;

export const tournamentFormatSchema = z.enum(["1v1", "team", "single-elim", "double-elim", "round-robin"]);
export type TournamentFormat = z.infer<typeof tournamentFormatSchema>;

export const tournamentDateBucketSchema = z.enum(["today", "tomorrow", "weekend", "week", "later"]);
export type TournamentDateBucket = z.infer<typeof tournamentDateBucketSchema>;

export const tournamentSummarySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  game: z.string().min(1),
  gameId: z.string().min(1),
  gamingCenterId: z.string().min(1),
  formatKind: tournamentFormatSchema,
  bracket: z.string().min(1),
  dateBucket: tournamentDateBucketSchema,
  venue: z.string().min(1),
  venueVerified: z.boolean(),
  city: z.string().min(1),
  district: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  format: z.string().min(1),
  capacity: z.number().int().nonnegative(),
  registered: z.number().int().nonnegative(),
  entryFee: z.number().int().nonnegative(),
  fixedPrize: z.number().int().nonnegative(),
  status: tournamentStatusSchema,
});
export type TournamentSummary = z.infer<typeof tournamentSummarySchema>;

export interface TournamentQuery {
  game: string;
  city: string;
  date: string;
  status: string;
  format: string;
  price: string;
  verified: boolean;
  sort: string;
}

export const filterOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});
export type FilterOption = z.infer<typeof filterOptionSchema>;

export const tournamentDiscoveryFacetsSchema = z.object({
  games: z.array(filterOptionSchema),
  cities: z.array(filterOptionSchema),
});
export type TournamentDiscoveryFacets = z.infer<typeof tournamentDiscoveryFacetsSchema>;

export const tournamentDiscoveryStatsSchema = z.object({
  tournaments: z.number().int().nonnegative(),
  centers: z.number().int().nonnegative(),
  cities: z.number().int().nonnegative(),
});
export type TournamentDiscoveryStats = z.infer<typeof tournamentDiscoveryStatsSchema>;

export const tournamentDiscoveryResultSchema = z.object({
  items: z.array(tournamentSummarySchema),
  stats: tournamentDiscoveryStatsSchema,
  facets: tournamentDiscoveryFacetsSchema,
});
export type TournamentDiscoveryResult = z.infer<typeof tournamentDiscoveryResultSchema>;

export const tournamentDetailResponseSchema = z.object({
  item: tournamentSummarySchema,
});

export const tournamentListResponseSchema = z.object({
  items: z.array(tournamentSummarySchema),
  meta: tournamentDiscoveryStatsSchema,
  facets: tournamentDiscoveryFacetsSchema,
});
