import assert from "node:assert/strict";
import { compactHomeFinderSearch, publicHomePageSchema, publicHomeTournamentSchema } from "./public-home-contract";
import { getPublicHomeFixture, MockPublicHomeRepository } from "./public-home-data";

const repository = new MockPublicHomeRepository();
const page = await repository.getHome();

assert.equal(page.schemaVersion, 1);
assert.ok(page.finder.games.length > 0);
assert.ok(page.popularGames.length > 0);
assert.ok(page.featuredTournaments.length > 0);
assert.ok(page.featuredGamingCenters.length > 0);
assert.ok(page.rankingPreview);
assert.ok(page.featuredShowdown);

assert.deepEqual(compactHomeFinderSearch({ game: "eafc26", city: "karaj", date: "weekend" }), {
  game: "eafc26",
  city: "karaj",
  date: "weekend",
});
assert.deepEqual(compactHomeFinderSearch({ game: "", city: "", date: "" }), {
  game: undefined,
  city: undefined,
  date: undefined,
});
assert.equal(compactHomeFinderSearch({ game: "eafc26", city: "karaj", date: "invalid" }).date, undefined);

const overCapacity = structuredClone(page.featuredTournaments[0]);
overCapacity.registeredCount = overCapacity.capacity + 1;
assert.equal(publicHomeTournamentSchema.safeParse(overCapacity).success, false);

const completedFeatured = structuredClone(page.featuredTournaments[0]);
completedFeatured.lifecycleState = "completed";
completedFeatured.registrationState = "closed";
assert.equal(publicHomeTournamentSchema.safeParse(completedFeatured).success, false);

const liveRegistration = structuredClone(page.featuredTournaments[0]);
liveRegistration.lifecycleState = "live";
liveRegistration.registrationState = "open";
assert.equal(publicHomeTournamentSchema.safeParse(liveRegistration).success, false);

const badRanking = structuredClone(page);
if (!badRanking.rankingPreview) throw new Error("Fixture ranking preview required.");
badRanking.rankingPreview.entries[0].wins = badRanking.rankingPreview.entries[0].finalizedMatches + 1;
assert.equal(publicHomePageSchema.safeParse(badRanking).success, false);

const duplicateTournament = structuredClone(page);
duplicateTournament.featuredTournaments = [
  duplicateTournament.featuredTournaments[0],
  duplicateTournament.featuredTournaments[0],
];
assert.equal(publicHomePageSchema.safeParse(duplicateTournament).success, false);

const mismatchedRating = structuredClone(page);
mismatchedRating.featuredGamingCenters[0].rating = null;
assert.equal(publicHomePageSchema.safeParse(mismatchedRating).success, false);

const noOptionalClaims = getPublicHomeFixture();
noOptionalClaims.stats = null;
noOptionalClaims.rankingPreview = null;
noOptionalClaims.featuredShowdown = null;
assert.equal(publicHomePageSchema.safeParse(noOptionalClaims).success, true);

const privateLeak = { ...getPublicHomeFixture(), phone: "09120000000" };
assert.equal(publicHomePageSchema.safeParse(privateLeak).success, false);

console.log("public-home contract checks passed");
