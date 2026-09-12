# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.

Last audit: `2026-09-12`

Current terminal frozen frontend baseline / F22 START:

`36e8685192fede45da8c4e82c32bdc41a2db1be2`

Active workstream:

`F22 — Public Player Profile` — Issue #101 OPEN — branch `phase/f22-public-player-profile`.

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
| `/ranking` | `FINAL_CURRENT` | F21 terminally frozen; Issue #98 completed; closeout PR #100 merged; frozen main `36e8685192fede45da8c4e82c32bdc41a2db1be2`; terminal Full `34686940459` and F21 `34686940446` PASS with required frozen regressions. |
| `/players/$username` | `IN_PROGRESS` | F22 active. START `36e8685192fede45da8c4e82c32bdc41a2db1be2`; exact source head `d8e2cb8448837b3d63cb9727ae44b1a892ab7d64`; exact-source Full `34688426255` + F22 `34688426242` PASS; Backend F22 docs alignment Issue #41 / PR #42 terminal. Implementation PR/post-main/closeout still pending. |
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

## C. Accepted F22 Public Player Profile architecture under review

Permanent architecture:

`validated username param → SSR loader → typed PublicPlayerProfileRepository → strict runtime-validated public profile projection → Public Player Profile UI`

Target production endpoint:

`GET /api/v1/players/{username}/public-profile/`

Production invariants:
- production defaults to Django adapter and requires `VITE_API_BASE_URL`;
- 404 maps to one public not-found state; other non-2xx fails closed;
- strict runtime response validation;
- requested/returned public username identity must match;
- no production fixture fallback.

Identity / authority:
- `playerId` = stable relation identity;
- `username` = stable public profile-navigation identity;
- `gamerTag` = display text only;
- backend eventually owns publication, search visibility, rank/rating/record/movement and result truth;
- frontend owns presentation, SEO, accessibility/responsive behavior and deterministic QA fixtures only;
- frontend does not calculate authoritative win-rate/rating/rank/movement/result validity/eligibility.

Privacy:
- private/unpublished/nonexistent profile lookup collapses to the same public not-found surface;
- phone/email/private real identity/`interview_opt_in`/auth/moderation/verification/payment/secrets are excluded from the public contract.

Indexing:
- backend-projected `indexable` → `index,follow`;
- backend-projected `noindex` → `noindex,follow`;
- not-found → `noindex,nofollow`;
- canonical found profile is `/players/{username}`.

No ProfilePage structured data is emitted solely for schema coverage.

Current runtime remains:

`FRONTEND MOCK / BACKEND PENDING`

## D. F22 exact-source evidence

Source head:

`d8e2cb8448837b3d63cb9727ae44b1a892ab7d64`

START→source:
- ahead 1 / behind 0 / exactly one commit;
- exactly 9 files;
- no lockfile/dependency drift;
- package delta is test wiring only;
- frozen public route source is untouched.

QA:
- Full `34688426255` PASS — artifact `10296039809` — digest `sha256:157f687c8063ebf2726296e6aeb0885e3f6ec131a1ce7a6771ddc603439029f3`;
- F22 `34688426242` PASS — artifact `10296158247` — digest `sha256:c435b839332d124788a404f0bf71273f6fdff7f61ee69581df9011d4b6af2be5`;
- indexable/noindex states manually reviewed at 375/390/430/768/1024/1440 with no observed horizontal overflow, clipping or overlap.

## E. Backend F22 alignment

Backend F22 documentation alignment is terminal:
- backend Issue #41 CLOSED / COMPLETED;
- PR #42 MERGED;
- docs head `be805235925af8b70a6e8d183e5f8f363dd7c9cb`;
- backend merge/main `215fae68d8003b8df6c034b228d1121d96b0be18`;
- exact-head `34688994229`, PR-context `34689064802` and post-main `34689119713` all PASS on Python 3.12/3.14;
- no backend runtime implementation/phase reorder was added.

The existing P01 `GET /api/v1/players/<gamer_tag>/` remains current runtime truth. It is not silently reinterpreted as stable username. The F22 target endpoint remains planned pending stable username + compatibility + competitive-domain runtime work.

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## F. Frozen-route protection

F16 `/`, F17 `/tournaments`, F18 `/games`, F19 `/centers`, F20 `/centers/$id`, F21 `/ranking`, and F02 `/games/$slug` are frozen/protected. F22 may not mutate those route sources as part of player-profile recertification.

## G. Legacy / non-competitive surfaces

Existing ecommerce/service/general-content legacy routes remain `LEGACY_REVIEW` until explicitly accepted or removed. Do not use them as competitive architecture references.

## H. NEXT

Immediate task: complete F22 governance exact-head QA → implementation PR/merge/post-main → documentation-only closeout → terminal frozen-main evidence.

After terminal F22:

`/host` → `/rules`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## I. Registry maintenance law

A route cannot be promoted from chat memory. `/players/$username` remains `IN_PROGRESS` until implementation merge + required post-main QA exist. Terminal `DONE / MERGED / FROZEN` additionally requires documentation-only closeout merge and terminal frozen-main evidence in Issue #101.
