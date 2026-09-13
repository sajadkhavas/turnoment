# F25 — Non-Turnoment Legacy Route Removal

Status: `IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Tracking Issue: `#113`

START_SHA: `faf2b18287484d2ed78094589fe2db80f2841f55`

Implementation branch: `phase/f25-remove-legacy-routes`

Implementation head: `f9200802c1d67899d018bf23de417fcce017c31c`

Implementation PR: `#114` — MERGED with expected-head lock.

Implementation merge/main / closeout base: `cb02d65ad9fc5c1d4a27ca775bcb5840f33026c1`

Closeout branch: `closeout/f25-remove-legacy-routes`

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

These routes are intentionally absent from Turnoment after F25 and are not future backlog merely because an historical README lists them.

## Root/orphan cleanup

F25 also removed inherited ecommerce/service production dependencies made unnecessary by the route deletion:
- legacy `src/components/site/*` shell/product UI;
- `src/lib/cart-store.tsx`;
- `src/lib/mock-data.ts`.

`src/routes/__root.tsx` no longer mounts the ecommerce `CartProvider` or legacy `SiteLayout`; the root not-found experience uses the Turnoment tournament layout and global fallback metadata identifies Turnoment.

## Generated router

`src/routeTree.gen.ts` is generated output and is not hand-authored by F25. The official TanStack/Vite production build regenerated routing from the surviving route files successfully before typecheck in both PR-context and exact-main QA.

## Protected scope

F25 did not intentionally modify accepted Turnoment page implementations. Public competitive routes, auth, accepted player/dashboard routes, result/dispute routes, and `/tournaments/$id` remain protected.

## Exact implementation evidence

Exact compare START → implementation head:
- ahead `1`;
- behind `0`;
- exactly one implementation commit;
- no package/lock/dependency/backend mutation.

PR #114 context:
- head `f9200802c1d67899d018bf23de417fcce017c31c`;
- base remained exact START before merge;
- mergeable `true`;
- unresolved review threads `0`;
- Full Frontend Quality `34760912403` — PASS;
- artifact `10319201127`;
- digest `sha256:03146af8f55b263b353a9170d43be1cd06e566d816a6c02291af4bd16f767e6d`;
- install/lint/build+route-generation/typecheck/contracts/browser responsive QA all PASS.

Expected-head merge produced implementation main:

`cb02d65ad9fc5c1d4a27ca775bcb5840f33026c1`

Exact-main acceptance:
- Full Frontend Quality `34761207642` — PASS;
- artifact `10319136486`;
- digest `sha256:944a5b64f199a653644c0510fb7966ea6da634f784536daad18697cc184c2e3d`;
- build+route-generation/typecheck/contracts/browser responsive QA all PASS.

Exact live `main` was reverified at `cb02d65ad9fc5c1d4a27ca775bcb5840f33026c1` after exact-main QA.

## Closeout

Closeout is documentation-only and must change exactly four Markdown files in exactly one commit. Runtime/source/package/workflow/backend mutation is forbidden.

Terminal closeout merge SHA, terminal frozen-main run IDs/artifacts/digests, and final live-main verification belong in Issue #113 after they exist. Do not create a recursive documentation commit solely to self-record those facts.

## NEXT

Complete F25 closeout. After terminal F25, `/tournaments/$id` remains the next public current-law recertification candidate. Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
