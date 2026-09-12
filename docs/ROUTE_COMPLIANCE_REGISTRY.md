# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.

Last audit: `2026-09-12`

Accepted F22 implementation `main` at closeout creation:

`d1b1ff3bd24318e9714a6af7585c5b7299479db5`

Active closeout workstream:

`F22 — Public Player Profile` — Issue #101 OPEN — implementation PR #102 MERGED — closeout branch `closeout/f22-public-player-profile`.

## Status meanings

- `FINAL_CURRENT` — route implementation is accepted under current page + SEO/final-copy law.
- `FINAL_PRIVATE` — accepted private/noindex route.
- `FINAL_PRE_SEO` — accepted before current strict SEO/final-copy law.
- `IN_PROGRESS` — active route implementation without sufficient merge/post-main evidence.
- `NEEDS_RECERTIFICATION` — existing route lacks current-law acceptance.
- `LEGACY_REVIEW` — inherited non-competitive/ecommerce/general-site route.

Route-level `FINAL_CURRENT` is distinct from terminal workstream `DONE / MERGED / FROZEN`; the latter additionally requires closeout merge + terminal frozen-main CI/artifacts recorded in the tracking Issue.

## A. Accepted / active competitive routes

| Route | Status | Evidence / exact truth |
|---|---|---|
| `/` | `FINAL_CURRENT` | F16 terminally frozen; Issue #81 completed. |
| `/tournaments` | `FINAL_CURRENT` | F17 terminally frozen; Issue #84 completed. |
| `/games` | `FINAL_CURRENT` | F18 terminally frozen; Issue #89 completed. |
| `/centers` | `FINAL_CURRENT` | F19 terminally frozen; Issue #92 completed. |
| `/centers/$id` | `FINAL_CURRENT` | F20 terminally frozen; Issue #95 completed. |
| `/ranking` | `FINAL_CURRENT` | F21 terminally frozen; Issue #98 completed. |
| `/players/$username` | `FINAL_CURRENT` | F22 implementation accepted under current law. START `36e8685192fede45da8c4e82c32bdc41a2db1be2`; reviewed head `1e234e1c9877cb2c62f1b8e677d64356c5725a58`; PR #102 MERGED; implementation main `d1b1ff3bd24318e9714a6af7585c5b7299479db5`; post-main Full/F22/F21/F20/F19/F18/F17/F16 all PASS. Workstream remains closeout-in-progress until terminal freeze evidence exists in Issue #101. |
| `/games/$slug` | `FINAL_CURRENT` | F02 technical + current SEO/final-copy acceptance terminally recorded; frozen/protected. |
| `/tournaments/$id` | `FINAL_PRE_SEO` | F01 accepted before strict current SEO final-copy protocol. |
| `/tournaments/$id/register` | `FINAL_PRIVATE` | F01 final private registration route. |
| `/dashboard` | `FINAL_PRIVATE` | accepted player dashboard. |
| `/dashboard/tournaments` | `FINAL_PRIVATE` | F03 terminal. |
| `/dashboard/matches` | `FINAL_PRIVATE` | F04 terminal. |
| `/matches/$id/result` | `FINAL_PRIVATE` | F05 terminal. |
| `/matches/$id/dispute` | `FINAL_PRIVATE` | F06 terminal. |
| `/login` | `FINAL_PRIVATE` | F07 terminal OTP/session route. |
| `/register` | `FINAL_PRIVATE` | F08 terminal. |
| `/dashboard/profile` | `FINAL_PRIVATE` | F09 terminal. |
| `/dashboard/notifications` | `FINAL_PRIVATE` | F10 terminal. |
| `/dashboard/settings` | `FINAL_PRIVATE` | F11 terminal. |
| `/dashboard/rivalries` | `FINAL_PRIVATE` | F12 terminal. |
| `/dashboard/achievements` | `FINAL_PRIVATE` | F13 terminal. |
| `/dashboard/teams` | `FINAL_PRIVATE` | F14 terminal. |
| `/dashboard/challenges` | `FINAL_PRIVATE` | F15 terminal. |

## B. Public competitive routes requiring current-law recertification

| Route | Status | Why |
|---|---|---|
| `/host` | `NEEDS_RECERTIFICATION` | Public acquisition route has not passed current page + SEO gates; protected NEXT after terminal F22. |
| `/rules` | `NEEDS_RECERTIFICATION` | Must reconcile authoritative ruleset/product copy and current evidence law. |

## C. Accepted F22 architecture

Permanent architecture:

`validated username param → SSR loader → typed PublicPlayerProfileRepository → strict runtime-validated public profile projection → Public Player Profile UI`

Target production endpoint:

`GET /api/v1/players/{username}/public-profile/`

Production invariants:
- production defaults to Django adapter and requires `VITE_API_BASE_URL`;
- 404 maps to one public not-found state; other non-2xx/contract failures fail closed;
- strict response validation;
- requested/returned username identity must match;
- no production fixture fallback.

Identity / authority:
- `playerId` = stable relation identity;
- `username` = stable public profile-navigation identity;
- `gamerTag` = display only;
- backend eventually owns publication/search visibility, rank/rating/record/movement and public-result truth;
- frontend owns presentation, SEO, accessibility/responsive behavior and deterministic QA fixtures only;
- frontend does not calculate authoritative win-rate/rating/rank/movement/result validity/eligibility.

Privacy:
- private/unpublished/nonexistent/non-public profiles collapse to the same public not-found surface;
- phone/email/private real identity/`interview_opt_in`/auth/moderation/verification/payment/secrets are excluded.

Indexing:
- `indexable` → `index,follow`;
- `noindex` → `noindex,follow`;
- not-found → `noindex,nofollow`;
- canonical found profile `/players/{username}`.

No ProfilePage structured data is emitted solely for schema coverage.

Runtime remains `FRONTEND MOCK / BACKEND PENDING`.

## D. F22 implementation evidence

Source head `d8e2cb8448837b3d63cb9727ae44b1a892ab7d64`; final reviewed head `1e234e1c9877cb2c62f1b8e677d64356c5725a58`.

START→reviewed head:
- ahead 2 / behind 0 / 2 commits / 12 files;
- no lockfile/dependency drift;
- frozen public route sources untouched.

Reviewed-head QA:
- Full `34689322978` PASS — artifact `10297071463` — digest `sha256:105d1dabb65b9ebf73b1efd03a573bfbd17e31959a00b2c03a88be59b01b831b`;
- F22 `34689323008` PASS — artifact `10296652097` — digest `sha256:f4dad751ad6f231d0307b34ee065ccb303a806c4af429122a47d42e6190e1d46`.

Implementation PR #102:
- mergeable=true / review threads=0 / exact START main lock / expected-head merge;
- all PR-context Full/F22/F21/F20/F19/F18/F17/F16 gates PASS;
- merge/main `d1b1ff3bd24318e9714a6af7585c5b7299479db5`.

Post-main gates on exact implementation main — all PASS:
- Full `34696582708`;
- F22 `34696582677`;
- F21 `34696582664`;
- F20 `34696582676`;
- F19 `34696582758`;
- F18 `34696582743`;
- F17 `34696582642`;
- F16 `34696582648`.

Exact live main was reverified after post-main acceptance. Route-level `/players/$username` is therefore `FINAL_CURRENT`; terminal F22 freeze still requires closeout merge + terminal frozen-main evidence.

## E. Backend F22 alignment

Backend documentation alignment is terminal: Issue #41 CLOSED / COMPLETED, PR #42 MERGED, backend main `215fae68d8003b8df6c034b228d1121d96b0be18`; exact-head `34688994229`, PR-context `34689064802`, post-main `34689119713` all PASS on Python 3.12/3.14.

Existing P01 `GET /api/v1/players/<gamer_tag>/` remains current gamer-tag runtime truth. It is not silently reinterpreted as stable username. Backend NEXT remains `P02 — Games / Catalog Foundation`.

## F. Frozen-route protection

F16 `/`, F17 `/tournaments`, F18 `/games`, F19 `/centers`, F20 `/centers/$id`, F21 `/ranking`, F22 `/players/$username` at accepted implementation state, and F02 `/games/$slug` are protected. Closeout may mutate documentation only.

## G. Legacy / non-competitive surfaces

Existing ecommerce/service/general-content legacy routes remain `LEGACY_REVIEW` until explicitly accepted or removed.

## H. NEXT

Immediate task: complete F22 documentation-only closeout and terminal frozen-main evidence without source/runtime mutation.

After terminal F22:

`/host` → `/rules`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## I. Registry maintenance law

A route cannot be promoted from chat memory. `/players/$username` is `FINAL_CURRENT` only because implementation merge + required post-main QA exist. Terminal workstream `DONE / MERGED / FROZEN` still requires closeout merge + terminal frozen-main evidence in Issue #101. Future closeout SHA/terminal CI facts must not be self-recorded recursively in this closeout commit.
