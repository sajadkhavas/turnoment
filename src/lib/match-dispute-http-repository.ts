import { z } from "zod";
import {
  createDisputeActionSchema,
  createDisputeCommandSchema,
  matchDisputePageSchema,
  uploadEvidenceActionSchema,
  type CreateDisputeAction,
  type CreateDisputeCommand,
  type MatchDisputePageData,
  type MatchDisputeRepository,
  type UploadEvidenceAction,
  type UploadEvidenceCommand,
} from "./match-dispute-contract";

const csrfSchema = z.object({ csrf_token: z.string().min(1) });

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) throw new Error("VITE_API_BASE_URL is required when the Django Match Dispute adapter is enabled.");
  return configured.endsWith("/") ? configured : `${configured}/`;
}

function disputePath(matchId: string) {
  return `api/v1/matches/${encodeURIComponent(matchId)}/dispute/`;
}

function evidencePath(matchId: string, disputeId: string) {
  return `api/v1/matches/${encodeURIComponent(matchId)}/dispute/${encodeURIComponent(disputeId)}/evidence/`;
}

async function bootstrapCsrf(baseUrl: string) {
  const response = await fetch(new URL("api/v1/auth/csrf/", baseUrl), {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new MatchDisputeHttpError(response.status);
  return csrfSchema.parse(await response.json()).csrf_token;
}

export function parseCreateDisputeActionForMatch(matchId: string, payload: unknown): CreateDisputeAction {
  const action = createDisputeActionSchema.parse(payload);
  if ((action.outcome === "accepted" || action.outcome === "already_open") && action.matchId !== matchId) {
    throw new Error("Match Dispute receipt identity mismatch.");
  }
  return action;
}

export function parseEvidenceActionForIdentity(matchId: string, disputeId: string, payload: unknown): UploadEvidenceAction {
  const action = uploadEvidenceActionSchema.parse(payload);
  if (action.outcome === "accepted" || action.outcome === "already_uploaded") {
    if (action.matchId !== matchId || action.disputeId !== disputeId) throw new Error("Dispute evidence receipt identity mismatch.");
  }
  return action;
}

export class MatchDisputeHttpError extends Error {
  readonly status: number;
  constructor(status: number) {
    super(`Match Dispute request failed with HTTP ${status}.`);
    this.name = "MatchDisputeHttpError";
    this.status = status;
  }
}

export class DjangoMatchDisputeRepository implements MatchDisputeRepository {
  async getDispute(matchId: string): Promise<MatchDisputePageData | null> {
    const baseUrl = apiBaseUrl();
    const response = await fetch(new URL(disputePath(matchId), baseUrl), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new MatchDisputeHttpError(response.status);
    const page = matchDisputePageSchema.parse(await response.json());
    if (page.matchId !== matchId) throw new Error("Match Dispute projection identity mismatch.");
    return page;
  }

  async createDispute(matchId: string, command: CreateDisputeCommand): Promise<CreateDisputeAction> {
    const parsed = createDisputeCommandSchema.parse(command);
    const baseUrl = apiBaseUrl();
    const csrfToken = await bootstrapCsrf(baseUrl);
    const response = await fetch(new URL(disputePath(matchId), baseUrl), {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
        "Idempotency-Key": parsed.idempotencyKey,
      },
      body: JSON.stringify({ revision: parsed.revision, reason: parsed.reason, statement: parsed.statement }),
    });
    const payload = await response.json().catch(() => null);
    if (payload !== null) {
      const action = createDisputeActionSchema.safeParse(payload);
      if (action.success) return parseCreateDisputeActionForMatch(matchId, action.data);
    }
    throw new MatchDisputeHttpError(response.status);
  }

  async uploadEvidence(matchId: string, disputeId: string, command: UploadEvidenceCommand): Promise<UploadEvidenceAction> {
    const baseUrl = apiBaseUrl();
    const csrfToken = await bootstrapCsrf(baseUrl);
    const formData = new FormData();
    formData.append("revision", command.revision);
    formData.append("file", command.file, command.file.name);

    const response = await fetch(new URL(evidencePath(matchId, disputeId), baseUrl), {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "X-CSRFToken": csrfToken,
        "Idempotency-Key": command.idempotencyKey,
      },
      body: formData,
    });
    const payload = await response.json().catch(() => null);
    if (payload !== null) {
      const action = uploadEvidenceActionSchema.safeParse(payload);
      if (action.success) return parseEvidenceActionForIdentity(matchId, disputeId, action.data);
    }
    throw new MatchDisputeHttpError(response.status);
  }
}
