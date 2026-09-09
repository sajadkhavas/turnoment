# F02 — Final Game Detail

Status: `IN PROGRESS`

START_SHA: `2ea5df3ecbd3a698fa838a8023994c0fc73e18a1`

Branch: `phase/f02-game-detail`

Tracking issue: `#29`

## Scope

Build `/games/$slug` once as the final public Game Detail route under `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, and connect `/games` listing cards to stable semantic game URLs.

## Official documentation audit

Reviewed on 2026-09-09 before implementation:

1. TanStack Start — https://tanstack.com/start/latest
   - Start is router-first; route params, loaders, pending/error/notFound boundaries remain the application contract.
   - Game Detail primary content stays route-loader driven and SSR-renderable.
2. TanStack Start selective SSR — https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr
   - Matching routes render on the server by default (`ssr: true`).
   - Game Detail remains full SSR because game identity, tournament discovery and rankings are public crawlable content.
3. TanStack Router document head management — https://tanstack.com/router/latest/docs/guide/document-head-management
   - Route `head` owns title, description, canonical and social metadata.
4. Google canonicalization — https://developers.google.com/search/docs/crawling-indexing/canonicalization
   - Stable semantic game slug is the canonical public URL.
5. Google Breadcrumb structured data — https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
   - A visible Games → Game hierarchy is appropriate for the page.
   - F02 may emit BreadcrumbList only when it matches the visible breadcrumb path.
6. Google structured data general policies — https://developers.google.com/search/docs/appearance/structured-data/sd-policies
   - Do not invent unsupported game rich-result markup. F02 intentionally avoids speculative VideoGame schema for search features Google does not document as supported rich results.
7. W3C WCAG 2.2 — https://www.w3.org/TR/WCAG22/
   - Semantic landmarks/headings, keyboard links, visible focus, text-based status and responsive readable content remain acceptance requirements.

## Design reference audit

Turnoment masters inspected first:
- Homepage
- Tournament Discovery
- F01 Tournament Detail + Registration
- Player Dashboard

External product references:

### BLAST Counter-Strike hub
Reference: https://blast.tv/cs
Useful patterns:
- game identity and short positioning copy are immediately visible;
- ongoing/upcoming/past competition is the main content hierarchy;
- rankings/players/content sit under the same game hub without turning the page into a generic directory;
- the page acts as a competitive game home, not a product-detail page.

### Liquipedia Counter-Strike tournament portal
Reference: https://liquipedia.net/counterstrike/Portal:Tournaments
Useful patterns:
- tournament information is grouped around a game-specific hub;
- rankings/statistics are separate but closely linked information domains;
- high-density competition data still benefits from clear section hierarchy.

### Battlefy tournament discovery
Reference: https://help.battlefy.com/en/articles/6950799-finding-tournaments-for-you
Useful patterns:
- game selection is a primary discovery dimension;
- platform/region context belongs near game discovery rather than hidden in generic filters;
- mobile keeps game discovery actionable without preserving desktop density.

### Toornament 2025 player platform
Reference: https://blog.toornament.com/2025/02/toornament-evolves-with-a-new-tournament-platform-and-products-for-organizers/
Useful patterns:
- modern player-facing discovery prioritizes participation and competition content;
- white-label responsive hierarchy can preserve event/game identity without copying organizer admin patterns.

## Selected Turnoment direction

Game Detail is a competitive hub for one game, not an encyclopedia article or ecommerce product page.

Information architecture:
1. visible breadcrumb: Games → current game
2. compact cinematic game hero with game name, supported platforms and product-controlled competitive summary
3. authoritative game stats: open tournaments, listed gaming centers, ranked-player availability
4. open/upcoming tournaments for this game
5. competitive formats supported by the game catalog contract
6. ranking preview when official Turnoment ranking is active; explicit product-state empty/unavailable UI otherwise
7. gaming centers currently supporting/hosting the game
8. strong internal links to filtered Tournament Discovery and Ranking

The page does not claim universal rules for the game. Tournament-specific rules remain owned by each Tournament Ruleset.

## Permanent frontend contract

Proposed production endpoint:

`GET /api/v1/games/{slug}/`

Contract domains:
- stable game id + slug
- publication state
- name + short label + public description
- hero/media key or URL projection
- supported platform labels
- competitive format summaries supplied by backend
- public aggregate counts supplied by backend
- open/upcoming tournament summaries
- official Turnoment ranking preview/state
- gaming-center summaries supporting the game
- SEO projection where content management later needs it

The frontend does not calculate authoritative publication state, supported competition formats, official ranking eligibility or venue support truth.

Deterministic fixtures implement the exact same repository interface for development/test/browser QA only.

## SEO decision

- canonical: `/games/{slug}`
- robots: `index,follow` for published games
- dynamic title/description/OG from runtime-validated loader data
- visible breadcrumb + matching BreadcrumbList JSON-LD
- no speculative VideoGame rich-result schema

## Owned files

F02 owns:
- `src/routes/games.$slug.tsx`
- material update to `src/routes/games.index.tsx` for semantic detail links
- `src/components/games/game-detail-page.tsx`
- F02 Game Detail contract/repository/fixture/http adapter/data selector/test files
- F02-specific quality/browser QA additions
- F02 workstream/continuity evidence

## Acceptance law

Do not mark `DONE / MERGED / FROZEN` until responsive browser QA, exact-head CI, PR review, implementation merge, post-merge main CI, documentation closeout and continuity freeze are all verified.