# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-12`

## 1. Mandatory continuation law

Every chat/agent MUST read `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable work, and `docs/ROUTE_COMPLIANCE_REGISTRY.md`; verify exact live `main`; use a dedicated branch/Issue/PR; preserve frozen routes; keep production fail-closed; and never claim `DONE / MERGED / FROZEN` from chat memory alone.

Terminal closeout SHA/CI belongs in the tracking Issue after merge; do not create recursive documentation commits to self-record their own SHA.

## 2. Current terminal frontend baseline

Repository: `sajadkhavas/turnoment`.

Current terminal frozen frontend `main` before F21:

`b585e1e421c2e0febedf53e43349a23666004338`

This is the F20 closeout merge / frozen-main SHA.

F20 `/centers/$id` terminal evidence:
- Issue #95 — CLOSED / COMPLETED;
- implementation PR #96 — MERGED;
- closeout PR #97 — MERGED;
- terminal frozen main `b585e1e421c2e0febedf53e43349a23666004338`;
- terminal Full `34656182434` — PASS;
- terminal F20 `34656182364` — PASS;
- terminal F19 `34656182441` — PASS;
- terminal F18 `34656182358` — PASS;
- terminal F17 `34656182357` — PASS;
- terminal F16 `34656182313` — PASS.

Therefore F20 is terminal:

`DONE / MERGED / FROZEN — FINAL_CURRENT`

Previously frozen public routes remain protected:
- F16 `/`;
- F17 `/tournaments`;
- F18 `/games`;
- F19 `/centers`;
- F20 `/centers/$id`;
- F02 `/games/$slug`.

## 3. Active frontend workstream — F21

Workstream:

`F21 — Public Player Ranking`

Route:

`/ranking`

Tracking Issue:

`#98` — OPEN

START_SHA:

`b585e1e421c2e0febedf53e43349a23666004338`

Implementation branch:

`phase/f21-public-player-ranking`

Current source checkpoint before this governance commit:

`2d75596a31440dcd795ea609926a02e7a478e71e`

Status:

`IN PROGRESS — SOURCE QA ACCEPTED / BACKEND ALIGNMENT COMPLETE / GOVERNANCE CHECKPOINT`

Do not promote `/ranking` to `FINAL_CURRENT` until the implementation PR is merged and required post-main implementation QA is accepted. Do not call F21 terminally done until closeout merge + terminal frozen-main evidence are recorded in Issue #98.

## 4. F21 baseline defects that required recertification

The START `/ranking` route was not acceptable under current public-page law because it:
- had no SSR loader/repository boundary;
- kept game selection in local `useState` instead of shareable URL state;
- rendered fixture-owned ranking truth from a shared Home component;
- coexisted with a second local `ranking-data.ts` source of truth;
- let frontend fixtures author rank/rating/record/trend values;
- lacked stable player identity/profile navigation contract;
- used legacy `ایران مهر افزار` metadata;
- had no final pagination/empty/error/fail-closed production contract;
- had no current-law SEO/search-intent evidence.

F21 therefore rebuilds the public ranking boundary rather than cosmetically patching the legacy route.

## 5. F21 permanent architecture

Accepted target:

`validated ranking search → loaderDeps → SSR loader → typed PlayerRankingRepository → strict runtime-validated ranking projection → Ranking UI`

Search/navigation state:
- `game`;
- `season`;
- `region`;
- `type=tournament|challenge`;
- `page`.

Primary ranking data is loaded server-side through the route loader. Production defaults to the Django HTTP repository; development/test/visual QA may use deterministic fixtures through the same contract.

Production invariant:
- requires `VITE_API_BASE_URL` for Django adapter;
- GET + `credentials: include` + JSON Accept;
- non-2xx fails closed;
- strict runtime validation;
- no production fixture fallback;
- no browser calculation of official rank/rating/movement/eligibility.

## 6. Ranking-domain ownership

Planned endpoint:

`GET /api/v1/rankings/`

Backend/repository eventually owns:
- leaderboard membership and authoritative order/rank;
- stable `playerId`;
- public `username` navigation identity;
- gamer tag projection;
- game/city identity;
- Tournament Rating and Challenge Rating truth;
- selected rating projection for active ranking type;
- played/wins/losses/draws projection;
- rank movement;
- ranking facets/normalization;
- filtering and pagination.

Frontend owns:
- validated/shareable URL state;
- presentation/final copy;
- SEO/canonical/robots;
- accessibility/responsive behavior;
- deterministic dev/test/visual-QA fixtures only.

Tournament Rating and Challenge Rating remain separate competitive truths. F21 v1 returns one authoritative `rating` paired with `ratingType`; switching `type` requests a different authoritative projection. F21 does not calculate challenge eligibility and does not require eligibility in public ranking rows.

Identity rules:
- `playerId` = stable relation identity;
- `username` = stable public profile-navigation identity;
- `gamerTag` = display text only, never a relation key.

## 7. F21 strict v1 projection

Response includes:
- `schemaVersion = 1`;
- game/season/region/ranking-type facets;
- authoritative `activeQuery`;
- player rows with `playerId`, `username`, `gamerTag`, city/game identities, `rank`, `rating`, `ratingType`, played/wins/losses/draws and movement;
- page-number pagination metadata.

Integrity validation rejects:
- unknown response fields;
- duplicate facet/player/profile/rank identities;
- rows outside the active game/rating type;
- invalid rank ordering;
- wins/losses/draws arithmetic inconsistent with played count;
- invalid movement semantics;
- pagination inconsistencies.

## 8. F21 SEO / final-copy truth

Final H1:

`رتبه‌بندی بازیکنان مسابقات Turnoment`

Final title:

`رتبه‌بندی بازیکنان مسابقات | Turnoment`

Final description:

`جدول رتبه‌بندی بازیکنان Turnoment را بر اساس بازی، نوع امتیاز، فصل و محدوده ببین و جایگاه، امتیاز و روند رقابتی هر بازیکن را مقایسه کن.`

Indexing policy:
- base `/ranking`: canonical `/ranking`, robots `index,follow`;
- any active filter/page variant: canonical `/ranking`, robots `noindex,follow`.

No unsupported “best players”, national/official authority, popularity, search-volume or ranking-guarantee claim is authorized. No ranking structured data is added merely for schema coverage.

Intent boundary:
- `/ranking` = multi-player leaderboard/discovery;
- `/players/$username` = one player profile, protected as the next workstream;
- `/games` and `/games/$slug` = game discovery/detail;
- `/tournaments` = event discovery;
- dashboard rating surfaces = private player-specific state.

## 9. F21 source scope and exact-source QA

Source implementation commit:

`2d75596a31440dcd795ea609926a02e7a478e71e`

Compare from START:
- ahead `1` / behind `0`;
- exactly one source commit;
- exactly `9` implementation-surface files;
- no `bun.lock` mutation;
- `package.json` only appends `player-ranking-contract.spec.ts` to the existing test chain;
- no dependency/version drift;
- no mutation of shared Home ranking, legacy ranking-data sources, `/players/$username`, or frozen F16/F17/F18/F19/F20/F02 route source.

Exact-source Frontend Quality Gate:
- run `34657745984` — PASS;
- artifact `10286078892`;
- digest `sha256:eb4869cb5b72467341710d3a27ba755b9196634283ad3bef5e0a932cbea1f8e2`.

Exact-source F21 Public Player Ranking Quality Gate:
- run `34657746031` — PASS;
- artifact `10286283373`;
- digest `sha256:001cb4eef4d6f507e4061efc156ebbaac565cb7ee29718468ae8e1a4e9edbaf9`.

Manual responsive inspection:
- base `/ranking` checked at `375 / 390 / 430 / 768 / 1024 / 1440`;
- filtered Tekken 8 / Challenge / Tehran state checked at the same widths;
- no observed horizontal overflow, clipping or overlap;
- mobile cards and desktop table preserve the same information hierarchy.

## 10. Backend F21 documentation alignment

Backend repository:

`sajadkhavas/turnoment-backend`

Backend F21 alignment is terminal **as documentation alignment only**:
- Backend START `e8e48061cba201b3a12ac534ef97f22565bea5a3`;
- Issue #39 — CLOSED / COMPLETED;
- docs head `c7712f025da84050085ae1017b9f659c6f58d01a`;
- PR #40 — MERGED with expected-head lock;
- PR-context Backend Quality Gate `34658090539` — PASS on Python 3.12 / 3.14;
- backend merge/main `44f18e462f63c625bc02e07ef93c15f1c385dcd0`;
- post-main Backend Quality Gate `34658179049` — PASS on Python 3.12 / 3.14;
- no Python/model/migration/serializer/view/URL/settings/dependency/workflow/phase-registry runtime mutation was added.

Runtime remains exactly:

`FRONTEND MOCK / BACKEND PENDING`

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

## 11. F21 remaining acceptance chain

Required remaining chain:
1. commit this three-Markdown governance checkpoint;
2. re-run exact-head Full + focused F21 QA on the final reviewed source/docs head;
3. verify cumulative compare and frozen-route protection;
4. implementation PR without auto-closing Issue #98;
5. PR-context Full + F21 + all triggered frozen-route regressions PASS;
6. require mergeable=true, unresolved review threads=0 and exact pre-merge `main` lock at START_SHA;
7. expected-head implementation merge;
8. post-main Full + F21 + triggered regression QA PASS;
9. documentation-only non-recursive closeout using exactly four Markdown files and one commit;
10. closeout PR-context gates PASS + expected-head merge;
11. terminal frozen-main Full + F21 + triggered regression QA/artifacts/digests;
12. exact live-main verification;
13. terminal evidence in Issue #98 and close `completed`;
14. only then report `F21 — DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 12. Public-route NEXT after terminal F21

After F21 terminal freeze:

`/players/$username` → `/host` → `/rules`

unless an explicit product decision changes that order.

Backend NEXT independently remains:

`P02 — Games / Catalog Foundation`
