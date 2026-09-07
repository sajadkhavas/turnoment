# Turnoment Frontend Engineering Rules

This document defines the production frontend architecture. It applies to every new or productionized route.

## 1. Page architecture

Backend-authoritative pages must use this dependency direction:

`Route -> validated params/search -> loader -> repository port -> active adapter -> UI`

Routes and presentational components must not import backend-authoritative mock records directly once the route is marked production-ready.

Mock data is allowed only behind a typed adapter while the Django endpoint is unavailable.

## 2. Search parameters

Search parameters are untrusted input.

- Validate/sanitize them in `validateSearch`.
- Convert validated search into deterministic loader dependencies with `loaderDeps` when the loader result depends on search.
- Do not store discovery/filter truth in `localStorage`.
- Keep default search values out of the URL when practical.

This follows TanStack Router's data-loading/search dependency model.

## 3. Route data loading and SSR

Important public pages must be loader-driven and SSR-friendly from the beginning.

Examples:

- homepage discovery data
- tournaments
- tournament detail
- games / game detail
- gaming centers
- public player profiles
- rankings
- rivalries
- stories

Do not create an empty client shell whose critical public content appears only after `useEffect`.

Every important route must define appropriate pending, error, empty and not-found behavior.

## 4. Repository ports and adapters

A repository interface represents the frontend's data contract.

Current tournament example:

- `repositories/tournament-repository.ts` — port
- `repositories/mock-tournament-repository.ts` — temporary local adapter
- `repositories/http-tournament-repository.ts` — Django HTTP adapter boundary
- `repositories/tournaments.ts` — composition root

Swapping mock data for Django must happen at the composition boundary, not through rewrites inside page components.

## 5. Runtime API validation

TypeScript types disappear at runtime. HTTP responses therefore must be validated before they enter the UI.

Use Zod schemas at external-data boundaries. A backend response that violates the frozen frontend contract must fail explicitly instead of silently corrupting page assumptions.

## 6. API configuration and secrets

`VITE_*` variables are public client configuration and MUST NOT contain secrets.

`VITE_API_BASE_URL` may contain the public backend base URL only.

Read environment configuration through functions rather than freezing request-sensitive values at module initialization.

Authentication/session secrets, provider credentials, private API keys and signing material never belong in frontend environment variables or Git.

## 7. SEO and document head

Public indexable routes must define, as applicable:

- unique title
- description
- canonical URL
- Open Graph metadata
- stable crawlable content
- entity-specific structured data only when semantically accurate

Filtered discovery query strings do not automatically become independent canonical pages.

Private/account/operational routes must use explicit `noindex, nofollow` unless a product requirement says otherwise.

Central helpers live in `src/lib/seo.ts`.

## 8. Authentication boundary

Backend P01 defines Django Session + CSRF + OTP as the web authentication contract.

Frontend rules:

- do not invent localStorage bearer-token auth
- do not persist authentication truth in UI-only stores
- unsafe authenticated mutations must use the backend CSRF/session contract
- private route guards are added through the shared auth layer when frontend auth integration begins

## 9. Business truth

Frontend may format and present data, but must not decide authoritative business state such as:

- match winner
- tournament lifecycle transition
- registration acceptance
- rating changes
- payment success
- refund eligibility
- settlement state
- challenge eligibility

Those decisions belong to backend domain services/API responses.

## 10. Quality gates

Required CI direction:

1. install from frozen lockfile
2. ESLint correctness checks across the repository
3. TypeScript `tsc --noEmit` across the repository
4. contract/unit checks
5. production build
6. browser smoke/E2E gates for critical routes as they are introduced

Prettier is a formatter, not a correctness rule. Historical formatting debt from legacy ecommerce files must not be confused with runtime correctness. New/modified production code should still be formatted before merge.

## 11. Legacy ecommerce code

Legacy ecommerce routes are inherited code and are not the Turnoment product architecture.

Do not copy their cart/payment/account patterns into tournament features. Their isolation/removal is a separate controlled cleanup workstream.

## 12. Official references

Architecture decisions must be checked against current official documentation first:

- TanStack Router / Start: `tanstack.com`
- React: `react.dev`
- TypeScript: `typescriptlang.org`
- Zod: official Zod documentation
- Django/DRF contracts: `docs.djangoproject.com` and `django-rest-framework.org`

Blogs and forum posts may help diagnose problems but are not the primary architecture authority.
