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

Current frozen main / F16 START_SHA:

`008f4fbd959138e3abe6bf85078f6cf700319bd2`

That SHA is terminal F15 frozen main.

F15 terminal evidence:
- route `/dashboard/challenges` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- Issue `#77` — CLOSED / COMPLETED;
- implementation PR `#79` — MERGED;
- implementation merge `5db25c291a250a94676e143ba11642c86b2f8152`;
- closeout PR `#80` — MERGED;
- frozen main `008f4fbd959138e3abe6bf85078f6cf700319bd2`;
- terminal Frontend Quality Gate `34589429398` — PASS;
- terminal artifact `10195137753`;
- digest `sha256:61e8e493f8be1ea5c0262afa4cddecba8dc126a7c5bba0ba4b6e916499ecbbd0`.

Active frontend workstream:

`F16 — Public Home Discovery`

Route: `/`

Tracking Issue: `#81`

Branch: `phase/f16-public-home-discovery`

Target: `FINAL_CURRENT`

Indexability: `PUBLIC / INDEX,FOLLOW`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING` until `GET /api/v1/discovery/home/` is implemented by an authorized backend phase.

## 3. F16 source audit truth

The existing Home visual foundation was usable, but current-law acceptance was blocked because:
- `src/lib/tournament-home-data.ts` directly hardcoded public dynamic truth including aggregate stats, tournament capacity/status/prize, center verification/reviews/equipment, ranking and featured-showdown values;
- Home presentation components read that local data directly instead of a route loader/repository boundary;
- the Hero finder only called `preventDefault()` and never navigated;
- popular-game cards did not carry stable game search identity;
- the featured-showdown CTA had no typed target;
- title/copy still used legacy `ایران مهر افزار` branding;
- public claims were not backed by an authoritative projection;
- no current SEO/final-copy evidence chain existed.

F16 retains the useful RTL esports visual direction but replaces the architecture and unsupported copy rather than rebuilding blindly.

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

F16 introduces an explicit repository selector:
- `VITE_DATA_ADAPTER=mock` → deterministic dev/test/visual-QA fixture;
- `VITE_DATA_ADAPTER=django` → production HTTP repository;
- when adapter is unspecified, production defaults to Django/HTTP while development defaults to fixture.

Therefore production never silently falls back to fabricated Home records when the backend is unavailable.

Planned HTTP endpoint:

`GET /api/v1/discovery/home/`

The endpoint is anonymous-safe/read-only. No private account/payment/moderation data belongs in the projection.

## 6. Backend F16 alignment — terminal

Backend repo: `sajadkhavas/turnoment-backend`.

Backend START_SHA:
`c72ec545782a25719009ae329d74ffd13259d020`

Backend Issue `#29` — CLOSED / COMPLETED (documentation alignment only).

Backend docs head:
`0338af8432d16a92ebafe85160e1d45f8ae3c8db`

Backend PR `#30` — MERGED.

PR-context Backend Quality Gate:
`34591383203` — PASS on Python 3.12 / 3.14.

Accepted backend merge/main:
`335211d711c197a440e086bc570b86f2c5cd65f8`

Post-main Backend Quality Gate:
`34591528685` — PASS on Python 3.12 / 3.14.

Live backend main was reverified exact accepted SHA. No Python/models/migrations/serializers/views/URLs/dependencies/phase-registry mutation occurred. Backend NEXT remains exactly `P02 — Games / Catalog Foundation`.

## 7. F16 official-document decisions

Current official references reviewed:
- TanStack Start Selective SSR: `https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr`;
- TanStack Router Data Loading: `https://tanstack.com/router/latest/docs/guide/data-loading`;
- TanStack Router document head guidance;
- Google Search Central canonicalization/title/snippet/helpful-content/internal-link guidance;
- Google Organization structured-data guidance;
- W3C WCAG 2.2 including focus visibility/obscuring and target-size minimum guidance.

Applied:
- Home remains `ssr: true`; initial loader and page content render server-side;
- route loader is the only Home dynamic-data coordination point;
- route head owns final title/description/canonical/robots/OG metadata;
- all dynamic cards use semantic crawlable links with stable identifiers;
- controls have visible keyboard focus and touch-safe sizes;
- no Organization JSON-LD is emitted until stable absolute production URL/logo identity is explicitly available; no structured data is fabricated.

## 8. F16 SEO/search intent

Primary audience: players in Iran seeking in-person gaming competition.
Secondary audience: gaming-center hosts.

Primary intent: discovery / participation.

Primary topic cluster:
- `مسابقات گیمینگ حضوری`;
- `تورنمنت بازی`;
- `مسابقات گیم نت`.

Supporting clusters:
- tournament by game/city/date;
- gaming centers;
- player ranking;
- hosting a tournament/center.

Cannibalization boundary:
- `/` broad discovery gateway + explanation;
- `/tournaments` full tournament search/filter inventory;
- `/games` game catalog;
- `/centers` center discovery;
- `/ranking` full ranking;
- `/host` host acquisition.

Final planned Home metadata/copy:
- H1: `مسابقات گیمینگ حضوری نزدیکت را پیدا کن`;
- title: `مسابقات گیمینگ حضوری و تورنمنت‌های گیم‌نت | Turnoment`;
- canonical `/`;
- robots `index,follow`;
- natural Persian meta description with no unsupported superlatives.

No search-volume/difficulty metric is claimed without an authoritative source.

## 9. F16 implementation scope

Owned implementation/governance files include:
- `PROJECT_CONTINUITY.md`;
- `docs/workstreams/F16_PUBLIC_HOME.md`;
- `docs/workstreams/F16_PUBLIC_HOME_SEO.md`;
- `src/routes/index.tsx`;
- `src/components/home/public-home-page.tsx`;
- `src/components/home/public-home-finder.tsx`;
- `src/lib/public-home-contract.ts`;
- `src/lib/public-home-data.ts`;
- `src/lib/public-home-http-repository.ts`;
- `src/lib/public-home-repository.ts`;
- `src/lib/public-home-contract.spec.ts`;
- `package.json` test-chain append only;
- `.github/workflows/f16-public-home-quality.yml` for focused SSR/head/link/six-width evidence.

No dependency/version/lockfile mutation is authorized.

The old shared `src/lib/tournament-home-data.ts` is intentionally not modified by F16 because unre-certified `/tournaments`, `/centers` and adjacent legacy discovery code still consume it. The active Home route no longer imports it.

## 10. F16 required acceptance

1. backend docs alignment terminal — DONE;
2. frontend implementation is one clean commit from exact START_SHA;
3. no dependency/version/lockfile drift;
4. normal Frontend Quality Gate PASS;
5. F16 focused public Home gate PASS with SSR/head/copy/link assertions and six screenshots at 375/390/430/768/1024/1440;
6. manual visual QA of all six Home screenshots;
7. implementation PR without auto-closing #81;
8. PR gates green, mergeable=true, review threads=0, exact pre-merge main lock;
9. expected-head implementation merge;
10. post-main normal + F16 focused QA/artifact evidence;
11. documentation-only closeout;
12. closeout PR gates + expected-head merge;
13. terminal frozen-main normal + F16 focused QA/artifact/digest;
14. exact live-main verification;
15. Issue #81 terminal evidence + CLOSED / COMPLETED;
16. only then report `F16 — DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 11. Remaining public route order after F16

After F16 terminal freeze, current-law public recertification continues with:
`/tournaments` → `/games` → `/centers` → `/centers/$id` → `/ranking` → `/players/$username` → `/host` → `/rules`.

`/tournaments/$id` remains `FINAL_PRE_SEO` until its later limited SEO/current-law recertification. Legacy commerce/service/content routes remain `LEGACY_REVIEW` pending explicit product decision.
