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

Current frozen main / F12 START_SHA:

`47ea1ed9bda2a788860f382bc75ea50a83efaaf3`

That SHA is the terminal F11 closeout merge. Terminal Frontend Quality Gate `34482788767` passed and terminal artifact `10154473010` has digest `sha256:6a77a9dbcf8cab8cad5c3a9bd4507ef31011d56c5f4b1b69c4368a64970f412c`. F11 Issue `#62` is CLOSED / COMPLETED.

Active frontend workstream:

`F12 — Player Rivalries Hub`

Status:

`IN PROGRESS — IMPLEMENTATION / EXACT-HEAD QA`

Route: `/dashboard/rivalries`

Tracking Issue: `#65`

Implementation branch: `phase/f12-player-rivalries`

Target: `FINAL_PRIVATE`

Runtime truth:

`FRONTEND MOCK / BACKEND PENDING`

## 3. F12 product / architecture truth

Source audit found `/dashboard/rivalries` was only a `DashboardSectionPlaceholder`; no previous F12 implementation Issue/branch existed.

Mandatory rules and current TanStack Router data-loading/search/head guidance plus WCAG 2.2 were reviewed. Private-page public SEO research is not applicable; explicit `noindex,nofollow`, final natural copy, accessibility and responsive QA remain mandatory.

Design masters are the accepted DashboardShell and F04/F10/F11 private dashboard pages. Challenge Hub remains isolated.

Bounded F12 scope:
- private read-only Rivalries Hub;
- rivalry row is backend/repository-defined, not frontend-generated from raw Match history;
- one rivalry projection represents a current-player/opponent/game relationship with at least one finalized valid encounter;
- backend/repository owns rivalry membership, stable IDs, head-to-head aggregate counts, latest finalized encounter, filters, ordering, summary and pagination;
- only finalized valid non-void encounters contribute;
- no friend/block/social graph behavior;
- no wager/betting/stake behavior;
- no Challenge eligibility/rating inference;
- no Rivalry Detail route/link is invented in F12;
- `/dashboard/challenges` MUST NOT be modified.

Permanent boundary:

`private dashboard access policy → validated game/kind/sort/page search → loader → typed PlayerRivalriesRepository → runtime-validated rivalry projection → UI`

Validated URL state:
- `kind=player|team`; absence = all;
- `game=<stable-game-id>`;
- `sort=recent|most-played`; absence = recent;
- `page=<positive integer>`; absence = 1.

Required states: loading, populated, all-empty, filtered-empty/reset, error/retry, unauthenticated redirect and pagination.

## 4. F12 implementation scope

Owned files:
- `src/routes/dashboard.rivalries.tsx`;
- `src/components/dashboard/player-rivalries-page.tsx`;
- `src/lib/player-rivalries-contract.ts`;
- `src/lib/player-rivalries-data.ts`;
- `src/lib/player-rivalries-http-repository.ts`;
- `src/lib/player-rivalries-repository.ts`;
- `src/lib/player-rivalries-contract.spec.ts`;
- `.github/workflows/frontend-quality.yml` only for F12 smoke/responsive evidence;
- `package.json` only to append F12 contract test;
- `docs/workstreams/F12_PLAYER_RIVALRIES.md`;
- this continuity file.

No dependency versions/additions/removals are permitted. No Challenge Hub/Detail file is owned.

Browser gate target: 78 screenshots total, adding F12 at `375 / 390 / 430 / 768 / 1024 / 1440`.

The first implementation candidate `93fc626fbb99cdd00b7a5e9ae71bb3eabc1611fd` successfully passed frozen install, lint, production build, typecheck and contract checks while its browser gate was running, but it is not the final accepted head because its workstream/continuity evidence still described Backend PR #22 as open. The implementation branch is being rebuilt from the same F12 START_SHA into one clean final commit with terminal backend evidence. Superseded candidate SHAs are not acceptance evidence.

## 5. Backend F12 cross-repo alignment — terminal

Repository: `sajadkhavas/turnoment-backend`

Backend START_SHA:
`3fb421cf2c85d94753ddf9352d8bc1134358847a`

Backend tracking:
- Issue `#21` — CLOSED / COMPLETED;
- branch `docs/f12-player-rivalries-contract`;
- accepted docs head `01ebe3832642799e5a040cf3420a47819d518078`;
- compare: ahead 1 / behind 0 / exactly one commit / exactly two Markdown files;
- PR `#22` — MERGED;
- PR Quality Gate `34516235451` — PASS on Python 3.12 and 3.14;
- mergeable before merge `true`;
- unresolved review threads before merge `0`;
- pre-merge backend main exact START_SHA;
- expected-head merge used;
- accepted backend merge/main `e81b13a0de6936ded0879d4310eab3883a7556a6`;
- post-main Backend Quality Gate `34516995711` — PASS on Python 3.12 and 3.14;
- live backend main reverified exact accepted SHA.

Planned future endpoint:
`GET /api/v1/me/rivalries/`

No Python/models/migrations/serializers/views/URLs/dependencies/phase-registry implementation was added. Runtime remains exactly `FRONTEND MOCK / BACKEND PENDING`.

Backend NEXT remains:
`P02 — Games / Catalog Foundation`.

## 6. Previously frozen frontend truth

- F11 `/dashboard/settings` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `47ea1ed9bda2a788860f382bc75ea50a83efaaf3`; terminal gate `34482788767` PASS; artifact `10154473010`; Issue #62 completed.
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

Fixtures are development/test/visual-QA adapters only and must satisfy the same permanent contract. Frontend is not authoritative for auth/session, lifecycle, eligibility, capacity, result/winner, rating, dispute, challenge, payment/refund/settlement or moderation truth.

## 8. Remaining known work

- `/dashboard/challenges` remains isolated under its own Challenge Hub workstream/Lovable acceptance chain.
- `/dashboard/rivalries` is active F12 and is not final until the terminal acceptance/closeout chain completes.
- `/dashboard/achievements`, `/dashboard/teams` remain explicit placeholders.
- `/`, `/tournaments`, `/games`, `/centers`, `/centers/$id`, `/ranking`, `/players/$username`, `/host`, `/rules` require current-law public recertification.
- inherited ecommerce/service/general routes remain `LEGACY_REVIEW` until explicit keep/remove/repurpose decisions.

## 9. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## 10. Exact NEXT

F12 frontend:
1. publish one clean final implementation commit from exact START_SHA with terminal backend evidence;
2. compare must prove only F12-owned files, one commit ahead/zero behind, and no dependency drift;
3. require exact-head Frontend Quality Gate PASS including F12 contract test and 78-image browser gate;
4. manually inspect F12 at all six standard widths;
5. open frontend implementation PR without auto-closing Issue #65;
6. require PR CI green, mergeable true, review threads 0 and exact pre-merge main lock;
7. expected-head implementation merge;
8. require post-main Frontend Quality Gate/artifact/digest;
9. create documentation-only closeout from exact implementation merge;
10. require closeout PR CI, expected-head merge and terminal frozen-main Quality Gate/artifact/digest;
11. reverify exact live main;
12. only then record terminal evidence in Issue #65 and close completed;
13. only then report `F12 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
