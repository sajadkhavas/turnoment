import { z } from "zod";
import {
  challengeHubLoadResultSchema,
  challengeMutationActionSchema,
  opponentSearchActionSchema,
  type CancelChallengeCommand,
  type ChallengeHubQuery,
  type ChallengeHubRepository,
  type ChallengeMutationAction,
  type CreateChallengeCommand,
  type OpponentSearchRequest,
  type RespondChallengeCommand,
} from "./challenge-hub-contract";

const csrfSchema = z.object({ csrf_token: z.string().min(1) });

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) throw new ChallengeHubHttpError(0, "اطلاعات چالش‌ها در دسترس نیست.");
  return configured.endsWith("/") ? configured : `${configured}/`;
}

async function responseJson(response: Response) {
  return response.json().catch(() => null) as Promise<unknown>;
}

function queryString(query: ChallengeHubQuery) {
  const search = new URLSearchParams();
  if (query.status !== "all") search.set("status", query.status);
  if (query.page > 1) search.set("page", String(query.page));
  const value = search.toString();
  return value ? `?${value}` : "";
}

async function bootstrapCsrf(baseUrl: string) {
  const response = await fetch(new URL("api/v1/auth/csrf/", baseUrl), {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new ChallengeHubHttpError(response.status, "ثبت تغییرات چالش انجام نشد.");
  return csrfSchema.parse(await responseJson(response)).csrf_token;
}

export class ChallengeHubHttpError extends Error {
  readonly status: number;

  constructor(status: number, message = "دریافت اطلاعات چالش‌ها انجام نشد.") {
    super(message);
    this.name = "ChallengeHubHttpError";
    this.status = status;
  }
}

function mutationFallback(response: Response, payload: unknown, fallback: "conflict" | "stale"): ChallengeMutationAction {
  const parsed = challengeMutationActionSchema.safeParse(payload);
  if (parsed.success) return parsed.data;
  if (response.status === 401 || response.status === 403) {
    return challengeMutationActionSchema.parse({ outcome: "session_expired", message: "نشست ورود پایان یافته است. دوباره وارد حساب شو." });
  }
  if (response.status === 404 || response.status === 410) {
    return challengeMutationActionSchema.parse({ outcome: "unavailable", message: "این چالش دیگر در دسترس نیست." });
  }
  if (response.status === 409) {
    return challengeMutationActionSchema.parse({
      outcome: fallback,
      message: fallback === "stale" ? "وضعیت چالش تغییر کرده است؛ اطلاعات تازه نمایش داده می‌شود." : "این درخواست با وضعیت فعلی چالش تداخل دارد.",
    });
  }
  if (response.status === 400 || response.status === 422) {
    return challengeMutationActionSchema.parse({ outcome: "validation_error", fields: { form: "اطلاعات درخواست معتبر نیست. گزینه‌ها را دوباره بررسی کن." } });
  }
  throw new ChallengeHubHttpError(response.status, "ثبت تغییرات چالش انجام نشد.");
}

export class DjangoChallengeHubRepository implements ChallengeHubRepository {
  async getChallengeHub(query: ChallengeHubQuery) {
    const baseUrl = apiBaseUrl();
    const response = await fetch(new URL(`api/v1/me/challenges/${queryString(query)}`, baseUrl), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    if (response.status === 401 || response.status === 403) {
      return challengeHubLoadResultSchema.parse({ state: "unauthenticated" });
    }
    if (!response.ok) throw new ChallengeHubHttpError(response.status);
    return challengeHubLoadResultSchema.parse({ state: "authenticated", data: await responseJson(response) });
  }

  async searchOpponents(request: OpponentSearchRequest) {
    const baseUrl = apiBaseUrl();
    const search = new URLSearchParams({ q: request.query.trim(), game: request.gameId });
    const response = await fetch(new URL(`api/v1/me/challenges/opponents/?${search.toString()}`, baseUrl), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    const payload = await responseJson(response);
    if (response.status === 401 || response.status === 403) {
      return opponentSearchActionSchema.parse({ outcome: "session_expired", message: "نشست ورود پایان یافته است. دوباره وارد حساب شو." });
    }
    const parsed = opponentSearchActionSchema.safeParse(payload);
    if (parsed.success) return parsed.data;
    if (response.status === 400 || response.status === 422) {
      return opponentSearchActionSchema.parse({ outcome: "validation_error", message: "عبارت جست‌وجو را بررسی کن." });
    }
    if (!response.ok) throw new ChallengeHubHttpError(response.status, "جست‌وجوی حریف انجام نشد.");
    throw new ChallengeHubHttpError(502, "پاسخ جست‌وجوی حریف معتبر نبود.");
  }

  async createChallenge(command: CreateChallengeCommand) {
    const baseUrl = apiBaseUrl();
    const csrfToken = await bootstrapCsrf(baseUrl);
    const response = await fetch(new URL("api/v1/me/challenges/", baseUrl), {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
        "Idempotency-Key": command.idempotencyKey,
      },
      body: JSON.stringify({
        opponentPlayerId: command.opponentPlayerId,
        gameId: command.gameId,
        formatId: command.formatId,
        note: command.note.trim(),
      }),
    });
    return mutationFallback(response, await responseJson(response), "conflict");
  }

  async respondToChallenge(challengeId: string, command: RespondChallengeCommand) {
    const baseUrl = apiBaseUrl();
    const csrfToken = await bootstrapCsrf(baseUrl);
    const response = await fetch(new URL(`api/v1/me/challenges/${encodeURIComponent(challengeId)}/response/`, baseUrl), {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
        "Idempotency-Key": command.idempotencyKey,
      },
      body: JSON.stringify({ revision: command.revision, action: command.action }),
    });
    return mutationFallback(response, await responseJson(response), "stale");
  }

  async cancelChallenge(challengeId: string, command: CancelChallengeCommand) {
    const baseUrl = apiBaseUrl();
    const csrfToken = await bootstrapCsrf(baseUrl);
    const response = await fetch(new URL(`api/v1/me/challenges/${encodeURIComponent(challengeId)}/cancel/`, baseUrl), {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
        "Idempotency-Key": command.idempotencyKey,
      },
      body: JSON.stringify({ revision: command.revision }),
    });
    return mutationFallback(response, await responseJson(response), "stale");
  }
}
