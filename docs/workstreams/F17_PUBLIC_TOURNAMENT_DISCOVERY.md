# F17 — Public Tournament Discovery

Status: `IN PROGRESS — IMPLEMENTATION BRANCH`

Route: `/tournaments`

Tracking Issue: `#84`

START_SHA: `fb87a7d84470db6ed1eba03ce0251c5f1eb6b7a9`

Branch: `phase/f17-public-tournament-discovery`

Target: `FINAL_CURRENT`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 1. Mandatory preflight

Read from exact START_SHA before mutation:
- `PROJECT_CONTINUITY.md`
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`
- `SEO_FINAL_COPY_PROTOCOL.md`
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`
- `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md`

Registry truth at start: `/tournaments` is the immediate current-law public recertification target after terminal F16 Home.

## 2. Source audit

Legacy route gaps confirmed before implementation:
- route imported local `tournament-data.ts` options/stats/filtering directly;
- filtering and sorting ran in the browser over a local inventory;
- featured tournament was selected with a local status heuristic;
- aggregate stats included hardcoded/local values;
- verification/lifecycle/capacity/fee/prize came from fixtures without a production repository boundary;
- no server pagination contract;
- no route pending/error loader states;
- nested `<main>` landmarks existed through `TournamentLayout` plus route-owned `<main>`;
- metadata still contained legacy `ایران مهر افزار` branding;
- filter variants had no explicit faceted-URL indexing policy;
- current-law SEO/final-copy evidence did not exist.

## 3. Permanent architecture

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

Production MUST NOT download arbitrary inventory and become authoritative for filtering/sorting or silently fall back to fixture data.

## 4. Frozen-route compatibility boundary

`/games/$slug` (F02) is already frozen and imports the legacy shared `TournamentDiscoveryCard` from `src/components/tournaments/tournament-discovery-card.tsx`.

F17 therefore MUST NOT change that shared component's accepted signature/behavior. F17 owns a separate `src/components/tournaments/tournament-inventory-card.tsx` for the new typed discovery projection. The legacy shared card and F02 source remain untouched by the final F17 diff.

This decision was enforced after exact-head CI exposed a type regression from an initial shared-component replacement; the branch was rewritten before PR creation so the accepted implementation remains one commit from START and the frozen F02 surface is outside the final diff.

## 5. Backend alignment

Backend repo: `sajadkhavas/turnoment-backend`

Documentation-only F17 alignment is terminal:
- Backend START: `335211d711c197a440e086bc570b86f2c5cd65f8`
- Issue `#31` — CLOSED / COMPLETED
- docs head `1566574c26a747edee785fcc2ff76f014fc63b3e`
- PR `#32` — MERGED
- PR-context Backend Quality Gate `34609152989` — PASS on Python 3.12 / 3.14
- accepted backend merge/main `a5644ae4b4e64908088f389e43155c268fe6e29d`
- post-main Backend Quality Gate `34609435404` — PASS on Python 3.12 / 3.14
- no Python/models/migrations/serializers/views/URLs/dependency/phase-registry mutation
- Backend NEXT remains exactly `P02 — Games / Catalog Foundation`

Planned endpoint:

`GET /api/v1/tournaments/`

No runtime tournament-discovery endpoint is claimed live by F17.

## 6. Official documentation audit

Reviewed current official sources on 2026-09-11.

### TanStack Router / Start
- Search parameter validation: `https://tanstack.com/router/latest/docs/how-to/validate-search-params`
- Search parameters/navigation: `https://tanstack.com/router/latest/docs/how-to/setup-basic-search-params`
- Data loading / loaderDeps: `https://tanstack.com/router/latest/docs/guide/data-loading`
- RouteOptions head/loaderDeps API: `https://tanstack.com/router/latest/docs/api/router/RouteOptionsType`
- Document head management: `https://tanstack.com/router/latest/docs/guide/document-head-management`

Applied decisions:
- search state is runtime-normalized before consumption;
- every search field used by the loader is represented in deterministic `loaderDeps`;
- route loader performs the SSR discovery request;
- route head owns title/description/robots/canonical metadata;
- filter changes remain shareable/bookmarkable URL state;
- no browser-only primary inventory fetch is introduced.

### Google Search Central / Crawling Infrastructure
- Canonicalization: `https://developers.google.com/search/docs/crawling-indexing/canonicalization`
- Faceted navigation: `https://developers.google.com/crawling/docs/faceted-navigation`
- Structured-data guidelines: `https://developers.google.com/search/docs/appearance/structured-data/sd-policies`
- Event structured data: `https://developers.google.com/search/docs/appearance/structured-data/event`

Applied decisions:
- unfiltered `/tournaments` is the primary indexable inventory URL;
- faceted/sort/page variants remain useful/shareable but use `noindex,follow` and canonical `/tournaments`;
- arbitrary filter combinations are not promoted into SEO landing pages;
- no Event structured data is emitted on this multi-event listing route because the Event feature belongs on a unique event leaf URL; tournament-detail routes are the future evaluation surface;
- no invented schema values or unsupported search claims.

### WCAG 2.2
- Standard: `https://www.w3.org/TR/WCAG22/`
- Target Size (Minimum) 2.5.8 and keyboard focus requirements reviewed.

Applied decisions:
- semantic labels/selects/buttons/links;
- visible `focus-visible` indicators;
- touch targets generally 44px for primary controls;
- mobile Sheet retains labelled controls and clear reset action;
- exactly one `<main>` landmark in normal/pending/error states;
- status is communicated by text rather than color alone.

## 7. Design-reference audit

Current real-product references reviewed:
- start.gg tournament search (`https://www.start.gg/search/tournaments`) — game, status, location, fee, event type and date filtering with direct inventory;
- Challonge tournament search (`https://challonge.com/search/tournaments`) — dedicated tournament-search surface;
- start.gg developer discovery examples — stable game/location filtering and paginated result ownership.

Turnoment direction:
- preserve the premium RTL esports identity;
- preserve filter-first discovery instead of replacing it with a generic marketing page;
- surface registration state, venue/location, schedule, capacity, cost and fixed prize directly on results;
- copy no competitor branding/text/assets;
- remove the legacy no-op find button because filters now directly mutate validated URL navigation state.

## 8. SEO content research

Indexability:
- base `/tournaments` = `index,follow`;
- any normalized search facet/sort/page = `noindex,follow` + canonical `/tournaments`.

Product job: compare current in-person gaming tournaments before opening one tournament detail.

Audience:
- primary: players in Iran looking for an in-person gaming competition;
- secondary: visitors comparing options before participation.

Primary intent: discovery / participation-oriented tournament inventory.

Primary topic/query cluster:
- `تورنمنت بازی`
- `مسابقات گیمینگ`
- `مسابقات گیم نت`

Supporting entities:
- game name;
- city/location;
- tournament date;
- registration state;
- free/paid registration;
- gaming center/venue;
- capacity;
- fixed prize.

Language variants evaluated:
- `تورنمنت` / `مسابقه` / `مسابقات`;
- `گیمینگ` / `بازی`;
- `گیم‌نت` / `گیم نت`;
- canonical English game names remain unchanged when authoritative data uses them.

Current tournament products commonly expose game, location, status, format, date and fee as immediate discovery controls. Turnoment's content opportunity is one structured inventory answering what game, where, when, registration state, capacity, cost and direct detail route.

No external search-volume or keyword-difficulty numbers are claimed.

Cannibalization boundary:
- `/` = broad discovery gateway/explanation;
- `/tournaments` = full filterable tournament inventory;
- `/games` = game catalog;
- `/centers` = gaming-center discovery;
- `/tournaments/$id` = one tournament detail/participation context;
- `/rules` = general rules/product-policy surface.

## 9. Final copy plan

H1:

`تورنمنت‌ها و مسابقات گیمینگ حضوری`

Title:

`تورنمنت‌ها و مسابقات گیمینگ حضوری | Turnoment`

Meta description:

`تورنمنت‌ها و مسابقات گیمینگ حضوری را بر اساس بازی، شهر، زمان، وضعیت ثبت‌نام و هزینه پیدا کن و برای جزئیات کامل وارد صفحه هر مسابقه شو.`

Internal-link strategy:
- each result → stable `/tournaments/{slug}` with anchor `جزئیات مسابقه`;
- supporting discovery links → `/games`, `/centers`, `/rules` with descriptive Persian anchors.

Structured-data decision: omit on this multi-event listing route.

People-first review target:
- no implementation/backend/API/mock wording visible;
- no unsupported `best/largest/official` claims;
- no invented stats/search demand;
- no keyword stuffing;
- filter labels remain task-oriented rather than SEO repetition.

## 10. Implementation scope

Owned implementation files:
- `src/routes/tournaments.index.tsx`
- `src/components/tournaments/tournament-discovery-controls.tsx`
- `src/components/tournaments/tournament-discovery-page.tsx`
- `src/components/tournaments/tournament-inventory-card.tsx`
- `src/lib/tournament-discovery-contract.ts`
- `src/lib/tournament-discovery-data.ts`
- `src/lib/tournament-discovery-http-repository.ts`
- `src/lib/tournament-discovery-repository.ts`
- `src/lib/tournament-discovery-contract.spec.ts`
- `.github/workflows/f17-public-tournament-discovery-quality.yml`
- `package.json` test-chain wiring only; no dependency/version change.

Documentation owned by the workstream:
- `docs/workstreams/F17_PUBLIC_TOURNAMENT_DISCOVERY.md`

Explicitly untouched:
- `src/components/tournaments/tournament-discovery-card.tsx` (shared with frozen F02);
- `src/lib/tournament-data.ts` (other pre-recertification routes still depend on it);
- lockfile and dependency versions;
- frozen F01–F16 route source.

## 11. Acceptance gates remaining at implementation authoring time

- exact one implementation commit from START_SHA;
- changed-file allowlist and no dependency/lockfile drift;
- exact-head normal Frontend Quality Gate PASS;
- exact-head focused F17 gate PASS with SSR evidence + 12 screenshots at 375/390/430/768/1024/1440 for base and filtered states;
- manual screenshot inspection;
- implementation PR-context normal + focused gates PASS;
- mergeable=true, unresolved review threads=0, exact-main lock;
- expected-head merge;
- post-main normal + focused gates PASS;
- documentation-only closeout branch/PR;
- terminal frozen-main normal + focused QA/artifacts/digests;
- exact live-main verification;
- only then update/close Issue #84 as `completed`.
