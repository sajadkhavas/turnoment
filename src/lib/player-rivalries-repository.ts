import type { PlayerRivalriesRepository } from "./player-rivalries-contract";
import { MockPlayerRivalriesRepository } from "./player-rivalries-data";
import { DjangoPlayerRivalriesRepository } from "./player-rivalries-http-repository";

export const playerRivalriesRepository: PlayerRivalriesRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django"
    ? new DjangoPlayerRivalriesRepository()
    : new MockPlayerRivalriesRepository();
