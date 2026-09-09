import { MockResultSubmissionRepository } from "./result-submission-data";
import {
  resultSubmissionPageSchema,
  submitResultActionSchema,
  validateScoreDraft,
} from "./result-submission-contract";
import { parseSubmitResultActionForMatch } from "./result-submission-http-repository";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertThrows(run: () => unknown, message: string) {
  let threw = false;
  try {
    run();
  } catch {
    threw = true;
  }
  assert(threw, message);
}

const repository = new MockResultSubmissionRepository();

const reportable = await repository.getResultSubmission("m-204");
assert(reportable, "F05 reportable browser fixture must exist.");
assert(
  resultSubmissionPageSchema.parse(reportable).submissionState === "reportable",
  "F05 browser fixture must remain reportable.",
);

const accepted = submitResultActionSchema.parse(
  await repository.submitResult("m-204", {
    revision: reportable.revision,
    playerScore: 3,
    opponentScore: 1,
    idempotencyKey: "test-result-submit-0001",
  }),
);
assert(accepted.outcome === "accepted", "Valid report must produce accepted outcome.");
assert(accepted.status === "awaiting-confirmation", "Mock accepted report must await confirmation.");
assert(accepted.finalResult === null, "Frontend must not manufacture a final result after reporting.");

assertThrows(
  () =>
    parseSubmitResultActionForMatch("m-204", {
      outcome: "accepted",
      receiptId: "receipt-wrong-match",
      matchId: "m-999",
      status: "awaiting-confirmation",
      reportedScore: { playerScore: 3, opponentScore: 1, reportedAt: "2026-09-09T20:00:00+03:30" },
      finalResult: null,
    }),
  "Accepted receipt must be rejected when match identity differs from the requested Match.",
);

const stale = await repository.submitResult("m-204", {
  revision: "old-revision",
  playerScore: 2,
  opponentScore: 1,
  idempotencyKey: "test-result-submit-0002",
});
assert(stale.outcome === "stale", "Stale revision must produce stale outcome.");

assert(
  Boolean(validateScoreDraft(reportable, 2, 2).form),
  "Equal scores must be rejected when authoritative policy disallows a draw.",
);
assert(
  Boolean(validateScoreDraft(reportable, 31, 1).playerScore),
  "Score above authoritative maximum must be rejected.",
);

assertThrows(
  () =>
    resultSubmissionPageSchema.parse({
      ...reportable,
      reportedScore: { playerScore: 1, opponentScore: 0, reportedAt: "2026-09-09T20:00:00+03:30" },
    }),
  "Reportable projection must reject an existing reported score.",
);

const awaiting = await repository.getResultSubmission("m-205");
assert(awaiting, "Awaiting-confirmation fixture must exist.");
assertThrows(
  () => resultSubmissionPageSchema.parse({ ...awaiting, reportedScore: null }),
  "Awaiting-confirmation projection requires reported score.",
);

const finalized = await repository.getResultSubmission("m-207");
assert(finalized, "Finalized fixture must exist.");
assertThrows(
  () => resultSubmissionPageSchema.parse({ ...finalized, finalResult: null }),
  "Finalized projection requires authoritative final result.",
);

assertThrows(
  () =>
    submitResultActionSchema.parse({
      outcome: "accepted",
      receiptId: "receipt-1",
      matchId: "m-204",
      status: "finalized",
      reportedScore: { playerScore: 2, opponentScore: 0, reportedAt: "2026-09-09T20:00:00+03:30" },
      finalResult: null,
    }),
  "Finalized accepted receipt must include final result.",
);

const existing = await repository.submitResult("m-205", {
  revision: awaiting.revision,
  playerScore: 3,
  opponentScore: 1,
  idempotencyKey: "test-result-submit-0003",
});
assert(existing.outcome === "already_submitted", "Existing report must not be submitted twice.");

console.log("F05 Result Submission contract checks passed.");
