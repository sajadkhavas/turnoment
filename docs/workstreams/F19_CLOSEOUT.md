# F19 — Public Gaming Center Discovery Closeout

Status at document creation:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/centers`

Target route status: `FINAL_CURRENT`

Tracking Issue: `#92`

This is a non-recursive closeout snapshot. It records only evidence that already exists when this document is created. The future closeout merge/frozen-main SHA and terminal post-closeout CI/artifact/digest are intentionally not self-recorded here; they belong in Issue #92 after they exist.

## 1. Exact source lock

Frontend START_SHA:

`41bdbb90f127474ecabd61cb5ceda5db1b91ae49`

Implementation branch:

`phase/f19-public-gaming-center-discovery`

Final reviewed implementation head:

`79c084611fb6dbe3617ba9a58f100934b9272587`

Implementation merge / accepted main:

`b3d6360af21c1c86a06a95cdbe20ac30ac42c84c`

Closeout branch base:

`b3d6360af21c1c86a06a95cdbe20ac30ac42c84c`

Closeout branch:

`closeout/f19-public-gaming-center-discovery`

## 2. Implementation scope accepted

F19 replaces browser-owned legacy gaming-center directory truth with the permanent boundary:

`validated URL search → loaderDeps → SSR loader → typed GamingCenterDiscoveryRepository → runtime-validated directory projection → Gaming Center Discovery UI`

Accepted behavior includes:
- production HTTP repository and deterministic QA fixture behind the same typed contract;
- production never silently falls back to fixture records;
- backend/repository authority for center publication membership/order, stable center identity/navigation-key projection, verification, city/district identity, public summary, equipment, cover, nullable authoritative upcoming-tournament count, city facets/filtering and pagination;
- frontend no longer derives those production truths from local arrays;
- rating/review fields removed from the v1 listing contract until an authoritative ratings domain exists;
- validated/shareable `city` + `page` state;
- SSR-rendered primary directory;
- pending/error/empty/pagination states;
- final responsive/accessibility presentation;
- dedicated F19 discovery card/page so the frozen F16 Home shared card remains untouched;
- `/centers/$id` kept outside the F19 implementation scope.

## 3. Public SEO/final-copy acceptance

Final H1:

`گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات`

Final title:

`گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات | Turnoment`

Final meta description:

`گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات را بر اساس شهر پیدا کن، امکانات و وضعیت تأیید هر مرکز را ببین و مسیر مسابقات حضوری را دنبال کن.`

Technical indexing:
- canonical base `/centers`;
- base robots `index,follow`;
- current city/page variants `noindex,follow` + canonical `/centers`;
- primary directory SSR-rendered;
- no unsupported `LocalBusiness` structured data on the multi-entity listing.

Intent boundary:
- `/centers` = center directory/discovery;
- `/centers/$id` = one center detail/local entity;
- `/tournaments` = tournament inventory/filtering;
- `/games` = game catalog;
- `/host` = center-owner acquisition.

No unsupported search-volume, popularity, rating/review, ranking or superlative claim is introduced.

## 4. Official documentation applied

Current official guidance reviewed during F19 included:
- TanStack Router data loading, search params and document-head management;
- TanStack Start SSR/environment guidance;
- Google Search canonicalization, people-first content, title/link and structured-data policies;
- Google `LocalBusiness` structured-data guidance;
- W3C WCAG 2.2;
- Django REST framework permission/versioning guidance for backend contract alignment.

Key accepted decisions:
- route loader owns primary SSR directory fetch;
- production adapter is fail-closed;
- base canonical is `/centers` while current facet/page variants remain navigation states rather than indexable local landing pages;
- individual `LocalBusiness` markup is deferred to `/centers/$id` recertification where authoritative address/contact/entity truth can be evaluated;
- stable contract-backed identity and crawlable links are retained;
- visible keyboard focus/touch-safe interaction is retained.

## 5. Cross-repo backend contract alignment

Backend repository:

`sajadkhavas/turnoment-backend`

Backend F19 alignment is terminal as documentation alignment only:
- START `b0fc9ed73dc57aed6a28453745386489aaef0ceb`;
- Issue #35 CLOSED / COMPLETED;
- docs head `7f2663fa649df9b17bd2d5282e497954cb277359`;
- PR #36 MERGED;
- PR-context Backend Quality Gate `34641469931` PASS on Python 3.12 / 3.14;
- backend merge/main `b6421e1e76e846c89d799fe4860bc11c8242f2f8`;
- post-main Backend Quality Gate `34641761119` PASS on Python 3.12 / 3.14;
- no runtime Python/model/migration/serializer/view/URL/dependency/phase-registry implementation added.

Planned endpoint:

`GET /api/v1/centers/`

Runtime remains:

`FRONTEND MOCK / BACKEND PENDING`

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

## 6. Exact implementation diff evidence

Compare from START to final implementation head:
- ahead `4`;
- behind `0`;
- `12` changed files;
- no `bun.lock` mutation;
- no dependency/version mutation;
- final `package.json` delta only appends the F19 contract spec to the existing full test command;
- frozen F16/F17/F18/F02 route source absent from final implementation diff;
- `/centers/$id` absent from final implementation diff.

Implementation PR:

`#93` — MERGED with expected-head lock.

Pre-merge acceptance:
- PR mergeable `true`;
- unresolved review threads `0`;
- exact pre-merge frontend `main` remained START_SHA;
- expected head `79c084611fb6dbe3617ba9a58f100934b9272587` used.

## 7. Exact-head QA evidence

Normal Frontend Quality Gate:
- run `34641669982` — PASS;
- artifact `10280223087`;
- digest `sha256:429c30dabcc0a6f53b9cb5b3021e09214208ef45ba69de192ead1d7ac6fdf02f`.

Focused F19 Public Gaming Center Discovery Quality Gate:
- run `34641670087` — PASS;
- artifact `10280038052`;
- digest `sha256:6eab337b1261b4b5f6831f1bd051734ca23e4d524882656b49f083add19f59ea`;
- base + Tehran-filtered screenshots at `375 / 390 / 430 / 768 / 1024 / 1440`;
- manual visual inspection PASS with no observed horizontal overflow, clipping or overlap.

## 8. PR-context QA evidence

Frontend Quality Gate:
- run `34642209064` — PASS;
- artifact `10280732493`;
- digest `sha256:fb9ac0c6c37e6d9ad27da1ac6c776aa8440405eff0fbe7fdf3cfae79746cb0b3`.

Focused F19 Public Gaming Center Discovery Quality Gate:
- run `34642209107` — PASS;
- artifact `10280856920`;
- digest `sha256:3cad8e62b147ed1e4e3c460dda6113ec3aaa9b4e3f47bde07d7b1d3184d95069`.

Frozen F18 Game Catalog regression gate:
- run `34642209177` — PASS;
- artifact `10280517173`;
- digest `sha256:1a01b18bb5bccec1297f9dd68894b9a7e48facd4feeb30997963617555dd8016`.

Frozen F17 Tournament Discovery regression gate:
- run `34642209062` — PASS;
- artifact `10280128550`;
- digest `sha256:9deac635b4ec5278ba758a0fb6be701325293d4fe825a84693431d973fb05fa5`.

Frozen F16 Home regression gate:
- run `34642209078` — PASS;
- artifact `10280507215`;
- digest `sha256:8941bd80bae087b0ba2b1287b7e84fc44e0c1b77e6abb3a6b54071bb4238cc08`.

## 9. Post-main implementation QA evidence

Accepted implementation main:

`b3d6360af21c1c86a06a95cdbe20ac30ac42c84c`

Normal Frontend Quality Gate:
- run `34648835775` — PASS including full browser regression;
- artifact `10282474318`;
- digest `sha256:554e2b3fca09d93b0aa37363acd197347be436c86540caf6b3b23c21141f5901`.

Focused F19 Public Gaming Center Discovery Quality Gate:
- run `34648835745` — PASS;
- artifact `10283008212`;
- digest `sha256:bc7bc1520e3eb7a3a87fce19e0baeac53731d1cb9cf3222bd48e8826955d6721`.

Frozen F18 Game Catalog regression gate:
- run `34648835820` — PASS;
- artifact `10282748480`;
- digest `sha256:ea4dcbd61f8e3016246fbd8cef6952085cedaac29e3abc8dad4d15869854232d`.

Frozen F17 Tournament Discovery regression gate:
- run `34648835901` — PASS;
- artifact `10282623618`;
- digest `sha256:45157552717c4a3401fccb2f3f047425f1632f8bce8e9ef569ce1021c0b10156`.

Frozen F16 Home regression gate:
- run `34648835803` — PASS;
- artifact `10283327884`;
- digest `sha256:1bf35fafc927231d5eedc79c74072f93f1f4d80fa91e5116c2b4b098a652573b`.

Live frontend `main` was reverified exact accepted implementation SHA before closeout branch creation.

## 10. Route registry decision

Because the F19 implementation is merged and required post-main implementation QA is green, `/centers` is eligible for non-recursive promotion from `IN_PROGRESS` to:

`FINAL_CURRENT`

This route-level promotion does not itself mean the F19 workstream is terminally frozen. Workstream terminal status still requires the closeout merge and terminal frozen-main evidence below.

## 11. Documentation-only closeout scope

This closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F19_PUBLIC_GAMING_CENTER_DISCOVERY.md`;
4. `docs/workstreams/F19_CLOSEOUT.md`.

No source code, package, lockfile, workflow, runtime configuration or dependency change is authorized.

## 12. Remaining terminal gates

After this closeout snapshot is committed, F19 still requires:
1. exact closeout compare: ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to `main` without auto-closing Issue #92;
3. PR-context normal + focused F19 gates PASS and all triggered frozen-route regression gates PASS;
4. mergeable=true;
5. unresolved review threads=0;
6. exact live-main lock at implementation merge SHA before merge;
7. expected-head closeout merge;
8. terminal frozen-main normal Frontend Quality Gate PASS;
9. terminal frozen-main focused F19 gate PASS;
10. terminal triggered frozen-route regression gates PASS;
11. terminal artifact IDs and SHA-256 digests recorded;
12. exact live frontend main reverified after terminal gates;
13. Issue #92 updated with those terminal facts and CLOSED / COMPLETED.

Only after those future facts exist may the workstream be reported:

`F19 — DONE / MERGED / FROZEN — FINAL_CURRENT`

## 13. NEXT after F19 terminal freeze

The next public current-law workstream is:

`/centers/$id`

Then:

`/ranking` → `/players/$username` → `/host` → `/rules`

unless an explicit product decision changes the order.
