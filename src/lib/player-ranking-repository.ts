import { getDataAdapterMode } from "./data-adapter";
import type { PlayerRankingRepository } from "./player-ranking-contract";
import { MockPlayerRankingRepository } from "./player-ranking-fixture";
import { ApiPlayerRankingRepository } from "./player-ranking-http-repository";

export function selectPlayerRankingRepository(): PlayerRankingRepository {
  return getDataAdapterMode() === "api"
    ? new ApiPlayerRankingRepository()
    : new MockPlayerRankingRepository();
}

export const playerRankingRepository = selectPlayerRankingRepository();
