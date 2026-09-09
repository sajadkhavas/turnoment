import { MockPlayerDashboardRepository } from "./dashboard-data";
import { playerDashboardSchema } from "./dashboard-http-repository";

const dashboard = await new MockPlayerDashboardRepository().getDashboard();
const valid = playerDashboardSchema.safeParse(dashboard);

if (!valid.success) {
  throw new Error(`Mock dashboard no longer matches the HTTP contract: ${valid.error.message}`);
}

const invalid = {
  ...dashboard,
  challengeProgress: {
    ...dashboard.challengeProgress,
    requiredMatches: 0,
  },
};

if (playerDashboardSchema.safeParse(invalid).success) {
  throw new Error("Dashboard contract accepted an invalid challenge threshold.");
}

console.log("Player dashboard runtime contract checks passed.");
