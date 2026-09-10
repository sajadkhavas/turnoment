# F08 — OTP Account Onboarding

Status: `IN PROGRESS`

Route: `/register`

START_SHA: `0932bef621cf22d3d7a7a95360613061e75d805f`

Branch: `phase/f08-otp-account-onboarding`

Tracking Issue: `#53`

Index policy: `PRIVATE / NOINDEX`

## 1. Source / concurrency lock

F07 is terminally frozen at `0932bef621cf22d3d7a7a95360613061e75d805f`, terminal Quality Gate `34453295788` PASS, Issue #50 CLOSED / COMPLETED.

F08 starts exactly from that frozen main. Challenge Hub remains a separate Lovable workstream and F08 MUST NOT modify Challenge product files.

The inherited `/register` route is `REBUILD`: name/email/mobile/password scaffolding contradicts the accepted P01 identity contract.

No overlapping `register` / F08 branch or Issue was found before creation. Existing F07 branches are frozen historical work only.

## 2. Backend P01 truth

`/login` and `/register` converge onto one phone-OTP flow. Backend P01 already owns:

- `GET /api/v1/auth/csrf/`
- `POST /api/v1/auth/otp/request/`
- `POST /api/v1/auth/otp/verify/`
- `GET /api/v1/auth/me/`
- `PATCH /api/v1/auth/me/profile/`
- `POST /api/v1/auth/logout/`

`verify_login_otp` creates the user and `PlayerProfile` automatically when the phone is first seen, then establishes Django Session through the verify view.

Therefore F08 MUST NOT invent a second registration API, password creation, email-required registration, or frontend-owned account creation truth.

## 3. Permanent frontend contract

`validated optional redirect → route loader/session preflight → typed LoginAuthRepository → runtime-validated P01 actions → registration-oriented OTP UI`

The same accepted `LoginAuthRepository` contract from F07 is reused so login and registration cannot drift at the network/security boundary.

## 4. Product behavior

- user enters an Iran mobile number;
- backend issues OTP with authoritative challenge/expiry/resend timing;
- user enters six-digit OTP;
- successful verify either signs into an existing account or creates the player account/profile when first seen;
- Django Session becomes authoritative;
- frontend redirects to a safe internal destination, default `/dashboard`;
- authenticated visitors are redirected away from `/register`;
- `/register` itself is never accepted as a return-to target, preventing self-loop redirects.

The registration surface may explain the unified behavior in final Persian copy, but MUST NOT expose API/backend/mock/demo engineering language.

## 5. Required UX states

- phone entry
- sending
- challenge issued
- OTP entry
- resend cooldown / resend
- invalid / expired / consumed OTP
- rate-limited request
- delivery unavailable
- inactive account
- validation errors
- ambiguous verify transport with authoritative session reconciliation
- authenticated redirect
- safe redirect fallback
- responsive/loading/accessibility states

## 6. Accessibility / security

- one `<main>` landmark;
- visible labels;
- `type=tel`, `inputMode=tel`, `autocomplete=tel`;
- OTP `autocomplete=one-time-code`;
- status/error live regions;
- no password inputs;
- no localStorage/sessionStorage bearer token;
- same-origin Django Session + CSRF only;
- frontend route guard remains UX only; backend session/account state remains authoritative.

## 7. Official guidance checked

- Django REST framework SessionAuthentication: authenticated AJAX uses Django session and unsafe methods require valid CSRF.
- TanStack Router authenticated route guidance: route access/redirect is a UX/navigation layer, not a server authorization boundary.
- W3C WCAG 2.2 Identify Input Purpose: common user-input purposes should be programmatically identifiable through appropriate semantics/autocomplete.

## 8. Scope exclusions

- no Challenge Hub/Detail modifications;
- no backend implementation or phase reorder;
- no `/dashboard/profile` recertification in F08;
- no password/reset-password path;
- no mandatory email/name fields invented;
- no claim that profile completion beyond automatic P01 profile creation is required unless backend later defines that truth.

## 9. Acceptance law

F08 cannot become `DONE / MERGED / FROZEN` until:

1. implementation exact-head Quality Gate PASS;
2. responsive browser artifact manually reviewed;
3. implementation PR CI PASS and review threads 0;
4. pre-merge main lock matches START_SHA;
5. expected-head implementation merge;
6. post-implementation main Quality Gate PASS;
7. documentation-only closeout branch from exact implementation merge;
8. closeout PR CI PASS and review threads 0;
9. expected-head closeout merge;
10. terminal frozen-main Quality Gate PASS;
11. terminal evidence recorded in Issue #53 and Issue CLOSED / COMPLETED.
