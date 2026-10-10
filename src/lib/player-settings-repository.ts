import { getDataAdapterMode } from "./data-adapter";
import type { PlayerSettingsRepository } from "./player-settings-contract";
import { MockPlayerSettingsRepository } from "./player-settings-data";
import { ApiPlayerSettingsRepository } from "./player-settings-http-repository";

export const playerSettingsRepository: PlayerSettingsRepository =
  getDataAdapterMode() === "api"
    ? new ApiPlayerSettingsRepository()
    : new MockPlayerSettingsRepository();
