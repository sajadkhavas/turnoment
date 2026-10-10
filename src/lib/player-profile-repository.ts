import { getDataAdapterMode } from "./data-adapter";
import { MockPlayerProfileRepository } from "./player-profile-data";
import { ApiPlayerProfileRepository } from "./player-profile-http-repository";
import type { PlayerProfileRepository } from "./player-profile-contract";

export const playerProfileRepository: PlayerProfileRepository =
  getDataAdapterMode() === "api"
    ? new ApiPlayerProfileRepository()
    : new MockPlayerProfileRepository();
