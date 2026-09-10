# F09 — Player Profile Acceptance Evidence

Route: `/dashboard/profile`

Tracking Issue: `#56`

START_SHA: `9876e5e6c47b42f9f2574f1675de6dab9ba1cc7f`

Implementation branch: `phase/f09-player-profile`

## 1. Accepted browser candidate

Candidate head:

`7062f629264e78323dedbb84f8151bf29e270a94`

Frontend Quality Gate:

`34460593400` — `PASS`

All gate steps passed:
- frozen dependency install;
- lint;
- production build and route generation;
- TypeScript typecheck;
- complete contract suite including F09;
- browser smoke and responsive screenshots;
- browser evidence upload.

Browser artifact:
- id: `10145475710`
- name: `browser-qa-7062f629264e78323dedbb84f8151bf29e270a94`
- digest: `sha256:c261480e9fcbaa6cba6d0a2b972cea4f81b7ed85ca70799c9139c707edf83509`
- total regression screenshots: `60`

F09 screenshots exist at:
`375 / 390 / 430 / 768 / 1024 / 1440`

Representative manual visual review completed for:
`375 / 430 / 768 / 1024 / 1440`

Manual review result: `PASS`.

No horizontal overflow, clipped primary controls, card collision, broken dashboard/sidebar composition or unreadable responsive state was observed. Mobile keeps the form as a readable vertical flow; tablet transitions to a two-column form; desktop retains a balanced main/profile-information composition beside the dashboard navigation.

## 2. Backend contract acceptance

F09 maps directly to accepted backend P01 account/profile truth:
- `GET /api/v1/auth/me/`
- `PATCH /api/v1/auth/me/profile/`

Editable fields are restricted to:
- `gamer_tag`;
- `display_name`;
- `city`;
- `bio`;
- `interview_opt_in`.

`avatar_key`, account id, phone, email, active state, join date and platform roles are never sent as profile mutation fields.

The mutation command schema is strict, so unsupported identity fields are rejected rather than silently removed.

## 3. Identity / security evidence

The production repository:
- retrieves the authenticated player using Django Session credentials;
- treats 401/403 read responses as unauthenticated;
- bootstraps CSRF before profile PATCH;
- sends `credentials: include` and `X-CSRFToken` on PATCH;
- runtime-validates `/auth/me/` and successful profile responses;
- preserves explicit session-expired and gamer-tag-conflict outcomes;
- maps backend serializer validation errors to the supported form fields;
- introduces no localStorage/sessionStorage bearer-token authentication.

Frontend validation is convenience only. Backend remains authoritative for identity, session, gamer-tag uniqueness and accepted profile state.

## 4. Product-scope evidence

The inherited hard-coded profile/password scaffold was replaced.

Final page includes:
- current player summary;
- editable display name;
- editable gamer tag with backend-aligned 3–24 ASCII identifier rule;
- editable city;
- editable 280-character bio;
- interview/contact opt-in;
- read-only phone, email and join-date account summary;
- dirty-state-aware save/reset;
- pending, success, validation, conflict, session-expired and unexpected-error handling;
- current profile preview.

The page intentionally does not expose:
- password or password-change controls;
- birthdate;
- editable phone or email;
- avatar upload;
- unsupported identity/profile mutations;
- raw engineering/mock/backend/API status language in user-facing copy.

## 5. Accessibility / private-route evidence

- route metadata includes `noindex,nofollow`;
- DashboardShell owns the single page `<main>` landmark;
- form controls have explicit `label` associations;
- format/help text is connected through `aria-describedby`;
- field errors use `aria-invalid` and alert semantics;
- save success/error feedback is announced;
- pending and disabled states are explicit;
- controls remain keyboard/touch usable at the accepted responsive widths.

## 6. Scope integrity

F09 is independent from the Lovable Challenge workstream. No Challenge Hub/Detail product file is part of the implementation scope.

Backend repository/runtime is not modified and backend phase order remains unchanged. Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 7. Non-terminal status

The browser candidate is technically and visually accepted. A product-brand document-title polish was committed after visual review, followed by this evidence document.

Because those commits change the implementation branch head, F09 still requires a fresh full Quality Gate on the final implementation/evidence head before an implementation PR may be opened.

F09 is not `DONE / MERGED / FROZEN` until implementation merge, post-main QA, documentation-only closeout, terminal frozen-main QA/artifact and Issue #56 terminal closure are complete.
