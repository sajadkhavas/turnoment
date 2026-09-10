# F07 — Final OTP Login Closeout

Status: `CLOSEOUT IN PROGRESS / TARGET FINAL_PRIVATE`

Route: `/login`

START_SHA: `64c760af73f6cb30b02e0ac9464ccbdeb18922e5`

Implementation branch: `phase/f07-final-otp-login`

Implementation final head: `5e37a7349c0f1408d9f55682d5aeca7f7318cbc8`

Implementation PR: `#51` — MERGED

Implementation merge / closeout base: `c522e9593c1628097ee20e2de8ba14f97c0a5334`

Closeout branch: `closeout/f07-final-otp-login`

Tracking Issue: `#50` — remains open through terminal main CI

## Implementation acceptance

Accepted browser/code candidate:

`0f27c9e55bcc8f96664da4910e0d74a004156295`

- candidate Quality Gate `34450606193` — PASS;
- browser artifact `10141454114`;
- digest `sha256:36550b87f438c41570757b73e79c83e31b9465bc8a9eabe9950bf0f6478cb4a7`;
- 48 regression screenshots;
- F07 widths `375 / 390 / 430 / 768 / 1024 / 1440`;
- manual review `375 / 430 / 768 / 1024 / 1440` — PASS.

Final implementation/evidence head:

`5e37a7349c0f1408d9f55682d5aeca7f7318cbc8`

- exact-head push Quality Gate `34451450368` — PASS;
- PR #51 exact base `64c760af73f6cb30b02e0ac9464ccbdeb18922e5`;
- PR #51 exact head `5e37a7349c0f1408d9f55682d5aeca7f7318cbc8`;
- PR Quality Gate `34451772869` — PASS;
- mergeable immediately before merge: true;
- unresolved review threads immediately before merge: 0;
- pre-merge main verified exact START_SHA;
- merge used expected-head lock;
- implementation merge/main `c522e9593c1628097ee20e2de8ba14f97c0a5334`;
- post-implementation main Quality Gate `34452092176` — PASS, all frontend regression steps.

## Final route truth being frozen

`/login` is a private `noindex,nofollow` OTP authentication surface with:
- phone OTP only;
- Iran mobile normalization and Persian/Arabic digit convenience;
- accessible phone and OTP input purposes;
- optional validated internal redirect search;
- SSR loader projection;
- typed runtime-validated `LoginAuthRepository`;
- test-only deterministic QA adapter and production Django adapter sharing the same contract;
- existing backend P01 auth endpoints;
- Django Session authority;
- CSRF bootstrap + `credentials: include` + `X-CSRFToken` on unsafe OTP writes;
- no bearer token in localStorage/sessionStorage;
- authoritative challenge/resend/expiry/auth/error states;
- ambiguous verify recovery through authoritative `/auth/me/`;
- safe return-to validation with fail-closed `/dashboard` fallback;
- final Persian copy, responsive behavior and one main landmark;
- no password/reset/remember-me affordance.

## Runtime truth

F07 differs from F05/F06 pending-domain routes: its production adapter maps to the already implemented and accepted P01 authentication runtime on backend main `38dccbf213d5f439e56cd608e3e4ac419d5092d1`.

The QA adapter remains test-only. F07 does not claim deployment of a new backend phase and does not change backend phase order.

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## Concurrency integrity

F07 began from live main after the Lovable Challenge planning commit so that history was preserved. The implementation compare did not modify Challenge Hub/Detail product files.

`/dashboard/challenges` remains a `PLACEHOLDER` in accepted route truth until its own implementation/evidence chain lands. The Lovable planning file alone is not implementation acceptance.

`/register` remains `REBUILD` and is not included in F07.

## F06 governance reconciliation

Issue #47 proves F06 terminal completion:
- `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- frozen main `e87798a0463677b4da68ee28b80b5e58a91a1883`;
- terminal Quality Gate `34412405721` — PASS;
- Issue #47 closed completed.

This F07 closeout repairs the pre-existing stale F06 wording in continuity/registry. The repair is governance-only; no F06 runtime/source code is changed.

## Closeout mutation lock

Relative to implementation merge `c522e9593c1628097ee20e2de8ba14f97c0a5334`, the closeout branch may change only:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F07_OTP_LOGIN.md`;
4. `docs/workstreams/F07_CLOSEOUT.md`.

Application/runtime code changes: `NONE`.

Workflow/package/dependency changes: `NONE`.

Contract/adapter/fixture changes: `NONE`.

## Non-recursive terminal evidence rule

The closeout commit cannot contain its own future merge SHA or terminal main CI run. Therefore this document records all evidence known before closeout merge. Final closeout merge/frozen-main SHA and terminal post-closeout main Quality Gate belong in Issue #50 after they exist.

The route may be `FINAL_PRIVATE` now because the implementation merge and post-implementation main gate are accepted. The F07 workstream itself cannot be called `DONE / MERGED / FROZEN` until the terminal evidence is recorded and Issue #50 is closed completed.

## Remaining terminal gate

1. compare implementation merge → closeout head and require documentation-only scope;
2. open closeout PR without auto-close syntax;
3. require closeout PR full Quality Gate PASS on exact head;
4. require mergeable true and unresolved review threads 0;
5. verify main is still exact implementation merge before closeout merge;
6. merge closeout with expected-head lock;
7. require terminal post-closeout main Quality Gate PASS on exact frozen main;
8. verify live main exact frozen SHA;
9. record frozen SHA + terminal CI/artifact evidence in Issue #50;
10. close Issue #50 completed.
