# F12 — Player Rivalries Hub

Status: `IN PROGRESS — IMPLEMENTATION`

Route: `/dashboard/rivalries`

Tracking Issue: `#65`

START_SHA: `47ea1ed9bda2a788860f382bc75ea50a83efaaf3`

Implementation branch: `phase/f12-player-rivalries`

Target: `FINAL_PRIVATE`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 1. Mandatory preflight

Read before implementation:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- current placeholder route `src/routes/dashboard.rivalries.tsx`;
- accepted F04 My Matches and F11 private dashboard patterns;
- backend `PROJECT_CONTINUITY.md`, `PHASE_COMPLETION_PROTOCOL.md`, `docs/PHASE_REGISTRY.md`, `docs/FRONTEND_BACKEND_CONTRACT.md`, and `docs/ENGINEERING_RULES.md` before cross-repo alignment.

Exact frontend main at start was verified as:

`47ea1ed9bda2a788860f382bc75ea50a83efaaf3`

The existing route was only a `DashboardSectionPlaceholder`; no loader, repository contract, runtime validation, final Rivalries UI, filters, pagination, or dedicated F12 workstream existed.

No earlier F12/Rivalries implementation branch or Issue was found. Challenge Hub remains an isolated workstream and is outside F12 ownership.

## 2. Official documentation audit

Current official references reviewed:
- TanStack Router — Data Loading: https://tanstack.com/router/latest/docs/guide/data-loading
- TanStack Router — Search Parameters: https://tanstack.com/router/latest/docs/how-to/setup-basic-search-params
- TanStack Router — Search Validation: https://tanstack.com/router/latest/docs/how-to/validate-search-params
- TanStack Router — Document Head Management: https://tanstack.com/router/latest/docs/guide/document-head-management
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/

Decisions applied:
- route loader owns the critical private read projection;
- game/kind/sort/page navigation state is URL-backed and validated before use;
- private metadata remains route-owned with explicit `noindex,nofollow`;
- headings/labels are descriptive, controls are keyboard-operable and have visible focus treatment;
- filter/result count changes use semantic text/status behavior rather than color-only meaning.

Because F12 is a private account page, public SEO search-intent research is not applicable. Final natural Persian copy and indexing policy are still part of acceptance.

## 3. Design-reference audit

Primary visual masters are the accepted Turnoment DashboardShell plus F04 My Matches, F10 Notifications and F11 Settings. F12 intentionally keeps their premium RTL card rhythm, spacing, typography, filter control density, loading/error treatment and six-width responsive baseline.

Competitive match-history/rivalry interfaces were reviewed only for information architecture: opponent identity first, game context next, head-to-head aggregate visibly separated from the most recent encounter, and compact filter controls. No external branding, assets, copy or proprietary layout was copied.

## 4. Bounded product contract

F12 is a private read-only Rivalries Hub.

A rivalry item is a server/repository-defined current-player/opponent/game relationship with at least one finalized valid encounter. The frontend MUST NOT build authoritative rivalry rows by grouping raw Match history.

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

## 5. Backend alignment — terminal documentation truth

Backend tracking Issue: `sajadkhavas/turnoment-backend#21` — `CLOSED / COMPLETED`.

Backend START_SHA:
`3fb421cf2c85d94753ddf9352d8bc1134358847a`

Backend docs branch:
`docs/f12-player-rivalries-contract`

Accepted docs head:
`01ebe3832642799e5a040cf3420a47819d518078`

Accepted scope:
- exactly one commit ahead / zero behind;
- exactly `PROJECT_CONTINUITY.md` + `docs/F12_PLAYER_RIVALRIES_CONTRACT.md`;
- no Python/models/migrations/serializers/views/URLs/dependencies/phase-registry changes.

Backend PR `#22` — MERGED.

PR Quality Gate `34516235451` — PASS on Python 3.12 and 3.14.

Accepted backend merge/main:
`e81b13a0de6936ded0879d4310eab3883a7556a6`

Post-main Backend Quality Gate `34516995711` — PASS on Python 3.12 and 3.14; live backend main reverified exact accepted SHA.

Planned future endpoint:
`GET /api/v1/me/rivalries/`

This is documentation/cross-repo alignment only. No Rivalries Python runtime implementation is claimed. Runtime remains exactly `FRONTEND MOCK / BACKEND PENDING`, and Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 6. Final frontend contract shape

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

## 7. Required UI states

F12 owns:
- pending/loading skeleton;
- populated read state;
- all-empty state;
- filtered-empty state with reset action;
- error/retry state;
- unauthenticated/session-expired redirect to Login;
- game, opponent-kind and sort URL navigation;
- pagination.

No mutation success/pending state exists because F12 is read-only.

## 8. Accessibility / responsive acceptance target

Required widths:
`375 / 390 / 430 / 768 / 1024 / 1440`

Acceptance requires:
- no horizontal overflow/clipping;
- readable Persian copy and safe opponent-name wrapping;
- touch-safe buttons/selects;
- visible focus state;
- semantic headings/nav/filter labels;
- score/outcome meaning not communicated by color alone;
- stable card hierarchy on mobile and desktop.

## 9. Quality/evidence gate

Before implementation merge:
1. exact implementation compare reviewed;
2. no unrelated Challenge Hub/Detail mutations;
3. no dependency drift beyond adding the targeted F12 contract test to the existing script;
4. frozen install PASS;
5. lint PASS at accepted baseline;
6. production build/route generation PASS;
7. typecheck PASS;
8. targeted F12 runtime contract tests PASS;
9. browser gate includes F12 SSR smoke/noindex/final-copy checks;
10. browser screenshots expand from 72 to 78 images by adding F12 at all six standard widths;
11. manual visual QA PASS;
12. PR CI green, mergeable true and unresolved review threads 0;
13. expected-head merge;
14. post-main QA green;
15. documentation-only closeout + terminal frozen-main QA before Issue #65 may close.

## 10. Exact NEXT

1. accept only the final clean one-commit implementation head from START_SHA;
2. require exact-head Frontend Quality Gate PASS and inspect all six F12 screenshots;
3. open/merge frontend implementation PR only after all required evidence is green;
4. require post-main Frontend Quality Gate/artifact/digest;
5. create documentation-only F12 closeout from exact implementation merge;
6. require closeout PR gate, expected-head merge and terminal frozen-main gate;
7. record terminal evidence in Issue #65 and close completed;
8. only then report `F12 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.
