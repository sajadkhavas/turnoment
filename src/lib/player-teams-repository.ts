import type { PlayerTeamsRepository } from "./player-teams-contract";
import { MockPlayerTeamsRepository } from "./player-teams-data";
import { DjangoPlayerTeamsRepository } from "./player-teams-http-repository";

export const playerTeamsRepository: PlayerTeamsRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django"
    ? new DjangoPlayerTeamsRepository()
    : new MockPlayerTeamsRepository();
