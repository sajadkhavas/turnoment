import type { PlayerAchievementsRepository } from "./player-achievements-contract";
import { MockPlayerAchievementsRepository } from "./player-achievements-data";
import { DjangoPlayerAchievementsRepository } from "./player-achievements-http-repository";

export const playerAchievementsRepository: PlayerAchievementsRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django"
    ? new DjangoPlayerAchievementsRepository()
    : new MockPlayerAchievementsRepository();
