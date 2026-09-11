# F15 CLOSEOUT — Player Challenge Hub

Status: `CLOSEOUT IN PROGRESS — NON-RECURSIVE`

Tracking Issue: `#77`

Route: `/dashboard/challenges`

Route registry target: `FINAL_PRIVATE`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 1. Exact implementation truth before closeout

- F15 START_SHA: `398e963f1ecdbe86013ce3b0052c4e1891f48854`
- final reviewed implementation head: `e9110fc6e01220e17e728dc0e491fff1a0b979c0`
- implementation PR: `#79`
- exact-head Quality Gate: `34584422266` — PASS
- exact-head artifact: `10193125417`
- exact-head digest: `sha256:c6a547e94003645daccf0acc3dec19181834fe9f46198b9039317b3d6f025e99`
- PR-context Quality Gate: `34585124291` — PASS
- PR-context artifact: `10193400756`
- PR-context digest: `sha256:9e4fc717f2ad00ad7581acf6215db8ec524772d520f4e4030e90ac7a2075976a`
- implementation merge: `5db25c291a250a94676e143ba11642c86b2f8152`
- post-implementation main Quality Gate: `34585660833` — PASS
- post-main artifact: `10193629332`
- post-main digest: `sha256:e29f1e77ee9347fc917df4ee4d594f5d9f9896438183ee44edf5391b51da8821`
- browser regression: 96 PNGs
- manual responsive acceptance at 375 / 390 / 430 / 768 / 1024 / 1440: PASS
- unresolved implementation PR review threads before merge: 0
- implementation merge used expected-head lock
- exact live main reverified at implementation merge before closeout branch creation

## 2. Accepted route truth

`/dashboard/challenges` is implementation-accepted as the private current-player Challenge Hub and may be promoted non-recursively to `FINAL_PRIVATE` because implementation merge and required post-main QA are green.

Permanent architecture:

`private dashboard access policy → validated status/page search → loader → typed ChallengeHubRepository → runtime-validated Challenge projection/commands → authoritative reload → UI`

Backend/repository remains authoritative for Challenge unlock/access, Challenge Rating, list membership/scope, stable Challenge identity, opaque revision, lifecycle/direction/status, allowed commands, creation options/policy, opponent eligibility, Match/result/rating projection, typed navigation targets, summary/pagination and mutation authorization/outcomes.

Frontend does not optimistically own Challenge lifecycle/result/rating/eligibility and reloads authoritative route truth after mutation outcomes.

Create/respond/cancel use idempotency; respond/cancel use opaque revision and stale handling. Unsafe calls use the accepted P01 Django Session + CSRF contract. No local bearer auth exists.

Tournament Rating and Challenge Rating stay separate. Challenge unlock remains 30 finalized valid Matches, not wins. No wager/betting/stake mechanics exist. No Challenge Detail route is introduced.

Private `noindex,nofollow` remains accepted. Runtime integration remains `FRONTEND MOCK / BACKEND PENDING` until an owning backend Challenge phase implements the planned APIs under backend phase protocol.

## 3. Backend contract alignment truth

Backend F15 documentation alignment is terminally closed:
- backend Issue `#27` completed;
- backend PR `#28` merged;
- accepted backend main `c72ec545782a25719009ae329d74ffd13259d020`;
- PR Backend Quality Gate `34583290252` PASS on Python 3.12/3.14;
- post-main Backend Quality Gate `34584360023` PASS;
- planned Challenge API family recorded;
- no Challenge runtime Python implementation exists;
- Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 4. Exact closeout mutation boundary

Closeout base:

`5db25c291a250a94676e143ba11642c86b2f8152`

Closeout branch:

`closeout/f15-player-challenge-hub`

This closeout is documentation-only. Its diff must contain exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`
3. `docs/workstreams/F15_PLAYER_CHALLENGE_HUB.md`
4. `docs/workstreams/F15_CLOSEOUT.md`

Forbidden in this closeout:
- application/runtime source changes;
- `.github/workflows` changes;
- `package.json` or lockfile/dependency changes;
- contract/repository/adapter/fixture/test changes;
- other route changes;
- backend changes.

## 5. Non-recursive completion law

This document intentionally does not and cannot self-record:
- its own eventual closeout commit SHA as terminal truth before commit;
- the future closeout merge SHA;
- the future terminal frozen-main Quality Gate run/artifact/digest.

Those facts occur after this content is committed/merged and therefore belong in tracking Issue #77, which becomes authoritative terminal evidence.

Until terminal frozen-main QA is green and Issue #77 closes `completed`, F15 status remains:

`MERGED / CLOSEOUT IN PROGRESS`

## 6. Required remaining gates

1. closeout compare proves one commit ahead / zero behind and exactly four Markdown files;
2. closeout PR full Frontend Quality Gate passes;
3. closeout PR is mergeable and unresolved review threads are zero;
4. pre-merge frontend `main` remains exact closeout base `5db25c291a250a94676e143ba11642c86b2f8152`;
5. closeout merges with expected-head lock;
6. terminal frozen-main Frontend Quality Gate passes;
7. terminal artifact/digest belongs to the exact frozen main SHA;
8. live `main` is reverified exact frozen SHA;
9. Issue #77 records terminal evidence and closes `completed`.

Only after all nine gates may the workstream be reported as:

`F15 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.
