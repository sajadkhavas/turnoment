# F07 — Final OTP Login

Status: `READY TO MERGE / TERMINAL CLOSEOUT PENDING`

Route: `/login`

START_SHA: `64c760af73f6cb30b02e0ac9464ccbdeb18922e5`

Branch: `phase/f07-final-otp-login`

Tracking Issue: `#50`

Index policy: `PRIVATE / NOINDEX`

## 1. Concurrency / source lock

F06 terminal frozen frontend main was `e87798a0463677b4da68ee28b80b5e58a91a1883` with terminal gate `34412405721` PASS.

Lovable subsequently advanced `main` to `64c760af73f6cb30b02e0ac9464ccbdeb18922e5` for Challenge Hub planning. The `/login` blob remained byte-identical across those refs (`8cf2aadeb107d0b8e2072d967175c9606d6dbbf7`). F07 therefore starts from the newer live main so Lovable history is preserved, while its scope explicitly excludes Challenge files.

Current-main baseline gate `34447162094` PASS.

Issue #47 is the terminal authority for F06 and records `DONE / MERGED / FROZEN — FINAL_PRIVATE`, frozen main `e87798a0463677b4da68ee28b80b5e58a91a1883`, and terminal gate `34412405721` PASS. Existing stale F06 wording in continuity/registry is a governance-document inconsistency and is intentionally repaired only in the documentation-only F07 closeout.

## 2. Defect replaced

The inherited Login screen accepted email/mobile + password, exposed remember-me and forgot-password UI, and linked to the separate legacy Register form. This contradicted accepted Turnoment P01 identity truth.

F07 removes password semantics entirely and converges Login onto the existing phone-OTP + Django Session flow.

## 3. Accepted backend owner / live contract

Backend accepted main: `38dccbf213d5f439e56cd608e3e4ac419d5092d1`.

P01 already implements:
- `GET /api/v1/auth/csrf/`;
- `POST /api/v1/auth/otp/request/`;
- `POST /api/v1/auth/otp/verify/`;
- `GET /api/v1/auth/me/`;
- `POST /api/v1/auth/logout/`.

Request success returns authoritative `challenge_id`, `expires_in`, and `resend_after`. Verify accepts UUID challenge ID + exactly six digits, consumes/validates the OTP and establishes the Django session. A first successful login creates the User/PlayerProfile when absent.

Authoritative request errors include rate limiting and delivery unavailable. Authoritative verify errors include invalid, expired, consumed and inactive-account states.

## 4. Permanent frontend boundary

`/login → validated optional redirect search → SSR loader projection → typed LoginAuthRepository → runtime-validated Django/QA adapters → explicit OTP actions → UI`

Authentication/session truth remains backend-owned.

No bearer token is stored in localStorage/sessionStorage. Unsafe OTP calls bootstrap CSRF and send `X-CSRFToken` with `credentials: include`.

The QA adapter exists only for deterministic browser/test execution and begins unauthenticated; it implements the same public repository contract.

## 5. Redirect security

`redirect` is optional and normalized before use. Only a same-origin internal path beginning with one `/` is accepted. External/protocol-relative paths, backslashes/control characters, oversized values and `/login` loops fail closed to `/dashboard`.

After an authoritative authenticated response, a full navigation is used so the browser proceeds with the established session cookie.

On an ambiguous verify transport failure, the client checks `/auth/me/`; if the server already established the session, login succeeds instead of falsely reporting failure. Otherwise the same challenge/code remains retryable.

## 6. Final UI/state model

Phone step:
- Iran mobile only;
- Persian/Arabic digit convenience normalization;
- `autocomplete=tel` and LTR phone input;
- final Persian copy;
- no password, remember-me or forgot-password affordance.

OTP step:
- six-digit accessible OTP control;
- `autocomplete=one-time-code`;
- authoritative expiry and resend timing rendered as countdowns;
- change-phone action;
- resend action after server timing permits;
- invalid/expired/consumed/inactive/rate-limited/delivery-unavailable/validation/transport states;
- buttons disabled during active mutation;
- final status/alert feedback.

The page remains `noindex,nofollow` and has exactly one `<main>`.

## 7. External guidance applied

- Django REST Framework SessionAuthentication / CSRF guidance for same-session unsafe requests;
- TanStack Router validated search and auth redirect patterns;
- WCAG input-purpose/autocomplete and labelled/error-state requirements.

Public SERP research is not applicable to this private noindex authentication surface.

## 8. Accepted QA evidence

Accepted code/browser candidate:

`0f27c9e55bcc8f96664da4910e0d74a004156295`

Frontend Quality Gate:

`34450606193` — PASS.

Browser artifact:
- ID `10141454114`;
- digest `sha256:36550b87f438c41570757b73e79c83e31b9465bc8a9eabe9950bf0f6478cb4a7`;
- 48 regression screenshots.

F07 widths:

`375 / 390 / 430 / 768 / 1024 / 1440`

Manual visual review:

`375 / 430 / 768 / 1024 / 1440` — PASS.

No horizontal overflow, clipped primary CTA, card/header collision, broken RTL hierarchy, or legacy password form affordance was observed.

Full implementation acceptance record:

`docs/workstreams/F07_ACCEPTANCE_EVIDENCE.md`.

## 9. Diagnostic fixes retained

- redirect control-character validation was rewritten without disabling ESLint security rules;
- `redirect` remains optional at TanStack type level while loader sanitization remains mandatory;
- legacy-password browser assertion targets real legacy form affordances rather than valid explanatory copy.

## 10. Scope exclusions

- no `/dashboard/challenges` or Challenge product file mutation;
- no Challenge Detail route;
- no backend mutation;
- no `/register` rebuild in F07;
- no password/reset-password behavior;
- no auto-closing Issue #50 before terminal frozen-main CI.

## 11. Remaining terminal chain

The current implementation/evidence branch head must first receive an exact-head Quality Gate PASS. Then:
1. implementation PR without auto-close syntax;
2. PR exact-head CI + mergeability + unresolved review threads `0`;
3. verify `main` still equals START_SHA before merge;
4. expected-head implementation merge;
5. post-implementation main Quality Gate PASS;
6. documentation-only closeout branch from implementation merge;
7. route registry/continuity/F07 closeout reconciliation, including correction of stale F06 terminal wording from authoritative Issue #47;
8. closeout PR CI/review/merge;
9. terminal frozen-main Quality Gate PASS;
10. terminal evidence recorded in Issue #50 and Issue closed completed.

Only after step 10 may F07 be called `DONE / MERGED / FROZEN — FINAL_PRIVATE`.
