# F03 — Final My Tournaments

Status: `CLOSEOUT IN PROGRESS — FINAL_PRIVATE ACCEPTED / TERMINAL FREEZE PENDING`

> Frontend implementation and route acceptance are complete and merged. F03 must **not** be reported as `DONE / MERGED / FROZEN` until Issue #38 records the closeout merge/frozen `main` SHA and a green terminal post-closeout `main` Quality Gate.

START_SHA: `4afb49e913d5fd7e2420031ae957fde2e79e3e8a`

Implementation branch: `phase/f03-my-tournaments`

Closeout branch: `closeout/f03-my-tournaments`

Tracking issue: `#38`

Implementation PR: `#39 — MERGED`

Implementation merge SHA: `bc294e8dbdd6c1d61f11203b8c4e0cfe96094d30`

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

Before cross-repo contract alignment, backend root governance was also read:

- backend `PROJECT_CONTINUITY.md`
- backend `PHASE_COMPLETION_PROTOCOL.md`
- backend `docs/FRONTEND_BACKEND_CONTRACT.md`
- backend `docs/ENGINEERING_RULES.md`
- backend `docs/PHASE_REGISTRY.md`

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

- single-column content flow;
- participation summary uses two columns to reduce vertical distance to actionable tournament content;
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

## Final production contract

The full page uses a dedicated contract instead of expanding the dashboard preview contract into page-specific concerns.

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

Production adapter mapping:

`GET /api/v1/me/tournaments/?state={state}&game={gameId}&page={page}`

- authenticated with Django Session cookies (`credentials: include`);
- response is runtime-validated before the UI consumes it;
- fixture repository implements the same TypeScript interface for development/test/visual QA;
- presentation components do not know which adapter is active.

The endpoint family and backend owner already existed in the backend contract baseline before F03. Backend alignment PR #10 refined this projection; runtime implementation remains independently pending under the accepted backend phase order.

F03 does not add withdraw, registration editing, result submission or dispute mutations. Those actions remain owned by their dedicated tournament/match workstreams.

## UI state matrix — accepted

- normal populated list — implemented
- pending/loading — implemented
- empty for all tournaments — implemented
- empty for selected filter — implemented
- request error/retry — implemented
- unauthenticated/session-expired access policy via parent dashboard guard / private API authorization — preserved
- upcoming registered state — implemented
- check-in not-open/open/completed/missed states when supplied — implemented
- live state — implemented
- team participation state — implemented
- completed result state — implemented
- multi-page pagination — implemented
- invalid URL search normalization — implemented

## Owned files

F03 owns or may modify:
- `src/routes/dashboard.tournaments.tsx`
- F03 My Tournaments components
- F03 domain/repository/runtime-schema files
- F03 contract tests
- `package.json` test registration
- `docs/workstreams/F03_MY_TOURNAMENTS.md`
- `docs/workstreams/F03_ACCEPTANCE_EVIDENCE.md`
- `docs/workstreams/F03_CLOSEOUT.md`
- `PROJECT_CONTINUITY.md`
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`
- Issue/PR/CI closeout evidence

It does not own:
- public `/tournaments` recertification;
- full bracket/live tournament UI;
- My Matches / result submission / dispute;
- Auth / OTP rebuild;
- backend P02 Games/Catalog implementation.

## Quality / QA acceptance — completed for implementation

Implementation acceptance head:

`66beb620ced7003b6cbc6b9447aab35ccd15d086`

Exact-head Quality Gate:

`34380756688` — PASS

Verified implementation gates:
- frozen dependency install — PASS
- lint — PASS
- production build and TanStack route generation — PASS
- TypeScript typecheck — PASS
- F03 runtime-contract/integrity checks — PASS
- existing dashboard/F01/F02 regression checks — PASS
- browser smoke — PASS
- F03 private robots assertion — PASS
- single `<main>` SSR landmark invariant — PASS
- responsive screenshots at `375 / 390 / 430 / 768 / 1024 / 1440` — PASS

Browser QA artifact:
- artifact id `10115803738`
- digest `sha256:0e3a35d6d2809f39753a73b174e9fb29f0b42af2b5333a70792093bd4086841c`
- artifact workflow head `66beb620ced7003b6cbc6b9447aab35ccd15d086`
- representative manual review at `375 / 430 / 768 / 1024 / 1440` — PASS
- no horizontal overflow, sidebar collision, broken CTA, clipped title/venue or blocking mobile hierarchy issue found after final repair

Final evidence/documentation head:

`98c92846b79d1d715d16b3db9ad762a54e7fa137`

- exact-head push Quality Gate `34385385299` — PASS
- PR Quality Gate `34385390759` — PASS
- open review threads immediately before merge: `0`
- implementation PR #39 — MERGED
- implementation merge SHA `bc294e8dbdd6c1d61f11203b8c4e0cfe96094d30`
- post-implementation-merge main Quality Gate `34385716082` — PASS

Cross-repo evidence:
- backend Issue #9 — completed
- backend PR #10 — merged
- backend alignment main SHA `cd47fff8b82359b12d86fad10735a2e9fa52472d`
- backend post-merge Quality Gate `34380281593` — PASS
- runtime status remains `FRONTEND MOCK / BACKEND PENDING`
- backend NEXT remains `P02 — Games / Catalog Foundation`

Self-review repairs included before implementation acceptance:
- reverted accidental dependency-version drift;
- removed unsupported guarantee from error copy;
- preserved browser Back/Forward semantics for filters/pagination;
- added cross-field result and pagination integrity validation + negative tests;
- removed assumptions about non-existent success/warning foreground tokens;
- changed mobile summary to two columns after visual review;
- increased F03 screenshot height so actual tournament cards and CTAs are visible in QA evidence.

## Closeout / freeze

Closeout branch:

`closeout/f03-my-tournaments`

Created from the exact implementation merge SHA:

`bc294e8dbdd6c1d61f11203b8c4e0cfe96094d30`

Non-recursive closeout record:

`docs/workstreams/F03_CLOSEOUT.md`

The route is eligible for `FINAL_PRIVATE` registry promotion because its frontend architecture/contracts/states/copy/accessibility/responsive evidence are accepted and the implementation merge plus post-merge main gate are green. This does **not** claim the backend runtime endpoint has been implemented.

## Current exact NEXT

1. run the closeout PR Quality Gate on the final `closeout/f03-my-tournaments` head;
2. require all closeout PR checks to PASS and open review threads to equal `0`;
3. merge the closeout PR with expected-head locking;
4. require the terminal post-closeout `main` Quality Gate to PASS;
5. record the exact closeout merge/frozen `main` SHA and terminal main Quality Gate in Issue #38;
6. close Issue #38 as `completed` only after that terminal gate is green;
7. only then report F03 as `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
8. frontend NEXT becomes My Matches `/dashboard/matches`.
