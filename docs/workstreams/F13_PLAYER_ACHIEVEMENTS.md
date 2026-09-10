# F13 — Player Achievements Hub

Status: `MERGED / CLOSEOUT IN PROGRESS`

Route: `/dashboard/achievements`

Tracking Issue: `#68`

START_SHA: `a058de708c755d98e7180ffee616b50cbdd8598c`

Implementation branch: `phase/f13-player-achievements`

Final reviewed implementation head: `f3806f5403157a4d0ca97d51bf69ded2e9dcff53`

Implementation merge / closeout base: `638d3de4006372e8ec2604152a7523a10f39ea63`

Closeout branch: `closeout/f13-player-achievements`

Target: `FINAL_PRIVATE`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 1. Mandatory preflight and source audit

The F13 implementation was started only after reading:
- root `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- the existing `/dashboard/achievements` source;
- accepted private dashboard route/repository/QA patterns;
- backend continuity/completion/phase/contract/engineering rules for cross-repo ownership.

At START, `/dashboard/achievements` was only `DashboardSectionPlaceholder`; no earlier F13/Achievements Issue, PR or branch existed. Challenge Hub remained isolated and outside F13 ownership.

Current official TanStack Router/Start guidance for loaders, validated search/loaderDeps, document head/SSR and WCAG 2.2 semantics was reviewed. PlayStation/Steam achievement surfaces were used only as information-hierarchy references; no platform business rule, trophy grade, rarity, rewards or branding was copied.

## 2. Permanent product / architecture contract

F13 is a private read-only Achievements Hub.

Permanent boundary:

`private dashboard access policy → validated status/category/sort/page search → loader → typed PlayerAchievementsRepository → runtime-validated achievement projection → UI`

Backend/repository owns:
- achievement definition and stable `achievementId`/`code`;
- category identity/membership/options;
- status `locked | in-progress | unlocked`;
- progress `current / target / percent` when present;
- `unlockedAt` timestamp;
- summary, filtering, ordering and pagination.

Frontend owns:
- validated URL navigation state;
- final Persian labels/copy;
- formatting supplied timestamps in supplied timezone;
- visual progress from authoritative percentage;
- responsive/accessibility presentation;
- deterministic QA fixture under the same permanent repository contract.

F13 explicitly does NOT introduce:
- deriving/awarding achievements from Match/Tournament/Challenge history;
- deriving status from percentage;
- XP/points/coin economy or financial rewards;
- trophy grade/rarity/global population percentage;
- social comparison/friend behavior;
- achievement claim/mutation;
- Achievement Detail route/link;
- Challenge eligibility/rating inference;
- any mutation to `/dashboard/challenges`.

Validated search:
- `status=locked|in-progress|unlocked`; absence = all;
- `category=<stable-category-id>`;
- `sort=default|recent|progress`; absence = default;
- `page=<positive integer>`; absence = 1.

Required page states were delivered: loading, populated, all-empty, filtered-empty/reset, error/retry, unauthenticated redirect and pagination.

Private metadata is `noindex,nofollow`. Django Session remains authentication truth; the read adapter sends `credentials: include` and maps 401/403 to unauthenticated. No local bearer-token storage is introduced.

## 3. Runtime contract integrity

The runtime schema rejects:
- summary counts that do not partition total;
- impossible pagination or filtered count above total;
- duplicate category IDs, achievement IDs or codes;
- item categories absent from authoritative category options or mismatched labels;
- unlocked status without `unlockedAt`;
- non-unlocked status with `unlockedAt`;
- in-progress status without strict partial progress;
- unlocked progress that is not complete when progress is supplied.

The UI uses semantic status text plus icon/color and accessible progress semantics, so state meaning is not conveyed by color alone.

## 4. Backend cross-repo alignment — terminal documentation truth

Repository: `sajadkhavas/turnoment-backend`

- backend START_SHA: `e81b13a0de6936ded0879d4310eab3883a7556a6`
- Issue `#23` — CLOSED / COMPLETED
- docs head `f6d54a77370b268f1d240180d5eacda86d100dd8`
- PR `#24` — MERGED
- PR Quality Gate `34521995236` — PASS on Python 3.12 and 3.14
- accepted backend main `ddfdceaa9746cc6a60ad2b5e18e630c53904f00c`
- post-main Backend Quality Gate `34522798713` — PASS on Python 3.12 and 3.14
- future endpoint: `GET /api/v1/me/achievements/`
- runtime Achievements Python/model/migration/serializer/view/URL implementation: `NONE`
- Backend NEXT remains `P02 — Games / Catalog Foundation`

Thus runtime remains exactly `FRONTEND MOCK / BACKEND PENDING`.

## 5. Accepted implementation evidence

Clean implementation lineage:
- START_SHA: `a058de708c755d98e7180ffee616b50cbdd8598c`
- final head: `f3806f5403157a4d0ca97d51bf69ded2e9dcff53`
- compare: ahead 1 / behind 0 / exactly one commit
- 11 F13-owned changed files
- dependency/version drift: none; package change only appends F13 contract spec
- Challenge Hub/Detail change: none

Exact-head acceptance:
- Frontend Quality Gate `34523505639` — PASS
- artifact `10170747003`
- digest `sha256:7978de3b3170c82a720ff729beb001b29befb77480b1242e902c5bd2a968e2fd`
- frozen install/lint/build/route generation/typecheck/contracts/browser gate all PASS
- 84 screenshots
- manual F13 visual QA at `375 / 390 / 430 / 768 / 1024 / 1440` — PASS
- no horizontal overflow/clipping observed

Implementation PR:
- PR `#69`
- PR-context Frontend Quality Gate `34535849148` — PASS
- PR artifact `10175494769`
- PR digest `sha256:f01d446547c653892c364b125a8e69092ce7e9bd619b773cdc5be11533a7aa9c`
- mergeable before merge: true
- unresolved review threads before merge: 0
- pre-merge `main` exact START_SHA
- expected-head merge used
- implementation merge: `638d3de4006372e8ec2604152a7523a10f39ea63`

Post-implementation main acceptance:
- Frontend Quality Gate `34536367379` — PASS
- artifact `10175682558`
- digest `sha256:263e59b171afa14882c7b0e454dff927647128a33be0909147ebfd1ff25f9254`

A first candidate `126737d26c1f18b3e2026c79c611397510fa7741` was superseded because its governance text predated backend terminal closure. A transient uncommitted dependency-drift blob was rejected before branch history.

## 6. Closeout state

Because implementation is merged and post-main QA is green, `/dashboard/achievements` may now be promoted non-recursively to `FINAL_PRIVATE` in the route registry.

Closeout is documentation-only and must change exactly:
1. `PROJECT_CONTINUITY.md`
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`
3. `docs/workstreams/F13_PLAYER_ACHIEVEMENTS.md`
4. `docs/workstreams/F13_CLOSEOUT.md`

No runtime/application source, workflow, package/dependency, contract/adapter/fixture or Challenge file may change.

The workstream is still `MERGED / CLOSEOUT IN PROGRESS`, not terminally DONE. Per the non-recursive completion rule, this file intentionally does not attempt to record the future closeout merge SHA or terminal frozen-main run/artifact/digest.

## 7. Exact NEXT

1. prove closeout compare is ahead 1 / behind 0 / exactly one commit and exactly four Markdown files;
2. open closeout PR without auto-closing Issue #68;
3. require full PR-context Frontend Quality Gate PASS;
4. require mergeable true and unresolved review threads 0;
5. reverify pre-merge `main` exact implementation merge `638d3de4006372e8ec2604152a7523a10f39ea63`;
6. merge closeout with expected-head lock;
7. require terminal frozen-main Frontend Quality Gate PASS and capture artifact/digest;
8. reverify live `main` exact closeout merge SHA;
9. record terminal closeout SHA/CI/artifact/digest in Issue #68 and close it `completed`;
10. only then report `F13 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.
