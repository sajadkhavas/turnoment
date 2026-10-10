import { getDataAdapterMode } from "./data-adapter";
import type { PlayerAchievementsRepository } from "./player-achievements-contract";
import { MockPlayerAchievementsRepository } from "./player-achievements-data";
import { ApiPlayerAchievementsRepository } from "./player-achievements-http-repository";

export const playerAchievementsRepository: PlayerAchievementsRepository =
  getDataAdapterMode() === "api"
    ? new ApiPlayerAchievementsRepository()
    : new MockPlayerAchievementsRepository();
