# F12 — Player Rivalries Hub

Status: `MERGED / CLOSEOUT IN PROGRESS`

Route: `/dashboard/rivalries`

Tracking Issue: `#65`

START_SHA: `47ea1ed9bda2a788860f382bc75ea50a83efaaf3`

Implementation branch: `phase/f12-player-rivalries`

Accepted implementation head: `27fa3bc599923e8e9687197bd9e153748ebe565b`

Accepted implementation merge/main: `0188324915160f5c6b751b831d394228688cc3f2`

Closeout branch: `closeout/f12-player-rivalries`

Target: `FINAL_PRIVATE`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 1. Mandatory preflight completed

Read before implementation:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- current placeholder route `src/routes/dashboard.rivalries.tsx`;
- accepted F04 My Matches and F11 private dashboard patterns;
- backend `PROJECT_CONTINUITY.md`, `PHASE_COMPLETION_PROTOCOL.md`, `docs/PHASE_REGISTRY.md`, `docs/FRONTEND_BACKEND_CONTRACT.md`, and `docs/ENGINEERING_RULES.md` before cross-repo alignment.

Exact frontend main at start was verified as:

`47ea1ed9bda2a788860f382bc75ea50a83efaaf3`

The original route was only a `DashboardSectionPlaceholder`. No earlier F12/Rivalries implementation Issue/branch was found. Challenge Hub remained isolated throughout F12.

## 2. Official documentation audit

Current official references reviewed:
- TanStack Router — Data Loading: https://tanstack.com/router/latest/docs/guide/data-loading
- TanStack Router — Search Parameters: https://tanstack.com/router/latest/docs/how-to/setup-basic-search-params
- TanStack Router — Search Validation: https://tanstack.com/router/latest/docs/how-to/validate-search-params
- TanStack Router — Document Head Management: https://tanstack.com/router/latest/docs/guide/document-head-management
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/

Applied decisions:
- route loader owns the critical private read projection;
- game/kind/sort/page navigation state is URL-backed and validated before use;
- private metadata is route-owned with explicit `noindex,nofollow`;
- controls/headings/status copy are semantic, keyboard-usable and not color-only;
- public SEO research is not applicable to this private account page, but final natural Persian copy and indexing policy remain acceptance requirements.

## 3. Bounded product contract

F12 is a private read-only Rivalries Hub.

A rivalry item is a backend/repository-defined current-player/opponent/game relationship with at least one finalized valid encounter. The frontend MUST NOT build authoritative rivalry rows by grouping raw Match history.

Permanent boundary:

`private dashboard access policy → validated game/kind/sort/page search → loader → typed PlayerRivalriesRepository → runtime-validated rivalry projection → UI`

Backend/repository-owned truth:
- rivalry membership and stable `rivalryId`;
- stable opponent/game identity;
- finalized-valid head-to-head totals;
- player wins/opponent wins/draws;
- rivalry edge;
- latest finalized-valid encounter, score and outcome;
- summary, filters, sort and pagination.

Frontend-owned presentation:
- validated URL navigation state;
- final Persian labels/copy;
- date formatting using supplied timezone;
- responsive layout and accessible controls;
- deterministic visual-QA fixture behind the same repository interface.

Explicitly out of scope:
- deriving rivalry truth from F04 Match rows;
- Challenge unlock or rating decisions;
- wager/betting/stake mechanics;
- friend/block/social graph behavior;
- rivalry mutations;
- inventing or activating a Rivalry Detail route/link;
- any modification to `/dashboard/challenges`.

## 4. Backend alignment — terminal documentation truth

Backend tracking Issue: `sajadkhavas/turnoment-backend#21` — `CLOSED / COMPLETED`.

Backend START_SHA:
`3fb421cf2c85d94753ddf9352d8bc1134358847a`

Accepted docs head:
`01ebe3832642799e5a040cf3420a47819d518078`

Backend PR `#22` — MERGED.

PR Quality Gate `34516235451` — PASS on Python 3.12 and 3.14.

Accepted backend merge/main:
`e81b13a0de6936ded0879d4310eab3883a7556a6`

Post-main Backend Quality Gate `34516995711` — PASS on Python 3.12 and 3.14; live backend main reverified exact accepted SHA.

Planned future endpoint:
`GET /api/v1/me/rivalries/`

This is documentation/cross-repo alignment only. No Rivalries Python runtime implementation is claimed. Runtime remains exactly `FRONTEND MOCK / BACKEND PENDING`, and Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 5. Final frontend contract shape

Validated search:
- `kind=player|team`; absence = all;
- `game=<stable-game-id>`;
- `sort=recent|most-played`; absence = recent;
- `page=<positive integer>`; absence = page 1.

Projection:
- current player identity;
- global rivalry summary;
- stable game filter options;
- rivalry items with opponent/game/head-to-head/latest encounter;
- pagination.

Integrity validation rejects:
- outcome counts that do not equal finalized total;
- rivalry edge that contradicts win counts;
- latest score/outcome contradictions;
- impossible pagination;
- filtered total larger than global rivalry total;
- summary edge counts that do not partition total rivalries.

Only finalized valid non-void encounters are represented by this contract.

## 6. Required UI states accepted

F12 implements:
- pending/loading skeleton;
- populated read state;
- all-empty state;
- filtered-empty state with reset action;
- error/retry state;
- unauthenticated/session-expired redirect to Login;
- game, opponent-kind and sort URL navigation;
- pagination.

No mutation state exists because F12 is read-only.

## 7. Frontend implementation evidence

Accepted clean implementation head:
`27fa3bc599923e8e9687197bd9e153748ebe565b`

START-to-head compare:
- ahead 1 / behind 0;
- one implementation commit;
- exactly 11 F12-owned files;
- no dependency additions/removals/version drift;
- Challenge Hub/Detail untouched.

Exact-head Frontend Quality Gate:
`34517344762` — PASS.

Exact-head browser artifact:
- `10168354098`;
- `browser-qa-27fa3bc599923e8e9687197bd9e153748ebe565b`;
- digest `sha256:19d74e5219500f0e952820a039441f6603e475fbc1aba0bb897f9ed534e3f694`;
- 78 screenshots;
- manual F12 visual QA at `375 / 390 / 430 / 768 / 1024 / 1440` PASS;
- no horizontal overflow/clipping.

Implementation PR `#66`:
- PR-context Frontend Quality Gate `34517973585` — PASS;
- mergeable immediately before merge `true`;
- unresolved review threads `0`;
- pre-merge main exact START_SHA;
- expected-head merge used;
- PR MERGED.

Accepted implementation merge/main:
`0188324915160f5c6b751b831d394228688cc3f2`

Post-implementation main evidence:
- Frontend Quality Gate `34518845218` — PASS;
- all frozen install/lint/build/typecheck/contracts/browser/artifact steps PASS;
- artifact `10168931114`;
- name `browser-qa-0188324915160f5c6b751b831d394228688cc3f2`;
- digest `sha256:250fa6ba63d84efc93af8e82bd2259f3b32c9cffb45d09f35285fc6e315fbf60`;
- artifact head exact implementation main.

The earlier candidate `93fc626fbb99cdd00b7a5e9ae71bb3eabc1611fd` is superseded and is not acceptance evidence.

## 8. Route acceptance

Because implementation is merged and its post-main gate is green, `/dashboard/rivalries` is promoted non-recursively in the route registry to:

`FINAL_PRIVATE`

This route-level promotion does not make the F12 workstream terminal. F12 remains `MERGED / CLOSEOUT IN PROGRESS` until closeout merge and terminal frozen-main evidence exist.

## 9. Documentation-only closeout

Closeout base:
`0188324915160f5c6b751b831d394228688cc3f2`

Closeout branch:
`closeout/f12-player-rivalries`

Permitted diff is exactly:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F12_PLAYER_RIVALRIES.md`;
4. `docs/workstreams/F12_CLOSEOUT.md`.

Forbidden in closeout:
- runtime/application source changes;
- workflow/package/dependency changes;
- contract/adapter/fixture changes;
- Challenge Hub/Detail changes.

Non-recursive rule: this file must not contain the future closeout merge SHA, terminal frozen-main Quality Gate, terminal artifact or digest before they actually exist. Those terminal facts are recorded later in tracking Issue #65.

## 10. Exact NEXT

1. verify closeout compare is ahead 1 / behind 0 / exactly one commit / exactly four Markdown files;
2. open closeout PR without auto-closing Issue #65;
3. require closeout PR Frontend Quality Gate PASS;
4. require mergeable true, review threads 0 and exact implementation-main pre-merge lock;
5. merge with expected-head lock;
6. require terminal frozen-main Frontend Quality Gate PASS and artifact/digest;
7. reverify exact live main;
8. record closeout merge + terminal evidence in Issue #65 only after it exists;
9. close Issue #65 as `completed`;
10. only then report `F12 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.
