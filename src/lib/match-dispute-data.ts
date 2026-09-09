import {
  createDisputeCommandSchema,
  matchDisputePageSchema,
  type CreateDisputeAction,
  type CreateDisputeCommand,
  type MatchDisputePageData,
  type MatchDisputeRepository,
  type UploadEvidenceAction,
  type UploadEvidenceCommand,
  validateDisputeDraft,
  validateEvidenceFile,
} from "./match-dispute-contract";

const commonPolicy = {
  allowedReasons: ["incorrect-score", "rule-violation", "no-show", "technical-issue", "unsportsmanlike-conduct", "other"] as const,
  minStatementLength: 20,
  maxStatementLength: 1000,
  evidence: {
    enabled: true,
    maxFiles: 3,
    maxFileBytes: 5 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"] as const,
  },
};

const pages: Record<string, MatchDisputePageData> = {
  "m-205": matchDisputePageSchema.parse({
    matchId: "m-205",
    revision: "dispute-v1-m205",
    disputeState: "eligible",
    unavailableReason: null,
    player: { participantId: "p-001", displayTag: "SajadX" },
    opponent: { participantId: "p-055", kind: "player", displayTag: "NovaKing" },
    game: { gameId: "efootball-2026", name: "eFootball 2026" },
    competition: { kind: "challenge", competitionId: "ch-196", title: "چالش مستقیم", roundLabel: null },
    venue: { gamingCenterId: "gc-01", name: "Arena Gaming Center", city: "کرج" },
    startsAt: "2026-09-07T18:00:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "Best of 3",
    result: { state: "awaiting-confirmation", reportedScore: { playerScore: 3, opponentScore: 1 }, finalResult: null },
    policy: commonPolicy,
    dispute: null,
  }),
  "m-206": matchDisputePageSchema.parse({
    matchId: "m-206",
    revision: "dispute-v4-m206",
    disputeState: "under-review",
    unavailableReason: null,
    player: { participantId: "p-001", displayTag: "SajadX" },
    opponent: { participantId: "p-067", kind: "player", displayTag: "KianZ" },
    game: { gameId: "tekken-8", name: "Tekken 8" },
    competition: {
      kind: "tournament",
      competitionId: "t-104",
      title: "Fight Night — Tekken 8",
      tournamentSlug: "tekken-8-fight-night",
      roundLabel: "یک‌چهارم نهایی",
    },
    venue: { gamingCenterId: "gc-02", name: "Nova Gaming", city: "کرج" },
    startsAt: "2026-09-05T19:00:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "Best of 5",
    result: { state: "disputed", reportedScore: { playerScore: 2, opponentScore: 3 }, finalResult: null },
    policy: commonPolicy,
    dispute: {
      disputeId: "dsp-206",
      status: "under-review",
      reason: "incorrect-score",
      statement: "امتیاز ثبت‌شده با نتیجه‌ای که در پایان بازی نمایش داده شد مطابقت ندارد.",
      createdAt: "2026-09-05T19:52:00+03:30",
      canAddEvidence: true,
      evidence: [
        {
          evidenceId: "ev-206-1",
          fileName: "scoreboard.png",
          contentType: "image/png",
          sizeBytes: 384221,
          uploadedAt: "2026-09-05T19:55:00+03:30",
        },
      ],
      resolution: null,
    },
  }),
  "m-208": matchDisputePageSchema.parse({
    matchId: "m-208",
    revision: "dispute-v9-m208",
    disputeState: "resolved",
    unavailableReason: null,
    player: { participantId: "p-001", displayTag: "SajadX" },
    opponent: { participantId: "p-083", kind: "player", displayTag: "ArianX" },
    game: { gameId: "ea-fc-26", name: "EA FC 26" },
    competition: {
      kind: "tournament",
      competitionId: "t-109",
      title: "EA FC Summer Final",
      tournamentSlug: "ea-fc-summer-final",
      roundLabel: "یک‌چهارم نهایی",
    },
    venue: { gamingCenterId: "gc-05", name: "Game Zone", city: "تهران" },
    startsAt: "2026-08-21T20:00:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "1v1",
    result: {
      state: "finalized",
      reportedScore: { playerScore: 1, opponentScore: 2 },
      finalResult: { playerScore: 1, opponentScore: 2, outcome: "loss", ratingDelta: -11, finalizedAt: "2026-08-21T20:50:00+03:30" },
    },
    policy: commonPolicy,
    dispute: {
      disputeId: "dsp-208",
      status: "resolved",
      reason: "technical-issue",
      statement: "در میانه Match اختلال فنی رخ داد و درخواست بررسی وضعیت بازی ثبت شد.",
      createdAt: "2026-08-21T20:22:00+03:30",
      canAddEvidence: false,
      evidence: [],
      resolution: {
        decision: "no-action",
        summary: "پس از بررسی مدارک، نتیجه ثبت‌شده بدون تغییر نهایی شد.",
        resolvedAt: "2026-08-21T20:48:00+03:30",
      },
    },
  }),
  "m-209": matchDisputePageSchema.parse({
    matchId: "m-209",
    revision: "dispute-v2-m209",
    disputeState: "unavailable",
    unavailableReason: "cancelled",
    player: { participantId: "p-001", displayTag: "SajadX" },
    opponent: { participantId: "team-22", kind: "team", displayTag: "Redline" },
    game: { gameId: "cs2", name: "Counter-Strike 2" },
    competition: { kind: "tournament", competitionId: "t-115", title: "CS2 Team Clash", tournamentSlug: "cs2-team-clash", roundLabel: "دور اول" },
    venue: { gamingCenterId: "gc-06", name: "Respawn Club", city: "تهران" },
    startsAt: "2026-08-18T16:00:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "Best of 1",
    result: { state: "void", reportedScore: null, finalResult: null },
    policy: commonPolicy,
    dispute: null,
  }),
};

export class MockMatchDisputeRepository implements MatchDisputeRepository {
  async getDispute(matchId: string): Promise<MatchDisputePageData | null> {
    return pages[matchId] ?? null;
  }

  async createDispute(matchId: string, command: CreateDisputeCommand): Promise<CreateDisputeAction> {
    const parsed = createDisputeCommandSchema.parse(command);
    const page = pages[matchId];
    if (!page) return { outcome: "unavailable", reason: "not-eligible" };
    if (parsed.revision !== page.revision) return { outcome: "stale", revision: page.revision };
    if (page.dispute) {
      return { outcome: "already_open", matchId, revision: page.revision, dispute: page.dispute };
    }
    if (page.disputeState !== "eligible") return { outcome: "unavailable", reason: page.unavailableReason === "cancelled" ? "cancelled" : "not-eligible" };

    const fields = validateDisputeDraft(page, parsed.reason, parsed.statement);
    if (Object.keys(fields).length) return { outcome: "validation_error", fields };

    return {
      outcome: "accepted",
      matchId,
      revision: `dispute-created-${matchId}`,
      dispute: {
        disputeId: `dsp-${matchId}`,
        status: "open",
        reason: parsed.reason,
        statement: parsed.statement.trim(),
        createdAt: "2026-09-10T01:00:00+03:30",
        canAddEvidence: true,
        evidence: [],
        resolution: null,
      },
    };
  }

  async uploadEvidence(matchId: string, disputeId: string, command: UploadEvidenceCommand): Promise<UploadEvidenceAction> {
    const page = pages[matchId];
    if (!page?.dispute || page.dispute.disputeId !== disputeId) return { outcome: "unavailable", reason: "not-open" };
    if (command.revision !== page.revision) return { outcome: "stale", revision: page.revision };
    if (page.dispute.status === "resolved") return { outcome: "unavailable", reason: "resolved" };
    if (!page.policy.evidence.enabled || !page.dispute.canAddEvidence) return { outcome: "unavailable", reason: "uploads-disabled" };
    const fileError = validateEvidenceFile(page, command.file);
    if (fileError) return { outcome: "validation_error", file: fileError };

    return {
      outcome: "accepted",
      matchId,
      disputeId,
      revision: `evidence-${command.idempotencyKey.slice(0, 12)}`,
      evidence: {
        evidenceId: `ev-${command.idempotencyKey.slice(0, 12)}`,
        fileName: command.file.name,
        contentType: command.file.type as "image/jpeg" | "image/png" | "image/webp",
        sizeBytes: command.file.size,
        uploadedAt: "2026-09-10T01:05:00+03:30",
      },
    };
  }
}
