import { MockChallengeHubRepository } from "./challenge-hub-data";
import { challengeHubPageSchema } from "./challenge-hub-http-repository";

const repository = new MockChallengeHubRepository();
const firstPage = await repository.getChallengeHub({ status: "all", page: 1 });

if (!challengeHubPageSchema.safeParse(firstPage).success) throw new Error("Challenge Hub fixture violates its runtime contract.");
if (firstPage.access.challengeRating === null || firstPage.access.finalizedValidMatches !== 42) throw new Error("Challenge access fixture drifted.");
if (firstPage.items.some((item) => item.direction === "outgoing" && item.allowedActions.includes("accept"))) throw new Error("Outgoing invitation exposed an accept action.");

const actionRequired = await repository.getChallengeHub({ status: "action-required", page: 1 });
if (actionRequired.items.length === 0 || actionRequired.items.some((item) => item.actionRequiredLabel === null)) throw new Error("Action filter returned unrelated challenges.");

const completed = await repository.getChallengeHub({ status: "completed", page: 1 });
if (completed.items.some((item) => item.lifecycle === "completed" && item.result === null)) throw new Error("Completed challenge omitted authoritative result.");

const invalid = { ...firstPage, items: [{ ...completed.items[0], result: null }, ...firstPage.items.slice(1)] };
if (challengeHubPageSchema.safeParse(invalid).success) throw new Error("Runtime contract accepted a completed challenge without result.");

console.log("Challenge Hub runtime contract checks passed.");