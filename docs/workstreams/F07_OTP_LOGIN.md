# F07 — Final OTP Login

Status: `IN PROGRESS`

Route: `/login`

START_SHA: `64c760af73f6cb30b02e0ac9464ccbdeb18922e5`

Branch: `phase/f07-final-otp-login`

Tracking Issue: `#50`

Index policy: `PRIVATE / NOINDEX`

## 1. Concurrency / source lock

F06 terminal frozen frontend main was `e87798a0463677b4da68ee28b80b5e58a91a1883` with terminal gate `34412405721` PASS.

Lovable subsequently advanced `main` to `64c760af73f6cb30b02e0ac9464ccbdeb18922e5` for Challenge Hub planning. The `/login` blob remained byte-identical across those refs (`8cf2aadeb107d0b8e2072d967175c9606d6dbbf7`). F07 therefore starts from the newer live main so Lovable history is preserved, while its scope explicitly excludes Challenge files.

Current-main baseline gate `34447162094` PASS.

## 2. Defect being replaced

The inherited Login screen accepts email/mobile + password, exposes remember-me and forgot-password UI, and links to the separate legacy Register form. This contradicts accepted Turnoment P01 identity truth.

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

`/login → validated redirect search → SSR loader projection → typed LoginAuthRepository → runtime-validated Django/QA adapters → explicit OTP actions → UI`

Authentication/session truth remains backend-owned.

No bearer token is stored in localStorage/sessionStorage. Unsafe OTP calls bootstrap CSRF and send `X-CSRFToken` with `credentials: include`.

The QA adapter exists only for deterministic browser/test execution and begins unauthenticated; it implements the same public repository contract.

## 5. Redirect security

`redirect` is normalized before use. Only a same-origin internal path beginning with one `/` is accepted. External/protocol-relative paths, backslashes/control characters, oversized values and `/login` loops fail closed to `/dashboard`.

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

## 8. Regression gate target

The existing seven accepted browser surfaces remain covered. F07 adds `/login?redirect=%2Fdashboard%2Fmatches` at widths:

`375 / 390 / 430 / 768 / 1024 / 1440`

Target browser artifact count becomes `48` screenshots.

Gate additionally asserts:
- F07 SSR copy is present;
- `noindex,nofollow`;
- exactly one main landmark;
- legacy `رمز عبور` / `فراموشی رمز` copy is absent.

## 9. Scope exclusions

- no `/dashboard/challenges` or Challenge file mutation;
- no Challenge Detail route;
- no backend mutation;
- no `/register` rebuild in F07;
- no password/reset-password behavior;
- no auto-closing Issue #50 before terminal frozen-main CI.

## 10. Terminal chain

Implementation must still pass exact-head CI, PR CI/review/merge, post-implementation main CI, documentation-only closeout PR/merge and terminal post-closeout main CI before F07 can be marked `DONE / MERGED / FROZEN — FINAL_PRIVATE`.
