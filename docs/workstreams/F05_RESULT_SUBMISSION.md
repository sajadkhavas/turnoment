# F05 — Final Result Submission

Status: `MERGED / CLOSEOUT IN PROGRESS`

START_SHA: `864fe1491739b06c763be487a73a589c7e0f3609`

Implementation branch: `phase/f05-result-submission`

Tracking Issue: `#44` — remains open until terminal closeout main CI is green.

Route: `/matches/$id/result`

Indexability: `PRIVATE / NOINDEX`

## Repository / governance lock

Before implementation:

- frontend frozen `main` verified at `864fe1491739b06c763be487a73a589c7e0f3609`;
- F04 terminal Quality Gate `34391019079` — PASS;
- F04 Issue #41 — completed;
- `/matches/$id/result` did not exist;
- backend contract already reserved `/matches/{id}/result` under owner `results`;
- overlapping F05 branch, Issue or PR: none;
- dedicated branch created from the exact START_SHA.

Mandatory sources read before implementation:

- `PROJECT_CONTINUITY.md`
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`
- `SEO_FINAL_COPY_PROTOCOL.md`
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`
- `docs/OFFICIAL_FRONTEND_SOURCES.md`
- design/workstream evidence templates
- F04 My Matches accepted evidence
- backend `docs/FRONTEND_BACKEND_CONTRACT.md`
- accepted F01 Django Session + CSRF mutation implementation

## Official / design decisions

Reviewed:

- TanStack Router data-mutation guidance;
- WCAG 2.2 input assistance/error identification;
- accepted Turnoment Session/CSRF pattern;
- F04 My Matches hierarchy;
- F01 Registration form/mutation/error/success structure;
- Battlefy Match score-reporting / score-confirmation / issue separation patterns;
- Challonge participant score-reporting patterns.

Decisions retained:

- Result Submission is a focused private action page, not Match Detail;
- reporting a score is distinct from Result Confirmation and Dispute;
- user reviews exact entered scores before the irreversible command;
- loader/repository data remains authoritative; no optimistic winner/final-result calculation;
- third-party branding/assets/copy/layout/rules were not copied.

Public SERP research is `N/A` because the route is authenticated and permanently `noindex,nofollow`.

Final H1: `ثبت نتیجه Match`

Final title: `ثبت نتیجه Match — ایران مهر افزار`

## Accepted permanent architecture

`validated matchId → private Session UX access policy → loader → typed ResultSubmissionRepository → runtime-validated authoritative state → validated review/submit form → CSRF/session result command → runtime-validated receipt/conflict state → UI`

Accepted properties:

- safe stable route-param validation;
- unauthenticated Session UX redirects to `/login`;
- server-side Match/participant authorization remains independent and authoritative;
- private `noindex,nofollow`;
- deterministic fixture adapter and Django HTTP adapter behind one permanent contract;
- planned production read/write mapping under `api/v1/matches/{matchId}/result/`;
- browser requests use `credentials: include`;
- POST bootstraps CSRF through `/api/v1/auth/csrf/` and sends `X-CSRFToken`;
- one `Idempotency-Key` per logical submit attempt;
- opaque backend revision controls stale-state detection;
- score policy/eligibility/result state/final result/rating remain backend-authoritative;
- frontend never infers winner, final outcome or rating delta from entered scores;
- backend-supplied IANA timezone is used for civil-time rendering;
- F04 `attention=submit-result` links to this accepted route using stable `matchId`;
- Result Confirmation and Dispute remain separate workstreams with no dead links.

## Production contract

Planned read:

`GET /api/v1/matches/{matchId}/result/`

Authoritative projection includes:

- stable `matchId`;
- opaque `revision`;
- `submissionState`: `reportable | awaiting-confirmation | finalized | disputed | unavailable`;
- current player / opponent / game / competition identity;
- optional venue;
- offset-aware `startsAt` + IANA timezone;
- format label;
- score policy (`minimum`, nullable `maximum`, `allowDraw`);
- previously reported score only in compatible states;
- finalized result only in finalized state.

Planned write:

`POST /api/v1/matches/{matchId}/result/`

Command carries:

- read projection `revision`;
- non-negative integer `playerScore`;
- non-negative integer `opponentScore`.

Runtime-validated outcomes:

- `accepted`;
- `validation_error`;
- `stale`;
- `unavailable`;
- `already_submitted`.

## State / integrity acceptance

UI handles:

- reportable;
- submitting;
- client field/form validation;
- authoritative backend validation;
- retry-safe transport error;
- stale revision;
- awaiting confirmation;
- finalized result;
- disputed result;
- unavailable submission;
- private not-found;
- unauthenticated/session-expired;
- accepted authoritative receipt.

Runtime validation rejects contradictory data including:

- reportable state with an existing reported/finalized result;
- awaiting-confirmation without reported score;
- finalized without finalized result;
- finalized result exposed outside finalized state;
- disputed state represented as submit-eligible;
- score outside supplied min/max policy;
- equal scores when `allowDraw=false`;
- accepted receipt with a `matchId` different from the route;
- accepted finalized receipt without final result.

Hardening completed during self-review:

- project-style executable contract test replaced unsupported `bun:test` type import;
- unavailable action closes the form;
- stale action prevents resubmission with the old revision;
- POST 401 routes to login while loader 403 is not conflated with authentication;
- receipt route identity is enforced;
- time formatting uses supplied IANA timezone.

## Frontend implementation evidence

Accepted implementation/browser head:

`5961e7b986b6e8751c137434d00472e17e1e1376`

Quality Gate:

`34394538199` — PASS

Artifact:

- ID `10121043332`
- digest `sha256:78d409ade10ef50124a374cd50475b139749221acc3c51332690b253c36cc860`
- exact workflow head `5961e7b986b6e8751c137434d00472e17e1e1376`
- captures `375 / 390 / 430 / 768 / 1024 / 1440`
- representative manual visual review at `375 / 430 / 768 / 1024 / 1440` — PASS
- no overflow, clipped primary CTA, form/summary collision or broken responsive hierarchy found.

Acceptance evidence file:

`docs/workstreams/F05_ACCEPTANCE_EVIDENCE.md`

Final implementation/evidence head:

`8daa47c2e12f548a9a4d2c0c39d4a5b653aeb8bc`

- exact-head push Quality Gate `34405746632` — PASS;
- implementation PR #45 — MERGED;
- PR-triggered Quality Gate `34406070865` — PASS;
- review threads immediately before merge: `0`;
- pre-merge main remained exact F04 frozen `864fe1491739b06c763be487a73a589c7e0f3609`;
- implementation merged with expected-head lock;
- implementation merge SHA `80b0f00860741f352208c41f79edaae5fd1872ac`;
- post-implementation main Quality Gate `34406381160` — PASS.

## Cross-repo evidence

Backend owner: `results`.

F05 documentation-only alignment:

- backend START_SHA `baeffe042f4dc6ab6d2cbd0433eca4f8404daff6`;
- backend Issue #13 — `CLOSED / COMPLETED`;
- backend PR #14 — MERGED;
- docs head `4e1826d7be562e3cecef3d61070fe7ab8baa2379`;
- PR Quality Gate `34394337599` — PASS on Python 3.12/3.14;
- review threads `0`;
- merge/main `93d4158e55ebe5d4cb0e724c84104ddd9fbf0c17`;
- post-merge Quality Gate `34394628782` — PASS on Python 3.12/3.14;
- Python result/match implementation: `NONE`;
- models/migrations/phase-registry/order changes: `NONE`.

Runtime status remains:

`FRONTEND MOCK / BACKEND PENDING`

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## Closeout state

Closeout branch:

`closeout/f05-result-submission`

Created exactly from implementation merge:

`80b0f00860741f352208c41f79edaae5fd1872ac`

The closeout registry promotes `/matches/$id/result` to `FINAL_PRIVATE` because final architecture, implementation QA, PR merge, post-implementation main CI and cross-repo ownership are all accepted without falsely claiming live backend integration.

F05 itself is still not terminally `DONE / MERGED / FROZEN` until:

1. final closeout head Quality Gate is green;
2. closeout PR Quality Gate is green and review threads are `0`;
3. closeout PR is merged with exact-head lock;
4. terminal post-closeout `main` Quality Gate is green;
5. closeout merge/frozen main SHA and terminal CI are recorded in Issue #44;
6. Issue #44 is closed as `completed`.

Frontend NEXT after terminal F05 closeout is **Dispute**.
