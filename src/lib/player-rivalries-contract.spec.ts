import { playerRivalriesPageSchema } from "./player-rivalries-contract";
import { MockPlayerRivalriesRepository } from "./player-rivalries-data";

const repository = new MockPlayerRivalriesRepository();

const firstLoad = await repository.getRivalries({ kind: "all", sort: "recent", page: 1 });
if (firstLoad.state !== "authenticated") {
  throw new Error("Rivalries fixture unexpectedly returned an unauthenticated state.");
}
const firstPage = firstLoad.data;

if (!playerRivalriesPageSchema.safeParse(firstPage).success) {
  throw new Error("Mock Rivalries data no longer matches the runtime contract.");
}

if (firstPage.summary.totalRivalries !== 7 || firstPage.summary.totalFinalizedMatches !== 36) {
  throw new Error("Rivalries fixture summary truth drifted unexpectedly.");
}
if (firstPage.pagination.totalItems !== 7 || firstPage.items.length !== 4) {
  throw new Error("Rivalries first-page pagination is not deterministic.");
}

const secondLoad = await repository.getRivalries({ kind: "all", sort: "recent", page: 2 });
if (secondLoad.state !== "authenticated" || secondLoad.data.pagination.currentPage !== 2 || secondLoad.data.items.length !== 3) {
  throw new Error("Rivalries second-page pagination is not deterministic.");
}

const teamLoad = await repository.getRivalries({ kind: "team", sort: "recent", page: 1 });
if (
  teamLoad.state !== "authenticated" ||
  teamLoad.data.items.length === 0 ||
  teamLoad.data.items.some((item) => item.opponent.kind !== "team")
) {
  throw new Error("Rivalries opponent-kind filter returned an unrelated participant kind.");
}

const gameLoad = await repository.getRivalries({ kind: "all", gameId: "tekken-8", sort: "recent", page: 1 });
if (
  gameLoad.state !== "authenticated" ||
  gameLoad.data.items.length === 0 ||
  gameLoad.data.items.some((item) => item.game.gameId !== "tekken-8")
) {
  throw new Error("Rivalries game filter returned an unrelated game.");
}

const mostPlayedLoad = await repository.getRivalries({ kind: "all", sort: "most-played", page: 1 });
if (mostPlayedLoad.state !== "authenticated") {
  throw new Error("Rivalries most-played fixture unexpectedly returned unauthenticated state.");
}
for (let index = 1; index < mostPlayedLoad.data.items.length; index += 1) {
  if (
    mostPlayedLoad.data.items[index - 1].headToHead.totalFinalized <
    mostPlayedLoad.data.items[index].headToHead.totalFinalized
  ) {
    throw new Error("Rivalries most-played sort is not descending by authoritative finalized count.");
  }
}

const firstItem = firstPage.items[0];
const invalidCount = {
  ...firstPage,
  items: [
    {
      ...firstItem,
      headToHead: { ...firstItem.headToHead, totalFinalized: firstItem.headToHead.totalFinalized + 1 },
    },
    ...firstPage.items.slice(1),
  ],
};
if (playerRivalriesPageSchema.safeParse(invalidCount).success) {
  throw new Error("Rivalries runtime contract accepted inconsistent head-to-head totals.");
}

const invalidEdge = {
  ...firstPage,
  items: [
    {
      ...firstItem,
      headToHead: { ...firstItem.headToHead, edge: "opponent-leading" },
    },
    ...firstPage.items.slice(1),
  ],
};
if (playerRivalriesPageSchema.safeParse(invalidEdge).success) {
  throw new Error("Rivalries runtime contract accepted an edge that contradicts win counts.");
}

const invalidOutcome = {
  ...firstPage,
  items: [
    {
      ...firstItem,
      lastEncounter: { ...firstItem.lastEncounter, outcome: "loss" },
    },
    ...firstPage.items.slice(1),
  ],
};
if (playerRivalriesPageSchema.safeParse(invalidOutcome).success) {
  throw new Error("Rivalries runtime contract accepted a score/outcome contradiction.");
}

const impossiblePagination = {
  ...firstPage,
  pagination: { ...firstPage.pagination, currentPage: 3, totalPages: 2 },
};
if (playerRivalriesPageSchema.safeParse(impossiblePagination).success) {
  throw new Error("Rivalries runtime contract accepted currentPage greater than totalPages.");
}

const impossibleSummary = {
  ...firstPage,
  summary: { ...firstPage.summary, tied: firstPage.summary.tied + 1 },
};
if (playerRivalriesPageSchema.safeParse(impossibleSummary).success) {
  throw new Error("Rivalries runtime contract accepted a summary that does not partition total rivalries.");
}

console.log("F12 Player Rivalries contract checks passed.");
