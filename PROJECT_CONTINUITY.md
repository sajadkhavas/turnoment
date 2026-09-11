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
5. verify exact current `main` SHA of every repository it will change;
6. read the relevant Issue/PR/workstream evidence before repeating work;
7. use a dedicated branch;
8. never claim `DONE / MERGED / FROZEN` from chat memory alone;
9. record exact branch/SHA/PR/CI/artifact evidence;
10. update both repositories when a cross-repo contract/global product truth changes;
11. preserve frozen routes outside the active workstream unless a separately authorized regression fix is required;
12. keep production fail-closed: deterministic fixture data is dev/test/visual-QA only unless a route-specific law explicitly says otherwise.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `READY TO MERGE`, `MERGED / CLOSEOUT IN PROGRESS`, `DONE / MERGED / FROZEN`.

## 2. Current frontend repository truth

Repository: `sajadkhavas/turnoment`

Current accepted implementation main before F18 closeout:

`112c3bbd2df7ca3988c81efa4dfb6ad569f621c2`

That SHA is the merged F18 `/games` implementation and has passed the required post-main implementation gates.

Active governance workstream:

`F18 — Public Game Catalog`

Route: `/games`

Tracking Issue: `#89` — MUST remain open until terminal frozen-main evidence exists.

Implementation branch: `phase/f18-public-game-catalog`

Closeout branch: `closeout/f18-public-game-catalog`

Route acceptance is promoted non-recursively to:

`FINAL_CURRENT`

because implementation is merged and required post-main implementation QA is green. The F18 workstream itself is still:

`MERGED / CLOSEOUT IN PROGRESS`

until closeout merge, terminal frozen-main QA/artifacts/digests, exact live-main verification and Issue #89 closure are complete.

Runtime truth remains:

`FRONTEND MOCK / BACKEND PENDING`

until backend P02 implements and permission-tests `GET /api/v1/games/`.

## 3. F18 permanent architecture truth

Permanent boundary:

`/games → SSR loader → typed GameCatalogRepository → runtime-validated catalog projection → Game Catalog UI`

Repository/backend owns:
- published catalog membership and order;
- stable game ID and canonical slug;
- authoritative game name/short name/platform labels;
- game-entity catalog summary/image;
- optional authoritative tournament-count projection.

Frontend owns:
- final Persian page copy and information hierarchy;
- presentation/accessibility/responsive behavior;
- canonical/robots metadata;
- crawlable links to `/games/$slug` and `/tournaments?game=<stable-game-id>`;
- deterministic fixture repository for dev/test/visual QA only.

Frontend MUST NOT derive production catalog membership, canonical identity or tournament counts from local tournament arrays.

Production HTTP adapter targets:

`GET /api/v1/games/`

and requires `VITE_API_BASE_URL`, runtime-validates the payload and fails closed without fixture fallback.

Frozen F02 `/games/$slug` remains `FINAL_CURRENT` and was kept outside the F18 implementation diff.

## 4. F18 implementation evidence

Frontend START_SHA:

`73955783add94c562f4eea0bb55300aab077c342`

Final reviewed implementation head:

`e44a3ba812a937aa41d5dbeb17c21b8ed641510d`

Implementation compare from START:
- ahead `6`;
- behind `0`;
- `12` changed files;
- `bun.lock` unchanged;
- no dependency/version mutation;
- `package.json` final delta only appends the F18 contract spec to the existing full test command;
- frozen F02 source/contract/workflow/docs absent from the diff.

Implementation PR:

`#90` — MERGED with expected-head lock.

Implementation merge / accepted main:

`112c3bbd2df7ca3988c81efa4dfb6ad569f621c2`

Pre-merge acceptance:
- mergeable `true`;
- unresolved review threads `0`;
- exact pre-merge frontend `main` remained START_SHA.

## 5. F18 exact-head QA

Exact-head normal Frontend Quality Gate:
- run `34630735395` — PASS;
- artifact `10275729589`;
- digest `sha256:4d48a7a492e93bafabbf372896b388e65763a80c6db50e29c048d211e158cfc3`.

Exact-head focused F18 Public Game Catalog Quality Gate:
- run `34630735403` — PASS;
- artifact `10276037245`;
- digest `sha256:1b242047c53480f87693585b1601114f15a17330bfd7979dd1317752d6c6cefe`;
- six-width evidence `375 / 390 / 430 / 768 / 1024 / 1440` manually inspected with no observed horizontal overflow, clipping or overlap.

## 6. F18 PR-context QA

Frontend Quality Gate:
- run `34631270914` — PASS;
- artifact `10276073860`;
- digest `sha256:b57c0ad5573a277bf31c731424c97c598351d40f86bd6ac8e66220c96727092e`.

Focused F18 gate:
- run `34631270926` — PASS;
- artifact `10276765029`;
- digest `sha256:b3d4b1d07070856b46d0899167990efffa0ea306277d5f105f45fd6a5686a0f6`.

Frozen-route regression gates:
- F17 run `34631270916` — PASS, artifact `10275933560`, digest `sha256:7159752464872a2ba7c810a84b4e77e1c468590ac9e28056a1e1aee60fb20301`;
- F16 run `34631270958` — PASS, artifact `10276532628`, digest `sha256:701be29cb8bc17bee86d516de7018b4faa8d605674ce05c9061854d9e1771131`.

## 7. F18 post-main implementation QA

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

Live frontend `main` was reverified exact `112c3bbd2df7ca3988c81efa4dfb6ad569f621c2` before closeout branch creation.

## 8. F18 SEO / final-copy truth

Final H1:

`بازی‌های مسابقات گیمینگ`

Final title:

`بازی‌های مسابقات گیمینگ حضوری | Turnoment`

Indexing:
- canonical `/games`;
- robots `index,follow`;
- primary catalog SSR-rendered;
- no unsupported route-specific rich-result schema.

Intent boundary:
- `/games` = public game catalog;
- `/games/$slug` = one game's competitive hub;
- `/tournaments` = tournament inventory/filtering;
- `/centers` = gaming-center discovery;
- `/ranking` = player ranking intent.

No invented popularity/search-volume/ranking/prize/viewership/superlative claim is authorized.

## 9. Backend alignment truth

Backend repository:

`sajadkhavas/turnoment-backend`

F18 documentation-only backend alignment is terminal:
- Backend START `a5644ae4b4e64908088f389e43155c268fe6e29d`;
- Issue `#33` — CLOSED / COMPLETED;
- docs head `c3bc950c69881b812a35e5fb39cda37d1c2c3da7`;
- PR `#34` — MERGED;
- PR-context Backend Quality Gate `34631004853` — PASS on Python 3.12 / 3.14;
- backend merge/main `b0fc9ed73dc57aed6a28453745386489aaef0ceb`;
- post-main Backend Quality Gate `34631189236` — PASS on Python 3.12 / 3.14;
- no runtime Python/model/migration/serializer/view/URL/dependency/phase-registry implementation was added.

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

## 10. Previous accepted frontend truth

F01–F17 remain accepted according to their route/workstream records. In particular:
- F16 `/` = `DONE / MERGED / FROZEN — FINAL_CURRENT`;
- F17 `/tournaments` = `DONE / MERGED / FROZEN — FINAL_CURRENT`, frozen main `73955783add94c562f4eea0bb55300aab077c342`;
- F02 `/games/$slug` = `FINAL_CURRENT` and frozen;
- private account/dashboard/match workstreams retain their recorded `FINAL_PRIVATE` truth;
- `/tournaments/$id` remains `FINAL_PRE_SEO` pending a later limited current-law recertification.

Do not reopen frozen routes from chat memory.

## 11. F18 closeout law

Closeout is documentation-only and restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F18_PUBLIC_GAME_CATALOG.md`;
4. `docs/workstreams/F18_CLOSEOUT.md`.

No source, package, lockfile, workflow, runtime configuration or dependency mutation is authorized.

This closeout is non-recursive: its future merge SHA and terminal frozen-main CI/artifact/digest belong in Issue #89 after they exist, not in another documentation PR.

F18 is not terminal `DONE` until:
1. closeout compare is ahead 1 / behind 0 / exactly one commit / exactly four Markdown files;
2. closeout PR-context normal + focused F18 gates and triggered regressions pass;
3. mergeable=true, unresolved review threads=0 and exact live-main lock are verified;
4. closeout merges with expected-head lock;
5. terminal frozen-main normal + focused F18 QA/artifacts/digests pass;
6. exact live frontend main is reverified;
7. terminal evidence is recorded in Issue #89 and Issue #89 is closed `completed`.

## 12. Public-route NEXT after F18

After F18 terminal freeze, current-law order remains:

`/centers` → `/centers/$id` → `/ranking` → `/players/$username` → `/host` → `/rules`

unless an explicit product decision changes that order.

Legacy commerce/service/general-content routes remain `LEGACY_REVIEW` pending explicit product decision.
