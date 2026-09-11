# F10 — Player Notifications Acceptance Evidence

Route: `/dashboard/notifications`

Tracking Issue: `#59`

START_SHA: `34d6a576691532e4228b2eecc0fea1c1d296d58e`

Implementation branch: `phase/f10-player-notifications`

Runtime status: `FRONTEND MOCK / BACKEND PENDING`

## 1. Accepted browser candidate

Accepted candidate head:

`77d89d7143d315b1f8db92ab10dc32085d0ac963`

Frontend Quality Gate:

`34471158110` — `PASS`

All gate steps passed:
- frozen dependency install;
- lint;
- production build and route generation;
- TypeScript typecheck;
- complete contract suite including F10;
- browser smoke and responsive screenshots;
- browser evidence upload.

Browser artifact:
- id: `10149666864`;
- name: `browser-qa-77d89d7143d315b1f8db92ab10dc32085d0ac963`;
- digest: `sha256:b36b923ada03c4f346de8b87794e644e2fdd202ec620b3fb9a2ffcd88b605950`;
- total regression screenshots: `66`.

F10 screenshots exist at:

`375 / 390 / 430 / 768 / 1024 / 1440`

Representative manual visual review completed on the exact accepted artifact for:

`375 / 430 / 768 / 1024 / 1440`

Manual review result: `PASS`.

Observed acceptance results:
- no horizontal overflow;
- no clipped primary controls or unread markers;
- no notification-card collision;
- mobile and tablet action rows remain usable and wrap safely;
- desktop dashboard sidebar/content composition remains balanced;
- Persian copy remains readable at all representative widths;
- filter controls, summary cards and pagination retain clear hierarchy;
- unread/read state is communicated by text and semantics, not color alone.

A visual-review finding changed the unread action microcopy from the status-like `خوانده شد` to the explicit action `این را خوانده‌ام`. The accepted candidate and artifact include that correction.

## 2. Cross-repo backend contract acceptance

Backend documentation-only F10 alignment is terminally complete:
- backend Issue `#17` — CLOSED / COMPLETED;
- backend START_SHA `38dccbf213d5f439e56cd608e3e4ac419d5092d1`;
- docs branch `docs/f10-player-notifications-contract`;
- docs head `6e452ea74ec91d4c402f282a173384ce27744fde`;
- backend PR `#18` — MERGED;
- PR Quality Gate `34468881823` — PASS on Python 3.12 and 3.14;
- merge / accepted backend main `e1d8d86f9b44a2874afc29f4ef9de13aeb34d9f7`;
- post-main Quality Gate `34469522243` — PASS on Python 3.12 and 3.14;
- backend live main re-verified exact accepted SHA.

The alignment defines planned endpoints only:
- `GET /api/v1/me/notifications/`;
- `POST /api/v1/me/notifications/{notificationId}/read/`;
- `POST /api/v1/me/notifications/read-all/`.

It contains no Python implementation, model, migration or URL registration. Backend NEXT remains `P02 — Games / Catalog Foundation`.

Therefore the runtime truth remains deliberately:

`FRONTEND MOCK / BACKEND PENDING`

## 3. Permanent frontend architecture evidence

Accepted boundary:

`private dashboard access policy → validated search → loader → typed PlayerNotificationsRepository → runtime-validated projection → UI`

Production mapping and QA fixture implement the same repository interface.

Validated search state:
- `state=unread|read`; absence = all;
- `kind=tournament|match|challenge|account|system`; absence = all;
- `page=<positive integer>`; page 1 is canonicalized by omission.

The route loader treats unauthenticated projection as a redirect to OTP Login with safe internal return-to `/dashboard/notifications`.

## 4. Runtime-validation / navigation security evidence

Runtime schemas reject:
- arbitrary fields on typed navigation targets;
- arbitrary `href` values;
- unsupported target kinds such as an unaccepted Challenge Detail target;
- malformed notification IDs;
- invalid offset-aware timestamps;
- unread counts greater than total counts;
- filtered totals greater than account totals;
- returned item counts greater than filtered totals;
- invalid pagination relationships;
- duplicate notification IDs on a page.

Supported typed targets are restricted to already accepted routes:
- My Tournaments;
- My Matches;
- Tournament Detail;
- Result Submission;
- Match Dispute;
- Player Profile.

Challenge notifications can be displayed, but F10 intentionally does not invent a Challenge Detail URL.

## 5. Read-state action evidence

Repository contract exposes explicit:
- `markRead(notificationId)`;
- `markAllRead()`.

Contract tests verify:
- initial repository summary truth;
- state + kind filtering;
- mark-one saved receipt;
- repeated mark-one idempotency;
- unavailable notification outcome;
- mark-all saved receipt;
- repeated mark-all idempotency;
- authoritative unread/affected counts.

Frontend does not optimistically calculate read-state truth. After a successful authoritative receipt it invalidates the route and reloads through the repository.

Django adapter mapping:
- `credentials: include`;
- P01 CSRF bootstrap before unsafe POSTs;
- `X-CSRFToken` on read-state commands;
- 401/403 mapped to explicit session-expired behavior;
- 404 mark-one mapped to unavailable;
- success payloads runtime-validated;
- no localStorage/sessionStorage bearer auth.

## 6. Product / copy evidence

The inherited placeholder was fully replaced. Final page includes:
- final Persian heading/support copy;
- total/unread summary;
- all/unread/read filters;
- domain-kind filtering;
- typed notification list;
- explicit unread/read labels;
- occurrence times;
- safe context CTA when an accepted target exists;
- mark-one and mark-all acknowledgement actions;
- filtered and unfiltered empty states;
- pagination;
- pending, error, mutation-success/error and session-expired handling.

Forbidden inherited engineering copy such as `به‌زودی فعال می‌شود` and `پس از اتصال سرویس` is absent and enforced by browser smoke.

## 7. Accessibility / private-route evidence

- route metadata includes `noindex,nofollow`;
- DashboardShell remains the single page `<main>` owner;
- browser gate asserts exactly one `<main>`;
- notifications use a semantic list;
- timestamps use `<time>`;
- filters are real buttons and select controls;
- state filter buttons expose `aria-pressed`;
- mutation feedback uses status semantics;
- pending/error states are explicit;
- keyboard focus styles remain visible;
- touch controls remain usable at mobile widths;
- read/unread is never represented by color alone.

## 8. Scope integrity

F10 does not modify Challenge Hub/Detail product files. The Lovable Challenge workstream remains isolated.

The only backend changes were the separate documentation-only alignment already terminally accepted under backend Issue #17. No backend phase reorder occurred.

During implementation a transient package-edit commit accidentally changed one unrelated dev-dependency version. Exact-baseline integrity checking caught it before acceptance and restored the original version. The final implementation branch is rewritten cleanly from START_SHA before PR so that transient drift does not remain in the reviewed history. Final `package.json` delta is only the F10 contract-test command addition.

## 9. Non-terminal implementation status

This accepted candidate is technically and visually green, but F10 is not yet `DONE / MERGED / FROZEN`.

Required remaining chain:
1. commit acceptance/governance evidence into a clean exact-head implementation commit from START_SHA;
2. full exact-head Quality Gate PASS;
3. implementation PR CI PASS, mergeable true and review threads zero;
4. verify pre-merge main exact START_SHA;
5. expected-head implementation merge;
6. post-main full Quality Gate PASS;
7. documentation-only closeout;
8. closeout PR/merge;
9. terminal frozen-main Quality Gate + artifact;
10. exact live-main re-verification;
11. Issue #59 terminal evidence and completed closure.
