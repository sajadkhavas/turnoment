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

Current accepted/frozen main and F11 START_SHA:

`4e3a347de9140636bc95e37b096f67f146ed2e70`

F10 is terminally complete:
- route `/dashboard/notifications` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- frozen main `4e3a347de9140636bc95e37b096f67f146ed2e70`;
- terminal Quality Gate `34474656269` — PASS;
- terminal artifact `10151074107`;
- terminal digest `sha256:01493fa999d9e6dd6e91fcce9e4ad6438a1f34f0e1512ff552ad2d6c90544c7f`;
- Issue `#59` — CLOSED / COMPLETED.

Active frontend workstream:
- `F11 — Player Settings & Notification Preferences`;
- route `/dashboard/settings`;
- status `IN PROGRESS`;
- START_SHA `4e3a347de9140636bc95e37b096f67f146ed2e70`;
- branch `phase/f11-player-settings`;
- Issue `#62`;
- target `FINAL_PRIVATE`;
- runtime `FRONTEND MOCK / BACKEND PENDING` until the owning backend settings-preference domain is implemented and accepted.

## 3. F11 product / architecture truth

Before F11, `/dashboard/settings` was only `DashboardSectionPlaceholder`.

Accepted bounded scope:
- player-controlled optional notification preferences for `tournament`, `match`, `challenge`;
- `account` and `system` notices remain mandatory/non-disableable;
- preference changes are prospective and do not delete or modify existing inbox items;
- preferences never mutate registration, Match, Challenge, rating, result, dispute, moderation or lifecycle truth;
- no unrelated privacy/business settings are invented;
- no PWA/web-push subscription implementation is claimed.

Permanent boundary:

`private dashboard access policy → loader → typed PlayerSettingsRepository → runtime-validated settings projection → UI`

Permanent frontend behavior:
- private `noindex,nofollow`;
- authenticated loader with Login redirect;
- deterministic fixture and Django adapter implement one interface;
- runtime validation for read/save payloads;
- opaque revision supplied by backend/repository;
- stale saves fail closed and return authoritative current settings;
- frontend keeps only local draft intent and treats returned saved projection as persisted truth;
- complete loading/error/pristine/dirty/pending/success/failure/stale/session-expired states;
- final Persian copy and accessible labeled switches/status messages;
- responsive QA required at `375 / 390 / 430 / 768 / 1024 / 1440`.

Workstream evidence: `docs/workstreams/F11_PLAYER_SETTINGS.md`.

## 4. Backend truth

Repository: `sajadkhavas/turnoment-backend`

F11 backend alignment is **documentation-only and terminally complete**:
- Backend START_SHA `e1d8d86f9b44a2874afc29f4ef9de13aeb34d9f7`;
- Issue `#19` — CLOSED / COMPLETED;
- docs head `44aee41fac159d5095218af06b635e9caa519375`;
- PR `#20` — MERGED;
- PR Quality Gate `34477007799` — PASS on Python 3.12 and 3.14;
- accepted backend main `3fb421cf2c85d94753ddf9352d8bc1134358847a`;
- post-main Backend Quality Gate `34477753302` — PASS on Python 3.12 and 3.14;
- live backend main reverified exact accepted SHA.

Planned endpoints:
- `GET /api/v1/me/settings/notification-preferences/`;
- `PATCH /api/v1/me/settings/notification-preferences/`.

No Settings Python domain/model/migration/URL implementation exists yet. Therefore runtime truth remains:

`FRONTEND MOCK / BACKEND PENDING`

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

Web auth remains Django Session + CSRF + OTP. Never introduce localStorage/sessionStorage bearer-token authentication.

## 5. Previously frozen frontend truth

- F10 `/dashboard/notifications` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `4e3a347de9140636bc95e37b096f67f146ed2e70`; terminal gate `34474656269` PASS; Issue #59 completed.
- F09 `/dashboard/profile` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `34d6a576691532e4228b2eecc0fea1c1d296d58e`; terminal gate `34468048698` PASS; Issue #56 completed.
- F08 `/register` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `9876e5e6c47b42f9f2574f1675de6dab9ba1cc7f`; terminal gate `34458480652` PASS; Issue #53 completed.
- F07 `/login` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `0932bef621cf22d3d7a7a95360613061e75d805f`; terminal gate `34453295788` PASS; Issue #50 completed.
- F06 `/matches/$id/dispute` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `e87798a0463677b4da68ee28b80b5e58a91a1883`; terminal gate `34412405721` PASS; Issue #47 completed.
- F05 `/matches/$id/result` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `0407a925974d50b4a75af292231bacb48c66eb38`; terminal gate `34407220433` PASS; Issue #44 completed.
- F04 `/dashboard/matches` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `864fe1491739b06c763be487a73a589c7e0f3609`; terminal gate `34391019079` PASS; Issue #41 completed.
- F03 `/dashboard/tournaments` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`; terminal gate `34386636373` PASS; Issue #38 completed.
- F02 `/games/$slug` → `DONE / MERGED / FROZEN — FINAL_CURRENT`; terminal truth in Issue #29.
- F01 `/tournaments/$id` → `FINAL_PRE_SEO`; `/tournaments/$id/register` → `FINAL_PRIVATE`.

## 6. Permanent frontend law

Every accepted page is built once as final frontend architecture.

Required boundary:

`Route → validated params/search → route access policy → loader → typed repository/service contract → runtime-validated data → UI`

Fixtures exist only for development/test/visual QA and implement the same permanent contract.

Frontend is not authoritative for auth/session, tournament lifecycle, registration eligibility, capacity, bracket truth, winner/final result, rating change, result-submission/confirmation eligibility, dispute truth, challenge eligibility, payment/refund/settlement or moderation.

No accepted page may need a later generic phase to finish SSR/routing, index policy, final copy, accessibility, responsive behavior, complete states, runtime validation or production contract mapping.

## 7. Accepted / active route truth

- `/dashboard` → `FINAL_PRIVATE`.
- `/dashboard/tournaments` → `FINAL_PRIVATE`.
- `/dashboard/matches` → `FINAL_PRIVATE`.
- `/dashboard/profile` → `FINAL_PRIVATE`.
- `/dashboard/notifications` → `FINAL_PRIVATE`.
- `/dashboard/settings` → F11 `IN PROGRESS`; remains governance `PLACEHOLDER` until merged implementation + green post-main gate permits non-recursive promotion.
- `/matches/$id/result` → `FINAL_PRIVATE`.
- `/matches/$id/dispute` → `FINAL_PRIVATE`.
- `/tournaments/$id/register` → `FINAL_PRIVATE`.
- `/tournaments/$id` → `FINAL_PRE_SEO`.
- `/games/$slug` → `FINAL_CURRENT`.
- `/login` → `FINAL_PRIVATE`.
- `/register` → `FINAL_PRIVATE`.

Canonical inventory: `docs/ROUTE_COMPLIANCE_REGISTRY.md`.

## 8. Remaining known work

- `/dashboard/challenges` remains a separate Challenge Hub workstream; Lovable output alone is not acceptance and F11 must not modify it.
- `/dashboard/rivalries`, `/dashboard/achievements`, `/dashboard/teams` remain placeholders after F11.
- `/`, `/tournaments`, `/games`, `/centers`, `/centers/$id`, `/ranking`, `/players/$username`, `/host`, `/rules` still require current-law public recertification.
- inherited ecommerce/service/general routes remain `LEGACY_REVIEW` until explicit keep/remove/repurpose decisions.

## 9. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## 10. Exact NEXT

F11 implementation NEXT:
1. keep accepted branch history exactly one clean commit ahead of START_SHA;
2. require exact-head Frontend Quality Gate PASS with no new F11 lint warning;
3. capture browser artifact and manually accept F11 at six widths;
4. open implementation PR and require full PR CI, mergeable true and unresolved review threads 0;
5. verify main exact START_SHA and merge with expected-head lock;
6. require post-implementation main Quality Gate/artifact;
7. perform docs-only closeout/promotion to `FINAL_PRIVATE`;
8. require closeout PR gate/merge and terminal frozen-main Quality Gate/artifact/digest;
9. reverify exact main and close Issue #62 completed only then.

Challenge Hub remains isolated under its own workstream throughout F11.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
