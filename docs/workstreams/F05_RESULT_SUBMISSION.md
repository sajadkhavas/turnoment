# F05 — Final Result Submission

Status: `IN PROGRESS / PRE-IMPLEMENTATION ACCEPTED`

START_SHA: `864fe1491739b06c763be487a73a589c7e0f3609`

Implementation branch: `phase/f05-result-submission`

Tracking Issue: `#44`

Route: `/matches/$id/result`

Indexability: `PRIVATE / NOINDEX`

## Identity / repository lock

- frontend frozen `main` verified at START: `864fe1491739b06c763be487a73a589c7e0f3609`;
- F04 terminal Quality Gate `34391019079` — PASS;
- F04 Issue #41 reviewed and closed `completed`; exact frontend NEXT is Result Submission;
- `/matches/$id/result` does not exist in frontend at START;
- backend contract already reserves `/matches/{id}/result` under owner `results`;
- overlapping F05/Result Submission branch, open Issue and open PR: none before creation;
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
- F04 My Matches final contract/evidence and terminal Issue #41
- backend `docs/FRONTEND_BACKEND_CONTRACT.md`
- accepted F01 Registration Session/CSRF mutation pattern

Official references reviewed before implementation:

### TanStack Router — data mutations

https://tanstack.com/router/latest/docs/guide/data-mutations

Decisions:
- route loader owns the authoritative read projection;
- form mutation state is explicit in the Result Submission UI/repository layer;
- after a successful or stale mutation, authoritative data may be reloaded deliberately rather than mutated optimistically;
- no client-side winner/final-state calculation is introduced.

### W3C WCAG 2.2 — Input Assistance / Error Identification

https://www.w3.org/TR/WCAG22/

Decisions:
- every score input has a persistent label;
- validation errors are textual and associated with the relevant field;
- error/status feedback is announced through semantic alert/status regions;
- focus remains usable after validation/submission failure;
- controls satisfy keyboard and touch-target expectations.

### Django Session / CSRF project pattern

Accepted F01 registration implementation was reviewed:
- Session UX lookup through `playerSessionRepository`;
- CSRF bootstrap through `GET /api/v1/auth/csrf/`;
- unsafe request uses `credentials: include` + `X-CSRFToken`;
- response is runtime-validated before UI use.

F05 reuses this boundary rather than inventing another auth mechanism.

## Design reference audit

Existing Turnoment references reviewed:

- F04 My Matches cards/state hierarchy;
- F01 Tournament Registration form/mutation/error/success structure;
- current dark RTL cards, spacing, focus rings, status tokens and responsive conventions.

External product/interface references reviewed:

### Battlefy

Flows reviewed:
- Match Page / report score;
- score confirmation;
- reporting a Match issue.

Patterns learned:
- reporting a score is a distinct action from opponent confirmation;
- entered score should be reviewed before final submit;
- incorrect/contested score moves into a separate dispute/issue flow.

### Challonge

Flows reviewed:
- participant score reporting;
- report-scores workflow and optional evidence patterns.

Patterns learned:
- match identity/opponents and score controls should remain together;
- evidence/dispute capabilities must not be silently implied when the product contract does not yet own them.

No third-party branding, copy, assets, score rules or visual layout will be copied.

## Selected final design direction

Result Submission is a focused private action page, not a generic Match Detail page.

Primary hierarchy:
1. breadcrumb/back link to My Matches;
2. page identity + authoritative Match context;
3. current result-submission state;
4. player vs opponent score inputs when state is `reportable`;
5. review step showing the exact values before the command is sent;
6. authoritative submission receipt or stale/unavailable state;
7. safe return to My Matches.

Desktop:
- centered content shell with a primary form column and compact sticky Match summary;
- score inputs presented symmetrically around `VS`;
- review card before irreversible submit.

Mobile/tablet:
- single-column flow;
- score fields remain large and easy to tap;
- no horizontal dependence for understanding the score;
- Match summary follows the action hierarchy without hiding the submit state.

## SEO / final-copy decision

`/matches/$id/result` is authenticated/private and permanently `noindex,nofollow`.

Public SERP/keyword research is `N/A` under project protocol. Final-copy requirements remain mandatory:
- no backend/API/mock/demo/temporary/waiting language;
- no unsupported guarantee about confirmation/finalization;
- no wording that labels a winner before the server finalizes one;
- natural Persian product copy.

Final H1: `ثبت نتیجه Match`

Final title: `ثبت نتیجه Match — ایران مهر افزار`

Structured data: omitted because this is a private noindex action route.

## Final production contract

### Stable identity

- route param `matchId`: non-empty safe stable identifier;
- client validates route shape only; backend authorizes membership/eligibility independently.

### Read operation

Planned endpoint:

`GET /api/v1/matches/{matchId}/result/`

Returns an authoritative `ResultSubmissionPageData` projection:
- `matchId`;
- opaque `revision` for stale-state detection;
- `submissionState`: `reportable | awaiting-confirmation | finalized | disputed | unavailable`;
- current player identity;
- opponent stable identity/kind/display tag;
- game stable ID/name;
- competition stable identity/title/kind/round context;
- optional venue;
- offset-aware `startsAt` + IANA timezone;
- `formatLabel`;
- authoritative score policy: minimum score, nullable maximum score, `allowDraw`;
- optional previously reported score only when state allows it;
- optional finalized result only when state is `finalized`.

### Write operation

Planned endpoint:

`POST /api/v1/matches/{matchId}/result/`

Command:
- `revision` from the read projection;
- non-negative integer `playerScore`;
- non-negative integer `opponentScore`.

Request boundary:
- Django Session cookie through `credentials: include`;
- CSRF bootstrap through `/api/v1/auth/csrf/`;
- `X-CSRFToken` on POST;
- `Idempotency-Key` generated once per user submit attempt and reused for transport retry of that attempt;
- backend remains authoritative for idempotency collision semantics and stale revision handling.

### Write outcomes

Runtime-validated action result is one of:
- `accepted` — report stored; returned state is `awaiting-confirmation` or `finalized`;
- `validation_error` — field/form errors from authoritative validation;
- `stale` — revision/state changed and page must reload authoritative truth;
- `unavailable` — result can no longer be submitted;
- `already_submitted` — server reports an existing submission/receipt state.

No frontend winner/outcome/rating calculation is allowed. A final outcome/rating delta may render only when returned as a finalized result.

## Runtime integrity rules

Reject contradictory projections/results, including:
- `reportable` with a previously reported score or finalized result;
- `awaiting-confirmation` without a reported score;
- `finalized` without a finalized result;
- finalized result exposed outside `finalized` state;
- `disputed` state presented as submit-eligible;
- score outside authoritative min/max policy;
- equal score submitted while `allowDraw=false`;
- accepted receipt whose `matchId` differs from route identity;
- accepted `finalized` receipt without finalized result.

## UI state matrix

- `reportable` — editable score form + review confirmation;
- `submitting` — locked controls + busy state;
- client validation errors — field-specific text;
- backend validation error — field/form text;
- transport error — retry-safe message without claiming whether the command succeeded;
- `stale` — refresh authoritative Match state;
- `awaiting-confirmation` — show reported score, no duplicate submit;
- `finalized` — show authoritative final score/outcome/rating delta if supplied;
- `disputed` — show that result is under review; no F06 dead link;
- `unavailable` — submission form absent;
- `not found` — clear private not-found state;
- unauthenticated/session-expired — redirect to `/login`;
- success receipt — show only returned authoritative status and score.

## Integration with F04 My Matches

After F05 route exists:
- `attention === "submit-result"` gets a real link to `/matches/$id/result` using stable `matchId`;
- `confirm-result` and `dispute` remain non-linked until their dedicated accepted workstreams exist;
- no other F04 state semantics change.

## QA plan

Required before implementation acceptance:
- frozen install;
- lint;
- production build / route generation;
- TypeScript typecheck;
- F05 read/write runtime-contract tests including negative invariants;
- SSR smoke for `/matches/m-204/result`;
- private `noindex,nofollow` assertion;
- exactly one `<main>`;
- responsive browser screenshots at `375 / 390 / 430 / 768 / 1024 / 1440`;
- representative manual visual review;
- review threads `0` before merge.

## Cross-repo rule

F05 may refine the planned `results` API contract in backend documentation, but must not start/reorder the backend domain implementation phase. Until the backend Result endpoints are implemented and tested:

`FRONTEND MOCK / BACKEND PENDING`

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## Exact NEXT

1. register `/matches/$id/result` as active `IN_PROGRESS` route;
2. implement read/write contract, fixture + Django adapters, route and UI;
3. wire only F04 `submit-result` attention to F05;
4. add contract/browser regression gates;
5. align the exact results endpoint/idempotency/stale contract cross-repo as documentation only;
6. obtain exact-head QA, PR/review/merge/post-merge CI;
7. documentation-only closeout/freeze + terminal main CI before reporting DONE.
