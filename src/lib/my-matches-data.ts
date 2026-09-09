export const myMatchStateFilters = ["all", "upcoming", "action-required", "completed", "disputed"] as const;
export const myMatchKindFilters = ["all", "tournament", "challenge"] as const;

export type MyMatchStateFilter = (typeof myMatchStateFilters)[number];
export type MyMatchKindFilter = (typeof myMatchKindFilters)[number];

export interface MyMatchesQuery {
  state: MyMatchStateFilter;
  kind: MyMatchKindFilter;
  gameId?: string;
  page: number;
}

export type MatchLifecycleState =
  | "scheduled"
  | "ready"
  | "live"
  | "awaiting-result"
  | "awaiting-confirmation"
  | "disputed"
  | "completed"
  | "cancelled";

export type MatchCheckInState = "not-required" | "not-open" | "open" | "completed" | "missed";
export type MatchResultState = "not-open" | "reportable" | "awaiting-opponent" | "disputed" | "finalized" | "void";
export type MatchDisputeState = "none" | "open" | "under-review" | "resolved";
export type MatchAttentionKind = "none" | "check-in" | "submit-result" | "confirm-result" | "dispute";
export type MatchOutcome = "win" | "loss" | "draw" | "void";

export interface MyMatchesPlayer {
  playerId: string;
  gamerTag: string;
}

export interface MyMatchGame {
  gameId: string;
  name: string;
}

export interface MyMatchVenue {
  gamingCenterId: string;
  name: string;
  city: string;
}

export interface MyMatchOpponent {
  participantId: string;
  kind: "player" | "team";
  displayTag: string;
}

export type MyMatchCompetition =
  | {
      kind: "tournament";
      competitionId: string;
      title: string;
      tournamentSlug: string;
      roundLabel: string;
    }
  | {
      kind: "challenge";
      competitionId: string;
      title: string;
      roundLabel: null;
    };

export interface MyMatchFinalResult {
  playerScore: number;
  opponentScore: number;
  outcome: MatchOutcome;
  ratingDelta: number | null;
  finalizedAt: string;
}

export interface MyMatchItem {
  matchId: string;
  game: MyMatchGame;
  competition: MyMatchCompetition;
  opponent: MyMatchOpponent;
  venue: MyMatchVenue | null;
  startsAt: string;
  timezone: string;
  formatLabel: string;
  lifecycleState: MatchLifecycleState;
  checkInState: MatchCheckInState;
  resultState: MatchResultState;
  disputeState: MatchDisputeState;
  attention: MatchAttentionKind;
  result: MyMatchFinalResult | null;
}

export interface MyMatchesSummary {
  total: number;
  upcoming: number;
  actionRequired: number;
  completed: number;
  disputed: number;
}

export interface MyMatchesPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface MyMatchesPageData {
  player: MyMatchesPlayer;
  summary: MyMatchesSummary;
  games: MyMatchGame[];
  items: MyMatchItem[];
  pagination: MyMatchesPagination;
}

export interface MyMatchesRepository {
  getMyMatches(query: MyMatchesQuery): Promise<MyMatchesPageData>;
}

const fixtureItems: MyMatchItem[] = [
  {
    matchId: "m-201",
    game: { gameId: "ea-fc-26", name: "EA FC 26" },
    competition: {
      kind: "tournament",
      competitionId: "t-101",
      title: "جام قهرمانان کرج",
      tournamentSlug: "karaj-champions-cup",
      roundLabel: "یک‌هشتم نهایی",
    },
    opponent: { participantId: "p-014", kind: "player", displayTag: "ArminFC" },
    venue: { gamingCenterId: "gc-01", name: "Arena Gaming Center", city: "کرج" },
    startsAt: "2026-09-12T19:30:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "Best of 3",
    lifecycleState: "scheduled",
    checkInState: "open",
    resultState: "not-open",
    disputeState: "none",
    attention: "check-in",
    result: null,
  },
  {
    matchId: "m-202",
    game: { gameId: "tekken-8", name: "Tekken 8" },
    competition: {
      kind: "challenge",
      competitionId: "ch-210",
      title: "چالش مستقیم",
      roundLabel: null,
    },
    opponent: { participantId: "p-032", kind: "player", displayTag: "RezaZ" },
    venue: { gamingCenterId: "gc-02", name: "Nova Gaming", city: "کرج" },
    startsAt: "2026-09-10T20:00:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "Best of 5",
    lifecycleState: "ready",
    checkInState: "not-required",
    resultState: "not-open",
    disputeState: "none",
    attention: "none",
    result: null,
  },
  {
    matchId: "m-203",
    game: { gameId: "cs2", name: "Counter-Strike 2" },
    competition: {
      kind: "tournament",
      competitionId: "t-103",
      title: "CS2 Open Cup",
      tournamentSlug: "cs2-open-cup",
      roundLabel: "نیمه‌نهایی",
    },
    opponent: { participantId: "team-12", kind: "team", displayTag: "Shadow Core" },
    venue: { gamingCenterId: "gc-03", name: "Pixel House", city: "کرج" },
    startsAt: "2026-09-09T21:00:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "Best of 3",
    lifecycleState: "live",
    checkInState: "completed",
    resultState: "not-open",
    disputeState: "none",
    attention: "none",
    result: null,
  },
  {
    matchId: "m-204",
    game: { gameId: "ea-fc-26", name: "EA FC 26" },
    competition: {
      kind: "tournament",
      competitionId: "t-110",
      title: "لیگ شبانه تهران",
      tournamentSlug: "tehran-night-league",
      roundLabel: "هفته ۴",
    },
    opponent: { participantId: "p-041", kind: "player", displayTag: "MiladPro" },
    venue: { gamingCenterId: "gc-04", name: "Next Level", city: "تهران" },
    startsAt: "2026-09-08T21:30:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "1v1",
    lifecycleState: "awaiting-result",
    checkInState: "not-required",
    resultState: "reportable",
    disputeState: "none",
    attention: "submit-result",
    result: null,
  },
  {
    matchId: "m-205",
    game: { gameId: "efootball-2026", name: "eFootball 2026" },
    competition: {
      kind: "challenge",
      competitionId: "ch-196",
      title: "چالش مستقیم",
      roundLabel: null,
    },
    opponent: { participantId: "p-055", kind: "player", displayTag: "NovaKing" },
    venue: { gamingCenterId: "gc-01", name: "Arena Gaming Center", city: "کرج" },
    startsAt: "2026-09-07T18:00:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "Best of 3",
    lifecycleState: "awaiting-confirmation",
    checkInState: "not-required",
    resultState: "awaiting-opponent",
    disputeState: "none",
    attention: "confirm-result",
    result: null,
  },
  {
    matchId: "m-206",
    game: { gameId: "tekken-8", name: "Tekken 8" },
    competition: {
      kind: "tournament",
      competitionId: "t-104",
      title: "Fight Night — Tekken 8",
      tournamentSlug: "tekken-8-fight-night",
      roundLabel: "یک‌چهارم نهایی",
    },
    opponent: { participantId: "p-067", kind: "player", displayTag: "KianZ" },
    venue: { gamingCenterId: "gc-02", name: "Nova Gaming", city: "کرج" },
    startsAt: "2026-09-05T19:00:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "Best of 5",
    lifecycleState: "disputed",
    checkInState: "completed",
    resultState: "disputed",
    disputeState: "under-review",
    attention: "dispute",
    result: null,
  },
  {
    matchId: "m-207",
    game: { gameId: "ea-fc-26", name: "EA FC 26" },
    competition: {
      kind: "tournament",
      competitionId: "t-108",
      title: "جام تابستانه کرج",
      tournamentSlug: "karaj-summer-cup",
      roundLabel: "رده‌بندی",
    },
    opponent: { participantId: "p-071", kind: "player", displayTag: "Pouya11" },
    venue: { gamingCenterId: "gc-05", name: "Game Zone", city: "تهران" },
    startsAt: "2026-08-30T18:30:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "1v1",
    lifecycleState: "completed",
    checkInState: "completed",
    resultState: "finalized",
    disputeState: "none",
    attention: "none",
    result: {
      playerScore: 4,
      opponentScore: 1,
      outcome: "win",
      ratingDelta: 18,
      finalizedAt: "2026-08-30T19:15:00+03:30",
    },
  },
  {
    matchId: "m-208",
    game: { gameId: "ea-fc-26", name: "EA FC 26" },
    competition: {
      kind: "tournament",
      competitionId: "t-109",
      title: "EA FC Summer Final",
      tournamentSlug: "ea-fc-summer-final",
      roundLabel: "یک‌چهارم نهایی",
    },
    opponent: { participantId: "p-083", kind: "player", displayTag: "ArianX" },
    venue: { gamingCenterId: "gc-05", name: "Game Zone", city: "تهران" },
    startsAt: "2026-08-21T20:00:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "1v1",
    lifecycleState: "completed",
    checkInState: "not-required",
    resultState: "finalized",
    disputeState: "resolved",
    attention: "none",
    result: {
      playerScore: 1,
      opponentScore: 2,
      outcome: "loss",
      ratingDelta: -11,
      finalizedAt: "2026-08-21T20:50:00+03:30",
    },
  },
  {
    matchId: "m-209",
    game: { gameId: "cs2", name: "Counter-Strike 2" },
    competition: {
      kind: "tournament",
      competitionId: "t-115",
      title: "CS2 Team Clash",
      tournamentSlug: "cs2-team-clash",
      roundLabel: "دور اول",
    },
    opponent: { participantId: "team-22", kind: "team", displayTag: "Redline" },
    venue: { gamingCenterId: "gc-06", name: "Respawn Club", city: "تهران" },
    startsAt: "2026-08-18T16:00:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "Best of 1",
    lifecycleState: "cancelled",
    checkInState: "not-open",
    resultState: "void",
    disputeState: "none",
    attention: "none",
    result: null,
  },
];

const fixtureGames: MyMatchGame[] = [
  { gameId: "ea-fc-26", name: "EA FC 26" },
  { gameId: "efootball-2026", name: "eFootball 2026" },
  { gameId: "tekken-8", name: "Tekken 8" },
  { gameId: "cs2", name: "Counter-Strike 2" },
];

const PAGE_SIZE = 5;

function isUpcoming(item: MyMatchItem): boolean {
  return item.lifecycleState === "scheduled" || item.lifecycleState === "ready" || item.lifecycleState === "live";
}

function matchesState(item: MyMatchItem, state: MyMatchStateFilter): boolean {
  if (state === "all") return true;
  if (state === "upcoming") return isUpcoming(item);
  if (state === "action-required") return item.attention !== "none";
  if (state === "completed") return item.lifecycleState === "completed" || item.lifecycleState === "cancelled";
  return item.disputeState === "open" || item.disputeState === "under-review";
}

const fixtureSummary: MyMatchesSummary = {
  total: fixtureItems.length,
  upcoming: fixtureItems.filter(isUpcoming).length,
  actionRequired: fixtureItems.filter((item) => item.attention !== "none").length,
  completed: fixtureItems.filter((item) => item.lifecycleState === "completed" || item.lifecycleState === "cancelled").length,
  disputed: fixtureItems.filter((item) => item.disputeState === "open" || item.disputeState === "under-review").length,
};

export class MockMyMatchesRepository implements MyMatchesRepository {
  async getMyMatches(query: MyMatchesQuery): Promise<MyMatchesPageData> {
    let filtered = fixtureItems.filter((item) => matchesState(item, query.state));

    if (query.kind !== "all") {
      filtered = filtered.filter((item) => item.competition.kind === query.kind);
    }

    if (query.gameId) {
      filtered = filtered.filter((item) => item.game.gameId === query.gameId);
    }

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(query.page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;

    return {
      player: { playerId: "p-001", gamerTag: "SajadX" },
      summary: fixtureSummary,
      games: fixtureGames,
      items: filtered.slice(start, start + PAGE_SIZE),
      pagination: {
        currentPage,
        totalPages,
        totalItems: filtered.length,
      },
    };
  }
}
