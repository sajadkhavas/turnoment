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

const unranked = {
  ...dashboard,
  identity: { ...dashboard.identity, username: null },
  snapshot: {
    ...dashboard.snapshot,
    tournamentRating: null,
    tournamentRank: null,
    challengeRating: null,
    ratingHistory: [],
  },
};
if (!playerDashboardSchema.safeParse(unranked).success) {
  throw new Error("Unranked private player must be representable without fabricated rating.");
}
if (playerDashboardSchema.safeParse({
  ...dashboard,
  snapshot: { ...dashboard.snapshot, tournamentRank: 0 },
}).success) {
  throw new Error("The unranked state must be null, not an invented rank of zero.");
}
console.log("Player dashboard runtime contract checks passed.");
