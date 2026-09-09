# F03 — Final My Tournaments

Status: `IN PROGRESS`

START_SHA: `4afb49e913d5fd7e2420031ae957fde2e79e3e8a`

Implementation branch: `phase/f03-my-tournaments`

Tracking issue: `#38`

Route: `/dashboard/tournaments`

Indexability: `PRIVATE / NOINDEX`

## Scope

Replace the existing `DashboardSectionPlaceholder` at `/dashboard/tournaments` with the final private My Tournaments page. The page is the player's participation command center for tournaments they have already joined or completed; it is not a duplicate of public tournament discovery.

The permanent page boundary is:

`Route → validated search → inherited dashboard access policy → loader → typed My Tournaments repository → runtime-validated response → UI`

The frontend displays authoritative participation/tournament states. It does not decide registration eligibility, tournament lifecycle, check-in eligibility, seeding/bracket truth, result truth, rating changes, payment/refund truth, moderation or disputes.

## Mandatory governance read

Read before implementation at the exact START_SHA:

- `PROJECT_CONTINUITY.md`
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`
- `SEO_FINAL_COPY_PROTOCOL.md`
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`
- `docs/OFFICIAL_FRONTEND_SOURCES.md`
- `docs/DESIGN_REFERENCE_AUDIT_TEMPLATE.md`
- `docs/PAGE_WORKSTREAM_EVIDENCE_TEMPLATE.md`
- `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md`
- `docs/workstreams/F01_TOURNAMENT_DETAIL_REGISTRATION.md`

Repository root `README.md` was also reviewed. It is the inherited IranMehrAfzar/Laravel ecommerce brief and is not used as Turnoment competitive architecture truth. Current continuity, route registry, final page protocol and accepted Turnoment workstreams take precedence for this route.

## Stage A — Exact repository lock

- verified frontend `main`: `4afb49e913d5fd7e2420031ae957fde2e79e3e8a`
- exact tree: `f40a00f047e4f15471dc6aa5e4b28623742717ee`
- overlapping branch search for `f03`, `dashboard-tournaments`, `tournaments`: none
- overlapping open My Tournaments issue/PR before #38: none
- dedicated branch created from exact START_SHA: `phase/f03-my-tournaments`
- tracking Issue #38 opened as `IN PROGRESS`

## Official documentation audit

Reviewed on 2026-09-09 before implementation.

### TanStack Router — authenticated routes

https://tanstack.com/router/latest/docs/guide/authenticated-routes

Decisions:
- keep authentication UX gating in parent `/dashboard` `beforeLoad`;
- do not add a second competing child auth system;
- parent `beforeLoad` runs before child route loading;
- route guards are not API authorization boundaries, so the Django endpoint must authorize every private request independently;
- Django Session + cookies remain the web auth truth; no localStorage bearer-token auth is introduced.

### TanStack Router — data loading

https://tanstack.com/router/latest/docs/guide/data-loading

Decisions:
- child page data is loaded by the route loader;
- validated search is resolved before loader execution;
- loader dependencies are derived from navigation-owned search state;
- the page component consumes typed loader data rather than starting browser-only primary fetches after render.

### TanStack Router — search params

https://tanstack.com/router/latest/docs/guide/search-params

Decisions:
- tournament state, game and page are navigation state and therefore live in validated URL search;
- invalid search values normalize to safe defaults;
- filters remain bookmarkable/back-forward-safe without hidden component state becoming the source of navigation truth.

### W3C WCAG 2.2

https://www.w3.org/TR/WCAG22/

Decisions:
- native links/buttons/selects for interactive controls;
- keyboard-operable filter/pagination/navigation actions;
- visible focus indicators;
- semantic heading/list/status structure;
- state is communicated by text/semantics, not color alone;
- touch targets and mobile layout are treated as acceptance requirements.

### Project authentication source of truth

Accepted Turnoment parent route `/dashboard` and P01 auth truth:
- parent `beforeLoad` calls `playerSessionRepository.getSession()`;
- unauthenticated users redirect to `/login`;
- private Django requests use Session Authentication with `credentials: include`;
- Django remains independently authoritative for authorization.

## Existing Turnoment design/reference audit

Reviewed before implementation:

### Player Dashboard `/dashboard`

Patterns retained:
- `DashboardShell` and its RTL desktop/mobile navigation;
- dark Turnoment card hierarchy and existing tokens;
- private `noindex,nofollow` head policy;
- route loader + repository + pending/error architecture;
- concise operational language rather than marketing-page hero copy.

### Existing `MyTournamentsPreview`

Useful patterns retained:
- state grouping of upcoming/live/completed;
- compact tournament identity + venue/date/status presentation;
- navigation to the canonical tournament detail route.

Patterns deliberately not promoted to the final page:
- local component-only tabs as navigation truth;
- loose display-string business states;
- preview-only tournament contract;
- one-size-fits-all action labels.

### Tournament Detail / Registration F01

Patterns retained:
- stable tournament ID + semantic slug;
- lifecycle/check-in/registration truth supplied by the contract;
- tournament page remains the operational destination for check-in/bracket/results actions;
- frontend does not calculate authoritative competitive state.

## External real-product reference audit

### Battlefy — Joined Tournaments / Check-in

References:
- https://help.battlefy.com/en/articles/4587324-how-to-check-in-to-a-tournament
- https://help.battlefy.com/en/articles/4587291-standard-tournament-join-flow
- https://help.battlefy.com/en/articles/6945867-tournament-flow
- https://help.battlefy.com/en/articles/5749112-team-based-tournament-join-flow

Observed product patterns:
- after joining, the user's tournament list is a gateway back to the tournament they are participating in;
- check-in availability and urgency are primary operational states, not decorative metadata;
- the next required action changes as the event moves from registered → check-in → seeded/live → result;
- team participation requires team identity/roster context separate from individual participation;
- critical tournament information belongs on the tournament page, while the joined-tournaments surface should make the correct event and next action easy to reach.

What will NOT be copied:
- Battlefy branding, copy, assets or page layout;
- Battlefy-specific tournament rules/timers;
- mutation behavior not yet owned by F03;
- any assumption that all Turnoment tournaments require the same check-in model.

## Selected Turnoment design direction

My Tournaments is a private participation dashboard, not discovery.

### Primary hierarchy

1. page identity and concise explanation;
2. authoritative participation summary counts;
3. URL-backed state/game filters;
4. tournament cards ordered by backend response, each exposing:
   - tournament/game identity,
   - lifecycle state,
   - registration state,
   - check-in state when applicable,
   - venue and scheduled start,
   - individual/team participation context,
   - completed result context when available,
   - one authoritative next action;
5. pagination when multiple result pages exist;
6. useful empty state leading to public tournament discovery.

### Desktop

- reuse DashboardShell;
- compact header followed by summary strip;
- horizontal filters;
- dense responsive card/list grid optimized for scanning participation state.

### Mobile

- single-column content;
- filters wrap/stack without horizontal overflow;
- action remains a full-width or easily reachable touch target;
- long tournament/team/venue names wrap safely.

### Accessibility

- H1 + descriptive introductory copy;
- labelled filter group;
- native select for game filtering;
- text status labels in addition to color/tone;
- list semantics for tournaments;
- aria-live result-count status;
- visible focus for all interactive controls.

## SEO / final-copy decision

`/dashboard/tournaments` is authenticated/private and remains `noindex,nofollow`.

Public search-intent/SERP/keyword research is therefore `N/A` under the frontend protocol. The SEO protocol was still read because final visible copy must remain natural product language.

Required copy rules:
- no “backend/API/mock/demo/temporary/waiting” wording;
- no implementation jargon exposed to players;
- labels explain product state in natural Persian;
- the page title/H1 are specific to the user's tournaments;
- error and empty states explain user actions, not system architecture.

## Final production contract — planned

The full page receives a dedicated contract instead of expanding the dashboard preview contract into page-specific concerns.

### Query

- `state`: `all | upcoming | live | completed`
- `gameId`: optional stable game identifier
- `page`: positive integer

### Page result

- backend-provided summary counts for `total / upcoming / live / completed`;
- backend-provided available game filter options;
- ordered tournament participation items;
- backend-provided pagination truth.

### Tournament participation item

Stable identity:
- tournament ID + slug;
- game ID + name;
- gaming-center ID + name + city;
- ISO start datetime + timezone;
- format label.

Authoritative states:
- lifecycle state;
- registration state;
- check-in state;
- individual/team participation projection;
- optional completed-result projection;
- next-action kind.

The frontend may localize enum labels and format dates for presentation, but does not infer eligibility/lifecycle/check-in/result/action availability.

### Permanent API mapping

Planned production adapter:

`GET /api/v1/me/tournaments/?state={state}&game={gameId}&page={page}`

- authenticated with Django Session cookies (`credentials: include`);
- response is runtime-validated before the UI consumes it;
- fixture repository implements the same TypeScript interface for development/test/visual QA;
- presentation components do not know which adapter is active.

F03 does not add withdraw, registration editing, result submission or dispute mutations. Those actions remain owned by their dedicated tournament/match workstreams.

## UI state matrix

Required before final acceptance:

- normal populated list
- pending/loading
- empty for all tournaments
- empty for selected filter
- request error/retry
- unauthenticated/session-expired access policy via parent dashboard guard / private API authorization
- upcoming registered state
- check-in not-open/open/completed/missed states when supplied
- live state
- team participation state
- completed result state
- multi-page pagination
- invalid URL search normalization

## Owned files

F03 owns or may modify:
- `src/routes/dashboard.tournaments.tsx`
- F03 My Tournaments components
- F03 domain/repository/runtime-schema files
- F03 contract tests
- `package.json` test registration
- `docs/workstreams/F03_MY_TOURNAMENTS.md`
- `PROJECT_CONTINUITY.md`
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`
- Issue/PR/CI closeout evidence

It does not own:
- public `/tournaments` recertification;
- full bracket/live tournament UI;
- My Matches / result submission / dispute;
- Auth / OTP rebuild;
- backend P02 Games/Catalog implementation.

## Quality / QA acceptance — pending

Required:
- frozen install / repository quality workflow
- lint
- TypeScript typecheck
- F03 runtime-contract tests
- existing dashboard/F01/F02 regression contract tests
- production build
- responsive browser QA at `375 / 390 / 430 / 768 / 1024 / 1440`
- keyboard/focus review
- no horizontal overflow
- natural-copy/engineering-language review
- PR review threads = 0 before merge
- post-merge main Quality Gate green

## Current exact NEXT

Implement the dedicated My Tournaments contract/repository/runtime schema, then rebuild `/dashboard/tournaments` on that contract without changing the accepted parent dashboard auth/shell architecture.
