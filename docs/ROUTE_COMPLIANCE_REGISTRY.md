# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.

Last audit: `2026-09-12`

Accepted F21 implementation `main` at closeout creation:

`7868d191f07f038ba757e3a2593ffc400bb0c883`

Last terminal frozen baseline before F21:

`b585e1e421c2e0febedf53e43349a23666004338` — F20 terminal frozen main.

Active closeout workstream:

`F21 — Public Player Ranking` — Issue #98 OPEN — implementation PR #99 MERGED — closeout branch `closeout/f21-public-player-ranking`.

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
| `/centers/$id` | `FINAL_CURRENT` | F20 terminally frozen; Issue #95 completed; frozen main `b585e1e421c2e0febedf53e43349a23666004338`. |
| `/ranking` | `FINAL_CURRENT` | F21 implementation accepted under current law. START `b585e1e421c2e0febedf53e43349a23666004338`; reviewed head `b8aaad067ce64a376e8758daa2eda43e374fee65`; PR #99 MERGED; implementation main `7868d191f07f038ba757e3a2593ffc400bb0c883`; post-main Full/F21/F20/F19/F18/F17/F16 all PASS. Workstream remains closeout-in-progress until terminal freeze evidence exists in Issue #98. |
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
| `/players/$username` | `NEEDS_RECERTIFICATION` | Must reconcile authoritative public player/rating/privacy truth; next public workstream after terminal F21. |
| `/host` | `NEEDS_RECERTIFICATION` | Public acquisition route has not passed current page + SEO gates. |
| `/rules` | `NEEDS_RECERTIFICATION` | Must reconcile authoritative ruleset/product copy and current evidence law. |

## C. Accepted F21 Public Player Ranking truth

Permanent architecture:

`validated ranking search → loaderDeps → SSR loader → typed PlayerRankingRepository → strict runtime-validated ranking projection → Ranking UI`

Validated URL state: game, season, region, ranking type `tournament|challenge`, page.

Planned production endpoint:

`GET /api/v1/rankings/`

Production invariants:
- production defaults to Django adapter and requires `VITE_API_BASE_URL`;
- non-2xx failures fail closed;
- response is strictly runtime validated;
- no production fixture fallback;
- frontend never calculates official rank, rating, movement or challenge eligibility.

Authority / identity:
- backend owns leaderboard membership/order/rank, stable `playerId`, public `username`, game/city identity, rating projection, record, movement, facets/filtering/pagination;
- `playerId` is relation identity;
- `username` is public profile-navigation identity;
- gamer tag is display only;
- frontend owns navigation state, presentation, SEO, accessibility and deterministic QA fixtures only.

Tournament Rating and Challenge Rating remain distinct. F21 v1 returns one authoritative `rating` paired with the active `ratingType`; challenge eligibility remains outside this listing and is not browser-derived.

SEO:
- H1 `رتبه‌بندی بازیکنان مسابقات Turnoment`;
- title `رتبه‌بندی بازیکنان مسابقات | Turnoment`;
- base `/ranking` canonical/indexable;
- game/season/region/type/page variants `noindex,follow` + canonical `/ranking`;
- no unsupported official/national/best-player claims or ranking structured-data markup.

Runtime remains:

`FRONTEND MOCK / BACKEND PENDING`

Implementation evidence:
- reviewed head `b8aaad067ce64a376e8758daa2eda43e374fee65`;
- START→head ahead 2 / behind 0 / 12 files;
- no lockfile/dependency drift or frozen-route source mutation;
- exact-head Full `34658428081` and F21 `34658428161` PASS;
- PR #99 mergeable=true, review threads=0, exact START main lock, expected-head merge;
- PR-context Full `34685943363`, F21 `34685943377`, F20 `34685943390`, F19 `34685943358`, F18 `34685943344`, F17 `34685943345`, F16 `34685943368` — all PASS;
- implementation merge/main `7868d191f07f038ba757e3a2593ffc400bb0c883`;
- post-main Full `34686214152`, F21 `34686214160`, F20 `34686214190`, F19 `34686214168`, F18 `34686214210`, F17 `34686214170`, F16 `34686214212` — all PASS.

Because implementation merge + required post-main gates are accepted, `/ranking` is promoted non-recursively to `FINAL_CURRENT`. Terminal F21 freeze still requires closeout merge and terminal evidence in Issue #98.

## D. Backend F21 alignment

Backend F21 documentation alignment is terminal: Issue #39 CLOSED / COMPLETED, PR #40 MERGED, backend main `44f18e462f63c625bc02e07ef93c15f1c385dcd0`; PR-context gate `34658090539` and post-main gate `34658179049` PASS on Python 3.12/3.14. No runtime ranking implementation or phase reordering was added.

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## E. Frozen-route protection

F16 `/`, F17 `/tournaments`, F18 `/games`, F19 `/centers`, F20 `/centers/$id`, F21 `/ranking` at accepted implementation state, and F02 `/games/$slug` are protected. `/players/$username` is also outside F21 scope and remains untouched for its own future recertification.

## F. Legacy / non-competitive surfaces

Existing ecommerce/service/general-content legacy routes remain `LEGACY_REVIEW` until explicitly accepted or removed. Do not use them as competitive architecture references.

## G. NEXT

Immediate task: complete F21 documentation-only closeout and terminal frozen-main evidence without source/runtime mutation.

After terminal F21 freeze:

`/players/$username` → `/host` → `/rules`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## H. Registry maintenance law

A route cannot be promoted from chat memory. `/ranking` is `FINAL_CURRENT` only because implementation merge + required post-main QA now exist. Terminal workstream `DONE / MERGED / FROZEN` still requires closeout merge + terminal frozen-main evidence in Issue #98. Future closeout SHA/terminal CI facts must not be self-recorded recursively in this closeout commit.
