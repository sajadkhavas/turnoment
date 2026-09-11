import {
  playerRivalriesLoadResultSchema,
  playerRivalryItemSchema,
  type PlayerRivalriesQuery,
  type PlayerRivalriesRepository,
} from "./player-rivalries-contract";

const fixtureItems = playerRivalryItemSchema.array().parse([
  {
    rivalryId: "rv-eafc-armin",
    opponent: { participantId: "p-014", kind: "player", displayTag: "ArminFC" },
    game: { gameId: "ea-fc-26", name: "EA FC 26" },
    headToHead: { totalFinalized: 9, playerWins: 5, opponentWins: 3, draws: 1, edge: "player-leading" },
    lastEncounter: {
      matchId: "m-rv-901",
      finalizedAt: "2026-09-09T21:40:00+03:30",
      timezone: "Asia/Tehran",
      playerScore: 4,
      opponentScore: 2,
      outcome: "win",
      competition: { kind: "tournament", competitionId: "t-120", title: "لیگ شبانه EA FC" },
    },
  },
  {
    rivalryId: "rv-eafc-pouya",
    opponent: { participantId: "p-071", kind: "player", displayTag: "Pouya11" },
    game: { gameId: "ea-fc-26", name: "EA FC 26" },
    headToHead: { totalFinalized: 7, playerWins: 3, opponentWins: 3, draws: 1, edge: "tied" },
    lastEncounter: {
      matchId: "m-rv-902",
      finalizedAt: "2026-09-06T18:55:00+03:30",
      timezone: "Asia/Tehran",
      playerScore: 2,
      opponentScore: 2,
      outcome: "draw",
      competition: { kind: "tournament", competitionId: "t-108", title: "جام تابستانه کرج" },
    },
  },
  {
    rivalryId: "rv-tekken-kianz",
    opponent: { participantId: "p-067", kind: "player", displayTag: "KianZ" },
    game: { gameId: "tekken-8", name: "Tekken 8" },
    headToHead: { totalFinalized: 5, playerWins: 3, opponentWins: 2, draws: 0, edge: "player-leading" },
    lastEncounter: {
      matchId: "m-rv-903",
      finalizedAt: "2026-09-04T20:25:00+03:30",
      timezone: "Asia/Tehran",
      playerScore: 3,
      opponentScore: 2,
      outcome: "win",
      competition: { kind: "challenge", competitionId: "ch-244", title: "چالش مستقیم Tekken 8" },
    },
  },
  {
    rivalryId: "rv-eafc-arianx",
    opponent: { participantId: "p-083", kind: "player", displayTag: "ArianX" },
    game: { gameId: "ea-fc-26", name: "EA FC 26" },
    headToHead: { totalFinalized: 6, playerWins: 2, opponentWins: 4, draws: 0, edge: "opponent-leading" },
    lastEncounter: {
      matchId: "m-rv-904",
      finalizedAt: "2026-08-31T22:10:00+03:30",
      timezone: "Asia/Tehran",
      playerScore: 1,
      opponentScore: 3,
      outcome: "loss",
      competition: { kind: "tournament", competitionId: "t-109", title: "EA FC Summer Final" },
    },
  },
  {
    rivalryId: "rv-cs2-shadow-core",
    opponent: { participantId: "team-12", kind: "team", displayTag: "Shadow Core" },
    game: { gameId: "cs2", name: "Counter-Strike 2" },
    headToHead: { totalFinalized: 4, playerWins: 1, opponentWins: 3, draws: 0, edge: "opponent-leading" },
    lastEncounter: {
      matchId: "m-rv-905",
      finalizedAt: "2026-08-28T19:20:00+03:30",
      timezone: "Asia/Tehran",
      playerScore: 10,
      opponentScore: 13,
      outcome: "loss",
      competition: { kind: "tournament", competitionId: "t-115", title: "CS2 Team Clash" },
    },
  },
  {
    rivalryId: "rv-cs2-redline",
    opponent: { participantId: "team-22", kind: "team", displayTag: "Redline" },
    game: { gameId: "cs2", name: "Counter-Strike 2" },
    headToHead: { totalFinalized: 3, playerWins: 1, opponentWins: 1, draws: 1, edge: "tied" },
    lastEncounter: {
      matchId: "m-rv-906",
      finalizedAt: "2026-08-24T17:45:00+03:30",
      timezone: "Asia/Tehran",
      playerScore: 12,
      opponentScore: 12,
      outcome: "draw",
      competition: { kind: "tournament", competitionId: "t-116", title: "CS2 Open Series" },
    },
  },
  {
    rivalryId: "rv-tekken-rezaz",
    opponent: { participantId: "p-032", kind: "player", displayTag: "RezaZ" },
    game: { gameId: "tekken-8", name: "Tekken 8" },
    headToHead: { totalFinalized: 2, playerWins: 1, opponentWins: 1, draws: 0, edge: "tied" },
    lastEncounter: {
      matchId: "m-rv-907",
      finalizedAt: "2026-08-20T21:05:00+03:30",
      timezone: "Asia/Tehran",
      playerScore: 1,
      opponentScore: 3,
      outcome: "loss",
      competition: { kind: "challenge", competitionId: "ch-196", title: "چالش مستقیم Tekken 8" },
    },
  },
]);

const fixtureGames = [
  { gameId: "ea-fc-26", name: "EA FC 26" },
  { gameId: "tekken-8", name: "Tekken 8" },
  { gameId: "cs2", name: "Counter-Strike 2" },
];

const PAGE_SIZE = 4;

const fixtureSummary = {
  totalRivalries: fixtureItems.length,
  totalFinalizedMatches: fixtureItems.reduce((sum, item) => sum + item.headToHead.totalFinalized, 0),
  playerLeading: fixtureItems.filter((item) => item.headToHead.edge === "player-leading").length,
  tied: fixtureItems.filter((item) => item.headToHead.edge === "tied").length,
  opponentLeading: fixtureItems.filter((item) => item.headToHead.edge === "opponent-leading").length,
};

function sortedItems(query: PlayerRivalriesQuery) {
  let items = fixtureItems.filter((item) => query.kind === "all" || item.opponent.kind === query.kind);
  if (query.gameId) items = items.filter((item) => item.game.gameId === query.gameId);

  return [...items].sort((a, b) => {
    if (query.sort === "most-played") {
      const byMatches = b.headToHead.totalFinalized - a.headToHead.totalFinalized;
      return byMatches !== 0 ? byMatches : a.rivalryId.localeCompare(b.rivalryId);
    }
    const byRecent = Date.parse(b.lastEncounter.finalizedAt) - Date.parse(a.lastEncounter.finalizedAt);
    return byRecent !== 0 ? byRecent : a.rivalryId.localeCompare(b.rivalryId);
  });
}

export class MockPlayerRivalriesRepository implements PlayerRivalriesRepository {
  async getRivalries(query: PlayerRivalriesQuery) {
    const filtered = sortedItems(query);
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(query.page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;

    return playerRivalriesLoadResultSchema.parse({
      state: "authenticated",
      data: {
        player: { playerId: "p-001", gamerTag: "SajadX" },
        summary: fixtureSummary,
        games: fixtureGames,
        items: filtered.slice(start, start + PAGE_SIZE),
        pagination: {
          currentPage,
          totalPages,
          totalItems: filtered.length,
        },
      },
    });
  }
}
