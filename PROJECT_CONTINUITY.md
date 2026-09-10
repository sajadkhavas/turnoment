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

Current accepted implementation main / F11 closeout base:

`ce3e241e297c86c9c8c09b2d29d774274f0ef847`

F11 status at this checkpoint:

`MERGED / CLOSEOUT IN PROGRESS — TARGET FINAL_PRIVATE`

Route: `/dashboard/settings`

Tracking Issue: `#62` — MUST remain open until documentation-only closeout is merged and terminal frozen-main Quality Gate/artifact/digest are green and recorded.

### F11 implementation acceptance

- START_SHA: `4e3a347de9140636bc95e37b096f67f146ed2e70`;
- implementation branch: `phase/f11-player-settings`;
- clean final implementation head: `1688356421e07747b36944cf4e47038e843f2a67`;
- clean history: exactly one commit ahead of START_SHA, zero behind;
- exact-head Quality Gate: `34478166285` — PASS;
- exact-head artifact: `10152549996`;
- exact-head digest: `sha256:ffa0c5be43ddf4523756a6e7002c60591c458bd4f2b78e511cc9eeb059c3241d`;
- manual visual acceptance: `375 / 390 / 430 / 768 / 1024 / 1440` — PASS;
- implementation PR: `#63` — MERGED;
- PR Quality Gate: `34478792619` — PASS;
- PR artifact: `10152775926`;
- PR artifact digest: `sha256:4ca1f59d2e3d73d81eefcefcc2d15b302e37ff876f987b938a3db4f5626d4f9b`;
- mergeable immediately before merge: `true`;
- unresolved review threads immediately before merge: `0`;
- pre-merge `main`: exact START_SHA;
- expected-head merge used;
- implementation merge/current accepted main: `ce3e241e297c86c9c8c09b2d29d774274f0ef847`;
- post-implementation main Quality Gate: `34481396073` — PASS;
- post-main artifact: `10153880614`;
- post-main digest: `sha256:7d100b44b2cf2ce2e25fc7d0f273d345680a5f71f0f475ccdc9f57e39f794624`;
- live frontend `main` reverified exact implementation merge after post-main QA.

Because implementation is merged and post-main QA is green, `/dashboard/settings` may be represented as `FINAL_PRIVATE` in closeout governance. The F11 workstream itself is not terminally frozen until closeout merge + terminal main CI complete.

## 3. F11 permanent product / architecture truth

Accepted bounded scope:
- optional player notification preferences: `tournament`, `match`, `challenge`;
- `account` and `system` remain mandatory/non-disableable;
- preference changes are prospective and never delete or mutate existing F10 inbox items;
- preferences never change registration, Match, Challenge, rating, result, dispute, moderation, eligibility or lifecycle truth;
- no unrelated privacy/business settings were invented;
- no PWA/web-push subscription implementation is claimed.

Permanent boundary:

`private dashboard access policy → loader → typed PlayerSettingsRepository → runtime-validated settings projection → UI`

Permanent behavior:
- private `noindex,nofollow` route;
- authenticated loader with Login redirect;
- deterministic QA fixture and Django HTTP adapter implement the same repository interface;
- runtime validation for settings read/save payloads;
- opaque repository/backend revision for concurrency;
- stale writes fail closed and return authoritative current settings;
- frontend keeps local draft intent but treats returned projection as persisted truth;
- complete loading/load-error/pristine/dirty/reset/save-pending/success/failure/stale/session-expired states;
- final Persian copy and accessible labeled switches/status semantics;
- responsive acceptance at all six standard widths.

Runtime truth remains exactly:

`FRONTEND MOCK / BACKEND PENDING`

## 4. Backend truth

Repository: `sajadkhavas/turnoment-backend`

F11 backend alignment is documentation-only and terminally complete:
- Backend START_SHA `e1d8d86f9b44a2874afc29f4ef9de13aeb34d9f7`;
- Issue `#19` — CLOSED / COMPLETED;
- docs head `44aee41fac159d5095218af06b635e9caa519375`;
- PR `#20` — MERGED;
- PR Quality Gate `34477007799` — PASS on Python 3.12 and 3.14;
- accepted backend main `3fb421cf2c85d94753ddf9352d8bc1134358847a`;
- post-main Backend Quality Gate `34477753302` — PASS on Python 3.12 and 3.14;
- live backend main reverified exact accepted SHA.

Planned future endpoints:
- `GET /api/v1/me/settings/notification-preferences/`;
- `PATCH /api/v1/me/settings/notification-preferences/`.

No Settings Python domain/model/migration/URL implementation is accepted yet. Backend NEXT remains `P02 — Games / Catalog Foundation`.

Web auth remains Django Session + CSRF + OTP. Never introduce localStorage/sessionStorage bearer-token authentication.

## 5. Previously frozen frontend truth

- F10 `/dashboard/notifications` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `4e3a347de9140636bc95e37b096f67f146ed2e70`; terminal gate `34474656269` PASS; artifact `10151074107`; Issue #59 completed.
- F09 `/dashboard/profile` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `34d6a576691532e4228b2eecc0fea1c1d296d58e`; Issue #56 completed.
- F08 `/register` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #53 completed.
- F07 `/login` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #50 completed.
- F06 `/matches/$id/dispute` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #47 completed.
- F05 `/matches/$id/result` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #44 completed.
- F04 `/dashboard/matches` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #41 completed.
- F03 `/dashboard/tournaments` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #38 completed.
- F02 `/games/$slug` → `DONE / MERGED / FROZEN — FINAL_CURRENT`; terminal truth in Issue #29.
- F01 `/tournaments/$id` → `FINAL_PRE_SEO`; `/tournaments/$id/register` → `FINAL_PRIVATE`.

## 6. Permanent frontend law

Every accepted page is built once as final frontend architecture:

`Route → validated params/search → route access policy → loader → typed repository/service contract → runtime-validated data → UI`

Fixtures are development/test/visual-QA adapters only and must satisfy the same permanent contract. Frontend is not authoritative for auth/session, lifecycle, eligibility, capacity, result/winner, rating, dispute, challenge, payment/refund/settlement or moderation truth.

## 7. Current route truth

- `/dashboard` → `FINAL_PRIVATE`.
- `/dashboard/tournaments` → `FINAL_PRIVATE`.
- `/dashboard/matches` → `FINAL_PRIVATE`.
- `/dashboard/profile` → `FINAL_PRIVATE`.
- `/dashboard/notifications` → `FINAL_PRIVATE`.
- `/dashboard/settings` → implementation accepted and governance-promotable to `FINAL_PRIVATE`; F11 closeout still in progress.
- `/matches/$id/result` → `FINAL_PRIVATE`.
- `/matches/$id/dispute` → `FINAL_PRIVATE`.
- `/tournaments/$id/register` → `FINAL_PRIVATE`.
- `/tournaments/$id` → `FINAL_PRE_SEO`.
- `/games/$slug` → `FINAL_CURRENT`.
- `/login` → `FINAL_PRIVATE`.
- `/register` → `FINAL_PRIVATE`.

Canonical inventory: `docs/ROUTE_COMPLIANCE_REGISTRY.md`.

## 8. Remaining known work

- `/dashboard/challenges` remains isolated under its own Challenge Hub workstream/Lovable acceptance chain and MUST NOT be modified by F11 closeout.
- `/dashboard/rivalries`, `/dashboard/achievements`, `/dashboard/teams` remain explicit placeholders.
- `/`, `/tournaments`, `/games`, `/centers`, `/centers/$id`, `/ranking`, `/players/$username`, `/host`, `/rules` still require current-law public recertification.
- inherited ecommerce/service/general routes remain `LEGACY_REVIEW` until explicit keep/remove/repurpose decisions.

## 9. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## 10. Exact NEXT

F11 closeout NEXT:
1. closeout branch `closeout/f11-player-settings` from exact implementation merge `ce3e241e297c86c9c8c09b2d29d774274f0ef847`;
2. exactly one docs-only closeout commit changing exactly four Markdown files;
3. compare must prove ahead 1 / behind 0 and only those four files;
4. closeout PR must contain no auto-close syntax and must pass full Frontend Quality Gate;
5. require mergeable true, unresolved review threads 0, and pre-merge main exact implementation merge;
6. expected-head closeout merge;
7. terminal post-closeout main Quality Gate/artifact/digest on exact frozen main;
8. live main exact reverify;
9. only then update Issue #62 with terminal evidence and close `completed`.

After F11 terminal freeze, Challenge Hub remains isolated; the next independent dashboard placeholder may be `/dashboard/rivalries` unless product priority explicitly selects another controlled workstream.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
