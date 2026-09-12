import assert from "node:assert/strict";
import {
  parsePublicPlayerUsername,
  publicPlayerCompetitiveSnapshotSchema,
  publicPlayerProfileSchema,
} from "./public-player-profile-contract";
import { MockPublicPlayerProfileRepository } from "./public-player-profile-fixture";
import { getPlayerRankingFixture } from "./player-ranking-fixture";

assert.equal(parsePublicPlayerUsername("sajjadx"), "sajjadx");
assert.equal(parsePublicPlayerUsername("player_01"), "player_01");
assert.equal(parsePublicPlayerUsername("SajjadX"), null);
assert.equal(parsePublicPlayerUsername("../sajjadx"), null);
assert.equal(parsePublicPlayerUsername(""), null);

const repository = new MockPublicPlayerProfileRepository();
const sajjad = await repository.getByUsername("sajjadx");
assert.equal(sajjad.state, "published");
assert.ok(sajjad.state === "published");
assert.equal(sajjad.profile.schemaVersion, 1);
assert.equal(sajjad.profile.publicationState, "published");
assert.equal(sajjad.profile.searchVisibility, "indexable");
assert.equal(sajjad.profile.playerId, "player-sajjadx");
assert.equal(sajjad.profile.username, "sajjadx");
assert.equal(publicPlayerProfileSchema.safeParse(sajjad.profile).success, true);
assert.deepEqual(await repository.getByUsername("unknown-player"), { state: "not_found" });
assert.deepEqual(await repository.getByUsername("SajjadX"), { state: "not_found" });

const armin = await repository.getByUsername("arminfc");
assert.ok(armin.state === "published");
assert.equal(armin.profile.searchVisibility, "noindex");
assert.equal(armin.profile.recentResults.length, 0);

const ranking = getPlayerRankingFixture({ game: "ea-fc-26", type: "tournament", page: 1 });
const rankingSajjad = ranking.items.find((player) => player.username === "sajjadx");
assert.ok(rankingSajjad);
assert.equal(rankingSajjad?.playerId, sajjad.profile.playerId);
assert.equal(rankingSajjad?.gamerTag, sajjad.profile.gamerTag);

const firstSnapshot = structuredClone(sajjad.profile.competitiveSnapshots[0]);
assert.equal(publicPlayerCompetitiveSnapshotSchema.safeParse(firstSnapshot).success, true);

const badRecord = structuredClone(firstSnapshot);
badRecord.wins += 1;
assert.equal(publicPlayerCompetitiveSnapshotSchema.safeParse(badRecord).success, false);

const badMovement = structuredClone(firstSnapshot);
badMovement.movement = { direction: "flat", positions: 2 };
assert.equal(publicPlayerCompetitiveSnapshotSchema.safeParse(badMovement).success, false);

const duplicateSnapshot = structuredClone(sajjad.profile);
duplicateSnapshot.competitiveSnapshots.push(structuredClone(duplicateSnapshot.competitiveSnapshots[0]));
assert.equal(publicPlayerProfileSchema.safeParse(duplicateSnapshot).success, false);

const duplicateScope = structuredClone(sajjad.profile);
duplicateScope.competitiveSnapshots[1].snapshotId = "snapshot-unique-but-same-scope";
duplicateScope.competitiveSnapshots[1].ratingType = duplicateScope.competitiveSnapshots[0].ratingType;
assert.equal(publicPlayerProfileSchema.safeParse(duplicateScope).success, false);

const duplicateResult = structuredClone(sajjad.profile);
duplicateResult.recentResults.push(structuredClone(duplicateResult.recentResults[0]));
assert.equal(publicPlayerProfileSchema.safeParse(duplicateResult).success, false);

const privatePhoneLeak = { ...sajjad.profile, phone: "+989121234567" };
assert.equal(publicPlayerProfileSchema.safeParse(privatePhoneLeak).success, false);

const privateEmailLeak = { ...sajjad.profile, email: "player@example.com" };
assert.equal(publicPlayerProfileSchema.safeParse(privateEmailLeak).success, false);

const privateSettingLeak = { ...sajjad.profile, interview_opt_in: true };
assert.equal(publicPlayerProfileSchema.safeParse(privateSettingLeak).success, false);

const unpublished = { ...sajjad.profile, publicationState: "private" };
assert.equal(publicPlayerProfileSchema.safeParse(unpublished).success, false);

const malformedAvatar = { ...sajjad.profile, avatarUrl: "javascript:alert(1)" };
assert.equal(publicPlayerProfileSchema.safeParse(malformedAvatar).success, false);

console.log("public-player-profile contract checks passed");
