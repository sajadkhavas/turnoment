# F07 — Final OTP Login

Status: `MERGED / CLOSEOUT IN PROGRESS — TARGET FINAL_PRIVATE`

Route: `/login`

START_SHA: `64c760af73f6cb30b02e0ac9464ccbdeb18922e5`

Implementation branch: `phase/f07-final-otp-login`

Tracking Issue: `#50` — remains open through terminal frozen-main CI

Index policy: `PRIVATE / NOINDEX`

## 1. Concurrency / source lock

F06 terminal frozen main was `e87798a0463677b4da68ee28b80b5e58a91a1883`, terminal gate `34412405721` PASS, Issue #47 closed completed.

Lovable then advanced main to F07 START_SHA `64c760af73f6cb30b02e0ac9464ccbdeb18922e5` with Challenge planning history. Compare from F06 frozen main to F07 START_SHA showed only `.lovable/plan/challenge-hub-my-challenges-2026-09-10.md`; Login code remained unchanged. F07 therefore preserved the newer history while excluding Challenge product files from its implementation diff.

## 2. Final product truth

The inherited password-oriented Login was replaced by the accepted P01 phone-OTP identity flow.

Final UI does not expose password login, remember-me, forgot-password or password-reset behavior.

Phone step:
- Iran mobile normalization;
- Persian/Arabic digit convenience;
- LTR phone entry with `autocomplete=tel`;
- final Persian copy and explicit validation/error feedback.

OTP step:
- exactly six digits;
- `autocomplete=one-time-code`;
- authoritative expiry/resend timing;
- change-phone and bounded resend behavior;
- invalid/expired/consumed/inactive/rate-limited/delivery-unavailable/validation/transport states;
- mutation-safe disabled states and accessible status/alert messaging.

## 3. Permanent runtime boundary

`/login → validated optional redirect search → SSR loader projection → typed LoginAuthRepository → runtime-validated Django/QA adapters → explicit OTP actions → UI`

Backend accepted main:

`38dccbf213d5f439e56cd608e3e4ac419d5092d1`

Existing P01 runtime contract:
- `GET /api/v1/auth/csrf/`;
- `POST /api/v1/auth/otp/request/`;
- `POST /api/v1/auth/otp/verify/`;
- `GET /api/v1/auth/me/`;
- `POST /api/v1/auth/logout/`.

Authentication/session truth is backend-owned. Unsafe OTP calls use `credentials: include`, CSRF bootstrap and `X-CSRFToken`. No localStorage/sessionStorage bearer token is introduced.

The deterministic QA adapter is test/browser-QA only and implements the same repository contract as the Django adapter.

## 4. Redirect/session security

`redirect` is optional. It is sanitized before use and accepts only a safe same-origin internal path beginning with one `/`.

External/protocol-relative URLs, backslashes, ASCII control characters, oversized values and `/login` loops fail closed to `/dashboard`.

After authoritative authentication, full navigation proceeds with the established Django session cookie.

If verify transport is ambiguous, the client checks authoritative `/auth/me/`; an already-established server session is treated as success, otherwise the same challenge/code remains retryable.

## 5. Accepted implementation and QA

Accepted browser/code candidate:

`0f27c9e55bcc8f96664da4910e0d74a004156295`

- Quality Gate `34450606193` — PASS;
- artifact `10141454114`;
- digest `sha256:36550b87f438c41570757b73e79c83e31b9465bc8a9eabe9950bf0f6478cb4a7`;
- 48 regression screenshots;
- Login widths `375 / 390 / 430 / 768 / 1024 / 1440`;
- manual visual review `375 / 430 / 768 / 1024 / 1440` — PASS.

Final implementation/evidence head:

`5e37a7349c0f1408d9f55682d5aeca7f7318cbc8`

- exact-head push Quality Gate `34451450368` — PASS;
- implementation PR `#51` — MERGED;
- PR-triggered Quality Gate `34451772869` — PASS;
- PR exact base `64c760af73f6cb30b02e0ac9464ccbdeb18922e5`;
- PR exact head `5e37a7349c0f1408d9f55682d5aeca7f7318cbc8`;
- mergeable before merge: true;
- unresolved review threads before merge: 0;
- live main immediately before merge: exact START_SHA;
- implementation merge/main: `c522e9593c1628097ee20e2de8ba14f97c0a5334`;
- post-implementation main Quality Gate `34452092176` — PASS, all steps.

Full pre-merge acceptance record:

`docs/workstreams/F07_ACCEPTANCE_EVIDENCE.md`.

## 6. Diagnostic fixes retained

1. Redirect control-character validation was implemented without disabling ESLint security rules.
2. `redirect` remains optional at the TanStack type level so existing links to `/login` remain valid; loader-side sanitization remains mandatory.
3. Browser assertions detect actual legacy password affordances rather than rejecting correct explanatory copy.

## 7. Scope integrity

F07 implementation compare from START_SHA to final implementation head was ahead-only and changed only Login/Auth/QA/evidence files. No Challenge Hub/Detail product file was changed.

F07 does not rebuild `/register`. That route remains `REBUILD` until a separate accepted workstream.

No backend application change was needed because P01 already owns the required auth runtime. Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 8. Governance reconciliation

Issue #47 is the terminal authority for F06. This closeout corrects pre-existing stale continuity/registry wording that still described F06 as closeout-in-progress despite its completed terminal chain.

The F06 correction is documentation-only and does not alter F06 runtime behavior.

## 9. Closeout mutation lock

Closeout branch:

`closeout/f07-final-otp-login`

Created exactly from F07 implementation merge:

`c522e9593c1628097ee20e2de8ba14f97c0a5334`

Allowed closeout changes are documentation/governance only:
- `PROJECT_CONTINUITY.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- `docs/workstreams/F07_OTP_LOGIN.md`;
- `docs/workstreams/F07_CLOSEOUT.md`.

No source code, workflow, package, dependency, adapter, fixture, contract or runtime behavior may change in closeout.

## 10. Non-recursive terminal rule

This closeout cannot contain its own future merge SHA or future terminal main CI. Therefore the route is represented as `FINAL_PRIVATE` after merged implementation + green post-main QA, while the F07 workstream remains `MERGED / CLOSEOUT IN PROGRESS` until Issue #50 records the final closeout merge/frozen main SHA and terminal green main gate.

## 11. Remaining terminal gate

1. verify closeout diff is documentation-only;
2. open closeout PR without auto-close syntax;
3. require closeout PR exact-head full Frontend Quality Gate PASS;
4. require mergeable true and unresolved review threads 0;
5. verify main remains exact implementation merge `c522e9593c1628097ee20e2de8ba14f97c0a5334` before merge;
6. merge with expected-head lock;
7. require terminal post-closeout main Quality Gate PASS;
8. verify live main exact frozen SHA;
9. record frozen SHA, terminal CI and artifact evidence in Issue #50;
10. close Issue #50 completed as `DONE / MERGED / FROZEN — FINAL_PRIVATE`.
