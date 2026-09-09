# F06 — Match Dispute Acceptance Evidence

Status: `IMPLEMENTATION ACCEPTED / PR PENDING`

Route: `/matches/$id/dispute`

START_SHA: `0407a925974d50b4a75af292231bacb48c66eb38`

Implementation branch: `phase/f06-dispute`

Tracking Issue: `#47`

Runtime integration: `FRONTEND MOCK / BACKEND PENDING`

## Accepted code checkpoint

Accepted implementation/browser code head:

`1a1bf97da61ce9f4845c7ed78262519f54e1a3f3`

Frontend Quality Gate:

`34410106647` — PASS

All required steps passed:
- frozen dependency installation;
- lint;
- production build and route generation;
- TypeScript typecheck;
- contract checks, including F05 regressions and F06 negative integrity checks;
- browser smoke / SSR-visible HTML assertions;
- responsive screenshot suite;
- browser artifact upload.

Browser artifact:
- artifact ID: `10126954058`;
- name: `browser-qa-1a1bf97da61ce9f4845c7ed78262519f54e1a3f3`;
- digest: `sha256:385120df87ea2ea15cae7eccfa978aba0a8f083f82b8101b6138cdc232118bcd`;
- 42 screenshots total across the accepted route regression set;
- F06 widths: `375 / 390 / 430 / 768 / 1024 / 1440`.

Representative manual F06 visual review after the final picker/navigation correction:
- `375` — PASS;
- `768` — PASS;
- `1440` — PASS;
- no horizontal overflow;
- no card/sidebar collision;
- mobile and desktop hierarchy readable;
- private Match/dispute context remains visible and comprehensible;
- evidence picker is localized and no longer exposes native English `Choose File / No file chosen` copy.

## Corrective F05/F04 navigation acceptance

Repository audit found that the frozen My Matches card did not actually contain the previously documented Result Submission CTA. F06 contains the bounded correction and the full regression gate above covers it.

Accepted navigation:
- `attention=submit-result` → `/matches/$id/result`;
- `attention=dispute` → `/matches/$id/dispute`;
- F05 `submissionState=disputed` → `/matches/$id/dispute`;
- Check-in behavior unchanged;
- no `confirm-result` route invented.

## F06 contract acceptance

Frontend boundary:

`validated matchId → private Session UX access policy → loader → typed MatchDisputeRepository → runtime validation → Mock/Django adapter → explicit create/evidence mutation state → UI`

Accepted read states:
- `eligible`;
- `open`;
- `under-review`;
- `resolved`;
- `unavailable`.

Accepted create-dispute outcomes:
- `accepted`;
- `validation_error`;
- `stale`;
- `unavailable`;
- `already_open`.

Accepted evidence-upload outcomes:
- `accepted`;
- `validation_error`;
- `stale`;
- `unavailable`;
- `already_uploaded`.

Runtime guards reject contradictory state and route/receipt identity mismatches. Frontend never derives moderation decision, corrected score, winner, rating impact or Match lifecycle.

## Security / web mutation boundary

Planned Django mapping:
- `GET /api/v1/matches/{matchId}/dispute/`;
- `POST /api/v1/matches/{matchId}/dispute/`;
- `POST /api/v1/matches/{matchId}/dispute/{disputeId}/evidence/`.

Browser requests use Django Session credentials. Unsafe mutations use the P01 CSRF bootstrap + `X-CSRFToken`, opaque `revision`, and one `Idempotency-Key` per logical mutation attempt.

Evidence file filtering in the browser is convenience only. Backend owns actual type/signature verification, safe storage, count/size quotas, malware/security handling, authorization and private access. No public evidence URL is invented by the frontend.

## Copy / accessibility / index policy

- private route;
- `noindex,nofollow`;
- final H1: `اعتراض به Match`;
- no user-visible backend/API/mock/demo/waiting language;
- persistent reason/statement labels;
- textual control/form errors;
- keyboard-operable controls and semantic status/alert feedback;
- review-before-create;
- stale state blocks unsafe continuation with old revision.

## Cross-repo backend alignment

Backend repository: `sajadkhavas/turnoment-backend`

F06 documentation alignment:
- backend Issue `#15` — `CLOSED / COMPLETED`;
- docs branch `docs/f06-dispute-contract`;
- docs head `c38052f2c9aaa79ad269e5445610f5f2a28c6845`;
- PR `#16` — MERGED;
- PR Quality Gate `34409560819` — PASS on Python 3.12 and 3.14;
- review threads before merge: `0`;
- merge/current accepted backend main `38dccbf213d5f439e56cd608e3e4ac419d5092d1`;
- post-merge Quality Gate `34409893478` — PASS on Python 3.12 and 3.14;
- Python/domain/model/migration/phase-registry changes: `NONE`;
- backend NEXT remains `P02 — Games / Catalog Foundation`.

This alignment documents the permanent F06 contract only. It does not claim disputes runtime implementation is live.

## Superseded QA checkpoint

Earlier code head `cb89585727b0de46a17300ff005229073cd9d342` passed Quality Gate `34409285411`, but manual artifact review found native English file-picker text. That checkpoint is intentionally superseded by accepted code head `1a1bf97d...` and must not be used as final visual evidence.

## Remaining terminal gates

Implementation acceptance is not terminal completion. F06 may be called `DONE / MERGED / FROZEN — FINAL_PRIVATE` only after:
1. final governance/evidence exact-head frontend Quality Gate PASS;
2. implementation PR exact-head CI PASS, mergeable true and review threads `0`;
3. implementation merge with expected-head lock;
4. post-implementation `main` Quality Gate PASS on the exact merge SHA;
5. documentation-only closeout branch/PR;
6. closeout PR CI PASS, mergeable true and review threads `0`;
7. closeout merge with expected-head lock;
8. terminal post-closeout `main` Quality Gate PASS on the frozen main SHA;
9. terminal SHA/CI recorded in Issue #47 and Issue closed completed.
