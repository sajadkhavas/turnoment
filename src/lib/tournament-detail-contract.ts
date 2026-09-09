import { z } from "zod";

export const moneySchema = z.object({
  amount: z.number().int().nonnegative(),
  currency: z.literal("IRR"),
});

export const tournamentLifecycleSchema = z.enum([
  "registration_open",
  "filling",
  "registration_closed",
  "upcoming",
  "check_in",
  "in_progress",
  "completed",
  "cancelled",
]);

export const registrationAvailabilitySchema = z.enum([
  "available",
  "already_registered",
  "full",
  "closed",
  "upcoming",
  "ineligible",
]);

const capacitySchema = z
  .object({
    limit: z.number().int().positive(),
    registered: z.number().int().nonnegative(),
    remaining: z.number().int().nonnegative(),
  })
  .superRefine((value, ctx) => {
    if (value.registered > value.limit) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "registered cannot exceed capacity" });
    }
    if (value.remaining !== Math.max(0, value.limit - value.registered)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "remaining must match capacity totals" });
    }
  });

const gameSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  platform: z.string().min(1),
  image: z.string().nullable(),
});

const venueSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  verified: z.boolean(),
  rating: z.number().min(0).max(5).nullable(),
  reviews: z.number().int().nonnegative().nullable(),
  city: z.string().min(1),
  district: z.string().min(1),
  image: z.string().nullable(),
  equipment: z.array(z.string()),
});

const scheduleSchema = z.object({
  startAt: z.string().datetime({ offset: true }),
  registrationClosesAt: z.string().datetime({ offset: true }).nullable(),
  checkInOpensAt: z.string().datetime({ offset: true }).nullable(),
  timezone: z.literal("Asia/Tehran"),
  displayDate: z.string().min(1),
  displayTime: z.string().min(1),
});

const ruleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  mandatory: z.boolean(),
});

const participantSchema = z.object({
  id: z.string().min(1),
  gamerTag: z.string().min(1),
  seed: z.number().int().positive().nullable(),
  status: z.enum(["confirmed", "check_in_pending", "checked_in"]),
});

const bracketCompetitorSchema = z.object({
  participantId: z.string().nullable(),
  gamerTag: z.string().nullable(),
  seed: z.number().int().positive().nullable(),
  score: z.number().int().nonnegative().nullable(),
});

const bracketMatchSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  state: z.enum(["scheduled", "live", "completed"]),
  sideA: bracketCompetitorSchema.nullable(),
  sideB: bracketCompetitorSchema.nullable(),
});

const bracketRoundSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  matches: z.array(bracketMatchSchema).max(4),
});

const bracketPreviewSchema = z.object({
  state: z.enum(["not_published", "seeded", "live", "completed"]),
  formatLabel: z.string().min(1),
  participantCount: z.number().int().nonnegative(),
  rounds: z.array(bracketRoundSchema).max(3),
});

const registrationPolicySchema = z.object({
  state: z.enum(["open", "full", "closed", "upcoming"]),
  mode: z.enum(["solo", "team"]),
  rulesVersion: z.string().min(1),
  requiresRulesAcceptance: z.boolean(),
});

export const tournamentDetailSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  detailVersion: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  heroImage: z.string().nullable(),
  lifecycle: tournamentLifecycleSchema,
  game: gameSchema,
  venue: venueSchema,
  schedule: scheduleSchema,
  formatLabel: z.string().min(1),
  bracketFormatLabel: z.string().min(1),
  capacity: capacitySchema,
  entryFee: moneySchema,
  fixedPrize: moneySchema,
  ruleset: z.object({
    id: z.string().min(1),
    version: z.string().min(1),
    rules: z.array(ruleSchema),
  }),
  participants: z.object({
    total: z.number().int().nonnegative(),
    preview: z.array(participantSchema).max(8),
  }),
  bracketPreview: bracketPreviewSchema,
  registrationPolicy: registrationPolicySchema,
});

const eligibleTeamSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  memberCount: z.number().int().positive(),
});

const currentRegistrationSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["pending", "confirmed", "payment_required"]),
  createdAt: z.string().datetime({ offset: true }),
});

export const tournamentRegistrationContextSchema = z.object({
  detailVersion: z.string().min(1),
  tournament: z.object({
    id: z.string().min(1),
    slug: z.string().min(1),
    title: z.string().min(1),
    game: z.string().min(1),
    venue: z.string().min(1),
    displayDate: z.string().min(1),
    displayTime: z.string().min(1),
    entryFee: moneySchema,
    fixedPrize: moneySchema,
  }),
  player: z.object({
    id: z.string().min(1),
    gamerTag: z.string().min(1),
  }),
  availability: registrationAvailabilitySchema,
  mode: z.enum(["solo", "team"]),
  rules: z.object({
    version: z.string().min(1),
    summary: z.string().min(1),
  }),
  eligibleTeams: z.array(eligibleTeamSchema),
  currentRegistration: currentRegistrationSchema.nullable(),
});

export const registrationRequestSchema = z.object({
  detailVersion: z.string().min(1),
  rulesVersion: z.string().min(1),
  acceptedRules: z.literal(true),
  teamId: z.string().min(1).nullable(),
});

const confirmedResultSchema = z.object({
  outcome: z.literal("confirmed"),
  registrationId: z.string().min(1),
  status: z.literal("confirmed"),
});

const paymentRequiredResultSchema = z.object({
  outcome: z.literal("payment_required"),
  registrationId: z.string().min(1),
  paymentUrl: z.string().url(),
});

const alreadyRegisteredResultSchema = z.object({
  outcome: z.literal("already_registered"),
  registrationId: z.string().min(1).nullable(),
});

const unavailableResultSchema = z.object({
  outcome: z.literal("unavailable"),
  reason: z.enum(["full", "closed", "upcoming", "ineligible"]),
});

const staleResultSchema = z.object({
  outcome: z.literal("stale"),
  detailVersion: z.string().min(1),
});

const validationErrorResultSchema = z.object({
  outcome: z.literal("validation_error"),
  fields: z.record(z.string(), z.string()),
});

export const registrationActionResultSchema = z.discriminatedUnion("outcome", [
  confirmedResultSchema,
  paymentRequiredResultSchema,
  alreadyRegisteredResultSchema,
  unavailableResultSchema,
  staleResultSchema,
  validationErrorResultSchema,
]);

export type TournamentDetail = z.infer<typeof tournamentDetailSchema>;
export type TournamentRegistrationContext = z.infer<typeof tournamentRegistrationContextSchema>;
export type RegistrationRequest = z.infer<typeof registrationRequestSchema>;
export type RegistrationActionResult = z.infer<typeof registrationActionResultSchema>;
export type RegistrationAvailability = z.infer<typeof registrationAvailabilitySchema>;
