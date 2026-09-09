export const myTournamentStateFilters = ["all", "upcoming", "live", "completed"] as const;

export type MyTournamentStateFilter = (typeof myTournamentStateFilters)[number];

export interface MyTournamentsQuery {
  state: MyTournamentStateFilter;
  gameId?: string;
  page: number;
}

export type TournamentLifecycleState = "upcoming" | "live" | "completed" | "cancelled";
export type TournamentRegistrationState = "pending" | "confirmed" | "waitlisted" | "rejected" | "cancelled";
export type TournamentCheckInState = "not-required" | "not-open" | "open" | "completed" | "missed";
export type TournamentNextActionKind = "view" | "check-in" | "view-bracket" | "view-results";

export interface MyTournamentGame {
  gameId: string;
  name: string;
}

export interface MyTournamentVenue {
  gamingCenterId: string;
  name: string;
  city: string;
}

export type MyTournamentParticipation =
  | {
      kind: "individual";
    }
  | {
      kind: "team";
      teamId: string;
      teamName: string;
      role: "captain" | "member";
    };

export interface MyTournamentResult {
  placement: number | null;
  matchesPlayed: number;
  wins: number;
}

export interface MyTournamentItem {
  tournamentId: string;
  tournamentSlug: string;
  title: string;
  game: MyTournamentGame;
  venue: MyTournamentVenue;
  startsAt: string;
  timezone: string;
  formatLabel: string;
  lifecycleState: TournamentLifecycleState;
  registrationState: TournamentRegistrationState;
  checkInState: TournamentCheckInState;
  participation: MyTournamentParticipation;
  result: MyTournamentResult | null;
  nextAction: TournamentNextActionKind;
}

export interface MyTournamentsSummary {
  total: number;
  upcoming: number;
  live: number;
  completed: number;
}

export interface MyTournamentsPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface MyTournamentsPageData {
  summary: MyTournamentsSummary;
  games: MyTournamentGame[];
  items: MyTournamentItem[];
  pagination: MyTournamentsPagination;
}

export interface MyTournamentsRepository {
  getMyTournaments(query: MyTournamentsQuery): Promise<MyTournamentsPageData>;
}

/**
 * Deterministic fixture data used only by the mock repository.
 *
 * This repository is a stand-in for the production API boundary: it returns
 * authoritative states exactly as a backend response would. Presentation code
 * must not derive lifecycle, registration, check-in or result truth from dates
 * or other client-side fields.
 */
const fixtureItems: MyTournamentItem[] = [
  {
    tournamentId: "t-101",
    tournamentSlug: "karaj-champions-cup",
    title: "جام قهرمانان کرج",
    game: { gameId: "ea-fc-26", name: "EA FC 26" },
    venue: { gamingCenterId: "gc-01", name: "Arena Gaming Center", city: "کرج" },
    startsAt: "2026-09-12T18:00:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "1v1",
    lifecycleState: "upcoming",
    registrationState: "confirmed",
    checkInState: "open",
    participation: { kind: "individual" },
    result: null,
    nextAction: "check-in",
  },
  {
    tournamentId: "t-102",
    tournamentSlug: "tehran-night-league",
    title: "لیگ شبانه تهران",
    game: { gameId: "efootball-2026", name: "eFootball 2026" },
    venue: { gamingCenterId: "gc-04", name: "Next Level", city: "تهران" },
    startsAt: "2026-09-19T20:30:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "1v1",
    lifecycleState: "upcoming",
    registrationState: "confirmed",
    checkInState: "not-open",
    participation: { kind: "individual" },
    result: null,
    nextAction: "view",
  },
  {
    tournamentId: "t-103",
    tournamentSlug: "cs2-open-cup",
    title: "CS2 Open Cup",
    game: { gameId: "cs2", name: "Counter-Strike 2" },
    venue: { gamingCenterId: "gc-03", name: "Pixel House", city: "کرج" },
    startsAt: "2026-09-09T17:00:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "5v5",
    lifecycleState: "live",
    registrationState: "confirmed",
    checkInState: "completed",
    participation: { kind: "team", teamId: "team-07", teamName: "Nova Five", role: "captain" },
    result: null,
    nextAction: "view-bracket",
  },
  {
    tournamentId: "t-104",
    tournamentSlug: "tekken-8-fight-night",
    title: "Fight Night — Tekken 8",
    game: { gameId: "tekken-8", name: "Tekken 8" },
    venue: { gamingCenterId: "gc-02", name: "Nova Gaming", city: "کرج" },
    startsAt: "2026-08-29T19:00:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "1v1",
    lifecycleState: "completed",
    registrationState: "confirmed",
    checkInState: "completed",
    participation: { kind: "individual" },
    result: { placement: 3, matchesPlayed: 6, wins: 4 },
    nextAction: "view-results",
  },
  {
    tournamentId: "t-105",
    tournamentSlug: "ea-fc-summer-final",
    title: "فینال تابستان EA FC",
    game: { gameId: "ea-fc-26", name: "EA FC 26" },
    venue: { gamingCenterId: "gc-05", name: "Game Zone", city: "تهران" },
    startsAt: "2026-08-21T18:30:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "1v1",
    lifecycleState: "completed",
    registrationState: "confirmed",
    checkInState: "not-required",
    participation: { kind: "individual" },
    result: { placement: 8, matchesPlayed: 4, wins: 2 },
    nextAction: "view-results",
  },
  {
    tournamentId: "t-106",
    tournamentSlug: "cs2-team-clash",
    title: "CS2 Team Clash",
    game: { gameId: "cs2", name: "Counter-Strike 2" },
    venue: { gamingCenterId: "gc-06", name: "Respawn Club", city: "تهران" },
    startsAt: "2026-09-26T16:00:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "5v5",
    lifecycleState: "upcoming",
    registrationState: "pending",
    checkInState: "not-open",
    participation: { kind: "team", teamId: "team-07", teamName: "Nova Five", role: "member" },
    result: null,
    nextAction: "view",
  },
];

const fixtureSummary: MyTournamentsSummary = {
  total: 6,
  upcoming: 3,
  live: 1,
  completed: 2,
};

const fixtureGames: MyTournamentGame[] = [
  { gameId: "ea-fc-26", name: "EA FC 26" },
  { gameId: "efootball-2026", name: "eFootball 2026" },
  { gameId: "cs2", name: "Counter-Strike 2" },
  { gameId: "tekken-8", name: "Tekken 8" },
];

const PAGE_SIZE = 4;

export class MockMyTournamentsRepository implements MyTournamentsRepository {
  async getMyTournaments(query: MyTournamentsQuery): Promise<MyTournamentsPageData> {
    let filtered = fixtureItems;

    if (query.state !== "all") {
      filtered = filtered.filter((item) => item.lifecycleState === query.state);
    }

    if (query.gameId) {
      filtered = filtered.filter((item) => item.game.gameId === query.gameId);
    }

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(query.page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;

    return {
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
