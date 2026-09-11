import { z } from "zod";
import type { ChallengeHubPageData, ChallengeHubQuery, ChallengeHubRepository } from "./challenge-hub-data";

const actionSchema = z.enum(["accept", "decline", "cancel", "view"]);
const itemSchema = z.object({
  challengeId: z.string().min(1),
  direction: z.enum(["incoming", "outgoing"]),
  lifecycle: z.enum(["invitation-pending", "invitation-expired", "invitation-unavailable", "accepted", "match-ready", "awaiting-result", "action-required", "completed", "cancelled"]),
  statusLabel: z.string().min(1),
  actionRequiredLabel: z.string().min(1).nullable(),
  opponent: z.object({
    playerId: z.string().min(1), username: z.string().min(1), gamerTag: z.string().min(1),
    avatarInitials: z.string().min(1), challengeRating: z.number().int().nullable(),
  }),
  game: z.object({ gameId: z.string().min(1), name: z.string().min(1) }),
  formatLabel: z.string().min(1), createdAtLabel: z.string().min(1), responseDeadlineLabel: z.string().min(1).nullable(),
  note: z.string().min(1).nullable(),
  match: z.object({ matchId: z.string().min(1).nullable(), startsAtLabel: z.string().min(1).nullable(), venueLabel: z.string().min(1).nullable(), contextLabel: z.string().min(1).nullable() }).nullable(),
  result: z.object({
    outcome: z.enum(["win", "loss", "draw", "void"]), scoreLabel: z.string().min(1).nullable(),
    ratingDelta: z.number().int().nullable(), completedAtLabel: z.string().min(1),
  }).nullable(),
  allowedActions: z.array(actionSchema),
}).superRefine((item, context) => {
  if (["completed", "cancelled"].includes(item.lifecycle) && item.lifecycle === "completed" && item.result === null) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ["result"], message: "Completed challenges require an authoritative result." });
  }
  if (item.lifecycle !== "completed" && item.result !== null) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ["result"], message: "Only completed challenges may expose a final result." });
  }
  if (item.direction !== "incoming" && (item.allowedActions.includes("accept") || item.allowedActions.includes("decline"))) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ["allowedActions"], message: "Only incoming invitations may expose response actions." });
  }
});

export const challengeHubPageSchema = z.object({
  player: z.object({ playerId: z.string().min(1), username: z.string().min(1), gamerTag: z.string().min(1) }),
  access: z.object({
    unlocked: z.boolean(), canCreate: z.boolean(), challengeRating: z.number().int().nullable(),
    finalizedValidMatches: z.number().int().nonnegative(), requiredFinalizedMatches: z.number().int().positive(),
  }),
  summary: z.object({ incoming: z.number().int().nonnegative(), outgoing: z.number().int().nonnegative(), active: z.number().int().nonnegative(), completed: z.number().int().nonnegative() }),
  items: z.array(itemSchema),
  pagination: z.object({ currentPage: z.number().int().positive(), totalPages: z.number().int().positive(), totalItems: z.number().int().nonnegative() })
    .refine((value) => value.currentPage <= value.totalPages, { path: ["currentPage"], message: "Current page cannot exceed total pages." }),
});

export class ChallengeHubHttpError extends Error {
  readonly status: number;
  constructor(status: number) {
    super(`Challenge Hub request failed with HTTP ${status}.`);
    this.name = "ChallengeHubHttpError";
    this.status = status;
  }
}

export class DjangoChallengeHubRepository implements ChallengeHubRepository {
  async getChallengeHub(query: ChallengeHubQuery): Promise<ChallengeHubPageData> {
    const configured = import.meta.env.VITE_API_BASE_URL?.trim();
    if (!configured) throw new Error("VITE_API_BASE_URL is required when the Django Challenge Hub adapter is enabled.");
    const url = new URL("api/v1/me/challenges/", configured.endsWith("/") ? configured : `${configured}/`);
    if (query.status !== "all") url.searchParams.set("status", query.status);
    if (query.page > 1) url.searchParams.set("page", String(query.page));
    const response = await fetch(url, { method: "GET", credentials: "include", headers: { Accept: "application/json" } });
    if (!response.ok) throw new ChallengeHubHttpError(response.status);
    return challengeHubPageSchema.parse(await response.json()) as ChallengeHubPageData;
  }
}