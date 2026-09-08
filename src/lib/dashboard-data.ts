/**
 * Player dashboard contracts + mock adapter.
 *
 * The backend (Django) is authoritative for every competitive value below:
 * ratings, results, rating deltas, challenge eligibility, registrations.
 * The frontend only DISPLAYS what the repository returns — it never computes
 * winners, rating changes or eligibility.
 *
 * Later: swap MockPlayerDashboardRepository for a Django adapter hitting
 * GET /api/v1/me/dashboard/ — no component change required.
 */

export type SessionState = "loading" | "authenticated" | "unauthenticated" | "session-expired";

export type MatchResult = "win" | "loss" | "draw";
export type MatchKind = "tournament" | "challenge";

export interface PlayerIdentitySummary {
  playerId: string;
  username: string;
  gamerTag: string;
  displayName: string;
  city: string;
  primaryGameId: string;
  primaryGame: string;
  statusLabel: string;
  avatarInitials: string;
}

export interface CompetitiveSnapshot {
  /** Tournament rating — a separate system from challenge rating. */
  tournamentRating: number;
  tournamentRank: number;
  /** Challenge rating — never merged with tournament rating. */
  challengeRating: number;
  finalizedMatches: number;
  tournamentWins: number;
  /** Backend-provided rating history (last N finalized tournament matches). */
  ratingHistory: number[];
}

export interface ChallengeProgress {
  finalizedMatches: number;
  /** Business rule: unlock after 30 finalized valid matches (not wins). */
  requiredMatches: number;
  unlocked: boolean;
}

export type NextActionKind =
  | "tournament-approaching"
  | "check-in"
  | "match-ready"
  | "result-confirmation"
  | "none";

export interface NextAction {
  kind: NextActionKind;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  meta: string[];
  tone: "primary" | "warning" | "live" | "muted";
}

export interface TournamentRegistrationSummary {
  tournamentId: string;
  tournamentSlug: string;
  title: string;
  gameId: string;
  game: string;
  gamingCenterId: string;
  venue: string;
  date: string;
  time: string;
  format: string;
  registrationState: string;
  tournamentState: "upcoming" | "live" | "completed";
  nextActionLabel: string;
}

export interface PlayerMatchSummary {
  matchId: string;
  opponentUsername: string;
  opponentTag: string;
  gameId: string;
  game: string;
  competition: string;
  kind: MatchKind;
  score: string;
  result: MatchResult;
  date: string;
  /** Supplied by backend. Never computed here. */
  ratingDelta: number | null;
}

export interface UpcomingMatchSummary {
  matchId: string;
  tournamentId: string;
  tournamentSlug: string;
  competition: string;
  round: string;
  gameId: string;
  game: string;
  opponentUsername: string;
  opponentTag: string;
  time: string;
  venue: string;
  statusLabel: string;
}

export interface ChallengeSummary {
  challengeId: string;
  opponentUsername: string;
  opponentTag: string;
  gameId: string;
  game: string;
  direction: "incoming" | "outgoing";
  statusLabel: string;
  isNew: boolean;
}

export interface RivalryPreview {
  rivalryId: string;
  opponentUsername: string;
  opponentTag: string;
  playerScore: number;
  opponentScore: number;
  meetings: number;
  lastMeeting: string;
}

export interface TeamSummary {
  teamId: string;
  name: string;
  members: number;
  gameId: string;
  game: string;
  upcomingEvents: number;
}

export interface AchievementSummary {
  achievementId: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export interface NotificationSummary {
  notificationId: string;
  kind: "schedule" | "result" | "challenge" | "registration";
  title: string;
  timeAgo: string;
  unread: boolean;
  href: string;
}

export interface PlayerDashboard {
  identity: PlayerIdentitySummary;
  snapshot: CompetitiveSnapshot;
  challengeProgress: ChallengeProgress;
  nextAction: NextAction;
  nextTournament: TournamentRegistrationSummary | null;
  upcomingMatch: UpcomingMatchSummary | null;
  recentMatches: PlayerMatchSummary[];
  tournaments: TournamentRegistrationSummary[];
  challenges: ChallengeSummary[];
  rivalry: RivalryPreview | null;
  team: TeamSummary | null;
  achievements: AchievementSummary[];
  notifications: NotificationSummary[];
}

export interface PlayerDashboardRepository {
  getDashboard(): Promise<PlayerDashboard>;
}

const mockDashboard: PlayerDashboard = {
  identity: {
    playerId: "p-001",
    username: "sajadx",
    gamerTag: "SajadX",
    displayName: "سجاد",
    city: "کرج",
    primaryGameId: "eafc26",
    primaryGame: "EA FC 26",
    statusLabel: "بازیکن فعال",
    avatarInitials: "SX",
  },
  snapshot: {
    tournamentRating: 1486,
    tournamentRank: 24,
    challengeRating: 1320,
    finalizedMatches: 27,
    tournamentWins: 4,
    ratingHistory: [1402, 1418, 1409, 1431, 1440, 1436, 1455, 1461, 1474, 1486],
  },
  challengeProgress: {
    finalizedMatches: 27,
    requiredMatches: 30,
    unlocked: false,
  },
  nextAction: {
    kind: "check-in",
    title: "Check-in مسابقه باز شده است",
    description: "برای حفظ جایگاه خودت در جام قهرمانان کرج، Check-in را کامل کن.",
    ctaLabel: "ورود به Check-in",
    ctaHref: "/tournaments/karaj-champions-cup",
    meta: ["جام قهرمانان کرج", "EA FC 26", "Arena Gaming Center"],
    tone: "warning",
  },
  nextTournament: {
    tournamentId: "t1",
    tournamentSlug: "karaj-champions-cup",
    title: "جام قهرمانان کرج",
    gameId: "eafc26",
    game: "EA FC 26",
    gamingCenterId: "c1",
    venue: "Arena Gaming Center",
    date: "جمعه ۱۲ شهریور",
    time: "۱۸:۰۰",
    format: "1v1",
    registrationState: "ثبت‌نام تأیید شده",
    tournamentState: "upcoming",
    nextActionLabel: "Check-in",
  },
  upcomingMatch: {
    matchId: "m-101",
    tournamentId: "t1",
    tournamentSlug: "karaj-champions-cup",
    competition: "جام قهرمانان کرج",
    round: "Round of 16",
    gameId: "eafc26",
    game: "EA FC 26",
    opponentUsername: "arminfc",
    opponentTag: "ArminFC",
    time: "۱۹:۳۰",
    venue: "Arena Gaming Center",
    statusLabel: "برنامه‌ریزی شده",
  },
  recentMatches: [
    { matchId: "m-098", opponentUsername: "arminfc", opponentTag: "ArminFC", gameId: "eafc26", game: "EA FC 26", competition: "لیگ شبانه کرج", kind: "tournament", score: "۳ - ۱", result: "win", date: "۸ شهریور", ratingDelta: 18 },
    { matchId: "m-095", opponentUsername: "miladpro", opponentTag: "MiladPro", gameId: "eafc26", game: "EA FC 26", competition: "لیگ شبانه کرج", kind: "tournament", score: "۰ - ۲", result: "loss", date: "۵ شهریور", ratingDelta: -11 },
    { matchId: "m-091", opponentUsername: "novaking", opponentTag: "NovaKing", gameId: "eafc26", game: "EA FC 26", competition: "چالش دوستانه", kind: "challenge", score: "۲ - ۲", result: "draw", date: "۲ شهریور", ratingDelta: 0 },
    { matchId: "m-088", opponentUsername: "rezaz", opponentTag: "RezaZ", gameId: "eafc26", game: "EA FC 26", competition: "جام تابستانه", kind: "tournament", score: "۴ - ۰", result: "win", date: "۳۰ مرداد", ratingDelta: 21 },
    { matchId: "m-084", opponentUsername: "kianz", opponentTag: "KianZ", gameId: "tekken8", game: "Tekken 8", competition: "شب مبارزان", kind: "tournament", score: "۳ - ۲", result: "win", date: "۲۶ مرداد", ratingDelta: 14 },
  ],
  tournaments: [
    {
      tournamentId: "t1", tournamentSlug: "karaj-champions-cup", title: "جام قهرمانان کرج",
      gameId: "eafc26", game: "EA FC 26", gamingCenterId: "c1", venue: "Arena Gaming Center",
      date: "جمعه ۱۲ شهریور", time: "۱۸:۰۰", format: "1v1",
      registrationState: "ثبت‌نام تأیید شده", tournamentState: "upcoming", nextActionLabel: "Check-in",
    },
    {
      tournamentId: "t5", tournamentSlug: "cs2-open-cup", title: "CS2 Open Cup",
      gameId: "cs2", game: "Counter-Strike 2", gamingCenterId: "c3", venue: "Pixel House",
      date: "جمعه ۲۱ دی", time: "۱۵:۰۰", format: "تیمی ۵ نفره",
      registrationState: "در انتظار تأیید تیم", tournamentState: "live", nextActionLabel: "مشاهده جدول",
    },
    {
      tournamentId: "t8", tournamentSlug: "mortal-kombat-rumble", title: "Mortal Kombat Rumble",
      gameId: "mk", game: "Mortal Kombat", gamingCenterId: "c2", venue: "Nova Gaming",
      date: "شنبه ۲۲ دی", time: "۲۰:۰۰", format: "1v1",
      registrationState: "پایان‌یافته — رتبه ۳", tournamentState: "completed", nextActionLabel: "مشاهده نتایج",
    },
  ],
  challenges: [
    {
      challengeId: "ch-11", opponentUsername: "arminfc", opponentTag: "ArminFC",
      gameId: "tekken8", game: "Tekken 8", direction: "incoming",
      statusLabel: "در انتظار پاسخ تو", isNew: true,
    },
  ],
  rivalry: {
    rivalryId: "rv-3",
    opponentUsername: "arminfc",
    opponentTag: "ArminFC",
    playerScore: 4,
    opponentScore: 3,
    meetings: 7,
    lastMeeting: "برد SajadX",
  },
  team: {
    teamId: "tm-2",
    name: "Nova Five",
    members: 5,
    gameId: "cs2",
    game: "Counter-Strike 2",
    upcomingEvents: 1,
  },
  achievements: [
    { achievementId: "a1", title: "اولین برد", description: "نخستین برد رسمی ثبت‌شده", unlocked: true },
    { achievementId: "a2", title: "۱۰ مسابقه رسمی", description: "حضور در ۱۰ مسابقه معتبر", unlocked: true },
    { achievementId: "a3", title: "اولین نیمه‌نهایی", description: "رسیدن به مرحله نیمه‌نهایی", unlocked: true },
    { achievementId: "a4", title: "۳ برد متوالی", description: "سه برد پشت سر هم", unlocked: false },
  ],
  notifications: [
    { notificationId: "n1", kind: "schedule", title: "زمان مسابقه تغییر کرد", timeAgo: "۱۰ دقیقه پیش", unread: true, href: "/dashboard/notifications" },
    { notificationId: "n2", kind: "result", title: "نتیجه نیاز به تأیید دارد", timeAgo: "۲ ساعت پیش", unread: true, href: "/dashboard/notifications" },
    { notificationId: "n3", kind: "challenge", title: "چالش جدید دریافت کردی", timeAgo: "دیروز", unread: false, href: "/dashboard/notifications" },
    { notificationId: "n4", kind: "registration", title: "ثبت‌نام مسابقه تأیید شد", timeAgo: "۳ روز پیش", unread: false, href: "/dashboard/notifications" },
  ],
};

export class MockPlayerDashboardRepository implements PlayerDashboardRepository {
  async getDashboard(): Promise<PlayerDashboard> {
    return mockDashboard;
  }
}

export const playerDashboardRepository: PlayerDashboardRepository =
  new MockPlayerDashboardRepository();
