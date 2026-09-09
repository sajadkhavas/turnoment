# F06 — Final Match Dispute

Status: `MERGED / CLOSEOUT IN PROGRESS`

START_SHA: `0407a925974d50b4a75af292231bacb48c66eb38`

Implementation branch: `phase/f06-dispute`

Final implementation/evidence head: `d4579c811f87e415747a44ae1c213ba71cf86030`

Implementation PR: `#48` — MERGED

Implementation merge/current main before closeout: `e5e39ea2db0dadae3a9acb75c64dcf8ecb6dba4d`

Closeout branch: `closeout/f06-dispute`

Tracking Issue: `#47` — open through terminal closeout

Route: `/matches/$id/dispute`

Indexability: `PRIVATE / NOINDEX`

Runtime integration: `FRONTEND MOCK / BACKEND PENDING`

## Repository / overlap lock

- frontend frozen main at START: `0407a925974d50b4a75af292231bacb48c66eb38`;
- F05 terminal Quality Gate `34407220433` — PASS;
- F05 Issue #44 — closed completed;
- route did not exist at START;
- backend contract baseline already reserved `/matches/{id}/dispute` under owner `disputes`;
- no overlapping F06 branch/open Issue/open PR existed before creation;
- implementation branch was created exactly from START_SHA.

## Source / design / security audit

Applied before implementation:
- project continuity + frontend page protocol + route registry;
- SEO protocol applicability: private/noindex route, public SERP research N/A;
- F04 My Matches and F05 Result Submission accepted contracts/evidence;
- backend frontend/backend contract baseline;
- current TanStack Router loader/mutation guidance;
- WCAG 2.2 input/error assistance;
- Battlefy/Challonge interaction patterns for separating match issue/dispute from score confirmation and attaching evidence;
- OWASP File Upload security boundary.

No third-party branding/layout/copy was copied.

## Permanent frontend contract

Boundary:

`validated matchId → private Session UX access policy → loader → typed MatchDisputeRepository → runtime validation → Mock/Django adapter → explicit create/evidence mutation state → UI`

Planned endpoints:
- `GET /api/v1/matches/{matchId}/dispute/`;
- `POST /api/v1/matches/{matchId}/dispute/`;
- `POST /api/v1/matches/{matchId}/dispute/{disputeId}/evidence/`.

Read states:
`eligible | open | under-review | resolved | unavailable`

Create outcomes:
`accepted | validation_error | stale | unavailable | already_open`

Evidence outcomes:
`accepted | validation_error | stale | unavailable | already_uploaded`

Web mutations use Django Session credentials, P01 CSRF bootstrap, `X-CSRFToken`, opaque backend revision and one `Idempotency-Key` per logical attempt.

Frontend never derives dispute eligibility, moderation decision, corrected score, winner, rating impact or Match lifecycle.

## Evidence upload boundary

Browser file checks are UX convenience only. Backend implementation owns:
- actual file type/signature allowlisting;
- size/count quotas;
- safe storage naming/location;
- malware/security handling where applicable;
- Match/dispute/user authorization;
- private evidence access.

No public evidence URL is invented. No dispute withdrawal/cancel transition is invented without backend ownership.

## Final UX / copy / accessibility

- H1 `اعتراض به Match`;
- title `اعتراض به Match — ایران مهر افزار`;
- `noindex,nofollow`;
- final natural product copy with no backend/API/mock/demo/waiting language;
- persistent reason/statement labels and textual associated errors;
- explicit review-before-create;
- stale state blocks old revision reuse;
- resolution displays authoritative server truth only;
- evidence picker localized to `انتخاب تصویر` and accessible.

## Corrective F04/F05 navigation reconciliation

Source audit found the pre-F06 frozen My Matches code lacked the previously documented Result Submission CTA. F06 permanently reconciles:
- My Matches `attention=submit-result` → `/matches/$id/result`;
- My Matches `attention=dispute` → `/matches/$id/dispute`;
- F05 `submissionState=disputed` → `/matches/$id/dispute`;
- Check-in unchanged;
- no `confirm-result` route invented.

The correction is covered by the same full regression suite.

## Frontend acceptance evidence

Accepted code/browser checkpoint:
`1a1bf97da61ce9f4845c7ed78262519f54e1a3f3`

- Quality Gate `34410106647` — PASS;
- artifact `10126954058`;
- digest `sha256:385120df87ea2ea15cae7eccfa978aba0a8f083f82b8101b6138cdc232118bcd`;
- 42 regression screenshots;
- F06 widths 375/390/430/768/1024/1440;
- representative manual review 375/768/1440 — PASS after picker localization.

Final implementation/evidence head:
`d4579c811f87e415747a44ae1c213ba71cf86030`

- exact-head push gate `34410842966` — PASS;
- PR #48 exact head `d4579c...`;
- PR-triggered gate `34411147988` — PASS;
- mergeable true;
- unresolved review threads 0;
- main verified exact START_SHA before merge;
- expected-head merge lock used;
- implementation merge/main `e5e39ea2db0dadae3a9acb75c64dcf8ecb6dba4d`;
- post-implementation main Quality Gate `34411457787` — PASS.

Detailed evidence: `docs/workstreams/F06_ACCEPTANCE_EVIDENCE.md`.
Closeout record: `docs/workstreams/F06_CLOSEOUT.md`.

## Cross-repo backend alignment

Backend F06 alignment is terminally complete as documentation-only:
- Issue #15 — CLOSED / COMPLETED;
- PR #16 — MERGED;
- docs head `c38052f2c9aaa79ad269e5445610f5f2a28c6845`;
- PR gate `34409560819` PASS Python 3.12/3.14;
- review threads 0;
- merge/current backend main `38dccbf213d5f439e56cd608e3e4ac419d5092d1`;
- post-merge gate `34409893478` PASS Python 3.12/3.14;
- no Python/domain/models/migrations/phase-registry change;
- backend NEXT remains `P02 — Games / Catalog Foundation`.

Runtime remains `FRONTEND MOCK / BACKEND PENDING` until the owning backend domain is implemented under backend phase law.

## Terminal closeout rule

The route implementation is merged and post-implementation main QA is green. The workstream is still not terminally DONE.

Closeout branch `closeout/f06-dispute` was created exactly from implementation merge `e5e39ea2db0dadae3a9acb75c64dcf8ecb6dba4d` and is documentation-only.

Remaining terminal gates:
1. verify closeout diff is docs-only;
2. open closeout PR without auto-closing Issue #47;
3. require exact-head closeout PR Quality Gate PASS, mergeable true and review threads 0;
4. verify main remains exact implementation merge;
5. merge with expected-head lock;
6. require terminal post-closeout main Quality Gate PASS on the frozen main SHA;
7. record frozen SHA/terminal CI in Issue #47 and close completed;
8. only then mark `DONE / MERGED / FROZEN — FINAL_PRIVATE`.
