import type { PlayerRankingRepository } from "./player-ranking-contract";
import { MockPlayerRankingRepository } from "./player-ranking-fixture";
import { DjangoPlayerRankingRepository } from "./player-ranking-http-repository";

export function selectPlayerRankingRepository(): PlayerRankingRepository {
  const adapter = import.meta.env.VITE_DATA_ADAPTER?.trim().toLowerCase();

  if (adapter === "mock") return new MockPlayerRankingRepository();
  if (adapter === "django") return new DjangoPlayerRankingRepository();

  return import.meta.env.PROD
    ? new DjangoPlayerRankingRepository()
    : new MockPlayerRankingRepository();
}

export const playerRankingRepository = selectPlayerRankingRepository();
