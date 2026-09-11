import {
  playerRankingPageSchema,
  type PlayerRankingPageData,
  type PlayerRankingQuery,
  type PlayerRankingRepository,
} from "./player-ranking-contract";

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) {
    throw new Error("VITE_API_BASE_URL is required for the production player ranking adapter.");
  }
  return configured.endsWith("/") ? configured : `${configured}/`;
}

export class DjangoPlayerRankingRepository implements PlayerRankingRepository {
  async getRanking(query: PlayerRankingQuery): Promise<PlayerRankingPageData> {
    const url = new URL("api/v1/rankings/", apiBaseUrl());
    if (query.game) url.searchParams.set("game", query.game);
    if (query.season) url.searchParams.set("season", query.season);
    if (query.region) url.searchParams.set("region", query.region);
    url.searchParams.set("type", query.type);
    if (query.page > 1) url.searchParams.set("page", String(query.page));

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Player ranking request failed with HTTP ${response.status}.`);
    }

    return playerRankingPageSchema.parse(await response.json());
  }
}
