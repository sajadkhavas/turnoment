# Challenge Hub / My Challenges

## Goal
Replace the `/dashboard/challenges` placeholder with the final private Persian RTL Challenge Hub, while preserving the accepted dashboard shell and all unrelated routes.

## What will be built
- A focused page header, unlocked/locked challenge-access card, authoritative summary counts, and URL-backed status tabs.
- Distinct cards for incoming invitations, outgoing invitations, active/action-required challenges, completed challenges, expired or unavailable invitations, and polished filtered/no-data states.
- A clean “ایجاد چالش جدید” launcher whose availability comes from repository data; no Challenge Detail or creation URL will be invented.
- Responsive pagination, loading skeleton, safe error/retry state, mutation-ready disabled/pending controls, and accessible status feedback.
- Mobile-first layouts for 375/390/430px, balanced tablet layouts, and a two-column desktop challenge grid without horizontal overflow.

## Data and architecture
- Add a dedicated typed Challenge Hub contract covering player access, opponents, games, invitations, challenge states, match context, permissions, summaries, filters, and backend pagination.
- Add a replaceable mock repository plus a Django HTTP adapter with runtime validation, session credentials, and a single future read endpoint boundary.
- Treat challenge eligibility, rating, permissions, outcomes, scores, rating changes, and dispute/action state as supplied values only; the UI will not derive them.
- Validate `status` and `page` search parameters in the route, pass them to the loader, and keep filter/pagination state shareable in the URL.
- Keep all challenge/detail and creation actions isolated as optional callbacks so no permanent destination is invented.

## Files and scope
- Replace the existing `/dashboard/challenges` route implementation.
- Add focused Challenge Hub data/repository, runtime schema, UI, and contract test files.
- Reuse existing dashboard shell, navigation, typography, tokens, and route-level private access policy.
- Update only the quality test list and required route/workstream continuity records; no unrelated page redesigns.

## Verification
- Verify type safety, lint, contract tests, and production build through the existing quality command.
- Browser-check `/dashboard/challenges` at 375, 390, 430, 768, 1024, and 1440px, including active navigation, URL filters, empty filter state, pagination, keyboard focus, one main landmark, and no overflow.
- Confirm `noindex,nofollow`, separate Challenge Rating wording, the 30 finalized-valid-Match rule, and absence of betting/payment language or invented Challenge Detail links.
