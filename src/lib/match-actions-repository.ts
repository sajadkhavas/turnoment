import { z } from "zod";
import { getDataAdapterMode } from "./data-adapter";

const revision = z.string().min(1).max(20);
const score = z.number().int().nonnegative();
export const confirmResultCommandSchema = z.object({
  revision, playerScore: score, opponentScore: score,
}).strict();
export const lifecycleCommandSchema = z.object({
  command: z.enum(["start", "finish"]), revision,
}).strict();
export const confirmResultActionSchema = z.discriminatedUnion("outcome", [
  z.object({ outcome: z.literal("finalized"), eventId: z.string().uuid(), revision }),
  z.object({ outcome: z.literal("already_finalized"), eventId: z.string().uuid() }),
  z.object({ outcome: z.literal("stale"), revision }),
  z.object({ outcome: z.literal("score_mismatch") }),
  z.object({ outcome: z.literal("unavailable") }),
]);
const lifecycleActionSchema = z.discriminatedUnion("outcome", [
  z.object({ outcome: z.literal("accepted"), matchId: z.string().min(1),
    state: z.enum(["live", "awaiting-result"]), revision }),
  z.object({ outcome: z.literal("stale"), revision }),
  z.object({ outcome: z.literal("unavailable") }),
]);
export type ConfirmResultCommand = z.infer<typeof confirmResultCommandSchema>;
export type LifecycleCommand = z.infer<typeof lifecycleCommandSchema>;
export interface MatchActionsRepository {
  confirmResult(matchId: string, command: ConfirmResultCommand): Promise<z.infer<typeof confirmResultActionSchema>>;
  changeLifecycle(matchId: string, command: LifecycleCommand): Promise<z.infer<typeof lifecycleActionSchema>>;
}
export function parseLifecycleAction(matchId: string, command: LifecycleCommand, payload: unknown) {
  const action = lifecycleActionSchema.parse(payload);
  if (action.outcome === "accepted" && (action.matchId !== matchId ||
      action.state !== (command.command === "start" ? "live" : "awaiting-result"))) {
    throw new Error("Lifecycle receipt does not match the requested transition.");
  }
  return action;
}
export class ApiMatchActionsRepository implements MatchActionsRepository {
  constructor(private readonly baseUrl: () => string, private readonly request: typeof fetch = fetch) {}
  private async post(matchId: string, action: string, body: unknown): Promise<unknown> {
    if (!matchId.trim()) throw new Error("Missing match identity.");
    const base = this.baseUrl();
    // Window.fetch requires a Window receiver in Chromium. Calling it as
    // this.request(...) binds the repository instance and throws before I/O.
    const request = this.request.bind(globalThis);
    const csrf = await request(new URL("api/v1/auth/csrf/", base), {
      credentials: "include", headers: { Accept: "application/json" },
    });
    if (!csrf.ok) throw new Error("Unable to authorize the action.");
    const token = z.object({ csrf_token: z.string().min(1) }).parse(await csrf.json()).csrf_token;
    const response = await request(new URL(`api/v1/matches/${encodeURIComponent(matchId)}/${action}/`, base), {
      method: "POST", credentials: "include",
      headers: { Accept: "application/json", "Content-Type": "application/json", "X-CSRFToken": token },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error("Match action was not acknowledged.");
    return response.json();
  }
  async confirmResult(matchId: string, command: ConfirmResultCommand) {
    const parsed = confirmResultCommandSchema.parse(command);
    return confirmResultActionSchema.parse(await this.post(matchId, "result/confirm", parsed));
  }
  async changeLifecycle(matchId: string, command: LifecycleCommand) {
    const parsed = lifecycleCommandSchema.parse(command);
    return parseLifecycleAction(matchId, parsed, await this.post(matchId, "lifecycle", parsed));
  }
}
export const matchActionsRepository: MatchActionsRepository = new ApiMatchActionsRepository(() => {
  if (getDataAdapterMode() !== "api") throw new Error("Live match actions require the API adapter.");
  const base = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!base) throw new Error("Missing API configuration.");
  return base.endsWith("/") ? base : `${base}/`;
});
