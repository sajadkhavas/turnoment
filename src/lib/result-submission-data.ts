import {
  type ResultSubmissionPageData,
  type ResultSubmissionRepository,
  type SubmitResultAction,
  type SubmitResultCommand,
  submitResultCommandSchema,
  validateScoreDraft,
} from "./result-submission-contract";

const pages: Record<string, ResultSubmissionPageData> = {
  "m-204": {
    matchId: "m-204",
    revision: "result-v1-m204",
    submissionState: "reportable",
    player: { participantId: "p-001", displayTag: "SajadX" },
    opponent: { participantId: "p-041", kind: "player", displayTag: "MiladPro" },
    game: { gameId: "ea-fc-26", name: "EA FC 26" },
    competition: {
      kind: "tournament",
      competitionId: "t-110",
      title: "لیگ شبانه تهران",
      tournamentSlug: "tehran-night-league",
      roundLabel: "هفته ۴",
    },
    venue: { gamingCenterId: "gc-04", name: "Next Level", city: "تهران" },
    startsAt: "2026-09-08T21:30:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "1v1",
    scorePolicy: { minScore: 0, maxScore: 30, allowDraw: false },
    reportedScore: null,
    finalResult: null,
  },
  "m-205": {
    matchId: "m-205",
    revision: "result-v3-m205",
    submissionState: "awaiting-confirmation",
    player: { participantId: "p-001", displayTag: "SajadX" },
    opponent: { participantId: "p-055", kind: "player", displayTag: "NovaKing" },
    game: { gameId: "efootball-2026", name: "eFootball 2026" },
    competition: { kind: "challenge", competitionId: "ch-196", title: "چالش مستقیم", roundLabel: null },
    venue: { gamingCenterId: "gc-01", name: "Arena Gaming Center", city: "کرج" },
    startsAt: "2026-09-07T18:00:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "Best of 3",
    scorePolicy: { minScore: 0, maxScore: 30, allowDraw: false },
    reportedScore: { playerScore: 3, opponentScore: 1, reportedAt: "2026-09-07T18:55:00+03:30" },
    finalResult: null,
  },
  "m-206": {
    matchId: "m-206",
    revision: "result-v4-m206",
    submissionState: "disputed",
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
    scorePolicy: { minScore: 0, maxScore: 20, allowDraw: false },
    reportedScore: { playerScore: 2, opponentScore: 3, reportedAt: "2026-09-05T19:45:00+03:30" },
    finalResult: null,
  },
  "m-207": {
    matchId: "m-207",
    revision: "result-v8-m207",
    submissionState: "finalized",
    player: { participantId: "p-001", displayTag: "SajadX" },
    opponent: { participantId: "p-071", kind: "player", displayTag: "Pouya11" },
    game: { gameId: "ea-fc-26", name: "EA FC 26" },
    competition: {
      kind: "tournament",
      competitionId: "t-108",
      title: "جام تابستانه کرج",
      tournamentSlug: "karaj-summer-cup",
      roundLabel: "رده‌بندی",
    },
    venue: { gamingCenterId: "gc-05", name: "Game Zone", city: "تهران" },
    startsAt: "2026-08-30T18:30:00+03:30",
    timezone: "Asia/Tehran",
    formatLabel: "1v1",
    scorePolicy: { minScore: 0, maxScore: 30, allowDraw: false },
    reportedScore: { playerScore: 4, opponentScore: 1, reportedAt: "2026-08-30T19:10:00+03:30" },
    finalResult: {
      playerScore: 4,
      opponentScore: 1,
      outcome: "win",
      ratingDelta: 18,
      finalizedAt: "2026-08-30T19:15:00+03:30",
    },
  },
};

export class MockResultSubmissionRepository implements ResultSubmissionRepository {
  async getResultSubmission(matchId: string): Promise<ResultSubmissionPageData | null> {
    return pages[matchId] ?? null;
  }

  async submitResult(matchId: string, command: SubmitResultCommand): Promise<SubmitResultAction> {
    const request = submitResultCommandSchema.parse(command);
    const page = pages[matchId];
    if (!page) return { outcome: "unavailable", reason: "not-reportable" };
    if (request.revision !== page.revision) return { outcome: "stale", revision: page.revision };

    if (page.submissionState === "awaiting-confirmation") {
      return {
        outcome: "already_submitted",
        status: "awaiting-confirmation",
        reportedScore: page.reportedScore!,
        finalResult: null,
      };
    }
    if (page.submissionState === "finalized") {
      return {
        outcome: "already_submitted",
        status: "finalized",
        reportedScore: page.reportedScore!,
        finalResult: page.finalResult,
      };
    }
    if (page.submissionState === "disputed") return { outcome: "unavailable", reason: "disputed" };
    if (page.submissionState !== "reportable") return { outcome: "unavailable", reason: "not-reportable" };

    const fields = validateScoreDraft(page, request.playerScore, request.opponentScore);
    if (Object.keys(fields).length) return { outcome: "validation_error", fields };

    return {
      outcome: "accepted",
      receiptId: `receipt-${request.idempotencyKey.slice(0, 12)}`,
      matchId,
      status: "awaiting-confirmation",
      reportedScore: {
        playerScore: request.playerScore,
        opponentScore: request.opponentScore,
        reportedAt: "2026-09-09T22:30:00+03:30",
      },
      finalResult: null,
    };
  }
}
