import { z } from "zod";

export const disputeStateSchema = z.enum(["eligible", "open", "under-review", "resolved", "unavailable"]);
export const disputeStatusSchema = z.enum(["open", "under-review", "resolved"]);
export const disputeReasonSchema = z.enum([
  "incorrect-score",
  "rule-violation",
  "no-show",
  "technical-issue",
  "unsportsmanlike-conduct",
  "other",
]);

export const disputeResolutionDecisionSchema = z.enum(["upheld", "rejected", "adjusted", "voided", "no-action"]);

const participantSchema = z.object({ participantId: z.string().min(1), displayTag: z.string().min(1) });
const opponentSchema = participantSchema.extend({ kind: z.enum(["player", "team"]) });
const gameSchema = z.object({ gameId: z.string().min(1), name: z.string().min(1) });
const venueSchema = z.object({ gamingCenterId: z.string().min(1), name: z.string().min(1), city: z.string().min(1) });
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

const scoreSchema = z.object({
  playerScore: z.number().int().nonnegative(),
  opponentScore: z.number().int().nonnegative(),
});

const finalResultSchema = scoreSchema.extend({
  outcome: z.enum(["win", "loss", "draw", "void"]),
  ratingDelta: z.number().int().nullable(),
  finalizedAt: z.string().datetime({ offset: true }),
});

const resultContextSchema = z
  .object({
    state: z.enum(["awaiting-confirmation", "disputed", "finalized", "void"]),
    reportedScore: scoreSchema.nullable(),
    finalResult: finalResultSchema.nullable(),
  })
  .superRefine((result, ctx) => {
    if (result.state === "finalized" && result.finalResult === null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Finalized result context requires final result.", path: ["finalResult"] });
    }
    if (result.state !== "finalized" && result.finalResult !== null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Only finalized result context may expose final result.", path: ["finalResult"] });
    }
  });

export const evidenceMimeSchema = z.enum(["image/jpeg", "image/png", "image/webp"]);

const evidencePolicySchema = z.object({
  enabled: z.boolean(),
  maxFiles: z.number().int().nonnegative(),
  maxFileBytes: z.number().int().positive(),
  allowedMimeTypes: z.array(evidenceMimeSchema).min(1),
});

const disputePolicySchema = z
  .object({
    allowedReasons: z.array(disputeReasonSchema).min(1),
    minStatementLength: z.number().int().nonnegative(),
    maxStatementLength: z.number().int().positive(),
    evidence: evidencePolicySchema,
  })
  .refine((policy) => policy.maxStatementLength >= policy.minStatementLength, {
    message: "Maximum statement length cannot be lower than minimum statement length.",
    path: ["maxStatementLength"],
  });

export const disputeEvidenceSchema = z.object({
  evidenceId: z.string().min(1),
  fileName: z.string().min(1),
  contentType: evidenceMimeSchema,
  sizeBytes: z.number().int().positive(),
  uploadedAt: z.string().datetime({ offset: true }),
});

const disputeResolutionSchema = z.object({
  decision: disputeResolutionDecisionSchema,
  summary: z.string().min(1),
  resolvedAt: z.string().datetime({ offset: true }),
});

export const currentDisputeSchema = z.object({
  disputeId: z.string().min(1),
  status: disputeStatusSchema,
  reason: disputeReasonSchema,
  statement: z.string().min(1),
  createdAt: z.string().datetime({ offset: true }),
  canAddEvidence: z.boolean(),
  evidence: z.array(disputeEvidenceSchema),
  resolution: disputeResolutionSchema.nullable(),
});

export const matchDisputePageSchema = z
  .object({
    matchId: z.string().min(1),
    revision: z.string().min(1),
    disputeState: disputeStateSchema,
    unavailableReason: z.enum(["not-eligible", "window-closed", "cancelled", "result-not-ready"]).nullable(),
    player: participantSchema,
    opponent: opponentSchema,
    game: gameSchema,
    competition: competitionSchema,
    venue: venueSchema.nullable(),
    startsAt: z.string().datetime({ offset: true }),
    timezone: z.string().min(1),
    formatLabel: z.string().min(1),
    result: resultContextSchema,
    policy: disputePolicySchema,
    dispute: currentDisputeSchema.nullable(),
  })
  .superRefine((page, ctx) => {
    const needsDispute = page.disputeState === "open" || page.disputeState === "under-review" || page.disputeState === "resolved";
    if ((page.disputeState === "eligible" || page.disputeState === "unavailable") && page.dispute !== null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Eligible/unavailable page cannot expose an active dispute.", path: ["dispute"] });
    }
    if (needsDispute && page.dispute === null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Active/resolved dispute state requires dispute data.", path: ["dispute"] });
    }
    if (page.dispute && page.dispute.status !== page.disputeState) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Page dispute state must match dispute status.", path: ["dispute", "status"] });
    }
    if (page.disputeState === "resolved" && page.dispute?.resolution === null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Resolved dispute requires resolution.", path: ["dispute", "resolution"] });
    }
    if (page.disputeState !== "resolved" && page.dispute?.resolution) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Only resolved dispute may expose resolution.", path: ["dispute", "resolution"] });
    }
    if (page.disputeState === "resolved" && page.dispute?.canAddEvidence) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Resolved dispute cannot accept evidence.", path: ["dispute", "canAddEvidence"] });
    }
    if (page.dispute && page.dispute.evidence.length > page.policy.evidence.maxFiles) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Evidence count exceeds policy maximum.", path: ["dispute", "evidence"] });
    }
    if (!page.policy.evidence.enabled && page.dispute && (page.dispute.evidence.length > 0 || page.dispute.canAddEvidence)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Disabled evidence policy cannot expose evidence mutation state.", path: ["policy", "evidence"] });
    }
    if (page.disputeState === "unavailable" && page.unavailableReason === null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Unavailable state requires a reason.", path: ["unavailableReason"] });
    }
    if (page.disputeState !== "unavailable" && page.unavailableReason !== null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Only unavailable state may expose unavailable reason.", path: ["unavailableReason"] });
    }
  });

export const createDisputeCommandSchema = z.object({
  revision: z.string().min(1),
  reason: disputeReasonSchema,
  statement: z.string(),
  idempotencyKey: z.string().min(8).max(200),
});

const disputeFieldErrorsSchema = z.object({
  reason: z.string().min(1).optional(),
  statement: z.string().min(1).optional(),
  form: z.string().min(1).optional(),
});

const createAcceptedSchema = z.object({
  outcome: z.literal("accepted"),
  matchId: z.string().min(1),
  revision: z.string().min(1),
  dispute: currentDisputeSchema,
});
const createValidationSchema = z.object({ outcome: z.literal("validation_error"), fields: disputeFieldErrorsSchema });
const staleSchema = z.object({ outcome: z.literal("stale"), revision: z.string().min(1) });
const createUnavailableSchema = z.object({
  outcome: z.literal("unavailable"),
  reason: z.enum(["not-eligible", "already-resolved", "window-closed", "cancelled"]),
});
const alreadyOpenSchema = z.object({
  outcome: z.literal("already_open"),
  matchId: z.string().min(1),
  revision: z.string().min(1),
  dispute: currentDisputeSchema,
});

export const createDisputeActionSchema = z.union([
  createAcceptedSchema,
  createValidationSchema,
  staleSchema,
  createUnavailableSchema,
  alreadyOpenSchema,
]);

const evidenceValidationSchema = z.object({
  outcome: z.literal("validation_error"),
  file: z.string().min(1).optional(),
  form: z.string().min(1).optional(),
});
const evidenceAcceptedSchema = z.object({
  outcome: z.literal("accepted"),
  matchId: z.string().min(1),
  disputeId: z.string().min(1),
  revision: z.string().min(1),
  evidence: disputeEvidenceSchema,
});
const evidenceUnavailableSchema = z.object({
  outcome: z.literal("unavailable"),
  reason: z.enum(["not-open", "review-locked", "resolved", "quota-reached", "uploads-disabled"]),
});
const evidenceAlreadyUploadedSchema = evidenceAcceptedSchema.extend({ outcome: z.literal("already_uploaded") });

export const uploadEvidenceActionSchema = z.union([
  evidenceAcceptedSchema,
  evidenceValidationSchema,
  staleSchema,
  evidenceUnavailableSchema,
  evidenceAlreadyUploadedSchema,
]);

export type MatchDisputePageData = z.infer<typeof matchDisputePageSchema>;
export type DisputeReason = z.infer<typeof disputeReasonSchema>;
export type CurrentDispute = z.infer<typeof currentDisputeSchema>;
export type DisputeEvidence = z.infer<typeof disputeEvidenceSchema>;
export type CreateDisputeCommand = z.infer<typeof createDisputeCommandSchema>;
export type CreateDisputeAction = z.infer<typeof createDisputeActionSchema>;
export type UploadEvidenceAction = z.infer<typeof uploadEvidenceActionSchema>;

export interface UploadEvidenceCommand {
  revision: string;
  file: File;
  idempotencyKey: string;
}

export interface MatchDisputeRepository {
  getDispute(matchId: string): Promise<MatchDisputePageData | null>;
  createDispute(matchId: string, command: CreateDisputeCommand): Promise<CreateDisputeAction>;
  uploadEvidence(matchId: string, disputeId: string, command: UploadEvidenceCommand): Promise<UploadEvidenceAction>;
}

export function validateDisputeDraft(page: MatchDisputePageData, reason: string, statement: string) {
  const errors: { reason?: string; statement?: string; form?: string } = {};
  if (!page.policy.allowedReasons.includes(reason as DisputeReason)) {
    errors.reason = "دلیل اعتراض را از گزینه‌های مجاز انتخاب کن.";
  }
  const length = statement.trim().length;
  if (length < page.policy.minStatementLength) {
    errors.statement = `توضیح اعتراض باید حداقل ${page.policy.minStatementLength} کاراکتر باشد.`;
  } else if (length > page.policy.maxStatementLength) {
    errors.statement = `توضیح اعتراض نمی‌تواند بیشتر از ${page.policy.maxStatementLength} کاراکتر باشد.`;
  }
  return errors;
}

export function validateEvidenceFile(page: MatchDisputePageData, file: File | null): string | null {
  if (!file) return "یک تصویر برای مدرک انتخاب کن.";
  const policy = page.policy.evidence;
  if (!policy.enabled) return "افزودن مدرک برای این پرونده فعال نیست.";
  if (page.dispute && page.dispute.evidence.length >= policy.maxFiles) return "تعداد مدارک این پرونده به سقف مجاز رسیده است.";
  if (file.size > policy.maxFileBytes) return "حجم فایل از سقف مجاز بیشتر است.";
  if (!policy.allowedMimeTypes.includes(file.type as z.infer<typeof evidenceMimeSchema>)) return "فرمت این تصویر در فهرست مجاز نیست.";
  return null;
}
