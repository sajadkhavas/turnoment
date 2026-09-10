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
6. read the relevant Issue/PR/workstream evidence before repeating work;
7. use a dedicated branch;
8. never claim `DONE / MERGED / FROZEN` from chat memory alone;
9. record exact branch/SHA/PR/CI/artifact evidence;
10. update both repositories when a cross-repo contract/global product truth changes.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `READY TO MERGE`, `MERGED / CLOSEOUT IN PROGRESS`, `DONE / MERGED / FROZEN`.

## 2. Current frontend repository truth

Repository: `sajadkhavas/turnoment`

Current accepted implementation main / F10 closeout base:

`74f0e25275ea2bb64ee374c0ea0f8e50e519c3d9`

F10 post-implementation main Frontend Quality Gate:

`34473462713` — **PASS**

Post-main browser artifact:
- id `10150600270`;
- digest `sha256:b503925b92b89bd9a27eb0d1d20ac900b7bbbd69024eaefb5865c91bc169234c`;
- 66 regression screenshots.

Live frontend `main` was re-verified exact `74f0e25275ea2bb64ee374c0ea0f8e50e519c3d9` after this post-main gate.

F10 implementation PR `#60` is MERGED. F10 workstream status at this checkpoint is:

`MERGED / CLOSEOUT IN PROGRESS — TARGET FINAL_PRIVATE`

Tracking Issue `#59` MUST remain open until documentation-only closeout is merged and terminal post-closeout main Quality Gate/artifact are green on the final frozen main SHA.

## 3. F10 — Player Notifications Inbox evidence

Route: `/dashboard/notifications`

- START_SHA: `34d6a576691532e4228b2eecc0fea1c1d296d58e`;
- implementation branch: `phase/f10-player-notifications`;
- tracking Issue: `#59`;
- accepted visual candidate: `77d89d7143d315b1f8db92ab10dc32085d0ac963`;
- candidate Quality Gate: `34471158110` — PASS;
- candidate artifact: `10149666864`;
- candidate digest: `sha256:b36b923ada03c4f346de8b87794e644e2fdd202ec620b3fb9a2ffcd88b605950`;
- candidate visual review: `375 / 430 / 768 / 1024 / 1440` — PASS;
- clean final implementation/evidence head: `0629febdebda58a1d0373e005aa80999e1a75623`;
- clean history: exactly one commit ahead of START_SHA, zero behind;
- exact-head Quality Gate: `34472707498` — PASS;
- exact-head artifact: `10150299042`;
- exact-head digest: `sha256:413113078075f7b979d023e52d447e25ef953c6e3eb369bcfe6543b56d0d2232`;
- implementation PR: `#60` — MERGED;
- PR Quality Gate: `34473099462` — PASS;
- PR artifact: `10150419030`;
- PR artifact digest: `sha256:19325defe0b8fefacecb0541a52970a298dbaf10178571be9e2b04e973c645eb`;
- mergeable immediately before merge: `true`;
- unresolved review threads immediately before merge: `0`;
- pre-merge `main`: exact START_SHA;
- expected-head merge used;
- implementation merge/current accepted main: `74f0e25275ea2bb64ee374c0ea0f8e50e519c3d9`;
- post-implementation main Quality Gate: `34473462713` — PASS;
- post-main artifact: `10150600270`;
- post-main digest: `sha256:b503925b92b89bd9a27eb0d1d20ac900b7bbbd69024eaefb5865c91bc169234c`;
- closeout branch: `closeout/f10-player-notifications`.

The `/dashboard/notifications` route may be represented as `FINAL_PRIVATE` in closeout governance because its implementation is merged and post-implementation main QA is green. F10 itself is not terminally `DONE / MERGED / FROZEN` until the closeout merge and terminal frozen-main Quality Gate are recorded in Issue #59.

## 4. F10 permanent product / architecture truth

Accepted boundary:

`private dashboard access policy → validated search → loader → typed PlayerNotificationsRepository → runtime-validated projection → UI`

Permanent behavior:
- private `noindex,nofollow` inbox;
- validated URL state for `state`, `kind`, `page`;
- total/unread summary and pagination are repository/backend-owned truth;
- notification list/content/read state/order are repository/backend-owned truth;
- explicit mark-one-read and mark-all-read actions;
- no optimistic unread-count authority; accepted mutations reload through the repository;
- strict typed application targets only;
- arbitrary `href` values fail runtime validation;
- supported targets map only to accepted application routes;
- no Challenge Detail route was invented;
- loading/empty/error/session-expired/mutation states are final;
- final Persian copy, keyboard/touch accessibility and responsive layouts are accepted;
- regression QA covers `375 / 390 / 430 / 768 / 1024 / 1440`.

## 5. Backend truth

Repository: `sajadkhavas/turnoment-backend`

Latest accepted backend main:

`e1d8d86f9b44a2874afc29f4ef9de13aeb34d9f7`

F10 backend alignment is **documentation-only and terminally complete**:
- backend Issue `#17` — CLOSED / COMPLETED;
- docs head `6e452ea74ec91d4c402f282a173384ce27744fde`;
- backend PR `#18` — MERGED;
- PR gate `34468881823` — PASS on Python 3.12 and 3.14;
- accepted backend main `e1d8d86f9b44a2874afc29f4ef9de13aeb34d9f7`;
- post-main gate `34469522243` — PASS on Python 3.12 and 3.14.

Planned notification endpoints:
- `GET /api/v1/me/notifications/`;
- `POST /api/v1/me/notifications/{notificationId}/read/`;
- `POST /api/v1/me/notifications/read-all/`.

No notification Python domain/model/migration/URL implementation exists yet. Therefore runtime truth remains:

`FRONTEND MOCK / BACKEND PENDING`

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

Web auth remains Django Session + CSRF + OTP. Never introduce localStorage/sessionStorage bearer-token authentication.

## 6. Previously frozen frontend truth

- F09 `/dashboard/profile` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `34d6a576691532e4228b2eecc0fea1c1d296d58e`; terminal gate `34468048698` PASS; Issue #56 completed.
- F08 `/register` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `9876e5e6c47b42f9f2574f1675de6dab9ba1cc7f`; terminal gate `34458480652` PASS; Issue #53 completed.
- F07 `/login` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `0932bef621cf22d3d7a7a95360613061e75d805f`; terminal gate `34453295788` PASS; Issue #50 completed.
- F06 `/matches/$id/dispute` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `e87798a0463677b4da68ee28b80b5e58a91a1883`; terminal gate `34412405721` PASS; Issue #47 completed; runtime dispute APIs remain backend pending.
- F05 `/matches/$id/result` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `0407a925974d50b4a75af292231bacb48c66eb38`; terminal gate `34407220433` PASS; Issue #44 completed; runtime result APIs remain backend pending.
- F04 `/dashboard/matches` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `864fe1491739b06c763be487a73a589c7e0f3609`; terminal gate `34391019079` PASS; Issue #41 completed.
- F03 `/dashboard/tournaments` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`; terminal gate `34386636373` PASS; Issue #38 completed.
- F02 `/games/$slug` → `DONE / MERGED / FROZEN — FINAL_CURRENT`; terminal truth in Issue #29.
- F01 `/tournaments/$id` → `FINAL_PRE_SEO`; `/tournaments/$id/register` → `FINAL_PRIVATE`.

## 7. Permanent frontend law

Every accepted page is built once as final frontend architecture.

Required boundary:

`Route → validated params/search → route access policy → loader → typed repository/service contract → runtime-validated data → UI`

Fixtures exist only for development/test/visual QA and implement the same permanent contract.

Frontend is not authoritative for auth/session, tournament lifecycle, registration eligibility, capacity, bracket truth, winner/final result, rating change, result-submission/confirmation eligibility, dispute truth, challenge eligibility, payment/refund/settlement or moderation.

No accepted page may need a later generic phase to finish SSR/routing, index policy, final copy, accessibility, responsive behavior, complete states, runtime validation or production contract mapping.

## 8. Accepted / active route truth

- `/dashboard` → `FINAL_PRIVATE`.
- `/dashboard/tournaments` → `FINAL_PRIVATE`.
- `/dashboard/matches` → `FINAL_PRIVATE`.
- `/dashboard/profile` → `FINAL_PRIVATE`.
- `/dashboard/notifications` → F10 implementation accepted as `FINAL_PRIVATE`; F10 terminal closeout still pending at this checkpoint; runtime notification backend remains pending.
- `/matches/$id/result` → `FINAL_PRIVATE`.
- `/matches/$id/dispute` → `FINAL_PRIVATE`.
- `/tournaments/$id/register` → `FINAL_PRIVATE`.
- `/tournaments/$id` → `FINAL_PRE_SEO`.
- `/games/$slug` → `FINAL_CURRENT`.
- `/login` → `FINAL_PRIVATE`.
- `/register` → `FINAL_PRIVATE`.

Canonical inventory: `docs/ROUTE_COMPLIANCE_REGISTRY.md`.

## 9. Remaining known work

- `/dashboard/challenges` remains a separate Challenge Hub workstream. Lovable output alone is not acceptance; do not modify it from unrelated workstreams.
- `/dashboard/rivalries`, `/dashboard/achievements`, `/dashboard/settings`, `/dashboard/teams` remain placeholders until accepted workstreams supersede them.
- `/`, `/tournaments`, `/games`, `/centers`, `/centers/$id`, `/ranking`, `/players/$username`, `/host`, `/rules` still require current-law public recertification.
- inherited ecommerce/service/general routes remain `LEGACY_REVIEW` until explicit keep/remove/repurpose decisions.

## 10. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## 11. Exact NEXT

F10 terminal closeout NEXT:
1. keep closeout diff exactly four Markdown governance/workstream files;
2. compare implementation merge `74f0e25275ea2bb64ee374c0ea0f8e50e519c3d9` → closeout head and require docs-only scope;
3. open closeout PR without auto-close syntax;
4. require closeout PR exact-head Frontend Quality Gate PASS;
5. require mergeable `true` + unresolved review threads `0`;
6. verify `main` remains exact implementation merge before closeout merge;
7. merge closeout with expected-head lock;
8. require terminal post-closeout main Quality Gate PASS;
9. record frozen main SHA + terminal CI/artifact/digest in Issue #59;
10. re-verify live `main` exact frozen SHA;
11. close Issue #59 with `state_reason=completed` only then.

After F10 terminal freeze, `/dashboard/settings` is the next independent controlled frontend placeholder unless an explicit product-priority decision chooses another route. Challenge Hub remains isolated under its own workstream.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
