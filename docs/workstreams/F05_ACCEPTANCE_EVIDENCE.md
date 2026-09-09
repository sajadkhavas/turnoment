# F05 — Result Submission Acceptance Evidence

Status at creation: `IMPLEMENTATION ACCEPTED / PRE-PR`

This file records non-recursive implementation evidence for F05. The final reviewed branch SHA after this evidence commit, PR CI, implementation merge SHA, closeout merge/frozen `main` SHA, and terminal `main` Quality Gate are recorded later in tracking Issue #44 when those facts exist.

## Identity

- workstream: `F05 — Result Submission`
- route: `/matches/$id/result`
- indexability: `PRIVATE / NOINDEX`
- START_SHA: `864fe1491739b06c763be487a73a589c7e0f3609`
- implementation branch: `phase/f05-result-submission`
- tracking Issue: `#44`
- accepted implementation/browser head before evidence commit: `5961e7b986b6e8751c137434d00472e17e1e1376`

## Accepted frontend architecture

Permanent boundary:

`validated matchId → private Session UX access policy → loader → typed ResultSubmissionRepository → runtime-validated authoritative state → validated score form → CSRF/session result command → runtime-validated receipt/conflict state → UI`

Accepted properties:

- safe stable route-param validation;
- unauthenticated Session UX redirects to `/login`;
- authenticated-but-unauthorized/private object lookup is not conflated with authentication;
- private `noindex,nofollow` metadata;
- deterministic fixture adapter and Django HTTP adapter behind one repository contract;
- planned production mapping `GET/POST /api/v1/matches/{matchId}/result/`;
- Django Session cookies via `credentials: include`;
- P01 CSRF bootstrap + `X-CSRFToken` on POST;
- one `Idempotency-Key` per logical submit attempt;
- opaque backend `revision` controls stale-state detection;
- backend-authoritative score policy, submission eligibility, receipt state, final result and rating delta;
- frontend never derives winner/final outcome/rating from submitted score values;
- explicit review-before-submit interaction;
- reportable, submitting, validation-error, transport-error, stale, awaiting-confirmation, finalized, disputed, unavailable, not-found and session-expired handling;
- stale state disables further submission with the old revision and requires authoritative refresh;
- unavailable response closes the form rather than leaving a stale submit surface active;
- runtime receipt identity check rejects a returned `matchId` that does not match the route;
- timezone rendering uses the backend-supplied IANA timezone;
- F04 My Matches links only `attention=submit-result` to this accepted route;
- Result Confirmation and Dispute remain separate later workstreams and no dead links are introduced.

## Runtime-contract acceptance

Regression checks cover positive and negative invariants including:

- reportable browser fixture exists and validates;
- accepted report returns only server receipt truth and does not manufacture a final result;
- stale revision returns authoritative stale outcome;
- equal score is rejected when `allowDraw=false`;
- score above authoritative maximum is rejected;
- reportable projection cannot already contain a reported score;
- awaiting-confirmation requires a reported score;
- finalized projection requires an authoritative final result;
- accepted finalized receipt requires a final result;
- duplicate reporting returns `already_submitted`;
- accepted receipt with the wrong `matchId` is rejected.

## Exact implementation Quality Gate

Accepted implementation/browser head:

`5961e7b986b6e8751c137434d00472e17e1e1376`

Quality Gate:

`34394538199` — PASS

All required steps PASS:

- frozen dependency install;
- lint;
- production build and route generation;
- TypeScript typecheck;
- contract checks;
- browser smoke and responsive screenshots;
- browser QA artifact upload.

Browser artifact:

- artifact ID: `10121043332`
- artifact name: `browser-qa-5961e7b986b6e8751c137434d00472e17e1e1376`
- digest: `sha256:78d409ade10ef50124a374cd50475b139749221acc3c51332690b253c36cc860`
- artifact workflow head: exact `5961e7b986b6e8751c137434d00472e17e1e1376`

Responsive captures exist at:

`375 / 390 / 430 / 768 / 1024 / 1440`

for Result Submission in addition to the existing accepted route regression screenshots.

## Manual visual review

Representative Result Submission screenshots manually reviewed from the exact artifact:

- 375: PASS
- 430: PASS
- 768: PASS
- 1024: PASS
- 1440: PASS

Review findings:

- no horizontal overflow;
- no clipped score controls or primary CTA;
- no summary/form collision;
- mobile hierarchy remains action-first and readable;
- desktop summary/form grid remains separated and readable;
- no broken footer/header overlap;
- focus/controls remain visibly distinguishable;
- user-facing copy contains no backend/API/mock/demo/waiting language.

## Cross-repo contract evidence

Backend owner remains `results`.

Documentation-only F05 alignment is terminally closed:

- backend START_SHA: `baeffe042f4dc6ab6d2cbd0433eca4f8404daff6`
- backend branch: `docs/f05-result-submission-contract`
- backend Issue: `#13` — CLOSED / COMPLETED
- backend docs PR: `#14` — MERGED
- backend docs head: `4e1826d7be562e3cecef3d61070fe7ab8baa2379`
- PR Quality Gate: `34394337599` — PASS on Python 3.12 and 3.14
- review threads before merge: `0`
- backend alignment merge/main: `93d4158e55ebe5d4cb0e724c84104ddd9fbf0c17`
- post-merge backend Quality Gate: `34394628782` — PASS on Python 3.12 and 3.14
- Python result/match implementation changed: `NO`
- models/migrations changed: `NO`
- backend phase registry/order changed: `NO`

Runtime integration remains explicitly:

`FRONTEND MOCK / BACKEND PENDING`

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## Remaining acceptance chain

1. require a fresh exact-head push Quality Gate after this evidence/governance commit chain;
2. open implementation PR without auto-closing Issue #44;
3. require exact PR head, PR Quality Gate PASS and review threads `0`;
4. verify `main` is still the F04 frozen SHA before merge;
5. merge implementation with expected-head lock;
6. require post-implementation `main` Quality Gate PASS;
7. create closeout branch from exact implementation merge;
8. write non-recursive closeout/freeze record and promote route registry to `FINAL_PRIVATE` there;
9. require closeout PR CI + review threads `0`, merge with expected-head lock;
10. require terminal post-closeout `main` Quality Gate PASS;
11. record frozen main SHA + terminal CI in Issue #44 and only then close Issue #44 completed.
