# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under the current Turnoment delivery laws.
>
> Every chat/agent modifying an existing route MUST read this registry together with `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, and when applicable `SEO_FINAL_COPY_PROTOCOL.md`.

Last audit: `2026-09-10`

Audit baseline: `0407a925974d50b4a75af292231bacb48c66eb38` — F05 terminal frozen `main`; terminal Quality Gate `34407220433` PASS; Issue #44 closed completed.

## Status meanings

- `FINAL_CURRENT` — accepted under the current applicable protocol set, including current SEO/final-copy law for public/indexable pages.
- `FINAL_PRIVATE` — final private/noindex route; public SEO research is not applicable, but final page architecture/UX/contracts are accepted.
- `FINAL_PRE_SEO` — technically/factually final under the page protocol but frozen before the stricter SEO final-copy law; material public-copy work requires SEO recertification.
- `IN_PROGRESS` — active controlled workstream exists; not final until its required acceptance/closeout chain is complete.
- `NEEDS_RECERTIFICATION` — competitive/product route exists but has not passed the full current-law evidence chain.
- `PLACEHOLDER` — intentionally incomplete or user-visible temporary state; must be rebuilt before product acceptance.
- `REBUILD` — known product/architecture truth is wrong for Turnoment and the route must be rebuilt rather than patched as-is.
- `LEGACY_REVIEW` — inherited non-Turnoment/ecommerce/general-site route; not an approved competitive architecture reference.

## A. Accepted / active competitive routes

| Route | Status | Evidence / exact next |
|---|---|---|
| `/dashboard` | `FINAL_PRIVATE` | Player Dashboard productionization + closeout merged; private `noindex,nofollow`, session/repository/runtime contract accepted. |
| `/dashboard/tournaments` | `FINAL_PRIVATE` | F03 terminally frozen. Final main `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`; terminal Quality Gate `34386636373` PASS; Issue #38 completed. |
| `/dashboard/matches` | `FINAL_PRIVATE` | F04 terminally frozen. Final main `864fe1491739b06c763be487a73a589c7e0f3609`; terminal Quality Gate `34391019079` PASS; Issue #41 completed. F06 includes a bounded navigation correction restoring `submit-result` and adding `dispute` action links under full regression coverage. |
| `/matches/$id/result` | `FINAL_PRIVATE` | F05 terminally frozen. Final main `0407a925974d50b4a75af292231bacb48c66eb38`; terminal Quality Gate `34407220433` PASS; Issue #44 completed. Runtime remains `FRONTEND MOCK / BACKEND PENDING`. F06 adds the accepted disputed-state link to the dedicated Dispute route under regression coverage. |
| `/matches/$id/dispute` | `IN_PROGRESS` | F06 Match Dispute — START `0407a925974d50b4a75af292231bacb48c66eb38`; branch `phase/f06-dispute`; Issue #47; evidence `docs/workstreams/F06_DISPUTE.md`. New private route; final promotion requires implementation merge + closeout + terminal main CI. |
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

## D. Player dashboard routes that remain explicit placeholders

`/dashboard/tournaments` and `/dashboard/matches` are no longer placeholders.

| Route | Status | Planned product workstream |
|---|---|---|
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

These routes remain present but are not approved as Turnoment competitive architecture.

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

### Service/ecommerce legacy
- `/services`
- `/services/request`
- `/dashboard/services`

### General-site/content legacy requiring product decision
- `/about`
- `/blog`
- `/blog/$slug`
- `/contact`
- `/faq`

All above: `LEGACY_REVIEW`.

## G. Compliance priorities

Current exact order unless continuity records a newer accepted dependency:

1. **complete active F06 Match Dispute `/matches/$id/dispute`**;
2. Challenge Hub / Detail;
3. Rivalry Detail;
4. Auth / OTP (`/login`, `/register`);
5. Notifications / Settings;
6. recertify remaining public competitive routes (`/`, `/tournaments`, `/games`, `/centers*`, `/ranking`, `/players/$username`, `/host`, `/rules`) in controlled workstreams;
7. make explicit keep/remove/repurpose decisions for `LEGACY_REVIEW` routes before production delivery.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## H. Registry maintenance law

- A route cannot be promoted to `FINAL_CURRENT`, `FINAL_PRIVATE`, or `FINAL_PRE_SEO` from chat memory.
- Promotion requires merged implementation evidence and required green acceptance gates; terminal workstream `DONE / MERGED / FROZEN` additionally requires closeout merge and terminal main CI recorded in the tracking Issue.
- New routes must be added when their workstream begins.
- Placeholder/legacy routes must remain visible until rebuilt or intentionally removed.
- If implementation truth and this registry conflict, treat the route as **not final** until reconciled.
