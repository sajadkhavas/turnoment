# F06 — Match Dispute Closeout

Status: `CLOSEOUT IN PROGRESS / TARGET FINAL_PRIVATE`

Route: `/matches/$id/dispute`

START_SHA: `0407a925974d50b4a75af292231bacb48c66eb38`

Implementation branch: `phase/f06-dispute`

Implementation final head: `d4579c811f87e415747a44ae1c213ba71cf86030`

Implementation PR: `#48` — MERGED

Implementation merge / closeout base: `e5e39ea2db0dadae3a9acb75c64dcf8ecb6dba4d`

Closeout branch: `closeout/f06-dispute`

Tracking Issue: `#47` — remains open through terminal main CI

Runtime: `FRONTEND MOCK / BACKEND PENDING`

## Implementation acceptance

Accepted code/browser head:
`1a1bf97da61ce9f4845c7ed78262519f54e1a3f3`

- Quality Gate `34410106647` — PASS;
- browser artifact `10126954058`;
- digest `sha256:385120df87ea2ea15cae7eccfa978aba0a8f083f82b8101b6138cdc232118bcd`;
- 42 regression screenshots;
- F06 widths 375/390/430/768/1024/1440;
- representative manual visual review after localized evidence picker correction: 375/768/1440 PASS.

Final governance/evidence implementation head:
`d4579c811f87e415747a44ae1c213ba71cf86030`

- exact-head push Quality Gate `34410842966` — PASS;
- PR #48 exact head remained `d4579c...`;
- PR-triggered Quality Gate `34411147988` — PASS;
- PR mergeable before merge: true;
- unresolved review threads before merge: 0;
- pre-merge main verified exact START_SHA;
- merge used expected-head SHA lock;
- implementation merge/main `e5e39ea2db0dadae3a9acb75c64dcf8ecb6dba4d`;
- post-implementation main Quality Gate `34411457787` — PASS, all steps.

## Final route truth being frozen

`/matches/$id/dispute` is a private `noindex,nofollow` current-player Match Dispute surface with:
- safe stable Match ID validation;
- private Session UX access policy and independent backend object authorization contract;
- typed runtime-validated MatchDisputeRepository;
- deterministic fixture and Django HTTP adapters using the same permanent contract;
- planned GET/read, POST/create and POST/evidence endpoints;
- Django Session credentials + P01 CSRF + `X-CSRFToken`;
- opaque revision/stale-state semantics;
- one Idempotency-Key per logical create/evidence attempt;
- authoritative states `eligible | open | under-review | resolved | unavailable`;
- explicit review-before-create;
- accessible reason/statement error handling;
- private evidence metadata and localized accessible evidence picker;
- backend-owned real upload validation/security boundary;
- authoritative resolution display only;
- no frontend moderation, score correction, winner/rating or lifecycle derivation;
- no invented dispute-withdrawal transition.

## Navigation reconciliation frozen with F06

Full regression coverage accepts:
- My Matches `attention=submit-result` → `/matches/$id/result`;
- My Matches `attention=dispute` → `/matches/$id/dispute`;
- F05 disputed state → `/matches/$id/dispute`;
- Check-in behavior unchanged;
- no `confirm-result` route invented.

This explicitly corrects the source-audit finding that the frozen pre-F06 My Matches code lacked the previously documented Result Submission CTA.

## Cross-repo backend alignment

Backend Issue #15: CLOSED / COMPLETED.

- backend documentation PR #16 — MERGED;
- docs head `c38052f2c9aaa79ad269e5445610f5f2a28c6845`;
- PR Quality Gate `34409560819` — PASS Python 3.12 / 3.14;
- review threads 0;
- merge/current backend main `38dccbf213d5f439e56cd608e3e4ac419d5092d1`;
- post-merge Quality Gate `34409893478` — PASS Python 3.12 / 3.14;
- Python/domain/models/migrations/phase-registry changes: NONE;
- backend NEXT remains `P02 — Games / Catalog Foundation`.

The backend alignment is documentation only. Disputes runtime is not claimed live.

## Closeout mutation lock

This closeout branch is documentation-only. Relative to implementation merge `e5e39ea2...`, allowed changes are only:
- `docs/workstreams/F06_CLOSEOUT.md`;
- `docs/workstreams/F06_DISPUTE.md` governance status/evidence reconciliation;
- `PROJECT_CONTINUITY.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`.

No application code, workflow, package, dependency, fixture, contract, adapter or runtime behavior may change in closeout.

## Non-recursive terminal evidence rule

The closeout commit cannot contain its own future merge SHA or future terminal main CI run. Therefore this document freezes all evidence knowable before closeout merge; the final closeout merge/frozen-main SHA and terminal post-closeout main Quality Gate are recorded in Issue #47 after they exist.

The route may be represented as `FINAL_PRIVATE` in the closeout registry because implementation is merged and post-implementation main QA is green. The workstream itself is not `DONE / MERGED / FROZEN` until Issue #47 records the terminal frozen-main evidence and closes completed.

## Remaining terminal gate

1. verify closeout diff is documentation-only;
2. open closeout PR without auto-closing Issue #47;
3. require closeout PR exact-head Frontend Quality Gate PASS;
4. require mergeable true and unresolved review threads 0;
5. verify main is still exact implementation merge `e5e39ea2db0dadae3a9acb75c64dcf8ecb6dba4d`;
6. merge closeout with expected-head lock;
7. require terminal post-closeout main Quality Gate PASS on final frozen main SHA;
8. verify live main equals that frozen SHA;
9. record terminal SHA/CI in Issue #47;
10. close Issue #47 completed as `DONE / MERGED / FROZEN — FINAL_PRIVATE`.
