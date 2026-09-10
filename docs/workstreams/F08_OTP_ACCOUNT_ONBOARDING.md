# F08 — OTP Account Onboarding

Status: `MERGED / CLOSEOUT IN PROGRESS — TARGET FINAL_PRIVATE`

Route: `/register`

START_SHA: `0932bef621cf22d3d7a7a95360613061e75d805f`

Implementation branch: `phase/f08-otp-account-onboarding`

Tracking Issue: `#53`

Index policy: `PRIVATE / NOINDEX`

## 1. Source / concurrency lock

F07 was terminally frozen at `0932bef621cf22d3d7a7a95360613061e75d805f`, terminal Quality Gate `34453295788` PASS, Issue #50 CLOSED / COMPLETED.

F08 started exactly from that frozen main. Challenge Hub remained a separate Lovable workstream and F08 did not modify Challenge product files.

The inherited `/register` route was a known `REBUILD`: name/email/mobile/password scaffolding contradicted the accepted P01 identity contract.

No overlapping `register` / F08 branch or Issue existed before F08 creation.

## 2. Accepted backend P01 truth

`/login` and `/register` converge on one phone-OTP identity flow. Backend P01 owns:

- `GET /api/v1/auth/csrf/`
- `POST /api/v1/auth/otp/request/`
- `POST /api/v1/auth/otp/verify/`
- `GET /api/v1/auth/me/`
- `PATCH /api/v1/auth/me/profile/`
- `POST /api/v1/auth/logout/`

The backend creates User + PlayerProfile when a verified phone is first seen and establishes Django Session. Existing verified phones authenticate the existing account.

F08 therefore does not invent a second registration API, frontend-owned account creation, password creation or required-email registration.

## 3. Permanent frontend contract

`validated optional redirect → route loader/session preflight → typed LoginAuthRepository → runtime-validated P01 actions → registration-oriented OTP UI`

F08 reuses the accepted F07 `LoginAuthRepository` and Django HTTP adapter so Login and Account Onboarding share one permanent CSRF/session/network boundary.

## 4. Accepted product behavior

- Iran mobile number entry only;
- six-digit OTP entry;
- backend-authoritative OTP challenge/expiry/resend timing;
- successful verify creates/signs into the first-seen account or signs into the existing account;
- Django Session becomes authoritative;
- authenticated visitors leave `/register` for a safe internal destination;
- default success destination is `/dashboard`;
- `/login` and `/register` self-loop return targets are rejected;
- unsafe/external/protocol-relative/ambiguous redirects fail closed;
- ambiguous verify transport failure is reconciled through authoritative current-session lookup;
- final Persian product copy contains no backend/API/mock/demo/waiting language.

## 5. Accepted security / accessibility invariants

- private `noindex,nofollow`;
- exactly one `<main>` landmark;
- visible mobile label;
- `type=tel`, `inputMode=tel`, `autocomplete=tel`;
- OTP `autocomplete=one-time-code`;
- status/error live regions;
- disabled pending states;
- no password inputs;
- no required email/name inputs;
- no localStorage/sessionStorage bearer token;
- same-origin Django Session + CSRF only;
- frontend route/session preflight is UX/navigation logic, not backend authorization.

## 6. Implementation acceptance evidence

Accepted browser/code candidate:

`96b05b7bd1e096765a475ef99d639d990d51e881`

- candidate Quality Gate `34455519949` — PASS;
- artifact `10143394620`;
- digest `sha256:8631bfd9c69135fbd76fec75eefc1410d1c5f1ff8255bf38b0d8460229391515`;
- 54 regression screenshots;
- F08 widths `375 / 390 / 430 / 768 / 1024 / 1440`;
- manual visual review `375 / 430 / 768 / 1024 / 1440` — PASS.

Final implementation/evidence head:

`78345a2e0ed84c75f48ea11d4fa2d1c489a89910`

- exact-head Quality Gate `34456032039` — PASS;
- exact-head artifact `10143599063`;
- artifact digest `sha256:89cc0a426abd3308eb6604a05bdae33c132c4dbd6df6762eb3b2dd423786a7e7`;
- implementation PR `#54` — MERGED;
- PR-triggered Quality Gate `34456378067` — PASS;
- unresolved review threads before merge: `0`;
- mergeable before merge: `true`;
- pre-merge `main` verified exact START_SHA;
- implementation merge used expected-head SHA lock;
- implementation merge/main: `f90e5c9796e256f35a9a4f3d4fe9faf822657df7`;
- post-implementation main Quality Gate `34456698222` — PASS;
- post-main artifact `10143873243`;
- post-main digest `sha256:557fee16eb234eb25907b57eae8567b62408627d36d94587d9f3ea39782d453d`.

Detailed visual/technical acceptance remains in `docs/workstreams/F08_ACCEPTANCE_EVIDENCE.md`.

## 7. Scope integrity

Final implementation compare from START_SHA is ahead-only and limited to F08 route/UI, registration contract tests, QA gate coverage and F08 evidence. Challenge Hub/Detail product files were not modified.

Backend repository/runtime was not modified and backend phase order remains unchanged.

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 8. Closeout state

Implementation is accepted and merged; post-implementation main QA is green. Therefore `/register` may be represented as `FINAL_PRIVATE` in route governance.

The F08 workstream itself remains `MERGED / CLOSEOUT IN PROGRESS` until the documentation-only closeout PR is merged, terminal frozen-main Quality Gate is green, terminal artifact/digest are recorded in Issue #53, live `main` is re-verified and Issue #53 is closed completed.

Closeout record: `docs/workstreams/F08_CLOSEOUT.md`.
