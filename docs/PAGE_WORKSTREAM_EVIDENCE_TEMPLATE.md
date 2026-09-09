# TURNOMENT — PAGE WORKSTREAM EVIDENCE TEMPLATE

Every new/rebuilt frontend page should use this structure in its issue/PR/continuity evidence. Public/indexable pages must also complete `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md` and follow `SEO_FINAL_COPY_PROTOCOL.md`.

## Identity

- Workstream:
- Route(s):
- START_SHA:
- Branch:
- Owner chat/agent:
- Public/indexable or private/noindex:

## Official documentation audit

- Sources reviewed:
- Rules/decisions derived from the sources:
- Page-specific standards/APIs reviewed:

## Design reference audit

- Turnoment design masters reviewed:
- External product/interface references reviewed:
- Selected design direction:

## SEO / search-intent / final-copy audit

- Page purpose:
- Intended audience:
- Primary search intent:
- Primary topic/query cluster:
- Secondary/supporting topic clusters:
- Important entities/terms:
- Persian/English variants evaluated:
- SERP/content references reviewed:
- Content gap/opportunity:
- Cannibalization check:
- Final H1:
- Final title:
- Final meta description:
- Heading outline:
- Internal-link/anchor strategy:
- Structured-data decision:
- People-first review:
- Keyword-stuffing/search-engine-first review:
- Visible engineering-language review:

Use `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md` for the detailed evidence when the page is public/indexable.

## Final production contract

- Domain/page types:
- Stable identifiers:
- Read operations:
- Write/actions:
- Runtime validation:
- Authoritative states:
- Fixture/test implementation:

## Route / SSR / SEO / indexing

- Params/search validation:
- Loader/access policy:
- SSR policy:
- Semantic URL/slug:
- Canonical:
- Robots:
- Open Graph/social metadata:
- Parameter/filter indexing policy:
- Structured data decision:

## UI state matrix

- normal:
- loading:
- empty:
- error/retry:
- not found:
- unauthorized/session-expired:
- success/confirmation:
- validation/concurrency states:

## Accessibility / responsive QA

- keyboard/focus:
- semantic labels/headings:
- status announcements:
- 375px:
- 390px:
- 430px:
- 768px:
- 1024px:
- 1440px:

## Quality evidence

- lint:
- typecheck:
- contract tests:
- production build:
- targeted route/action tests:
- SEO/final-copy gate:

## Closeout

- Final reviewed head:
- PR:
- Open review threads:
- Merge SHA:
- Post-merge CI:
- Continuity updated:
- SEO evidence recorded:
- Final status:
- Exact NEXT:
