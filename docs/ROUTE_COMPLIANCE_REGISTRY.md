# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.
>
> Every chat/agent modifying an existing route MUST read this registry together with `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, and when applicable `SEO_FINAL_COPY_PROTOCOL.md`.

Last audit: `2026-09-10`

Audit baseline: `74f0e25275ea2bb64ee374c0ea0f8e50e519c3d9` — F10 implementation merge; post-implementation main Quality Gate `34473462713` PASS; artifact `10150600270`; digest `sha256:b503925b92b89bd9a27eb0d1d20ac900b7bbbd69024eaefb5865c91bc169234c`.

F10 `/dashboard/notifications` is promoted non-recursively to `FINAL_PRIVATE` because implementation is merged and post-implementation main QA is green. The F10 workstream itself is not terminally `DONE / MERGED / FROZEN` until documentation-only closeout merge + terminal frozen-main CI/artifact are recorded in Issue #59.

F09 terminal truth: frozen main `34d6a576691532e4228b2eecc0fea1c1d296d58e`, terminal gate `34468048698` PASS, artifact `10148453532`, Issue #56 CLOSED / COMPLETED.

## Status meanings

- `FINAL_CURRENT` — accepted under the current applicable protocol set, including current SEO/final-copy law for public/indexable pages.
- `FINAL_PRIVATE` — final private/noindex route; public SEO research is not applicable, but final architecture/UX/contracts are accepted.
- `FINAL_PRE_SEO` — technically/factually final under page protocol but frozen before the stricter SEO final-copy law.
- `IN_PROGRESS` — active controlled workstream exists; not final until its required acceptance chain is complete.
- `NEEDS_RECERTIFICATION` — route exists but has not passed the full current-law evidence chain.
- `PLACEHOLDER` — intentionally incomplete/temporary product surface; must be rebuilt before product acceptance.
- `REBUILD` — known product/architecture truth is wrong and must be rebuilt rather than patched as-is.
- `LEGACY_REVIEW` — inherited non-Turnoment/ecommerce/general-site route; not an approved competitive architecture reference.

## A. Accepted / active competitive routes

| Route | Status | Evidence / exact truth |
|---|---|---|
| `/dashboard` | `FINAL_PRIVATE` | Player Dashboard productionization + closeout accepted; private session/repository/runtime contract. |
| `/dashboard/tournaments` | `FINAL_PRIVATE` | F03 terminally frozen. Main `df7c4e8c6c60c35616bba1143814b5d2a7a408c7`; gate `34386636373` PASS; Issue #38 completed. |
| `/dashboard/matches` | `FINAL_PRIVATE` | F04 terminally frozen. Main `864fe1491739b06c763be487a73a589c7e0f3609`; gate `34391019079` PASS; Issue #41 completed. |
| `/dashboard/profile` | `FINAL_PRIVATE` | F09 terminally frozen. Main `34d6a576691532e4228b2eecc0fea1c1d296d58e`; terminal gate `34468048698` PASS; Issue #56 completed. |
| `/dashboard/notifications` | `FINAL_PRIVATE` | F10 implementation accepted/merged. START `34d6a576691532e4228b2eecc0fea1c1d296d58e`; clean final implementation head `0629febdebda58a1d0373e005aa80999e1a75623`; exact-head gate `34472707498` PASS; PR #60 gate `34473099462` PASS; implementation merge `74f0e25275ea2bb64ee374c0ea0f8e50e519c3d9`; post-main gate `34473462713` PASS. Runtime notification APIs remain `FRONTEND MOCK / BACKEND PENDING`. F10 terminal closeout remains Issue #59. |
| `/matches/$id/result` | `FINAL_PRIVATE` | F05 terminally frozen. Main `0407a925974d50b4a75af292231bacb48c66eb38`; gate `34407220433` PASS; Issue #44 completed. Runtime result APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/matches/$id/dispute` | `FINAL_PRIVATE` | F06 terminally frozen. Main `e87798a0463677b4da68ee28b80b5e58a91a1883`; gate `34412405721` PASS; Issue #47 completed. Runtime dispute APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/login` | `FINAL_PRIVATE` | F07 terminally frozen. Main `0932bef621cf22d3d7a7a95360613061e75d805f`; terminal gate `34453295788` PASS; Issue #50 completed. Phone OTP, Django Session + CSRF, no password/local bearer auth. |
| `/register` | `FINAL_PRIVATE` | F08 terminally frozen. Main `9876e5e6c47b42f9f2574f1675de6dab9ba1cc7f`; terminal gate `34458480652` PASS; Issue #53 completed. |
| `/tournaments/$id` | `FINAL_PRE_SEO` | F01 terminally accepted before current strict SEO final-copy protocol. |
| `/tournaments/$id/register` | `FINAL_PRIVATE` | F01 final tournament-registration action route; private noindex and Session/CSRF boundary accepted. |
| `/games/$slug` | `FINAL_CURRENT` | F02 technical + SEO/final-copy acceptance terminally recorded in Issue #29. |

## B. Public competitive routes requiring current-law recertification

| Route | Status | Why it is not current-law final |
|---|---|---|
| `/` | `NEEDS_RECERTIFICATION` | No complete current official-doc + design + SEO + production-contract + evidence chain. |
| `/tournaments` | `NEEDS_RECERTIFICATION` | Discovery route predates the full final-page/SEO evidence system. |
| `/games` | `NEEDS_RECERTIFICATION` | Local direct data usage; no current-law listing contract/SEO workstream. |
| `/centers` | `NEEDS_RECERTIFICATION` | Local direct data; no final repository/runtime contract/current SEO evidence. |
| `/centers/$id` | `NEEDS_RECERTIFICATION` | Local lookups; lacks current final contract/SEO evidence and stable public identifier decision. |
| `/ranking` | `NEEDS_RECERTIFICATION` | No dedicated final ranking contract/SSR/search-intent workstream. |
| `/players/$username` | `NEEDS_RECERTIFICATION` | Uses local ranking data/frontend-derived values; must move to authoritative player/rating contract. |
| `/host` | `NEEDS_RECERTIFICATION` | Public acquisition route has not passed current final page + SEO gates. |
| `/rules` | `NEEDS_RECERTIFICATION` | Must be reconciled with authoritative ruleset/product copy and current evidence law. |

## C. Known rebuild routes

No currently accepted auth/account route remains in `REBUILD`.

Any future route enters `REBUILD` only through explicit source/product audit evidence.

## D. Player dashboard routes that remain explicit placeholders

| Route | Status | Planned product workstream |
|---|---|---|
| `/dashboard/challenges` | `PLACEHOLDER` | Challenge Hub. Lovable planning/output does not become accepted implementation until its own controlled evidence chain lands. |
| `/dashboard/rivalries` | `PLACEHOLDER` | Rivalry. |
| `/dashboard/achievements` | `PLACEHOLDER` | Achievements. |
| `/dashboard/settings` | `PLACEHOLDER` | Settings. |
| `/dashboard/teams` | `PLACEHOLDER` | Team / Clan operations. |

## E. Private dashboard routes requiring recertification

No currently identified private account route remains in this section. Any newly discovered route must be added through source audit.

## F. Inherited legacy / ecommerce / non-competitive routes

Commerce / checkout legacy:
- `/cart`
- `/checkout`
- `/products`
- `/products/$slug`
- `/category/$slug`
- `/payment/result`
- `/dashboard/orders`
- `/dashboard/addresses`
- `/dashboard/wishlist`

Service/ecommerce legacy:
- `/services`
- `/services/request`
- `/dashboard/services`

General content requiring explicit product decision:
- `/about`
- `/blog`
- `/blog/$slug`
- `/contact`
- `/faq`

All above remain `LEGACY_REVIEW`.

## G. Accepted private account / player truth

### `/login` — F07
`validated optional redirect → SSR loader → typed LoginAuthRepository → runtime-validated adapter → OTP Login UI`

### `/register` — F08
`validated optional redirect → route loader/session preflight → typed LoginAuthRepository → runtime-validated P01 actions → OTP Account Onboarding UI`

### `/dashboard/profile` — F09
`private dashboard access policy → route loader → typed PlayerProfileRepository → runtime-validated P01 player/profile payload → Profile UI`

### `/dashboard/notifications` — F10
`private dashboard access policy → validated state/kind/page → loader → typed PlayerNotificationsRepository → runtime-validated projection → Notifications Inbox UI`

Shared permanent invariants:
- Django Session authority;
- P01 CSRF bootstrap + `credentials: include` + `X-CSRFToken` on unsafe calls;
- no localStorage/sessionStorage bearer token;
- private `noindex,nofollow`;
- final Persian copy/accessibility/responsive states;
- QA fixture is test-only and shares the permanent production contract.

F10-specific truth:
- backend owns recipient/list/content/read/order/summary/pagination truth;
- mark-one and mark-all are explicit actions;
- frontend does not optimistically own unread count;
- typed targets only; arbitrary href/open redirect is rejected;
- Challenge Detail URL is not invented;
- backend docs alignment is terminally accepted but runtime notification domain is not implemented yet.

## H. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## I. Compliance priorities

F10 terminal closeout is the immediate governance task until Issue #59 is completed.

After F10 terminal freeze, the next independent controlled placeholder is `/dashboard/settings` unless product priority explicitly selects another independent route.

Challenge Hub / Detail remains isolated under its own Lovable + acceptance chain and must not be modified by unrelated workstreams.

Then continue with Rivalry/other placeholders as product contracts become explicit, recertify remaining public competitive routes, and decide keep/remove/repurpose for `LEGACY_REVIEW` routes before production delivery.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## J. Registry maintenance law

- A route cannot be promoted from chat memory.
- A merged implementation with required green post-implementation main gate may be promoted non-recursively in closeout governance.
- Terminal workstream `DONE / MERGED / FROZEN` additionally requires closeout merge + terminal main CI recorded in its tracking Issue.
- New/placeholder/legacy routes remain visible until accepted or intentionally removed.
- If implementation truth and this registry conflict, treat the route as not final until reconciled.
