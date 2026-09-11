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

Current terminal frozen `main` before F19:

`41bdbb90f127474ecabd61cb5ceda5db1b91ae49`

This is the terminal F18 closeout merge/frozen-main SHA.

F18 `/games` terminal truth:
- status `DONE / MERGED / FROZEN — FINAL_CURRENT`;
- Issue `#89` — CLOSED / COMPLETED;
- implementation PR `#90` — MERGED;
- implementation merge `112c3bbd2df7ca3988c81efa4dfb6ad569f621c2`;
- closeout PR `#91` — MERGED;
- frozen main `41bdbb90f127474ecabd61cb5ceda5db1b91ae49`;
- terminal Frontend Quality Gate `34633797889` — PASS, artifact `10276883583`, digest `sha256:c744532c931fde55fdc27c66b0f8c8eb5d7ea1de1ec2329ddb01ca21f5471826`;
- terminal focused F18 gate `34633797871` — PASS, artifact `10276653827`, digest `sha256:1a2de3b501d690cc72faf1c1f1238daa0a71647a7f1d131bb30b9668619180da`;
- terminal F17 regression `34633797847` — PASS;
- terminal F16 regression `34633797947` — PASS.

Terminal F18 evidence is recorded non-recursively in Issue #89. Do not rebuild F18 from memory.

## 3. Active frontend workstream — F19

Workstream:

`F19 — Public Gaming Center Discovery`

Route:

`/centers`

Tracking Issue:

`#92` — OPEN

START_SHA:

`41bdbb90f127474ecabd61cb5ceda5db1b91ae49`

Implementation branch:

`phase/f19-public-gaming-center-discovery`

Current workstream status:

`IN PROGRESS — IMPLEMENTATION QA`

Target:

`FINAL_CURRENT`

Workstream record:

`docs/workstreams/F19_PUBLIC_GAMING_CENTER_DISCOVERY.md`

Protected route boundary:

`/centers/$id` remains a separate `NEEDS_RECERTIFICATION` route and must not be changed by F19 unless a separately authorized regression fix is required.

Frozen dependencies outside F19 include F16 `/`, F17 `/tournaments`, F18 `/games` and F02 `/games/$slug`.

## 4. F19 baseline problem and permanent boundary

START_SHA `/centers` problems:
- direct local `gamingCenters` fixture import;
- browser-owned center membership/order;
- local verification/equipment/rating/review/upcoming-count truth;
- no loader/repository/runtime-validation boundary;
- no production HTTP adapter/fail-closed behavior;
- no final loading/error/empty model;
- legacy `ایران مهر افزار` metadata;
- no current SEO/final-copy evidence chain.

Permanent F19 boundary:

`validated URL search → loaderDeps → SSR loader → typed GamingCenterDiscoveryRepository → runtime-validated directory projection → Gaming Center Discovery UI`

Repository/backend owns:
- published center membership/order;
- stable center ID and public navigation-key projection;
- verification state;
- stable city identity/slug and district;
- center summary/equipment/cover;
- nullable authoritative upcoming-tournament count;
- city facets/counts/filtering;
- pagination.

Frontend owns:
- safe `city` / `page` URL normalization;
- final Persian page copy/information hierarchy;
- presentation/accessibility/responsive behavior;
- canonical/robots policy;
- deterministic fixture repository for dev/test/visual QA only.

Frontend MUST NOT derive production directory truth from local arrays.

## 5. F19 runtime / API truth

Planned production endpoint:

`GET /api/v1/centers/`

Optional query parameters:
- `city=<stable-city-slug>`;
- `page=<positive-integer>`.

Current integration truth:

`FRONTEND MOCK / BACKEND PENDING`

Production behavior:
- uses the Django HTTP repository;
- requires `VITE_API_BASE_URL`;
- runtime-validates JSON with strict Zod contract;
- fails closed on missing base URL, HTTP failure or invalid payload;
- MUST NOT silently fall back to fixture centers.

Rating/review fields are intentionally absent from F19 v1 because no accepted authoritative backend ratings domain exists yet.

## 6. F19 search / SEO / final-copy truth

Final H1:

`گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات`

Final title:

`گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات | Turnoment`

Final meta description:

`گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات را بر اساس شهر پیدا کن، امکانات و وضعیت تأیید هر مرکز را ببین و مسیر مسابقات حضوری را دنبال کن.`

Indexing:
- base canonical `/centers`;
- base robots `index,follow`;
- current city/page variants `noindex,follow` + canonical `/centers`;
- primary directory inventory SSR-rendered;
- no LocalBusiness structured data on the multi-entity listing.

Intent boundary:
- `/centers` = center directory/discovery;
- `/centers/$id` = one center detail/local entity;
- `/tournaments` = tournament inventory/filtering;
- `/games` = game catalog;
- `/host` = center-owner acquisition.

No invented popularity/search-volume/rating/review/superlative claim is authorized.

## 7. F19 implementation checkpoint

Initial implementation commit:

`36376d8b9590deed5ba779b9ad6be312f98b06bc`

Package wiring:
- `3ba1965132fb98278ff13776c216c29d4d9067fb` added the F19 spec but accidentally changed one existing devDependency;
- `aa61013b3b938b551e83dda0de8cfdce26dc7b30` immediately restored the exact baseline dependency while retaining the F19 test addition.

Cumulative compare through `aa61013...`:
- ahead `3` / behind `0`;
- `package.json` final diff only appends `gaming-center-discovery-contract.spec.ts` to the existing test chain;
- no dependency/version drift;
- no lockfile mutation;
- no frozen F16/F17/F18/F02 source mutation;
- no `/centers/$id` mutation.

Implemented:
- strict Gaming Center Discovery Zod contract;
- repository interface;
- deterministic QA fixture repository;
- fail-closed Django HTTP repository;
- validated/shareable `city` + `page` state;
- SSR loader;
- dedicated F19 center card/page;
- no listing rating/review claims;
- pending/error/empty/pagination states;
- final Turnoment copy/head/canonical/robots;
- focused F19 quality workflow;
- full-suite contract wiring.

Initial focused QA on `aa61013...`:
- run `34641090727` — PASS;
- artifact `10280755017`;
- digest `sha256:21d3059799bf8e0a3973aff77dc3d46fcaf182146e82a1272d63ad982e4bd1a2`;
- base + Tehran-filtered screenshots at `375 / 390 / 430 / 768 / 1024 / 1440` manually inspected PASS; no observed horizontal overflow, clipping or overlap.

Normal Frontend Quality Gate `34641090728` was started on the same pre-documentation head. Final acceptance requires fresh exact-head normal + focused F19 gates after the documentation checkpoint settles the reviewed branch head.

## 8. Backend alignment truth

Backend repository:

`sajadkhavas/turnoment-backend`

Backend main locked at F19 alignment start:

`b0fc9ed73dc57aed6a28453745386489aaef0ceb`

Backend F19 docs alignment:
- Issue `#35` — OPEN;
- branch `docs/f19-public-gaming-center-discovery-contract`;
- docs head `7f2663fa649df9b17bd2d5282e497954cb277359`;
- compare ahead 1 / behind 0 / exactly two Markdown files;
- PR `#36` — OPEN at this checkpoint;
- no runtime Python/model/migration/serializer/view/URL/settings/dependency/workflow/phase-registry implementation added.

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

F19 frontend work does not make `GET /api/v1/centers/` live and MUST NOT reorder backend phases.

## 9. Previous accepted frontend truth

F01–F18 retain their accepted route/workstream truth. In particular:
- F16 `/` = `DONE / MERGED / FROZEN — FINAL_CURRENT`;
- F17 `/tournaments` = `DONE / MERGED / FROZEN — FINAL_CURRENT`;
- F18 `/games` = `DONE / MERGED / FROZEN — FINAL_CURRENT`;
- F02 `/games/$slug` = `FINAL_CURRENT` and frozen;
- `/tournaments/$id` remains `FINAL_PRE_SEO` pending a later limited current-law recertification;
- private account/dashboard/match routes retain their recorded `FINAL_PRIVATE` truth.

Do not reopen frozen routes from chat memory.

## 10. Exact F19 acceptance chain

F19 is not `DONE` merely because code exists.

Required chain:
1. settle exact reviewed implementation head after this governance checkpoint;
2. exact-head normal Frontend Quality Gate + focused F19 gate PASS;
3. retain exact artifact IDs/digests and manually inspect final focused responsive evidence;
4. verify final compare and frozen-route protection;
5. finish documentation-only backend contract alignment without phase reordering;
6. open implementation PR without auto-closing Issue #92;
7. require PR-context normal + focused F19 + triggered frozen-route regression gates PASS;
8. require mergeable=true, unresolved review threads=0 and exact pre-merge `main` lock;
9. expected-head implementation merge;
10. require post-main normal + focused F19 QA PASS;
11. create documentation-only closeout under the non-recursive rule;
12. merge closeout only after its PR-context gates are green;
13. require terminal frozen-main normal + focused F19 QA/artifacts/digests;
14. reverify exact live `main`;
15. record terminal SHA/CI/artifact evidence in Issue #92 and close it `completed`;
16. only then report `DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 11. Public-route NEXT after F19

After F19 terminal freeze, current-law order remains:

`/centers/$id` → `/ranking` → `/players/$username` → `/host` → `/rules`

unless an explicit product decision changes that order.

Legacy commerce/service/general-content routes remain `LEGACY_REVIEW` pending explicit product decision.
