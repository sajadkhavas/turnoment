import assert from "node:assert/strict";
import {
  registrationActionResultSchema,
  registrationRequestSchema,
  tournamentDetailSchema,
} from "./tournament-detail-contract";
import {
  canonicalTournamentSlug,
  FixtureTournamentDetailRepository,
} from "./tournament-detail-fixture";

const repository = new FixtureTournamentDetailRepository();
const session = {
  state: "authenticated" as const,
  playerId: "p-001",
  username: "SajadX",
};

const detail = await repository.getByIdentifier("t1");
assert(detail, "fixture tournament t1 must exist");
assert.equal(detail.slug, "fc26-karaj-champions-cup");
assert.equal(canonicalTournamentSlug("t1"), "fc26-karaj-champions-cup");
assert.equal(canonicalTournamentSlug(detail.slug), detail.slug);
assert.equal(detail.entryFee.currency, "IRR");
assert.equal(detail.entryFee.amount, 1_500_000);
assert.equal(detail.capacity.remaining, detail.capacity.limit - detail.capacity.registered);

const inconsistentCapacity = tournamentDetailSchema.safeParse({
  ...detail,
  capacity: { ...detail.capacity, remaining: detail.capacity.remaining + 1 },
});
assert.equal(inconsistentCapacity.success, false, "inconsistent capacity totals must be rejected");

const negativeMoney = tournamentDetailSchema.safeParse({
  ...detail,
  entryFee: { amount: -1, currency: "IRR" },
});
assert.equal(negativeMoney.success, false, "negative money must be rejected");

assert.equal(
  registrationRequestSchema.safeParse({
    detailVersion: detail.detailVersion,
    rulesVersion: detail.ruleset.version,
    acceptedRules: false,
    teamId: null,
  }).success,
  false,
  "registration must require explicit rules acceptance",
);

const openContext = await repository.getRegistrationContext(detail.slug, session);
assert(openContext, "open registration context must exist");
assert.equal(openContext.availability, "available");

const confirmed = await repository.register(detail.slug, {
  detailVersion: openContext.detailVersion,
  rulesVersion: openContext.rules.version,
  acceptedRules: true,
  teamId: null,
});
assert.equal(confirmed.outcome, "confirmed");

const stale = await repository.register(detail.slug, {
  detailVersion: "old-version",
  rulesVersion: openContext.rules.version,
  acceptedRules: true,
  teamId: null,
});
assert.equal(stale.outcome, "stale");

const teamContext = await repository.getRegistrationContext("karaj-cs2-arena-cup", session);
assert(teamContext, "team registration context must exist");
assert.equal(teamContext.mode, "team");
const missingTeam = await repository.register("karaj-cs2-arena-cup", {
  detailVersion: teamContext.detailVersion,
  rulesVersion: teamContext.rules.version,
  acceptedRules: true,
  teamId: null,
});
assert.equal(missingTeam.outcome, "validation_error");

const fullContext = await repository.getRegistrationContext("mortal-kombat-clash", session);
assert(fullContext, "full registration context must exist");
assert.equal(fullContext.availability, "full");

const upcomingContext = await repository.getRegistrationContext("mk-karaj-masters", session);
assert(upcomingContext, "upcoming registration context must exist");
assert.equal(upcomingContext.availability, "upcoming");

assert.equal(
  registrationActionResultSchema.safeParse({
    outcome: "payment_required",
    registrationId: "registration-1",
    paymentUrl: "https://pay.example.com/session/1",
  }).success,
  true,
  "payment handoff outcome must be supported by the final action contract",
);

console.log("Tournament detail and registration contract checks passed.");
