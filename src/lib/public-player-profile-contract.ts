import { z } from "zod";

const stableKeySchema = z.string().trim().regex(/^[A-Za-z0-9_-]{1,128}$/);
const slugSchema = z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const usernameSchema = z.string().trim().regex(/^[a-z0-9][a-z0-9_-]{1,63}$/);
const labelSchema = z.string().trim().min(1).max(160);
const nonNegativeIntSchema = z.number().int().nonnegative();
const positiveIntSchema = z.number().int().positive();

const publicAssetUrlSchema = z
  .string()
  .trim()
  .min(1)
  .max(2048)
  .refine((value) => value.startsWith("/") || /^https?:\/\//i.test(value), {
    message: "Public asset URL must be absolute HTTP(S) or root-relative.",
  });

export const publicPlayerRatingTypeSchema = z.enum(["tournament", "challenge"]);
export type PublicPlayerRatingType = z.infer<typeof publicPlayerRatingTypeSchema>;

export function parsePublicPlayerUsername(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const parsed = usernameSchema.safeParse(value);
  return parsed.success && parsed.data === value ? parsed.data : null;
}

const cityIdentitySchema = z
  .object({
    cityId: stableKeySchema,
    slug: slugSchema,
    name: labelSchema,
  })
  .strict();

const gameIdentitySchema = z
  .object({
    gameId: stableKeySchema,
    slug: slugSchema,
    name: labelSchema,
  })
  .strict();

const seasonIdentitySchema = z
  .object({
    seasonId: stableKeySchema,
    slug: slugSchema,
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

export const publicPlayerCompetitiveSnapshotSchema = z
  .object({
    snapshotId: stableKeySchema,
    game: gameIdentitySchema,
    season: seasonIdentitySchema,
    ratingType: publicPlayerRatingTypeSchema,
    rating: nonNegativeIntSchema,
    rank: positiveIntSchema.nullable(),
    played: nonNegativeIntSchema,
    wins: nonNegativeIntSchema,
    losses: nonNegativeIntSchema,
    draws: nonNegativeIntSchema,
    movement: movementSchema.nullable(),
  })
  .strict()
  .superRefine((snapshot, ctx) => {
    if (snapshot.wins + snapshot.losses + snapshot.draws !== snapshot.played) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["played"],
        message: "Wins, losses and draws must sum to played matches.",
      });
    }
  });

const tournamentIdentitySchema = z
  .object({
    tournamentId: stableKeySchema,
    name: labelSchema,
  })
  .strict();

export const publicPlayerRecentResultSchema = z
  .object({
    resultId: stableKeySchema,
    tournament: tournamentIdentitySchema,
    game: gameIdentitySchema,
    outcome: z.enum(["win", "loss", "draw"]),
    opponentGamerTag: labelSchema.nullable(),
    completedAt: z.string().datetime({ offset: true }),
  })
  .strict();

export const publicPlayerProfileSchema = z
  .object({
    schemaVersion: z.literal(1),
    publicationState: z.literal("published"),
    searchVisibility: z.enum(["indexable", "noindex"]),
    playerId: stableKeySchema,
    username: usernameSchema,
    gamerTag: labelSchema,
    avatarUrl: publicAssetUrlSchema.nullable(),
    city: cityIdentitySchema.nullable(),
    publicBio: z.string().trim().min(1).max(500).nullable(),
    competitiveSnapshots: z.array(publicPlayerCompetitiveSnapshotSchema).max(24),
    recentResults: z.array(publicPlayerRecentResultSchema).max(10),
  })
  .strict()
  .superRefine((profile, ctx) => {
    const snapshotIds = profile.competitiveSnapshots.map((snapshot) => snapshot.snapshotId);
    if (new Set(snapshotIds).size !== snapshotIds.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["competitiveSnapshots"],
        message: "Competitive snapshot identities must be unique.",
      });
    }

    const snapshotScopes = profile.competitiveSnapshots.map(
      (snapshot) => `${snapshot.game.gameId}|${snapshot.season.seasonId}|${snapshot.ratingType}`,
    );
    if (new Set(snapshotScopes).size !== snapshotScopes.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["competitiveSnapshots"],
        message: "Game, season and rating-type snapshot scopes must be unique.",
      });
    }

    const resultIds = profile.recentResults.map((result) => result.resultId);
    if (new Set(resultIds).size !== resultIds.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["recentResults"],
        message: "Recent result identities must be unique.",
      });
    }
  });

export type PublicPlayerProfileData = z.infer<typeof publicPlayerProfileSchema>;
export type PublicPlayerCompetitiveSnapshot = z.infer<typeof publicPlayerCompetitiveSnapshotSchema>;
export type PublicPlayerRecentResult = z.infer<typeof publicPlayerRecentResultSchema>;

export type PublicPlayerProfileLoadResult =
  | { state: "published"; profile: PublicPlayerProfileData }
  | { state: "not_found" };

export interface PublicPlayerProfileRepository {
  getByUsername(username: string): Promise<PublicPlayerProfileLoadResult>;
}
