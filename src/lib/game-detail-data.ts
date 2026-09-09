import { FixtureGameDetailRepository } from "./game-detail-fixture";
import { DjangoGameDetailRepository } from "./game-detail-http-repository";
import type { GameDetailRepository } from "./game-detail-repository";

export const gameDetailRepository: GameDetailRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django"
    ? new DjangoGameDetailRepository()
    : new FixtureGameDetailRepository();
