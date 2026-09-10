# F08 — OTP Account Onboarding Acceptance Evidence

Route: `/register`

Tracking Issue: `#53`

START_SHA: `0932bef621cf22d3d7a7a95360613061e75d805f`

Implementation branch: `phase/f08-otp-account-onboarding`

## 1. Accepted browser candidate

Candidate head:

`96b05b7bd1e096765a475ef99d639d990d51e881`

Frontend Quality Gate:

`34455519949` — `PASS`

All gate steps passed:

- frozen dependency install;
- lint;
- production build and route generation;
- TypeScript typecheck;
- complete frontend contract suite including F08;
- browser smoke and responsive screenshots;
- browser evidence upload.

Browser artifact:

- id: `10143394620`
- name: `browser-qa-96b05b7bd1e096765a475ef99d639d990d51e881`
- digest: `sha256:8631bfd9c69135fbd76fec75eefc1410d1c5f1ff8255bf38b0d8460229391515`
- regression screenshot count: `54`

F08 responsive screenshots exist at:

- `375`
- `390`
- `430`
- `768`
- `1024`
- `1440`

Representative manual visual review completed for `375 / 430 / 768 / 1024 / 1440`.

Manual review result: `PASS`.

No horizontal overflow, clipped CTA, card collision, broken header/form hierarchy, or unreadable responsive state was observed. Mobile correctly stacks the registration card and product-context panel; desktop presents a balanced two-column layout.

## 2. SSR / route acceptance

Browser smoke confirms:

- `/register` renders final Persian account-onboarding copy;
- exactly one `<main>` landmark is present;
- `robots=noindex,nofollow` is present;
- legacy password input is absent;
- legacy email input is absent;
- route builds under the generated TanStack Router graph.

The route uses optional validated `redirect` search state and a loader-owned sanitized return destination. External, protocol-relative, Login-loop and Register-loop destinations fail closed to `/dashboard`.

## 3. P01 contract acceptance

F08 intentionally reuses the accepted F07 `LoginAuthRepository` instead of creating a parallel network contract.

The UI therefore maps to the already implemented P01 backend identity flow:

- CSRF bootstrap;
- OTP request;
- OTP verify;
- current-session projection;
- Django Session credentials.

The backend remains authoritative for phone identity, account creation/existence, active state, OTP expiry/cooldown/attempt truth and authenticated session state.

A first-seen verified phone causes the accepted P01 backend to create the User and PlayerProfile; an existing phone authenticates the existing account. F08 does not infer which case applies before verification and does not create an alternate registration command.

## 4. Security / failure-state evidence

Accepted implementation contains:

- Iran mobile normalization shared with F07;
- six-digit OTP normalization;
- backend-provided challenge id / expiry / resend timing;
- request rate-limit handling;
- delivery-unavailable handling;
- invalid / expired / consumed / inactive / validation states;
- ambiguous verification transport reconciliation through authoritative `getSession()`;
- no password account behavior;
- no bearer auth in localStorage/sessionStorage;
- same P01 CSRF + `credentials: include` network boundary as F07.

## 5. Accessibility / final-copy evidence

The accepted page has:

- final Persian copy with no engineering/mock/backend/API/demo/waiting language;
- visible mobile label;
- `type=tel`, `inputMode=tel`, `autocomplete=tel`;
- OTP `autocomplete=one-time-code`;
- explicit accessible OTP labelling/descriptions;
- live status/error feedback;
- disabled pending states;
- responsive keyboard/touch-friendly controls;
- one semantic main landmark.

## 6. Official guidance applied

Current official guidance was checked before implementation:

- Django REST framework `SessionAuthentication`: session-authenticated web requests use Django session semantics, and unsafe methods require valid CSRF;
- TanStack Router authenticated-routes/data-loading guidance: route navigation/access handling is a frontend UX boundary and does not replace backend authorization;
- W3C WCAG 2.2 `Identify Input Purpose`: known user-input purposes should expose appropriate programmatic semantics/autocomplete.

## 7. Scope integrity

Compare from F08 START_SHA to accepted browser candidate is ahead-only. Final tree changes are limited to F08 registration UI/route, F08 contract tests, quality-gate coverage, test registration and F08 workstream evidence.

Challenge Hub/Detail product files are not modified.

Backend repository/runtime is not modified and backend phase order remains unchanged; backend NEXT remains `P02 — Games / Catalog Foundation`.

## 8. Non-terminal status

This browser candidate is visually and technically accepted, but F08 is NOT terminally complete yet.

The next required evidence is an exact-head Quality Gate on the final implementation/evidence head created by this acceptance document, followed by implementation PR/merge, post-main gate, documentation-only closeout and terminal frozen-main gate.
