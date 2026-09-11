import type { GameCatalogRepository } from "./game-catalog-contract";
import { MockGameCatalogRepository } from "./game-catalog-fixture";
import { DjangoGameCatalogRepository } from "./game-catalog-http-repository";

export function selectGameCatalogRepository(): GameCatalogRepository {
  const adapter = import.meta.env.VITE_DATA_ADAPTER?.trim().toLowerCase();

  if (adapter === "mock") return new MockGameCatalogRepository();
  if (adapter === "django") return new DjangoGameCatalogRepository();

  return import.meta.env.PROD
    ? new DjangoGameCatalogRepository()
    : new MockGameCatalogRepository();
}

export const gameCatalogRepository = selectGameCatalogRepository();
