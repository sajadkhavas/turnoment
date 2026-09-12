# F24 — Rules Page Recertification

Status: `IMPLEMENTATION IN PROGRESS`

Route: `/rules`

START_SHA: `b3143885a4aacc4301a952eb24bdad608b594d3b`

Tracking Issue: `#107`

Branch: `phase/f24-rules-recertification`

Target: `FINAL_CURRENT`

## 1. Mandatory preflight

Read from exact START before mutation:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `SEO_FINAL_COPY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- legacy `src/routes/rules.tsx`.

F23 Issue #104 is CLOSED / COMPLETED. `/rules` is therefore the protected NEXT frontend route.

## 2. Supplied specialist input synthesis

F24 reviewed three user-supplied specialist outputs rather than copying any one output directly:

1. TypeScript/TanStack proposal — strong typed document contract, runtime validation, repository boundary, SSR and test ideas. Rejected as-is: invented `VITE_RULES_PUBLIC_ENDPOINT`, non-null synthetic policy dates/version and incorrect `TournamentLayout` import path.
2. UI/UX proposal — accepted direction: reading-first policy surface, compact hero, grouped semantic sections, mobile horizontal quick navigation, desktop sticky rail, narrow Persian reading column, plain fragment anchors, visible focus, no accordion/animation dependency.
3. SEO/policy research — accepted direction: informational/pre-participation intent, separation of platform-wide policy from tournament-specific operations, final H1/title/description direction, no unsupported inherited policy claims, no page-specific rich-result schema by default.

## 3. Official/current source audit

Reviewed current official documentation before implementation:
- TanStack Start selective SSR and SEO/document-head guidance;
- TanStack execution model: route loaders are isomorphic and execute on the server for initial SSR and on the client during navigation;
- Google Search Central current search-appearance / structured-data feature list and canonical guidance;
- WCAG 2.2 focus visibility guidance.

Implementation consequence:
- `ssr: true` is explicit;
- primary content comes through the route loader and is present in SSR HTML;
- route `head` owns title/description/robots/Open Graph/canonical;
- no browser-only `useEffect` content fetch;
- no unsupported FAQ/Article/Event schema on `/rules`;
- interactive anchors and CTA have visible keyboard focus.

## 4. Design-reference decision

The accepted design direction combines the specialist UI audit with existing Turnoment public design masters such as F23 `/host`:
- existing token classes (`bg-background`, `bg-card`, `border-border`, `text-muted-foreground`, `text-primary`);
- premium dark RTL visual system;
- bounded prose width;
- grouped cards rather than one giant numbered wall;
- quick navigation that is horizontally scrollable on mobile and sticky on desktop;
- no new design system, dependency, animation library or frozen shared-component refactor.

## 5. Search intent / final-copy lock

Purpose: answer which rules apply generally to Turnoment tournament participation and which details must be checked on the individual tournament.

Primary audience: players considering registration, preparing to register or already registered and checking expectations.

Primary intent: informational / pre-participation.

Primary topic cluster: `قوانین و شرایط شرکت در تورنمنت‌های گیمینگ`.

Supporting language, only where useful: `قوانین مسابقات گیمینگ`, `قوانین تورنمنت`, `شرایط شرکت`, `قوانین اختصاصی تورنمنت`.

Cannibalization boundary:
- `/tournaments` owns discovery/listing;
- `/games` and `/games/$slug` own game discovery/game competition context;
- `/centers` and `/centers/$id` own venue discovery/details;
- `/ranking` owns ranking mechanics;
- `/host` owns organizer acquisition;
- tournament detail owns its own timing, venue, eligibility, format, check-in, equipment and event-specific operating rules.

Final H1:

`قوانین شرکت در تورنمنت‌های Turnoment`

Final title:

`قوانین و شرایط شرکت در تورنمنت‌ها | Turnoment`

Final description:

`قوانین عمومی شرکت در تورنمنت‌های Turnoment را بخوانید و ببینید کدام شرایط در همه رقابت‌ها مشترک است و کدام جزئیات در صفحه هر تورنمنت اعلام می‌شود.`

Canonical: `/rules`.

Robots: `index,follow`.

Structured data: none page-specific. `BreadcrumbList` remains unnecessary because the accepted F24 UI does not add a visible breadcrumb.

Primary internal CTA: `مشاهده تورنمنت‌ها` → `/tournaments`.

Inbound crawlability already exists through the shared tournament footer, which contains multiple `/rules` links. Frozen shared footer source remains untouched.

## 6. Product-policy truth lock

F24 explicitly rejects inherited statements as product truth unless separately approved:
- no universal 30-minute early-arrival requirement;
- no universal 15-minute technical-loss rule;
- no universal ID-card requirement;
- no universal referee approval rule for personal controllers;
- no elimination/ranking-deduction sanction claim;
- no 24-hour full-refund promise.

Accepted global F24 policy is intentionally narrow:
- participant-provided registration/coordination information must be accurate and current;
- cheating, collusion and deliberate result manipulation are prohibited as a fair-play baseline;
- respectful conduct is required in interactions with players, hosts, organizers and event staff;
- event-specific published rules must be reviewed and followed for that event.

No sanction, refund, withdrawal, identity-verification, age, dispute deadline or payment/legal promise is inferred from those baseline rules.

Precedence decision for F24:
- platform-wide baseline rules remain common;
- event-specific rules supplement operational details such as timing, format, equipment and participation conditions;
- the event page is the operational source for those event-specific details.

## 7. Permanent frontend boundary

F24 uses:

`Route → loader → RulesPageRepository → strict RulesPageDocument validation → RulesPage UI`

The current production repository is version-controlled reviewed public policy content. This is deliberate: no backend rules endpoint is currently accepted as existing and Backend NEXT remains `P02 — Games / Catalog Foundation`.

A later HTTP/admin-backed repository can implement the same `RulesPageRepository` interface without reconstructing the page component tree.

There is no fixture fallback in production and no invented API URL.

## 8. Policy metadata decision

Public `version`, `effectiveDate` and `lastSubstantiveRevisionDate` are nullable in v1.

F24 does not fabricate a public version/date merely to make the page appear current. If future product/legal governance approves public policy versioning, those authoritative values can be added through the same validated contract and UI.

Current governance is repository/PR evidence: substantive future policy changes must repeat current public copy/policy review and cannot silently inherit legacy text.

## 9. Accessibility / responsive acceptance target

Target widths: `375`, `390`, `430`, `768`, `1024`, `1440`.

Required:
- exactly one `<main>` and one H1;
- semantic H2/H3 hierarchy;
- quick-nav fragment anchors work without client state;
- stable section IDs and `scroll-mt-24`;
- visible focus rings;
- minimum practical navigation/CTA target height around 44–48 px;
- mobile quick navigation scrolls within itself rather than widening the page;
- desktop sidebar does not squeeze the Persian reading column;
- no horizontal viewport overflow;
- no accordion or pointer-only dependency.

## 10. Implementation ownership

Owned by F24:
- `src/routes/rules.tsx`;
- `src/components/rules/rules-page.tsx`;
- `src/lib/rules-page-contract.ts`;
- `src/lib/rules-page-content.ts`;
- `src/lib/rules-page-repository.ts`;
- `src/lib/rules-page-contract.spec.ts`;
- `.github/workflows/f24-rules-quality.yml`;
- F24 documentation/governance files.

Frozen public route source remains untouched.

## 11. QA gate

Dedicated F24 workflow must prove:
- frozen dependency install;
- lint;
- F24 contract checks;
- production build;
- typecheck;
- SSR HTML contains final H1 and major sections;
- effective head contains final title, `index,follow`, `/rules` canonical and Turnoment site name;
- old brand and unsupported legacy rules are absent from public F24 source;
- exactly one `<main>`;
- six responsive screenshots are generated and uploaded as an artifact.

Frontend Quality Gate continues to protect repository-wide lint/build/typecheck/existing contract regressions.

## 12. Current state

`IMPLEMENTATION IN PROGRESS`

Exact implementation head, CI evidence, PR, merge and frozen-main facts must be recorded only after they exist.
