# F04 — Final My Matches

Status: `IMPLEMENTATION MERGED / CLOSEOUT IN PROGRESS`

START_SHA: `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`

Implementation branch: `phase/f04-my-matches`

Tracking Issue: `#41`

Route: `/dashboard/matches`

Indexability: `PRIVATE / NOINDEX`

## Identity / repository lock

- frontend `main` verified at START: `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`;
- F03 terminal Issue #38 evidence reviewed; frozen main and terminal CI were green;
- `/dashboard/matches` was verified as a real `DashboardSectionPlaceholder` and exact frontend NEXT;
- overlapping F04/My Matches branches/issues/PRs: none before F04 creation;
- dedicated implementation branch created from exact START_SHA.

## Mandatory governance / official-source audit

Read before implementation:

- `PROJECT_CONTINUITY.md`
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`
- `SEO_FINAL_COPY_PROTOCOL.md`
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`
- `docs/OFFICIAL_FRONTEND_SOURCES.md`
- `docs/DESIGN_REFERENCE_AUDIT_TEMPLATE.md`
- `docs/PAGE_WORKSTREAM_EVIDENCE_TEMPLATE.md`
- accepted F03 final-private route/repository/runtime-validation implementation

Official references reviewed before implementation:

### TanStack Router

- authenticated routes: https://tanstack.com/router/latest/docs/guide/authenticated-routes
- data loading: https://tanstack.com/router/latest/docs/guide/data-loading
- search params/navigation: https://tanstack.com/router/latest/docs/guide/search-params

Decisions:

- reuse the accepted parent `/dashboard` `beforeLoad` Session UX gate;
- keep private API authorization server-side;
- load primary page data in the route loader;
- declare loader-relevant validated search through `loaderDeps`;
- keep state/kind/game/page as URL-owned navigation state;
- preserve browser Back/Forward semantics.

### WCAG 2.2

https://www.w3.org/TR/WCAG22/

Acceptance decisions:

- semantic native controls/headings/list structure;
- visible focus treatment;
- status conveyed by text/semantics, not color alone;
- `aria-live` result-count feedback;
- touch-friendly control sizing;
- no horizontal overflow at required widths.

## Design reference audit

Existing Turnoment references:

- `DashboardShell` + accepted dashboard navigation;
- `dashboard-activity.tsx` Upcoming/Recent Match previews;
- F03 `My Tournaments` final-private hierarchy and adapter boundary;
- Turnoment dark RTL cards/tokens and dashboard state architecture.

Patterns retained:

- operational private-page hierarchy;
- backend-provided summary + URL-backed filters + scannable cards;
- stable IDs and backend-authoritative competitive states;
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

Relevant lessons:

- current match/attention state should be immediately scannable;
- schedule, opponent, competition/round and result context belong together;
- score confirmation and disputes are distinct authoritative workflows.

### Challonge

- participant score reporting / match attachments

Relevant lesson:

- result/evidence mutation belongs to a dedicated flow; My Matches exposes authoritative state/context without embedding an unfinished mutation workflow.

No third-party branding, assets, copy, visual layout or product-specific rules were copied.

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

- DashboardShell;
- five compact summary cells;
- compact filter panel;
- two-column match grid at wide desktop.

Mobile/tablet:

- compact two-column summary grid;
- stacked/wrapped filters without overflow;
- single-column Match cards;
- opponent/result/action hierarchy reachable without hover.

## SEO / final-copy decision

`/dashboard/matches` is authenticated/private and permanently `noindex,nofollow`.

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

- current-player stable ID + gamer tag;
- summary `total / upcoming / actionRequired / completed / disputed`;
- stable game filter options;
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
- private server-side authorization mandatory;
- runtime validation before UI consumption;
- deterministic fixture implements the same permanent repository interface.

Backend owners:

- `matches` — list membership/lifecycle/schedule/opponent/competition/venue/check-in;
- `results` — result reporting/confirmation/final score/outcome/rating delta;
- `disputes` — dispute state/decision projection.

Backend docs-only alignment evidence:

- backend START_SHA `cd47fff8b82359b12d86fad10735a2e9fa52472d`;
- branch `docs/f04-my-matches-contract`;
- Issue #11 — completed;
- PR #12 — merged;
- alignment head `91df6a17806f6155c0abf18f6f0c9c010a5a579b`;
- PR CI `34388795695` — PASS on Python 3.12 and 3.14;
- review threads `0`;
- alignment merge/current accepted backend main `baeffe042f4dc6ab6d2cbd0433eca4f8404daff6`;
- post-merge Backend Quality Gate `34388924185` — PASS on Python 3.12 and 3.14;
- Python/models/migrations/phase registry/order changed: `NO`.

Cross-repo runtime status remains:

`FRONTEND MOCK / BACKEND PENDING`

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## Implemented UI/state matrix

- normal populated mixed list;
- loading skeleton;
- all-empty and filtered-empty UX;
- request error/retry;
- session-expired/401 through accepted parent/API policy;
- scheduled/open check-in;
- ready;
- live;
- awaiting result;
- awaiting confirmation;
- disputed/under review;
- completed finalized result with backend rating delta;
- cancelled/void;
- tournament and challenge contexts;
- URL-backed state/kind/game/page filtering;
- pagination;
- invalid search normalization.

Result Submission and Dispute mutation UIs remain outside F04. No dead links to unaccepted routes were created.

## Frontend quality / browser evidence

Initial implementation/browser checkpoint:

- head `82525fb153ac129754c27c0c021f3ef8e1f10e44`
- Quality Gate `34388320768` — PASS
- artifact `10118663030`
- digest `sha256:ee20d8dc48268a8f97a11c17b14974b10b292b2aa47be157db8e0abe1470baa1`
- captures `375 / 390 / 430 / 768 / 1024 / 1440`
- representative manual review `375 / 430 / 768 / 1024 / 1440` — PASS
- no horizontal overflow/sidebar collision/broken filter-card-action hierarchy found.

Final implementation/evidence head:

- `c5dce2302b3f33f990b529bb723543c70477be5d`
- exact-head push Quality Gate `34389469019` — PASS
- final artifact `10119103403`
- digest `sha256:b210905e780219b3425ec84c54167e679c36d2f08789daabc05efd45a6aef33f`
- artifact head matches the final implementation head.

Implementation PR acceptance:

- PR #42 — MERGED
- PR-triggered Quality Gate `34389760407` — PASS
- review threads immediately before merge `0`
- base main verified unchanged at `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`
- expected-head merge lock used
- implementation merge `79330a95c05161d5896fb9328134caf814528036`
- post-implementation `main` Quality Gate `34390091802` — PASS.

## Closeout

Closeout branch:

`closeout/f04-my-matches`

created from the exact implementation merge SHA:

`79330a95c05161d5896fb9328134caf814528036`

Non-recursive closeout evidence:

`docs/workstreams/F04_CLOSEOUT.md`

Remaining terminal facts are recorded in Issue #41 only after they exist.

## Exact NEXT

1. require final closeout branch Quality Gate PASS;
2. open/review closeout PR, require PR CI PASS and review threads `0`;
3. verify main has not drifted from `79330a95c05161d5896fb9328134caf814528036`;
4. merge closeout with expected-head lock;
5. require terminal post-closeout main Quality Gate PASS;
6. record frozen main + terminal CI in Issue #41 and close it completed;
7. only then report `DONE / MERGED / FROZEN — FINAL_PRIVATE`.
