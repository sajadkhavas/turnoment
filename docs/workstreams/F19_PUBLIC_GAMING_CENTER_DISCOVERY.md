# F19 — Public Gaming Center Discovery

Status at closeout creation:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Tracking Issue: `#92`

Route: `/centers`

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

Target route status:

`FINAL_CURRENT`

This is a non-recursive workstream snapshot. The future closeout merge/frozen-main SHA and terminal post-closeout CI/artifact/digest evidence are intentionally not self-recorded here; after they exist they belong in Issue #92.

## 1. Mandatory preflight

Read before implementation from exact START_SHA:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `SEO_FINAL_COPY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md`.

Live frontend `main` was verified exact START_SHA before branch creation.

F18 `/games` was independently terminal before F19 started. Frozen F16 `/`, F17 `/tournaments`, F18 `/games`, and F02 `/games/$slug` remained protected outside the F19 implementation scope.

`/centers/$id` remained a separate `NEEDS_RECERTIFICATION` route and was not changed by F19.

## 2. Baseline problem accepted for repair

START_SHA `/centers` was not current-law final because:
1. it directly imported local `gamingCenters` fixture data;
2. public center membership/order were browser-owned;
3. verification, equipment, ratings/reviews and upcoming-tournament counts came directly from local fixture records;
4. no typed repository/runtime-validation production boundary existed;
5. no production HTTP adapter/fail-closed behavior existed;
6. no final loading/error/empty model existed;
7. title/copy still contained legacy `ایران مهر افزار` branding and unsupported review/rating claims;
8. no current SEO/final-copy evidence chain existed.

The shared F16 Home gaming-center card remained outside F19 and was not mutated.

## 3. Accepted permanent architecture

`validated URL search → loaderDeps → SSR loader → typed GamingCenterDiscoveryRepository → runtime-validated directory projection → Gaming Center Discovery UI`

Repository/backend owns:
- public/published center membership and ordering;
- stable center entity ID;
- public navigation-key projection without making F19 authoritative for the later detail canonical-slug decision;
- center name;
- verification state;
- stable city identity/slug and district;
- public center summary;
- equipment/facility labels;
- cover image URL;
- nullable authoritative upcoming-tournament count;
- city facet membership/counts;
- city filtering;
- pagination.

Frontend owns:
- normalized/shareable `city` and `page` search state;
- final static Persian page copy and information hierarchy;
- presentation/localization;
- accessibility/responsive behavior;
- canonical/robots policy;
- deterministic fixture repository for dev/test/visual QA only.

Frontend MUST NOT derive production center membership, verification, equipment, city facets, filtering, pagination or tournament counts from local arrays.

## 4. Runtime contract

Planned anonymous-safe/read-only endpoint:

`GET /api/v1/centers/`

Optional query parameters:
- `city=<stable-city-slug>`;
- `page=<positive-integer>`.

Production adapter requirements:
- `VITE_API_BASE_URL` mandatory;
- `credentials: include` retained for same-session compatibility;
- HTTP/config failure fails closed;
- JSON is strict-runtime-validated with Zod;
- no production fallback to fixture centers.

Current integration truth remains exactly:

`FRONTEND MOCK / BACKEND PENDING`

until the owning backend gaming-centers/resources phase implements and permission-tests the endpoint in the accepted backend phase order.

## 5. Search-state and indexing law

Normalized shareable search state:
- `city` — canonical stable city slug when valid;
- `page` — positive integer, omitted for page 1.

Base route:
- canonical `/centers`;
- robots `index,follow`.

City-filtered and paginated variants:
- canonical `/centers`;
- robots `noindex,follow`.

Reason: F19 is one directory intent. Current city/page variants are navigation/facet states, not separately researched local landing pages.

## 6. DTO/product-truth invariants

Response:
- `schemaVersion = 1`;
- `filters.cities[]`;
- `activeQuery`;
- `items[]`;
- `pagination`.

Center item:
- stable `centerId`;
- `publicId` navigation projection;
- `publicationState = published`;
- name;
- backend-owned verification boolean;
- stable city identity + district;
- public summary;
- unique equipment labels;
- nullable cover image;
- nullable/non-negative authoritative upcoming-tournament count.

Pagination:
- positive current page/page size;
- non-negative total items;
- `totalPages = max(1, ceil(totalItems / pageSize))`;
- current page cannot exceed total pages;
- item count cannot exceed page size.

Rating/review fields were deliberately removed from F19 v1 because no accepted authoritative backend ratings/reviews domain exists yet. Local fixture review metrics were not promoted to production truth.

## 7. `/centers/$id` boundary

F19 uses backend-projected `publicId` only to preserve current detail navigation shape.

The separate `/centers/$id` recertification owns:
- stable public identifier decision;
- canonical slug/URL policy;
- center-detail repository contract;
- address/contact publication rules;
- `LocalBusiness` structured-data evaluation;
- detail-level SEO/final copy.

F19 does not freeze those later decisions.

## 8. SEO / final-copy acceptance

Audience:
- players looking for a physical gaming center / game net connected to in-person competitive play.

Primary intent:
- local center discovery / directory browsing.

Topic/query cluster reviewed:
- `گیم نت`;
- `گیم نت تهران`;
- `گیم نت کرج`;
- `مرکز گیمینگ`;
- `گیم نت مسابقات`.

Final H1:

`گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات`

Final title:

`گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات | Turnoment`

Final meta description:

`گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات را بر اساس شهر پیدا کن، امکانات و وضعیت تأیید هر مرکز را ببین و مسیر مسابقات حضوری را دنبال کن.`

No route-specific `LocalBusiness` structured data is emitted on the multi-entity listing. No unsupported popularity, “best/largest/official”, search-volume, rating/review or superlative claim is accepted.

Intent boundary:
- `/centers` = public center directory/discovery;
- `/centers/$id` = one center detail/local entity;
- `/tournaments` = tournament inventory/filtering;
- `/games` = game catalog;
- `/host` = center-owner acquisition/onboarding.

## 9. Official-source decisions

Reviewed/applied:
- TanStack Router Data Loading;
- TanStack Router Search Params;
- TanStack Router Document Head Management;
- TanStack Start SSR/environment guidance;
- Google Search canonicalization, people-first content, title/link and structured-data policies;
- Google `LocalBusiness` structured-data guidance;
- W3C WCAG 2.2;
- Django REST framework permission/versioning guidance for cross-repo contract alignment.

Accepted decisions:
- primary directory inventory comes from an SSR loader, not browser `useEffect` authority;
- route `head` owns final title/meta/canonical/robots;
- base route is indexable while current facet/page states are `noindex,follow`;
- `LocalBusiness` markup is deferred to single-center detail;
- public controls retain keyboard-visible focus and touch-safe interaction;
- one semantic `<main>` exists per normal/pending/error state.

## 10. Final implementation diff evidence

Initial implementation commit:

`36376d8b9590deed5ba779b9ad6be312f98b06bc`

A package-wiring checkpoint briefly changed one existing devDependency in `3ba1965132fb98278ff13776c216c29d4d9067fb`; commit `aa61013b3b938b551e83dda0de8cfdce26dc7b30` immediately restored the exact dependency baseline while retaining the intended F19 test-suite addition.

Final compare START → reviewed implementation head confirms:
- ahead `4` / behind `0`;
- `12` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- `package.json` final delta only appends the F19 contract spec to the existing full test command;
- no frozen F16/F17/F18/F02 route source mutation;
- no `/centers/$id` mutation.

Implementation includes:
- strict `GamingCenterDiscoveryPageData` Zod contract;
- `GamingCenterDiscoveryRepository`;
- deterministic fixture repository;
- fail-closed Django HTTP repository;
- validated `city`/`page` URL state;
- SSR route loader;
- dedicated F19 card/page surface;
- removal of local rating/review claims from listing;
- final pending/error/empty/pagination states;
- final Turnoment H1/title/meta/canonical/robots copy;
- crawlable links to current center detail, tournament discovery, games and host flow;
- focused F19 contract/build/typecheck/SSR/SEO/search-state/twelve-screenshot QA workflow;
- F19 contract wired into the normal repository test suite.

## 11. Exact-head QA evidence

Exact reviewed head:

`79c084611fb6dbe3617ba9a58f100934b9272587`

Frontend Quality Gate:
- run `34641669982` — PASS;
- artifact `10280223087`;
- digest `sha256:429c30dabcc0a6f53b9cb5b3021e09214208ef45ba69de192ead1d7ac6fdf02f`.

Focused F19 Public Gaming Center Discovery Quality Gate:
- run `34641670087` — PASS;
- artifact `10280038052`;
- digest `sha256:6eab337b1261b4b5f6831f1bd051734ca23e4d524882656b49f083add19f59ea`;
- base + Tehran-filtered evidence at `375 / 390 / 430 / 768 / 1024 / 1440` manually inspected PASS with no observed horizontal overflow, clipping or overlap.

## 12. Cross-repo backend alignment

Backend repository:

`sajadkhavas/turnoment-backend`

Backend alignment was documentation-only and is terminal:
- START `b0fc9ed73dc57aed6a28453745386489aaef0ceb`;
- Issue #35 CLOSED / COMPLETED;
- docs head `7f2663fa649df9b17bd2d5282e497954cb277359`;
- PR #36 MERGED;
- PR Backend Quality Gate `34641469931` PASS on Python 3.12 / 3.14;
- backend merge/main `b6421e1e76e846c89d799fe4860bc11c8242f2f8`;
- post-main Backend Quality Gate `34641761119` PASS on Python 3.12 / 3.14;
- no runtime Python/model/migration/serializer/view/URL/settings/dependency/workflow/phase-registry implementation added.

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

Closing backend Issue #35 meant contract documentation was aligned; it did not make `GET /api/v1/centers/` live.

## 13. Implementation PR-context acceptance

Implementation PR:

`#93` — MERGED with expected-head lock.

Pre-merge truth:
- mergeable `true`;
- unresolved review threads `0`;
- exact pre-merge frontend `main` remained START_SHA;
- expected head `79c084611fb6dbe3617ba9a58f100934b9272587` used.

PR-context gates:
- Frontend Quality Gate `34642209064` — PASS; artifact `10280732493`; digest `sha256:fb9ac0c6c37e6d9ad27da1ac6c776aa8440405eff0fbe7fdf3cfae79746cb0b3`;
- F19 `34642209107` — PASS; artifact `10280856920`; digest `sha256:3cad8e62b147ed1e4e3c460dda6113ec3aaa9b4e3f47bde07d7b1d3184d95069`;
- F18 regression `34642209177` — PASS; artifact `10280517173`; digest `sha256:1a01b18bb5bccec1297f9dd68894b9a7e48facd4feeb30997963617555dd8016`;
- F17 regression `34642209062` — PASS; artifact `10280128550`; digest `sha256:9deac635b4ec5278ba758a0fb6be701325293d4fe825a84693431d973fb05fa5`;
- F16 regression `34642209078` — PASS; artifact `10280507215`; digest `sha256:8941bd80bae087b0ba2b1287b7e84fc44e0c1b77e6abb3a6b54071bb4238cc08`.

Implementation merge/main:

`b3d6360af21c1c86a06a95cdbe20ac30ac42c84c`

## 14. Post-main implementation QA

All required post-main gates passed on exact implementation main `b3d6360af21c1c86a06a95cdbe20ac30ac42c84c`:

- Frontend Quality Gate `34648835775` — PASS;
  - artifact `10282474318`;
  - digest `sha256:554e2b3fca09d93b0aa37363acd197347be436c86540caf6b3b23c21141f5901`;
- F19 focused gate `34648835745` — PASS;
  - artifact `10283008212`;
  - digest `sha256:bc7bc1520e3eb7a3a87fce19e0baeac53731d1cb9cf3222bd48e8826955d6721`;
- F18 regression `34648835820` — PASS;
  - artifact `10282748480`;
  - digest `sha256:ea4dcbd61f8e3016246fbd8cef6952085cedaac29e3abc8dad4d15869854232d`;
- F17 regression `34648835901` — PASS;
  - artifact `10282623618`;
  - digest `sha256:45157552717c4a3401fccb2f3f047425f1632f8bce8e9ef569ce1021c0b10156`;
- F16 regression `34648835803` — PASS;
  - artifact `10283327884`;
  - digest `sha256:1bf35fafc927231d5eedc79c74072f93f1f4d80fa91e5116c2b4b098a652573b`.

Live frontend `main` was reverified exact implementation merge SHA before closeout branch creation.

## 15. Route registry decision

Because the F19 implementation is merged and required post-main implementation QA is green, `/centers` is eligible for non-recursive promotion to:

`FINAL_CURRENT`

This route-level promotion does not itself mean the F19 workstream is terminally frozen. Workstream terminal status still requires closeout merge + terminal frozen-main evidence recorded in Issue #92.

## 16. Documentation-only closeout scope

Closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F19_PUBLIC_GAMING_CENTER_DISCOVERY.md`;
4. `docs/workstreams/F19_CLOSEOUT.md`.

No source code, package, lockfile, workflow, runtime configuration or dependency change is authorized.

## 17. Remaining terminal gates

After this closeout snapshot is committed, F19 still requires:
1. exact closeout compare: ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to `main` without auto-closing Issue #92;
3. PR-context normal + focused F19 + triggered frozen-route regression gates PASS;
4. mergeable=true;
5. unresolved review threads=0;
6. exact live-main lock at implementation merge SHA before merge;
7. expected-head closeout merge;
8. terminal frozen-main normal Frontend Quality Gate PASS;
9. terminal frozen-main focused F19 gate PASS and triggered regression gates PASS;
10. terminal artifact IDs and SHA-256 digests recorded;
11. exact live frontend `main` reverified after terminal gates;
12. Issue #92 updated with those terminal facts and CLOSED / COMPLETED.

Only after those future facts exist may the workstream be reported:

`F19 — DONE / MERGED / FROZEN — FINAL_CURRENT`

## 18. NEXT after terminal F19 freeze

The next public current-law recertification is:

`/centers/$id`

Then:

`/ranking` → `/players/$username` → `/host` → `/rules`

unless an explicit product decision changes the order.
