import { getDataAdapterMode } from "./data-adapter";
import type { PlayerTeamsRepository } from "./player-teams-contract";
import { MockPlayerTeamsRepository } from "./player-teams-data";
import { ApiPlayerTeamsRepository } from "./player-teams-http-repository";

export const playerTeamsRepository: PlayerTeamsRepository =
  getDataAdapterMode() === "api"
    ? new ApiPlayerTeamsRepository()
    : new MockPlayerTeamsRepository();
