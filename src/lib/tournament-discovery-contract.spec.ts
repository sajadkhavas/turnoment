import assert from "node:assert/strict";
import {
  buildTournamentDiscoveryQuery,
  compactTournamentDiscoverySearch,
  hasTournamentDiscoveryFacets,
  normalizeTournamentDiscoverySearch,
  tournamentDiscoveryItemSchema,
  tournamentDiscoveryPageSchema,
} from "./tournament-discovery-contract";
import { getTournamentDiscoveryFixture, MockTournamentDiscoveryRepository } from "./tournament-discovery-data";

const baseSearch = normalizeTournamentDiscoverySearch({});
assert.deepEqual(baseSearch, {
  game: undefined,
  city: undefined,
  date: undefined,
  status: undefined,
  format: undefined,
  price: undefined,
  verified: undefined,
  sort: undefined,
  page: undefined,
});
assert.equal(hasTournamentDiscoveryFacets(baseSearch), false);

const normalized = normalizeTournamentDiscoverySearch({
  game: "eafc26",
  city: "karaj",
  date: "weekend",
  status: "open",
  format: "single-elim",
  price: "lt300",
  verified: "true",
  sort: "soonest",
  page: "2",
  ignored: "value",
});
assert.equal(normalized.game, "eafc26");
assert.equal(normalized.city, "karaj");
assert.equal(normalized.verified, true);
assert.equal(normalized.page, 2);
assert.equal(hasTournamentDiscoveryFacets(normalized), true);

const invalid = normalizeTournamentDiscoverySearch({
  game: "../../bad",
  city: "تهران",
  date: "forever",
  status: "live",
  format: "duel",
  price: "cheap",
  verified: "false",
  sort: "random",
  page: "0",
});
assert.deepEqual(invalid, baseSearch);

const defaultQuery = buildTournamentDiscoveryQuery(baseSearch);
assert.equal(defaultQuery.verified, false);
assert.equal(defaultQuery.sort, "suggested");
assert.equal(defaultQuery.page, 1);
assert.deepEqual(compactTournamentDiscoverySearch(defaultQuery), baseSearch);

const repository = new MockTournamentDiscoveryRepository();
const basePage = await repository.getDiscovery(defaultQuery);
assert.equal(basePage.schemaVersion, 1);
assert.ok(basePage.filters.games.length >= 5);
assert.ok(basePage.filters.cities.length >= 2);
assert.ok(basePage.items.length > 0);
assert.ok(basePage.pagination.totalItems >= basePage.items.length);
assert.equal(basePage.activeQuery.sort, "suggested");
assert.equal(tournamentDiscoveryPageSchema.safeParse(basePage).success, true);
assert.ok(basePage.featuredTournamentId);
assert.ok(basePage.items.some((item) => item.tournamentId === basePage.featuredTournamentId));

const filteredQuery = buildTournamentDiscoveryQuery(
  normalizeTournamentDiscoverySearch({ game: "eafc26", city: "karaj", verified: true }),
);
const filteredPage = getTournamentDiscoveryFixture(filteredQuery);
assert.ok(filteredPage.items.length > 0);
assert.ok(filteredPage.items.every((item) => item.game.gameId === "eafc26"));
assert.ok(filteredPage.items.every((item) => item.venue.city === "کرج"));
assert.ok(filteredPage.items.every((item) => item.venue.verified));

const freePage = getTournamentDiscoveryFixture(
  buildTournamentDiscoveryQuery(normalizeTournamentDiscoverySearch({ price: "free", sort: "cheapest" })),
);
assert.ok(freePage.items.length > 0);
assert.ok(freePage.items.every((item) => item.entryFee.amount === 0));

const soonestPage = getTournamentDiscoveryFixture(
  buildTournamentDiscoveryQuery(normalizeTournamentDiscoverySearch({ sort: "soonest" })),
);
for (let index = 1; index < soonestPage.items.length; index += 1) {
  assert.ok(Date.parse(soonestPage.items[index - 1].startsAt) <= Date.parse(soonestPage.items[index].startsAt));
}

const emptyPage = getTournamentDiscoveryFixture(
  buildTournamentDiscoveryQuery(normalizeTournamentDiscoverySearch({ game: "warcraft", city: "karaj" })),
);
assert.equal(emptyPage.pagination.totalItems, 0);
assert.equal(emptyPage.items.length, 0);
assert.equal(emptyPage.featuredTournamentId, null);

const overCapacity = structuredClone(basePage.items[0]);
overCapacity.capacity.registered = overCapacity.capacity.limit + 1;
assert.equal(tournamentDiscoveryItemSchema.safeParse(overCapacity).success, false);

const badRemaining = structuredClone(basePage.items[0]);
badRemaining.capacity.remaining += 1;
assert.equal(tournamentDiscoveryItemSchema.safeParse(badRemaining).success, false);

const impossibleRegistration = structuredClone(basePage.items[0]);
impossibleRegistration.lifecycleState = "completed";
impossibleRegistration.registrationState = "open";
assert.equal(tournamentDiscoveryItemSchema.safeParse(impossibleRegistration).success, false);

const badFeatured = structuredClone(basePage);
badFeatured.featuredTournamentId = "missing-tournament";
assert.equal(tournamentDiscoveryPageSchema.safeParse(badFeatured).success, false);

const duplicateItems = structuredClone(basePage);
duplicateItems.items = [duplicateItems.items[0], duplicateItems.items[0]];
assert.equal(tournamentDiscoveryPageSchema.safeParse(duplicateItems).success, false);

const privateLeak = { ...basePage, phone: "09120000000" };
assert.equal(tournamentDiscoveryPageSchema.safeParse(privateLeak).success, false);

console.log("tournament-discovery contract checks passed");
