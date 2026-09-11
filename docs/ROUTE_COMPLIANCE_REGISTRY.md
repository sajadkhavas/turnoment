# TURNOMENT — FRONTEND ROUTE COMPLIANCE REGISTRY

> Canonical inventory for deciding whether an existing route may be treated as final under current Turnoment delivery laws.
>
> Every chat/agent modifying an existing route MUST read this registry together with `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, and when applicable `SEO_FINAL_COPY_PROTOCOL.md`.

Last audit: `2026-09-11`

Audit baseline: `7ac7028d99d7088d0d3e079602a8ea3820ddb599` — F14 implementation merge; post-implementation main Frontend Quality Gate `34568920416` PASS; artifact `10187123251`; digest `sha256:8596f2fcbc58a7e290ce5d82cb43bae62a35e0defcd59887ed9bb411c6c1b2ac`.

F14 `/dashboard/teams` is promoted non-recursively to `FINAL_PRIVATE` because its implementation is merged and required post-implementation main QA is green. The F14 workstream itself is not terminally `DONE / MERGED / FROZEN` until documentation-only closeout merge plus terminal frozen-main CI/artifact/digest are recorded in Issue #71.

F13 terminal truth: frozen main `80d367fbf9da858a2c1cfb64df4714f136ff2c4c`; terminal gate `34537474356` PASS; artifact `10176084983`; digest `sha256:f7af1a069ed839cdec7da9bfa6b2f2ee0b8d95c8609811e24903aa2c9d01397b`; Issue #68 CLOSED / COMPLETED.

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
| `/dashboard/tournaments` | `FINAL_PRIVATE` | F03 terminally frozen; Issue #38 completed. |
| `/dashboard/matches` | `FINAL_PRIVATE` | F04 terminally frozen; Issue #41 completed. |
| `/dashboard/profile` | `FINAL_PRIVATE` | F09 terminally frozen; Issue #56 completed. |
| `/dashboard/notifications` | `FINAL_PRIVATE` | F10 terminally frozen; Issue #59 completed. Runtime notification APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/settings` | `FINAL_PRIVATE` | F11 terminally frozen; Issue #62 completed. Runtime settings APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/rivalries` | `FINAL_PRIVATE` | F12 terminally frozen; Issue #65 completed. Runtime Rivalries API remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/achievements` | `FINAL_PRIVATE` | F13 terminally frozen; frozen main `80d367fbf9da858a2c1cfb64df4714f136ff2c4c`; terminal gate `34537474356` PASS; artifact `10176084983`; Issue #68 completed. Runtime Achievements API remains `FRONTEND MOCK / BACKEND PENDING`. |
| `/dashboard/teams` | `FINAL_PRIVATE` | F14 implementation accepted/merged. START `80d367fbf9da858a2c1cfb64df4714f136ff2c4c`; final reviewed head `2b66225dea1d30bb15a5dd7429fccab768440100`; exact-head gate `34539835524` PASS; PR #72 gate `34540376537` PASS; implementation merge `7ac7028d99d7088d0d3e079602a8ea3820ddb599`; post-main gate `34568920416` PASS; artifact `10187123251`; digest `sha256:8596f2fcbc58a7e290ce5d82cb43bae62a35e0defcd59887ed9bb411c6c1b2ac`. Runtime Teams API remains `FRONTEND MOCK / BACKEND PENDING`. F14 terminal closeout remains Issue #71. |
| `/matches/$id/result` | `FINAL_PRIVATE` | F05 terminally frozen; Issue #44 completed. Runtime result APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/matches/$id/dispute` | `FINAL_PRIVATE` | F06 terminally frozen; Issue #47 completed. Runtime dispute APIs remain `FRONTEND MOCK / BACKEND PENDING`. |
| `/login` | `FINAL_PRIVATE` | F07 terminally frozen; Phone OTP, Django Session + CSRF, no password/local bearer auth. |
| `/register` | `FINAL_PRIVATE` | F08 terminally frozen; Issue #53 completed. |
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

## D. Player dashboard routes that remain explicit placeholders

| Route | Status | Planned product workstream |
|---|---|---|
| `/dashboard/challenges` | `PLACEHOLDER` | Challenge Hub. Lovable planning/output does not become accepted implementation until its own controlled evidence chain lands. |

`/dashboard/rivalries`, `/dashboard/achievements`, and `/dashboard/teams` are no longer placeholders; they are listed in section A as `FINAL_PRIVATE`.

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

### `/dashboard/settings` — F11
`private dashboard access policy → loader → typed PlayerSettingsRepository → runtime-validated settings projection → Settings UI`

### `/dashboard/rivalries` — F12
`private dashboard access policy → validated game/kind/sort/page search → loader → typed PlayerRivalriesRepository → runtime-validated rivalry projection → Rivalries UI`

### `/dashboard/achievements` — F13
`private dashboard access policy → validated status/category/sort/page search → loader → typed PlayerAchievementsRepository → runtime-validated achievement projection → Achievements UI`

### `/dashboard/teams` — F14
`private dashboard access policy → validated team/page search → loader → typed PlayerTeamsRepository → runtime-validated current-player team membership/roster projection → Teams UI`

Shared permanent invariants:
- Django Session authority;
- P01 CSRF bootstrap + `credentials: include` + `X-CSRFToken` on unsafe calls;
- no localStorage/sessionStorage bearer token;
- private `noindex,nofollow`;
- final Persian copy/accessibility/responsive states;
- QA fixture is test-only and shares the permanent production contract.

F14-specific truth:
- membership, stable team identity/name, role, member count, selected-team resolution, roster membership/roles, summary and roster pagination are backend/repository-owned;
- frontend never reconstructs current team membership/role from tournament history;
- unauthorized/unknown requested team IDs use non-enumerating `selectionState=unavailable`;
- no team mutation, capacity, public/private visibility, rating/ranking, tournament/challenge eligibility or Team Detail behavior is introduced;
- `/dashboard/challenges` remains isolated;
- backend docs alignment is terminally accepted, but runtime Teams domain/endpoint is not implemented yet.

## H. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth.

## I. Compliance priorities

F14 documentation-only closeout is the immediate governance task until Issue #71 is completed.

Challenge Hub remains isolated under its own Lovable + acceptance chain and must not be modified by unrelated workstreams.

After F14 terminal freeze, no independent dashboard placeholder remains except that deliberately isolated Challenge Hub. The next non-Challenge page workstream must be selected from current-law public recertification or an explicitly approved legacy/product decision.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.

## J. Registry maintenance law

- A route cannot be promoted from chat memory.
- A merged implementation with required green post-implementation main gate may be promoted non-recursively in closeout governance.
- Terminal workstream `DONE / MERGED / FROZEN` additionally requires closeout merge + terminal main CI recorded in its tracking Issue.
- New/placeholder/legacy routes remain visible until accepted or intentionally removed.
- If implementation truth and this registry conflict, treat the route as not final until reconciled.
