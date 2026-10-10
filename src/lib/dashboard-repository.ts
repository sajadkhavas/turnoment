import { getDataAdapterMode } from "./data-adapter";
import { MockPlayerDashboardRepository, type PlayerDashboardRepository } from "./dashboard-data";
import { ApiPlayerDashboardRepository } from "./dashboard-http-repository";

export const playerDashboardRepository: PlayerDashboardRepository =
  getDataAdapterMode() === "api"
    ? new ApiPlayerDashboardRepository()
    : new MockPlayerDashboardRepository();
