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

`22e4c67425f2bf0cefe9079b2e014c2395f6448a`

That SHA is the merged F17 `/tournaments` implementation and has passed the required post-main implementation gates.

Active governance workstream:

`F17 — Public Tournament Discovery`

Route: `/tournaments`

Tracking Issue: `#84` — MUST remain open until terminal frozen-main evidence exists.

Implementation branch: `phase/f17-public-tournament-discovery`

Closeout branch: `closeout/f17-public-tournament-discovery`

Target: `FINAL_CURRENT`

Current workstream status:

`MERGED / CLOSEOUT IN PROGRESS`

Route acceptance may be promoted non-recursively to `FINAL_CURRENT` because implementation is merged and required post-main implementation QA is green. The F17 workstream itself is not terminally `DONE / MERGED / FROZEN` until closeout merge, terminal frozen-main QA/artifacts/digests, exact live-main verification and Issue #84 closure are complete.

Runtime truth remains:

`FRONTEND MOCK / BACKEND PENDING`

until an authorized backend domain phase implements `GET /api/v1/tournaments/`.

## 3. Previous terminal frontend truth

F01–F16 remain accepted/frozen according to their route/workstream records. Most recent prior terminal workstream:

F16 `/`:
- status `DONE / MERGED / FROZEN — FINAL_CURRENT`;
- Issue `#81` — CLOSED / COMPLETED;
- implementation PR `#82` — MERGED;
- implementation merge `2b66c5140511febaa98e96d93351cfdb62773bbf`;
- closeout PR `#83` — MERGED;
- frozen main `fb87a7d84470db6ed1eba03ce0251c5f1eb6b7a9`;
- terminal Frontend Quality Gate `34604894800` — PASS, artifact `10265894586`, digest `sha256:95703556b9372fe843200dc3a8e468fc46e6e4a0d6fa976b4bd177e57164047c`;
- terminal F16 Public Home Quality Gate `34604894703` — PASS, artifact `10265414493`, digest `sha256:233d5cafc550d6a05190519074e0d21a44630876d0d0addd2082d9a0336a5cd8`.

Do not reopen or rebuild frozen F01–F16 routes from memory. Any future material change requires a new controlled workstream and exact-source audit.

## 4. F17 permanent architecture truth

Permanent boundary:

`validated URL search → loaderDeps → SSR loader → typed TournamentDiscoveryRepository → runtime-validated discovery projection → UI`

Backend/repository owns:
- API query validation, filtering, ordering and pagination;
- stable tournament/game/venue identity;
- lifecycle and registration state;
- gaming-center verification/location;
- schedule/timezone/display-date projection;
- capacity limit/registered/remaining truth;
- entry fee and fixed prize;
- optional featured tournament identity.

Frontend owns:
- safe normalization of shareable URL search state;
- reset-to-page-1 navigation when inventory facets change;
- final static Persian labels/copy and information hierarchy;
- presentation/formatting/accessibility/responsive behavior;
- base-vs-faceted canonical/robots policy;
- deterministic fixture repository for dev/test/visual QA only.

Frontend MUST NOT become authoritative for filtering/sorting/pagination, verification, tournament lifecycle, registration/capacity, fee/prize or featured identity.

## 5. Production adapter law

Production uses the HTTP repository against the planned anonymous-safe/read-only endpoint:

`GET /api/v1/tournaments/`

Deterministic fixture data is limited to dev/test/visual QA behind the same typed contract. Production MUST NOT silently fall back to fabricated tournament records when the backend is unavailable.

## 6. F17 implementation — accepted on main

Frontend START_SHA:

`fb87a7d84470db6ed1eba03ce0251c5f1eb6b7a9`

Final reviewed implementation head:

`e160029e30cba55543abffc4a7974f261ecd2ad4`

Implementation compare:
- ahead `1` / behind `0`;
- exactly one implementation commit;
- exactly 12 changed files;
- `bun.lock` unchanged;
- no dependency/version mutation;
- F02 `/games/$slug` and shared `src/components/tournaments/tournament-discovery-card.tsx` outside the final diff.

Implementation PR:

`#87` — MERGED with expected-head lock.

Implementation merge / accepted main:

`22e4c67425f2bf0cefe9079b2e014c2395f6448a`

Pre-merge conditions:
- PR mergeable `true`;
- unresolved review threads `0`;
- live frontend `main` still exact F17 START_SHA immediately before merge;
- expected head `e160029e30cba55543abffc4a7974f261ecd2ad4` used for merge.

## 7. F17 exact-head acceptance evidence

Exact implementation head `e160029e30cba55543abffc4a7974f261ecd2ad4`:

Normal Frontend Quality Gate:
- run `34615882813` — PASS;
- artifact `10270855890`;
- digest `sha256:d92129eb07b13ba1be92ce8c5b3ebe658d16354868369bd91e8978a51ce82e2c`.

Focused F17 Public Tournament Discovery Quality Gate:
- run `34615882561` — PASS;
- artifact `10270585437`;
- digest `sha256:a07a4c861fca713328c448d79b2e646d5c2490366ffab8f3e1ab1f410c56938b`;
- artifact contains base/filtered SSR evidence plus exactly 12 screenshots across `375 / 390 / 430 / 768 / 1024 / 1440`;
- manual visual inspection PASS: no observed horizontal overflow, clipping or overlap.

## 8. F17 PR-context acceptance evidence

Implementation PR #87 exact head remained `e160029e30cba55543abffc4a7974f261ecd2ad4`.

- Frontend Quality Gate `34616599072` — PASS;
  - artifact `10271475959`;
  - digest `sha256:32ef3ddedb1032335bd3190ad7db91c6dc46d5b4f170a65536dbd849d17ea8b8`;
- F17 Public Tournament Discovery Quality Gate `34616599109` — PASS;
  - artifact `10271306271`;
  - digest `sha256:a38952b3d731428baaff299f953446644fb5672f4010f9955ee52d2eca70d8b6`;
- F16 Public Home regression gate `34616599011` — PASS;
  - artifact `10271261396`;
  - digest `sha256:3e81cbca21726e2aee8c5bfc4fe9f27574fd4d13d8d01473ef82253173f9938e`.

## 9. F17 post-main implementation evidence

Exact accepted implementation main `22e4c67425f2bf0cefe9079b2e014c2395f6448a`:

- Frontend Quality Gate `34617140049` — PASS including full browser regression;
  - artifact `10270983180`;
  - digest `sha256:0ee55d941a16e51812ae89a0e66402c45dacaf70c6a1b5c60396528c86fb6c94`;
- F17 Public Tournament Discovery Quality Gate `34617140093` — PASS;
  - artifact `10270487803`;
  - digest `sha256:a1752a6cd4deb55e5921cbe68b100d2f3d4689584fa279653521bce334b30c4e`;
- F16 Public Home regression gate `34617140003` — PASS;
  - artifact `10270367871`;
  - digest `sha256:c6007f3c04679ae436670be18e96db259aca9391410dc2370bb549e57466b3a1`.

Live frontend `main` was reverified exact `22e4c67425f2bf0cefe9079b2e014c2395f6448a` before closeout branch creation.

## 10. F17 product / SEO acceptance truth

Final H1:

`تورنمنت‌ها و مسابقات گیمینگ حضوری`

Final title:

`تورنمنت‌ها و مسابقات گیمینگ حضوری | Turnoment`

Indexing:
- base `/tournaments` canonical `/tournaments`, robots `index,follow`;
- normalized filtered/sorted/paginated variants use `noindex,follow` and canonical `/tournaments`;
- primary public inventory is SSR-rendered;
- Event structured data is intentionally omitted from this multi-event listing route; leaf tournament detail is the future evaluation surface.

Search-intent boundary:
- `/` broad discovery gateway;
- `/tournaments` full tournament inventory/filter intent;
- `/games` game catalog;
- `/centers` gaming-center discovery;
- `/tournaments/$id` one tournament detail/participation context;
- `/rules` rules/product-policy surface.

No unsupported search-volume, ranking guarantee, popularity superlative or invented schema fact is claimed.

## 11. F17 official-document decisions

Current official references reviewed and applied during F17:
- TanStack Router search parameter validation and navigation;
- TanStack Router data loading / `loaderDeps`;
- TanStack Router document head management;
- Google Search Central canonicalization and structured-data guidance;
- Google Crawling Infrastructure faceted-navigation guidance;
- W3C WCAG 2.2, including keyboard focus and target-size guidance.

Applied decisions include validated shareable search state, SSR loader ownership, deterministic loader deps, route-owned metadata, non-indexable faceted variants, semantic/crawlable links, visible focus, touch-safe controls and no unsupported Event structured data on the listing page.

## 12. Backend F17 alignment — terminal documentation truth

Backend repo: `sajadkhavas/turnoment-backend`.

- backend START `335211d711c197a440e086bc570b86f2c5cd65f8`;
- Issue `#31` — CLOSED / COMPLETED;
- docs head `1566574c26a747edee785fcc2ff76f014fc63b3e`;
- PR `#32` — MERGED;
- PR-context Backend Quality Gate `34609152989` — PASS Python 3.12/3.14;
- accepted backend merge/main `a5644ae4b4e64908088f389e43155c268fe6e29d`;
- post-main Backend Quality Gate `34609435404` — PASS Python 3.12/3.14;
- no runtime Python/models/migrations/serializers/views/URLs/dependency/phase-registry mutation.

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

F17 backend alignment does not mean the tournament-discovery endpoint is live.

## 13. Active closeout boundary

Closeout branch:

`closeout/f17-public-tournament-discovery`

Authorized closeout diff is Markdown-only and must be exactly:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F17_PUBLIC_TOURNAMENT_DISCOVERY.md`;
4. `docs/workstreams/F17_CLOSEOUT.md`.

Closeout MUST NOT mutate source, package files, lockfiles, workflows or runtime configuration.

Non-recursive rule:
- committed closeout docs record only evidence that already exists;
- the future closeout merge/frozen-main SHA and terminal post-closeout CI/artifact/digest belong in Issue #84 after they exist;
- do not create a recursive documentation PR merely to self-record its own SHA.

F17 may be reported as `DONE / MERGED / FROZEN — FINAL_CURRENT` only after closeout PR merge, terminal main full + focused F17 QA/artifacts/digests, exact live-main verification and Issue #84 closure as completed.

## 14. Exact NEXT

1. verify closeout compare is ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. open closeout PR without auto-closing Issue #84;
3. require PR-context full + focused F17 gates PASS and retain any triggered frozen-route regression gate;
4. require mergeable=true, unresolved review threads=0 and exact implementation-main lock;
5. expected-head merge closeout;
6. require terminal frozen-main full + focused F17 QA and artifact/digest evidence;
7. reverify exact live frontend main;
8. record terminal evidence in Issue #84 and close completed;
9. only then continue public recertification with `/games`.

Remaining current-law public order after F17 terminal freeze:

`/games` → `/centers` → `/centers/$id` → `/ranking` → `/players/$username` → `/host` → `/rules`.

`/tournaments/$id` remains `FINAL_PRE_SEO` until a later limited SEO/current-law recertification. Legacy commerce/service/content routes remain `LEGACY_REVIEW` pending explicit product decision.
