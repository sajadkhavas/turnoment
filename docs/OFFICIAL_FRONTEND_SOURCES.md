# TURNOMENT — OFFICIAL FRONTEND SOURCES

This file records authoritative sources that define the baseline engineering rules for frontend page workstreams. Page-specific workstreams MUST add or cite additional official sources when their behavior depends on other APIs, standards, SEO features, or libraries.

Last reviewed: `2026-09-09`

## TanStack Start / Router

### TanStack Start

- https://tanstack.com/start/latest
- Purpose: router-first application model, server request → route execution → hydration, SSR modes.

### Selective SSR

- https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr
- Purpose: initial requests are SSR by default; documents `ssr: true`, `data-only`, and client-only behavior.

### TanStack Router — data loading

- https://tanstack.com/router/latest/docs/guide/data-loading
- Purpose: route loaders and dependency-driven data loading.

### TanStack Router — search params

- https://tanstack.com/router/latest/docs/guide/search-params
- Purpose: typed/validated URL search state and navigation-owned filters.

### TanStack Router — document head

- https://tanstack.com/router/latest/docs/guide/document-head-management
- Purpose: route-level title, meta, canonical/link, social/head management.

### TanStack Start — environment variables

- https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables
- Purpose: public/client vs server-only environment boundaries; avoid exposing secrets in client bundles.

## Accessibility

### W3C WCAG 2.2

- https://www.w3.org/TR/WCAG22/
- Purpose: accessibility baseline, including keyboard operability, headings/labels, focus visibility, predictable interaction and accessible status messages.

## Search / SEO

### Google Search Central — canonicalization

- https://developers.google.com/search/docs/crawling-indexing/canonicalization
- Purpose: representative/canonical URL decisions for duplicate or parameterized content.

### Google Search Central — canonical signals

- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Purpose: `rel=canonical`, redirects and sitemap canonical signals.

### Google Search Central — structured data policy

- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Purpose: structured data must accurately represent visible page content and follow feature-specific requirements.

## Rule

Official-source review is a pre-implementation gate, not a post-build documentation task. The selected sources and the design/reference research that materially influence a page must be recorded in the page workstream evidence before it is accepted as final.
