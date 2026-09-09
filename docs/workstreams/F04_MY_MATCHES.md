# F04 — Final My Matches

Status: `IN PROGRESS / IMPLEMENTED / ACCEPTANCE IN PROGRESS`

START_SHA: `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`

Implementation branch: `phase/f04-my-matches`

Tracking issue: `#41`

Route: `/dashboard/matches`

Indexability: `PRIVATE / NOINDEX`

## Identity / repository lock

- frontend `main` verified at START: `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`;
- F03 terminal Issue #38 evidence reviewed; frozen main and terminal CI green;
- `/dashboard/matches` verified as a real `DashboardSectionPlaceholder` and exact frontend NEXT;
- branch searches for `f04` and `matches`: no overlap before branch creation;
- open Issue/PR search for My Matches: none before Issue #41;
- dedicated branch created from exact START_SHA.

## Mandatory governance / official-source audit

Read before implementation:

- `PROJECT_CONTINUITY.md`
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`
- `SEO_FINAL_COPY_PROTOCOL.md`
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`
- `docs/OFFICIAL_FRONTEND_SOURCES.md`
- `docs/DESIGN_REFERENCE_AUDIT_TEMPLATE.md`
- `docs/PAGE_WORKSTREAM_EVIDENCE_TEMPLATE.md`
- F03 final private route/repository/runtime-validation implementation

Official references reviewed before implementation:

### TanStack Router

- authenticated routes: https://tanstack.com/router/latest/docs/guide/authenticated-routes
- data loading: https://tanstack.com/router/latest/docs/guide/data-loading
- search params/navigation: https://tanstack.com/router/latest/docs/guide/search-params

Decisions:
- reuse accepted parent `/dashboard` `beforeLoad` Session UX gate;
- private API authorization remains server-side;
- primary data belongs in the route loader;
- search used by loader is represented through validated search/`loaderDeps`;
- state/kind/game/page are URL-owned navigation state;
- no `replace:true`, so filter/pagination navigation remains Back/Forward-safe.

### WCAG 2.2

https://www.w3.org/TR/WCAG22/

Acceptance decisions:
- semantic native controls/headings/list structure;
- visible focus treatment;
- status conveyed with text/semantics, not color alone;
- `aria-live` result-count feedback;
- touch-friendly control sizing;
- no horizontal overflow across required widths.

## Design reference audit

Existing Turnoment references:

- `DashboardShell` + accepted dashboard navigation;
- `dashboard-activity.tsx` Upcoming/Recent Match previews;
- F03 `My Tournaments` final private information hierarchy and adapter boundary;
- current dark RTL cards/tokens and dashboard state architecture.

Patterns retained:
- operational private-page hierarchy;
- backend-provided summary + URL-backed filters + scannable cards;
- stable IDs and backend-authoritative competitive state enums;
- private `noindex,nofollow`;
- responsive/native controls.

Patterns deliberately not promoted from old previews:
- display-string-only state;
- frontend winner/rating inference;
- component-local navigation truth;
- links to unfinished Result/Dispute routes.

External interaction references reviewed:

### Battlefy

- Match Page / tournament flow
- Score Confirmation
- Reporting a Match Issue

Relevant product lessons:
- current match/attention state needs to be immediately scannable;
- schedule, opponent, competition/round and result context belong together;
- score confirmation and disputes are separate authoritative workflows rather than generic list mutations.

### Challonge

- participant score reporting / match attachments

Relevant lesson:
- result/evidence mutation belongs to a dedicated flow; My Matches should expose authoritative state/context without embedding an unfinished mutation workflow.

No third-party branding, assets, copy, visual layout or product-specific timers/rules were copied.

## Selected final design direction

My Matches is the player's private match ledger and attention center.

Hierarchy:
1. page identity/final copy;
2. authoritative summary counts;
3. state/kind/game filters;
4. competition/round/opponent/schedule/venue Match cards;
5. authoritative attention/status;
6. finalized score/outcome/rating delta only when supplied;
7. pagination/empty state.

Desktop:
- reuse DashboardShell;
- five compact summary cells;
- filters in compact panel;
- two-column match grid at wide desktop.

Mobile/tablet:
- compact two-column summary grid;
- stacked/wrapped filters without overflow;
- single-column Match cards;
- opponent/result/action hierarchy kept reachable without hover.

## SEO / final-copy decision

`/dashboard/matches` is authenticated/private and is permanently `noindex,nofollow`.

Public SERP/keyword research is `N/A` under project protocol. Final-copy rules still apply:
- no backend/API/mock/demo/temporary/waiting language;
- no unsupported guarantee about result/dispute processing;
- natural product wording;
- H1 `Matchهای من`;
- title `Matchهای من — داشبورد بازیکن`.

## Final production contract

### Query

- `state`: `all | upcoming | action-required | completed | disputed`
- `kind`: `all | tournament | challenge`
- `gameId`: optional stable game ID
- `page`: positive integer

### Page response

- current-player stable ID + gamer tag for versus presentation;
- summary `total / upcoming / actionRequired / completed / disputed`;
- stable game options;
- ordered Match items;
- authoritative pagination.

### Match identity/context

- stable `matchId`;
- game ID/name;
- competition discriminated as tournament/challenge;
- competition stable ID/title;
- tournament slug + round label where applicable;
- opponent stable participant ID/type/display tag;
- optional venue stable ID/name/city;
- offset-aware `startsAt` + IANA timezone;
- format label.

### Authoritative states

Lifecycle:
`scheduled | ready | live | awaiting-result | awaiting-confirmation | disputed | completed | cancelled`

Check-in:
`not-required | not-open | open | completed | missed`

Result state:
`not-open | reportable | awaiting-confirmation | disputed | finalized | void`

Dispute state:
`none | open | under-review | resolved`

Attention:
`none | check-in | submit-result | confirm-result | dispute`

Finalized result when present:
- player/opponent scores;
- outcome `win | loss | draw | void`;
- nullable backend-authoritative rating delta;
- finalized timestamp.

Runtime integrity rejects contradictory projections, including:
- completed without finalized result;
- finalized result on non-finalized state;
- cancelled without void result state;
- disputed lifecycle without active dispute + disputed result state;
- check-in/submit/confirm/dispute attention inconsistent with its authoritative state;
- impossible pagination;
- summary subcount greater than total.

## Permanent API mapping / cross-repo ownership

Planned Django adapter:

`GET /api/v1/me/matches/?state={state}&kind={kind}&game={gameId}&page={page}`

- Session cookies via `credentials: include`;
- server-side private authorization mandatory;
- runtime validation before UI consumption;
- deterministic fixture adapter implements the same permanent repository interface.

Backend owners:
- `matches` — list membership/lifecycle/schedule/opponent/competition/venue/check-in;
- `results` — result reporting/confirmation/final score/outcome/rating delta;
- `disputes` — dispute state/decision projection.

Backend root laws were read before alignment. Backend docs-only alignment:
- backend START_SHA: `cd47fff8b82359b12d86fad10735a2e9fa52472d`;
- backend branch: `docs/f04-my-matches-contract`;
- backend Issue #11;
- backend PR #12;
- backend alignment head: `91df6a17806f6155c0abf18f6f0c9c010a5a579b`;
- backend PR CI `34388795695` — PASS on Python 3.12 and 3.14;
- backend PR review threads before merge: `0`;
- backend alignment merge: `baeffe042f4dc6ab6d2cbd0433eca4f8404daff6`;
- backend post-merge main CI: pending at this evidence checkpoint.

Cross-repo runtime status remains explicitly:

`FRONTEND MOCK / BACKEND PENDING`

F04 does not start/reorder backend implementation; backend NEXT remains `P02 — Games / Catalog Foundation`.

## Implemented UI/state matrix

- normal populated mixed list;
- loading skeleton;
- all-empty and filtered-empty UX;
- request error/retry;
- session-expired/401 redirect through accepted parent/API policy;
- scheduled/open check-in;
- ready;
- live;
- awaiting result;
- awaiting confirmation;
- disputed/under review;
- completed finalized win/loss with backend rating delta;
- cancelled/void;
- tournament and challenge contexts;
- URL-backed state/kind/game/page filtering;
- pagination;
- invalid search normalization.

Result Submission and Dispute mutation UIs remain intentionally outside F04. No dead links to unaccepted routes were created.

## Frontend quality / browser evidence

Implementation checkpoint head:

`82525fb153ac129754c27c0c021f3ef8e1f10e44`

Frontend Quality Gate:

`34388320768` — PASS

Passed:
- frozen install;
- lint;
- production build / route generation;
- TypeScript typecheck;
- dashboard/F01/F02/F03/F04 contract checks;
- F04 SSR smoke;
- `noindex,nofollow` assertion;
- single `<main>` invariant;
- browser screenshot regression.

Browser artifact:
- id `10118663030`
- digest `sha256:ee20d8dc48268a8f97a11c17b14974b10b292b2aa47be157db8e0abe1470baa1`
- workflow head explicitly `82525fb153ac129754c27c0c021f3ef8e1f10e44`
- captures: `375 / 390 / 430 / 768 / 1024 / 1440`

Manual representative visual review:
- `375` — PASS
- `430` — PASS
- `768` — PASS
- `1024` — PASS
- `1440` — PASS
- no horizontal overflow found;
- no sidebar/content collision found;
- filters/cards/attention CTA remained readable;
- 1440 two-column card grid and pagination rendered correctly.

## Exact NEXT

1. finish backend post-merge contract-alignment gate and close backend Issue #11;
2. reconcile frontend continuity + route registry to F04 active truth;
3. obtain green exact-head frontend Quality Gate after evidence/governance updates;
4. open/review frontend PR, require PR CI PASS and review threads `0`;
5. merge implementation, require post-merge main CI PASS;
6. perform closeout/freeze and terminal main CI before reporting `DONE / MERGED / FROZEN — FINAL_PRIVATE`.
