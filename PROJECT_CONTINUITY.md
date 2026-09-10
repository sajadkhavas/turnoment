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
9. record exact branch/SHA/PR/CI/artifact evidence;
10. update both repositories when a cross-repo contract/global product truth changes.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `READY TO MERGE`, `MERGED / CLOSEOUT IN PROGRESS`, `DONE / MERGED / FROZEN`.

## 2. Current frontend repository truth

Repository: `sajadkhavas/turnoment`

Current frozen main / F13 START_SHA:

`a058de708c755d98e7180ffee616b50cbdd8598c`

That SHA is terminal F12 frozen main. F12 terminal Frontend Quality Gate `34520157521` passed; artifact `10169424034` digest is `sha256:167894d704c2c548f6cf40102bb67f2f584afeff09f8bff96b20a837828911e4`; Issue #65 is CLOSED / COMPLETED.

Active frontend workstream:

`F13 — Player Achievements Hub`

Status:

`IN PROGRESS — IMPLEMENTATION / EXACT-HEAD QA`

Route: `/dashboard/achievements`

Tracking Issue: `#68`

Branch: `phase/f13-player-achievements`

Target: `FINAL_PRIVATE`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 3. F13 permanent product / architecture truth

Source audit proved `/dashboard/achievements` was only a `DashboardSectionPlaceholder`; no earlier F13/Achievements Issue, PR or branch existed.

Permanent boundary:

`private dashboard access policy → validated status/category/sort/page search → loader → typed PlayerAchievementsRepository → runtime-validated achievement projection → UI`

Backend/repository owns:
- achievement definitions;
- stable IDs/codes;
- category identity/membership/options;
- status `locked | in-progress | unlocked`;
- progress `current / target / percent` when present;
- unlock timestamp;
- summary, filtering, ordering and pagination.

Frontend owns only validated URL navigation, final Persian presentation, date formatting from supplied timezone, visual progress from authoritative percentage, responsive/accessibility behavior and deterministic QA fixture under the same contract.

Frontend MUST NOT derive/award achievements from local Match/Tournament/Challenge history or derive status from percentage.

F13 explicitly introduces no XP/points/coin economy, monetary rewards, trophy grade/rarity/population percentage, social comparison/friend behavior, claim/mutation flow, Achievement Detail URL, Challenge eligibility/rating inference or Challenge Hub mutation.

Validated URL state:
- `status=locked|in-progress|unlocked`; absence = all;
- `category=<stable-category-id>`;
- `sort=default|recent|progress`; absence = default;
- `page=<positive integer>`; absence = 1.

Required states: loading, populated, all-empty, filtered-empty/reset, error/retry, unauthenticated redirect and pagination.

## 4. F13 owned implementation scope

Exactly these implementation/governance files may change before closeout:
- `.github/workflows/frontend-quality.yml` for F13 SSR/browser/six-width evidence only;
- `PROJECT_CONTINUITY.md`;
- `docs/workstreams/F13_PLAYER_ACHIEVEMENTS.md`;
- `package.json` only to append F13 contract test;
- `src/components/dashboard/player-achievements-page.tsx`;
- `src/lib/player-achievements-contract.spec.ts`;
- `src/lib/player-achievements-contract.ts`;
- `src/lib/player-achievements-data.ts`;
- `src/lib/player-achievements-http-repository.ts`;
- `src/lib/player-achievements-repository.ts`;
- `src/routes/dashboard.achievements.tsx`.

No dependency additions/removals/version changes are permitted. No Challenge Hub/Detail files are owned.

Browser regression target is 84 PNGs: previous 78 plus F13 at `375 / 390 / 430 / 768 / 1024 / 1440`.

The first frontend candidate `126737d26c1f18b3e2026c79c611397510fa7741` passed frozen install, lint, build, typecheck, all contract checks and browser gate; artifact `10170483828`, digest `sha256:d5cdcdfb3239ff3225333eaa8fe0a9035dbd2dfe24914842eb255fd5d9288e28`, 84 PNGs. Manual visual QA at all six F13 widths passed. It is superseded because its committed governance snapshot still described backend PR #24 as open; it is not final acceptance evidence.

A transient uncommitted package blob with an accidental dependency-version change was rejected before any repository commit and never entered branch history.

## 5. Backend F13 cross-repo alignment — terminal

Repository: `sajadkhavas/turnoment-backend`

Backend START_SHA:
`e81b13a0de6936ded0879d4310eab3883a7556a6`

Terminal evidence:
- Issue `#23` — CLOSED / COMPLETED;
- docs branch `docs/f13-player-achievements-contract`;
- accepted docs head `f6d54a77370b268f1d240180d5eacda86d100dd8`;
- compare: ahead 1 / behind 0 / exactly one commit / exactly two Markdown files;
- PR `#24` — MERGED;
- PR Quality Gate `34521995236` — PASS on Python 3.12 and 3.14;
- mergeable before merge `true`;
- review threads before merge `0`;
- pre-merge backend main exact START_SHA;
- expected-head merge used;
- accepted backend main `ddfdceaa9746cc6a60ad2b5e18e630c53904f00c`;
- post-main Backend Quality Gate `34522798713` — PASS on Python 3.12 and 3.14;
- live backend main reverified exact accepted SHA.

Planned future endpoint:
`GET /api/v1/me/achievements/`

No Achievements Python/model/migration/serializer/view/URL runtime implementation was added. Runtime remains exactly `FRONTEND MOCK / BACKEND PENDING`.

Backend NEXT remains exactly `P02 — Games / Catalog Foundation`.

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
- F02 `/games/$slug` → `DONE / MERGED / FROZEN — FINAL_CURRENT`; Issue #29 contains terminal truth.
- F01 `/tournaments/$id` → `FINAL_PRE_SEO`; `/tournaments/$id/register` → `FINAL_PRIVATE`.

## 7. Permanent frontend law

Every accepted page is built once as final frontend architecture:

`Route → validated params/search → route access policy → loader → typed repository/service contract → runtime-validated data → UI`

Fixtures are development/test/visual-QA adapters only and must satisfy the permanent contract. Frontend is not authoritative for auth/session, lifecycle, eligibility, capacity, result/winner, rating, dispute, challenge, payment/refund/settlement, moderation or achievement-award truth.

## 8. Remaining known work

- `/dashboard/challenges` remains isolated under its own Challenge Hub workstream/Lovable acceptance chain.
- `/dashboard/achievements` is active F13 and non-final until terminal acceptance/closeout completes.
- `/dashboard/teams` remains a placeholder.
- `/`, `/tournaments`, `/games`, `/centers`, `/centers/$id`, `/ranking`, `/players/$username`, `/host`, `/rules` require current-law public recertification.
- inherited ecommerce/service/general routes remain `LEGACY_REVIEW` until explicit keep/remove/repurpose decisions.

## 9. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth;
- F13 introduces no new Challenge rule.

## 10. Exact NEXT

F13 frontend:
1. rebuild the branch from exact START_SHA as one clean final implementation commit with terminal backend evidence;
2. compare must prove only F13-owned files, one commit ahead / zero behind and no dependency/Challenge drift;
3. require exact-head Frontend Quality Gate PASS including 84-image regression;
4. manually inspect F13 at all six widths;
5. open implementation PR without auto-closing Issue #68;
6. require PR CI green, mergeable true, review threads 0 and exact pre-merge main lock;
7. expected-head merge;
8. require post-main Frontend Quality Gate/artifact/digest;
9. create documentation-only closeout from exact implementation merge;
10. require closeout PR CI + expected-head merge + terminal frozen-main Quality Gate/artifact/digest;
11. reverify exact live main;
12. record terminal evidence in Issue #68 and close completed;
13. only then report `F13 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
