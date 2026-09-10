import {
  playerRivalriesLoadResultSchema,
  type PlayerRivalriesQuery,
  type PlayerRivalriesRepository,
} from "./player-rivalries-contract";

export class PlayerRivalriesHttpError extends Error {
  readonly status: number;

  constructor(status: number, message = "دریافت رقابت‌ها انجام نشد.") {
    super(message);
    this.name = "PlayerRivalriesHttpError";
    this.status = status;
  }
}

export class DjangoPlayerRivalriesRepository implements PlayerRivalriesRepository {
  async getRivalries(query: PlayerRivalriesQuery) {
    const configured = import.meta.env.VITE_API_BASE_URL?.trim();
    if (!configured) {
      throw new PlayerRivalriesHttpError(0, "دریافت رقابت‌ها انجام نشد.");
    }

    const baseUrl = configured.endsWith("/") ? configured : `${configured}/`;
    const url = new URL("api/v1/me/rivalries/", baseUrl);
    if (query.kind !== "all") url.searchParams.set("kind", query.kind);
    if (query.gameId) url.searchParams.set("game", query.gameId);
    if (query.sort !== "recent") url.searchParams.set("sort", query.sort);
    if (query.page > 1) url.searchParams.set("page", String(query.page));

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (response.status === 401 || response.status === 403) {
      return playerRivalriesLoadResultSchema.parse({ state: "unauthenticated" });
    }
    if (!response.ok) throw new PlayerRivalriesHttpError(response.status);

    return playerRivalriesLoadResultSchema.parse({
      state: "authenticated",
      data: await response.json(),
    });
  }
}
