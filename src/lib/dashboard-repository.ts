import { MockPlayerDashboardRepository, type PlayerDashboardRepository } from "./dashboard-data";
import { DjangoPlayerDashboardRepository } from "./dashboard-http-repository";

export const playerDashboardRepository: PlayerDashboardRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django"
    ? new DjangoPlayerDashboardRepository()
    : new MockPlayerDashboardRepository();
