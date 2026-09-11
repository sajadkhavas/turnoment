# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-11`

## 1. Mandatory continuation law

Every chat/agent MUST:
1. read this file before implementation;
2. read `FRONTEND_PAGE_DELIVERY_PROTOCOL.md` for frontend page work;
3. read `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable pages or material public-copy changes;
4. read `docs/ROUTE_COMPLIANCE_REGISTRY.md` before modifying/accepting an existing route;
5. verify current `main` SHA of every repository it will change;
6. read relevant Issue/PR/workstream evidence before repeating work;
7. use a dedicated branch;
8. never claim `DONE / MERGED / FROZEN` from chat memory alone;
9. record exact branch/SHA/PR/CI/artifact evidence;
10. update both repositories when a cross-repo contract/global product truth changes.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `READY TO MERGE`, `MERGED / CLOSEOUT IN PROGRESS`, `DONE / MERGED / FROZEN`.

## 2. Current frontend repository truth

Repository: `sajadkhavas/turnoment`

Current accepted implementation main:

`2b66c5140511febaa98e96d93351cfdb62773bbf`

That SHA is the merged F16 implementation and has passed both required post-main implementation gates.

Previous terminal frozen main before F16:

`008f4fbd959138e3abe6bf85078f6cf700319bd2` — F15 terminal frozen main.

Active governance workstream:

`F16 — Public Home Discovery`

Route: `/`

Tracking Issue: `#81` — OPEN until terminal frozen-main evidence exists.

Implementation branch: `phase/f16-public-home-discovery`

Closeout branch: `closeout/f16-public-home-discovery`

Target: `FINAL_CURRENT`

Current workstream status:

`MERGED / CLOSEOUT IN PROGRESS`

Route acceptance status may be promoted non-recursively to `FINAL_CURRENT` because implementation is merged and required post-main implementation QA is green. The F16 workstream itself is not terminally `DONE / MERGED / FROZEN` until closeout merge, terminal main QA/artifacts/digests, exact live-main verification and Issue #81 closure are complete.

Runtime truth remains:

`FRONTEND MOCK / BACKEND PENDING`

until the authorized backend domain phases implement `GET /api/v1/discovery/home/`.

## 3. Previous terminal frontend truth

F01–F15 remain accepted/frozen according to their route/workstream records. Most recent prior terminal workstream:

F15 `/dashboard/challenges`:
- status `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- Issue `#77` — CLOSED / COMPLETED;
- implementation PR `#79` — MERGED;
- implementation merge `5db25c291a250a94676e143ba11642c86b2f8152`;
- closeout PR `#80` — MERGED;
- frozen main `008f4fbd959138e3abe6bf85078f6cf700319bd2`;
- terminal Frontend Quality Gate `34589429398` — PASS;
- terminal artifact `10195137753`;
- digest `sha256:61e8e493f8be1ea5c0262afa4cddecba8dc126a7c5bba0ba4b6e916499ecbbd0`.

Do not reopen or rebuild frozen F01–F15 routes from memory. Any future material change requires a new controlled workstream and exact-source audit.

## 4. F16 permanent architecture truth

Permanent boundary:

`public / route → SSR loader → typed PublicHomeRepository → runtime-validated public-home projection → Home UI`

Backend/repository owns:
- aggregate discovery stats when exposed;
- stable game identity/slug and active-tournament counts;
- Home finder game/city/date options that come from domain data;
- featured tournament identity, venue, lifecycle, registration/capacity/fee/prize truth;
- gaming-center identity, verification, location, equipment/review projection and upcoming-tournament counts;
- ranking identity/rank/rating/result-derived values;
- optional featured-showdown identity/timing/player/rating projection;
- stable IDs/slugs used for navigation/search relations.

Frontend owns:
- final static Persian explanatory copy and information hierarchy;
- temporary finder form state before URL navigation;
- responsive/accessibility presentation;
- deterministic QA fixture behind the same permanent repository contract.

Frontend MUST NOT calculate verification, lifecycle, capacity truth, rank/rating, result/winner or aggregate site statistics from local arrays.

## 5. Production adapter law

F16 repository selection is explicit:
- `VITE_DATA_ADAPTER=mock` → deterministic dev/test/visual-QA fixture;
- `VITE_DATA_ADAPTER=django` → production HTTP repository;
- when adapter is unspecified, production defaults to Django/HTTP while development defaults to fixture.

Production therefore never silently falls back to fabricated Home records when the backend is unavailable.

Planned anonymous-safe/read-only endpoint:

`GET /api/v1/discovery/home/`

No private account/payment/moderation data belongs in that projection.

## 6. F16 implementation — accepted on main

Frontend START_SHA:

`008f4fbd959138e3abe6bf85078f6cf700319bd2`

Final reviewed implementation head:

`41aeba987fa4435832361db95d2e232817c668b3`

Implementation compare:
- ahead `1` / behind `0`;
- exactly one implementation commit;
- exactly 15 changed files;
- no lockfile mutation;
- no dependency/version mutation.

Implementation PR:

`#82` — MERGED with expected-head lock.

Implementation merge / accepted main:

`2b66c5140511febaa98e96d93351cfdb62773bbf`

Pre-merge conditions:
- PR mergeable `true`;
- unresolved review threads `0`;
- live frontend `main` still exact F16 START_SHA immediately before merge.

## 7. F16 exact-head acceptance evidence

Exact implementation head `41aeba987fa4435832361db95d2e232817c668b3`:

Normal Frontend Quality Gate:
- run `34592421423` — PASS;
- artifact `10196275291`;
- digest `sha256:41799e4d45b4351fdb3f87edb7513c1af918858087d04661c618ab6721bbef5a`.

Focused F16 Public Home Quality Gate:
- run `34592421509` — PASS;
- artifact `10196188910`;
- digest `sha256:1a6ff22263d98927f784c5d5facff97978b125370cee0496052d32e9627a4651`;
- focused artifact contains SSR `home.html` plus exactly six screenshots at `375 / 390 / 430 / 768 / 1024 / 1440`;
- manual six-width visual inspection PASS: no observed horizontal overflow, clipping or overlap; RTL hierarchy, Hero, CTAs, stats, finder and explanatory cards remain coherent.

## 8. F16 PR-context acceptance evidence

PR-context runs for PR #82:
- Frontend Quality Gate `34598183137` — PASS;
  - artifact `10262957454`;
  - digest `sha256:0e563511f2c20e042ed27d025395b9fd40a4ce28d2f9e2f04cdcc057bc706a8e`;
- F16 Public Home Quality Gate `34598183138` — PASS;
  - artifact `10263646547`;
  - digest `sha256:52cc118d27e789894295523c8b6cf38bd3c0b98e098790673ec2734c1cf910e9`.

## 9. F16 post-main implementation evidence

Exact accepted implementation main `2b66c5140511febaa98e96d93351cfdb62773bbf`:

Normal Frontend Quality Gate:
- run `34598728780` — PASS including full browser regression;
- artifact `10263148439`;
- digest `sha256:6522b08fc635fbcef7844257d37083681a4407b3de4afa14eebc51034b003fda`.

Focused F16 Public Home Quality Gate:
- run `34598728817` — PASS;
- artifact `10263087863`;
- digest `sha256:6337d86bbaa94e83ced301825445483c5b59c91a93426480a1d4ff810c18dd3d`.

Live frontend `main` was reverified exact `2b66c5140511febaa98e96d93351cfdb62773bbf` before closeout branch creation.

## 10. F16 product/SEO acceptance truth

Final Home H1:

`مسابقات گیمینگ حضوری نزدیکت را پیدا کن`

Final title:

`مسابقات گیمینگ حضوری و تورنمنت‌های گیم‌نت | Turnoment`

Indexing:
- canonical `/`;
- robots `index,follow`;
- public important content SSR-rendered.

Search-intent boundary:
- `/` broad discovery gateway + explanation;
- `/tournaments` full tournament search/filter inventory;
- `/games` game catalog;
- `/centers` center discovery;
- `/ranking` full ranking;
- `/host` host acquisition.

The visible Tournament shell was also corrected during F16:
- legacy `ایران مهر افزار` branding removed from the active shell;
- fabricated phone/email/address removed;
- dead social `#` links removed;
- Turnoment/product-route copy retained without inventing contact/social facts.

No Organization JSON-LD is emitted until stable absolute production site/logo identity is explicitly available. No search-volume/difficulty or unsupported superlative is claimed.

## 11. F16 official-document decisions

Current official references reviewed and applied:
- TanStack Start Selective SSR: `https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr`;
- TanStack Router Data Loading: `https://tanstack.com/router/latest/docs/guide/data-loading`;
- TanStack Router document head guidance;
- Google Search Central canonicalization/title/snippet/helpful-content/internal-link/structured-data guidance;
- W3C WCAG 2.2 including focus visibility/obscuring and target-size minimum guidance.

Applied decisions:
- Home remains SSR-renderable;
- route loader coordinates dynamic public projection;
- route head owns final metadata;
- dynamic discovery links remain semantic/crawlable;
- controls keep visible keyboard focus and touch-safe targets;
- structured data is omitted when stable supporting facts are unavailable.

## 12. Backend F16 alignment — terminal documentation truth

Backend repo: `sajadkhavas/turnoment-backend`.

- backend START `c72ec545782a25719009ae329d74ffd13259d020`;
- Issue `#29` — CLOSED / COMPLETED (documentation alignment only);
- docs head `0338af8432d16a92ebafe85160e1d45f8ae3c8db`;
- PR `#30` — MERGED;
- PR Backend Quality Gate `34591383203` — PASS Python 3.12/3.14;
- accepted backend merge/main `335211d711c197a440e086bc570b86f2c5cd65f8`;
- post-main Backend Quality Gate `34591528685` — PASS Python 3.12/3.14;
- live backend main reverified exact accepted SHA;
- no runtime Python/models/migrations/serializers/views/URLs/dependency/phase-registry mutation.

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

F16 backend alignment does not mean the Home endpoint is live.

## 13. Active closeout boundary

Closeout branch:

`closeout/f16-public-home-discovery`

Authorized closeout diff is Markdown-only and must be exactly:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F16_PUBLIC_HOME.md`;
4. `docs/workstreams/F16_CLOSEOUT.md`.

Closeout MUST NOT mutate source, package files, lockfiles, workflows or runtime configuration.

Non-recursive rule:
- committed closeout docs record only evidence that already exists;
- the future closeout merge/frozen-main SHA and terminal post-closeout CI/artifact/digest belong in Issue #81 after they exist;
- do not create a recursive documentation PR merely to self-record its own SHA.

F16 may be reported as `DONE / MERGED / FROZEN — FINAL_CURRENT` only after closeout PR merge, terminal main full + focused QA/artifacts/digests, exact live-main verification and Issue #81 closure as completed.

## 14. Exact NEXT

1. verify closeout compare is one commit / exactly four Markdown files;
2. open closeout PR without auto-closing Issue #81;
3. require PR-context full + focused gates PASS;
4. require mergeable=true, unresolved review threads=0 and exact implementation-main lock;
5. expected-head merge closeout;
6. require terminal frozen-main full + focused QA and artifact/digest evidence;
7. reverify exact live frontend main;
8. record terminal evidence in Issue #81 and close completed;
9. only then continue public recertification with `/tournaments`.

Remaining current-law public order after F16 terminal freeze:

`/tournaments` → `/games` → `/centers` → `/centers/$id` → `/ranking` → `/players/$username` → `/host` → `/rules`.

`/tournaments/$id` remains `FINAL_PRE_SEO` until a later limited SEO/current-law recertification. Legacy commerce/service/content routes remain `LEGACY_REVIEW` pending explicit product decision.
