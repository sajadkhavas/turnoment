import { getDataAdapterMode } from "./data-adapter";
import type { PlayerNotificationsRepository } from "./player-notifications-contract";
import { MockPlayerNotificationsRepository } from "./player-notifications-data";
import { ApiPlayerNotificationsRepository } from "./player-notifications-http-repository";

export const playerNotificationsRepository: PlayerNotificationsRepository =
  getDataAdapterMode() === "api"
    ? new ApiPlayerNotificationsRepository()
    : new MockPlayerNotificationsRepository();
