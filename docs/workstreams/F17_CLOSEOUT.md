# F17 — Public Tournament Discovery Closeout

Status at document creation:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/tournaments`

Target route status: `FINAL_CURRENT`

Tracking Issue: `#84`

This is a non-recursive closeout snapshot. It records only evidence that already exists when this document is created. The future closeout merge/frozen-main SHA and terminal post-closeout CI/artifact/digest are intentionally not self-recorded here; they belong in Issue #84 after they exist.

## 1. Exact source lock

Frontend START_SHA:

`fb87a7d84470db6ed1eba03ce0251c5f1eb6b7a9`

Implementation branch:

`phase/f17-public-tournament-discovery`

Final reviewed implementation head:

`e160029e30cba55543abffc4a7974f261ecd2ad4`

Implementation merge / accepted main:

`22e4c67425f2bf0cefe9079b2e014c2395f6448a`

Closeout branch base:

`22e4c67425f2bf0cefe9079b2e014c2395f6448a`

Closeout branch:

`closeout/f17-public-tournament-discovery`

## 2. Implementation scope accepted

F17 replaces browser-owned legacy tournament discovery truth with the permanent boundary:

`validated URL search → loaderDeps → SSR loader → typed TournamentDiscoveryRepository → runtime-validated discovery projection → UI`

Accepted behavior includes:
- production HTTP repository and deterministic QA fixture behind the same typed contract;
- production never silently falls back to fixture records;
- validated/shareable game/city/date/status/fee/sort/page URL state;
- backend/repository authority for filter semantics, ordering, pagination, lifecycle, registration, verification, capacity, fee/prize and featured identity;
- SSR-rendered primary inventory;
- pending/error/empty/pagination states;
- stable crawlable tournament-detail and supporting discovery links;
- exactly one `<main>` in normal/pending/error SSR states;
- final responsive/accessibility presentation;
- dedicated F17 inventory card so frozen F02 `/games/$slug` and its shared card remain untouched.

## 3. Public SEO/final-copy acceptance

Final H1:

`تورنمنت‌ها و مسابقات گیمینگ حضوری`

Final title:

`تورنمنت‌ها و مسابقات گیمینگ حضوری | Turnoment`

Final meta description:

`تورنمنت‌ها و مسابقات گیمینگ حضوری را بر اساس بازی، شهر، زمان، وضعیت ثبت‌نام و هزینه پیدا کن و برای جزئیات کامل وارد صفحه هر مسابقه شو.`

Technical indexing:
- base canonical `/tournaments`;
- base robots `index,follow`;
- normalized facet/sort/page variants `noindex,follow` + canonical `/tournaments`;
- primary inventory SSR-rendered;
- semantic crawlable internal links.

Intent boundary:
- `/` broad discovery gateway;
- `/tournaments` full tournament inventory/filter intent;
- `/games` game catalog;
- `/centers` center discovery;
- `/tournaments/$id` one tournament detail/participation context;
- `/rules` rules/product-policy surface.

No unsupported search-volume, ranking guarantee, popularity superlative or invented structured-data fact is claimed. Event structured data is intentionally omitted on the multi-event listing route.

## 4. Official documentation applied

Current official guidance reviewed during F17 included:
- TanStack Router search parameter validation/navigation;
- TanStack Router data loading and `loaderDeps`;
- TanStack Router document head management;
- Google Search Central canonicalization and structured-data policies;
- Google faceted-navigation crawling guidance;
- W3C WCAG 2.2.

Key accepted decisions:
- search state is runtime-normalized before loader consumption;
- all loader-relevant search fields are deterministic loader deps;
- route loader owns primary SSR discovery fetch;
- route head owns final metadata;
- base inventory is indexable while normalized faceted variants are not;
- controls preserve visible keyboard focus and touch-safe sizing;
- listing route omits Event structured data because event-leaf pages are the appropriate evaluation surface.

## 5. Cross-repo backend contract alignment

Backend repository:

`sajadkhavas/turnoment-backend`

Backend F17 alignment is terminal as documentation alignment only:
- START `335211d711c197a440e086bc570b86f2c5cd65f8`;
- Issue #31 CLOSED / COMPLETED;
- docs head `1566574c26a747edee785fcc2ff76f014fc63b3e`;
- PR #32 MERGED;
- PR Backend Quality Gate `34609152989` PASS on Python 3.12/3.14;
- backend merge/main `a5644ae4b4e64908088f389e43155c268fe6e29d`;
- post-main Backend Quality Gate `34609435404` PASS;
- no runtime Python/model/migration/serializer/view/URL/dependency/phase-registry implementation added.

Planned endpoint:

`GET /api/v1/tournaments/`

Runtime remains:

`FRONTEND MOCK / BACKEND PENDING`

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

## 6. Exact implementation diff evidence

Compare from START to final implementation head:
- ahead `1`;
- behind `0`;
- exactly one implementation commit;
- exactly 12 changed files;
- no lockfile mutation;
- no dependency/version mutation;
- frozen F02 route source/shared card absent from final diff.

Implementation PR:

`#87` — MERGED with expected-head lock.

Pre-merge acceptance:
- PR mergeable `true`;
- unresolved review threads `0`;
- exact pre-merge frontend `main` remained START_SHA;
- expected head `e160029e30cba55543abffc4a7974f261ecd2ad4` used.

## 7. Exact-head QA evidence

Normal Frontend Quality Gate:
- run `34615882813` — PASS;
- artifact `10270855890`;
- digest `sha256:d92129eb07b13ba1be92ce8c5b3ebe658d16354868369bd91e8978a51ce82e2c`.

Focused F17 Public Tournament Discovery Quality Gate:
- run `34615882561` — PASS;
- artifact `10270585437`;
- digest `sha256:a07a4c861fca713328c448d79b2e646d5c2490366ffab8f3e1ab1f410c56938b`;
- base/filtered SSR evidence plus exactly 12 screenshots at 375/390/430/768/1024/1440;
- manual visual inspection PASS with no observed horizontal overflow, clipping or overlap.

## 8. PR-context QA evidence

Frontend Quality Gate:
- run `34616599072` — PASS;
- artifact `10271475959`;
- digest `sha256:32ef3ddedb1032335bd3190ad7db91c6dc46d5b4f170a65536dbd849d17ea8b8`.

Focused F17 Public Tournament Discovery Quality Gate:
- run `34616599109` — PASS;
- artifact `10271306271`;
- digest `sha256:a38952b3d731428baaff299f953446644fb5672f4010f9955ee52d2eca70d8b6`.

Frozen F16 Home regression gate:
- run `34616599011` — PASS;
- artifact `10271261396`;
- digest `sha256:3e81cbca21726e2aee8c5bfc4fe9f27574fd4d13d8d01473ef82253173f9938e`.

## 9. Post-main implementation QA evidence

Accepted implementation main:

`22e4c67425f2bf0cefe9079b2e014c2395f6448a`

Normal Frontend Quality Gate:
- run `34617140049` — PASS including full browser regression;
- artifact `10270983180`;
- digest `sha256:0ee55d941a16e51812ae89a0e66402c45dacaf70c6a1b5c60396528c86fb6c94`.

Focused F17 Public Tournament Discovery Quality Gate:
- run `34617140093` — PASS;
- artifact `10270487803`;
- digest `sha256:a1752a6cd4deb55e5921cbe68b100d2f3d4689584fa279653521bce334b30c4e`.

Frozen F16 Home regression gate:
- run `34617140003` — PASS;
- artifact `10270367871`;
- digest `sha256:c6007f3c04679ae436670be18e96db259aca9391410dc2370bb549e57466b3a1`.

Live frontend main was reverified exact accepted implementation SHA before closeout branch creation.

## 10. Route registry decision

Because the F17 implementation is merged and required post-main implementation QA is green, `/tournaments` is eligible for non-recursive promotion from `NEEDS_RECERTIFICATION` to:

`FINAL_CURRENT`

This route-level promotion does not itself mean the F17 workstream is terminally frozen. Workstream terminal status still requires the closeout merge and terminal frozen-main evidence below.

## 11. Documentation-only closeout scope

This closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F17_PUBLIC_TOURNAMENT_DISCOVERY.md`;
4. `docs/workstreams/F17_CLOSEOUT.md`.

No source code, package, lockfile, workflow, runtime configuration or dependency change is authorized.

## 12. Remaining terminal gates

After this closeout snapshot is committed, F17 still requires:
1. exact closeout compare: ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to `main` without auto-closing Issue #84;
3. PR-context normal + focused F17 gates PASS and any triggered frozen-route regression gate PASS;
4. mergeable=true;
5. unresolved review threads=0;
6. exact live-main lock at implementation merge SHA before merge;
7. expected-head closeout merge;
8. terminal frozen-main normal Frontend Quality Gate PASS;
9. terminal frozen-main focused F17 gate PASS;
10. terminal artifact IDs and SHA-256 digests recorded;
11. exact live frontend main reverified after terminal gates;
12. Issue #84 updated with those terminal facts and CLOSED / COMPLETED.

Only after those future facts exist may the workstream be reported:

`F17 — DONE / MERGED / FROZEN — FINAL_CURRENT`
