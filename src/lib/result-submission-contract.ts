import { z } from "zod";

export const resultSubmissionStateSchema = z.enum([
  "reportable",
  "awaiting-confirmation",
  "finalized",
  "disputed",
  "unavailable",
]);

export const resultOutcomeSchema = z.enum(["win", "loss", "draw", "void"]);

const participantSchema = z.object({
  participantId: z.string().min(1),
  displayTag: z.string().min(1),
});

const opponentSchema = participantSchema.extend({
  kind: z.enum(["player", "team"]),
});

const gameSchema = z.object({
  gameId: z.string().min(1),
  name: z.string().min(1),
});

const venueSchema = z.object({
  gamingCenterId: z.string().min(1),
  name: z.string().min(1),
  city: z.string().min(1),
});

const competitionSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("tournament"),
    competitionId: z.string().min(1),
    title: z.string().min(1),
    tournamentSlug: z.string().min(1),
    roundLabel: z.string().min(1),
  }),
  z.object({
    kind: z.literal("challenge"),
    competitionId: z.string().min(1),
    title: z.string().min(1),
    roundLabel: z.null(),
  }),
]);

export const reportedScoreSchema = z.object({
  playerScore: z.number().int().nonnegative(),
  opponentScore: z.number().int().nonnegative(),
  reportedAt: z.string().datetime({ offset: true }),
});

export const finalizedResultSchema = z.object({
  playerScore: z.number().int().nonnegative(),
  opponentScore: z.number().int().nonnegative(),
  outcome: resultOutcomeSchema,
  ratingDelta: z.number().int().nullable(),
  finalizedAt: z.string().datetime({ offset: true }),
});

const scorePolicySchema = z
  .object({
    minScore: z.number().int().nonnegative(),
    maxScore: z.number().int().nonnegative().nullable(),
    allowDraw: z.boolean(),
  })
  .refine((policy) => policy.maxScore === null || policy.maxScore >= policy.minScore, {
    message: "Maximum score cannot be lower than minimum score.",
    path: ["maxScore"],
  });

export const resultSubmissionPageSchema = z
  .object({
    matchId: z.string().min(1),
    revision: z.string().min(1),
    submissionState: resultSubmissionStateSchema,
    player: participantSchema,
    opponent: opponentSchema,
    game: gameSchema,
    competition: competitionSchema,
    venue: venueSchema.nullable(),
    startsAt: z.string().datetime({ offset: true }),
    timezone: z.string().min(1),
    formatLabel: z.string().min(1),
    scorePolicy: scorePolicySchema,
    reportedScore: reportedScoreSchema.nullable(),
    finalResult: finalizedResultSchema.nullable(),
  })
  .superRefine((page, ctx) => {
    if (page.submissionState === "reportable") {
      if (page.reportedScore !== null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Reportable state cannot expose a previously reported score.",
          path: ["reportedScore"],
        });
      }
      if (page.finalResult !== null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Reportable state cannot expose a finalized result.",
          path: ["finalResult"],
        });
      }
    }

    if (page.submissionState === "awaiting-confirmation" && page.reportedScore === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Awaiting-confirmation state requires a reported score.",
        path: ["reportedScore"],
      });
    }

    if (page.submissionState === "finalized" && page.finalResult === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Finalized state requires a finalized result.",
        path: ["finalResult"],
      });
    }

    if (page.submissionState !== "finalized" && page.finalResult !== null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Only finalized state may expose a finalized result.",
        path: ["finalResult"],
      });
    }
  });

export const submitResultCommandSchema = z.object({
  revision: z.string().min(1),
  playerScore: z.number().int().nonnegative(),
  opponentScore: z.number().int().nonnegative(),
  idempotencyKey: z.string().min(8).max(200),
});

const fieldErrorSchema = z.object({
  playerScore: z.string().min(1).optional(),
  opponentScore: z.string().min(1).optional(),
  form: z.string().min(1).optional(),
});

const acceptedResultSchema = z
  .object({
    outcome: z.literal("accepted"),
    receiptId: z.string().min(1),
    matchId: z.string().min(1),
    status: z.enum(["awaiting-confirmation", "finalized"]),
    reportedScore: reportedScoreSchema,
    finalResult: finalizedResultSchema.nullable(),
  })
  .superRefine((result, ctx) => {
    if (result.status === "finalized" && result.finalResult === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Finalized accepted result requires final result data.",
        path: ["finalResult"],
      });
    }
    if (result.status !== "finalized" && result.finalResult !== null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Awaiting-confirmation receipt cannot expose a finalized result.",
        path: ["finalResult"],
      });
    }
  });

const validationErrorResultSchema = z.object({
  outcome: z.literal("validation_error"),
  fields: fieldErrorSchema,
});

const staleResultSchema = z.object({
  outcome: z.literal("stale"),
  revision: z.string().min(1),
});

const unavailableResultSchema = z.object({
  outcome: z.literal("unavailable"),
  reason: z.enum(["not-reportable", "disputed", "finalized", "cancelled"]),
});

const alreadySubmittedResultSchema = z
  .object({
    outcome: z.literal("already_submitted"),
    status: z.enum(["awaiting-confirmation", "finalized"]),
    reportedScore: reportedScoreSchema,
    finalResult: finalizedResultSchema.nullable(),
  })
  .superRefine((result, ctx) => {
    if (result.status === "finalized" && result.finalResult === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Finalized existing submission requires final result data.",
        path: ["finalResult"],
      });
    }
    if (result.status !== "finalized" && result.finalResult !== null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Awaiting-confirmation existing submission cannot expose a final result.",
        path: ["finalResult"],
      });
    }
  });

export const submitResultActionSchema = z.union([
  acceptedResultSchema,
  validationErrorResultSchema,
  staleResultSchema,
  unavailableResultSchema,
  alreadySubmittedResultSchema,
]);

export type ResultSubmissionState = z.infer<typeof resultSubmissionStateSchema>;
export type ResultSubmissionPageData = z.infer<typeof resultSubmissionPageSchema>;
export type SubmitResultCommand = z.infer<typeof submitResultCommandSchema>;
export type SubmitResultAction = z.infer<typeof submitResultActionSchema>;
export type ReportedScore = z.infer<typeof reportedScoreSchema>;
export type FinalizedResult = z.infer<typeof finalizedResultSchema>;

export interface ResultSubmissionRepository {
  getResultSubmission(matchId: string): Promise<ResultSubmissionPageData | null>;
  submitResult(matchId: string, command: SubmitResultCommand): Promise<SubmitResultAction>;
}

export function validateScoreDraft(
  page: ResultSubmissionPageData,
  playerScore: number,
  opponentScore: number,
): { playerScore?: string; opponentScore?: string; form?: string } {
  const errors: { playerScore?: string; opponentScore?: string; form?: string } = {};
  const { minScore, maxScore, allowDraw } = page.scorePolicy;

  if (!Number.isInteger(playerScore) || playerScore < minScore) {
    errors.playerScore = `امتیاز باید عدد صحیح و حداقل ${minScore} باشد.`;
  } else if (maxScore !== null && playerScore > maxScore) {
    errors.playerScore = `امتیاز نمی‌تواند بیشتر از ${maxScore} باشد.`;
  }

  if (!Number.isInteger(opponentScore) || opponentScore < minScore) {
    errors.opponentScore = `امتیاز باید عدد صحیح و حداقل ${minScore} باشد.`;
  } else if (maxScore !== null && opponentScore > maxScore) {
    errors.opponentScore = `امتیاز نمی‌تواند بیشتر از ${maxScore} باشد.`;
  }

  if (!errors.playerScore && !errors.opponentScore && !allowDraw && playerScore === opponentScore) {
    errors.form = "برای این Match نتیجه مساوی قابل ثبت نیست.";
  }

  return errors;
}
