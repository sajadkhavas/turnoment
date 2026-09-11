# F19 — Public Gaming Center Discovery

Status: `IN PROGRESS — IMPLEMENTATION QA`

Tracking Issue: `#92`

Route: `/centers`

START_SHA:

`41bdbb90f127474ecabd61cb5ceda5db1b91ae49`

Implementation branch:

`phase/f19-public-gaming-center-discovery`

Target route status:

`FINAL_CURRENT`

## 1. Mandatory preflight

Read from exact START_SHA before mutation:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `SEO_FINAL_COPY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md`.

Live frontend `main` was verified exact START_SHA before branch creation.

F18 `/games` was independently terminal before F19 started:
- Issue `#89` CLOSED / COMPLETED;
- implementation PR `#90` MERGED;
- closeout PR `#91` MERGED;
- frozen main `41bdbb90f127474ecabd61cb5ceda5db1b91ae49`;
- terminal Frontend Quality Gate `34633797889` PASS;
- terminal focused F18 gate `34633797871` PASS.

Backend alignment lock at F19 start:
- repo `sajadkhavas/turnoment-backend`;
- backend main `b0fc9ed73dc57aed6a28453745386489aaef0ceb`;
- Backend NEXT remains exactly `P02 — Games / Catalog Foundation`.

## 2. Baseline source audit

START_SHA `/centers` was not current-law final because:
1. `src/routes/centers.index.tsx` directly imported `gamingCenters` from local fixture data;
2. public center membership/order were browser-owned;
3. verification, equipment, ratings/reviews and upcoming-tournament counts came directly from local fixture records;
4. no typed repository/runtime-validation production boundary existed;
5. no production HTTP adapter/fail-closed behavior existed;
6. no final loading/error/empty state model existed;
7. title/copy still contained legacy `ایران مهر افزار` branding and unsupported review/rating claims;
8. no current SEO/final-copy research/evidence chain existed.

The shared `src/components/home/gaming-center-card.tsx` is used by frozen F16 Home and is protected outside F19. F19 uses a dedicated discovery component/card.

`/centers/$id` remains a separate `NEEDS_RECERTIFICATION` route and is not an F19 implementation target.

## 3. Permanent architecture

`validated URL search → loaderDeps → SSR loader → typed GamingCenterDiscoveryRepository → runtime-validated directory projection → Gaming Center Discovery UI`

Repository/backend owns:
- public/published center membership and ordering;
- stable center entity ID;
- public navigation key projection without making F19 authoritative for the later detail canonical-slug decision;
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
- `credentials: include` preserves same-session compatibility;
- HTTP failure fails closed;
- JSON is strict-runtime-validated with Zod;
- no production fallback to fixture centers.

Current integration truth:

`FRONTEND MOCK / BACKEND PENDING`

until the owning backend gaming-centers/resources phase implements and permission-tests the endpoint in the accepted phase order.

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

## 6. DTO invariants

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

Stable center IDs/public IDs and city IDs/slugs are unique in their projection scopes.

## 7. Rating/review truth

F19 v1 deliberately removes rating/review fields from the listing contract and public UI.

There is no accepted backend ratings domain with authoritative aggregation, abuse handling and publication semantics. Local fixture review metrics therefore cannot be promoted to production truth.

A future ratings/reviews domain may evolve the contract under its own controlled workstream.

## 8. `/centers/$id` boundary

F19 uses backend-projected `publicId` to preserve the current detail link shape only.

The next route workstream `/centers/$id` separately owns:
- stable public identifier decision;
- canonical slug/URL policy;
- center-detail repository contract;
- address/contact publication rules;
- LocalBusiness structured-data evaluation;
- detail-level SEO/final copy.

F19 must not silently freeze those later decisions.

## 9. SEO / final-copy research decisions

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

Repeated user needs in current Persian search results:
- locality/city/neighborhood;
- equipment/facilities;
- address/contact on individual detail surfaces;
- tournament/competitive context when applicable.

Turnoment F19 answers the directory/discovery need without unsupported popularity, “best/largest/official” or fabricated review claims.

Cannibalization boundary:
- `/centers` = public center directory/discovery;
- `/centers/$id` = one center detail/local entity;
- `/tournaments` = tournament inventory/filtering;
- `/games` = game catalog;
- `/host` = center-owner acquisition/onboarding.

Final H1:

`گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات`

Final title:

`گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات | Turnoment`

Final meta description:

`گیم‌نت‌ها و مراکز گیمینگ میزبان مسابقات را بر اساس شهر پیدا کن، امکانات و وضعیت تأیید هر مرکز را ببین و مسیر مسابقات حضوری را دنبال کن.`

No route-specific LocalBusiness structured data is emitted on the multi-entity listing. Individual center markup is deferred to `/centers/$id` recertification where authoritative address/contact/entity truth can be evaluated.

## 10. Official-source decisions

Reviewed for F19:
- TanStack Router Data Loading;
- TanStack Router Document Head Management;
- Google Search canonicalization guidance;
- Google LocalBusiness structured-data guidance;
- WCAG 2.2 focus/target-size requirements;
- Django REST framework permission/versioning guidance for cross-repo alignment.

Applied decisions:
- route primary inventory comes from an SSR loader, not browser `useEffect` authority;
- route `head` owns final title/meta/canonical/robots;
- base route is indexable while current facet/page states are noindex/follow;
- LocalBusiness markup is deferred to single-center detail;
- public controls use keyboard-visible focus and touch-safe minimum sizing;
- one semantic `<main>` exists per normal/pending/error state.

## 11. Implementation checkpoint

Initial implementation commit:

`36376d8b9590deed5ba779b9ad6be312f98b06bc`

Package test-suite wiring:
- `3ba1965132fb98278ff13776c216c29d4d9067fb` appended the F19 contract test but accidentally changed one existing devDependency version;
- `aa61013b3b938b551e83dda0de8cfdce26dc7b30` immediately restored the exact baseline dependency while retaining only the F19 test-suite addition.

Cumulative compare from START through `aa61013...` confirms:
- ahead 3 / behind 0;
- `package.json` final delta is exactly one intended test-command line replacement;
- no dependency/version delta remains;
- no lockfile mutation;
- no frozen F16/F17/F18/F02 source mutation;
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
- links to current center-detail route, city-filtered tournaments, games and host flow;
- focused F19 contract/build/typecheck/SSR/SEO/search-state/twelve-screenshot QA workflow;
- F19 contract added to normal repository test suite.

## 12. Initial implementation QA checkpoint

Focused F19 Public Gaming Center Discovery Quality Gate on `aa61013b3b938b551e83dda0de8cfdce26dc7b30`:
- run `34641090727` — PASS;
- artifact `10280755017`;
- digest `sha256:21d3059799bf8e0a3973aff77dc3d46fcaf182146e82a1272d63ad982e4bd1a2`;
- contract/build/typecheck/SSR/SEO/search-state evidence PASS;
- 12 screenshots retained: base + Tehran-filtered at `375 / 390 / 430 / 768 / 1024 / 1440`;
- manual visual inspection PASS with no observed horizontal overflow, clipping or overlap.

Normal Frontend Quality Gate run `34641090728` was started on the same head. Its terminal result must be recorded only after it completes.

Because this documentation commit changes the branch head, final exact-head normal + focused F19 gates are still required on the later reviewed head before implementation PR acceptance.

## 13. Cross-repo backend alignment

Backend repository:

`sajadkhavas/turnoment-backend`

Backend START/main at alignment start:

`b0fc9ed73dc57aed6a28453745386489aaef0ceb`

Backend Issue:

`#35`

Backend branch:

`docs/f19-public-gaming-center-discovery-contract`

Backend docs head:

`7f2663fa649df9b17bd2d5282e497954cb277359`

Backend PR:

`#36` — OPEN at this checkpoint.

Backend compare is ahead 1 / behind 0 / exactly one commit / exactly two Markdown files. No Python/model/migration/serializer/view/URL/settings/dependency/workflow/phase-registry mutation exists.

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

## 14. Remaining acceptance chain

F19 is not `DONE` merely because implementation exists.

Required terminal chain:
1. settle final reviewed implementation head after governance docs;
2. exact-head normal + focused F19 CI PASS and retain artifact/digest evidence;
3. manually inspect final focused visual artifact;
4. verify final compare and frozen-route protection;
5. finish backend documentation alignment without reordering backend phases;
6. open frontend implementation PR without auto-closing Issue #92;
7. require PR-context normal + focused F19 + triggered frozen-route regressions PASS;
8. require mergeable=true, unresolved review threads=0 and exact pre-merge main lock;
9. expected-head implementation merge;
10. require post-main normal + focused F19 QA PASS;
11. create documentation-only frontend closeout under the non-recursive rule;
12. merge closeout only after its PR-context gates are green;
13. require terminal frozen-main normal + focused F19 QA/artifacts/digests;
14. reverify exact live main;
15. record terminal evidence in Issue #92 and close it `completed`;
16. only then report `DONE / MERGED / FROZEN — FINAL_CURRENT`.
