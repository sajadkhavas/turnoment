import { getDataAdapterMode } from "./data-adapter";
import { FixtureGameDetailRepository } from "./game-detail-fixture";
import { ApiGameDetailRepository } from "./game-detail-http-repository";
import type { GameDetailRepository } from "./game-detail-repository";

export const gameDetailRepository: GameDetailRepository =
  getDataAdapterMode() === "api"
    ? new ApiGameDetailRepository()
    : new FixtureGameDetailRepository();
