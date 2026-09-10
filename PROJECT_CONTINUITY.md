# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-11`

## 1. Mandatory continuation law

Every chat/agent MUST:
1. read this file before implementation;
2. read `FRONTEND_PAGE_DELIVERY_PROTOCOL.md` for frontend page work;
3. read `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable pages or material public-copy changes;
4. read `docs/ROUTE_COMPLIANCE_REGISTRY.md` before modifying/accepting an existing route;
5. verify exact current `main` SHA before mutation;
6. read relevant Issue/PR/workstream evidence before repeating work;
7. use a dedicated branch/Issue/PR;
8. never claim `DONE / MERGED / FROZEN` from chat memory alone;
9. record exact branch/SHA/PR/CI/artifact evidence;
10. preserve cross-repo backend ownership/runtime truth.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `READY TO MERGE`, `MERGED / CLOSEOUT IN PROGRESS`, `DONE / MERGED / FROZEN`.

## 2. Current frontend truth

Repository: `sajadkhavas/turnoment`

F13 START_SHA / previous frozen main:
`a058de708c755d98e7180ffee616b50cbdd8598c`

Current implementation main / closeout base:
`638d3de4006372e8ec2604152a7523a10f39ea63`

Active workstream:
`F13 — Player Achievements Hub`

Route: `/dashboard/achievements`

Tracking Issue: `#68`

Status:
`MERGED / CLOSEOUT IN PROGRESS`

Target route status: `FINAL_PRIVATE`

Runtime truth:
`FRONTEND MOCK / BACKEND PENDING`

Closeout branch:
`closeout/f13-player-achievements`

## 3. F13 accepted implementation evidence

- START_SHA: `a058de708c755d98e7180ffee616b50cbdd8598c`
- implementation branch: `phase/f13-player-achievements`
- final reviewed implementation head: `f3806f5403157a4d0ca97d51bf69ded2e9dcff53`
- compare from START: ahead 1 / behind 0 / exactly one commit
- changed files: 11 F13-owned files
- dependency/version drift: `NONE`; `package.json` only appended the F13 contract spec to the test chain
- exact-head Frontend Quality Gate: `34523505639` — PASS
- exact-head artifact: `10170747003`
- exact-head digest: `sha256:7978de3b3170c82a720ff729beb001b29befb77480b1242e902c5bd2a968e2fd`
- manual visual QA at `375 / 390 / 430 / 768 / 1024 / 1440`: PASS
- browser regression: 84 screenshots
- implementation PR: `#69`
- PR-context Frontend Quality Gate: `34535849148` — PASS
- PR artifact: `10175494769`
- PR digest: `sha256:f01d446547c653892c364b125a8e69092ce7e9bd619b773cdc5be11533a7aa9c`
- mergeable before merge: `true`
- unresolved review threads before merge: `0`
- pre-merge `main` reverified exact START_SHA
- expected-head merge used
- implementation merge / current main: `638d3de4006372e8ec2604152a7523a10f39ea63`
- post-implementation main Frontend Quality Gate: `34536367379` — PASS
- post-main artifact: `10175682558`
- post-main digest: `sha256:263e59b171afa14882c7b0e454dff927647128a33be0909147ebfd1ff25f9254`

A first candidate `126737d26c1f18b3e2026c79c611397510fa7741` was superseded because its governance snapshot predated backend terminal closure. A transient uncommitted dependency-drift blob was rejected before branch history and never became repository truth.

## 4. F13 permanent product / architecture truth

F13 is a private read-only Achievements Hub.

Permanent boundary:

`private dashboard access policy → validated status/category/sort/page search → loader → typed PlayerAchievementsRepository → runtime-validated achievement projection → UI`

Backend/repository owns:
- achievement definitions and stable IDs/codes;
- category identity/membership/options;
- status `locked | in-progress | unlocked`;
- progress `current / target / percent` when present;
- unlock timestamp;
- summary, filtering, ordering and pagination.

Frontend owns validated URL navigation, final Persian presentation, supplied-timezone date formatting, visual progress from authoritative percentage, accessibility/responsive behavior and deterministic QA fixtures under the same contract.

Frontend MUST NOT derive or award achievements from Match/Tournament/Challenge history, infer status from percentage, or invent XP/coins/financial rewards/trophy rarity/social comparison/claim mutation/Achievement Detail/Challenge eligibility or rating behavior.

Private metadata remains `noindex,nofollow`. Django web auth truth remains Session + CSRF; the read adapter uses `credentials: include` and treats 401/403 as unauthenticated. No localStorage/sessionStorage bearer auth is introduced.

## 5. Backend F13 cross-repo alignment — terminal documentation truth

Repository: `sajadkhavas/turnoment-backend`

- backend START_SHA: `e81b13a0de6936ded0879d4310eab3883a7556a6`
- Issue `#23` — CLOSED / COMPLETED
- docs head: `f6d54a77370b268f1d240180d5eacda86d100dd8`
- PR `#24` — MERGED
- PR Quality Gate `34521995236` — PASS on Python 3.12 and 3.14
- accepted backend main: `ddfdceaa9746cc6a60ad2b5e18e630c53904f00c`
- post-main Backend Quality Gate `34522798713` — PASS on Python 3.12 and 3.14
- planned endpoint: `GET /api/v1/me/achievements/`
- no Achievements Python/model/migration/serializer/view/URL runtime implementation was added
- Backend NEXT remains exactly `P02 — Games / Catalog Foundation`

Therefore runtime remains exactly `FRONTEND MOCK / BACKEND PENDING`.

## 6. Previously frozen frontend truth

- F12 `/dashboard/rivalries` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `a058de708c755d98e7180ffee616b50cbdd8598c`; Issue #65 completed.
- F11 `/dashboard/settings` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #62 completed.
- F10 `/dashboard/notifications` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #59 completed.
- F09 `/dashboard/profile` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #56 completed.
- F08 `/register` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #53 completed.
- F07 `/login` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #50 completed.
- F06 `/matches/$id/dispute` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #47 completed.
- F05 `/matches/$id/result` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #44 completed.
- F04 `/dashboard/matches` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #41 completed.
- F03 `/dashboard/tournaments` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #38 completed.
- F02 `/games/$slug` → `DONE / MERGED / FROZEN — FINAL_CURRENT`; terminal truth in Issue #29.
- F01 `/tournaments/$id` → `FINAL_PRE_SEO`; `/tournaments/$id/register` → `FINAL_PRIVATE`.

## 7. Remaining known work

- `/dashboard/challenges` remains isolated under its own Challenge Hub workstream and MUST NOT be modified by unrelated workstreams.
- `/dashboard/teams` remains an explicit placeholder.
- `/`, `/tournaments`, `/games`, `/centers`, `/centers/$id`, `/ranking`, `/players/$username`, `/host`, `/rules` require current-law public recertification.
- inherited ecommerce/service/general routes remain `LEGACY_REVIEW` until explicit keep/remove/repurpose decisions.

Competitive truth retained:
- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never owns finalized result/rating/dispute/challenge truth.

## 8. Closeout scope and exact NEXT

The F13 closeout is documentation-only and may change exactly:
1. `PROJECT_CONTINUITY.md`
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`
3. `docs/workstreams/F13_PLAYER_ACHIEVEMENTS.md`
4. `docs/workstreams/F13_CLOSEOUT.md`

No application source, workflow, package/dependency, contract/adapter/fixture or Challenge Hub file may change in closeout.

The route may be promoted non-recursively to `FINAL_PRIVATE` because implementation is merged and post-main QA is green. The workstream itself remains `MERGED / CLOSEOUT IN PROGRESS` until:
1. closeout diff is proven exactly four Markdown files;
2. closeout PR full CI passes;
3. mergeable is true and review threads are zero;
4. pre-merge main is exact implementation merge `638d3de4006372e8ec2604152a7523a10f39ea63`;
5. closeout merges with expected-head lock;
6. terminal frozen-main Frontend Quality Gate passes and artifact/digest are recorded;
7. live `main` is reverified exact frozen SHA;
8. terminal facts are written to Issue #68 and it is closed `completed`.

Per the non-recursive rule, the closeout files MUST NOT try to self-record their own eventual merge SHA or terminal run. Those facts belong in Issue #68 after merge.

Only after all terminal evidence exists may F13 be reported as:
`DONE / MERGED / FROZEN — FINAL_PRIVATE`.
