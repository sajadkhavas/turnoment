# TURNOMENT — FINAL FRONTEND PAGE DELIVERY PROTOCOL

> **MANDATORY FOR EVERY FRONTEND PAGE WORKSTREAM**
>
> Every chat/agent/session that creates, rebuilds, productionizes, or materially edits a Turnoment frontend page MUST read this file and `PROJECT_CONTINUITY.md` before implementation. For every public/indexable page or material public copy change it MUST also read `SEO_FINAL_COPY_PROTOCOL.md`. A page is built once as the final frontend implementation; architecture, SSR, routing, SEO/indexing, SEO research/final copy, accessibility, responsive behavior, runtime contracts, error states, and quality gates are part of the page itself, not a later repair phase.

## 1. Non-negotiable product rule

Turnoment does not ship disposable UI layers.

A page may use deterministic fixture data for local development, automated tests, and visual verification, but the page structure and state model MUST match the production contract from the first implementation.

User-visible product copy MUST NOT contain implementation-stage language such as:

- waiting for backend
- waiting for server
- backend not connected
- API not connected
- mock/demo/placeholder mode
- temporary version
- coming after backend connection
- similar engineering-status language that would not belong in the final product

Engineering/test fixtures are an internal implementation concern only and MUST NOT alter final user-facing behavior or copy.

For public/indexable pages, visible copy is also part of the final SEO deliverable. Engineering/domain language must be translated into natural, accurate, researched product language before acceptance.

## 2. Required workflow before implementation

Every page workstream MUST execute these stages in order.

### Stage A — Exact repository lock

1. Read `PROJECT_CONTINUITY.md`.
2. Read this file.
3. For a public/indexable page or material public copy change, read `SEO_FINAL_COPY_PROTOCOL.md`.
4. Verify current frontend `main` SHA.
5. Identify active/overlapping workstreams and shared-file ownership.
6. Create a dedicated branch from the verified SHA.
7. Record START_SHA and page scope.

### Stage B — Official documentation audit

Before writing implementation code, review the current official documentation relevant to the page.

Minimum sources when applicable:

- TanStack Start — framework/SSR/server execution
  - https://tanstack.com/start/latest
- TanStack Start — selective SSR
  - https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr
- TanStack Router — route/data-loading/search/params contracts
  - https://tanstack.com/router/latest/docs/guide/data-loading
  - https://tanstack.com/router/latest/docs/guide/search-params
- TanStack Router — document head management
  - https://tanstack.com/router/latest/docs/guide/document-head-management
- TanStack Start — environment variables
  - https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables
- W3C WCAG 2.2 for accessibility requirements
  - https://www.w3.org/TR/WCAG22/
- Google Search Central for public/indexable page SEO decisions
  - SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
  - people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
  - title links: https://developers.google.com/search/docs/appearance/title-link
  - snippets/meta descriptions: https://developers.google.com/search/docs/appearance/snippet
  - link best practices: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
  - URL structure: https://developers.google.com/search/docs/crawling-indexing/url-structure
  - canonicalization: https://developers.google.com/search/docs/crawling-indexing/canonicalization
  - structured-data policy: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
  - spam policies: https://developers.google.com/search/docs/essentials/spam-policies

The workstream MUST add page-specific official references when its behavior depends on another standard, library, security model, browser API, or SEO feature.

Do not copy an old implementation pattern merely because it already exists in the repository when current official documentation indicates a better/correct approach.

### Stage C — Design reference audit

Before UI implementation:

1. Inspect the existing Turnoment design masters and tokens first.
2. Research current, high-quality interfaces that solve the same page problem.
3. Prefer real product patterns over generic dashboard/template galleries.
4. Extract interaction/layout ideas; do not clone branding or copyrighted assets.
5. Select a design direction that fits Turnoment's established RTL premium-esports system.
6. Record the important reference findings in the workstream/PR/continuity evidence when they materially affect the design.

The purpose of external design research is to improve information architecture, hierarchy, interaction patterns, responsive behavior, and competitive-product quality — not to replace Turnoment's visual identity.

### Stage D — SEO research and final-copy plan

Required for every public/indexable page before final copy is accepted:

1. define page purpose and intended audience;
2. research current search intent and relevant current SERP/content patterns;
3. select the primary topic/query cluster;
4. select secondary/supporting topic clusters and important entities/terms;
5. evaluate Persian/English naming, common spellings/transliterations and local intent when relevant;
6. identify content gaps Turnoment can answer better or more clearly;
7. check for cannibalization with existing Turnoment routes;
8. decide final H1, title, description, heading outline, internal-link/anchor strategy and structured-data eligibility;
9. review all final visible copy for natural language, usefulness, accuracy and search-engine-first/keyword-stuffing risk;
10. record the evidence using `SEO_FINAL_COPY_PROTOCOL.md` and `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md`.

Do not invent search-volume numbers, keyword difficulty, popularity claims or ranking guarantees.

## 3. Final architecture gate

Every page MUST be designed around the permanent frontend boundary:

`Route → validated params/search → route access policy → loader → typed repository/service contract → runtime-validated response → UI`

Deterministic fixture implementations may satisfy the same repository interface for local development/test/visual QA. Production data adapters MUST implement the same contract, so switching environments does not require rewriting the page component tree.

Frontend MUST NOT authoritatively calculate server-owned truth such as:

- authentication/session truth
- tournament lifecycle truth
- registration eligibility
- capacity truth
- bracket truth
- match winner/final result
- rating changes
- challenge eligibility
- payment/refund/settlement truth
- moderation/dispute decisions

The page must render authoritative states supplied through its contract.

## 4. Routing and SSR gate

For every page:

- use TanStack file-based routing and `createFileRoute`
- use stable semantic route params/slugs where appropriate
- validate URL search state before consumption
- keep shareable/filterable state in the URL when it represents navigation state
- public important content must be SSR-renderable unless a documented technical reason requires otherwise
- avoid browser-only data loading for crawlable primary content
- use route pending/error/notFound boundaries where applicable
- authenticated pages must have a route UX access policy while protected data remains independently authorized by the production API

No later "SSR repair" or "router repair" phase is accepted for pages created under this protocol.

## 5. SEO / indexing / final-copy gate

### Public/indexable pages

A public page is incomplete until both technical SEO and researched final copy are accepted.

Decide and implement during the page workstream:

- page purpose and intended audience
- primary search intent
- primary topic/query cluster
- secondary/supporting topics/entities
- final H1 and heading hierarchy
- final user-facing copy for all meaningful sections
- final title
- meta description
- canonical URL
- robots policy
- Open Graph/social metadata when relevant
- semantic URL/slug strategy
- crawlable internal links with descriptive anchors
- structured data only when the visible content and Google's current guidelines support it
- final people-first / keyword-stuffing / unsupported-claim review

The complete rules are in `SEO_FINAL_COPY_PROTOCOL.md`.

Do not add schema merely to have schema. Do not write keyword-heavy or engineering-style copy merely because title/meta/canonical exist.

### Private/account pages

Use explicit `noindex` policy and do not expose user-specific/private content as indexable landing pages. Copy must still be final, natural product language; only public search research requirements may be non-applicable.

No later generic "SEO phase" may be required to add basic on-page SEO, keyword/search-intent research, final page copy, metadata, internal linking, canonical/indexing or supported structured-data decisions to pages created under this protocol. Future site-wide SEO work may analyze performance, Search Console data, new opportunities and strategy without rebuilding or finishing unfinished page fundamentals.

## 6. UI state completeness gate

A page is incomplete unless all relevant final states exist.

At minimum evaluate:

- normal
- loading/pending
- empty
- error/retry
- not found
- unauthorized/session-expired for private flows
- disabled/unavailable based on real business state
- success/confirmation where actions exist
- validation errors for forms
- concurrency/stale-state outcomes where applicable

Do not expose raw HTTP/server errors to end users.

## 7. Accessibility gate

Target WCAG 2.2 AA where applicable.

Required baseline:

- semantic landmarks/headings
- real buttons/links/forms instead of clickable generic containers
- keyboard operability
- visible focus state
- labels/instructions for controls
- status communicated by text/semantics, not color alone
- adequate contrast
- dialogs/sheets with correct focus behavior
- status messages exposed accessibly
- logical RTL reading/navigation order

## 8. Responsive and visual QA gate

At minimum verify the page at representative widths:

- 375px
- 390px
- 430px
- 768px
- 1024px
- 1440px

Required outcomes:

- no horizontal overflow
- readable Persian typography
- safe long-name wrapping
- usable touch targets
- no desktop-only interaction dependency
- stable layout during loading/content changes where practical
- Turnoment visual identity remains consistent

## 9. Production-contract gate

Before a page can be `DONE`:

- define stable IDs/keys instead of display-name relationships
- define typed domain/page contracts
- runtime-validate external/network payloads
- keep fixtures outside presentation components
- define action request/response/error states for interactive flows
- document the API/domain mapping required by the page
- ensure production adapter replacement does not require UI reconstruction

A page that only looks finished but lacks its final data/action contract is NOT complete.

## 10. Quality gate

Every completed page workstream must pass the repository's required CI, including at minimum where configured:

1. frozen dependency install
2. lint correctness
3. TypeScript typecheck
4. page/domain contract tests
5. production build

Add targeted tests for critical route/search/runtime/action behavior introduced by the page.

For public pages, acceptance evidence must also show the SEO/final-copy gate was completed. A green technical CI does not override missing SEO/content evidence.

Do not weaken quality gates to make a phase green.

## 11. Completion and continuity gate

Before ending every page session — complete, partial, blocked, or merge-ready — update `PROJECT_CONTINUITY.md` with:

- page/workstream name
- status
- START_SHA
- branch
- important implementation decisions
- official-source audit result
- design-reference audit result
- SEO/search-intent/final-copy audit result when applicable
- files/contracts/routes owned by the workstream
- tests/CI evidence
- blockers, if any
- exact NEXT

For completed work additionally record:

- final reviewed branch SHA
- PR number
- review thread count
- merge SHA
- post-merge main CI
- final accepted/frozen main SHA where applicable

No chat may claim `DONE / MERGED / FROZEN` without repository evidence.

## 12. Definition of DONE for a page

A Turnoment frontend page is `DONE` only when all applicable items are true:

- official documentation reviewed
- suitable design references reviewed
- for public pages, search intent/topic research completed and recorded
- final original people-first copy implemented
- permanent route architecture implemented
- SSR/indexing policy implemented
- final SEO research/copy/metadata/internal-linking fundamentals implemented when public
- final access/indexing policy implemented when private
- typed production contract implemented
- runtime validation implemented for network boundaries
- all meaningful UI states implemented
- accessibility baseline implemented
- responsive behavior verified
- quality gates green
- PR reviewed/merged
- post-merge CI green
- `PROJECT_CONTINUITY.md` updated

Anything less must remain `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `BLOCKED`, or `READY TO MERGE`.
