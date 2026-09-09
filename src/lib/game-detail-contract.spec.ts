import assert from "node:assert/strict";
import { gameDetailSchema, gameTournamentSummarySchema } from "./game-detail-contract";
import { FixtureGameDetailRepository } from "./game-detail-fixture";
import { publicGameSlug } from "./game-slugs";

const repository = new FixtureGameDetailRepository();

const game = await repository.getByIdentifier("eafc26");
assert(game, "EA FC 26 fixture must exist");
assert.equal(game.slug, "ea-fc-26");
assert.equal(game.slug, publicGameSlug(game.id));
assert.equal(game.publicationState, "published");
assert(game.platforms.includes("PS5"));
assert(game.tournaments.every((tournament) => tournament.gameId === game.id));
assert.equal(
  game.stats.openTournamentCount,
  game.tournaments.filter((tournament) => tournament.status === "open" || tournament.status === "filling").length,
);

const canonicalLookup = await repository.getByIdentifier(game.slug);
assert(canonicalLookup, "canonical game slug must resolve");
assert.equal(canonicalLookup.id, game.id);

const cs2 = await repository.getByIdentifier("cs2");
assert(cs2, "CS2 fixture must exist");
assert.equal(cs2.slug, "counter-strike-2");
assert(cs2.competitiveFormats.some((format) => format.teamSize === 5));

const missing = await repository.getByIdentifier("unknown-game");
assert.equal(missing, null);

const badRegisteredCount = gameTournamentSummarySchema.safeParse({
  ...game.tournaments[0],
  registered: game.tournaments[0].capacity + 1,
});
assert.equal(badRegisteredCount.success, false, "registered count above capacity must be rejected");

const negativeStats = gameDetailSchema.safeParse({
  ...game,
  stats: { ...game.stats, openTournamentCount: -1 },
});
assert.equal(negativeStats.success, false, "negative aggregate counts must be rejected");

const invalidRanking = gameDetailSchema.safeParse({
  ...game,
  ranking: {
    state: "active",
    entries: [{ ...game.ranking.entries[0], rating: -1 }],
  },
});
assert.equal(invalidRanking.success, false, "negative player rating must be rejected");

console.log("Game detail contract checks passed.");
