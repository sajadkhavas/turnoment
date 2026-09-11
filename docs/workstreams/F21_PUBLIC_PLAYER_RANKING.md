# F21 — Public Player Ranking

Status: `IN PROGRESS — SOURCE QA ACCEPTED / BACKEND ALIGNMENT COMPLETE / GOVERNANCE CHECKPOINT`

Route: `/ranking`

Tracking Issue: `#98`

START_SHA:

`b585e1e421c2e0febedf53e43349a23666004338`

Implementation branch:

`phase/f21-public-player-ranking`

Source implementation checkpoint before this governance commit:

`2d75596a31440dcd795ea609926a02e7a478e71e`

## 1. Why F21 exists

The START route was not acceptable under current Turnoment public-page law. It:
- rendered local fixture ranking truth without a route loader or repository boundary;
- kept the selected game in local `useState` rather than shareable URL state;
- consumed the shared Home ranking component and legacy `tournament-home-data.ts` ranking arrays;
- coexisted with a second local `ranking-data.ts` source of truth;
- allowed frontend fixture data to author rank, rating, match record and trend;
- had no stable player relation/public-profile identity contract;
- exposed legacy `ایران مهر افزار` metadata;
- lacked final pagination, pending, empty, error and production fail-closed behavior;
- had no current-law SEO/search-intent evidence.

F21 is therefore a controlled recertification/rebuild, not a cosmetic change.

## 2. Root-law preflight

Read from exact START before mutation:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `SEO_FINAL_COPY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md`;
- current `/ranking` route;
- shared Home ranking component;
- legacy `tournament-home-data.ts` ranking source;
- existing typed-but-mock `ranking-data.ts`;
- `/players/$username` to protect the next workstream boundary.

Live frontend `main` was verified exact START before Issue/branch creation.

## 3. Research / intent audit

Primary user:
- a player comparing competitive standing across other public players and navigating to public profiles.

Primary intent:
- leaderboard / competitive ranking discovery.

Primary topic/query cluster:
- `رتبه‌بندی بازیکنان`;
- `رنکینگ بازیکنان`;
- `جدول رده‌بندی بازیکنان بازی`;
- game-specific player rankings when backed by authoritative game facets.

Observed leaderboard/reference patterns emphasize:
- explicit rank/order;
- player identity;
- points/rating;
- movement/change;
- game/season/region context;
- filtering;
- profile navigation.

F21 uses those information needs without copying external brand assets/copy or claiming Turnoment is a national/official ranking authority.

Cannibalization boundary:
- `/ranking` = multi-player leaderboard/discovery;
- `/players/$username` = one player profile, next separate workstream;
- `/games` + `/games/$slug` = game discovery/detail;
- `/tournaments` = event discovery;
- dashboard rating surfaces = private player-specific state.

## 4. Official-document decisions

Reviewed before implementation:
- TanStack Router data-loading / SSR loader model;
- TanStack Router validated search params and search navigation;
- TanStack Router document head management;
- Google Search canonicalization guidance for filter/sort duplicate states;
- W3C WCAG 2.2 focus visibility / target-size baseline;
- DRF Permissions, Filtering and Pagination for backend contract alignment.

Applied decisions:
- primary ranking data loads through an SSR route loader;
- ranking navigation state is runtime-validated in the URL;
- route `head` owns title/meta/canonical/robots;
- production adapter fails closed and never silently substitutes fixture data;
- base `/ranking` is canonical/indexable;
- current game/season/region/type/page variants remain navigation states and are `noindex,follow` with canonical `/ranking`;
- no unsupported ranking structured data is added;
- future public backend read explicitly opts into `AllowAny` under Turnoment's authenticated global default;
- future backend filtering/order/pagination remain authoritative.

## 5. Permanent architecture

Accepted target:

`validated ranking search → loaderDeps → SSR loader → typed PlayerRankingRepository → strict runtime-validated ranking projection → Ranking UI`

Repository interface:

`getRanking(query): Promise<PlayerRankingPageData>`

Adapters:
- deterministic mock repository for dev/test/visual QA;
- Django HTTP repository for production.

Selector behavior:
- explicit `VITE_DATA_ADAPTER=mock` → mock;
- explicit `django` → Django;
- otherwise development → mock;
- otherwise production → Django.

No silent production fixture fallback exists.

## 6. Planned production API

`GET /api/v1/rankings/`

Query dimensions:
- `game=<stable-game-slug>`;
- `season=<stable-season-slug>`;
- `region=<stable-region-slug>`;
- `type=tournament|challenge`;
- `page=<positive-integer>`.

Production adapter:
- requires `VITE_API_BASE_URL`;
- GET + `credentials: include` + JSON Accept;
- non-2xx HTTP response → error;
- strict Zod parse;
- no fixture substitution.

Current runtime:

`FRONTEND MOCK / BACKEND PENDING`

## 7. Ranking contract

Strict v1 projection includes:
- `schemaVersion = 1`;
- game/season/region/type facets;
- authoritative normalized `activeQuery`;
- stable `playerId`;
- public profile `username`;
- display `gamerTag`;
- stable city/game identity;
- positive authoritative `rank`;
- non-negative authoritative `rating`;
- explicit `ratingType`;
- `played`, `wins`, `losses`, `draws`;
- movement `{ direction: up|down|flat, positions }`;
- page-number pagination.

Integrity checks include:
- strict unknown-field rejection;
- unique facet IDs/slugs;
- unique player IDs/usernames/ranks per page;
- rows match active game and rating type;
- ascending rank order;
- wins + losses + draws = played;
- flat movement requires zero positions;
- up/down movement requires a positive position count;
- items cannot exceed page size;
- pagination math and active-page consistency.

## 8. Rating-domain rule

Tournament Rating and Challenge Rating are separate competitive truths.

F21 v1 projects one authoritative `rating` paired with the active `ratingType`. Changing ranking type requests a separate authoritative backend projection rather than deriving a second rating in the browser.

Challenge eligibility is deliberately absent from the F21 listing v1. The frontend does not calculate the platform challenge-unlock rule from public row data.

## 9. Identity / privacy

- `playerId` = stable backend relation identity;
- `username` = stable public-profile navigation identity;
- `gamerTag` = display text only, never a relation key.

Future backend public ranking responses must exclude private player/account/contact/auth/moderation/verification/payment/secret data. Linking to `/players/$username` does not authorize extra player data; that route remains responsible for its own future privacy projection.

## 10. UI / states

F21 UI provides:
- final ranking hero/copy;
- URL-backed game/ranking-type/season/region controls;
- desktop leaderboard table;
- mobile ranking cards with equivalent information hierarchy;
- stable profile links by username;
- authoritative rating, match record and movement;
- pagination;
- pending skeleton;
- retryable error state;
- empty state;
- natural navigation to tournaments and games.

Movement is not communicated by color alone; icon + text direction are visible. Filter/pagination/profile controls preserve visible focus and touch-safe sizing.

The frozen shared Home ranking component is not modified by F21.

## 11. SEO / final-copy lock

H1:

`رتبه‌بندی بازیکنان مسابقات Turnoment`

Title:

`رتبه‌بندی بازیکنان مسابقات | Turnoment`

Description:

`جدول رتبه‌بندی بازیکنان Turnoment را بر اساس بازی، نوع امتیاز، فصل و محدوده ببین و جایگاه، امتیاز و روند رقابتی هر بازیکن را مقایسه کن.`

Base route:
- canonical `/ranking`;
- robots `index,follow`;
- OpenGraph type `website`.

Current filter/page variants:
- canonical `/ranking`;
- robots `noindex,follow`.

No fabricated “best players”, official/national-ranking authority, popularity, search volume or ranking guarantees are authorized. No ranking schema is emitted merely to have structured data.

## 12. Source implementation scope

Source commit:

`2d75596a31440dcd795ea609926a02e7a478e71e`

Changed implementation surface:
1. `.github/workflows/f21-public-player-ranking-quality.yml`
2. `package.json` — test wiring only
3. `src/routes/ranking.tsx`
4. `src/components/ranking/player-ranking-page.tsx`
5. `src/lib/player-ranking-contract.ts`
6. `src/lib/player-ranking-contract.spec.ts`
7. `src/lib/player-ranking-fixture.ts`
8. `src/lib/player-ranking-http-repository.ts`
9. `src/lib/player-ranking-repository.ts`

Compare from START:
- ahead `1`;
- behind `0`;
- exactly one source commit;
- exactly nine implementation-surface files;
- `bun.lock` untouched;
- no dependency/version drift;
- package delta only appends F21 contract spec;
- frozen F16/F17/F18/F19/F20/F02 source untouched;
- `/players/$username` untouched;
- frozen shared Home ranking + legacy ranking data files untouched.

## 13. Exact-source QA

On exact source head `2d75596a31440dcd795ea609926a02e7a478e71e`:

Frontend Quality Gate:
- run `34657745984` — PASS;
- artifact `10286078892`;
- digest `sha256:eb4869cb5b72467341710d3a27ba755b9196634283ad3bef5e0a932cbea1f8e2`;
- lint/build/typecheck/full contracts/browser smoke/responsive screenshots PASS.

Focused F21 Public Player Ranking Quality Gate:
- run `34657746031` — PASS;
- artifact `10286283373`;
- digest `sha256:001cb4eef4d6f507e4061efc156ebbaac565cb7ee29718468ae8e1a4e9edbaf9`;
- contract/build/typecheck/SSR/SEO/search-state/responsive evidence PASS.

Manual visual review:
- base state checked at 375/390/430/768/1024/1440;
- Tekken 8 + Challenge + Tehran state checked at the same widths;
- no observed horizontal overflow, clipping or overlap;
- mobile cards and desktop table preserve ranking hierarchy.

## 14. Backend alignment

Backend repository: `sajadkhavas/turnoment-backend`.

F21 backend alignment is terminal as documentation-only work:
- START `e8e48061cba201b3a12ac534ef97f22565bea5a3`;
- Issue #39 CLOSED / COMPLETED;
- docs head `c7712f025da84050085ae1017b9f659c6f58d01a`;
- PR #40 MERGED with expected-head;
- PR-context gate `34658090539` PASS on Python 3.12 / 3.14;
- merge/main `44f18e462f63c625bc02e07ef93c15f1c385dcd0`;
- post-main gate `34658179049` PASS on Python 3.12 / 3.14;
- no ranking runtime implementation or backend phase reorder.

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 15. Remaining acceptance chain

Before implementation PR:
- commit this governance/workstream checkpoint;
- require Full + F21 exact-head QA again on the final reviewed source/docs head;
- verify cumulative compare and protected frozen routes.

Then:
1. implementation PR without auto-closing Issue #98;
2. PR-context Full + F21 + all triggered frozen-route regressions PASS;
3. mergeable=true, unresolved review threads=0, exact `main` START lock;
4. expected-head implementation merge;
5. post-main Full + F21 + triggered regressions PASS;
6. non-recursive documentation-only closeout;
7. closeout PR-context required gates PASS;
8. expected-head closeout merge;
9. terminal frozen-main Full + F21 + triggered regressions PASS with artifact/digest evidence;
10. exact live-main reverify;
11. terminal evidence in Issue #98;
12. close Issue #98 `completed`;
13. only then claim `DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 16. Protected NEXT boundary

After terminal F21 freeze, next public current-law recertification is:

`/players/$username`

Then:

`/host` → `/rules`.
