import { z } from "zod";
import {
  resultSubmissionPageSchema,
  submitResultActionSchema,
  submitResultCommandSchema,
  type ResultSubmissionPageData,
  type ResultSubmissionRepository,
  type SubmitResultAction,
  type SubmitResultCommand,
} from "./result-submission-contract";

const csrfSchema = z.object({ csrf_token: z.string().min(1) });

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) {
    throw new Error("VITE_API_BASE_URL is required when the Django Result Submission adapter is enabled.");
  }
  return configured.endsWith("/") ? configured : `${configured}/`;
}

function resultPath(matchId: string) {
  return `api/v1/matches/${encodeURIComponent(matchId)}/result/`;
}

async function bootstrapCsrf(baseUrl: string) {
  const response = await fetch(new URL("api/v1/auth/csrf/", baseUrl), {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new ResultSubmissionHttpError(response.status);
  return csrfSchema.parse(await response.json()).csrf_token;
}

export class ResultSubmissionHttpError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`Result Submission request failed with HTTP ${status}.`);
    this.name = "ResultSubmissionHttpError";
    this.status = status;
  }
}

export class DjangoResultSubmissionRepository implements ResultSubmissionRepository {
  async getResultSubmission(matchId: string): Promise<ResultSubmissionPageData | null> {
    const baseUrl = apiBaseUrl();
    const response = await fetch(new URL(resultPath(matchId), baseUrl), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (response.status === 404) return null;
    if (!response.ok) throw new ResultSubmissionHttpError(response.status);
    return resultSubmissionPageSchema.parse(await response.json());
  }

  async submitResult(matchId: string, command: SubmitResultCommand): Promise<SubmitResultAction> {
    const parsed = submitResultCommandSchema.parse(command);
    const baseUrl = apiBaseUrl();
    const csrfToken = await bootstrapCsrf(baseUrl);

    const response = await fetch(new URL(resultPath(matchId), baseUrl), {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
        "Idempotency-Key": parsed.idempotencyKey,
      },
      body: JSON.stringify({
        revision: parsed.revision,
        playerScore: parsed.playerScore,
        opponentScore: parsed.opponentScore,
      }),
    });

    const payload = await response.json().catch(() => null);
    if (payload !== null) {
      const action = submitResultActionSchema.safeParse(payload);
      if (action.success) return action.data;
    }

    throw new ResultSubmissionHttpError(response.status);
  }
}
