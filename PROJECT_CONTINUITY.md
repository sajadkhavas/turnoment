# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-10`

## 1. Mandatory continuation law

Every chat/agent MUST:
1. read this file before implementation;
2. read `FRONTEND_PAGE_DELIVERY_PROTOCOL.md` for frontend page work;
3. read `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable pages or material public-copy changes;
4. read `docs/ROUTE_COMPLIANCE_REGISTRY.md` before modifying/accepting an existing route;
5. verify current `main` SHA of every repository it will change;
6. read relevant Issue/PR/workstream evidence before repeating work;
7. use a dedicated branch;
8. never claim `DONE / MERGED / FROZEN` from chat memory alone;
9. update continuity before ending even if partial/blocked/merge-ready;
10. record exact branch/SHA/PR/CI evidence;
11. update both repos when a cross-repo contract/global product state changes.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `READY TO MERGE`, `MERGED / CLOSEOUT IN PROGRESS`, `DONE / MERGED / FROZEN`.

## 2. Repository truth

### Frontend

Repository: `sajadkhavas/turnoment`

Current accepted implementation main before F07 closeout:

`c522e9593c1628097ee20e2de8ba14f97c0a5334`

Post-F07-implementation Frontend Quality Gate:

`34452092176` — **PASS**

F07 implementation PR `#51` is MERGED. F07 workstream status at this closeout checkpoint is:

`MERGED / CLOSEOUT IN PROGRESS`

Tracking Issue `#50` MUST remain open until the documentation-only closeout is merged and the terminal post-closeout main Quality Gate is green on the final frozen main SHA.

### F06 terminal correction

Issue `#47` is the authoritative terminal record for F06 and is CLOSED / COMPLETED.

F06 — Match Dispute `/matches/$id/dispute`:
- status: `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- frozen main: `e87798a0463677b4da68ee28b80b5e58a91a1883`;
- terminal Quality Gate: `34412405721` — PASS;
- terminal artifact: `10127818534`;
- terminal digest: `sha256:1dc29a54e8a772e616dc426ee2bbd89b918f25a24baccedf3d4595572d1bffe0`;
- Issue `#47`: closed completed.

Any earlier wording describing F06 as `MERGED / CLOSEOUT IN PROGRESS` is superseded by the terminal evidence above.

### F07 implementation evidence

F07 — Final OTP Login `/login`:
- START_SHA: `64c760af73f6cb30b02e0ac9464ccbdeb18922e5`;
- implementation branch: `phase/f07-final-otp-login`;
- tracking Issue: `#50`;
- accepted browser/code candidate: `0f27c9e55bcc8f96664da4910e0d74a004156295`;
- accepted browser Quality Gate: `34450606193` — PASS;
- accepted artifact: `10141454114`;
- accepted artifact digest: `sha256:36550b87f438c41570757b73e79c83e31b9465bc8a9eabe9950bf0f6478cb4a7`;
- 48 regression screenshots; Login widths `375 / 390 / 430 / 768 / 1024 / 1440`;
- manual visual review `375 / 430 / 768 / 1024 / 1440` — PASS;
- final implementation/evidence head: `5e37a7349c0f1408d9f55682d5aeca7f7318cbc8`;
- exact-head push Quality Gate: `34451450368` — PASS;
- implementation PR: `#51` — MERGED;
- implementation PR Quality Gate: `34451772869` — PASS;
- unresolved review threads before merge: `0`;
- implementation merge/current accepted main: `c522e9593c1628097ee20e2de8ba14f97c0a5334`;
- post-implementation main Quality Gate: `34452092176` — PASS;
- closeout branch: `closeout/f07-final-otp-login`, created exactly from implementation merge;
- workstream evidence: `docs/workstreams/F07_OTP_LOGIN.md`;
- acceptance evidence: `docs/workstreams/F07_ACCEPTANCE_EVIDENCE.md`;
- closeout record: `docs/workstreams/F07_CLOSEOUT.md`.

F07 route may be represented as `FINAL_PRIVATE` in the closeout registry because implementation is merged and post-implementation main QA is green. The F07 workstream itself is NOT terminally `DONE / MERGED / FROZEN` until Issue #50 records the closeout merge/frozen main SHA and terminal green main CI.

### Backend

Repository: `sajadkhavas/turnoment-backend`

Latest accepted backend main:

`38dccbf213d5f439e56cd608e3e4ac419d5092d1`

Backend phase truth:
- P00 → `DONE / MERGED / FROZEN`;
- P01 → `DONE / MERGED / FROZEN`;
- backend NEXT → `P02 — Games / Catalog Foundation`.

F07 does not require a new backend phase or backend code change. It maps to the already accepted/live P01 auth contract:
- `GET /api/v1/auth/csrf/`;
- `POST /api/v1/auth/otp/request/`;
- `POST /api/v1/auth/otp/verify/`;
- `GET /api/v1/auth/me/`;
- `POST /api/v1/auth/logout/`.

Web auth truth remains Django Session + CSRF + OTP. Never introduce localStorage/sessionStorage bearer-token auth.

## 3. Permanent frontend law

Every accepted page is built once as final frontend architecture.

Required boundary:

`Route → validated params/search → route access policy → loader → typed repository/service contract → runtime-validated data → UI`

Fixtures exist only for development/test/visual QA and implement the same permanent contract.

Frontend is not authoritative for auth/session, tournament lifecycle, registration eligibility, capacity, bracket truth, winner/final result, rating change, result-submission/confirmation eligibility, dispute truth, challenge eligibility, payment/refund/settlement or moderation.

No accepted page may need a later generic phase to finish SSR/routing, index policy, final copy, accessibility, responsive behavior, complete states, runtime validation or production contract mapping.

User-visible copy must never expose development-stage language such as backend/API/mock/demo/temporary/waiting/service-connection jargon when natural product language is appropriate.

## 4. Mandatory page workflow

1. exact repository/START_SHA lock;
2. official documentation audit;
3. design reference audit;
4. public pages: SEO/search-intent/topic research + final-copy plan;
5. final information architecture/state model;
6. final route/SSR/index-policy/accessibility/contracts/copy;
7. responsive/visual QA;
8. public pages: SEO/final-copy QA;
9. lint/typecheck/contracts/build;
10. implementation PR/review/merge/post-merge CI;
11. documentation-only closeout where required;
12. terminal frozen-main CI before `DONE`.

Private/noindex account/action pages do not require public SERP/keyword research, but final natural copy, accessibility, production-contract mapping and explicit `noindex,nofollow` remain mandatory.

## 5. Accepted / active route truth

- `/dashboard` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`.
- `/dashboard/tournaments` → F03 `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`; gate `34386636373` PASS; Issue #38 completed.
- `/dashboard/matches` → F04 `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `864fe1491739b06c763be487a73a589c7e0f3609`; gate `34391019079` PASS; Issue #41 completed.
- `/matches/$id/result` → F05 `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `0407a925974d50b4a75af292231bacb48c66eb38`; gate `34407220433` PASS; Issue #44 completed; runtime remains `FRONTEND MOCK / BACKEND PENDING` for result APIs.
- `/matches/$id/dispute` → F06 `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `e87798a0463677b4da68ee28b80b5e58a91a1883`; gate `34412405721` PASS; Issue #47 completed; runtime remains `FRONTEND MOCK / BACKEND PENDING` for disputes APIs.
- `/tournaments/$id/register` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`.
- `/tournaments/$id` → `DONE / MERGED / FROZEN — FINAL_PRE_SEO`.
- `/games/$slug` → F02 `DONE / MERGED / FROZEN — FINAL_CURRENT`; terminal evidence in Issue #29.
- `/login` → route implementation accepted as `FINAL_PRIVATE`; F07 terminal workstream closeout still in progress until Issue #50 closes after terminal main CI.

## 6. F07 frozen product/architecture truth being closed

`/login` is a private `noindex,nofollow` player authentication surface with:
- phone OTP only; no password/reset-password/remember-me flow;
- Iran mobile normalization including Persian/Arabic digit convenience;
- `autocomplete=tel` and `autocomplete=one-time-code` semantics;
- typed runtime-validated `LoginAuthRepository`;
- deterministic QA adapter and Django HTTP adapter implementing the same permanent contract;
- Django Session authority;
- P01 CSRF bootstrap, `credentials: include`, `X-CSRFToken` on unsafe OTP requests;
- no localStorage/sessionStorage bearer auth;
- authoritative challenge expiry/resend timings and auth/error states;
- safe optional internal return-to redirect; unsafe redirect inputs fail closed to `/dashboard`;
- authoritative `/auth/me/` recovery check after ambiguous verify transport failure;
- final Persian copy, accessible labels/status handling and responsive behavior;
- exactly one `<main>`.

The QA adapter is only for deterministic development/test/browser QA. Production mapping targets the existing accepted P01 auth runtime.

## 7. Route registry and remaining known work

Canonical inventory: `docs/ROUTE_COMPLIANCE_REGISTRY.md`.

Important remaining truth:
- `/register` remains `REBUILD`; F07 did not rebuild it.
- `/dashboard/challenges` remains `PLACEHOLDER` in accepted route truth until an actual Challenge implementation/evidence chain lands. The existing Lovable file is planning history only.
- `/dashboard/rivalries`, achievements, notifications, settings and teams remain explicit planned/placeholder surfaces unless a newer accepted workstream supersedes this checkpoint.
- public competitive routes predating current law remain subject to registry recertification.
- inherited ecommerce/service/general routes remain `LEGACY_REVIEW` until explicit keep/remove/repurpose decisions.

## 8. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## 9. Exact NEXT

F07 terminal closeout NEXT:
1. keep closeout diff documentation-only;
2. open closeout PR without auto-closing Issue #50;
3. require closeout PR exact-head Frontend Quality Gate PASS;
4. require mergeable true + unresolved review threads `0`;
5. verify `main` is still exact implementation merge `c522e9593c1628097ee20e2de8ba14f97c0a5334` before closeout merge;
6. merge closeout with expected-head lock;
7. require terminal post-closeout main Quality Gate PASS;
8. record frozen main SHA + terminal CI/artifact evidence in Issue #50;
9. close Issue #50 completed only then.

Parallel frontend roadmap remains:
1. Challenge Hub / Detail — Lovable planning exists, but accepted implementation must still follow the full evidence chain;
2. Rivalry Detail;
3. auth completion for `/register`;
4. Notifications / Settings.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
