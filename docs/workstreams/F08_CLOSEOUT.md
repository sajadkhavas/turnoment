# F08 — OTP Account Onboarding Closeout

Status: `CLOSEOUT IN PROGRESS / TARGET FINAL_PRIVATE`

Route: `/register`

START_SHA: `0932bef621cf22d3d7a7a95360613061e75d805f`

Implementation branch: `phase/f08-otp-account-onboarding`

Final implementation/evidence head: `78345a2e0ed84c75f48ea11d4fa2d1c489a89910`

Implementation PR: `#54` — MERGED

Implementation merge / closeout base: `f90e5c9796e256f35a9a4f3d4fe9faf822657df7`

Closeout branch: `closeout/f08-otp-account-onboarding`

Tracking Issue: `#53` — MUST remain open until terminal frozen-main CI is green and terminal evidence is recorded.

## 1. Implementation acceptance

Accepted browser/code candidate:

`96b05b7bd1e096765a475ef99d639d990d51e881`

- candidate Quality Gate `34455519949` — PASS;
- candidate browser artifact `10143394620`;
- candidate digest `sha256:8631bfd9c69135fbd76fec75eefc1410d1c5f1ff8255bf38b0d8460229391515`;
- 54 regression screenshots;
- F08 widths `375 / 390 / 430 / 768 / 1024 / 1440`;
- manual review `375 / 430 / 768 / 1024 / 1440` — PASS.

Final implementation/evidence head:

`78345a2e0ed84c75f48ea11d4fa2d1c489a89910`

- exact-head push Quality Gate `34456032039` — PASS;
- exact-head artifact `10143599063`;
- exact-head artifact digest `sha256:89cc0a426abd3308eb6604a05bdae33c132c4dbd6df6762eb3b2dd423786a7e7`;
- implementation PR `#54` exact head `78345a2e0ed84c75f48ea11d4fa2d1c489a89910`;
- PR Quality Gate `34456378067` — PASS;
- mergeable immediately before merge: `true`;
- unresolved review threads immediately before merge: `0`;
- pre-merge `main` verified exact START_SHA;
- merge used expected-head SHA lock;
- implementation merge/main `f90e5c9796e256f35a9a4f3d4fe9faf822657df7`;
- post-implementation main Quality Gate `34456698222` — PASS;
- post-main artifact `10143873243`;
- post-main artifact digest `sha256:557fee16eb234eb25907b57eae8567b62408627d36d94587d9f3ea39782d453d`.

## 2. Final route truth being frozen

`/register` is a private `noindex,nofollow` OTP account-onboarding surface built on the same accepted P01 identity/session contract as F07 Login.

Permanent behavior:
- Iran mobile number entry only;
- six-digit OTP verification;
- first-seen verified phone is created by the backend P01 account flow and receives a Django Session;
- an already-existing phone authenticates the existing account;
- frontend never guesses whether the account already exists before backend verification;
- no separate player registration endpoint is invented;
- no password, password confirmation, reset-password, remember-me or required-email registration flow;
- no localStorage/sessionStorage bearer-token auth;
- safe optional same-origin return destination with unsafe/self-loop redirects failing closed to `/dashboard`;
- authoritative challenge id, expiry, resend timing, rate-limit, active-account and authenticated-session truth;
- ambiguous OTP verify transport failure is reconciled through authoritative current-session lookup;
- final Persian product copy, accessible input semantics, responsive behavior and exactly one `<main>` landmark.

## 3. Runtime truth

F08 reuses the accepted `LoginAuthRepository` and production Django adapter from F07. Production mapping remains the already accepted backend P01 flow:

- `GET /api/v1/auth/csrf/`;
- `POST /api/v1/auth/otp/request/`;
- `POST /api/v1/auth/otp/verify/`;
- `GET /api/v1/auth/me/`;
- `PATCH /api/v1/auth/me/profile/`;
- `POST /api/v1/auth/logout/`.

Backend identity/session authority remains Django Session + CSRF + OTP. F08 introduces no backend phase, model, migration or endpoint.

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 4. Concurrency integrity

F08 was intentionally developed independently while Challenge Hub work remained separate. The accepted implementation compare from START_SHA to final implementation head is ahead-only and contains no Challenge Hub/Detail product file changes.

`/dashboard/challenges` must continue to follow its own implementation/evidence chain. F08 does not accept, merge or redefine that workstream.

## 5. Closeout mutation lock

Relative to implementation merge `f90e5c9796e256f35a9a4f3d4fe9faf822657df7`, this closeout commit may change exactly these four Markdown governance files:

1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F08_OTP_ACCOUNT_ONBOARDING.md`;
4. `docs/workstreams/F08_CLOSEOUT.md`.

Application/runtime source changes: `NONE`.

Workflow/package/dependency changes: `NONE`.

Contract/adapter/fixture changes: `NONE`.

## 6. Non-recursive terminal evidence rule

This closeout commit cannot contain its own future merge SHA or terminal main CI run. Therefore it records all evidence available before closeout merge.

The `/register` route may be promoted to `FINAL_PRIVATE` in closeout governance because implementation is merged and post-implementation main QA is green. The F08 workstream itself MUST NOT be called `DONE / MERGED / FROZEN` until:

1. implementation-merge → closeout-head compare proves documentation-only scope;
2. closeout PR is opened without auto-close syntax;
3. closeout PR exact-head Frontend Quality Gate is PASS;
4. closeout PR is mergeable with unresolved review threads `0`;
5. pre-closeout-merge `main` is still exact implementation merge `f90e5c9796e256f35a9a4f3d4fe9faf822657df7`;
6. closeout merge uses expected-head lock;
7. terminal post-closeout main Quality Gate is PASS on exact frozen main;
8. terminal browser artifact/digest are recorded in Issue #53;
9. live `main` is re-verified exact frozen SHA;
10. Issue #53 is closed with `state_reason=completed`.
