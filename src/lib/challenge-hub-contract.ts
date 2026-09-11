import { z } from "zod";

export const challengeHubFilters = ["all", "incoming", "outgoing", "active", "action-required", "completed"] as const;
export type ChallengeHubFilter = (typeof challengeHubFilters)[number];

export const challengeLifecycleSchema = z.enum([
  "invitation-pending",
  "invitation-expired",
  "invitation-declined",
  "accepted",
  "match-ready",
  "awaiting-result",
  "action-required",
  "completed",
  "cancelled",
]);
export type ChallengeLifecycle = z.infer<typeof challengeLifecycleSchema>;

export const challengeDirectionSchema = z.enum(["incoming", "outgoing"]);
export type ChallengeDirection = z.infer<typeof challengeDirectionSchema>;

export const challengeOutcomeSchema = z.enum(["win", "loss", "draw", "void"]);
export type ChallengeOutcome = z.infer<typeof challengeOutcomeSchema>;

export const challengeCommandSchema = z.enum(["accept", "decline", "cancel"]);
export type ChallengeCommand = z.infer<typeof challengeCommandSchema>;

const stableIdSchema = z.string().trim().regex(/^[A-Za-z0-9_-]{1,128}$/);
const revisionSchema = z.string().trim().min(1).max(200);
const labelSchema = z.string().trim().min(1).max(200);

export const challengeNavigationTargetSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("my-matches") }).strict(),
  z.object({ kind: z.literal("result-submission"), matchId: stableIdSchema }).strict(),
  z.object({ kind: z.literal("match-dispute"), matchId: stableIdSchema }).strict(),
]);
export type ChallengeNavigationTarget = z.infer<typeof challengeNavigationTargetSchema>;

export const challengeOpponentSchema = z
  .object({
    playerId: stableIdSchema,
    username: z.string().trim().min(1).max(80),
    gamerTag: z.string().trim().min(1).max(80),
    avatarInitials: z.string().trim().min(1).max(4),
    challengeRating: z.number().int().nullable(),
  })
  .strict();
export type ChallengeOpponent = z.infer<typeof challengeOpponentSchema>;

export const challengeFormatSchema = z.object({ formatId: stableIdSchema, label: labelSchema }).strict();
export type ChallengeFormat = z.infer<typeof challengeFormatSchema>;

export const challengeCreationGameSchema = z
  .object({ gameId: stableIdSchema, name: labelSchema, formats: z.array(challengeFormatSchema).min(1) })
  .strict();
export type ChallengeCreationGame = z.infer<typeof challengeCreationGameSchema>;

export const challengeAccessSchema = z
  .object({
    unlocked: z.boolean(),
    canCreate: z.boolean(),
    challengeRating: z.number().int().nullable(),
    finalizedValidMatches: z.number().int().nonnegative(),
    requiredFinalizedMatches: z.literal(30),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (!value.unlocked && value.canCreate) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["canCreate"], message: "Locked Challenge access cannot create Challenges." });
    }
    if (!value.unlocked && value.finalizedValidMatches >= value.requiredFinalizedMatches) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["unlocked"], message: "Unlock projection contradicts finalized-valid Match threshold." });
    }
  });
export type ChallengeAccess = z.infer<typeof challengeAccessSchema>;

export const challengeCreationOptionsSchema = z
  .object({
    games: z.array(challengeCreationGameSchema),
    opponentSearchMinChars: z.number().int().min(2).max(20),
    noteMaxLength: z.number().int().min(0).max(1000),
  })
  .strict();
export type ChallengeCreationOptions = z.infer<typeof challengeCreationOptionsSchema>;

const challengeMatchContextSchema = z
  .object({
    matchId: stableIdSchema.nullable(),
    startsAtLabel: z.string().trim().min(1).max(160).nullable(),
    venueLabel: z.string().trim().min(1).max(200).nullable(),
    contextLabel: z.string().trim().min(1).max(120).nullable(),
  })
  .strict();

const challengeFinalResultSchema = z
  .object({
    outcome: challengeOutcomeSchema,
    scoreLabel: z.string().trim().min(1).max(80).nullable(),
    ratingDelta: z.number().int().nullable(),
    completedAtLabel: labelSchema,
  })
  .strict();
export type ChallengeFinalResult = z.infer<typeof challengeFinalResultSchema>;

export const challengeItemSchema = z
  .object({
    challengeId: stableIdSchema,
    revision: revisionSchema,
    direction: challengeDirectionSchema,
    lifecycle: challengeLifecycleSchema,
    statusLabel: labelSchema,
    actionRequiredLabel: z.string().trim().min(1).max(240).nullable(),
    opponent: challengeOpponentSchema,
    game: z.object({ gameId: stableIdSchema, name: labelSchema }).strict(),
    format: challengeFormatSchema,
    createdAtLabel: labelSchema,
    responseDeadlineLabel: z.string().trim().min(1).max(160).nullable(),
    note: z.string().trim().min(1).max(1000).nullable(),
    match: challengeMatchContextSchema.nullable(),
    result: challengeFinalResultSchema.nullable(),
    allowedCommands: z.array(challengeCommandSchema),
    navigationTarget: challengeNavigationTargetSchema.nullable(),
  })
  .strict()
  .superRefine((item, ctx) => {
    const pendingIncoming = item.direction === "incoming" && item.lifecycle === "invitation-pending";
    const pendingOutgoing = item.direction === "outgoing" && item.lifecycle === "invitation-pending";

    if (item.allowedCommands.includes("accept") && !pendingIncoming) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["allowedCommands"], message: "Accept is only valid for incoming pending invitations." });
    }
    if (item.allowedCommands.includes("decline") && !pendingIncoming) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["allowedCommands"], message: "Decline is only valid for incoming pending invitations." });
    }
    if (item.allowedCommands.includes("cancel") && !pendingOutgoing) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["allowedCommands"], message: "Cancel is only valid for outgoing pending invitations." });
    }
    if (item.lifecycle === "completed" && item.result === null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["result"], message: "Completed Challenge requires authoritative result." });
    }
    if (item.lifecycle !== "completed" && item.result !== null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["result"], message: "Only completed Challenge may expose final result." });
    }
    if ((item.navigationTarget?.kind === "result-submission" || item.navigationTarget?.kind === "match-dispute") && item.match?.matchId !== item.navigationTarget.matchId) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["navigationTarget"], message: "Match navigation target must match projected Challenge Match identity." });
    }
  });
export type ChallengeItem = z.infer<typeof challengeItemSchema>;

export const challengeHubPageSchema = z
  .object({
    player: z.object({ playerId: stableIdSchema, username: z.string().trim().min(1).max(80), gamerTag: z.string().trim().min(1).max(80) }).strict(),
    access: challengeAccessSchema,
    creation: challengeCreationOptionsSchema,
    summary: z.object({ incoming: z.number().int().nonnegative(), outgoing: z.number().int().nonnegative(), active: z.number().int().nonnegative(), completed: z.number().int().nonnegative() }).strict(),
    items: z.array(challengeItemSchema),
    pagination: z.object({ currentPage: z.number().int().positive(), totalPages: z.number().int().nonnegative(), totalItems: z.number().int().nonnegative() }).strict(),
  })
  .strict()
  .superRefine((page, ctx) => {
    const totalAccountChallenges = page.summary.incoming + page.summary.outgoing + page.summary.active + page.summary.completed;
    if (page.pagination.totalItems > totalAccountChallenges) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["pagination", "totalItems"], message: "Filtered total cannot exceed account Challenge summary total." });
    }
    if (page.items.length > page.pagination.totalItems) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["items"], message: "Returned Challenge items cannot exceed filtered total." });
    }
    if (page.pagination.totalPages === 0 && page.pagination.totalItems !== 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["pagination", "totalPages"], message: "Non-empty Challenge result requires pages." });
    }
    if (page.pagination.totalPages > 0 && page.pagination.currentPage > page.pagination.totalPages) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["pagination", "currentPage"], message: "Current Challenge page cannot exceed total pages." });
    }
    if (page.access.canCreate && page.creation.games.length === 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["creation", "games"], message: "Create-enabled projection requires at least one server-approved game." });
    }
    const identities = new Set<string>();
    for (const item of page.items) {
      if (identities.has(item.challengeId)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["items"], message: "Challenge identities must be unique within a page." });
        break;
      }
      identities.add(item.challengeId);
    }
  });
export type ChallengeHubPageData = z.infer<typeof challengeHubPageSchema>;

export const challengeHubLoadResultSchema = z.discriminatedUnion("state", [
  z.object({ state: z.literal("authenticated"), data: challengeHubPageSchema }).strict(),
  z.object({ state: z.literal("unauthenticated") }).strict(),
]);
export type ChallengeHubLoadResult = z.infer<typeof challengeHubLoadResultSchema>;

export interface ChallengeHubQuery {
  status: ChallengeHubFilter;
  page: number;
}

export const opponentSearchRequestSchema = z.object({ query: z.string().trim().min(1).max(80), gameId: stableIdSchema }).strict();
export type OpponentSearchRequest = z.infer<typeof opponentSearchRequestSchema>;

export const opponentSearchActionSchema = z.discriminatedUnion("outcome", [
  z.object({ outcome: z.literal("results"), query: z.string().trim().min(1).max(80), items: z.array(challengeOpponentSchema).max(20) }).strict(),
  z.object({ outcome: z.literal("validation_error"), message: z.string().trim().min(1).max(300) }).strict(),
  z.object({ outcome: z.literal("session_expired"), message: z.string().trim().min(1).max(300) }).strict(),
]);
export type OpponentSearchAction = z.infer<typeof opponentSearchActionSchema>;

export const createChallengeCommandSchema = z
  .object({
    opponentPlayerId: stableIdSchema,
    gameId: stableIdSchema,
    formatId: stableIdSchema,
    note: z.string().trim().max(1000),
    idempotencyKey: z.string().trim().min(8).max(200),
  })
  .strict();
export type CreateChallengeCommand = z.infer<typeof createChallengeCommandSchema>;

export const challengeMutationActionSchema = z.discriminatedUnion("outcome", [
  z.object({ outcome: z.literal("accepted"), challengeId: stableIdSchema, revision: revisionSchema }).strict(),
  z.object({ outcome: z.literal("stale"), message: z.string().trim().min(1).max(300) }).strict(),
  z.object({ outcome: z.literal("unavailable"), message: z.string().trim().min(1).max(300) }).strict(),
  z.object({ outcome: z.literal("conflict"), message: z.string().trim().min(1).max(300) }).strict(),
  z.object({ outcome: z.literal("validation_error"), fields: z.object({ opponent: z.string().optional(), game: z.string().optional(), format: z.string().optional(), note: z.string().optional(), form: z.string().optional() }).strict() }).strict(),
  z.object({ outcome: z.literal("session_expired"), message: z.string().trim().min(1).max(300) }).strict(),
]);
export type ChallengeMutationAction = z.infer<typeof challengeMutationActionSchema>;

export const respondChallengeCommandSchema = z.object({ revision: revisionSchema, action: z.enum(["accept", "decline"]), idempotencyKey: z.string().trim().min(8).max(200) }).strict();
export type RespondChallengeCommand = z.infer<typeof respondChallengeCommandSchema>;

export const cancelChallengeCommandSchema = z.object({ revision: revisionSchema, idempotencyKey: z.string().trim().min(8).max(200) }).strict();
export type CancelChallengeCommand = z.infer<typeof cancelChallengeCommandSchema>;

export interface ChallengeHubRepository {
  getChallengeHub(query: ChallengeHubQuery): Promise<ChallengeHubLoadResult>;
  searchOpponents(request: OpponentSearchRequest): Promise<OpponentSearchAction>;
  createChallenge(command: CreateChallengeCommand): Promise<ChallengeMutationAction>;
  respondToChallenge(challengeId: string, command: RespondChallengeCommand): Promise<ChallengeMutationAction>;
  cancelChallenge(challengeId: string, command: CancelChallengeCommand): Promise<ChallengeMutationAction>;
}

export function validateCreateChallengeDraft(data: ChallengeHubPageData, draft: { opponentPlayerId: string; gameId: string; formatId: string; note: string }) {
  const errors: { opponent?: string; game?: string; format?: string; note?: string } = {};
  if (!draft.opponentPlayerId) errors.opponent = "حریف را از نتیجه جست‌وجو انتخاب کن.";
  const game = data.creation.games.find((item) => item.gameId === draft.gameId);
  if (!game) errors.game = "بازی را از گزینه‌های مجاز انتخاب کن.";
  if (!game?.formats.some((item) => item.formatId === draft.formatId)) errors.format = "فرمت Match را از گزینه‌های مجاز انتخاب کن.";
  if (draft.note.trim().length > data.creation.noteMaxLength) errors.note = `یادداشت نمی‌تواند بیشتر از ${data.creation.noteMaxLength} کاراکتر باشد.`;
  return errors;
}
