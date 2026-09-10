import {
  playerAchievementsLoadResultSchema,
  type PlayerAchievementsQuery,
  type PlayerAchievementsRepository,
} from "./player-achievements-contract";

export class PlayerAchievementsHttpError extends Error {
  readonly status: number;

  constructor(status: number, message = "دریافت دستاوردها انجام نشد.") {
    super(message);
    this.name = "PlayerAchievementsHttpError";
    this.status = status;
  }
}

export class DjangoPlayerAchievementsRepository implements PlayerAchievementsRepository {
  async getAchievements(query: PlayerAchievementsQuery) {
    const configured = import.meta.env.VITE_API_BASE_URL?.trim();
    if (!configured) {
      throw new PlayerAchievementsHttpError(0);
    }

    const baseUrl = configured.endsWith("/") ? configured : `${configured}/`;
    const url = new URL("api/v1/me/achievements/", baseUrl);
    if (query.status !== "all") url.searchParams.set("status", query.status);
    if (query.categoryId) url.searchParams.set("category", query.categoryId);
    if (query.sort !== "default") url.searchParams.set("sort", query.sort);
    if (query.page > 1) url.searchParams.set("page", String(query.page));

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (response.status === 401 || response.status === 403) {
      return playerAchievementsLoadResultSchema.parse({ state: "unauthenticated" });
    }
    if (!response.ok) throw new PlayerAchievementsHttpError(response.status);

    return playerAchievementsLoadResultSchema.parse({
      state: "authenticated",
      data: await response.json(),
    });
  }
}
