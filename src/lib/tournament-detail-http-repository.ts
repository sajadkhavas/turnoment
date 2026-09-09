import { z } from "zod";
import {
  registrationActionResultSchema,
  registrationRequestSchema,
  tournamentDetailSchema,
  tournamentRegistrationContextSchema,
  type RegistrationActionResult,
  type RegistrationRequest,
  type TournamentDetail,
  type TournamentRegistrationContext,
} from "./tournament-detail-contract";
import type { TournamentDetailRepository } from "./tournament-detail-repository";
import type { PlayerSession } from "./player-session";

const csrfSchema = z.object({ csrf_token: z.string().min(1) });

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) {
    throw new Error("VITE_API_BASE_URL is required when the Django tournament adapter is enabled.");
  }
  return configured.endsWith("/") ? configured : `${configured}/`;
}

function tournamentPath(identifier: string, suffix = "") {
  const safeIdentifier = encodeURIComponent(identifier);
  return `api/v1/tournaments/${safeIdentifier}/${suffix}`;
}

async function bootstrapCsrf(baseUrl: string) {
  const response = await fetch(new URL("api/v1/auth/csrf/", baseUrl), {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`CSRF bootstrap failed with HTTP ${response.status}.`);
  return csrfSchema.parse(await response.json()).csrf_token;
}

export class DjangoTournamentDetailRepository implements TournamentDetailRepository {
  async getByIdentifier(identifier: string): Promise<TournamentDetail | null> {
    const baseUrl = apiBaseUrl();
    const response = await fetch(new URL(tournamentPath(identifier), baseUrl), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Tournament detail request failed with HTTP ${response.status}.`);
    return tournamentDetailSchema.parse(await response.json());
  }

  async getRegistrationContext(
    identifier: string,
    session: PlayerSession,
  ): Promise<TournamentRegistrationContext | null> {
    if (session.state !== "authenticated") return null;
    const baseUrl = apiBaseUrl();
    const response = await fetch(new URL(tournamentPath(identifier, "registration/"), baseUrl), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    if (response.status === 404) return null;
    if (response.status === 401 || response.status === 403) return null;
    if (!response.ok) throw new Error(`Tournament registration context failed with HTTP ${response.status}.`);
    return tournamentRegistrationContextSchema.parse(await response.json());
  }

  async register(identifier: string, request: RegistrationRequest): Promise<RegistrationActionResult> {
    const body = registrationRequestSchema.parse(request);
    const baseUrl = apiBaseUrl();
    const csrfToken = await bootstrapCsrf(baseUrl);
    const response = await fetch(new URL(tournamentPath(identifier, "registrations/"), baseUrl), {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(body),
    });

    const payload = await response.json().catch(() => null);
    if (payload !== null) {
      const parsed = registrationActionResultSchema.safeParse(payload);
      if (parsed.success) return parsed.data;
    }

    if (response.status === 401 || response.status === 403) {
      throw new Error("Registration session is not authorized.");
    }
    throw new Error(`Tournament registration request failed with HTTP ${response.status}.`);
  }
}
