# F18 — Public Game Catalog

Status:

`MERGED / CLOSEOUT IN PROGRESS`

Tracking Issue: `#89`

Route: `/games`

START_SHA:

`73955783add94c562f4eea0bb55300aab077c342`

Implementation branch:

`phase/f18-public-game-catalog`

Closeout branch:

`closeout/f18-public-game-catalog`

Route acceptance:

`FINAL_CURRENT`

Workstream terminal status is still pending closeout merge + terminal frozen-main evidence.

## 1. Mandatory preflight

Read from exact START_SHA before mutation:
- `PROJECT_CONTINUITY.md`
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`
- `SEO_FINAL_COPY_PROTOCOL.md`
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`
- `docs/workstreams/F02_GAME_DETAIL.md`

Live frontend `main` was verified exact START_SHA before branch creation.

F17 `/tournaments` was independently terminal before F18 began:
- Issue `#84` CLOSED / COMPLETED;
- closeout PR `#88` MERGED;
- terminal frozen main `73955783add94c562f4eea0bb55300aab077c342`.

Backend alignment lock at F18 start:
- repo `sajadkhavas/turnoment-backend`;
- backend main `a5644ae4b4e64908088f389e43155c268fe6e29d`;
- Backend NEXT remained exactly `P02 — Games / Catalog Foundation`.

## 2. Baseline source audit

The START_SHA `/games` route was not current-law final because:
1. `src/routes/games.index.tsx` directly imported `popularGames` and `allTournaments` fixture data;
2. tournament counts were derived in the frontend with `allTournaments.filter(...)`;
3. no SSR loader/repository/runtime-validation boundary existed;
4. no production HTTP adapter existed;
5. no final loading/error/empty boundary existed;
6. title metadata still contained legacy `ایران مهر افزار` branding;
7. the route had not completed the current SEO/final-copy evidence chain.

F02 `/games/$slug` was already `FINAL_CURRENT`; it remained a frozen dependency and was not an F18 implementation target.

## 3. Permanent architecture

`/games → SSR loader → typed GameCatalogRepository → runtime-validated catalog projection → Game Catalog UI`

Repository/backend owns:
- public/published catalog membership;
- catalog order;
- stable `gameId`;
- canonical game slug;
- game name/short name;
- supported platform labels;
- game-entity catalog summary;
- optional cover image URL;
- optional tournament-count projection when authoritative.

Frontend owns:
- final static Persian page copy and information hierarchy;
- presentation/formatting;
- responsive/accessibility behavior;
- canonical/robots metadata;
- semantic/crawlable links to frozen game-detail pages;
- semantic/crawlable links to game-filtered tournament inventory;
- deterministic fixture repository for dev/test/visual QA only.

Frontend MUST NOT derive production catalog membership, canonical identity or tournament counts from local tournament arrays.

## 4. Runtime contract

Planned anonymous-safe/read-only endpoint:

`GET /api/v1/games/`

Production adapter requirements:
- `VITE_API_BASE_URL` is mandatory;
- HTTP non-success fails closed;
- JSON is runtime-validated with strict Zod schemas;
- no production fallback to fixture catalog records.

Current integration truth remains:

`FRONTEND MOCK / BACKEND PENDING`

until backend P02 implements and permission-tests `GET /api/v1/games/`.

The list contract preserves the same stable game IDs/canonical slugs used by frozen F02 planning for `GET /api/v1/games/{slug}/`.

## 5. DTO invariants

`GameCatalogPageData`:
- `schemaVersion = 1`;
- `totalItems` equals the complete public `items.length`;
- game IDs are unique;
- canonical slugs are unique.

Each public item:
- stable `gameId`;
- canonical lowercase slug;
- `publicationState = published`;
- `name` and `shortName`;
- final catalog description;
- one or more unique platform labels;
- nullable `coverImage`;
- nullable/non-negative `tournamentCount`.

The schema is strict and rejects unexpected private fields.

## 6. Navigation and frozen-route compatibility

Each game card exposes:
- canonical game hub: `/games/$slug` using the DTO canonical slug;
- tournament inventory: `/tournaments?game=<stable-game-id>`.

F18 did not edit frozen F02 source/contract/workflow/docs.

## 7. SEO / final-copy acceptance

Audience:
- players browsing which supported games have a competitive path in Turnoment.

Primary intent:
- game catalog / competitive-game discovery.

Topic cluster:
- `بازی‌های مسابقات گیمینگ`;
- `بازی‌های تورنمنت`;
- `بازی‌های رقابتی`.

Final route copy lock:
- H1: `بازی‌های مسابقات گیمینگ`;
- title: `بازی‌های مسابقات گیمینگ حضوری | Turnoment`;
- canonical: `/games`;
- robots: `index,follow`.

No external popularity ranking, search-volume, prize-pool, viewership, `best/largest/official` or similar unsupported claim is introduced.

Route-specific rich-result structured data is intentionally omitted for this multi-entity catalog.

## 8. Official-source decisions

Reviewed for F18:
- TanStack Router / Start data-loading and SSR guidance;
- Google Search canonicalization, title/link and people-first content guidance;
- Google structured-data general policies;
- WCAG 2.2 focus/target-size requirements.

Applied decisions:
- `ssr: true` remains explicit;
- data enters through the route loader, not browser `useEffect` authority;
- canonical route is singular `/games`;
- crawlable links connect catalog → game detail → tournament discovery;
- interactive targets preserve visible focus/touch-safe behavior;
- one semantic `<main>` per state.

## 9. Implementation lineage

Initial implementation commit:

`3675581bda3f97ca8d3cb49921c66e1e14240c5e`

Package test-suite wiring lineage:
- `f04ed182edb934a02f27a1ccf81059192aef9363` appended F18 contract testing but temporarily changed one existing devDependency version;
- `0b625d6554b0f5e5f638e449b18c3154d8e6ecf5` immediately restored the exact baseline dependency while retaining the F18 test addition.

Workstream documentation commit:

`2233901ac54cc81d64a5cac6041a91ced43b81f5`

Registry checkpoint commit:

`e44a3ba812a937aa41d5dbeb17c21b8ed641510d`

Final reviewed implementation head:

`e44a3ba812a937aa41d5dbeb17c21b8ed641510d`

Final compare from START:
- ahead `6`;
- behind `0`;
- `12` changed files;
- `bun.lock` unchanged;
- no dependency/version delta;
- `package.json` final delta only appends `game-catalog-contract.spec.ts` to the existing repository test command;
- frozen F02 files absent from the diff.

Implementation PR:

`#90` — MERGED with expected-head lock.

Implementation merge / accepted main:

`112c3bbd2df7ca3988c81efa4dfb6ad569f621c2`

Pre-merge acceptance:
- mergeable `true`;
- unresolved review threads `0`;
- exact pre-merge frontend main remained START_SHA.

## 10. Exact-head QA evidence

Normal Frontend Quality Gate:
- run `34630735395` — PASS;
- artifact `10275729589`;
- digest `sha256:4d48a7a492e93bafabbf372896b388e65763a80c6db50e29c048d211e158cfc3`.

Focused F18 Public Game Catalog Quality Gate:
- run `34630735403` — PASS;
- artifact `10276037245`;
- digest `sha256:1b242047c53480f87693585b1601114f15a17330bfd7979dd1317752d6c6cefe`;
- six screenshots at `375 / 390 / 430 / 768 / 1024 / 1440` manually inspected with no observed horizontal overflow, clipping or overlap.

## 11. PR-context QA evidence

Normal Frontend Quality Gate:
- run `34631270914` — PASS;
- artifact `10276073860`;
- digest `sha256:b57c0ad5573a277bf31c731424c97c598351d40f86bd6ac8e66220c96727092e`.

Focused F18 gate:
- run `34631270926` — PASS;
- artifact `10276765029`;
- digest `sha256:b3d4b1d07070856b46d0899167990efffa0ea306277d5f105f45fd6a5686a0f6`.

Frozen-route regressions:
- F17 run `34631270916` — PASS, artifact `10275933560`, digest `sha256:7159752464872a2ba7c810a84b4e77e1c468590ac9e28056a1e1aee60fb20301`;
- F16 run `34631270958` — PASS, artifact `10276532628`, digest `sha256:701be29cb8bc17bee86d516de7018b4faa8d605674ce05c9061854d9e1771131`.

## 12. Post-main implementation QA evidence

Accepted implementation main:

`112c3bbd2df7ca3988c81efa4dfb6ad569f621c2`

Normal Frontend Quality Gate:
- run `34631796666` — PASS;
- artifact `10277080726`;
- digest `sha256:989c777a8aec106a33c9afbf2f2c351b12fdd517c63122c95f55bab7cb440a88`.

Focused F18 gate:
- run `34631796765` — PASS;
- artifact `10276318688`;
- digest `sha256:1e4fffe26726997203b39e5696f12c231b234dcd04b945a30fcd4e9bc5c3814e`.

Frozen-route regressions:
- F17 run `34631796657` — PASS, artifact `10276089125`, digest `sha256:ecda07d7aebe16381fa7005de4233186c08fe2443cb1191678c0b574e94d3a2c`;
- F16 run `34631796757` — PASS, artifact `10276458697`, digest `sha256:ae422beabde3f9c10b7e16ea6471a455219730121076b4f443da8b6cf3b27862`.

Live frontend main was reverified exact accepted implementation SHA before closeout branch creation.

## 13. Cross-repo backend contract alignment

Backend F18 alignment is terminal as documentation alignment only:
- Backend START `a5644ae4b4e64908088f389e43155c268fe6e29d`;
- Issue `#33` CLOSED / COMPLETED;
- docs head `c3bc950c69881b812a35e5fb39cda37d1c2c3da7`;
- PR `#34` MERGED;
- PR-context Backend Quality Gate `34631004853` PASS on Python 3.12 / 3.14;
- backend merge/main `b0fc9ed73dc57aed6a28453745386489aaef0ceb`;
- post-main Backend Quality Gate `34631189236` PASS on Python 3.12 / 3.14;
- no runtime Python/model/migration/serializer/view/URL/dependency/phase-registry implementation added.

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

## 14. Route registry decision

Because the F18 implementation is merged and required post-main implementation QA is green, `/games` is eligible for non-recursive promotion to:

`FINAL_CURRENT`

This route-level promotion does not itself mean the F18 workstream is terminally frozen. Workstream terminal status still requires the closeout merge and terminal frozen-main evidence.

## 15. Documentation-only closeout scope

This closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F18_PUBLIC_GAME_CATALOG.md`;
4. `docs/workstreams/F18_CLOSEOUT.md`.

No source code, package, lockfile, workflow, runtime configuration or dependency change is authorized.

## 16. Remaining terminal gates

After this closeout snapshot is committed, F18 still requires:
1. exact closeout compare: ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to `main` without auto-closing Issue #89;
3. PR-context normal + focused F18 gates PASS and triggered frozen-route regression gates PASS;
4. mergeable=true;
5. unresolved review threads=0;
6. exact live-main lock at implementation merge SHA before merge;
7. expected-head closeout merge;
8. terminal frozen-main normal Frontend Quality Gate PASS;
9. terminal frozen-main focused F18 gate PASS;
10. terminal artifact IDs and SHA-256 digests recorded;
11. exact live frontend main reverified after terminal gates;
12. Issue #89 updated with terminal facts and CLOSED / COMPLETED.

Only after those future facts exist may the workstream be reported:

`F18 — DONE / MERGED / FROZEN — FINAL_CURRENT`
