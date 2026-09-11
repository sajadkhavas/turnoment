import {
  gameCatalogPageSchema,
  type GameCatalogPageData,
  type GameCatalogRepository,
} from "./game-catalog-contract";

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) {
    throw new Error("VITE_API_BASE_URL is required for the production game catalog adapter.");
  }
  return configured.endsWith("/") ? configured : `${configured}/`;
}

export class DjangoGameCatalogRepository implements GameCatalogRepository {
  async getCatalog(): Promise<GameCatalogPageData> {
    const url = new URL("api/v1/games/", apiBaseUrl());
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Game catalog request failed with HTTP ${response.status}.`);
    }

    return gameCatalogPageSchema.parse(await response.json());
  }
}
