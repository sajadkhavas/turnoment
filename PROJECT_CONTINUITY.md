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
5. verify exact current `main` SHA of every repository it will change;
6. read the relevant Issue/PR/workstream evidence before repeating work;
7. use a dedicated branch;
8. never claim `DONE / MERGED / FROZEN` from chat memory alone;
9. record exact branch/SHA/PR/CI/artifact evidence;
10. update both repositories when a cross-repo contract/global product truth changes;
11. preserve frozen routes outside the active workstream unless a separately authorized regression fix is required;
12. keep production fail-closed: deterministic fixture data is dev/test/visual-QA only unless a route-specific law explicitly says otherwise.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `READY TO MERGE`, `MERGED / CLOSEOUT IN PROGRESS`, `DONE / MERGED / FROZEN`.

## 2. Current accepted frontend main

Repository: `sajadkhavas/turnoment`

Current accepted/frozen `main` before F18:

`73955783add94c562f4eea0bb55300aab077c342`

This is the terminal F17 closeout merge/frozen-main SHA.

F17 `/tournaments` terminal truth:
- status `DONE / MERGED / FROZEN — FINAL_CURRENT`;
- Issue `#84` — CLOSED / COMPLETED;
- implementation PR `#87` — MERGED;
- implementation merge `22e4c67425f2bf0cefe9079b2e014c2395f6448a`;
- closeout PR `#88` — MERGED;
- frozen main `73955783add94c562f4eea0bb55300aab077c342`;
- terminal Frontend Quality Gate `34618556371` — PASS, artifact `10271498535`, digest `sha256:100caa7b4d63f2135008cb0295e5ffdeac55b0b944863731acb34f90f9a0891c`;
- terminal F17 focused gate `34618556522` — PASS, artifact `10271735232`, digest `sha256:a6b549f6bbbd84f0ad46601a6a6fe0077109fd6ef73baf18c633a4a229920aa8`;
- F16 regression gate `34618556647` — PASS, artifact `10271990013`, digest `sha256:63e654bcd5a11972b770a746eccba9b08cc243800df78e25ee9a97ef7215c30e`.

Terminal F17 evidence is recorded non-recursively in Issue #84. Do not rebuild F17 from memory.

## 3. Active frontend workstream — F18

Workstream:

`F18 — Public Game Catalog`

Route:

`/games`

Tracking Issue:

`#89` — OPEN

START_SHA:

`73955783add94c562f4eea0bb55300aab077c342`

Implementation branch:

`phase/f18-public-game-catalog`

Current workstream status:

`IN PROGRESS — IMPLEMENTATION QA`

Target:

`FINAL_CURRENT`

Workstream record:

`docs/workstreams/F18_PUBLIC_GAME_CATALOG.md`

Frozen dependency:

`/games/$slug` = F02 `FINAL_CURRENT`; F18 must not mutate F02 source/contract/workflow/docs unless a separately authorized regression fix is required.

## 4. F18 baseline problem and permanent boundary

START_SHA `/games` problems:
- direct `popularGames` / `allTournaments` fixture imports;
- frontend-derived tournament counts;
- no route loader/repository/runtime-validation contract;
- no production HTTP adapter/fail-closed behavior;
- no final loading/error/empty states;
- legacy `ایران مهر افزار` metadata;
- no current SEO/final-copy evidence chain.

Permanent F18 boundary:

`/games → SSR loader → typed GameCatalogRepository → runtime-validated catalog projection → Game Catalog UI`

Repository/backend owns:
- published catalog membership and ordering;
- stable game ID and canonical slug;
- authoritative game name/short name/platform labels;
- game-entity catalog summary/image;
- optional tournament-count projection when authoritative.

Frontend owns:
- final page-level Persian copy and information hierarchy;
- presentation/accessibility/responsive behavior;
- canonical/robots metadata;
- crawlable links to canonical game-detail and tournament-discovery routes;
- deterministic fixture repository for dev/test/visual QA only.

Frontend MUST NOT derive production catalog membership, canonical identity or tournament counts from local tournament arrays.

## 5. F18 runtime / API truth

Planned production endpoint:

`GET /api/v1/games/`

Current integration truth:

`FRONTEND MOCK / BACKEND PENDING`

Production behavior:
- uses the Django HTTP repository;
- requires `VITE_API_BASE_URL`;
- runtime-validates JSON with strict Zod contract;
- fails closed on missing base URL, HTTP failure or invalid payload;
- MUST NOT silently fall back to fixture games.

The list identity is required to stay compatible with frozen F02 planned detail endpoint:

`GET /api/v1/games/{slug}/`

## 6. F18 implementation checkpoint

Initial implementation commit:

`3675581bda3f97ca8d3cb49921c66e1e14240c5e`

Package test-suite wiring:
- `f04ed182edb934a02f27a1ccf81059192aef9363` appended F18 contract testing but accidentally changed one existing devDependency version;
- `0b625d6554b0f5e5f638e449b18c3154d8e6ecf5` immediately restored the exact baseline dependency while retaining the F18 test addition;
- cumulative compare from START through `0b625d...` confirms `package.json` has only the intended global-test command replacement and no dependency/version/lockfile delta.

Workstream documentation commit:

`2233901ac54cc81d64a5cac6041a91ced43b81f5`

Implementation includes:
- strict `GameCatalogPageData` / game-item Zod contract;
- `GameCatalogRepository`;
- deterministic mock repository;
- fail-closed Django HTTP repository;
- SSR loader;
- final pending/error/empty states;
- final Turnoment H1/title/meta/canonical/robots copy;
- links to frozen `/games/$slug` canonical slugs;
- stable-game-ID links into `/tournaments`;
- focused F18 contract/build/typecheck/SSR/SEO/navigation/six-width QA workflow;
- F18 contract added to normal repository test suite.

No F02 `/games/$slug` file is authorized in the F18 implementation diff.

## 7. F18 SEO / final-copy truth

Final H1:

`بازی‌های مسابقات گیمینگ`

Final title:

`بازی‌های مسابقات گیمینگ حضوری | Turnoment`

Indexing:
- canonical `/games`;
- robots `index,follow`;
- primary catalog content SSR-rendered;
- no unsupported route-specific rich-result schema on this multi-entity catalog.

Search-intent boundary:
- `/games` = public game catalog;
- `/games/$slug` = one game's competitive hub;
- `/tournaments` = tournament inventory/filtering;
- `/centers` = gaming-center discovery;
- `/ranking` = player ranking intent.

No invented popularity/search-volume/ranking/prize/viewership/superlative claim is authorized.

## 8. Backend alignment truth

Backend repository:

`sajadkhavas/turnoment-backend`

Backend main locked at F18 start:

`a5644ae4b4e64908088f389e43155c268fe6e29d`

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

F18 frontend work does not itself make `GET /api/v1/games/` live and MUST NOT reorder backend phases. Any backend contract alignment is documentation-only until P02 implements/permission-tests the owning games/catalog runtime.

## 9. Previous accepted frontend truth

F01–F17 remain accepted according to their route/workstream records. In particular:
- F16 `/` = `DONE / MERGED / FROZEN — FINAL_CURRENT`;
- F17 `/tournaments` = `DONE / MERGED / FROZEN — FINAL_CURRENT`;
- F02 `/games/$slug` = `FINAL_CURRENT` and frozen;
- private account/dashboard/match workstreams retain their recorded `FINAL_PRIVATE` truth;
- `/tournaments/$id` remains `FINAL_PRE_SEO` pending a later limited current-law recertification.

Do not reopen frozen routes from chat memory.

## 10. Exact F18 acceptance chain

F18 is not `DONE` merely because code exists.

Required chain:
1. settle the exact implementation head;
2. exact-head normal Frontend Quality Gate + focused F18 gate PASS;
3. retain exact artifact IDs/digests and manually inspect focused six-width visual evidence;
4. verify final compare and frozen-route protection;
5. open implementation PR without auto-closing Issue #89;
6. require PR-context normal + focused F18 gates PASS;
7. require mergeable=true, unresolved review threads=0 and exact pre-merge `main` lock;
8. expected-head implementation merge;
9. require post-main normal + focused F18 QA PASS;
10. create documentation-only closeout under the non-recursive rule;
11. merge closeout only after its PR-context gates are green;
12. require terminal frozen-main normal + focused F18 QA/artifacts/digests;
13. reverify exact live `main`;
14. record terminal SHA/CI/artifact evidence in Issue #89 and close it `completed`;
15. only then report `DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 11. Public-route NEXT after F18

After F18 terminal freeze, current-law order remains:

`/centers` → `/centers/$id` → `/ranking` → `/players/$username` → `/host` → `/rules`

unless an explicit product decision changes that order.

Legacy commerce/service/general-content routes remain `LEGACY_REVIEW` pending explicit product decision.
