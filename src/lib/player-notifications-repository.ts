import type { PlayerNotificationsRepository } from "./player-notifications-contract";
import { MockPlayerNotificationsRepository } from "./player-notifications-data";
import { DjangoPlayerNotificationsRepository } from "./player-notifications-http-repository";

export const playerNotificationsRepository: PlayerNotificationsRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django"
    ? new DjangoPlayerNotificationsRepository()
    : new MockPlayerNotificationsRepository();
