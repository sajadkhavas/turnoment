# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.

Last audit: `2026-09-12`

Current terminal frozen frontend `main` before F21:

`b585e1e421c2e0febedf53e43349a23666004338` — F20 terminal frozen main.

Active workstream:

`F21 — Public Player Ranking` — Issue #98 OPEN — branch `phase/f21-public-player-ranking` — START `b585e1e421c2e0febedf53e43349a23666004338`.

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
| `/centers/$id` | `FINAL_CURRENT` | F20 terminally frozen; Issue #95 CLOSED / COMPLETED; closeout PR #97 MERGED; frozen main `b585e1e421c2e0febedf53e43349a23666004338`; terminal Full/F20/F19/F18/F17/F16 gates PASS. |
| `/ranking` | `IN_PROGRESS` | F21 Issue #98. START `b585e1e421c2e0febedf53e43349a23666004338`. Legacy local ranking route replaced on branch by validated URL search → SSR loader → typed `PlayerRankingRepository` → strict runtime-validated projection → dedicated Ranking UI. Source QA and backend documentation alignment accepted; implementation PR/merge/post-main/closeout/terminal freeze still pending. |
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
| `/players/$username` | `NEEDS_RECERTIFICATION` | Must reconcile authoritative public player/rating/privacy truth; protected as the next public workstream after F21. |
| `/host` | `NEEDS_RECERTIFICATION` | Public acquisition route has not passed current page + SEO gates. |
| `/rules` | `NEEDS_RECERTIFICATION` | Must reconcile authoritative ruleset/product copy and current evidence law. |

## C. Active F21 Public Player Ranking truth

Permanent architecture:

`validated ranking search → loaderDeps → SSR loader → typed PlayerRankingRepository → strict runtime-validated ranking projection → Ranking UI`

Validated URL state:
- game;
- season;
- region;
- ranking type `tournament|challenge`;
- page.

Planned production endpoint:

`GET /api/v1/rankings/`

Production invariants:
- production defaults to Django adapter;
- requires `VITE_API_BASE_URL`;
- non-2xx HTTP failures fail closed;
- strict runtime validation;
- no production fixture fallback;
- frontend never calculates official rank, rating, movement or challenge eligibility.

Authority:
- backend/repository owns leaderboard membership/order/rank, player/profile/game/city identity, Tournament Rating / Challenge Rating projection, match record, movement, facets/filtering/pagination;
- frontend owns URL state, presentation, SEO, accessibility/responsive behavior and deterministic QA fixtures only.

Identity:
- `playerId` = backend relation identity;
- `username` = public profile navigation identity;
- gamer tag = display only.

Tournament Rating and Challenge Rating remain distinct. F21 v1 returns one `rating` paired with `ratingType` matching the active ranking query. Challenge eligibility remains outside the listing v1 and is not browser-derived.

SEO:
- H1 `رتبه‌بندی بازیکنان مسابقات Turnoment`;
- title `رتبه‌بندی بازیکنان مسابقات | Turnoment`;
- base canonical `/ranking`, robots `index,follow`;
- current game/season/region/type/page variants `noindex,follow` + canonical `/ranking`;
- no unsupported official/national/best-player claims;
- no unsupported ranking structured-data markup.

Current runtime remains:

`FRONTEND MOCK / BACKEND PENDING`

Source checkpoint:

`2d75596a31440dcd795ea609926a02e7a478e71e`

Source compare from START:
- ahead 1 / behind 0 / exactly one source commit;
- exactly nine implementation-surface files;
- no lockfile/dependency drift;
- package delta only appends F21 contract spec;
- shared Home ranking, `/players/$username`, legacy ranking data and frozen route source remain untouched.

Exact-source QA:
- Full `34657745984` PASS — artifact `10286078892` — digest `sha256:eb4869cb5b72467341710d3a27ba755b9196634283ad3bef5e0a932cbea1f8e2`;
- F21 `34657746031` PASS — artifact `10286283373` — digest `sha256:001cb4eef4d6f507e4061efc156ebbaac565cb7ee29718468ae8e1a4e9edbaf9`;
- base + filtered screenshots manually inspected at 375/390/430/768/1024/1440 without observed overflow/clipping/overlap.

Backend F21 documentation alignment:
- backend Issue #39 CLOSED / COMPLETED;
- PR #40 MERGED;
- docs head `c7712f025da84050085ae1017b9f659c6f58d01a`;
- backend merge/main `44f18e462f63c625bc02e07ef93c15f1c385dcd0`;
- PR-context Backend Quality Gate `34658090539` PASS on Python 3.12/3.14;
- post-main Backend Quality Gate `34658179049` PASS on Python 3.12/3.14;
- no runtime ranking implementation or phase reorder;
- Backend NEXT remains `P02 — Games / Catalog Foundation`.

## D. Accepted F20 Public Gaming Center Detail truth

Permanent architecture:

`route publicId param → SSR loader → typed GamingCenterDetailRepository → strict runtime-validated detail projection → Gaming Center Detail UI`

F20 is terminal `DONE / MERGED / FROZEN — FINAL_CURRENT`:
- Issue #95 CLOSED / COMPLETED;
- implementation PR #96 MERGED;
- closeout PR #97 MERGED;
- frozen main `b585e1e421c2e0febedf53e43349a23666004338`;
- terminal Full `34656182434`, F20 `34656182364`, F19 `34656182441`, F18 `34656182358`, F17 `34656182357`, F16 `34656182313` — all PASS.

Runtime remains `FRONTEND MOCK / BACKEND PENDING`.

## E. Frozen-route protection

F16 `/`, F17 `/tournaments`, F18 `/games`, F19 `/centers`, F20 `/centers/$id`, and F02 `/games/$slug` remain protected. F21 source implementation does not mutate those route sources. `/players/$username` is also protected from F21 because it is the next separate recertification workstream.

## F. Legacy / non-competitive surfaces

Existing ecommerce/service/general-content legacy routes remain `LEGACY_REVIEW` until explicitly accepted or removed. Do not use them as competitive architecture references.

## G. NEXT

Immediate task: finish F21 governance checkpoint → exact-head QA → implementation PR → post-main QA → documentation-only closeout → terminal frozen-main evidence.

After terminal F21 freeze:

`/players/$username` → `/host` → `/rules`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## H. Registry maintenance law

A route cannot be promoted from chat memory. `/ranking` must remain `IN_PROGRESS` until its implementation is merged and required post-main QA is accepted. Route-level `FINAL_CURRENT` may then be promoted non-recursively in closeout docs; terminal workstream `DONE / MERGED / FROZEN` additionally requires closeout merge + terminal frozen-main evidence in Issue #98.
