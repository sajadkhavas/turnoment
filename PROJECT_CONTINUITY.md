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

F12 START_SHA / previous frozen main:

`47ea1ed9bda2a788860f382bc75ea50a83efaaf3`

Current implementation main / closeout base:

`0188324915160f5c6b751b831d394228688cc3f2`

Active workstream:

`F12 — Player Rivalries Hub`

Route: `/dashboard/rivalries`

Tracking Issue: `#65`

Status:

`MERGED / CLOSEOUT IN PROGRESS`

Target route status: `FINAL_PRIVATE`

Runtime truth:

`FRONTEND MOCK / BACKEND PENDING`

Closeout branch:

`closeout/f12-player-rivalries`

The route implementation is accepted on main and may be promoted non-recursively to `FINAL_PRIVATE` in the registry. The workstream itself is NOT terminally `DONE / MERGED / FROZEN` until the documentation-only closeout is merged and the terminal frozen-main Quality Gate/artifact/digest plus exact-main verification are recorded in Issue #65.

## 3. F12 product / architecture truth

F12 replaced the old `/dashboard/rivalries` placeholder with a private read-only Rivalries Hub.

Permanent boundary:

`private dashboard access policy → validated game/kind/sort/page search → loader → typed PlayerRivalriesRepository → runtime-validated rivalry projection → UI`

Authoritative ownership:
- backend/repository owns current-player rivalry membership and stable `rivalryId`;
- backend/repository owns stable opponent/game identity;
- backend/repository owns finalized-valid head-to-head totals, player wins, opponent wins, draws and rivalry edge;
- backend/repository owns latest finalized-valid encounter, score/outcome, summary, filters, ordering and pagination;
- frontend MUST NOT build authoritative rivalry rows by grouping raw Match history;
- only finalized valid non-void encounters contribute to the contract;
- no friend/block/social graph behavior;
- no wager/betting/stake behavior;
- no Challenge eligibility/rating inference;
- no Rivalry Detail route/link is invented by F12;
- `/dashboard/challenges` remains isolated and was not modified.

Validated URL state:
- `kind=player|team`; absence means all;
- `game=<stable-game-id>`;
- `sort=recent|most-played`; absence means recent;
- `page=<positive integer>`; absence means page 1.

Accepted states include loading, populated, all-empty, filtered-empty/reset, error/retry, unauthenticated redirect and pagination.

## 4. F12 frontend implementation evidence

Implementation branch:
`phase/f12-player-rivalries`

Superseded candidate:
`93fc626fbb99cdd00b7a5e9ae71bb3eabc1611fd` — not acceptance evidence.

Accepted clean implementation head:
`27fa3bc599923e8e9687197bd9e153748ebe565b`

START-to-head compare:
- ahead 1 / behind 0;
- exactly one implementation commit;
- exactly 11 F12-owned changed files;
- no dependency additions/removals/version drift;
- `package.json` only appends the F12 contract spec to the existing test chain;
- Challenge Hub/Detail files untouched.

Exact-head Frontend Quality Gate:
`34517344762` — PASS.

Exact-head artifact:
- artifact `10168354098`;
- name `browser-qa-27fa3bc599923e8e9687197bd9e153748ebe565b`;
- digest `sha256:19d74e5219500f0e952820a039441f6603e475fbc1aba0bb897f9ed534e3f694`;
- 78 PNG screenshots total;
- F12 manual visual QA at `375 / 390 / 430 / 768 / 1024 / 1440` PASS with no horizontal overflow/clipping.

Implementation PR:
- PR `#66` — MERGED;
- PR-context Frontend Quality Gate `34517973585` — PASS;
- mergeable immediately before merge `true`;
- unresolved review threads `0`;
- pre-merge main reverified exact START_SHA;
- expected-head merge used with accepted head `27fa3bc599923e8e9687197bd9e153748ebe565b`.

Accepted implementation merge/main:

`0188324915160f5c6b751b831d394228688cc3f2`

Post-implementation main evidence:
- Frontend Quality Gate `34518845218` — PASS;
- frozen install, lint, production build/route generation, typecheck, contract checks, browser smoke/responsive screenshots and artifact upload all PASS;
- artifact `10168931114`;
- artifact name `browser-qa-0188324915160f5c6b751b831d394228688cc3f2`;
- digest `sha256:250fa6ba63d84efc93af8e82bd2259f3b32c9cffb45d09f35285fc6e315fbf60`;
- artifact head exact implementation main;
- live frontend main reverified exact implementation merge before closeout branch creation.

## 5. Backend F12 cross-repo alignment — terminal documentation truth

Repository: `sajadkhavas/turnoment-backend`

Backend START_SHA:
`3fb421cf2c85d94753ddf9352d8bc1134358847a`

Backend tracking:
- Issue `#21` — CLOSED / COMPLETED;
- branch `docs/f12-player-rivalries-contract`;
- accepted docs head `01ebe3832642799e5a040cf3420a47819d518078`;
- compare ahead 1 / behind 0 / exactly one commit / exactly two Markdown files;
- PR `#22` — MERGED;
- PR Quality Gate `34516235451` — PASS on Python 3.12 and 3.14;
- accepted backend merge/main `e81b13a0de6936ded0879d4310eab3883a7556a6`;
- post-main Backend Quality Gate `34516995711` — PASS on Python 3.12 and 3.14;
- live backend main reverified exact accepted SHA.

Planned future endpoint:
`GET /api/v1/me/rivalries/`

No Python/models/migrations/serializers/views/URLs/dependencies/phase-registry implementation was added. Runtime remains exactly `FRONTEND MOCK / BACKEND PENDING`.

Backend NEXT remains:
`P02 — Games / Catalog Foundation`.

## 6. F12 documentation-only closeout law

Closeout base is exact implementation main:
`0188324915160f5c6b751b831d394228688cc3f2`.

Closeout branch:
`closeout/f12-player-rivalries`.

Permitted closeout diff is exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F12_PLAYER_RIVALRIES.md`;
4. `docs/workstreams/F12_CLOSEOUT.md`.

No application/runtime source, workflow, package/dependency, contract/adapter/fixture or Challenge Hub/Detail changes are permitted in closeout.

Non-recursive rule: these committed closeout documents record implementation/post-main truth and the intended closeout protocol, but MUST NOT pretend to know their own later merge SHA, terminal frozen-main run, terminal artifact or digest. Those facts belong in tracking Issue #65 after they actually exist.

## 7. Previously frozen frontend truth

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

## 8. Remaining known work

- `/dashboard/rivalries` implementation is accepted `FINAL_PRIVATE`; only F12 governance/terminal closeout remains active.
- `/dashboard/challenges` remains isolated under its own Challenge Hub workstream/Lovable acceptance chain.
- `/dashboard/achievements`, `/dashboard/teams` remain explicit placeholders.
- `/`, `/tournaments`, `/games`, `/centers`, `/centers/$id`, `/ranking`, `/players/$username`, `/host`, `/rules` require current-law public recertification.
- inherited ecommerce/service/general routes remain `LEGACY_REVIEW` until explicit keep/remove/repurpose decisions.

## 9. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## 10. Exact NEXT

F12 frontend closeout:
1. commit exactly the four Markdown closeout files from implementation main;
2. compare must prove ahead 1 / behind 0 / exactly one docs-only commit and exactly four Markdown files;
3. open closeout PR without auto-closing Issue #65;
4. require closeout PR Frontend Quality Gate PASS;
5. require mergeable true, review threads 0 and pre-merge main exact implementation merge;
6. merge with expected-head lock;
7. require terminal frozen-main Frontend Quality Gate PASS and artifact/digest;
8. reverify live main exact frozen-main closeout merge;
9. record the later closeout merge SHA and terminal evidence only in Issue #65;
10. close Issue #65 with state reason `completed`;
11. only then report `F12 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.

After F12 terminal closure, the next independent placeholder should be selected explicitly from `/dashboard/achievements` or `/dashboard/teams` unless product priority selects another controlled workstream. Challenge Hub remains isolated.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
