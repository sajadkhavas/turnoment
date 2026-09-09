# TURNOMENT — FINAL SEO & COPY PROTOCOL

> **MANDATORY FOR EVERY PUBLIC/INDEXABLE FRONTEND PAGE AND EVERY MATERIAL COPY CHANGE**
>
> This protocol is part of the definition of a final Turnoment page. Every chat/agent/session working on a public/indexable page MUST read this file together with `PROJECT_CONTINUITY.md` and `FRONTEND_PAGE_DELIVERY_PROTOCOL.md` before implementation or material copy changes.
>
> SEO is not a later cleanup phase. Search intent, keyword/topic research, final user-facing copy, headings, metadata, internal links, canonical/indexing decisions and supported structured data are acceptance requirements of the page itself.

## 1. Non-negotiable rule

A Turnoment page is not final if its visible words were written only from engineering/domain language and were not evaluated for real user intent and search intent.

Public copy must be:

- useful to the real user first;
- accurate to the product/domain truth;
- written in natural Persian appropriate to the target audience;
- aligned with researched search intent where organic discovery matters;
- specific enough to distinguish the page from nearby/competing pages;
- free from implementation jargon that a normal user does not need;
- free from keyword stuffing, repetitive SEO boilerplate, doorway-like copy or search-engine-first writing.

SEO must improve usefulness and discoverability, not distort product truth.

## 2. Mandatory pre-copy research gate

Before final copy is accepted for a public/indexable page, the workstream MUST research and record:

1. **Page purpose** — what product/user job this page exists to solve.
2. **Primary audience** — player, organizer, gaming-center owner, visitor, etc.
3. **Search intent** — informational, navigational, local/discovery, transactional/participation, or a justified combination.
4. **Primary topic/query cluster** — the strongest natural search concept the page should satisfy.
5. **Secondary/supporting topic clusters** — related concepts users reasonably need on the same page.
6. **Language variants** — Persian/English game names, common spellings/transliterations, local terms, or abbreviations only where real users use them.
7. **Current SERP/content landscape** — inspect relevant current search results and credible competing pages to understand what users are being served, without copying their text.
8. **Content gap/opportunity** — what Turnoment can answer more clearly, locally, accurately or usefully.
9. **Cannibalization check** — confirm the target intent does not unnecessarily duplicate another Turnoment route.
10. **People-first check** — confirm the page would still be useful if search engines did not exist.

Do not invent search volume numbers or ranking difficulty. If an external keyword tool is not available, record qualitative evidence only.

## 3. Keyword and semantic usage law

Keyword research is a writing aid, not a repetition quota.

Required behavior:

- use the primary topic naturally in the page title/H1/body when it genuinely describes the page;
- use related terms, entities and synonyms where they improve clarity and topical completeness;
- keep game/venue/tournament/player names exact where they are authoritative product data;
- use Persian terminology that matches how the intended audience searches and reads;
- preserve English game/product names when that is the canonical/common name;
- prefer semantic coverage and complete answers over exact-match repetition;
- do not target multiple unrelated intents on one page merely to attract traffic.

Forbidden behavior:

- keyword stuffing;
- unnatural repeated city/game/service phrases;
- hidden SEO text;
- content generated primarily to manipulate rankings;
- fake FAQs or sections created only to insert keywords;
- misleading freshness/date changes;
- unsupported superlatives such as “best”, “number one”, “official” or “largest” unless product truth/evidence supports them;
- fabricated statistics, search demand, popularity or authority claims.

## 4. Final visible-copy gate

Every meaningful user-facing string on a public page must be reviewed as product copy, including:

- H1;
- H2/H3 section titles;
- eyebrow/kicker text;
- introductory and explanatory paragraphs;
- card titles/descriptions where they are page-owned copy;
- CTA labels;
- empty/error/not-found messages that may be indexable or user-visible;
- breadcrumbs;
- filter labels when they influence discoverability/navigation;
- image alt text where an image is informative;
- internal-link anchor text.

Copy MUST NOT expose internal architecture or engineering status unnecessarily. Avoid user-facing language such as:

- backend / frontend / API / adapter / contract / fixture / mock;
- server connection state;
- “the UI does not calculate…”;
- “this value comes from the contract/backend…”;
- temporary/demo/waiting language;
- implementation terminology such as `Ruleset` when a natural Persian product term is clearer, unless the term is deliberately part of Turnoment's public vocabulary.

Translate domain truth into natural product language without weakening accuracy.

## 5. Search-title and H1 gate

For public/indexable pages:

- every page must have a unique, descriptive `<title>`;
- the title must accurately summarize the page and match its primary language/writing system;
- the H1 must be clear, prominent and consistent with the page purpose;
- `<title>` and H1 may differ when that improves search-result clarity vs on-page readability, but they must not conflict;
- avoid boilerplate-heavy titles and repeated keyword variants;
- include the Turnoment/site brand concisely only where useful;
- dynamic titles must reflect actual visible/authoritative page content.

No page is accepted with vague titles such as “صفحه بازی”, “جزئیات”, “پروفایل” or generic duplicated templates when a specific identity is available.

## 6. Meta description / snippet gate

For critical public URLs, provide a unique description that:

- accurately summarizes the visible page;
- communicates the page's useful differentiator;
- uses relevant terms naturally;
- does not promise content/features that are absent;
- avoids duplicated site-wide boilerplate;
- is written for the click decision of a real searcher, not as a keyword list.

Google may generate snippets from page content; therefore on-page copy must itself be strong enough to represent the page.

## 7. Heading and semantic-structure gate

- exactly one clear primary page topic/H1 in normal page structure;
- H2/H3 hierarchy follows information architecture, not visual size alone;
- headings should describe the content users will find beneath them;
- do not create headings purely to inject query variants;
- use meaningful section order so SSR-rendered page content is understandable to users and crawlers;
- important explanatory text must not exist only inside inaccessible visual effects.

## 8. Internal-link and anchor-text gate

Every important public/indexable page should be reachable through crawlable internal links from relevant Turnoment pages.

Internal links must:

- use real link semantics and resolvable URLs;
- have concise, descriptive anchor text;
- make sense when read out of surrounding context;
- connect users to genuinely relevant next steps;
- use canonical semantic routes/slugs;
- avoid excessive exact-match keyword anchors;
- avoid generic “click here/read more” when a specific label is available.

For each page, evaluate links to/from nearby entities such as game, tournament, player ranking, gaming center, rules and relevant discovery routes.

## 9. Canonical, robots and URL gate

During the page workstream decide and implement:

- final semantic URL/slug strategy;
- canonical URL;
- redirects/canonicalization for legacy identifiers where applicable;
- robots/indexing policy;
- treatment of filter/search/parameter variants;
- whether pagination or alternate states require distinct URLs;
- language/locale URL policy when localization is introduced.

Do not create a later SEO phase to repair basic URL/indexing architecture.

## 10. Structured-data gate

Structured data may be shipped only when:

- Google currently documents/supports the relevant feature/type for Search use;
- required properties are available from authoritative product data;
- markup matches visible page content;
- URLs/identifiers required by the schema are valid and stable;
- the workstream records why the schema is valid for that route.

If required data is unavailable, explicitly document why the schema was omitted rather than inventing values.

Validate applicable markup with official Google tooling when the environment/domain allows it.

## 11. Image and media SEO gate

When a page uses meaningful content images:

- use descriptive alt text for informative images;
- decorative/background images use empty alt/appropriate semantics;
- image filenames/URLs should be stable where controlled;
- dimensions/aspect behavior should minimize layout shift;
- use crawlable images when search visibility is intended;
- do not stuff alt text with keywords.

## 12. Local/discovery SEO gate

For routes with genuine city/venue/local intent:

- locality must come from authoritative page/business data;
- city/district terms are used naturally, not repeated mechanically;
- venue identity, address/location and relevant event context should be clear to users;
- do not create thin location pages solely to target combinations of city + game + tournament;
- local claims such as “بهترین گیم‌نت” require evidence and must not be invented.

## 13. Competitive/content research rule

External research may inform intent and content gaps, but Turnoment copy must remain original.

For SEO research:

- prefer current search-result evidence and credible real products/content;
- separate observed patterns from assumptions;
- do not copy competitor paragraphs, titles or descriptions;
- do not manufacture FAQ questions merely because competitors have them;
- document what user need/search intent was learned and how Turnoment answers it better.

## 14. SEO evidence required in every public-page workstream

Record at minimum:

- page/route;
- indexability decision;
- intended audience;
- page purpose;
- primary search intent;
- primary topic/query cluster;
- secondary/supporting clusters;
- important entities/terms;
- language/spelling variants evaluated;
- SERP/reference research summary;
- content gap/opportunity;
- cannibalization check;
- final H1;
- final `<title>`;
- final meta description;
- canonical;
- robots;
- heading outline;
- internal links/anchor strategy;
- structured-data decision;
- final visible-copy review result;
- keyword-stuffing/search-engine-first review result;
- unresolved SEO/content blocker, if any.

## 15. SEO QA before merge

Before a public page may move to `READY TO MERGE`, verify:

- copy answers the intended user/search need;
- no engineering-stage wording remains in visible copy;
- title/H1/description are specific and non-duplicative;
- important terms are natural, not stuffed;
- headings form a coherent page outline;
- canonical/robots are correct;
- meaningful internal links are crawlable and descriptive;
- no unsupported claim was added for SEO;
- no separate future phase is required for basic on-page SEO/content;
- applicable structured data is valid or omission is documented;
- page remains people-first, useful and readable.

## 16. Definition of SEO-complete

A public Turnoment page is SEO-complete only when research, final copy and technical indexing are all accepted together.

`SEO-complete = researched intent + original people-first copy + semantic structure + metadata + canonical/indexing + internal linking + supported structured data decision + QA evidence`

A page with only title/meta/canonical but unresearched or engineering-style visible copy is **not** SEO-complete.

A page with keyword-heavy copy but weak product usefulness is **not** SEO-complete.

There is no later generic “write SEO copy for all pages” phase for pages accepted under this protocol. Future site-wide SEO work may analyze performance, Search Console data, new opportunities and strategy, but it must not be required to finish the basic page.

## 17. Official baseline

Current official Google Search sources that govern this protocol include:

- SEO Starter Guide — https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Creating helpful, reliable, people-first content — https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Title links — https://developers.google.com/search/docs/appearance/title-link
- Snippets / meta descriptions — https://developers.google.com/search/docs/appearance/snippet
- Link best practices — https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- URL structure — https://developers.google.com/search/docs/crawling-indexing/url-structure
- Canonicalization — https://developers.google.com/search/docs/crawling-indexing/canonicalization
- Structured-data policies — https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Spam policies — https://developers.google.com/search/docs/essentials/spam-policies

Page-specific SEO features must add their own current official references.
