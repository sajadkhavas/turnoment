# F07 — OTP Login Acceptance Evidence

Status: `IMPLEMENTATION ACCEPTED / CLOSEOUT PENDING`

Route: `/login`

START_SHA: `64c760af73f6cb30b02e0ac9464ccbdeb18922e5`

Tracking Issue: `#50`

## Accepted implementation/browser candidate

Accepted code/browser head:

`0f27c9e55bcc8f96664da4910e0d74a004156295`

Frontend Quality Gate:

`34450606193` — **PASS**

The accepted run completed all required steps:
- frozen dependency install;
- lint;
- production build and route generation;
- TypeScript typecheck;
- all frontend runtime/contract checks including F07;
- browser smoke and responsive screenshots;
- browser artifact upload.

## Browser artifact

- artifact ID: `10141454114`;
- artifact name: `browser-qa-0f27c9e55bcc8f96664da4910e0d74a004156295`;
- digest: `sha256:36550b87f438c41570757b73e79c83e31b9465bc8a9eabe9950bf0f6478cb4a7`;
- total screenshots: `48` = 8 accepted QA routes × 6 widths.

F07 `/login?redirect=%2Fdashboard%2Fmatches` widths:

`375 / 390 / 430 / 768 / 1024 / 1440`

## Manual visual review

Login screenshots manually reviewed at:

`375 / 430 / 768 / 1024 / 1440`

Result: **PASS**.

No observed:
- horizontal overflow;
- clipped primary CTA;
- card/header collision;
- broken RTL hierarchy;
- unreadable phone-field/help copy;
- desktop over-expansion or mobile card breakage;
- legacy password form affordance.

The accepted first-step UI remains a focused single-column phone OTP entry surface across mobile/tablet/desktop.

## Runtime/contract acceptance

The final frontend boundary is:

`/login → validated optional redirect search → SSR loader projection → typed LoginAuthRepository → runtime-validated QA/Django adapter → OTP state UI`

Accepted security/runtime rules:
- phone OTP only; no password login/reset/remember-me;
- canonical Iran mobile normalization with Persian/Arabic digit convenience;
- Django Session is authoritative session truth;
- unsafe OTP calls use `credentials: include`, P01 CSRF bootstrap and `X-CSRFToken`;
- no bearer auth in localStorage/sessionStorage;
- request/verify responses are runtime validated;
- successful first login may create User/PlayerProfile through existing backend P01 behavior;
- invalid/expired/consumed/inactive/rate-limited/delivery-unavailable/validation/transport states are explicit;
- verify transport ambiguity checks authoritative `/auth/me/` before reporting failure;
- safe internal return-to only; external/protocol-relative/backslash/control-character/oversized/login-loop redirects fail closed to `/dashboard`;
- `redirect` search remains optional so existing project links to `/login` do not require artificial search objects;
- page is private `noindex,nofollow` and owns exactly one `<main>`.

## Regression findings corrected before acceptance

Three diagnostic failures were fixed without weakening gates:

1. ESLint `no-control-regex` rejected the redirect control-character regex. Validation was rewritten using character-code checks; the security rule remained intact.
2. Initial `validateSearch` output made `redirect` required at the TanStack type level, breaking existing links/redirects to `/login`. The search field was made optional and loader-side sanitization retained.
3. Browser gate initially treated natural explanatory copy containing `رمز عبور` as a legacy password form. The assertion was narrowed to actual legacy affordances (`type=password`, forgot-password and remember-me copy) while final product copy remained unchanged.

## Scope integrity

F07 did not intentionally modify Challenge Hub/Detail product files. The workstream was started from the live post-Lovable main so Challenge planning history is preserved.

Backend application code was not changed. Accepted backend P01 main remains:

`38dccbf213d5f439e56cd608e3e4ac419d5092d1`

Backend NEXT remains independently:

`P02 — Games / Catalog Foundation`.

## Remaining terminal chain

This acceptance evidence does **not** mark F07 terminally done.

Required next:
1. final implementation/evidence branch head gets exact-head Quality Gate PASS;
2. implementation PR opens without auto-closing Issue #50;
3. PR exact-head Quality Gate PASS + mergeable + zero unresolved review threads;
4. verify live main has not drifted from F07 START_SHA before merge;
5. merge implementation with expected-head lock;
6. post-implementation main Quality Gate PASS;
7. create documentation-only closeout branch from implementation merge;
8. reconcile F07 route registry/continuity and the pre-existing stale F06 terminal wording using Issue #47 as authority;
9. closeout PR exact-head CI/review/merge;
10. terminal post-closeout main Quality Gate PASS;
11. record frozen main SHA and terminal evidence in Issue #50, then close completed.
