# F02 — Final Game Detail

Status: `IN PROGRESS — SEO FINAL COPY IMPLEMENTED / QUALITY + MERGE PENDING`

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

Reviewed for the original implementation and still applicable:

- TanStack Start — https://tanstack.com/start/latest
- TanStack Start selective SSR — https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr
- TanStack Router document head — https://tanstack.com/router/latest/docs/guide/document-head-management
- Google canonicalization — https://developers.google.com/search/docs/crawling-indexing/canonicalization
- Google Breadcrumb structured data — https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Google structured-data policies — https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- W3C WCAG 2.2 — https://www.w3.org/TR/WCAG22/

SEO/final-copy work additionally follows the official Google Search sources listed in `SEO_FINAL_COPY_PROTOCOL.md` and `docs/OFFICIAL_FRONTEND_SOURCES.md`.

## 4. Design direction already accepted

References previously reviewed:

- Turnoment Homepage
- Tournament Discovery
- F01 Tournament Detail + Registration
- Player Dashboard
- BLAST Counter-Strike hub — https://blast.tv/cs
- Liquipedia tournament portal — https://liquipedia.net/counterstrike/Portal:Tournaments
- Battlefy discovery patterns — https://help.battlefy.com/en/articles/6950799-finding-tournaments-for-you
- Toornament player platform — https://blog.toornament.com/2025/02/toornament-evolves-with-a-new-tournament-platform-and-products-for-organizers/

Accepted direction: Game Detail is a competitive game hub, not an encyclopedia/product page.

## 5. Current SEO/search-intent research

Full evidence: `docs/workstreams/F02_GAME_DETAIL_SEO_RESEARCH.md`

Current Iranian/regional sources reviewed include:

- Iranian fighting-game / Tekken 8 community — https://t.me/s/irfgc
- Iranian CS2 coverage — https://esgn.ir/game-news/counter-strike/oxin-game-cs2-season-2-new-format/
- Iranian in-person FC 26 + CS2 coverage — https://sabakhabar.ir/552424/%D9%85%DB%8C%D8%B2%D8%A8%D8%A7%D9%86%DB%8C-%D8%A7%D9%87%D9%88%D8%A7%D8%B2-%D9%88-%D8%A7%D8%B5%D9%81%D9%87%D8%A7%D9%86-%D8%A7%D8%B2-%D9%85%D8%B3%D8%A7%D8%A8%D9%82%D8%A7%D8%AA-%D9%84%DB%8C%DA%AF-%D8%B3%DB%8C%D9%85%D8%B1%D8%BA-%D9%87%D9%81%D8%AA-%D8%AE%D9%88%D8%A7%D9%86/
- PlayStation regional tournament page — https://www.playstation.com/ar-bh/tournaments/
- EA FC regional tournament page — https://playfc26.egamena.com/ar/homepage
- official FC Pro ranking — https://www.ea.com/games/ea-sports-fc/fc-pro/fc-pro-world-rankings

Observed natural competition vocabulary includes:

- مسابقات
- تورنمنت
- مسابقات حضوری
- ثبت‌نام
- لیگ
- براکت
- گیم‌نت / گیم‌سنتر
- رتبه‌بندی
- exact game names / abbreviations

Primary intent chosen:

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

No search-volume, difficulty or ranking figures are invented.

## 6. Final information architecture

1. visible breadcrumb: Games → current game
2. game identity + supported platforms + final people-first competitive summary
3. aggregate competition stats
4. current/open/upcoming tournaments
5. competition formats
6. player ranking state/preview
7. gaming centers hosting/supporting the game
8. descriptive internal links to tournament discovery, rankings and centers

## 7. Permanent contract

Production mapping:

`GET /api/v1/games/{slug}/`

Contract domains:

- stable game id + semantic slug
- publication state
- game name/short name/final public description
- hero/media projection
- platforms
- competition-format summaries
- aggregate counts
- tournament summaries
- ranking state/entries
- gaming-center summaries
- SEO projection

Frontend does not authoritatively calculate publication state, tournament lifecycle, ranking eligibility, venue support or competition format truth.

## 8. SEO/final-copy implementation in current branch

Implemented:

- final game descriptions rewritten around tournament/registration/venue/format/ranking user intent;
- removed visible `Ruleset`, `Rating`, `contract`, UI/system-state wording from final Game Detail copy;
- section headings changed to explicit query-aligned natural Persian;
- ranking visible field label changed from `Rating` to `امتیاز`;
- ambiguous internal anchors replaced with descriptive anchors;
- no-tournament/no-ranking/no-center states rewritten as product states, not engineering states;
- per-game metadata pattern changed to:
  - title: `مسابقات {game} در ایران | تورنمنت حضوری | ایران مهر افزار`
  - description centered on in-person tournaments, registration, venue, format and ranking when available;
- game detail version bumped to the final-copy revision;
- targeted final-copy regression checks added to prevent forbidden engineering/system wording returning to fixture/catalog public copy.

## 9. Cannibalization decision

- `/games` → browse games
- `/games/$slug` → one-game competitive hub
- `/tournaments` → all tournament discovery/registration
- `/ranking` → full rankings
- `/centers` → center discovery

Game Detail summarizes adjacent information and links to the authoritative route instead of duplicating full experiences.

## 10. Structured data decision

- visible breadcrumb remains shipped;
- `BreadcrumbList` JSON-LD remains intentionally omitted until stable absolute public-origin URLs are available for item URLs;
- unsupported/speculative `VideoGame` rich-result markup remains omitted.

## 11. Route compliance registry

`docs/ROUTE_COMPLIANCE_REGISTRY.md` was added in this workstream so all chats can see which routes are:

- current-law final;
- pre-SEO final;
- needing recertification;
- explicit placeholders;
- rebuilds;
- legacy review.

`/games/$slug` stays `IN_PROGRESS` in that registry until terminal merge/CI closeout. It must be promoted only after real evidence exists.

## 12. Current owned changes

- `src/lib/game-detail-fixture.ts`
- `src/components/games/game-detail-page.tsx`
- `src/lib/game-detail-contract.spec.ts`
- `docs/workstreams/F02_GAME_DETAIL_SEO_RESEARCH.md`
- `docs/workstreams/F02_GAME_DETAIL.md`
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`
- `PROJECT_CONTINUITY.md` during evidence/closeout

## 13. Remaining gates

Before `DONE / MERGED / FROZEN`:

- [ ] exact-head lint
- [ ] TypeScript typecheck
- [ ] contract + final-copy tests
- [ ] production build / route generation
- [ ] browser QA and responsive copy wrapping
- [ ] PR CI PASS
- [ ] review threads = 0
- [ ] implementation merge
- [ ] post-merge main CI PASS
- [ ] closeout continuity + registry promotion to FINAL_CURRENT
- [ ] closeout PR/CI/merge
- [ ] terminal main CI PASS
- [ ] Issue #29 close with completed evidence

F02 must remain open until every item above has real evidence.
