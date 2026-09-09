# F04 — Final My Matches

Status: `IN PROGRESS`

START_SHA: `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`

Implementation branch: `phase/f04-my-matches`

Tracking issue: `#41`

Route: `/dashboard/matches`

Indexability: `PRIVATE / NOINDEX`

## Identity

- Workstream: `F04 — My Matches`
- Route: `/dashboard/matches`
- START_SHA: `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`
- Branch: `phase/f04-my-matches`
- Public/indexable: `NO — private/noindex`

## Stage A — exact repository lock

- frontend `main` verified at `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`;
- F03 terminal Issue #38 evidence reviewed; frozen main and terminal CI are green;
- `PROJECT_CONTINUITY.md` read;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md` read;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md` read;
- `/dashboard/matches` verified as a real `DashboardSectionPlaceholder` and exact frontend NEXT;
- branch searches for `f04` and `matches`: no overlap before branch creation;
- open Issue/PR search for My Matches: none before Issue #41;
- dedicated branch created from exact START_SHA.

## Official documentation audit

Reviewed before implementation on `2026-09-09`:

### TanStack Router — authenticated routes

https://tanstack.com/router/latest/docs/guide/authenticated-routes

Decisions:
- keep authentication UX gating in the accepted parent `/dashboard` `beforeLoad`;
- do not add duplicate child authentication state;
- route guard is not API authorization, so private Django endpoints must independently authorize every request.

### TanStack Router — data loading

https://tanstack.com/router/latest/docs/guide/data-loading

Decisions:
- primary page data belongs in the route loader;
- validated search values used by the loader are declared through `loaderDeps`;
- page component consumes typed loader data rather than starting its primary request after render.

### TanStack Router — search params / navigation

https://tanstack.com/router/latest/docs/guide/search-params

Decisions:
- state, match kind, game and page are navigation-owned filter state;
- validate/normalize search before use;
- filters remain bookmarkable and browser Back/Forward-safe.

### WCAG 2.2

https://www.w3.org/TR/WCAG22/

Relevant acceptance:
- semantic controls and headings;
- visible/unobscured keyboard focus;
- status conveyed by text and semantics, not color alone;
- status messages exposed programmatically;
- touch targets respect the WCAG 2.2 minimum-target principle.

## Design reference audit

### Existing Turnoment references reviewed

- accepted `DashboardShell` + dashboard navigation;
- `dashboard-activity.tsx` Upcoming Match / Recent Matches previews;
- F03 `My Tournaments` final private page, route, repository/runtime-validation pattern;
- existing Turnoment dark RTL card/token system;
- current dashboard session/error/empty-state architecture.

Patterns retained:
- operational private-page hierarchy rather than marketing hero layout;
- compact state summary + URL-backed filters + scannable cards;
- stable IDs and backend-authoritative state enums;
- responsive cards and native controls;
- private `noindex,nofollow` policy.

Patterns not promoted from old previews:
- display-string-only competitive states;
- final result/rating inference in presentation code;
- component-local filters as navigation truth;
- links to unfinished routes.

### External product/interface references reviewed

#### Battlefy — Match Page / tournament flow / score confirmation / match issue

References:
- https://help.battlefy.com/en/articles/4662216-game-day-guide-match-page
- https://help.battlefy.com/en/articles/6966478-using-score-confirmation-on-battlefy
- https://help.battlefy.com/en/articles/6925663-reporting-a-match-issue

Patterns learned:
- match state should make the player's next required attention obvious;
- scheduled/ready/live/result-confirmation/dispute states need different emphasis;
- score confirmation and dispute are separate authoritative workflows;
- match identity needs competition/round/opponent context, not only a score row.

#### Challonge — participant score reporting + attachments

Reference:
- https://kb.challonge.com/en/article/how-to-upload-match-attachments-report-scores-47g9zp/

Patterns learned:
- result reporting is a dedicated action flow that may include evidence;
- the match list should expose state/context without embedding the full mutation workflow.

What will NOT be copied:
- third-party branding, copy, visual layout or assets;
- Battlefy/Challonge-specific tournament timers/rules;
- automatic score-confirmation semantics not explicitly returned by Turnoment backend;
- file/evidence upload behavior before the dedicated Result/Dispute workstreams own it.

## Selected design direction

My Matches is the player's private match ledger and attention center.

Primary hierarchy:
1. page identity and concise final copy;
2. backend-provided summary counts;
3. URL-backed state/kind/game filters;
4. ordered match cards showing competition, round, opponent, schedule/venue, lifecycle/result/dispute state and attention;
5. finalized score/rating delta only when backend supplies a finalized result;
6. pagination;
7. useful empty state leading to public tournament discovery.

Desktop:
- reuse `DashboardShell`;
- five summary cells where space allows;
- compact filters;
- two-column card grid where readable.

Mobile:
- summary becomes a compact two-column grid;
- filters stack/wrap without horizontal overflow;
- cards remain single-column and keep opponent/result hierarchy visible early;
- no action depends on hover or desktop-only interaction.

## SEO / final-copy audit

Public SERP/keyword research: `N/A` because this is an authenticated private route.

Still mandatory:
- explicit `noindex,nofollow`;
- final natural Persian copy;
- no backend/API/mock/demo/temporary/waiting language;
- no unsupported guarantee about result/dispute processing;
- page title/H1 specific to My Matches.

Selected copy direction:
- H1: `Matchهای من`
- title: `Matchهای من — داشبورد بازیکن`
- supporting copy: explain that schedule, opponent, status and finalized results are collected in one place.

## Final production contract

The full page gets a dedicated contract rather than expanding dashboard preview types.

### Query

- `state`: `all | upcoming | action-required | completed | disputed`
- `kind`: `all | tournament | challenge`
- `gameId`: optional stable game ID
- `page`: positive integer

### Page response

- current-player display identity needed for versus presentation;
- summary counts: `total / upcoming / actionRequired / completed / disputed`;
- stable game filter options;
- ordered match items;
- backend-provided pagination truth.

### Match item

Stable identity/context:
- match ID;
- match kind (`tournament | challenge`);
- game ID/name;
- competition stable ID/title;
- tournament slug + round label when tournament-backed;
- opponent stable participant ID + display tag/type;
- optional venue stable ID/name/city;
- offset-aware `startsAt` + IANA timezone;
- format label.

Authoritative states:
- lifecycle: `scheduled | ready | live | awaiting-result | awaiting-confirmation | disputed | completed | cancelled`;
- check-in: `not-required | not-open | open | completed | missed`;
- result state: `not-open | reportable | awaiting-opponent | disputed | finalized | void`;
- dispute state: `none | open | under-review | resolved`;
- attention: `none | check-in | submit-result | confirm-result | dispute`.

Finalized result when present:
- player score;
- opponent score;
- outcome `win | loss | draw | void`;
- rating delta nullable and backend-authoritative;
- finalized timestamp.

The list page displays attention/state but F04 does not implement Result Submission or Dispute mutations. Those remain the next dedicated workstreams. F04 intentionally does not create dead links to routes that are not accepted yet.

### Planned production API mapping

`GET /api/v1/me/matches/?state={state}&kind={kind}&game={gameId}&page={page}`

- Django Session cookies with `credentials: include`;
- private server-side authorization mandatory;
- response runtime-validated before UI consumption;
- fixture repository implements the exact same TypeScript interface;
- cross-repo status remains `FRONTEND MOCK / BACKEND PENDING` until the owning matches/results backend phases are implemented and merged.

## UI state matrix

Required:
- populated mixed list;
- loading/pending;
- empty all;
- filtered empty;
- request error/retry;
- unauthenticated/session-expired via parent guard/API 401;
- scheduled/check-in/ready/live;
- awaiting result;
- awaiting confirmation;
- disputed/under review;
- completed win/loss/draw with backend rating delta;
- cancelled;
- tournament and challenge contexts;
- multi-page pagination;
- invalid search normalization.

## Accessibility / responsive acceptance

- native buttons/selects/links;
- visible focus states;
- text state labels in addition to tone;
- semantic list/card structure;
- aria-live result-count status;
- no horizontal overflow;
- QA widths: `375 / 390 / 430 / 768 / 1024 / 1440`.

## Ownership

F04 may modify:
- `src/routes/dashboard.matches.tsx`;
- F04 My Matches component;
- dedicated F04 data/repository/runtime-schema files;
- F04 contract tests;
- test/workflow registration;
- `PROJECT_CONTINUITY.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- F04 evidence/closeout docs.

F04 does not own:
- Result Submission mutation UI;
- Dispute mutation/evidence UI;
- Match Detail public/private route rebuild beyond what My Matches requires;
- Challenge Hub;
- backend domain implementation or backend phase ordering.

## Quality evidence — pending

Required before merge:
- frozen install;
- lint;
- production build/route generation;
- typecheck;
- F04 contract regression tests;
- existing F01/F02/F03/dashboard tests;
- F04 SSR smoke, robots and single-main checks;
- screenshots at all six required widths;
- representative manual visual review;
- PR CI green and review threads `0`.

## Exact NEXT

Implement the dedicated F04 contract + fixture/Django adapters, rebuild `/dashboard/matches` on that boundary, add regression/browser QA, then perform cross-repo contract alignment before final merge.