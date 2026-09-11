# F17 — Public Tournament Discovery

Status: `MERGED / CLOSEOUT IN PROGRESS`

Route: `/tournaments`

Tracking Issue: `#84`

START_SHA: `fb87a7d84470db6ed1eba03ce0251c5f1eb6b7a9`

Implementation branch: `phase/f17-public-tournament-discovery`

Final implementation head: `e160029e30cba55543abffc4a7974f261ecd2ad4`

Implementation merge / accepted main: `22e4c67425f2bf0cefe9079b2e014c2395f6448a`

Closeout branch: `closeout/f17-public-tournament-discovery`

Target: `FINAL_CURRENT`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 1. Mandatory preflight and source audit

The workstream read and applied the exact-source governance set before mutation:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `SEO_FINAL_COPY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md`.

Legacy route gaps confirmed before implementation:
- local `tournament-data.ts` directly owned options/stats/filtering;
- filtering/sorting ran in the browser over a local inventory;
- featured identity and authoritative-looking aggregates were locally derived;
- verification/lifecycle/capacity/fee/prize had no production repository boundary;
- no server pagination contract or route pending/error loader states;
- nested `<main>` landmarks existed;
- metadata retained legacy `ایران مهر افزار` branding;
- faceted URLs lacked explicit indexing policy;
- current-law SEO/final-copy evidence did not exist.

## 2. Permanent architecture

`/tournaments → validated URL search → loaderDeps → SSR loader → typed TournamentDiscoveryRepository → runtime-validated discovery projection → Tournament Discovery UI`

Backend/repository owns:
- API query validation, filtering, ordering and pagination;
- stable tournament/game/venue identity;
- lifecycle and registration state;
- gaming-center verification/location;
- schedule/timezone/display-date projection;
- capacity limit/registered/remaining truth;
- entry fee/fixed prize;
- optional featured tournament identity.

Frontend owns:
- safe normalization of shareable navigation/search state;
- reset-to-page-1 navigation when inventory facets change;
- static Persian labels/copy and information hierarchy;
- presentation/formatting/accessibility/responsive behavior;
- base-vs-faceted canonical/robots policy;
- deterministic fixture repository for dev/test/visual QA only.

Production MUST NOT download arbitrary inventory and become authoritative for filtering/sorting/pagination or silently fall back to fixture data.

## 3. Frozen-route compatibility boundary

F02 `/games/$slug` is frozen and consumes `src/components/tournaments/tournament-discovery-card.tsx`.

F17 therefore uses a separate `src/components/tournaments/tournament-inventory-card.tsx`. The accepted F17 final diff leaves the shared F02 card and F02 route source untouched. This boundary was enforced after an earlier exact-head type regression exposed the danger of modifying the frozen shared component; the branch was rewritten before PR creation to one clean implementation commit.

## 4. Backend alignment

Backend repo: `sajadkhavas/turnoment-backend`

Documentation-only F17 alignment is terminal:
- Backend START `335211d711c197a440e086bc570b86f2c5cd65f8`;
- Issue #31 CLOSED / COMPLETED;
- docs head `1566574c26a747edee785fcc2ff76f014fc63b3e`;
- PR #32 MERGED;
- PR-context Backend Quality Gate `34609152989` PASS on Python 3.12/3.14;
- accepted backend merge/main `a5644ae4b4e64908088f389e43155c268fe6e29d`;
- post-main Backend Quality Gate `34609435404` PASS on Python 3.12/3.14;
- no runtime Python/models/migrations/serializers/views/URLs/dependency/phase-registry mutation;
- Backend NEXT remains exactly `P02 — Games / Catalog Foundation`.

Planned endpoint:

`GET /api/v1/tournaments/`

No runtime tournament-discovery endpoint is claimed live by F17.

## 5. Official documentation audit

Current official sources reviewed and applied on 2026-09-11:

### TanStack Router / Start
- Search parameter validation: `https://tanstack.com/router/latest/docs/how-to/validate-search-params`
- Search parameters/navigation: `https://tanstack.com/router/latest/docs/how-to/setup-basic-search-params`
- Data loading / loaderDeps: `https://tanstack.com/router/latest/docs/guide/data-loading`
- RouteOptions head/loaderDeps API: `https://tanstack.com/router/latest/docs/api/router/RouteOptionsType`
- Document head management: `https://tanstack.com/router/latest/docs/guide/document-head-management`

Applied decisions:
- search state runtime-normalized before consumption;
- every loader-relevant search field represented in deterministic `loaderDeps`;
- route loader performs the SSR discovery request;
- route head owns title/description/robots/canonical metadata;
- filter changes remain shareable/bookmarkable URL state;
- no browser-only primary inventory fetch.

### Google Search / Crawling
- Canonicalization: `https://developers.google.com/search/docs/crawling-indexing/canonicalization`
- Faceted navigation: `https://developers.google.com/crawling/docs/faceted-navigation`
- Structured-data policies: `https://developers.google.com/search/docs/appearance/structured-data/sd-policies`
- Event structured data: `https://developers.google.com/search/docs/appearance/structured-data/event`

Applied decisions:
- unfiltered `/tournaments` is primary indexable inventory;
- normalized facet/sort/page variants are useful/shareable but `noindex,follow` with canonical `/tournaments`;
- arbitrary facet combinations are not SEO landing pages;
- no Event structured data on this multi-event listing route;
- no invented schema/search claims.

### WCAG 2.2
- Standard: `https://www.w3.org/TR/WCAG22/`

Applied decisions:
- semantic labels/selects/buttons/links;
- visible `focus-visible` indicators;
- touch-safe primary controls;
- labelled mobile filter Sheet and reset action;
- exactly one `<main>` landmark in normal/pending/error SSR states;
- status expressed with text, not color alone.

## 6. Product / SEO final truth

Product job: compare current in-person gaming tournaments before opening one tournament detail.

Primary query/topic cluster:
- `تورنمنت بازی`;
- `مسابقات گیمینگ`;
- `مسابقات گیم نت`.

Final H1:

`تورنمنت‌ها و مسابقات گیمینگ حضوری`

Final title:

`تورنمنت‌ها و مسابقات گیمینگ حضوری | Turnoment`

Final meta description:

`تورنمنت‌ها و مسابقات گیمینگ حضوری را بر اساس بازی، شهر، زمان، وضعیت ثبت‌نام و هزینه پیدا کن و برای جزئیات کامل وارد صفحه هر مسابقه شو.`

Indexing policy:
- base `/tournaments` = canonical `/tournaments`, `index,follow`;
- normalized search facet/sort/page variants = canonical `/tournaments`, `noindex,follow`.

Intent boundary:
- `/` broad discovery gateway;
- `/tournaments` full tournament inventory/filter intent;
- `/games` game catalog;
- `/centers` gaming-center discovery;
- `/tournaments/$id` one tournament detail/participation context;
- `/rules` rules/product-policy surface.

No external search-volume/keyword-difficulty number, unsupported superlative, ranking guarantee or invented structured-data fact is claimed.

## 7. Accepted implementation scope

Final compare from START to implementation head:
- ahead `1` / behind `0`;
- exactly one implementation commit;
- exactly 12 changed files;
- `bun.lock` unchanged;
- no dependency/version mutation.

Accepted owned implementation includes:
- `.github/workflows/f17-public-tournament-discovery-quality.yml`;
- `docs/workstreams/F17_PUBLIC_TOURNAMENT_DISCOVERY.md`;
- `package.json` test-chain wiring only;
- `src/components/tournaments/tournament-discovery-controls.tsx`;
- `src/components/tournaments/tournament-discovery-page.tsx`;
- `src/components/tournaments/tournament-inventory-card.tsx`;
- `src/lib/tournament-discovery-contract.spec.ts`;
- `src/lib/tournament-discovery-contract.ts`;
- `src/lib/tournament-discovery-data.ts`;
- `src/lib/tournament-discovery-http-repository.ts`;
- `src/lib/tournament-discovery-repository.ts`;
- `src/routes/tournaments.index.tsx`.

Explicitly untouched:
- shared F02 `src/components/tournaments/tournament-discovery-card.tsx`;
- legacy `src/lib/tournament-data.ts` because unre-certified adjacent routes still depend on it;
- lockfile and dependency versions;
- frozen route source outside F17.

## 8. Exact-head acceptance

Exact implementation head `e160029e30cba55543abffc4a7974f261ecd2ad4`:

- Frontend Quality Gate `34615882813` PASS;
  - artifact `10270855890`;
  - digest `sha256:d92129eb07b13ba1be92ce8c5b3ebe658d16354868369bd91e8978a51ce82e2c`;
- F17 Public Tournament Discovery Quality Gate `34615882561` PASS;
  - artifact `10270585437`;
  - digest `sha256:a07a4c861fca713328c448d79b2e646d5c2490366ffab8f3e1ab1f410c56938b`;
  - base/filtered SSR evidence and exactly 12 screenshots at `375 / 390 / 430 / 768 / 1024 / 1440`;
  - manual visual inspection PASS with no observed horizontal overflow, clipping or overlap.

## 9. Implementation PR acceptance

Implementation PR #87 — MERGED.

PR-context gates on exact implementation head:
- Frontend Quality Gate `34616599072` PASS;
  - artifact `10271475959`;
  - digest `sha256:32ef3ddedb1032335bd3190ad7db91c6dc46d5b4f170a65536dbd849d17ea8b8`;
- F17 Public Tournament Discovery Quality Gate `34616599109` PASS;
  - artifact `10271306271`;
  - digest `sha256:a38952b3d731428baaff299f953446644fb5672f4010f9955ee52d2eca70d8b6`;
- F16 Public Home regression gate `34616599011` PASS;
  - artifact `10271261396`;
  - digest `sha256:3e81cbca21726e2aee8c5bfc4fe9f27574fd4d13d8d01473ef82253173f9938e`.

Pre-merge lock:
- mergeable `true`;
- unresolved review threads `0`;
- live `main` exact START_SHA `fb87a7d84470db6ed1eba03ce0251c5f1eb6b7a9`;
- expected-head merge used with `e160029e30cba55543abffc4a7974f261ecd2ad4`.

Implementation merge/main:

`22e4c67425f2bf0cefe9079b2e014c2395f6448a`

## 10. Post-main implementation acceptance

On exact accepted main `22e4c67425f2bf0cefe9079b2e014c2395f6448a`:
- Frontend Quality Gate `34617140049` PASS including full browser regression;
  - artifact `10270983180`;
  - digest `sha256:0ee55d941a16e51812ae89a0e66402c45dacaf70c6a1b5c60396528c86fb6c94`;
- F17 Public Tournament Discovery Quality Gate `34617140093` PASS;
  - artifact `10270487803`;
  - digest `sha256:a1752a6cd4deb55e5921cbe68b100d2f3d4689584fa279653521bce334b30c4e`;
- F16 Public Home regression gate `34617140003` PASS;
  - artifact `10270367871`;
  - digest `sha256:c6007f3c04679ae436670be18e96db259aca9391410dc2370bb549e57466b3a1`.

Live frontend `main` was reverified exact implementation merge after those gates.

## 11. Route registry decision

Because implementation is merged and required post-main QA is green, `/tournaments` is eligible for non-recursive promotion from `NEEDS_RECERTIFICATION` to:

`FINAL_CURRENT`

This route-level promotion does not itself mean the F17 workstream is terminally frozen. Workstream terminal status still requires closeout merge and terminal frozen-main evidence.

## 12. Documentation-only closeout scope

Closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F17_PUBLIC_TOURNAMENT_DISCOVERY.md`;
4. `docs/workstreams/F17_CLOSEOUT.md`.

No source code, package, lockfile, workflow, runtime configuration or dependency change is authorized.

## 13. Remaining terminal gates

After this closeout snapshot is committed, F17 still requires:
1. exact closeout compare: ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to `main` without auto-closing Issue #84;
3. PR-context normal + focused F17 gates PASS, plus any triggered frozen-route regression gate;
4. mergeable=true;
5. unresolved review threads=0;
6. exact live-main lock at implementation merge SHA before merge;
7. expected-head closeout merge;
8. terminal frozen-main normal Frontend Quality Gate PASS;
9. terminal frozen-main focused F17 gate PASS;
10. terminal artifact IDs and SHA-256 digests recorded;
11. exact live frontend main reverified after terminal gates;
12. Issue #84 updated with terminal facts and CLOSED / COMPLETED.

Only after those future facts exist may the workstream be reported:

`F17 — DONE / MERGED / FROZEN — FINAL_CURRENT`
