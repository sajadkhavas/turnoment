# F02 — Final Game Detail

Status: `READY TO MERGE — SEO FINAL COPY GREEN / EXACT-HEAD CI REQUIRED`

Original F02 START_SHA: `2ea5df3ecbd3a698fa838a8023994c0fc73e18a1`

SEO/final-copy START_SHA: `ad6daedaa900e3b79969295e6ed16e7cb8302e9f`

Current branch: `phase/f02-seo-final-copy`

Tracking issue: `#29` — intentionally reopened after the stricter SEO/final-copy protocol became mandatory.

## 1. Goal

Deliver `/games/$slug` as a final public competitive game hub under both:

- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`
- `SEO_FINAL_COPY_PROTOCOL.md`

No later generic SEO/copy phase may be required for this route after F02 terminal closeout.

## 2. Original implementation truth

The technical F02 implementation was already merged and green before the stricter SEO protocol was introduced.

Evidence:

- implementation branch: `phase/f02-game-detail`
- final reviewed head: `a72bdcbcba0b54674adc1e8d6eb6685818e245d4`
- PR `#30 — F02 — Final Game Detail`
- PR CI `34351774310` — PASS
- open review threads: `0`
- implementation merge SHA: `6c36325e92dacc3eb60f895afa2b553e3046087a`
- post-merge main CI: `34352013348` — PASS
- browser QA: PASS at `375 / 390 / 430 / 768 / 1024 / 1440`
- browser artifact id: `10103768778`
- artifact digest: `sha256:b287add1165d611a03e6a98fd35cb5baae6ae67d0bf2856019cfb851105176e8`

The issue was reopened because final visible copy had engineering/system language that is not acceptable under the newer mandatory SEO/final-copy law.

## 3. Official documentation baseline

Reviewed and applicable:

- TanStack Start
- TanStack Start selective SSR
- TanStack Router document head
- Google canonicalization
- Google Breadcrumb structured data
- Google structured-data policies
- W3C WCAG 2.2
- Google Search sources recorded in `SEO_FINAL_COPY_PROTOCOL.md` and `docs/OFFICIAL_FRONTEND_SOURCES.md`

## 4. Design direction

Game Detail is a competitive game hub, not an encyclopedia or ecommerce product page. Existing Turnoment visual DNA is preserved; BLAST, Liquipedia, Battlefy and Toornament were used only for IA/interaction/reference research.

## 5. SEO/search-intent research

Full evidence: `docs/workstreams/F02_GAME_DETAIL_SEO_RESEARCH.md`

Primary intent:

**Find tournaments/competitions for one game in Iran and understand how to participate.**

Primary topic cluster:

- `مسابقات {game}`
- `تورنمنت {game}`
- `مسابقات حضوری {game}`
- `مسابقات {game} در ایران`

Supporting cluster:

- `ثبت نام مسابقات {game}`
- `گیم نت {game}`
- `براکت {game}`
- `لیگ {game}`
- `فرمت مسابقات {game}`
- `رتبه بندی بازیکنان {game}`

No search-volume, difficulty, ranking or popularity figures are invented.

## 6. Final information architecture

1. visible breadcrumb: Games → current game
2. game identity + supported platforms + people-first competitive summary
3. aggregate competition stats
4. current/open/upcoming tournaments
5. competition formats
6. player ranking state/preview
7. gaming centers hosting/supporting the game
8. descriptive internal links to tournament discovery, rankings and centers

## 7. Permanent contract

Production mapping:

`GET /api/v1/games/{slug}/`

Contract domains include stable id/semantic slug, publication state, final public description, media, platforms, competition-format summaries, aggregate counts, tournament summaries, ranking projection, gaming-center summaries and SEO projection.

Frontend does not authoritatively calculate publication state, tournament lifecycle, ranking eligibility, venue support or competition-format truth.

## 8. SEO/final-copy implementation

Implemented on `phase/f02-seo-final-copy`:

- final game descriptions rewritten around tournament/registration/venue/format/ranking user intent;
- visible engineering/system wording removed;
- section headings changed to explicit natural Persian search-aware wording;
- visible `Rating` label changed to `امتیاز`;
- ambiguous internal anchors replaced with descriptive anchors;
- no-tournament/no-ranking/no-center states rewritten as user-facing product states;
- metadata pattern changed to `مسابقات {game} در ایران | تورنمنت حضوری | ایران مهر افزار`;
- targeted final-copy regression checks added so prohibited engineering/system wording cannot silently return.

## 9. Cannibalization decision

- `/games` → browse games
- `/games/$slug` → one-game competitive hub
- `/tournaments` → full tournament discovery/registration
- `/ranking` → full rankings
- `/centers` → center discovery

Game Detail summarizes adjacent information and links to the authoritative route instead of duplicating full experiences.

## 10. Structured data decision

- visible breadcrumb remains shipped;
- `BreadcrumbList` JSON-LD remains intentionally omitted until stable absolute public-origin URLs are available for item URLs;
- unsupported/speculative `VideoGame` rich-result markup remains omitted.

## 11. Current pre-PR quality evidence

Reviewed implementation checkpoint:

`dfa43a178ab11c9607720494bcb165e003ae0691`

Quality Gate:

`34358425752` — PASS

Evidence:

- frozen dependency install — PASS
- lint — PASS (`0` errors; inherited warnings only)
- production build + route generation — PASS
- TypeScript — PASS
- dashboard/F01/F02 contract checks — PASS
- F02 final-copy regression checks — PASS
- browser smoke — PASS
- exactly one `<main>` for F01 detail, F01 registration and F02 Game Detail — PASS
- 18 browser captures at `375 / 390 / 430 / 768 / 1024 / 1440` — PASS
- artifact id: `10106806417`
- artifact digest: `sha256:2c941652f83398f8fb6cb2f328a31b5c3995104c57c04d5a3e4996ce5d6ec5c7`

Manual visual review of Game Detail at `375 / 430 / 768 / 1440` — PASS:

- no horizontal clipping/overflow observed;
- Persian copy wraps naturally in reviewed captures;
- hero, stats, tournament cards and primary CTAs remain visible;
- desktop/tablet/mobile hierarchy remains consistent with Turnoment design DNA.

## 12. Route compliance registry

`docs/ROUTE_COMPLIANCE_REGISTRY.md` is the canonical route inventory.

`/games/$slug` remains `IN_PROGRESS` until terminal merge + closeout evidence exists. Promotion to `FINAL_CURRENT` is reserved for the closeout branch after real post-merge evidence.

## 13. Remaining terminal gates

- [x] SEO research and final copy
- [x] current implementation checkpoint Quality Gate
- [x] representative manual visual QA
- [ ] exact-head Quality Gate after this evidence commit
- [ ] SEO/final-copy PR CI PASS
- [ ] review threads = 0
- [ ] expected-head merge
- [ ] post-merge main CI PASS
- [ ] closeout continuity + registry promotion to `FINAL_CURRENT`
- [ ] closeout PR/CI/merge
- [ ] terminal main CI PASS
- [ ] Issue #29 close with completed evidence

F02 must remain open until every unchecked item above has real evidence.
