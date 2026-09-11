export const challengeHubFilters = ["all", "incoming", "outgoing", "active", "action-required", "completed"] as const;

export type ChallengeHubFilter = (typeof challengeHubFilters)[number];
export type ChallengeLifecycle =
  | "invitation-pending"
  | "invitation-expired"
  | "invitation-unavailable"
  | "accepted"
  | "match-ready"
  | "awaiting-result"
  | "action-required"
  | "completed"
  | "cancelled";
export type ChallengeDirection = "incoming" | "outgoing";
export type ChallengeOutcome = "win" | "loss" | "draw" | "void";
export type ChallengeAction = "accept" | "decline" | "cancel" | "view";

export interface ChallengeHubQuery {
  status: ChallengeHubFilter;
  page: number;
}

export interface CurrentChallengePlayer {
  playerId: string;
  username: string;
  gamerTag: string;
}

export interface ChallengeAccess {
  unlocked: boolean;
  canCreate: boolean;
  challengeRating: number | null;
  finalizedValidMatches: number;
  requiredFinalizedMatches: number;
}

export interface ChallengeOpponent {
  playerId: string;
  username: string;
  gamerTag: string;
  avatarInitials: string;
  challengeRating: number | null;
}

export interface ChallengeGame {
  gameId: string;
  name: string;
}

export interface ChallengeMatchContext {
  matchId: string | null;
  startsAtLabel: string | null;
  venueLabel: string | null;
  contextLabel: string | null;
}

export interface ChallengeFinalResult {
  outcome: ChallengeOutcome;
  scoreLabel: string | null;
  ratingDelta: number | null;
  completedAtLabel: string;
}

export interface ChallengeItem {
  challengeId: string;
  direction: ChallengeDirection;
  lifecycle: ChallengeLifecycle;
  statusLabel: string;
  actionRequiredLabel: string | null;
  opponent: ChallengeOpponent;
  game: ChallengeGame;
  formatLabel: string;
  createdAtLabel: string;
  responseDeadlineLabel: string | null;
  note: string | null;
  match: ChallengeMatchContext | null;
  result: ChallengeFinalResult | null;
  allowedActions: ChallengeAction[];
}

export interface ChallengeHubSummary {
  incoming: number;
  outgoing: number;
  active: number;
  completed: number;
}

export interface ChallengePagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface ChallengeHubPageData {
  player: CurrentChallengePlayer;
  access: ChallengeAccess;
  summary: ChallengeHubSummary;
  items: ChallengeItem[];
  pagination: ChallengePagination;
}

export interface ChallengeHubRepository {
  getChallengeHub(query: ChallengeHubQuery): Promise<ChallengeHubPageData>;
}

const fixtureItems: ChallengeItem[] = [
  {
    challengeId: "ch-301", direction: "incoming", lifecycle: "invitation-pending", statusLabel: "در انتظار پاسخ تو",
    actionRequiredLabel: "نیازمند پاسخ", opponent: { playerId: "p-032", username: "shadowreza", gamerTag: "ShadowReza", avatarInitials: "SR", challengeRating: 1525 },
    game: { gameId: "ea-fc-26", name: "EA SPORTS FC 26" }, formatLabel: "Best of 3", createdAtLabel: "۲۵ دقیقه پیش",
    responseDeadlineLabel: "۲ ساعت دیگر", note: "برای یک رقابت مستقیم آماده‌ای؟", match: null, result: null,
    allowedActions: ["accept", "decline"],
  },
  {
    challengeId: "ch-302", direction: "incoming", lifecycle: "invitation-expired", statusLabel: "مهلت پاسخ تمام شده",
    actionRequiredLabel: null, opponent: { playerId: "p-041", username: "miladpro", gamerTag: "MiladPro", avatarInitials: "MP", challengeRating: 1462 },
    game: { gameId: "efootball-2026", name: "eFootball 2026" }, formatLabel: "Best of 3", createdAtLabel: "دیروز",
    responseDeadlineLabel: "پایان‌یافته", note: null, match: null, result: null, allowedActions: [],
  },
  {
    challengeId: "ch-303", direction: "outgoing", lifecycle: "invitation-pending", statusLabel: "منتظر پاسخ حریف",
    actionRequiredLabel: null, opponent: { playerId: "p-014", username: "arminfc", gamerTag: "ArminFC", avatarInitials: "AF", challengeRating: 1498 },
    game: { gameId: "tekken-8", name: "Tekken 8" }, formatLabel: "Best of 5", createdAtLabel: "۱ ساعت پیش",
    responseDeadlineLabel: "۵ ساعت دیگر", note: null, match: null, result: null, allowedActions: ["cancel"],
  },
  {
    challengeId: "ch-304", direction: "incoming", lifecycle: "match-ready", statusLabel: "Match آماده است",
    actionRequiredLabel: "نیازمند اقدام", opponent: { playerId: "p-055", username: "novaking", gamerTag: "NovaKing", avatarInitials: "NK", challengeRating: 1510 },
    game: { gameId: "ea-fc-26", name: "EA SPORTS FC 26" }, formatLabel: "Best of 3", createdAtLabel: "۲ روز پیش",
    responseDeadlineLabel: null, note: null,
    match: { matchId: "m-302", startsAtLabel: "امروز، ساعت ۲۰:۳۰", venueLabel: "Arena Gaming Center، کرج", contextLabel: "حضوری" },
    result: null, allowedActions: ["view"],
  },
  {
    challengeId: "ch-305", direction: "outgoing", lifecycle: "awaiting-result", statusLabel: "در انتظار نتیجه",
    actionRequiredLabel: null, opponent: { playerId: "p-071", username: "pouya11", gamerTag: "Pouya11", avatarInitials: "P11", challengeRating: 1441 },
    game: { gameId: "ea-fc-26", name: "EA SPORTS FC 26" }, formatLabel: "Best of 3", createdAtLabel: "۳ روز پیش",
    responseDeadlineLabel: null, note: null,
    match: { matchId: "m-303", startsAtLabel: "برگزارشده در ۹ شهریور", venueLabel: "Nova Gaming، کرج", contextLabel: "حضوری" },
    result: null, allowedActions: ["view"],
  },
  {
    challengeId: "ch-306", direction: "incoming", lifecycle: "action-required", statusLabel: "نیازمند اقدام",
    actionRequiredLabel: "نتیجه نیاز به بررسی تو دارد", opponent: { playerId: "p-083", username: "arianx", gamerTag: "ArianX", avatarInitials: "AX", challengeRating: 1477 },
    game: { gameId: "tekken-8", name: "Tekken 8" }, formatLabel: "Best of 5", createdAtLabel: "۴ روز پیش",
    responseDeadlineLabel: null, note: null,
    match: { matchId: "m-304", startsAtLabel: "برگزارشده در ۸ شهریور", venueLabel: "Pixel House، تهران", contextLabel: "حضوری" },
    result: null, allowedActions: ["view"],
  },
  {
    challengeId: "ch-307", direction: "outgoing", lifecycle: "completed", statusLabel: "پایان‌یافته",
    actionRequiredLabel: null, opponent: { playerId: "p-090", username: "rezaz", gamerTag: "RezaZ", avatarInitials: "RZ", challengeRating: 1394 },
    game: { gameId: "ea-fc-26", name: "EA SPORTS FC 26" }, formatLabel: "Best of 3", createdAtLabel: "هفته پیش",
    responseDeadlineLabel: null, note: null,
    match: { matchId: "m-305", startsAtLabel: "۳ شهریور", venueLabel: "Arena Gaming Center، کرج", contextLabel: "حضوری" },
    result: { outcome: "win", scoreLabel: "۳ — ۱", ratingDelta: 18, completedAtLabel: "۳ شهریور" }, allowedActions: ["view"],
  },
  {
    challengeId: "ch-308", direction: "incoming", lifecycle: "completed", statusLabel: "پایان‌یافته",
    actionRequiredLabel: null, opponent: { playerId: "p-101", username: "kianz", gamerTag: "KianZ", avatarInitials: "KZ", challengeRating: 1506 },
    game: { gameId: "tekken-8", name: "Tekken 8" }, formatLabel: "Best of 5", createdAtLabel: "۲ هفته پیش",
    responseDeadlineLabel: null, note: null,
    match: { matchId: "m-306", startsAtLabel: "۲۸ مرداد", venueLabel: "Nova Gaming، کرج", contextLabel: "حضوری" },
    result: { outcome: "loss", scoreLabel: "۲ — ۳", ratingDelta: -12, completedAtLabel: "۲۸ مرداد" }, allowedActions: ["view"],
  },
];

const fixtureAccess: ChallengeAccess = {
  unlocked: true,
  canCreate: true,
  challengeRating: 1480,
  finalizedValidMatches: 42,
  requiredFinalizedMatches: 30,
};

function belongsToFilter(item: ChallengeItem, filter: ChallengeHubFilter): boolean {
  if (filter === "all") return true;
  if (filter === "incoming") return item.direction === "incoming" && item.lifecycle.startsWith("invitation");
  if (filter === "outgoing") return item.direction === "outgoing" && item.lifecycle.startsWith("invitation");
  if (filter === "active") return ["accepted", "match-ready", "awaiting-result"].includes(item.lifecycle);
  if (filter === "action-required") return item.actionRequiredLabel !== null;
  return item.lifecycle === "completed" || item.lifecycle === "cancelled";
}

const PAGE_SIZE = 4;

export class MockChallengeHubRepository implements ChallengeHubRepository {
  async getChallengeHub(query: ChallengeHubQuery): Promise<ChallengeHubPageData> {
    const filtered = fixtureItems.filter((item) => belongsToFilter(item, query.status));
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(query.page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;

    return {
      player: { playerId: "p-001", username: "sajadx", gamerTag: "SajadX" },
      access: fixtureAccess,
      summary: {
        incoming: fixtureItems.filter((item) => item.direction === "incoming" && item.lifecycle === "invitation-pending").length,
        outgoing: fixtureItems.filter((item) => item.direction === "outgoing" && item.lifecycle === "invitation-pending").length,
        active: fixtureItems.filter((item) => ["accepted", "match-ready", "awaiting-result", "action-required"].includes(item.lifecycle)).length,
        completed: fixtureItems.filter((item) => ["completed", "cancelled"].includes(item.lifecycle)).length,
      },
      items: filtered.slice(start, start + PAGE_SIZE),
      pagination: { currentPage, totalPages, totalItems: filtered.length },
    };
  }
}