# F16 — Public Home Discovery

Status: `IN PROGRESS — IMPLEMENTATION`

Route: `/`

Tracking Issue: `#81`

START_SHA: `008f4fbd959138e3abe6bf85078f6cf700319bd2`

Branch: `phase/f16-public-home-discovery`

Target: `FINAL_CURRENT`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 1. Preflight

Mandatory root law read before implementation:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `SEO_FINAL_COPY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md`.

Live frontend main was exact START_SHA before branch creation.

## 2. Source audit

The previous Home UI was visually usable but not current-law final.

Blocking findings:
- dynamic public facts came directly from `src/lib/tournament-home-data.ts`;
- aggregate statistics, tournament registration/capacity/prize, center verification/reviews/equipment, ranking and showdown values were therefore browser-owned fixture truth;
- route `/` had no loader/repository/runtime validation boundary;
- Hero finder submitted to nowhere (`preventDefault()` only);
- popular-game cards lost game identity when navigating;
- showdown navigation was generic;
- public metadata still used legacy `ایران مهر افزار` branding;
- claims were not backed by a stable anonymous backend projection;
- no current SEO/final-copy evidence chain existed.

F16 therefore productionizes the Home route while retaining the useful RTL esports visual direction.

## 3. Permanent architecture

`public / route → SSR loader → typed PublicHomeRepository → runtime-validated public-home projection → Home UI`

Repository/backend owns:
- dynamic aggregate discovery stats;
- stable game identity/slug + active-tournament count;
- data-driven Home finder options;
- featured tournament identity, venue, lifecycle, capacity/registration/fee/prize;
- gaming-center identity, verification/location/reviews/equipment/upcoming count;
- ranking preview identity/rank/rating/result-derived metrics;
- optional showdown identity/timing/player/rating projection.

Frontend owns:
- final static Persian explanatory copy;
- temporary finder form state;
- semantic navigation using stable projected IDs/slugs;
- responsive/accessibility presentation;
- deterministic dev/test/visual fixture behind the same repository contract.

No production fallback to fixture data is allowed.

## 4. Backend alignment

Backend Issue `#29` — CLOSED / COMPLETED as documentation alignment only.

- backend START `c72ec545782a25719009ae329d74ffd13259d020`;
- docs head `0338af8432d16a92ebafe85160e1d45f8ae3c8db`;
- PR `#30` — MERGED;
- PR gate `34591383203` — PASS Python 3.12/3.14;
- merge/main `335211d711c197a440e086bc570b86f2c5cd65f8`;
- post-main gate `34591528685` — PASS Python 3.12/3.14;
- exact live backend main reverified;
- no runtime Python implementation;
- Backend NEXT remains `P02 — Games / Catalog Foundation`.

Planned endpoint:
`GET /api/v1/discovery/home/`

## 5. Implementation decisions

F16 adds:
- Zod runtime contract with cross-field integrity checks;
- HTTP/Django repository adapter;
- deterministic fixture repository;
- selector that defaults Production to Django and development to fixture;
- SSR route loader;
- final public head metadata;
- real Home finder navigation to validated `/tournaments` search;
- stable dynamic links for tournament and center details;
- optional stats/ranking/showdown sections that disappear safely when the backend omits them;
- explicit pending/error states;
- focused F16 browser gate plus existing full quality gate.

F16 intentionally does not rewrite `src/lib/tournament-home-data.ts`, because unre-certified adjacent routes still consume that file. The accepted Home route stops importing it entirely.

## 6. Final product states

Required Home states:
- SSR ready projection;
- loader pending skeleton;
- loader/transport error with retry;
- stats present/absent;
- popular games present/empty;
- featured tournaments present/empty;
- centers present/empty;
- ranking preview present/absent;
- showdown present/absent;
- finder with all/partial filters;
- stable navigation from dynamic cards;
- responsive presentation at 375 / 390 / 430 / 768 / 1024 / 1440.

No engineering-stage copy or fabricated fallback claim may be shown to users.

## 7. SEO/final-copy law

See `docs/workstreams/F16_PUBLIC_HOME_SEO.md` for the evidence record.

Accepted intent split:
- `/` broad discovery gateway;
- `/tournaments` full inventory/filter page;
- `/games` game catalog;
- `/centers` center discovery;
- `/ranking` ranking inventory;
- `/host` acquisition.

Final Home H1:
`مسابقات گیمینگ حضوری نزدیکت را پیدا کن`

Final title:
`مسابقات گیمینگ حضوری و تورنمنت‌های گیم‌نت | Turnoment`

Robots: `index,follow`

Canonical: `/`

Organization JSON-LD is intentionally omitted until stable absolute production site/logo identity is available; F16 does not invent structured-data facts.

## 8. Quality gate

Before implementation merge:
1. one clean implementation commit from START;
2. no dependency/lockfile drift;
3. normal Frontend Quality Gate PASS;
4. full contract chain includes `public-home-contract.spec.ts`;
5. focused F16 gate verifies SSR H1/title/meta/robots/canonical, removal of legacy brand/engineering copy and dynamic crawlable links;
6. focused F16 gate captures six responsive screenshots;
7. manual six-width QA PASS;
8. PR-context normal + focused gates PASS;
9. mergeable=true and unresolved review threads=0;
10. exact pre-merge `main` lock;
11. expected-head merge;
12. post-main normal + focused QA;
13. documentation-only closeout;
14. closeout PR gates + expected-head merge;
15. terminal frozen-main normal + focused QA/artifact/digest;
16. exact-main verification and Issue #81 close completed.

Only then may F16 be reported as:
`DONE / MERGED / FROZEN — FINAL_CURRENT`.
