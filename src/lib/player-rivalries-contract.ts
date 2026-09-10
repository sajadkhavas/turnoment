import { z } from "zod";

export const rivalryOpponentKindFilters = ["all", "player", "team"] as const;
export const rivalrySortModes = ["recent", "most-played"] as const;

export type RivalryOpponentKindFilter = (typeof rivalryOpponentKindFilters)[number];
export type RivalrySortMode = (typeof rivalrySortModes)[number];

export interface PlayerRivalriesQuery {
  kind: RivalryOpponentKindFilter;
  gameId?: string;
  sort: RivalrySortMode;
  page: number;
}

const stableIdSchema = z.string().trim().min(1).max(128).regex(/^[A-Za-z0-9_-]+$/);
const displayTextSchema = z.string().trim().min(1).max(160);

export const rivalryGameSchema = z
  .object({
    gameId: stableIdSchema,
    name: displayTextSchema,
  })
  .strict();

export const rivalryOpponentSchema = z
  .object({
    participantId: stableIdSchema,
    kind: z.enum(["player", "team"]),
    displayTag: z.string().trim().min(1).max(80),
  })
  .strict();

export const rivalryCompetitionSchema = z
  .object({
    kind: z.enum(["tournament", "challenge"]),
    competitionId: stableIdSchema,
    title: displayTextSchema,
  })
  .strict();

export const rivalryHeadToHeadSchema = z
  .object({
    totalFinalized: z.number().int().positive(),
    playerWins: z.number().int().nonnegative(),
    opponentWins: z.number().int().nonnegative(),
    draws: z.number().int().nonnegative(),
    edge: z.enum(["player-leading", "tied", "opponent-leading"]),
  })
  .strict()
  .superRefine((headToHead, ctx) => {
    const counted = headToHead.playerWins + headToHead.opponentWins + headToHead.draws;
    if (counted !== headToHead.totalFinalized) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Head-to-head outcome counts must equal total finalized matches.",
        path: ["totalFinalized"],
      });
    }

    const expectedEdge =
      headToHead.playerWins > headToHead.opponentWins
        ? "player-leading"
        : headToHead.playerWins < headToHead.opponentWins
          ? "opponent-leading"
          : "tied";
    if (headToHead.edge !== expectedEdge) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Head-to-head edge must match authoritative win counts.",
        path: ["edge"],
      });
    }
  });

export const rivalryLastEncounterSchema = z
  .object({
    matchId: stableIdSchema,
    finalizedAt: z.string().datetime({ offset: true }),
    timezone: z.string().trim().min(1).max(64),
    playerScore: z.number().int().nonnegative(),
    opponentScore: z.number().int().nonnegative(),
    outcome: z.enum(["win", "loss", "draw"]),
    competition: rivalryCompetitionSchema,
  })
  .strict()
  .superRefine((encounter, ctx) => {
    const consistent =
      (encounter.outcome === "win" && encounter.playerScore > encounter.opponentScore) ||
      (encounter.outcome === "loss" && encounter.playerScore < encounter.opponentScore) ||
      (encounter.outcome === "draw" && encounter.playerScore === encounter.opponentScore);
    if (!consistent) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Last encounter score must match its authoritative outcome.",
        path: ["outcome"],
      });
    }
  });

export const playerRivalryItemSchema = z
  .object({
    rivalryId: stableIdSchema,
    opponent: rivalryOpponentSchema,
    game: rivalryGameSchema,
    headToHead: rivalryHeadToHeadSchema,
    lastEncounter: rivalryLastEncounterSchema,
  })
  .strict();

export const playerRivalriesSummarySchema = z
  .object({
    totalRivalries: z.number().int().nonnegative(),
    totalFinalizedMatches: z.number().int().nonnegative(),
    playerLeading: z.number().int().nonnegative(),
    tied: z.number().int().nonnegative(),
    opponentLeading: z.number().int().nonnegative(),
  })
  .strict()
  .superRefine((summary, ctx) => {
    if (summary.playerLeading + summary.tied + summary.opponentLeading !== summary.totalRivalries) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Rivalry edge summary must partition total rivalries.",
        path: ["totalRivalries"],
      });
    }
    if (
      (summary.totalRivalries === 0 && summary.totalFinalizedMatches !== 0) ||
      (summary.totalRivalries > 0 && summary.totalFinalizedMatches < summary.totalRivalries)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Finalized match summary is inconsistent with rivalry count.",
        path: ["totalFinalizedMatches"],
      });
    }
  });

export const playerRivalriesPaginationSchema = z
  .object({
    currentPage: z.number().int().positive(),
    totalPages: z.number().int().positive(),
    totalItems: z.number().int().nonnegative(),
  })
  .strict()
  .refine((pagination) => pagination.currentPage <= pagination.totalPages, {
    message: "Current page cannot exceed total pages.",
    path: ["currentPage"],
  });

export const playerRivalriesPageSchema = z
  .object({
    player: z
      .object({
        playerId: stableIdSchema,
        gamerTag: z.string().trim().min(1).max(80),
      })
      .strict(),
    summary: playerRivalriesSummarySchema,
    games: z.array(rivalryGameSchema),
    items: z.array(playerRivalryItemSchema),
    pagination: playerRivalriesPaginationSchema,
  })
  .strict()
  .superRefine((page, ctx) => {
    if (page.pagination.totalItems > page.summary.totalRivalries) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Filtered rivalry total cannot exceed overall rivalry total.",
        path: ["pagination", "totalItems"],
      });
    }
  });

export type PlayerRivalriesPageData = z.infer<typeof playerRivalriesPageSchema>;
export type PlayerRivalryItem = z.infer<typeof playerRivalryItemSchema>;

export const playerRivalriesLoadResultSchema = z.discriminatedUnion("state", [
  z.object({ state: z.literal("authenticated"), data: playerRivalriesPageSchema }).strict(),
  z.object({ state: z.literal("unauthenticated") }).strict(),
]);

export type PlayerRivalriesLoadResult = z.infer<typeof playerRivalriesLoadResultSchema>;

export interface PlayerRivalriesRepository {
  getRivalries(query: PlayerRivalriesQuery): Promise<PlayerRivalriesLoadResult>;
}
