# F18 — Public Game Catalog Closeout

Status at document creation:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/games`

Target route status: `FINAL_CURRENT`

Tracking Issue: `#89`

This is a non-recursive closeout snapshot. It records only evidence that already exists when this document is created. The future closeout merge/frozen-main SHA and terminal post-closeout CI/artifact/digest are intentionally not self-recorded here; they belong in Issue #89 after they exist.

## 1. Exact source lock

Frontend START_SHA:

`73955783add94c562f4eea0bb55300aab077c342`

Implementation branch:

`phase/f18-public-game-catalog`

Final reviewed implementation head:

`e44a3ba812a937aa41d5dbeb17c21b8ed641510d`

Implementation merge / accepted main:

`112c3bbd2df7ca3988c81efa4dfb6ad569f621c2`

Closeout branch base:

`112c3bbd2df7ca3988c81efa4dfb6ad569f621c2`

Closeout branch:

`closeout/f18-public-game-catalog`

## 2. Implementation scope accepted

F18 replaces browser-owned legacy game-catalog truth with the permanent boundary:

`/games → SSR loader → typed GameCatalogRepository → runtime-validated catalog projection → Game Catalog UI`

Accepted behavior includes:
- production HTTP repository and deterministic QA fixture behind the same typed contract;
- production never silently falls back to fixture records;
- backend/repository authority for catalog membership/order, stable game identity, canonical slug, authoritative names/platform labels and optional authoritative tournament count;
- frontend no longer derives tournament counts from local tournament arrays;
- SSR-rendered primary catalog;
- pending/error/empty states;
- canonical crawlable game-detail links and game-filtered tournament links;
- final responsive/accessibility presentation;
- frozen F02 `/games/$slug` source/contract/workflow/docs kept outside the F18 implementation diff.

## 3. Public SEO/final-copy acceptance

Final H1:

`بازی‌های مسابقات گیمینگ`

Final title:

`بازی‌های مسابقات گیمینگ حضوری | Turnoment`

Technical indexing:
- canonical `/games`;
- robots `index,follow`;
- primary catalog SSR-rendered;
- no unsupported route-specific rich-result schema.

Intent boundary:
- `/games` public multi-game catalog;
- `/games/$slug` one game's competitive hub;
- `/tournaments` tournament inventory/filter intent;
- `/centers` gaming-center discovery;
- `/ranking` player ranking intent.

No unsupported search-volume, popularity, ranking, prize, viewership or superlative claim is introduced.

## 4. Official documentation applied

Current official guidance reviewed during F18 included:
- TanStack Router / Start data loading and SSR behavior;
- Google Search canonicalization, title/link and people-first content guidance;
- Google structured-data general policies;
- W3C WCAG 2.2.

Key accepted decisions:
- route loader owns primary SSR catalog fetch;
- production adapter is fail-closed;
- canonical catalog URL is singular `/games`;
- game identity and crawlable links are contract-backed;
- visible keyboard focus/touch-safe interaction is retained;
- route-specific rich-result markup is omitted for this multi-entity listing.

## 5. Cross-repo backend contract alignment

Backend repository:

`sajadkhavas/turnoment-backend`

Backend F18 alignment is terminal as documentation alignment only:
- START `a5644ae4b4e64908088f389e43155c268fe6e29d`;
- Issue #33 CLOSED / COMPLETED;
- docs head `c3bc950c69881b812a35e5fb39cda37d1c2c3da7`;
- PR #34 MERGED;
- PR-context Backend Quality Gate `34631004853` PASS on Python 3.12 / 3.14;
- backend merge/main `b0fc9ed73dc57aed6a28453745386489aaef0ceb`;
- post-main Backend Quality Gate `34631189236` PASS on Python 3.12 / 3.14;
- no runtime Python/model/migration/serializer/view/URL/dependency/phase-registry implementation added.

Planned endpoint:

`GET /api/v1/games/`

Runtime remains:

`FRONTEND MOCK / BACKEND PENDING`

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

## 6. Exact implementation diff evidence

Compare from START to final implementation head:
- ahead `6`;
- behind `0`;
- `12` changed files;
- no lockfile mutation;
- no dependency/version mutation;
- final `package.json` delta only appends the F18 contract spec to the existing full test command;
- frozen F02 source/contract/workflow/docs absent from final diff.

Implementation PR:

`#90` — MERGED with expected-head lock.

Pre-merge acceptance:
- PR mergeable `true`;
- unresolved review threads `0`;
- exact pre-merge frontend `main` remained START_SHA;
- expected head `e44a3ba812a937aa41d5dbeb17c21b8ed641510d` used.

## 7. Exact-head QA evidence

Normal Frontend Quality Gate:
- run `34630735395` — PASS;
- artifact `10275729589`;
- digest `sha256:4d48a7a492e93bafabbf372896b388e65763a80c6db50e29c048d211e158cfc3`.

Focused F18 Public Game Catalog Quality Gate:
- run `34630735403` — PASS;
- artifact `10276037245`;
- digest `sha256:1b242047c53480f87693585b1601114f15a17330bfd7979dd1317752d6c6cefe`;
- exactly six responsive screenshots at 375/390/430/768/1024/1440;
- manual visual inspection PASS with no observed horizontal overflow, clipping or overlap.

## 8. PR-context QA evidence

Frontend Quality Gate:
- run `34631270914` — PASS;
- artifact `10276073860`;
- digest `sha256:b57c0ad5573a277bf31c731424c97c598351d40f86bd6ac8e66220c96727092e`.

Focused F18 Public Game Catalog Quality Gate:
- run `34631270926` — PASS;
- artifact `10276765029`;
- digest `sha256:b3d4b1d07070856b46d0899167990efffa0ea306277d5f105f45fd6a5686a0f6`.

Frozen F17 Tournament Discovery regression gate:
- run `34631270916` — PASS;
- artifact `10275933560`;
- digest `sha256:7159752464872a2ba7c810a84b4e77e1c468590ac9e28056a1e1aee60fb20301`.

Frozen F16 Home regression gate:
- run `34631270958` — PASS;
- artifact `10276532628`;
- digest `sha256:701be29cb8bc17bee86d516de7018b4faa8d605674ce05c9061854d9e1771131`.

## 9. Post-main implementation QA evidence

Accepted implementation main:

`112c3bbd2df7ca3988c81efa4dfb6ad569f621c2`

Normal Frontend Quality Gate:
- run `34631796666` — PASS including full browser regression;
- artifact `10277080726`;
- digest `sha256:989c777a8aec106a33c9afbf2f2c351b12fdd517c63122c95f55bab7cb440a88`.

Focused F18 Public Game Catalog Quality Gate:
- run `34631796765` — PASS;
- artifact `10276318688`;
- digest `sha256:1e4fffe26726997203b39e5696f12c231b234dcd04b945a30fcd4e9bc5c3814e`.

Frozen F17 Tournament Discovery regression gate:
- run `34631796657` — PASS;
- artifact `10276089125`;
- digest `sha256:ecda07d7aebe16381fa7005de4233186c08fe2443cb1191678c0b574e94d3a2c`.

Frozen F16 Home regression gate:
- run `34631796757` — PASS;
- artifact `10276458697`;
- digest `sha256:ae422beabde3f9c10b7e16ea6471a455219730121076b4f443da8b6cf3b27862`.

Live frontend main was reverified exact accepted implementation SHA before closeout branch creation.

## 10. Route registry decision

Because the F18 implementation is merged and required post-main implementation QA is green, `/games` is eligible for non-recursive promotion from `NEEDS_RECERTIFICATION` to:

`FINAL_CURRENT`

This route-level promotion does not itself mean the F18 workstream is terminally frozen. Workstream terminal status still requires the closeout merge and terminal frozen-main evidence below.

## 11. Documentation-only closeout scope

This closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F18_PUBLIC_GAME_CATALOG.md`;
4. `docs/workstreams/F18_CLOSEOUT.md`.

No source code, package, lockfile, workflow, runtime configuration or dependency change is authorized.

## 12. Remaining terminal gates

After this closeout snapshot is committed, F18 still requires:
1. exact closeout compare: ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to `main` without auto-closing Issue #89;
3. PR-context normal + focused F18 gates PASS and any triggered frozen-route regression gates PASS;
4. mergeable=true;
5. unresolved review threads=0;
6. exact live-main lock at implementation merge SHA before merge;
7. expected-head closeout merge;
8. terminal frozen-main normal Frontend Quality Gate PASS;
9. terminal frozen-main focused F18 gate PASS;
10. terminal artifact IDs and SHA-256 digests recorded;
11. exact live frontend main reverified after terminal gates;
12. Issue #89 updated with those terminal facts and CLOSED / COMPLETED.

Only after those future facts exist may the workstream be reported:

`F18 — DONE / MERGED / FROZEN — FINAL_CURRENT`
