import {
  playerTeamsLoadResultSchema,
  type PlayerTeamsQuery,
  type PlayerTeamsRepository,
} from "./player-teams-contract";

export class PlayerTeamsHttpError extends Error {
  readonly status: number;

  constructor(status: number, message = "دریافت اطلاعات تیم‌ها انجام نشد.") {
    super(message);
    this.name = "PlayerTeamsHttpError";
    this.status = status;
  }
}

export class DjangoPlayerTeamsRepository implements PlayerTeamsRepository {
  async getTeams(query: PlayerTeamsQuery) {
    const configured = import.meta.env.VITE_API_BASE_URL?.trim();
    if (!configured) throw new PlayerTeamsHttpError(0);

    const baseUrl = configured.endsWith("/") ? configured : `${configured}/`;
    const url = new URL("api/v1/me/teams/", baseUrl);
    if (query.teamId) url.searchParams.set("team", query.teamId);
    if (query.page > 1) url.searchParams.set("page", String(query.page));

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (response.status === 401 || response.status === 403) {
      return playerTeamsLoadResultSchema.parse({ state: "unauthenticated" });
    }
    if (!response.ok) throw new PlayerTeamsHttpError(response.status);

    return playerTeamsLoadResultSchema.parse({
      state: "authenticated",
      data: await response.json(),
    });
  }
}
