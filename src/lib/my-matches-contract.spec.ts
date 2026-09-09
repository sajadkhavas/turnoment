import { MockMyMatchesRepository } from "./my-matches-data";
import { myMatchesPageSchema } from "./my-matches-http-repository";

const repository = new MockMyMatchesRepository();

const firstPage = await repository.getMyMatches({ state: "all", kind: "all", page: 1 });
if (!myMatchesPageSchema.safeParse(firstPage).success) {
  throw new Error("Mock My Matches data no longer matches the HTTP runtime contract.");
}

if (firstPage.summary.total !== 9 || firstPage.pagination.totalItems !== 9) {
  throw new Error("My Matches fixture summary/pagination truth drifted unexpectedly.");
}

const secondPage = await repository.getMyMatches({ state: "all", kind: "all", page: 2 });
if (secondPage.pagination.currentPage !== 2 || secondPage.items.length !== 4) {
  throw new Error("My Matches pagination contract is not deterministic.");
}

const upcoming = await repository.getMyMatches({ state: "upcoming", kind: "all", page: 1 });
if (
  upcoming.items.length === 0 ||
  upcoming.items.some((item) => !["scheduled", "ready", "live"].includes(item.lifecycleState))
) {
  throw new Error("My Matches upcoming filter returned an unrelated lifecycle state.");
}

const attention = await repository.getMyMatches({ state: "action-required", kind: "all", page: 1 });
if (attention.items.length === 0 || attention.items.some((item) => item.attention === "none")) {
  throw new Error("My Matches action-required filter returned a match without attention.");
}

const challenge = await repository.getMyMatches({ state: "all", kind: "challenge", page: 1 });
if (challenge.items.length === 0 || challenge.items.some((item) => item.competition.kind !== "challenge")) {
  throw new Error("My Matches kind filter returned a non-challenge match.");
}

const gameFiltered = await repository.getMyMatches({ state: "all", kind: "all", gameId: "cs2", page: 1 });
if (gameFiltered.items.length === 0 || gameFiltered.items.some((item) => item.game.gameId !== "cs2")) {
  throw new Error("My Matches game filter returned an unrelated game.");
}

const completed = secondPage.items.find((item) => item.lifecycleState === "completed");
if (!completed || !completed.result) {
  throw new Error("My Matches fixture no longer exposes a finalized match for integrity tests.");
}

const withoutFinalResult = {
  ...firstPage,
  items: [{ ...completed, result: null }, ...firstPage.items.slice(1)],
};
if (myMatchesPageSchema.safeParse(withoutFinalResult).success) {
  throw new Error("My Matches runtime contract accepted completed match without finalized result.");
}

const prematureResult = {
  ...firstPage,
  items: [{ ...firstPage.items[0], result: completed.result }, ...firstPage.items.slice(1)],
};
if (myMatchesPageSchema.safeParse(prematureResult).success) {
  throw new Error("My Matches runtime contract accepted finalized result on non-finalized state.");
}

const cancelled = secondPage.items.find((item) => item.lifecycleState === "cancelled");
if (!cancelled) {
  throw new Error("My Matches fixture no longer exposes a cancelled match for integrity tests.");
}
const invalidCancelled = {
  ...firstPage,
  items: [{ ...cancelled, resultState: "not-open" }, ...firstPage.items.slice(1)],
};
if (myMatchesPageSchema.safeParse(invalidCancelled).success) {
  throw new Error("My Matches runtime contract accepted cancelled match without void result state.");
}

const invalidDispute = {
  ...firstPage,
  items: firstPage.items.map((item, index) =>
    index === 0
      ? { ...item, lifecycleState: "disputed", resultState: "disputed", disputeState: "none", attention: "dispute" }
      : item,
  ),
};
if (myMatchesPageSchema.safeParse(invalidDispute).success) {
  throw new Error("My Matches runtime contract accepted disputed match without active dispute state.");
}

const invalidCheckInAttention = {
  ...firstPage,
  items: firstPage.items.map((item, index) =>
    index === 0 ? { ...item, checkInState: "not-open", attention: "check-in" } : item,
  ),
};
if (myMatchesPageSchema.safeParse(invalidCheckInAttention).success) {
  throw new Error("My Matches runtime contract accepted check-in attention while check-in is closed.");
}

const invalidConfirmAttention = {
  ...firstPage,
  items: firstPage.items.map((item, index) =>
    index === 0 ? { ...item, attention: "confirm-result", resultState: "not-open" } : item,
  ),
};
if (myMatchesPageSchema.safeParse(invalidConfirmAttention).success) {
  throw new Error("My Matches runtime contract accepted confirm-result attention without confirmation state.");
}

const impossiblePagination = {
  ...firstPage,
  pagination: { ...firstPage.pagination, currentPage: 3, totalPages: 2 },
};
if (myMatchesPageSchema.safeParse(impossiblePagination).success) {
  throw new Error("My Matches runtime contract accepted currentPage greater than totalPages.");
}

const impossibleSummary = {
  ...firstPage,
  summary: { ...firstPage.summary, disputed: firstPage.summary.total + 1 },
};
if (myMatchesPageSchema.safeParse(impossibleSummary).success) {
  throw new Error("My Matches runtime contract accepted a summary subcount greater than total.");
}

console.log("My Matches runtime contract checks passed.");
