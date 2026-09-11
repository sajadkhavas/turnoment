import { MockPlayerProfileRepository } from "./player-profile-data";
import { DjangoPlayerProfileRepository } from "./player-profile-http-repository";
import type { PlayerProfileRepository } from "./player-profile-contract";

export const playerProfileRepository: PlayerProfileRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django"
    ? new DjangoPlayerProfileRepository()
    : new MockPlayerProfileRepository();
