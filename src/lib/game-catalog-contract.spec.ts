import assert from "node:assert/strict";
import {
  gameCatalogItemSchema,
  gameCatalogPageSchema,
} from "./game-catalog-contract";
import {
  getGameCatalogFixture,
  MockGameCatalogRepository,
} from "./game-catalog-fixture";

const repository = new MockGameCatalogRepository();
const page = await repository.getCatalog();

assert.equal(page.schemaVersion, 1);
assert.equal(page.totalItems, 6);
assert.equal(page.items.length, 6);
assert.equal(gameCatalogPageSchema.safeParse(page).success, true);
assert.deepEqual(
  page.items.map((game) => game.slug),
  ["ea-fc-26", "efootball", "tekken-8", "mortal-kombat", "counter-strike-2", "warcraft"],
);
assert.ok(page.items.every((game) => game.publicationState === "published"));
assert.ok(page.items.every((game) => game.platforms.length > 0));
assert.ok(page.items.every((game) => game.description.length >= 20));

const freshPage = getGameCatalogFixture();
assert.equal(gameCatalogPageSchema.safeParse(freshPage).success, true);

const negativeCount = structuredClone(page.items[0]);
negativeCount.tournamentCount = -1;
assert.equal(gameCatalogItemSchema.safeParse(negativeCount).success, false);

const duplicatePlatforms = structuredClone(page.items[0]);
duplicatePlatforms.platforms = ["PS5", "PS5"];
assert.equal(gameCatalogItemSchema.safeParse(duplicatePlatforms).success, false);

const duplicateGame = structuredClone(page);
duplicateGame.items = [duplicateGame.items[0], duplicateGame.items[0]];
duplicateGame.totalItems = 2;
assert.equal(gameCatalogPageSchema.safeParse(duplicateGame).success, false);

const wrongTotal = structuredClone(page);
wrongTotal.totalItems += 1;
assert.equal(gameCatalogPageSchema.safeParse(wrongTotal).success, false);

const privateLeak = { ...page, phone: "09120000000" };
assert.equal(gameCatalogPageSchema.safeParse(privateLeak).success, false);

console.log("game-catalog contract checks passed");
