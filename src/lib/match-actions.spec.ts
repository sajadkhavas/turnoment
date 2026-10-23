import assert from "node:assert/strict";
import { ApiMatchActionsRepository, confirmResultActionSchema, parseLifecycleAction } from "./match-actions-repository";
const command = { command: "start" as const, revision: "2" };
const valid = { outcome: "accepted", matchId: "m1", state: "live", revision: "3" };
assert.equal(parseLifecycleAction("m1", command, valid).outcome, "accepted");
for (const bad of [{ ...valid, matchId: "m2" }, { ...valid, state: "awaiting-result" }, { ...valid, revision: "" }]) {
  assert.throws(() => parseLifecycleAction("m1", command, bad));
}
assert.throws(() => confirmResultActionSchema.parse({ outcome: "finalized", eventId: "not-an-event" }));
assert.throws(() => confirmResultActionSchema.parse({ outcome: "stale" }));
assert.equal(confirmResultActionSchema.parse({ outcome: "unavailable" }).outcome, "unavailable");
const calls: Array<{ url: string; init?: RequestInit }> = [];
const reply = { outcome: "finalized", eventId: "183bc110-4557-4444-a1a8-5699fc16281c", revision: "3" };
const request: typeof fetch = async (input, init) => {
  calls.push({ url: String(input), init });
  return Response.json(calls.length === 1 ? { csrf_token: "csrf-proof" } : reply);
};
const repository = new ApiMatchActionsRepository(() => "https://api.example.test/", request);
await repository.confirmResult("m/1", { revision: "2", playerScore: 1, opponentScore: 3 });
assert.equal(calls.length, 2);
assert.equal(calls[1].url, "https://api.example.test/api/v1/matches/m%2F1/result/confirm/");
assert.equal(calls[1].init?.credentials, "include");
assert.equal(new Headers(calls[1].init?.headers).get("X-CSRFToken"), "csrf-proof");
assert.deepEqual(JSON.parse(String(calls[1].init?.body)), { revision: "2", playerScore: 1, opponentScore: 3 });
await assert.rejects(() => repository.confirmResult("m1", { revision: "2", playerScore: -1, opponentScore: 3 }));
assert.equal(calls.length, 2, "Invalid commands must never make a request");
let failedCalls = 0;
const denied = new ApiMatchActionsRepository(() => "https://api.example.test/", async () => {
  failedCalls++; return new Response(null, { status: 403 });
});
await assert.rejects(() => denied.changeLifecycle("m1", command));
assert.equal(failedCalls, 1, "CSRF denial must prevent mutation");
const notAcknowledged = new ApiMatchActionsRepository(() => "https://api.example.test/", async (input) => {
  return String(input).includes("csrf") ? Response.json({ csrf_token: "proof" }) : Response.json(reply, { status: 403 });
});
await assert.rejects(() => notAcknowledged.confirmResult("m1", { revision: "2", playerScore: 1, opponentScore: 3 }));
console.log("Match action validation, identity, CSRF and failure checks passed.");
