import { describe, expect, it } from "bun:test";
import { MockResultSubmissionRepository } from "./result-submission-data";
import {
  resultSubmissionPageSchema,
  submitResultActionSchema,
  validateScoreDraft,
} from "./result-submission-contract";

const repository = new MockResultSubmissionRepository();

describe("F05 Result Submission contract", () => {
  it("serves a reportable authoritative projection for the accepted browser fixture", async () => {
    const page = await repository.getResultSubmission("m-204");
    expect(page).not.toBeNull();
    expect(resultSubmissionPageSchema.parse(page!).submissionState).toBe("reportable");
  });

  it("accepts a valid result without inferring final outcome", async () => {
    const page = await repository.getResultSubmission("m-204");
    const result = await repository.submitResult("m-204", {
      revision: page!.revision,
      playerScore: 3,
      opponentScore: 1,
      idempotencyKey: "test-result-submit-0001",
    });
    const parsed = submitResultActionSchema.parse(result);
    expect(parsed.outcome).toBe("accepted");
    if (parsed.outcome === "accepted") {
      expect(parsed.status).toBe("awaiting-confirmation");
      expect(parsed.finalResult).toBeNull();
    }
  });

  it("rejects stale revision through an authoritative stale outcome", async () => {
    const result = await repository.submitResult("m-204", {
      revision: "old-revision",
      playerScore: 2,
      opponentScore: 1,
      idempotencyKey: "test-result-submit-0002",
    });
    expect(result.outcome).toBe("stale");
  });

  it("rejects a draw when the authoritative score policy forbids it", async () => {
    const page = await repository.getResultSubmission("m-204");
    expect(validateScoreDraft(page!, 2, 2).form).toBeDefined();
  });

  it("rejects score above authoritative maximum", async () => {
    const page = await repository.getResultSubmission("m-204");
    expect(validateScoreDraft(page!, 31, 1).playerScore).toBeDefined();
  });

  it("rejects reportable projection with an existing reported score", async () => {
    const page = await repository.getResultSubmission("m-204");
    expect(() =>
      resultSubmissionPageSchema.parse({
        ...page!,
        reportedScore: { playerScore: 1, opponentScore: 0, reportedAt: "2026-09-09T20:00:00+03:30" },
      }),
    ).toThrow();
  });

  it("rejects awaiting-confirmation projection without reported score", async () => {
    const page = await repository.getResultSubmission("m-205");
    expect(() => resultSubmissionPageSchema.parse({ ...page!, reportedScore: null })).toThrow();
  });

  it("rejects finalized projection without final result", async () => {
    const page = await repository.getResultSubmission("m-207");
    expect(() => resultSubmissionPageSchema.parse({ ...page!, finalResult: null })).toThrow();
  });

  it("rejects finalized action receipt without finalized result", () => {
    expect(() =>
      submitResultActionSchema.parse({
        outcome: "accepted",
        receiptId: "receipt-1",
        matchId: "m-204",
        status: "finalized",
        reportedScore: { playerScore: 2, opponentScore: 0, reportedAt: "2026-09-09T20:00:00+03:30" },
        finalResult: null,
      }),
    ).toThrow();
  });

  it("returns existing report instead of allowing duplicate submit", async () => {
    const page = await repository.getResultSubmission("m-205");
    const result = await repository.submitResult("m-205", {
      revision: page!.revision,
      playerScore: 3,
      opponentScore: 1,
      idempotencyKey: "test-result-submit-0003",
    });
    expect(result.outcome).toBe("already_submitted");
  });
});
