export type PlayerSessionState = "authenticated" | "unauthenticated" | "session-expired";

export interface PlayerSession {
  state: PlayerSessionState;
  playerId?: string;
  username?: string;
}

export interface PlayerSessionRepository {
  getSession(): Promise<PlayerSession>;
}

class MockPlayerSessionRepository implements PlayerSessionRepository {
  async getSession(): Promise<PlayerSession> {
    return {
      state: "authenticated",
      playerId: "p-001",
      username: "sajadx",
    };
  }
}

class DjangoPlayerSessionRepository implements PlayerSessionRepository {
  async getSession(): Promise<PlayerSession> {
    const configured = import.meta.env.VITE_API_BASE_URL?.trim();
    if (!configured) {
      throw new Error("VITE_API_BASE_URL is required when the Django session adapter is enabled.");
    }

    const baseUrl = configured.endsWith("/") ? configured : `${configured}/`;
    const response = await fetch(new URL("api/v1/auth/me/", baseUrl), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (response.status === 401 || response.status === 403) {
      return { state: "unauthenticated" };
    }

    if (!response.ok) {
      throw new Error(`Session lookup failed with HTTP ${response.status}.`);
    }

    const payload = (await response.json()) as Record<string, unknown>;
    const id = payload.id;
    const username = payload.username ?? payload.gamer_tag ?? payload.gamerTag;

    return {
      state: "authenticated",
      playerId: typeof id === "string" || typeof id === "number" ? String(id) : undefined,
      username: typeof username === "string" ? username : undefined,
    };
  }
}

export const playerSessionRepository: PlayerSessionRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django"
    ? new DjangoPlayerSessionRepository()
    : new MockPlayerSessionRepository();
