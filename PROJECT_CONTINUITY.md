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

Current accepted implementation main before F08 closeout:

`f90e5c9796e256f35a9a4f3d4fe9faf822657df7`

Post-F08-implementation Frontend Quality Gate:

`34456698222` — **PASS**

Post-main browser artifact:
- id `10143873243`;
- digest `sha256:557fee16eb234eb25907b57eae8567b62408627d36d94587d9f3ea39782d453d`.

F08 implementation PR `#54` is MERGED. F08 workstream status at this checkpoint is:

`MERGED / CLOSEOUT IN PROGRESS — TARGET FINAL_PRIVATE`

Tracking Issue `#53` MUST remain open until documentation-only closeout is merged and terminal post-closeout main Quality Gate is green on the final frozen main SHA.

### F08 implementation evidence

F08 — OTP Account Onboarding `/register`:
- START_SHA: `0932bef621cf22d3d7a7a95360613061e75d805f`;
- implementation branch: `phase/f08-otp-account-onboarding`;
- tracking Issue: `#53`;
- accepted browser/code candidate: `96b05b7bd1e096765a475ef99d639d990d51e881`;
- accepted browser Quality Gate: `34455519949` — PASS;
- accepted browser artifact: `10143394620`;
- accepted artifact digest: `sha256:8631bfd9c69135fbd76fec75eefc1410d1c5f1ff8255bf38b0d8460229391515`;
- 54 regression screenshots; F08 widths `375 / 390 / 430 / 768 / 1024 / 1440`;
- manual visual review `375 / 430 / 768 / 1024 / 1440` — PASS;
- final implementation/evidence head: `78345a2e0ed84c75f48ea11d4fa2d1c489a89910`;
- exact-head push Quality Gate: `34456032039` — PASS;
- exact-head artifact `10143599063`;
- exact-head digest `sha256:89cc0a426abd3308eb6604a05bdae33c132c4dbd6df6762eb3b2dd423786a7e7`;
- implementation PR: `#54` — MERGED;
- implementation PR Quality Gate: `34456378067` — PASS;
- unresolved review threads before merge: `0`;
- mergeable before merge: `true`;
- pre-merge `main` verified exact START_SHA;
- implementation merge used expected-head lock;
- implementation merge/current accepted main: `f90e5c9796e256f35a9a4f3d4fe9faf822657df7`;
- post-implementation main Quality Gate: `34456698222` — PASS;
- post-main artifact `10143873243`;
- post-main digest `sha256:557fee16eb234eb25907b57eae8567b62408627d36d94587d9f3ea39782d453d`;
- closeout branch: `closeout/f08-otp-account-onboarding`, created exactly from implementation merge;
- workstream evidence: `docs/workstreams/F08_OTP_ACCOUNT_ONBOARDING.md`;
- acceptance evidence: `docs/workstreams/F08_ACCEPTANCE_EVIDENCE.md`;
- closeout record: `docs/workstreams/F08_CLOSEOUT.md`.

The `/register` route may be represented as `FINAL_PRIVATE` in closeout governance because implementation is merged and post-implementation main QA is green. The F08 workstream itself is NOT terminally `DONE / MERGED / FROZEN` until Issue #53 records closeout merge/frozen main SHA and terminal green main CI.

### Previously frozen frontend truth

F07 — Final OTP Login `/login`:
- status `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- frozen main `0932bef621cf22d3d7a7a95360613061e75d805f`;
- terminal Quality Gate `34453295788` — PASS;
- terminal artifact `10142502630`;
- terminal digest `sha256:5d56f426984edcb6e2bc137eb11475b70057d87accaef41c2265f4954c26a3df`;
- Issue `#50` CLOSED / COMPLETED.

F06 — Match Dispute `/matches/$id/dispute`:
- status `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- frozen main `e87798a0463677b4da68ee28b80b5e58a91a1883`;
- terminal Quality Gate `34412405721` — PASS;
- Issue `#47` CLOSED / COMPLETED.

F05 — Result Submission `/matches/$id/result`:
- status `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- frozen main `0407a925974d50b4a75af292231bacb48c66eb38`;
- terminal Quality Gate `34407220433` — PASS;
- Issue `#44` CLOSED / COMPLETED;
- runtime result APIs remain `FRONTEND MOCK / BACKEND PENDING`.

F04 — My Matches `/dashboard/matches`:
- status `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- frozen main `864fe1491739b06c763be487a73a589c7e0f3609`;
- terminal gate `34391019079` PASS;
- Issue #41 completed.

F03 — My Tournaments `/dashboard/tournaments`:
- status `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- frozen main `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`;
- terminal gate `34386636373` PASS;
- Issue #38 completed.

F02 — Game Detail `/games/$slug`:
- `DONE / MERGED / FROZEN — FINAL_CURRENT`;
- terminal truth in Issue #29.

F01 — Tournament Detail + Tournament Registration:
- `/tournaments/$id` → `FINAL_PRE_SEO`;
- `/tournaments/$id/register` → `FINAL_PRIVATE`;
- terminal truth in Issue #8.

### Backend

Repository: `sajadkhavas/turnoment-backend`

Latest accepted backend main:

`38dccbf213d5f439e56cd608e3e4ac419d5092d1`

Backend phase truth:
- P00 → `DONE / MERGED / FROZEN`;
- P01 → `DONE / MERGED / FROZEN`;
- backend NEXT → `P02 — Games / Catalog Foundation`.

F08 does not require a new backend phase or backend code change. It maps to accepted P01 auth/account runtime:
- `GET /api/v1/auth/csrf/`;
- `POST /api/v1/auth/otp/request/`;
- `POST /api/v1/auth/otp/verify/`;
- `GET /api/v1/auth/me/`;
- `PATCH /api/v1/auth/me/profile/`;
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

- `/dashboard` → `FINAL_PRIVATE`.
- `/dashboard/tournaments` → F03 `FINAL_PRIVATE`.
- `/dashboard/matches` → F04 `FINAL_PRIVATE`.
- `/matches/$id/result` → F05 `FINAL_PRIVATE`; runtime result APIs `FRONTEND MOCK / BACKEND PENDING`.
- `/matches/$id/dispute` → F06 `FINAL_PRIVATE`; runtime dispute APIs `FRONTEND MOCK / BACKEND PENDING`.
- `/tournaments/$id/register` → F01 `FINAL_PRIVATE`.
- `/tournaments/$id` → F01 `FINAL_PRE_SEO`.
- `/games/$slug` → F02 `FINAL_CURRENT`.
- `/login` → F07 `DONE / MERGED / FROZEN — FINAL_PRIVATE`.
- `/register` → F08 route implementation accepted as `FINAL_PRIVATE`; F08 terminal workstream closeout still in progress until Issue #53 closes after terminal main CI.

Canonical inventory: `docs/ROUTE_COMPLIANCE_REGISTRY.md`.

## 6. F08 frozen product/architecture truth being closed

`/register` is a private `noindex,nofollow` player account-onboarding surface with:
- phone OTP only;
- Iran mobile normalization including Persian/Arabic digit convenience;
- accessible phone and OTP input purposes;
- typed runtime-validated `LoginAuthRepository` reused from F07;
- deterministic QA adapter and Django HTTP adapter implementing the same permanent contract;
- Django Session authority;
- P01 CSRF bootstrap, `credentials: include`, `X-CSRFToken` on unsafe OTP requests;
- no localStorage/sessionStorage bearer auth;
- authoritative challenge expiry/resend timings and auth/error states;
- safe optional internal return-to redirect; unsafe, Login-loop and Register-loop inputs fail closed to `/dashboard`;
- authoritative `/auth/me/` recovery check after ambiguous verify transport failure;
- first-seen verified phone creation remains backend P01 truth;
- existing verified phone authenticates its existing account;
- no separate registration API, password creation, password confirmation or required-email/name registration;
- final Persian copy, responsive behavior and exactly one `<main>`.

## 7. Remaining known work

- `/dashboard/challenges` remains a separate Challenge Hub workstream until its own accepted implementation/evidence chain lands; Lovable output alone is not acceptance.
- `/dashboard/rivalries`, `/dashboard/achievements`, `/dashboard/notifications`, `/dashboard/settings`, `/dashboard/teams` remain placeholders unless a newer accepted workstream supersedes this checkpoint.
- `/dashboard/profile` remains `NEEDS_RECERTIFICATION`.
- `/`, `/tournaments`, `/games`, `/centers`, `/centers/$id`, `/ranking`, `/players/$username`, `/host`, `/rules` remain public competitive routes requiring current-law recertification.
- inherited ecommerce/service/general routes remain `LEGACY_REVIEW` until explicit keep/remove/repurpose decisions.

## 8. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## 9. Exact NEXT

F08 terminal closeout NEXT:
1. keep closeout diff exactly four Markdown governance files;
2. compare implementation merge `f90e5c9796e256f35a9a4f3d4fe9faf822657df7` → closeout head and require docs-only scope;
3. open closeout PR without auto-close syntax;
4. require closeout PR exact-head Frontend Quality Gate PASS;
5. require mergeable true + unresolved review threads `0`;
6. verify `main` is still exact implementation merge before closeout merge;
7. merge closeout with expected-head lock;
8. require terminal post-closeout main Quality Gate PASS;
9. record frozen main SHA + terminal CI/artifact/digest in Issue #53;
10. re-verify live `main` exact frozen SHA;
11. close Issue #53 with `state_reason=completed` only then.

Parallel frontend roadmap remains:
1. Challenge Hub / Detail — own controlled acceptance chain;
2. Rivalry Detail;
3. Notifications / Settings;
4. recertify remaining competitive routes and resolve legacy routes.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
