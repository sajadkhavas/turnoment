# F09 — Player Profile Recertification

Status: `IN PROGRESS`

Route: `/dashboard/profile`

START_SHA: `9876e5e6c47b42f9f2574f1675de6dab9ba1cc7f`

Branch: `phase/f09-player-profile`

Tracking Issue: `#56`

Index policy: `PRIVATE / NOINDEX`

## 1. Source / concurrency lock

F08 is terminally frozen at frontend main `9876e5e6c47b42f9f2574f1675de6dab9ba1cc7f`; terminal Quality Gate `34458480652` PASS; Issue #53 CLOSED / COMPLETED.

Backend main remains `38dccbf213d5f439e56cd608e3e4ac419d5092d1`; backend NEXT remains `P02 — Games / Catalog Foundation`.

No open branch, Issue or PR overlapping Player Profile/F09 was found before creation. F09 is intentionally independent from the Challenge Hub/Detail Lovable workstream and MUST NOT modify Challenge product files.

## 2. Inherited defect

The inherited `/dashboard/profile` route is legacy direct JSX with hard-coded name, email, phone and birthdate plus password-change fields. It has no route loader, typed repository, runtime validation or real profile mutation contract.

That surface conflicts with accepted OTP-only identity truth and backend P01 ownership.

## 3. Backend P01 source truth

Authoritative read endpoint:

`GET /api/v1/auth/me/`

Authoritative profile mutation endpoint:

`PATCH /api/v1/auth/me/profile/`

`PrivatePlayerProfileSerializer` allows exactly:
- `gamer_tag` — nullable/blank, unique case-insensitively, 3–24 chars when set, `[A-Za-z0-9_.-]`;
- `display_name` — max 80;
- `city` — max 80;
- `bio` — max 280;
- `interview_opt_in` — boolean;
- `avatar_key` — read-only.

`MeSerializer` additionally exposes account identity as read-only:
- `id`;
- `phone`;
- `email`;
- `is_active`;
- `date_joined`;
- `platform_roles`;
- `profile`.

F09 MUST NOT invent birthdate, password change, phone change, email mutation, avatar upload or any other unsupported account/profile action.

## 4. Permanent frontend boundary

`private dashboard access policy → route loader → typed PlayerProfileRepository → runtime-validated P01 payload → UI`

The permanent repository has deterministic QA and Django HTTP adapters implementing the same contract.

Profile PATCH uses:
- existing Django Session authority;
- CSRF bootstrap;
- `credentials: include`;
- `X-CSRFToken` on PATCH;
- runtime validation of success and error payloads;
- explicit session-expired and gamer-tag conflict outcomes.

No localStorage/sessionStorage bearer auth is introduced.

## 5. Final page scope

The page provides:
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

## 6. Official guidance checked

Current guidance reviewed before implementation:
- Django REST framework SessionAuthentication: same-session AJAX is supported and unsafe methods such as PATCH require valid CSRF;
- TanStack Router authenticated routes/data loading: route guards are UX/navigation boundaries; private API authorization remains server-side, and loaders coordinate route data before rendering;
- W3C WAI forms guidance: controls need programmatically associated labels, format instructions and identifiable feedback/errors.

## 7. Accessibility / final-copy rules

- private `noindex,nofollow` route;
- dashboard shell retains the single page `<main>` landmark;
- explicit `label`/`id` associations;
- field instructions connected with `aria-describedby`;
- field errors with `aria-invalid` and alert semantics;
- save success/error feedback announced;
- no development-stage words such as backend/API/mock/demo/waiting in user-visible copy;
- no password/birthdate/unsupported identity controls.

## 8. QA plan

Quality Gate expands from 54 to 60 regression screenshots by adding `/dashboard/profile` at:

`375 / 390 / 430 / 768 / 1024 / 1440`

Browser smoke additionally requires:
- final profile copy is present;
- `noindex,nofollow` is present;
- unsupported password/birthdate legacy copy is absent;
- exactly one page `<main>` remains through DashboardShell.

## 9. Completion law

F09 cannot become `DONE / MERGED / FROZEN` until:
1. implementation candidate full Quality Gate PASS;
2. responsive artifact manually reviewed;
3. acceptance evidence is committed;
4. final implementation/evidence exact-head Quality Gate PASS;
5. implementation PR CI PASS, mergeable true and review threads zero;
6. pre-merge main exact START_SHA;
7. expected-head implementation merge;
8. post-implementation main Quality Gate PASS;
9. documentation-only closeout from exact implementation merge;
10. closeout PR CI PASS, mergeable true and review threads zero;
11. expected-head closeout merge;
12. terminal frozen-main Quality Gate PASS and artifact recorded;
13. live main exact frozen SHA re-verified;
14. Issue #56 updated with terminal evidence and CLOSED / COMPLETED.
