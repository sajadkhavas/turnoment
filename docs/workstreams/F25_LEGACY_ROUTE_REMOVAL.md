# F25 — Non-Turnoment Legacy Route Removal

Status: `IMPLEMENTATION CANDIDATE`

Tracking Issue: `#113`

START_SHA: `faf2b18287484d2ed78094589fe2db80f2841f55`

Branch: `phase/f25-remove-legacy-routes`

## Product decision

The product owner explicitly decided that all existing `LEGACY_REVIEW` routes unrelated to the Turnoment tournament product are to be removed, not recertified or redesigned.

## Removed route scope

- `/about`
- `/blog`
- `/blog/$slug`
- `/cart`
- `/category/$slug`
- `/checkout`
- `/contact`
- `/faq`
- `/payment/result`
- `/products`
- `/products/$slug`
- `/services`
- `/services/request`
- `/dashboard/addresses`
- `/dashboard/orders`
- `/dashboard/services`
- `/dashboard/wishlist`

## Root cleanup

The legacy Iran Mehr Afzar application shell was still mounted from `src/routes/__root.tsx`. F25 removes the global cart provider and legacy `SiteLayout` dependency, switches the root 404 surface to the Turnoment tournament layout, and replaces inherited ecommerce default metadata with Turnoment defaults.

The legacy `src/components/site/*`, `src/lib/cart-store.tsx`, and `src/lib/mock-data.ts` are removed because their production purpose was the deleted ecommerce/service surface.

## Router generation

`src/routeTree.gen.ts` is generated output and is intentionally removed from the candidate tree so the official TanStack/Vite production build regenerates it from the surviving file routes. F25 acceptance must prove the generated tree contains no removed legacy route and all accepted routes remain present.

## Protected scope

F25 must not materially change accepted Turnoment route implementations. Public competitive routes, auth, accepted player/dashboard routes, result/dispute routes, and `/tournaments/$id` remain protected.

## Acceptance requirements

- exact compare from START;
- all 17 legacy route files absent;
- no legacy SiteLayout/cart/mock-catalog production dependency;
- official production build regenerates the route tree successfully;
- lint/build/typecheck/tests PASS;
- responsive/browser smoke for accepted routes PASS;
- relevant frozen-route regression gates PASS;
- no package/lock/dependency/backend mutation;
- implementation PR reviewed and merged with expected-head lock;
- post-main acceptance before Issue #113 can close completed.
