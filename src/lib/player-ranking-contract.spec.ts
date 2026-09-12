import assert from "node:assert/strict";
import {
  buildPlayerRankingQuery,
  compactPlayerRankingSearch,
  normalizePlayerRankingSearch,
  playerRankingItemSchema,
  playerRankingPageSchema,
} from "./player-ranking-contract";
import { getPlayerRankingFixture, MockPlayerRankingRepository } from "./player-ranking-fixture";

assert.deepEqual(
  normalizePlayerRankingSearch({ game: "tekken-8", season: "current", region: "tehran", type: "challenge", page: "2" }),
  { game: "tekken-8", season: "current", region: "tehran", type: "challenge", page: 2 },
);
assert.deepEqual(normalizePlayerRankingSearch({ game: "Tekken!", type: "unknown", page: "0" }), {
  game: undefined,
  season: undefined,
  region: undefined,
  type: undefined,
  page: undefined,
});
assert.deepEqual(normalizePlayerRankingSearch({ type: "tournament", page: "1" }), {
  game: undefined,
  season: undefined,
  region: undefined,
  type: undefined,
  page: undefined,
});

assert.deepEqual(buildPlayerRankingQuery({}), {
  game: undefined,
  season: undefined,
  region: undefined,
  type: "tournament",
  page: 1,
});
assert.deepEqual(
  compactPlayerRankingSearch({ game: "ea-fc-26", season: "current", region: undefined, type: "tournament", page: 1 }),
  { game: "ea-fc-26", season: "current", region: undefined, type: undefined, page: undefined },
);

const repository = new MockPlayerRankingRepository();
const base = await repository.getRanking({ type: "tournament", page: 1 });
assert.equal(base.schemaVersion, 1);
assert.equal(base.activeQuery.game, "ea-fc-26");
assert.equal(base.activeQuery.season, "current");
assert.equal(base.activeQuery.type, "tournament");
assert.equal(base.pagination.totalItems, 18);
assert.equal(base.pagination.totalPages, 3);
assert.equal(base.items.length, 6);
assert.equal(playerRankingPageSchema.safeParse(base).success, true);
assert.ok(base.items.every((item) => item.ratingType === "tournament"));
assert.ok(base.items.every((item) => item.game.slug === "ea-fc-26"));
assert.ok(base.items.every((item) => item.username.length > 1));

const challengeTehran = await repository.getRanking({
  game: "tekken-8",
  season: "current",
  region: "tehran",
  type: "challenge",
  page: 1,
});
assert.equal(challengeTehran.activeQuery.game, "tekken-8");
assert.equal(challengeTehran.activeQuery.region, "tehran");
assert.equal(challengeTehran.activeQuery.type, "challenge");
assert.ok(challengeTehran.items.length > 0);
assert.ok(challengeTehran.items.every((item) => item.city.slug === "tehran"));
assert.ok(challengeTehran.items.every((item) => item.ratingType === "challenge"));
assert.ok(challengeTehran.items.every((item) => item.game.slug === "tekken-8"));

const pageTwo = getPlayerRankingFixture({ game: "ea-fc-26", type: "tournament", page: 2 });
assert.equal(pageTwo.pagination.currentPage, 2);
assert.equal(pageTwo.items[0].rank, 7);
assert.notEqual(pageTwo.items[0].playerId, base.items[0].playerId);

const clamped = getPlayerRankingFixture({ game: "ea-fc-26", type: "tournament", page: 99 });
assert.equal(clamped.pagination.currentPage, 3);
assert.equal(clamped.activeQuery.page, 3);

assert.throws(
  () => getPlayerRankingFixture({ game: "does-not-exist", type: "tournament", page: 1 }),
  /Unknown game ranking facet/,
);

const badRecord = structuredClone(base.items[0]);
badRecord.wins += 1;
assert.equal(playerRankingItemSchema.safeParse(badRecord).success, false);

const badMovement = structuredClone(base.items[0]);
badMovement.movement = { direction: "flat", positions: 2 };
assert.equal(playerRankingItemSchema.safeParse(badMovement).success, false);

const privateLeak = { ...base.items[0], email: "player@example.com" };
assert.equal(playerRankingItemSchema.safeParse(privateLeak).success, false);

const duplicatePlayer = structuredClone(base);
duplicatePlayer.items = [duplicatePlayer.items[0], duplicatePlayer.items[0]];
assert.equal(playerRankingPageSchema.safeParse(duplicatePlayer).success, false);

const wrongGame = structuredClone(base);
wrongGame.items[0].game = structuredClone(wrongGame.filters.games[1]);
assert.equal(playerRankingPageSchema.safeParse(wrongGame).success, false);

const wrongRatingType = structuredClone(base);
wrongRatingType.items[0].ratingType = "challenge";
assert.equal(playerRankingPageSchema.safeParse(wrongRatingType).success, false);

const wrongPages = structuredClone(base);
wrongPages.pagination.totalPages = 4;
assert.equal(playerRankingPageSchema.safeParse(wrongPages).success, false);

console.log("player-ranking contract checks passed");
