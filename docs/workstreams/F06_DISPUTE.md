# F06 — Final Match Dispute

Status: `IN PROGRESS / PRE-IMPLEMENTATION ACCEPTED`

START_SHA: `0407a925974d50b4a75af292231bacb48c66eb38`

Implementation branch: `phase/f06-dispute`

Tracking Issue: `#47`

Route: `/matches/$id/dispute`

Indexability: `PRIVATE / NOINDEX`

## Identity / repository lock

- frontend frozen `main` verified at START: `0407a925974d50b4a75af292231bacb48c66eb38`;
- F05 terminal Quality Gate `34407220433` — PASS;
- F05 Issue #44 — `CLOSED / COMPLETED`; exact frontend NEXT is Dispute;
- `/matches/$id/dispute` does not exist at START;
- backend frontend-contract baseline reserves `/matches/{id}/dispute` under owner `disputes`;
- overlapping Dispute branch/open Issue/open PR: none before creation;
- dedicated branch created exactly from START_SHA.

## Corrective navigation finding

Stage A source audit found a real discrepancy in the frozen F05 repository: the Result Submission route is final and exists, but the `My Matches` attention card still only renders the Check-in link and does not render the previously documented `submit-result` CTA. F06 acceptance therefore includes a bounded navigation reconciliation:

- `attention === "submit-result"` → `/matches/$id/result`;
- `attention === "dispute"` → `/matches/$id/dispute`;
- Check-in behavior remains unchanged;
- `confirm-result` remains unlinked until its own accepted workstream exists.

This correction must pass the full F05 + F06 regression gate before F06 may merge.

## Mandatory governance / source audit

Read before implementation:

- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `SEO_FINAL_COPY_PROTOCOL.md` applicability;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- F04 My Matches contract/evidence;
- F05 Result Submission route, contract, mutation and closeout evidence;
- backend `docs/FRONTEND_BACKEND_CONTRACT.md` at accepted backend main.

### TanStack Router

Reviewed current data-loading and data-mutation guidance.

Decisions:
- route params and private access policy are validated before loader use;
- loader owns the authoritative Dispute projection;
- mutation state is explicit in the page/repository layer;
- after stale or accepted mutations, authoritative truth may be refreshed through router invalidation rather than optimistic lifecycle invention.

### WCAG 2.2 — input/error assistance

Decisions:
- reason and statement controls have persistent labels;
- validation failures are textual and associated with their control/form;
- correction guidance is shown where known;
- mutation/loading states remain keyboard operable and announced with semantic status/alert regions.

### Battlefy interaction audit

Patterns reviewed:
- Match issue/dispute is a separate action from score confirmation;
- incorrect-score confirmation may lead to a dispute state;
- screenshot/image proof may be attached to a match issue;
- dispute handling is an administrative/moderation process, not a client-side result decision.

Only interaction boundaries were learned. No third-party branding, wording, layout, rules or lifecycle is copied.

### OWASP File Upload Cheat Sheet

Security boundary adopted:
- frontend file filtering is usability only, never security truth;
- backend must independently allowlist actual accepted formats and enforce file-size/count limits;
- browser-provided `Content-Type` is not trusted as authoritative validation;
- backend owns file-signature/type validation, safe storage naming/location, authorization, CSRF, malware/sandbox handling where applicable, and download/view authorization;
- evidence remains private; the frontend contract does not invent a public evidence URL.

## Selected final product direction

F06 is one focused private Match Dispute page that supports the complete player-facing lifecycle owned by this frontend workstream:

1. show authoritative Match/result context;
2. create a dispute only when backend state is `eligible`;
3. show current dispute when `open` or `under-review`;
4. allow evidence upload only when backend policy + `canAddEvidence` permit it;
5. show authoritative resolution when `resolved`;
6. show safe unavailable state otherwise.

Dispute withdrawal/cancellation is deliberately out of scope because no accepted backend transition/endpoint currently owns it.

## SEO / final-copy decision

The route is authenticated/private and permanently `noindex,nofollow`.

Public SERP/keyword research: `N/A` under project protocol.

Final H1: `اعتراض به Match`

Final title: `اعتراض به Match — ایران مهر افزار`

User copy must not expose backend/API/mock/demo/temporary/waiting language and must not promise a moderation result or response time.

## Final production contract

### Stable identity / read

Planned endpoint:

`GET /api/v1/matches/{matchId}/dispute/`

Returns runtime-validated `MatchDisputePageData`:

- `matchId`;
- opaque `revision`;
- `disputeState`: `eligible | open | under-review | resolved | unavailable`;
- stable player/opponent/game/competition/venue identities;
- offset-aware `startsAt` + backend IANA `timezone`;
- `formatLabel`;
- authoritative result context with optional reported/final score data;
- dispute policy;
- nullable current dispute.

### Dispute policy

- stable allowed reason codes;
- `minStatementLength` / `maxStatementLength`;
- evidence policy: enabled, max files, max bytes per file, accepted client-hint MIME types;
- backend remains authoritative for actual evidence acceptance/security validation.

### Current dispute

When present:
- `disputeId` stable identity;
- `status`: `open | under-review | resolved`;
- authoritative reason + statement;
- `createdAt`;
- `canAddEvidence` backend boolean;
- private evidence metadata only;
- nullable resolution, required only for `resolved`.

### Create dispute mutation

Planned endpoint:

`POST /api/v1/matches/{matchId}/dispute/`

Command:
- `revision`;
- reason code;
- statement;
- per-logical-attempt `Idempotency-Key` header.

Boundary:
- Django Session through `credentials: include`;
- CSRF bootstrap through `/api/v1/auth/csrf/`;
- `X-CSRFToken`;
- backend object authorization and eligibility are independent of frontend route access.

Outcomes:
- `accepted`;
- `validation_error`;
- `stale`;
- `unavailable`;
- `already_open`.

### Evidence mutation

Planned endpoint:

`POST /api/v1/matches/{matchId}/dispute/{disputeId}/evidence/`

- multipart `file`;
- Django Session + CSRF;
- per-logical-attempt `Idempotency-Key`;
- browser checks are convenience only;
- backend validates actual file/type/signature/size/quota/security and authorization.

Outcomes:
- `accepted`;
- `validation_error`;
- `stale`;
- `unavailable`;
- `already_uploaded`.

## Runtime integrity rules

Reject contradictory data, including:

- route `matchId` mismatch;
- `eligible` with an active dispute;
- `open/under-review/resolved` without current dispute;
- page state and dispute status mismatch;
- `resolved` without resolution;
- resolution outside resolved state;
- resolved dispute with `canAddEvidence=true`;
- disabled evidence policy with evidence items or `canAddEvidence=true`;
- evidence count greater than policy maximum;
- accepted mutation receipt for another Match/dispute identity.

Frontend never derives moderation decision, corrected score, winner, rating impact or Match lifecycle from a dispute.

## UI state matrix

- `eligible` — reason + statement form, client/backend errors, explicit review before create;
- `submitting` — locked controls, busy state;
- `stale` — no reuse of old revision, refresh authoritative truth;
- `open` — active dispute summary + evidence surface only if allowed;
- `under-review` — moderation-in-progress summary + optional evidence only if backend allows;
- `resolved` — backend resolution summary, no evidence mutation;
- `unavailable` — no create controls;
- evidence validation/transport/idempotent receipt states;
- not-found / unauthorized / session-expired boundaries consistent with F05.

## Navigation integration

After F06 route exists:
- My Matches `submit-result` CTA is restored as corrective F05 navigation;
- My Matches `dispute` attention links to this route;
- F05 Result Submission `disputed` state links to this route;
- no `confirm-result` route is invented.

## QA plan

Required before implementation acceptance:
- frozen install;
- lint;
- production build / route generation;
- TypeScript typecheck;
- F06 contract tests, negative invariants and mutation identity checks;
- existing F05 contract regression remains green;
- SSR smoke for `/matches/m-206/dispute`;
- private `noindex,nofollow` assertion;
- exactly one `<main>`;
- responsive screenshots `375 / 390 / 430 / 768 / 1024 / 1440`;
- representative manual visual review;
- review threads `0` before merge.

## Cross-repo rule

F06 may refine the planned dispute read/create/evidence contract in backend documentation, but must not start/reorder the backend disputes implementation phase.

Runtime remains:

`FRONTEND MOCK / BACKEND PENDING`

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## Exact NEXT

1. define runtime schemas and deterministic fixture;
2. implement Django read/create/evidence adapter with Session/CSRF/idempotency;
3. build final private route/UI and states;
4. reconcile F05/My Matches navigation without inventing Result Confirmation;
5. extend contract/browser gates;
6. docs-only backend contract alignment;
7. exact-head QA → implementation PR/CI/merge/post-merge CI;
8. documentation-only closeout/freeze + terminal main CI before DONE.
