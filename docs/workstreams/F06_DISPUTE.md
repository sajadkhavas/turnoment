# F06 — Final Match Dispute

Status: `IN PROGRESS / IMPLEMENTATION ACCEPTED / PR PENDING`

START_SHA: `0407a925974d50b4a75af292231bacb48c66eb38`

Implementation branch: `phase/f06-dispute`

Tracking Issue: `#47`

Route: `/matches/$id/dispute`

Indexability: `PRIVATE / NOINDEX`

Runtime integration: `FRONTEND MOCK / BACKEND PENDING`

## 1. Repository / overlap lock

- frontend frozen `main` at START: `0407a925974d50b4a75af292231bacb48c66eb38`;
- F05 terminal Quality Gate `34407220433` — PASS;
- F05 Issue #44 — closed completed;
- `/matches/$id/dispute` did not exist at START;
- backend contract baseline already reserved `/matches/{id}/dispute` under owner `disputes`;
- no overlapping F06/Dispute branch, open Issue or PR existed before workstream creation;
- branch `phase/f06-dispute` was created exactly from START_SHA.

## 2. Mandatory source / design / security audit

Read before implementation:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `SEO_FINAL_COPY_PROTOCOL.md` applicability;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- F04 My Matches contracts/evidence;
- F05 Result Submission contracts/evidence/closeout;
- backend `PROJECT_CONTINUITY.md` and frontend/backend contract documents.

External guidance applied:
- TanStack Router data loading/mutation patterns: route params/access before loader, loader owns projection, stale/accepted mutations refresh authoritative truth instead of inventing lifecycle;
- WCAG 2.2 input/error assistance: persistent labels, associated textual errors, keyboard-operable controls, semantic status/alert feedback;
- Battlefy/Challonge interaction patterns: dispute is separate from score confirmation and evidence may support a match issue; no branding/layout/copy copied;
- OWASP File Upload guidance: browser file checks are usability hints only; backend owns actual type/signature/size/count/storage/security/authorization validation.

Public SERP research is not applicable because this is a private authenticated `noindex,nofollow` route.

## 3. Product scope

F06 owns the complete player-facing Dispute surface for one Match:
1. show authoritative Match/result context;
2. allow dispute creation only when state is `eligible`;
3. show current case for `open` / `under-review`;
4. allow evidence only when backend policy and `canAddEvidence` permit it;
5. show authoritative resolution for `resolved`;
6. show unavailable/not-found/auth/error/stale states safely.

Dispute withdrawal/cancellation is deliberately not implemented because no accepted backend transition owns it.

Frontend never decides dispute eligibility, moderation result, score correction, winner, rating impact or Match lifecycle.

## 4. Permanent frontend contract

Boundary:

`validated matchId → private Session UX access policy → loader → typed MatchDisputeRepository → runtime validation → Mock/Django adapter → explicit create/evidence mutation state → UI`

Planned read endpoint:

`GET /api/v1/matches/{matchId}/dispute/`

Read projection includes:
- stable Match/player/opponent/game/competition/venue identity;
- opaque `revision`;
- `disputeState = eligible | open | under-review | resolved | unavailable`;
- offset-aware `startsAt` + backend IANA timezone;
- authoritative result context;
- backend-owned dispute/evidence policy;
- nullable current dispute with stable dispute ID, reason/statement, status, evidence metadata and nullable resolution.

Runtime validation rejects contradictory page/dispute states, resolved cases without resolution, evidence-policy contradictions, excessive evidence count and identity mismatches.

## 5. Create dispute mutation

Planned endpoint:

`POST /api/v1/matches/{matchId}/dispute/`

Command:
- opaque `revision`;
- stable backend-approved reason code;
- statement within backend policy limits;
- one `Idempotency-Key` per logical attempt.

Web boundary:
- `credentials: include`;
- P01 CSRF bootstrap;
- `X-CSRFToken`;
- backend server-side participant/Match authorization independent of frontend UX guard.

Typed outcomes:
- `accepted`;
- `validation_error`;
- `stale`;
- `unavailable`;
- `already_open`.

## 6. Evidence mutation

Planned endpoint:

`POST /api/v1/matches/{matchId}/dispute/{disputeId}/evidence/`

Multipart file upload uses Session + CSRF + per-attempt `Idempotency-Key` and current opaque revision.

Typed outcomes:
- `accepted`;
- `validation_error`;
- `stale`;
- `unavailable`;
- `already_uploaded`.

Frontend MIME/size/count checks improve UX only. Backend implementation must validate actual file type/signature, size/count quota, safe storage/name, malware/security handling, object authorization and private evidence access. No public evidence URL is part of the frontend contract.

## 7. Final UX / copy / accessibility

- final H1: `اعتراض به Match`;
- final title: `اعتراض به Match — ایران مهر افزار`;
- final product copy contains no backend/API/mock/demo/waiting/temporary language;
- reason select and statement textarea have persistent labels and associated errors;
- review-before-submit is explicit;
- stale state blocks unsafe continuation with an old revision;
- resolved state shows only server-returned decision summary;
- evidence picker is a localized accessible control labelled `انتخاب تصویر` rather than browser-native English text;
- route remains `noindex,nofollow`.

## 8. Corrective F04/F05 navigation reconciliation

Repository audit found a discrepancy: frozen My Matches did not actually contain the previously documented `submit-result` CTA. F06 includes the bounded correction:
- `attention=submit-result` → `/matches/$id/result`;
- `attention=dispute` → `/matches/$id/dispute`;
- F05 `submissionState=disputed` → `/matches/$id/dispute`;
- Check-in remains unchanged;
- `confirm-result` remains unlinked until its own governed workstream exists.

This correction is covered by the same full regression gate as F06.

## 9. Accepted implementation / QA evidence

Accepted code checkpoint:

`1a1bf97da61ce9f4845c7ed78262519f54e1a3f3`

Quality Gate:

`34410106647` — PASS

All steps passed:
- frozen install;
- lint;
- production build / route generation;
- TypeScript typecheck;
- contract checks including F05 regression + F06 negative integrity tests;
- browser smoke;
- private robots assertion;
- one-main assertion;
- responsive screenshots and artifact upload.

Artifact:
- `10126954058`;
- digest `sha256:385120df87ea2ea15cae7eccfa978aba0a8f083f82b8101b6138cdc232118bcd`;
- total regression screenshots: `42`;
- F06 widths: `375 / 390 / 430 / 768 / 1024 / 1440`.

Representative manual review after final picker correction:
- `375` PASS;
- `768` PASS;
- `1440` PASS;
- no overflow/collision;
- mobile/desktop hierarchy accepted;
- localized picker visible.

Earlier checkpoint `cb89585727b0de46a17300ff005229073cd9d342` / run `34409285411` is superseded because manual QA found native English file-picker copy.

Detailed acceptance record: `docs/workstreams/F06_ACCEPTANCE_EVIDENCE.md`.

## 10. Cross-repo backend alignment

Backend Issue #15: `CLOSED / COMPLETED`.

Backend documentation PR #16: `MERGED`.

- backend docs head: `c38052f2c9aaa79ad269e5445610f5f2a28c6845`;
- PR gate `34409560819` — PASS Python 3.12 / 3.14;
- review threads: `0`;
- merge/current accepted backend main: `38dccbf213d5f439e56cd608e3e4ac419d5092d1`;
- post-merge gate `34409893478` — PASS Python 3.12 / 3.14;
- Python/domain/models/migrations/phase registry changes: `NONE`;
- backend NEXT remains `P02 — Games / Catalog Foundation`.

The backend work above is contract/governance alignment only. Disputes runtime remains pending its accepted backend implementation phase.

## 11. Remaining terminal gates

F06 is not terminally DONE yet. Exact next:
1. commit final governance/evidence reconciliation;
2. require exact-head branch Quality Gate PASS;
3. open implementation PR without auto-closing Issue #47;
4. require exact-head PR CI PASS, mergeable true and review threads `0`;
5. verify `main` still equals START_SHA immediately before merge;
6. merge with expected-head lock;
7. require post-implementation `main` Quality Gate PASS on exact merge SHA;
8. create documentation-only closeout branch from exact implementation merge;
9. create closeout record + promote Registry to target `FINAL_PRIVATE` non-recursively;
10. require closeout PR CI PASS, mergeable true and review threads `0`;
11. merge closeout with expected-head lock;
12. require terminal post-closeout `main` Quality Gate PASS;
13. record frozen main SHA + terminal CI in Issue #47 and close completed.
