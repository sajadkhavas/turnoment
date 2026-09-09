# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under the current Turnoment delivery laws.
>
> Every chat/agent modifying an existing route MUST read this registry together with `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, and when applicable `SEO_FINAL_COPY_PROTOCOL.md`.

Last audit: `2026-09-09`

Audit baseline: `4afb49e913d5fd7e2420031ae957fde2e79e3e8a`

## Status meanings

- `FINAL_CURRENT` — accepted under the current applicable protocol set, including current SEO/final-copy law for public/indexable pages.
- `FINAL_PRIVATE` — final private/noindex route; public SEO research is not applicable, but final page architecture/UX/contracts are accepted.
- `FINAL_PRE_SEO` — technically/factually final under the page protocol but frozen before the stricter SEO final-copy law; material public-copy work requires SEO recertification.
- `IN_PROGRESS` — active controlled workstream exists; not final until merge + terminal CI + continuity closeout.
- `NEEDS_RECERTIFICATION` — competitive/product route exists but has not passed the full current-law evidence chain.
- `PLACEHOLDER` — intentionally incomplete or user-visible temporary state; must be rebuilt before product acceptance.
- `REBUILD` — known product/architecture truth is wrong for Turnoment and the route must be rebuilt rather than patched as-is.
- `LEGACY_REVIEW` — inherited non-Turnoment/ecommerce/general-site route; not an approved competitive architecture reference.

## A. Accepted / active competitive routes

| Route | Status | Evidence / exact next |
|---|---|---|
| `/dashboard` | `FINAL_PRIVATE` | Player Dashboard productionization + closeout merged; private `noindex,nofollow`, session/repository/runtime contract accepted. |
| `/dashboard/tournaments` | `IN_PROGRESS` | F03 My Tournaments — START `4afb49e913d5fd7e2420031ae957fde2e79e3e8a`; branch `phase/f03-my-tournaments`; Issue #38. Placeholder replacement, dedicated contract/repository and final private QA are active. |
| `/tournaments/$id` | `FINAL_PRE_SEO` | F01 `DONE / MERGED / FROZEN`; architecture final, but frozen before current strict SEO final-copy protocol. |
| `/tournaments/$id/register` | `FINAL_PRIVATE` | F01 final registration route; Django Session + CSRF boundary, authoritative states, private noindex. |
| `/games/$slug` | `FINAL_CURRENT` | F02 technical implementation + mandatory SEO/final-copy recertification merged; final terminal evidence is recorded in Issue #29. |

## B. Public competitive routes requiring current-law recertification

| Route | Status | Why it is not current-law final |
|---|---|---|
| `/` | `NEEDS_RECERTIFICATION` | Strong design/reference page and metadata exist, but no complete current official-doc + design + SEO-research + production-contract + route evidence chain. |
| `/tournaments` | `NEEDS_RECERTIFICATION` | Useful URL-driven discovery exists, but predates the full final-page/SEO evidence system. |
| `/games` | `NEEDS_RECERTIFICATION` | Uses direct local tournament/game data in the route; no current-law listing contract/SEO workstream. |
| `/centers` | `NEEDS_RECERTIFICATION` | Uses direct `gamingCenters` local data; no final repository/runtime contract or current SEO evidence. |
| `/centers/$id` | `NEEDS_RECERTIFICATION` | Uses local center/tournament lookups; lacks current final contract/SEO evidence and stable semantic center-slug decision. |
| `/ranking` | `NEEDS_RECERTIFICATION` | Reuses inherited ranking component; no dedicated final ranking contract/SSR/search-intent workstream. |
| `/players/$username` | `NEEDS_RECERTIFICATION` | Uses local ranking data and frontend `winRate` calculation; must move to authoritative player-profile/ranking contract. |
| `/host` | `NEEDS_RECERTIFICATION` | Public gaming-center acquisition route exists but has not passed current final page + SEO research gates. |
| `/rules` | `NEEDS_RECERTIFICATION` | Public rules route exists but has not been reconciled with current authoritative ruleset/product copy/SEO evidence. |

## C. Known rebuild routes

| Route | Status | Required truth |
|---|---|---|
| `/login` | `REBUILD` | Current UI is password-oriented. Final truth is phone OTP + Django Session + CSRF; no localStorage bearer auth. |
| `/register` | `REBUILD` | Current form requests name/email/mobile/password and has no final OTP/account flow. Must be rebuilt with accepted P01 auth truth. |

## D. Player dashboard routes that are explicit placeholders

These routes currently use `DashboardSectionPlaceholder`, including user-facing language that says the section will be enabled later / after service connection. That wording directly violates final-delivery law.

`/dashboard/tournaments` left this list when F03 started and is tracked as `IN_PROGRESS` in section A.

| Route | Status | Planned product workstream |
|---|---|---|
| `/dashboard/matches` | `PLACEHOLDER` | My Matches |
| `/dashboard/challenges` | `PLACEHOLDER` | Challenge Hub |
| `/dashboard/rivalries` | `PLACEHOLDER` | Rivalry |
| `/dashboard/achievements` | `PLACEHOLDER` | Achievements |
| `/dashboard/notifications` | `PLACEHOLDER` | Notifications |
| `/dashboard/settings` | `PLACEHOLDER` | Settings |
| `/dashboard/teams` | `PLACEHOLDER` | Team / Clan operations |

## E. Private dashboard route requiring recertification

| Route | Status | Note |
|---|---|---|
| `/dashboard/profile` | `NEEDS_RECERTIFICATION` | Existing profile page predates the current final-page contract/evidence system; rebuild/polish as final Profile Edit flow. |

## F. Inherited legacy / ecommerce / non-competitive routes

These routes are present in the repository but are **not** approved as Turnoment competitive product architecture. Do not copy their data flow, auth assumptions, page state or UI patterns into new competitive workstreams.

### Commerce / checkout legacy

- `/cart`
- `/checkout`
- `/products`
- `/products/$slug`
- `/category/$slug`
- `/payment/result`
- `/dashboard/orders`
- `/dashboard/addresses`
- `/dashboard/wishlist`

Status: `LEGACY_REVIEW`

### Service/ecommerce legacy

- `/services`
- `/services/request`
- `/dashboard/services`

Status: `LEGACY_REVIEW`

### General-site/content legacy requiring product decision

- `/about`
- `/blog`
- `/blog/$slug`
- `/contact`
- `/faq`

Status: `LEGACY_REVIEW`

These paths may later be intentionally repurposed as Turnoment corporate/content routes, but only after a dedicated scope decision and the applicable final-page/SEO protocol. Their current existence is not evidence of final acceptance.

## G. Compliance priorities

Current exact order unless continuity records a newer accepted dependency:

1. **complete active F03 My Tournaments `/dashboard/tournaments`**;
2. My Matches `/dashboard/matches`;
3. Result Submission;
4. Dispute;
5. Challenge Hub / Detail;
6. Rivalry Detail;
7. Auth / OTP (`/login`, `/register`);
8. Notifications / Settings;
9. recertify remaining public competitive routes (`/`, `/tournaments`, `/games`, `/centers*`, `/ranking`, `/players/$username`, `/host`, `/rules`) in controlled workstreams;
10. make explicit keep/remove/repurpose decisions for `LEGACY_REVIEW` routes before production delivery.

## H. Registry maintenance law

- A route cannot be promoted to `FINAL_CURRENT`, `FINAL_PRIVATE`, or `FINAL_PRE_SEO` from chat memory.
- Promotion requires merged evidence and terminal main CI; when a closeout commit cannot contain its own future merge SHA/terminal CI, terminal evidence is recorded in the tracking Issue and must be green before the phase is reported DONE.
- New routes must be added when their workstream begins.
- Placeholder/legacy routes must remain visible here until rebuilt or intentionally removed.
- If implementation truth and this registry conflict, treat the route as **not final** until the conflict is reconciled.
