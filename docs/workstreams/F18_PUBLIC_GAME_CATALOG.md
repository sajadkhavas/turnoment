# F18 — Public Game Catalog

Status: `IN PROGRESS — IMPLEMENTATION QA`

Tracking Issue: `#89`

Route: `/games`

START_SHA:

`73955783add94c562f4eea0bb55300aab077c342`

Implementation branch:

`phase/f18-public-game-catalog`

## 1. Mandatory preflight

Read from exact START_SHA before mutation:
- `PROJECT_CONTINUITY.md`
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`
- `SEO_FINAL_COPY_PROTOCOL.md`
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`
- `docs/workstreams/F02_GAME_DETAIL.md`

Live frontend `main` was verified exact START_SHA before branch creation.

F17 `/tournaments` was independently terminal before F18 began:
- Issue `#84` CLOSED / COMPLETED;
- closeout PR `#88` MERGED;
- terminal frozen main `73955783add94c562f4eea0bb55300aab077c342`;
- terminal full gate `34618556371` PASS;
- terminal focused F17 gate `34618556522` PASS.

Backend alignment lock at F18 start:
- repo `sajadkhavas/turnoment-backend`;
- backend main `a5644ae4b4e64908088f389e43155c268fe6e29d`;
- Backend NEXT remains exactly `P02 — Games / Catalog Foundation`.

## 2. Baseline source audit

The START_SHA `/games` route was not current-law final because:
1. `src/routes/games.index.tsx` directly imported `popularGames` and `allTournaments` fixture data;
2. tournament counts were derived in the frontend with `allTournaments.filter(...)`;
3. no SSR loader/repository/runtime-validation boundary existed;
4. no production HTTP adapter existed;
5. no final loading/error/empty boundary existed;
6. title metadata still contained legacy `ایران مهر افزار` branding;
7. the route had not completed the current SEO/final-copy evidence chain.

F02 `/games/$slug` is already `FINAL_CURRENT`; it is a frozen dependency and is not an F18 implementation target.

## 3. Permanent architecture

`/games → SSR loader → typed GameCatalogRepository → runtime-validated catalog projection → Game Catalog UI`

Repository/backend owns:
- public/published catalog membership;
- catalog order;
- stable `gameId`;
- canonical game slug;
- game name/short name;
- supported platform labels;
- game-entity catalog summary;
- optional cover image URL;
- optional tournament-count projection when authoritative.

Frontend owns:
- final static Persian page copy and information hierarchy;
- presentation/formatting;
- responsive/accessibility behavior;
- canonical/robots metadata;
- semantic/crawlable links to frozen game-detail pages;
- semantic/crawlable links to game-filtered tournament inventory;
- deterministic fixture repository for dev/test/visual QA only.

Frontend MUST NOT derive production catalog membership, canonical identity or tournament counts from local tournament arrays.

## 4. Runtime contract

Planned anonymous-safe/read-only endpoint:

`GET /api/v1/games/`

Production adapter requirements:
- `VITE_API_BASE_URL` is mandatory;
- `credentials: include` retains same-origin session compatibility without exposing private data;
- HTTP non-success fails closed;
- JSON is runtime-validated with strict Zod schemas;
- no production fallback to fixture catalog records.

Current integration truth remains:

`FRONTEND MOCK / BACKEND PENDING`

until an authorized backend phase implements and permission-tests `GET /api/v1/games/`.

The list contract preserves the same stable game IDs/canonical slugs used by frozen F02 `GET /api/v1/games/{slug}/` planning.

## 5. DTO invariants

`GameCatalogPageData`:
- `schemaVersion = 1`;
- `totalItems` must equal complete public `items.length`;
- game IDs are unique;
- canonical slugs are unique.

Each public item:
- stable `gameId`;
- canonical lowercase slug;
- `publicationState = published`;
- `name` and `shortName`;
- final catalog description;
- one or more unique platform labels;
- nullable `coverImage`;
- nullable/non-negative `tournamentCount`.

The schema is strict: unexpected private fields are rejected.

## 6. Navigation and frozen-route compatibility

Each game card exposes:
- canonical game hub: `/games/$slug` using the DTO canonical slug;
- tournament inventory: `/tournaments?game=<stable-game-id>`.

F18 does not edit:
- `src/routes/games.$slug.tsx`;
- F02 contract/repository/fixture/workflow/docs.

F02 remains the leaf game-detail authority.

## 7. SEO / final-copy research decisions

Audience:
- players browsing which supported games have a competitive path in Turnoment.

Primary intent:
- game catalog / competitive-game discovery.

Topic cluster:
- `بازی‌های مسابقات گیمینگ`;
- `بازی‌های تورنمنت`;
- `بازی‌های رقابتی`.

Entity support:
- canonical game names;
- platforms;
- tournaments;
- competitive game hubs.

Cannibalization boundary:
- `/games` = multi-game public catalog;
- `/games/$slug` = one game's competitive hub;
- `/tournaments` = tournament inventory/filtering;
- `/centers` = gaming-center discovery;
- `/ranking` = player ranking intent.

Final route copy lock:
- H1: `بازی‌های مسابقات گیمینگ`;
- title: `بازی‌های مسابقات گیمینگ حضوری | Turnoment`;
- canonical: `/games`;
- robots: `index,follow`.

No external popularity ranking, search-volume, prize-pool, viewership, `best/largest/official` or similar unsupported claim is introduced.

Route-specific rich-result structured data is intentionally omitted for this multi-entity catalog.

## 8. Official-source decisions

Reviewed for F18:
- TanStack Router / Start data-loading and SSR guidance;
- Google Search canonicalization, title/link and people-first content guidance;
- Google structured-data general policies;
- WCAG 2.2 focus/target-size requirements.

Applied decisions:
- `ssr: true` remains explicit;
- data enters through the route loader, not browser `useEffect` authority;
- canonical route is singular `/games`;
- crawlable links connect catalog → game detail → tournament discovery;
- interactive targets use visible focus and at least the project touch-safe minimum;
- one semantic `<main>` per state.

## 9. Product/design reference decisions

Reference patterns reviewed:
- start.gg: game identity is a first-class tournament-discovery dimension;
- Esports Charts: scannable game inventory with concise game identity/context.

Turnoment keeps its own RTL premium-esports system. No competitor copy, assets, popularity ordering or unsupported metrics are copied.

## 10. Implementation checkpoint

Initial implementation commit:

`3675581bda3f97ca8d3cb49921c66e1e14240c5e`

Package full-suite wiring commits:
- `f04ed182edb934a02f27a1ccf81059192aef9363` added F18 contract to the global test command but accidentally changed one existing devDependency version;
- `0b625d6554b0f5e5f638e449b18c3154d8e6ecf5` immediately restored the exact package baseline version while retaining only the F18 test-suite addition.

Cumulative compare from START through `0b625d6554b0f5e5f638e449b18c3154d8e6ecf5` confirms `package.json` has only one intended line replacement: append `game-catalog-contract.spec.ts` to the existing test command. No dependency/version/lockfile delta remains.

Implementation surface at that checkpoint:
- `.github/workflows/f18-public-game-catalog-quality.yml`;
- `package.json` test command only;
- `src/components/games/game-catalog-page.tsx`;
- `src/lib/game-catalog-contract.ts`;
- `src/lib/game-catalog-contract.spec.ts`;
- `src/lib/game-catalog-fixture.ts`;
- `src/lib/game-catalog-http-repository.ts`;
- `src/lib/game-catalog-repository.ts`;
- `src/routes/games.index.tsx`.

F02 `/games/$slug` files remain outside the diff.

## 11. QA contract

Focused F18 gate requires:
- contract checks;
- production build;
- typecheck;
- SSR H1/title/meta/canonical evidence;
- canonical game-detail link evidence;
- stable-game-ID tournament-link evidence;
- internal links to tournaments/centers/ranking;
- rejection of legacy brand/implementation-stage public copy;
- exactly one `<main>`;
- screenshots at `375 / 390 / 430 / 768 / 1024 / 1440`;
- uploaded artifact retained 14 days.

Normal Frontend Quality Gate remains independently mandatory.

## 12. Acceptance chain

F18 is not `DONE` merely because implementation exists.

Required terminal chain:
1. settle exact implementation head;
2. exact-head normal + focused F18 CI PASS and retain artifact/digest evidence;
3. manual focused visual artifact inspection;
4. implementation PR without auto-closing Issue #89;
5. PR-context normal + focused F18 gates PASS;
6. mergeable true / unresolved threads 0 / exact pre-merge main lock;
7. expected-head implementation merge;
8. post-main normal + focused F18 QA PASS;
9. documentation-only closeout under root non-recursive law;
10. closeout merge;
11. terminal frozen-main normal + focused F18 QA PASS;
12. exact live-main verification;
13. record terminal evidence in Issue #89 and close it `completed`.

Until all terminal gates exist, status must remain truthful (`IN PROGRESS`, `READY TO MERGE`, or `MERGED / CLOSEOUT IN PROGRESS`).
