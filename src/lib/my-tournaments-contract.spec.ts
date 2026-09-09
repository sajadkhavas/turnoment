import { MockMyTournamentsRepository } from "./my-tournaments-data";
import { myTournamentsPageSchema } from "./my-tournaments-http-repository";

const repository = new MockMyTournamentsRepository();

const firstPage = await repository.getMyTournaments({ state: "all", page: 1 });
const valid = myTournamentsPageSchema.safeParse(firstPage);

if (!valid.success) {
  throw new Error(`Mock My Tournaments data no longer matches the HTTP contract: ${valid.error.message}`);
}

if (firstPage.summary.total !== 6 || firstPage.pagination.totalItems !== 6) {
  throw new Error("My Tournaments fixture summary/pagination truth drifted unexpectedly.");
}

const live = await repository.getMyTournaments({ state: "live", page: 1 });
if (live.items.length === 0 || live.items.some((item) => item.lifecycleState !== "live")) {
  throw new Error("My Tournaments state filter returned a non-live tournament.");
}

const gameFiltered = await repository.getMyTournaments({ state: "all", gameId: "cs2", page: 1 });
if (gameFiltered.items.length === 0 || gameFiltered.items.some((item) => item.game.gameId !== "cs2")) {
  throw new Error("My Tournaments game filter returned an unrelated game.");
}

const secondPage = await repository.getMyTournaments({ state: "all", page: 2 });
if (secondPage.pagination.currentPage !== 2 || secondPage.items.length !== 2) {
  throw new Error("My Tournaments pagination contract is not deterministic.");
}

const invalidCheckIn = {
  ...firstPage,
  items: firstPage.items.map((item, index) =>
    index === 0 ? { ...item, checkInState: "client-guessed-state" } : item,
  ),
};

if (myTournamentsPageSchema.safeParse(invalidCheckIn).success) {
  throw new Error("My Tournaments runtime contract accepted an unknown check-in state.");
}

const invalidSummary = {
  ...firstPage,
  summary: { ...firstPage.summary, live: -1 },
};

if (myTournamentsPageSchema.safeParse(invalidSummary).success) {
  throw new Error("My Tournaments runtime contract accepted an impossible negative summary count.");
}

const invalidResult = {
  ...firstPage,
  items: firstPage.items.map((item, index) =>
    index === 3 && item.result ? { ...item, result: { ...item.result, placement: 0 } } : item,
  ),
};

if (myTournamentsPageSchema.safeParse(invalidResult).success) {
  throw new Error("My Tournaments runtime contract accepted placement zero.");
}

console.log("My Tournaments runtime contract checks passed.");
