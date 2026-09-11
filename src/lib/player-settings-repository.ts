import type { PlayerSettingsRepository } from "./player-settings-contract";
import { MockPlayerSettingsRepository } from "./player-settings-data";
import { DjangoPlayerSettingsRepository } from "./player-settings-http-repository";

export const playerSettingsRepository: PlayerSettingsRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django"
    ? new DjangoPlayerSettingsRepository()
    : new MockPlayerSettingsRepository();
