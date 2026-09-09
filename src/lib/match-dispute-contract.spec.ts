import { MockMatchDisputeRepository } from "./match-dispute-data";
import {
  matchDisputePageSchema,
  validateDisputeDraft,
  validateEvidenceFile,
} from "./match-dispute-contract";
import { parseCreateDisputeActionForMatch, parseEvidenceActionForIdentity } from "./match-dispute-http-repository";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
function assertThrows(run: () => unknown, message: string) {
  let threw = false;
  try { run(); } catch { threw = true; }
  assert(threw, message);
}

const repository = new MockMatchDisputeRepository();
const eligible = await repository.getDispute("m-205");
assert(eligible, "F06 eligible fixture must exist.");
assert(matchDisputePageSchema.parse(eligible).disputeState === "eligible", "F06 eligible fixture must remain eligible.");
assert(Boolean(validateDisputeDraft(eligible, "", "short").reason), "Missing reason must be rejected.");
assert(Boolean(validateDisputeDraft(eligible, "incorrect-score", "short").statement), "Short statement must be rejected.");

const created = await repository.createDispute("m-205", {
  revision: eligible.revision,
  reason: "incorrect-score",
  statement: "امتیاز ثبت‌شده با نتیجه پایان بازی مطابقت ندارد و نیاز به بررسی دارد.",
  idempotencyKey: "test-dispute-create-0001",
});
assert(created.outcome === "accepted", "Valid eligible dispute must be accepted by fixture adapter.");
if (created.outcome === "accepted") {
  assert(created.dispute.status === "open", "New dispute must use backend-returned open state.");
}

const stale = await repository.createDispute("m-205", {
  revision: "old-revision",
  reason: "incorrect-score",
  statement: "امتیاز ثبت‌شده با نتیجه پایان بازی مطابقت ندارد و نیاز به بررسی دارد.",
  idempotencyKey: "test-dispute-create-0002",
});
assert(stale.outcome === "stale", "Stale dispute revision must be rejected.");

const active = await repository.getDispute("m-206");
assert(active?.dispute, "F06 active dispute fixture must exist.");
assert(active.disputeState === "under-review", "Browser dispute fixture must remain under-review.");

const png = new File([new Uint8Array(1024)], "proof.png", { type: "image/png" });
assert(validateEvidenceFile(active, png) === null, "Allowed image hint should pass client convenience validation.");
const text = new File(["not-an-image"], "proof.txt", { type: "text/plain" });
assert(Boolean(validateEvidenceFile(active, text)), "Disallowed MIME hint should fail client convenience validation.");

const uploaded = await repository.uploadEvidence("m-206", active.dispute.disputeId, {
  revision: active.revision,
  file: png,
  idempotencyKey: "test-dispute-evidence-0001",
});
assert(uploaded.outcome === "accepted", "Allowed evidence fixture upload must return accepted receipt.");

assertThrows(
  () => parseCreateDisputeActionForMatch("m-205", {
    outcome: "accepted",
    matchId: "m-999",
    revision: "r2",
    dispute: {
      disputeId: "dsp-x", status: "open", reason: "other", statement: "A sufficiently long dispute statement.",
      createdAt: "2026-09-10T01:00:00+03:30", canAddEvidence: true, evidence: [], resolution: null,
    },
  }),
  "Dispute create receipt with wrong Match identity must be rejected.",
);

assertThrows(
  () => parseEvidenceActionForIdentity("m-206", "dsp-206", {
    outcome: "accepted", matchId: "m-206", disputeId: "dsp-wrong", revision: "r3",
    evidence: { evidenceId: "ev-x", fileName: "proof.png", contentType: "image/png", sizeBytes: 100, uploadedAt: "2026-09-10T01:00:00+03:30" },
  }),
  "Evidence receipt with wrong dispute identity must be rejected.",
);

assertThrows(
  () => matchDisputePageSchema.parse({ ...active, disputeState: "resolved" }),
  "Resolved page without resolved dispute state/resolution must be rejected.",
);
assertThrows(
  () => matchDisputePageSchema.parse({ ...active, dispute: { ...active.dispute!, status: "under-review", resolution: { decision: "rejected", summary: "x", resolvedAt: "2026-09-10T01:00:00+03:30" } } }),
  "Non-resolved dispute must not expose resolution.",
);
assertThrows(
  () => matchDisputePageSchema.parse({ ...active, policy: { ...active.policy, evidence: { ...active.policy.evidence, enabled: false } } }),
  "Disabled evidence policy must reject existing evidence/canAddEvidence truth.",
);

console.log("F06 Match Dispute contract checks passed.");
