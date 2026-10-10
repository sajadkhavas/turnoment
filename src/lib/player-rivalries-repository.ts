import { getDataAdapterMode } from "./data-adapter";
import type { PlayerRivalriesRepository } from "./player-rivalries-contract";
import { MockPlayerRivalriesRepository } from "./player-rivalries-data";
import { ApiPlayerRivalriesRepository } from "./player-rivalries-http-repository";

export const playerRivalriesRepository: PlayerRivalriesRepository =
  getDataAdapterMode() === "api"
    ? new ApiPlayerRivalriesRepository()
    : new MockPlayerRivalriesRepository();
