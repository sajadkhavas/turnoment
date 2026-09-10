# F09 — Player Profile Recertification

Status: `MERGED / CLOSEOUT IN PROGRESS — TARGET FINAL_PRIVATE`

Route: `/dashboard/profile`

START_SHA: `9876e5e6c47b42f9f2574f1675de6dab9ba1cc7f`

Implementation branch: `phase/f09-player-profile`

Tracking Issue: `#56`

Index policy: `PRIVATE / NOINDEX`

## 1. Source / concurrency lock

F08 is terminally frozen at frontend main `9876e5e6c47b42f9f2574f1675de6dab9ba1cc7f`; terminal Quality Gate `34458480652` PASS; Issue #53 CLOSED / COMPLETED.

Backend main remains `38dccbf213d5f439e56cd608e3e4ac419d5092d1`; backend NEXT remains `P02 — Games / Catalog Foundation`.

No open branch, Issue or PR overlapping Player Profile/F09 was found before creation. F09 was intentionally independent from the Challenge Hub/Detail Lovable workstream and did not modify Challenge product files.

## 2. Inherited defect removed

The inherited `/dashboard/profile` route was legacy direct JSX with hard-coded name, email, phone and birthdate plus password-change fields. It had no route loader, typed repository, runtime validation or real profile mutation contract.

F09 replaced that scaffold with the accepted P01 profile boundary and removed unsupported identity/password controls.

## 3. Backend P01 source truth

Authoritative read endpoint:

`GET /api/v1/auth/me/`

Authoritative profile mutation endpoint:

`PATCH /api/v1/auth/me/profile/`

Backend-editable fields are exactly:
- `gamer_tag` — nullable, 3–24 `[A-Za-z0-9_.-]` when set, backend authoritative for uniqueness;
- `display_name` — max 80;
- `city` — max 80;
- `bio` — max 280;
- `interview_opt_in` — boolean.

`avatar_key`, `id`, `phone`, `email`, `is_active`, `date_joined`, and `platform_roles` are not F09 mutation fields.

F09 does not invent birthdate, password change, phone change, email mutation, avatar upload or any unsupported account/profile action.

## 4. Permanent frontend boundary

`private dashboard access policy → route loader → typed PlayerProfileRepository → runtime-validated P01 payload → UI`

The permanent repository has deterministic QA and Django HTTP adapters implementing the same contract.

Profile PATCH uses:
- Django Session authority;
- CSRF bootstrap;
- `credentials: include`;
- `X-CSRFToken`;
- runtime validation of success/error payloads;
- explicit validation, gamer-tag conflict and session-expired outcomes.

The mutation schema is strict and rejects unsupported identity fields rather than silently stripping them.

No localStorage/sessionStorage bearer auth is introduced.

## 5. Final page scope

The accepted page provides:
- final Persian player-profile header and current profile preview;
- read-only account identity summary for phone/email/join date;
- editable display name;
- editable gamer tag with backend-aligned local convenience validation;
- editable city;
- editable 280-character bio;
- interview/contact opt-in;
- dirty-state-aware reset/save actions;
- pending, saved, validation, conflict, session-expired and unexpected-error handling;
- explicit field labels/instructions and live feedback;
- responsive layout.

The page does not expose raw backend role strings and does not create an avatar uploader because no accepted upload contract exists.

## 6. Accessibility / final-copy acceptance

- private `noindex,nofollow` route;
- dashboard shell retains exactly one page `<main>` landmark;
- explicit label/id associations;
- instructions connected with `aria-describedby`;
- field errors use `aria-invalid` and alert semantics;
- save success/error feedback is announced;
- no development-stage backend/API/mock/demo/waiting language in user-visible copy;
- no password/birthdate/unsupported identity controls;
- responsive acceptance at `375 / 390 / 430 / 768 / 1024 / 1440`.

## 7. Implementation / visual evidence

Accepted browser/code candidate:

`7062f629264e78323dedbb84f8151bf29e270a94`

- candidate Quality Gate `34460593400` — PASS;
- candidate artifact `10145475710`;
- candidate digest `sha256:c261480e9fcbaa6cba6d0a2b972cea4f81b7ed85ca70799c9139c707edf83509`;
- 60 regression screenshots;
- F09 widths `375 / 390 / 430 / 768 / 1024 / 1440`;
- manual review `375 / 430 / 768 / 1024 / 1440` — PASS.

Final implementation/evidence head:

`8b362cbe521d39a103c192a7d6ff344f0a08e1d1`

- exact-head Quality Gate `34461197903` — PASS;
- exact-head artifact `10145721261`;
- exact-head digest `sha256:23101901d354f4f4a21d50efe8d9fb561d2808a13202739a7c7cde3001c18a20`;
- implementation PR `#57` — MERGED;
- PR-triggered Quality Gate `34461614267` — PASS;
- PR artifact `10145875847`;
- PR artifact digest `sha256:b460b561c2efece21cdec465b363893dd6d9e84fd272506e06676449487e2079`;
- mergeable before merge: `true`;
- unresolved review threads before merge: `0`;
- pre-merge main exact START_SHA;
- expected-head merge used;
- implementation merge `6b4705ede745427ee4dd1a6aeafdeeab7c73042f`;
- post-implementation main Quality Gate `34467008288` — PASS;
- post-main artifact `10148013024`;
- post-main digest `sha256:c1d30a5e53542b230e7dea2f52ba15fa12aadf284a325ccfe88193ab016d7469`.

## 8. Closeout law

Closeout branch: `closeout/f09-player-profile`, created exactly from implementation merge `6b4705ede745427ee4dd1a6aeafdeeab7c73042f`.

The closeout commit may change exactly four Markdown governance files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F09_PLAYER_PROFILE.md`;
4. `docs/workstreams/F09_CLOSEOUT.md`.

Application/runtime source changes: `NONE`.
Workflow/package/dependency changes: `NONE`.
Contract/adapter/fixture changes: `NONE`.
Challenge Hub/Detail product changes: `NONE`.

The `/dashboard/profile` route may be promoted non-recursively to `FINAL_PRIVATE` after implementation merge + green post-main gate. F09 itself MUST NOT be called `DONE / MERGED / FROZEN` until closeout PR CI/merge, terminal frozen-main CI/artifact, exact-main re-verification and Issue #56 completed closure are all recorded.
