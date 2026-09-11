# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-12`

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

## 2. Current frontend main / freeze truth

Repository: `sajadkhavas/turnoment`

Current live frontend `main` at F19 closeout creation:

`b3d6360af21c1c86a06a95cdbe20ac30ac42c84c`

This is the accepted F19 implementation merge/main SHA. It is **not yet the terminal F19 frozen-main SHA** because the documentation-only closeout has not yet merged.

Last terminally frozen frontend baseline before F19 remains:

`41bdbb90f127474ecabd61cb5ceda5db1b91ae49`

That SHA is the terminal F18 closeout merge/frozen-main evidence recorded in Issue #89.

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

Final reviewed implementation head:

`79c084611fb6dbe3617ba9a58f100934b9272587`

Implementation PR:

`#93` — MERGED

Implementation merge / accepted main:

`b3d6360af21c1c86a06a95cdbe20ac30ac42c84c`

Closeout branch:

`closeout/f19-public-gaming-center-discovery`

Current workstream status:

`MERGED / CLOSEOUT IN PROGRESS`

Route-level status after accepted implementation + post-main QA:

`FINAL_CURRENT`

Important non-recursive distinction: route-level promotion is now justified, but the F19 workstream itself is not terminal `DONE / MERGED / FROZEN` until closeout merge + terminal frozen-main CI/artifact evidence exist and Issue #92 is closed `completed`.

Protected route boundary:

`/centers/$id` remains a separate `NEEDS_RECERTIFICATION` route and must not be changed by F19 closeout.

Frozen dependencies outside F19 include F16 `/`, F17 `/tournaments`, F18 `/games` and F02 `/games/$slug`.

## 4. Accepted F19 permanent boundary

F19 replaced the START_SHA browser-owned/local fixture directory with:

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

Production MUST NOT derive directory truth from local arrays and MUST NOT silently fall back to fixture data.

## 5. F19 runtime / API truth

Planned production endpoint:

`GET /api/v1/centers/`

Optional query parameters:
- `city=<stable-city-slug>`;
- `page=<positive-integer>`.

Current integration truth remains exactly:

`FRONTEND MOCK / BACKEND PENDING`

Production behavior:
- uses the Django HTTP repository;
- requires `VITE_API_BASE_URL`;
- runtime-validates JSON with strict Zod contract;
- fails closed on missing base URL, HTTP failure or invalid payload;
- never silently falls back to fixture centers.

Rating/review fields remain intentionally absent from F19 v1 because no accepted authoritative backend ratings domain exists yet.

## 6. F19 SEO / final-copy truth

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
- no `LocalBusiness` structured data on the multi-entity listing.

Intent boundary:
- `/centers` = center directory/discovery;
- `/centers/$id` = one center detail/local entity;
- `/tournaments` = tournament inventory/filtering;
- `/games` = game catalog;
- `/host` = center-owner acquisition.

No unsupported popularity/search-volume/rating/review/superlative claim is authorized.

## 7. Exact F19 implementation evidence

Final compare from START to reviewed implementation head:
- ahead `4` / behind `0`;
- `12` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- `package.json` final delta only appends the F19 contract spec to the existing full test command;
- no frozen F16/F17/F18/F02 route-source mutation;
- no `/centers/$id` mutation.

Exact-head QA on `79c084611fb6dbe3617ba9a58f100934b9272587`:
- Frontend Quality Gate `34641669982` — PASS;
  - artifact `10280223087`;
  - digest `sha256:429c30dabcc0a6f53b9cb5b3021e09214208ef45ba69de192ead1d7ac6fdf02f`;
- F19 focused gate `34641670087` — PASS;
  - artifact `10280038052`;
  - digest `sha256:6eab337b1261b4b5f6831f1bd051734ca23e4d524882656b49f083add19f59ea`;
  - base + Tehran-filtered evidence at `375 / 390 / 430 / 768 / 1024 / 1440` manually inspected PASS with no observed horizontal overflow, clipping or overlap.

Implementation PR #93 pre-merge truth:
- mergeable `true`;
- unresolved review threads `0`;
- exact pre-merge `main` remained START_SHA;
- expected head `79c084611fb6dbe3617ba9a58f100934b9272587` was used.

PR-context QA:
- Frontend Quality Gate `34642209064` — PASS; artifact `10280732493`; digest `sha256:fb9ac0c6c37e6d9ad27da1ac6c776aa8440405eff0fbe7fdf3cfae79746cb0b3`;
- F19 `34642209107` — PASS; artifact `10280856920`; digest `sha256:3cad8e62b147ed1e4e3c460dda6113ec3aaa9b4e3f47bde07d7b1d3184d95069`;
- F18 regression `34642209177` — PASS; artifact `10280517173`; digest `sha256:1a01b18bb5bccec1297f9dd68894b9a7e48facd4feeb30997963617555dd8016`;
- F17 regression `34642209062` — PASS; artifact `10280128550`; digest `sha256:9deac635b4ec5278ba758a0fb6be701325293d4fe825a84693431d973fb05fa5`;
- F16 regression `34642209078` — PASS; artifact `10280507215`; digest `sha256:8941bd80bae087b0ba2b1287b7e84fc44e0c1b77e6abb3a6b54071bb4238cc08`.

Implementation merge/main:

`b3d6360af21c1c86a06a95cdbe20ac30ac42c84c`

Post-main implementation QA on that exact SHA:
- Frontend Quality Gate `34648835775` — PASS; artifact `10282474318`; digest `sha256:554e2b3fca09d93b0aa37363acd197347be436c86540caf6b3b23c21141f5901`;
- F19 focused gate `34648835745` — PASS; artifact `10283008212`; digest `sha256:bc7bc1520e3eb7a3a87fce19e0baeac53731d1cb9cf3222bd48e8826955d6721`;
- F18 regression `34648835820` — PASS; artifact `10282748480`; digest `sha256:ea4dcbd61f8e3016246fbd8cef6952085cedaac29e3abc8dad4d15869854232d`;
- F17 regression `34648835901` — PASS; artifact `10282623618`; digest `sha256:45157552717c4a3401fccb2f3f047425f1632f8bce8e9ef569ce1021c0b10156`;
- F16 regression `34648835803` — PASS; artifact `10283327884`; digest `sha256:1bf35fafc927231d5eedc79c74072f93f1f4d80fa91e5116c2b4b098a652573b`.

Live frontend `main` was reverified exact `b3d6360af21c1c86a06a95cdbe20ac30ac42c84c` before closeout branch creation.

## 8. Backend alignment truth

Backend repository:

`sajadkhavas/turnoment-backend`

F19 backend contract alignment is terminal **as documentation alignment only**:
- Backend START `b0fc9ed73dc57aed6a28453745386489aaef0ceb`;
- Issue `#35` — CLOSED / COMPLETED;
- docs head `7f2663fa649df9b17bd2d5282e497954cb277359`;
- PR `#36` — MERGED;
- PR Backend Quality Gate `34641469931` — PASS on Python 3.12 / 3.14;
- backend merge/main `b6421e1e76e846c89d799fe4860bc11c8242f2f8`;
- post-main Backend Quality Gate `34641761119` — PASS on Python 3.12 / 3.14;
- no gaming-center runtime Python/model/migration/serializer/view/URL implementation was added.

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

F19 frontend acceptance does not make `GET /api/v1/centers/` live and does not reorder backend phases.

## 9. Previous accepted frontend truth

Accepted/frozen route truth retained:
- F16 `/` = `DONE / MERGED / FROZEN — FINAL_CURRENT`;
- F17 `/tournaments` = `DONE / MERGED / FROZEN — FINAL_CURRENT`;
- F18 `/games` = `DONE / MERGED / FROZEN — FINAL_CURRENT`;
- F02 `/games/$slug` = `FINAL_CURRENT` and frozen;
- `/tournaments/$id` remains `FINAL_PRE_SEO` pending a later limited current-law recertification;
- private account/dashboard/match routes retain their recorded `FINAL_PRIVATE` truth.

Do not reopen frozen routes from chat memory.

## 10. F19 documentation-only closeout law

Closeout scope is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F19_PUBLIC_GAMING_CENTER_DISCOVERY.md`;
4. `docs/workstreams/F19_CLOSEOUT.md`.

No source code, package, lockfile, workflow, dependency or runtime configuration mutation is authorized.

This closeout snapshot is non-recursive. The future closeout merge/frozen-main SHA and terminal post-closeout CI/artifact/digest facts belong in Issue #92 after they exist; do not create a recursive documentation commit solely to self-record them.

## 11. Remaining terminal F19 chain

F19 is not terminally `DONE` yet. Remaining gates:
1. exact closeout compare: ahead 1 / behind 0 / exactly one commit / exactly four Markdown files;
2. closeout PR to `main` without auto-closing Issue #92;
3. PR-context normal + focused F19 + triggered frozen-route regression gates PASS;
4. mergeable=true;
5. unresolved review threads=0;
6. exact live-main lock at implementation merge SHA before closeout merge;
7. expected-head closeout merge;
8. terminal frozen-main normal Frontend Quality Gate PASS;
9. terminal frozen-main focused F19 gate PASS and triggered regression gates PASS;
10. terminal artifact IDs/digests recorded in Issue #92;
11. exact live frontend `main` reverified;
12. Issue #92 updated with terminal evidence and closed `completed`;
13. only then report `DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 12. Public-route NEXT after F19

After F19 terminal freeze, current-law order remains:

`/centers/$id` → `/ranking` → `/players/$username` → `/host` → `/rules`

unless an explicit product decision changes that order.

Backend NEXT independently remains:

`P02 — Games / Catalog Foundation`
