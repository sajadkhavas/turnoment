import {
  challengeHubLoadResultSchema,
  challengeMutationActionSchema,
  opponentSearchActionSchema,
  validateCreateChallengeDraft,
  type CancelChallengeCommand,
  type ChallengeHubFilter,
  type ChallengeHubPageData,
  type ChallengeHubQuery,
  type ChallengeHubRepository,
  type ChallengeItem,
  type ChallengeMutationAction,
  type ChallengeOpponent,
  type CreateChallengeCommand,
  type OpponentSearchRequest,
  type RespondChallengeCommand,
} from "./challenge-hub-contract";

const seedOpponents: ChallengeOpponent[] = [
  { playerId: "p-032", username: "shadowreza", gamerTag: "ShadowReza", avatarInitials: "SR", challengeRating: 1525 },
  { playerId: "p-041", username: "miladpro", gamerTag: "MiladPro", avatarInitials: "MP", challengeRating: 1462 },
  { playerId: "p-014", username: "arminfc", gamerTag: "ArminFC", avatarInitials: "AF", challengeRating: 1498 },
  { playerId: "p-055", username: "novaking", gamerTag: "NovaKing", avatarInitials: "NK", challengeRating: 1510 },
  { playerId: "p-071", username: "pouya11", gamerTag: "Pouya11", avatarInitials: "P11", challengeRating: 1441 },
  { playerId: "p-083", username: "arianx", gamerTag: "ArianX", avatarInitials: "AX", challengeRating: 1477 },
  { playerId: "p-090", username: "rezaz", gamerTag: "RezaZ", avatarInitials: "RZ", challengeRating: 1394 },
  { playerId: "p-101", username: "kianz", gamerTag: "KianZ", avatarInitials: "KZ", challengeRating: 1506 },
  { playerId: "p-112", username: "amirprime", gamerTag: "AmirPrime", avatarInitials: "AP", challengeRating: 1438 },
  { playerId: "p-118", username: "sina8", gamerTag: "Sina8", avatarInitials: "S8", challengeRating: null },
];

const seedItems: ChallengeItem[] = [
  {
    challengeId: "ch-301",
    revision: "rev-ch-301-1",
    direction: "incoming",
    lifecycle: "invitation-pending",
    statusLabel: "در انتظار پاسخ تو",
    actionRequiredLabel: "این دعوت منتظر پاسخ توست.",
    opponent: seedOpponents[0],
    game: { gameId: "ea-fc-26", name: "EA SPORTS FC 26" },
    format: { formatId: "bo3", label: "Best of 3" },
    createdAtLabel: "۲۵ دقیقه پیش",
    responseDeadlineLabel: "۲ ساعت دیگر",
    note: "برای یک رقابت مستقیم آماده‌ای؟",
    match: null,
    result: null,
    allowedCommands: ["accept", "decline"],
    navigationTarget: null,
  },
  {
    challengeId: "ch-302",
    revision: "rev-ch-302-1",
    direction: "incoming",
    lifecycle: "invitation-expired",
    statusLabel: "مهلت پاسخ تمام شده",
    actionRequiredLabel: null,
    opponent: seedOpponents[1],
    game: { gameId: "efootball-2026", name: "eFootball 2026" },
    format: { formatId: "bo3", label: "Best of 3" },
    createdAtLabel: "دیروز",
    responseDeadlineLabel: "پایان‌یافته",
    note: null,
    match: null,
    result: null,
    allowedCommands: [],
    navigationTarget: null,
  },
  {
    challengeId: "ch-303",
    revision: "rev-ch-303-1",
    direction: "outgoing",
    lifecycle: "invitation-pending",
    statusLabel: "منتظر پاسخ حریف",
    actionRequiredLabel: null,
    opponent: seedOpponents[2],
    game: { gameId: "tekken-8", name: "Tekken 8" },
    format: { formatId: "bo5", label: "Best of 5" },
    createdAtLabel: "۱ ساعت پیش",
    responseDeadlineLabel: "۵ ساعت دیگر",
    note: null,
    match: null,
    result: null,
    allowedCommands: ["cancel"],
    navigationTarget: null,
  },
  {
    challengeId: "ch-304",
    revision: "rev-ch-304-1",
    direction: "incoming",
    lifecycle: "match-ready",
    statusLabel: "Match آماده است",
    actionRequiredLabel: "زمان و محل Match ثبت شده است.",
    opponent: seedOpponents[3],
    game: { gameId: "ea-fc-26", name: "EA SPORTS FC 26" },
    format: { formatId: "bo3", label: "Best of 3" },
    createdAtLabel: "۲ روز پیش",
    responseDeadlineLabel: null,
    note: null,
    match: { matchId: "m-302", startsAtLabel: "امروز، ساعت ۲۰:۳۰", venueLabel: "Arena Gaming Center، کرج", contextLabel: "حضوری" },
    result: null,
    allowedCommands: [],
    navigationTarget: { kind: "my-matches" },
  },
  {
    challengeId: "ch-305",
    revision: "rev-ch-305-1",
    direction: "outgoing",
    lifecycle: "awaiting-result",
    statusLabel: "در انتظار نتیجه",
    actionRequiredLabel: null,
    opponent: seedOpponents[4],
    game: { gameId: "ea-fc-26", name: "EA SPORTS FC 26" },
    format: { formatId: "bo3", label: "Best of 3" },
    createdAtLabel: "۳ روز پیش",
    responseDeadlineLabel: null,
    note: null,
    match: { matchId: "m-303", startsAtLabel: "برگزارشده در ۹ شهریور", venueLabel: "Nova Gaming، کرج", contextLabel: "حضوری" },
    result: null,
    allowedCommands: [],
    navigationTarget: { kind: "result-submission", matchId: "m-303" },
  },
  {
    challengeId: "ch-306",
    revision: "rev-ch-306-1",
    direction: "incoming",
    lifecycle: "action-required",
    statusLabel: "نیازمند اقدام",
    actionRequiredLabel: "وضعیت Match نیاز به بررسی تو دارد.",
    opponent: seedOpponents[5],
    game: { gameId: "tekken-8", name: "Tekken 8" },
    format: { formatId: "bo5", label: "Best of 5" },
    createdAtLabel: "۴ روز پیش",
    responseDeadlineLabel: null,
    note: null,
    match: { matchId: "m-304", startsAtLabel: "برگزارشده در ۸ شهریور", venueLabel: "Pixel House، تهران", contextLabel: "حضوری" },
    result: null,
    allowedCommands: [],
    navigationTarget: { kind: "my-matches" },
  },
  {
    challengeId: "ch-307",
    revision: "rev-ch-307-1",
    direction: "outgoing",
    lifecycle: "completed",
    statusLabel: "پایان‌یافته",
    actionRequiredLabel: null,
    opponent: seedOpponents[6],
    game: { gameId: "ea-fc-26", name: "EA SPORTS FC 26" },
    format: { formatId: "bo3", label: "Best of 3" },
    createdAtLabel: "هفته پیش",
    responseDeadlineLabel: null,
    note: null,
    match: { matchId: "m-305", startsAtLabel: "۳ شهریور", venueLabel: "Arena Gaming Center، کرج", contextLabel: "حضوری" },
    result: { outcome: "win", scoreLabel: "۳ — ۱", ratingDelta: 18, completedAtLabel: "۳ شهریور" },
    allowedCommands: [],
    navigationTarget: { kind: "my-matches" },
  },
  {
    challengeId: "ch-308",
    revision: "rev-ch-308-1",
    direction: "incoming",
    lifecycle: "completed",
    statusLabel: "پایان‌یافته",
    actionRequiredLabel: null,
    opponent: seedOpponents[7],
    game: { gameId: "tekken-8", name: "Tekken 8" },
    format: { formatId: "bo5", label: "Best of 5" },
    createdAtLabel: "۲ هفته پیش",
    responseDeadlineLabel: null,
    note: null,
    match: { matchId: "m-306", startsAtLabel: "۲۸ مرداد", venueLabel: "Nova Gaming، کرج", contextLabel: "حضوری" },
    result: { outcome: "loss", scoreLabel: "۲ — ۳", ratingDelta: -12, completedAtLabel: "۲۸ مرداد" },
    allowedCommands: [],
    navigationTarget: { kind: "my-matches" },
  },
];

const PAGE_SIZE = 4;

function belongsToFilter(item: ChallengeItem, filter: ChallengeHubFilter): boolean {
  if (filter === "all") return true;
  if (filter === "incoming") return item.direction === "incoming" && item.lifecycle === "invitation-pending";
  if (filter === "outgoing") return item.direction === "outgoing" && item.lifecycle === "invitation-pending";
  if (filter === "active") return ["accepted", "match-ready", "awaiting-result"].includes(item.lifecycle);
  if (filter === "action-required") return item.actionRequiredLabel !== null || item.lifecycle === "action-required";
  return ["completed", "cancelled", "invitation-expired", "invitation-declined"].includes(item.lifecycle);
}

function cloneItems(items: ChallengeItem[]) {
  return structuredClone(items);
}

export class MockChallengeHubRepository implements ChallengeHubRepository {
  private items = cloneItems(seedItems);
  private readonly idempotency = new Map<string, ChallengeMutationAction>();
  private nextId = 401;

  private page(query: ChallengeHubQuery): ChallengeHubPageData {
    const filtered = this.items.filter((item) => belongsToFilter(item, query.status));
    const totalPages = filtered.length === 0 ? 0 : Math.ceil(filtered.length / PAGE_SIZE);
    const currentPage = totalPages === 0 ? 1 : Math.min(query.page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;

    return {
      player: { playerId: "p-001", username: "sajadx", gamerTag: "SajadX" },
      access: { unlocked: true, canCreate: true, challengeRating: 1480, finalizedValidMatches: 42, requiredFinalizedMatches: 30 },
      creation: {
        games: [
          { gameId: "ea-fc-26", name: "EA SPORTS FC 26", formats: [{ formatId: "bo3", label: "Best of 3" }] },
          { gameId: "tekken-8", name: "Tekken 8", formats: [{ formatId: "bo5", label: "Best of 5" }] },
          { gameId: "efootball-2026", name: "eFootball 2026", formats: [{ formatId: "bo3", label: "Best of 3" }] },
        ],
        opponentSearchMinChars: 2,
        noteMaxLength: 240,
      },
      summary: {
        incoming: this.items.filter((item) => item.direction === "incoming" && item.lifecycle === "invitation-pending").length,
        outgoing: this.items.filter((item) => item.direction === "outgoing" && item.lifecycle === "invitation-pending").length,
        active: this.items.filter((item) => ["accepted", "match-ready", "awaiting-result", "action-required"].includes(item.lifecycle)).length,
        completed: this.items.filter((item) => ["completed", "cancelled", "invitation-expired", "invitation-declined"].includes(item.lifecycle)).length,
      },
      items: cloneItems(filtered.slice(start, start + PAGE_SIZE)),
      pagination: { currentPage, totalPages, totalItems: filtered.length },
    };
  }

  async getChallengeHub(query: ChallengeHubQuery) {
    return challengeHubLoadResultSchema.parse({ state: "authenticated", data: this.page(query) });
  }

  async searchOpponents(request: OpponentSearchRequest) {
    const query = request.query.trim();
    if (query.length < 2) {
      return opponentSearchActionSchema.parse({ outcome: "validation_error", message: "برای جست‌وجوی حریف حداقل دو کاراکتر وارد کن." });
    }
    const needle = query.toLocaleLowerCase("en-US");
    const items = seedOpponents
      .filter((opponent) => opponent.playerId !== "p-001")
      .filter((opponent) => opponent.username.toLocaleLowerCase("en-US").includes(needle) || opponent.gamerTag.toLocaleLowerCase("en-US").includes(needle))
      .slice(0, 8);
    return opponentSearchActionSchema.parse({ outcome: "results", query, items });
  }

  async createChallenge(command: CreateChallengeCommand): Promise<ChallengeMutationAction> {
    const remembered = this.idempotency.get(command.idempotencyKey);
    if (remembered) return remembered;

    const page = this.page({ status: "all", page: 1 });
    const errors = validateCreateChallengeDraft(page, command);
    if (Object.keys(errors).length > 0) {
      const action = challengeMutationActionSchema.parse({ outcome: "validation_error", fields: errors });
      this.idempotency.set(command.idempotencyKey, action);
      return action;
    }

    const opponent = seedOpponents.find((item) => item.playerId === command.opponentPlayerId);
    const game = page.creation.games.find((item) => item.gameId === command.gameId);
    const format = game?.formats.find((item) => item.formatId === command.formatId);
    if (!opponent || !game || !format) {
      return challengeMutationActionSchema.parse({ outcome: "unavailable", message: "گزینه‌های این چالش دیگر در دسترس نیستند." });
    }

    const duplicate = this.items.some(
      (item) => item.direction === "outgoing" && item.lifecycle === "invitation-pending" && item.opponent.playerId === opponent.playerId && item.game.gameId === game.gameId,
    );
    if (duplicate) {
      return challengeMutationActionSchema.parse({ outcome: "conflict", message: "برای این بازیکن و بازی، یک دعوت باز از قبل وجود دارد." });
    }

    const challengeId = `ch-${this.nextId++}`;
    const revision = `rev-${challengeId}-1`;
    this.items.unshift({
      challengeId,
      revision,
      direction: "outgoing",
      lifecycle: "invitation-pending",
      statusLabel: "منتظر پاسخ حریف",
      actionRequiredLabel: null,
      opponent,
      game: { gameId: game.gameId, name: game.name },
      format,
      createdAtLabel: "همین حالا",
      responseDeadlineLabel: "مهلت پاسخ فعال",
      note: command.note.trim() || null,
      match: null,
      result: null,
      allowedCommands: ["cancel"],
      navigationTarget: null,
    });
    const action = challengeMutationActionSchema.parse({ outcome: "accepted", challengeId, revision });
    this.idempotency.set(command.idempotencyKey, action);
    return action;
  }

  async respondToChallenge(challengeId: string, command: RespondChallengeCommand): Promise<ChallengeMutationAction> {
    const remembered = this.idempotency.get(command.idempotencyKey);
    if (remembered) return remembered;
    const item = this.items.find((candidate) => candidate.challengeId === challengeId);
    if (!item || item.direction !== "incoming" || item.lifecycle !== "invitation-pending") {
      return challengeMutationActionSchema.parse({ outcome: "unavailable", message: "این دعوت دیگر قابل پاسخ نیست." });
    }
    if (item.revision !== command.revision) {
      return challengeMutationActionSchema.parse({ outcome: "stale", message: "وضعیت این دعوت تغییر کرده است؛ اطلاعات تازه نمایش داده می‌شود." });
    }
    item.revision = `${item.revision}-next`;
    item.allowedCommands = [];
    item.actionRequiredLabel = null;
    if (command.action === "accept") {
      item.lifecycle = "accepted";
      item.statusLabel = "پذیرفته‌شده";
      item.responseDeadlineLabel = null;
    } else {
      item.lifecycle = "invitation-declined";
      item.statusLabel = "رد شده";
      item.responseDeadlineLabel = null;
    }
    const action = challengeMutationActionSchema.parse({ outcome: "accepted", challengeId, revision: item.revision });
    this.idempotency.set(command.idempotencyKey, action);
    return action;
  }

  async cancelChallenge(challengeId: string, command: CancelChallengeCommand): Promise<ChallengeMutationAction> {
    const remembered = this.idempotency.get(command.idempotencyKey);
    if (remembered) return remembered;
    const item = this.items.find((candidate) => candidate.challengeId === challengeId);
    if (!item || item.direction !== "outgoing" || item.lifecycle !== "invitation-pending") {
      return challengeMutationActionSchema.parse({ outcome: "unavailable", message: "این دعوت دیگر قابل لغو نیست." });
    }
    if (item.revision !== command.revision) {
      return challengeMutationActionSchema.parse({ outcome: "stale", message: "وضعیت این دعوت تغییر کرده است؛ اطلاعات تازه نمایش داده می‌شود." });
    }
    item.revision = `${item.revision}-next`;
    item.lifecycle = "cancelled";
    item.statusLabel = "لغوشده";
    item.responseDeadlineLabel = null;
    item.allowedCommands = [];
    const action = challengeMutationActionSchema.parse({ outcome: "accepted", challengeId, revision: item.revision });
    this.idempotency.set(command.idempotencyKey, action);
    return action;
  }
}
