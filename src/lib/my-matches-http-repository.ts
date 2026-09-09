import { z } from "zod";
import type { MyMatchesPageData, MyMatchesQuery, MyMatchesRepository } from "./my-matches-data";

const gameSchema = z.object({ gameId: z.string().min(1), name: z.string().min(1) });
const playerSchema = z.object({ playerId: z.string().min(1), gamerTag: z.string().min(1) });
const opponentSchema = z.object({
  participantId: z.string().min(1),
  kind: z.enum(["player", "team"]),
  displayTag: z.string().min(1),
});
const venueSchema = z.object({
  gamingCenterId: z.string().min(1),
  name: z.string().min(1),
  city: z.string().min(1),
});
const competitionSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("tournament"),
    competitionId: z.string().min(1),
    title: z.string().min(1),
    tournamentSlug: z.string().min(1),
    roundLabel: z.string().min(1),
  }),
  z.object({
    kind: z.literal("challenge"),
    competitionId: z.string().min(1),
    title: z.string().min(1),
    roundLabel: z.null(),
  }),
]);
const finalResultSchema = z.object({
  playerScore: z.number().int().nonnegative(),
  opponentScore: z.number().int().nonnegative(),
  outcome: z.enum(["win", "loss", "draw", "void"]),
  ratingDelta: z.number().int().nullable(),
  finalizedAt: z.string().datetime({ offset: true }),
});

export const myMatchItemSchema = z
  .object({
    matchId: z.string().min(1),
    game: gameSchema,
    competition: competitionSchema,
    opponent: opponentSchema,
    venue: venueSchema.nullable(),
    startsAt: z.string().datetime({ offset: true }),
    timezone: z.string().min(1),
    formatLabel: z.string().min(1),
    lifecycleState: z.enum([
      "scheduled", "ready", "live", "awaiting-result", "awaiting-confirmation", "disputed", "completed", "cancelled",
    ]),
    checkInState: z.enum(["not-required", "not-open", "open", "completed", "missed"]),
    resultState: z.enum(["not-open", "reportable", "awaiting-confirmation", "disputed", "finalized", "void"]),
    disputeState: z.enum(["none", "open", "under-review", "resolved"]),
    attention: z.enum(["none", "check-in", "submit-result", "confirm-result", "dispute"]),
    result: finalResultSchema.nullable(),
  })
  .superRefine((item, ctx) => {
    if (item.resultState === "finalized" && item.result === null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Finalized matches require a finalized result.", path: ["result"] });
    }
    if (item.resultState !== "finalized" && item.result !== null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Only finalized matches may expose a finalized result.", path: ["result"] });
    }
    if (item.lifecycleState === "completed" && item.resultState !== "finalized") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Completed matches require finalized result state.", path: ["resultState"] });
    }
    if (item.lifecycleState === "cancelled" && item.resultState !== "void") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Cancelled matches require void result state.", path: ["resultState"] });
    }
    if (item.lifecycleState === "disputed" && !["open", "under-review"].includes(item.disputeState)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Disputed matches require an active dispute state.", path: ["disputeState"] });
    }
    if (item.lifecycleState === "disputed" && item.resultState !== "disputed") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Disputed matches require disputed result state.", path: ["resultState"] });
    }
    if (item.attention === "check-in" && item.checkInState !== "open") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Check-in attention requires open check-in state.", path: ["attention"] });
    }
    if (item.attention === "submit-result" && item.resultState !== "reportable") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Submit-result attention requires reportable result state.", path: ["attention"] });
    }
    if (item.attention === "confirm-result" && item.resultState !== "awaiting-confirmation") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Confirm-result attention requires awaiting-confirmation result state.", path: ["attention"] });
    }
    if (item.attention === "dispute" && !["open", "under-review"].includes(item.disputeState)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Dispute attention requires an active dispute.", path: ["attention"] });
    }
  });

const paginationSchema = z
  .object({
    currentPage: z.number().int().positive(),
    totalPages: z.number().int().positive(),
    totalItems: z.number().int().nonnegative(),
  })
  .refine((pagination) => pagination.currentPage <= pagination.totalPages, {
    message: "Current page cannot exceed total pages.",
    path: ["currentPage"],
  });

export const myMatchesPageSchema = z
  .object({
    player: playerSchema,
    summary: z.object({
      total: z.number().int().nonnegative(),
      upcoming: z.number().int().nonnegative(),
      actionRequired: z.number().int().nonnegative(),
      completed: z.number().int().nonnegative(),
      disputed: z.number().int().nonnegative(),
    }),
    games: z.array(gameSchema),
    items: z.array(myMatchItemSchema),
    pagination: paginationSchema,
  })
  .superRefine((page, ctx) => {
    for (const [key, value] of Object.entries(page.summary)) {
      if (key !== "total" && value > page.summary.total) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: `${key} summary count cannot exceed total.`, path: ["summary", key] });
      }
    }
  });

export class MyMatchesHttpError extends Error {
  readonly status: number;
  constructor(status: number) {
    super(`My Matches request failed with HTTP ${status}.`);
    this.name = "MyMatchesHttpError";
    this.status = status;
  }
}

export class DjangoMyMatchesRepository implements MyMatchesRepository {
  async getMyMatches(query: MyMatchesQuery): Promise<MyMatchesPageData> {
    const configured = import.meta.env.VITE_API_BASE_URL?.trim();
    if (!configured) throw new Error("VITE_API_BASE_URL is required when the Django My Matches adapter is enabled.");

    const baseUrl = configured.endsWith("/") ? configured : `${configured}/`;
    const url = new URL("api/v1/me/matches/", baseUrl);
    if (query.state !== "all") url.searchParams.set("state", query.state);
    if (query.kind !== "all") url.searchParams.set("kind", query.kind);
    if (query.gameId) url.searchParams.set("game", query.gameId);
    if (query.page > 1) url.searchParams.set("page", String(query.page));

    const response = await fetch(url, { method: "GET", credentials: "include", headers: { Accept: "application/json" } });
    if (!response.ok) throw new MyMatchesHttpError(response.status);
    return myMatchesPageSchema.parse(await response.json()) as MyMatchesPageData;
  }
}
