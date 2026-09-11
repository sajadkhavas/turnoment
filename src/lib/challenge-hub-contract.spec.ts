import assert from "node:assert/strict";
import {
  challengeHubPageSchema,
  challengeItemSchema,
  validateCreateChallengeDraft,
} from "./challenge-hub-contract";
import { MockChallengeHubRepository } from "./challenge-hub-data";

const repository = new MockChallengeHubRepository();

const initial = await repository.getChallengeHub({ status: "all", page: 1 });
assert.equal(initial.state, "authenticated");
if (initial.state !== "authenticated") throw new Error("Expected authenticated Challenge Hub fixture.");

assert.equal(initial.data.access.requiredFinalizedMatches, 30);
assert.equal(initial.data.access.unlocked, true);
assert.equal(initial.data.access.canCreate, true);
assert.equal(initial.data.pagination.currentPage, 1);
assert.ok(initial.data.items.length > 0);
assert.ok(initial.data.items.every((item) => !item.allowedCommands.includes("view" as never)));
assert.ok(initial.data.items.every((item) => item.revision.length > 0));

const incoming = await repository.getChallengeHub({ status: "incoming", page: 1 });
assert.equal(incoming.state, "authenticated");
if (incoming.state !== "authenticated") throw new Error("Expected incoming projection.");
const incomingPending = incoming.data.items.find((item) => item.lifecycle === "invitation-pending");
assert.ok(incomingPending);
assert.deepEqual(incomingPending.allowedCommands, ["accept", "decline"]);

const invalidOutgoingAccept = challengeItemSchema.safeParse({
  ...incomingPending,
  direction: "outgoing",
});
assert.equal(invalidOutgoingAccept.success, false);

const completed = initial.data.items.find((item) => item.lifecycle === "completed");
if (completed) {
  assert.equal(challengeItemSchema.safeParse({ ...completed, result: null }).success, false);
}

const navItem = initial.data.items.find((item) => item.navigationTarget?.kind === "result-submission");
if (navItem && navItem.navigationTarget?.kind === "result-submission") {
  assert.equal(
    challengeItemSchema.safeParse({
      ...navItem,
      navigationTarget: { kind: "result-submission", matchId: "m-different" },
    }).success,
    false,
  );
}

const duplicatePage = structuredClone(initial.data);
duplicatePage.items = [duplicatePage.items[0], duplicatePage.items[0]];
duplicatePage.pagination.totalItems = Math.max(2, duplicatePage.pagination.totalItems);
assert.equal(challengeHubPageSchema.safeParse(duplicatePage).success, false);

const impossibleUnlock = structuredClone(initial.data);
impossibleUnlock.access = {
  unlocked: false,
  canCreate: true,
  challengeRating: null,
  finalizedValidMatches: 10,
  requiredFinalizedMatches: 30,
};
assert.equal(challengeHubPageSchema.safeParse(impossibleUnlock).success, false);

const createErrors = validateCreateChallengeDraft(initial.data, {
  opponentPlayerId: "",
  gameId: "missing",
  formatId: "missing",
  note: "x".repeat(initial.data.creation.noteMaxLength + 1),
});
assert.ok(createErrors.opponent);
assert.ok(createErrors.game);
assert.ok(createErrors.format);
assert.ok(createErrors.note);

const shortSearch = await repository.searchOpponents({ query: "a", gameId: "ea-fc-26" });
assert.equal(shortSearch.outcome, "validation_error");

const search = await repository.searchOpponents({ query: "amir", gameId: "ea-fc-26" });
assert.equal(search.outcome, "results");
if (search.outcome !== "results") throw new Error("Expected opponent search results.");
const opponent = search.items.find((item) => item.playerId === "p-112");
assert.ok(opponent);

const createCommand = {
  opponentPlayerId: "p-112",
  gameId: "ea-fc-26",
  formatId: "bo3",
  note: "یک Match مستقیم؟",
  idempotencyKey: "idem-create-f15-0001",
};
const created = await repository.createChallenge(createCommand);
assert.equal(created.outcome, "accepted");
if (created.outcome !== "accepted") throw new Error("Expected Challenge creation acceptance.");
const repeatedCreate = await repository.createChallenge(createCommand);
assert.deepEqual(repeatedCreate, created);

const outgoingAfterCreate = await repository.getChallengeHub({ status: "outgoing", page: 1 });
assert.equal(outgoingAfterCreate.state, "authenticated");
if (outgoingAfterCreate.state !== "authenticated") throw new Error("Expected outgoing projection.");
assert.ok(outgoingAfterCreate.data.items.some((item) => item.challengeId === created.challengeId));

const stale = await repository.respondToChallenge(incomingPending.challengeId, {
  revision: "stale-revision",
  action: "accept",
  idempotencyKey: "idem-stale-f15-0001",
});
assert.equal(stale.outcome, "stale");

const accepted = await repository.respondToChallenge(incomingPending.challengeId, {
  revision: incomingPending.revision,
  action: "accept",
  idempotencyKey: "idem-accept-f15-0001",
});
assert.equal(accepted.outcome, "accepted");

const acceptedAgain = await repository.respondToChallenge(incomingPending.challengeId, {
  revision: incomingPending.revision,
  action: "accept",
  idempotencyKey: "idem-accept-f15-0001",
});
assert.deepEqual(acceptedAgain, accepted);

const outgoingPending = outgoingAfterCreate.data.items.find((item) => item.challengeId === created.challengeId);
assert.ok(outgoingPending);
const cancelled = await repository.cancelChallenge(created.challengeId, {
  revision: outgoingPending.revision,
  idempotencyKey: "idem-cancel-f15-0001",
});
assert.equal(cancelled.outcome, "accepted");

const finalProjection = await repository.getChallengeHub({ status: "completed", page: 1 });
assert.equal(finalProjection.state, "authenticated");
if (finalProjection.state === "authenticated") {
  assert.ok(finalProjection.data.items.some((item) => item.challengeId === created.challengeId && item.lifecycle === "cancelled"));
}

console.log("challenge-hub contract checks passed");
