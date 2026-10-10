import { getDataAdapterMode } from "./data-adapter";
import type { GameCatalogRepository } from "./game-catalog-contract";
import { MockGameCatalogRepository } from "./game-catalog-fixture";
import { ApiGameCatalogRepository } from "./game-catalog-http-repository";

export function selectGameCatalogRepository(): GameCatalogRepository {
  return getDataAdapterMode() === "api"
    ? new ApiGameCatalogRepository()
    : new MockGameCatalogRepository();
}

export const gameCatalogRepository = selectGameCatalogRepository();
