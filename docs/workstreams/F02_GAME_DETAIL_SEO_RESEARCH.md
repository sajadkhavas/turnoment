# F02 — Game Detail SEO / Final Copy Research

Date: `2026-09-09`

Route: `/games/$slug`

SEO-workstream START_SHA: `ad6daedaa900e3b79969295e6ed16e7cb8302e9f`

Branch: `phase/f02-seo-final-copy`

Tracking issue: `#29`

## 1. Page purpose

Help a player searching for one competitive game quickly understand:

- which in-person tournaments are available;
- whether registration is open;
- where the tournament is hosted;
- which competition formats are used;
- whether a player ranking is available;
- where to continue to tournament discovery, rankings or gaming-center details.

This page is a competitive game hub. It is not an encyclopedia article and it must not compete with `/tournaments` as the primary all-tournament discovery page.

## 2. Audience

Primary audience:

- Iranian players looking for competitions for a specific game;
- players looking for registration and venue information;
- players comparing tournament formats and ranking activity for the same game.

Secondary audience:

- players discovering gaming centers that host that game;
- returning players checking current competition/ranking state.

## 3. Current search / content landscape reviewed

Research was performed on 2026-09-09 without inventing search volume, keyword difficulty or ranking metrics.

### Iranian fighting-game community / Tekken 8

Source: https://t.me/s/irfgc

Observed language and intent:

- `لیگ تکن 8 ایران`
- `محل برگزاری تهران`
- `پلتفرم برگزاری کنسول PS5`
- `ورودی رایگان`
- `مهلت ثبت نام`
- `براکت`
- group-stage and elimination scheduling

This confirms that users around a live Iranian fighting-game event need event discovery, venue, platform, registration deadline and bracket/format information together.

### Iranian CS2 competition coverage

Source: https://esgn.ir/game-news/counter-strike/oxin-game-cs2-season-2-new-format/

Observed language and intent:

- `مسابقات Counter-Strike 2 (CS2)`
- `ثبت‌نام ۶۴ تیم`
- `فصل دوم مسابقات`
- `Open Qualifier`
- `Closed Qualifier`

Source: https://esgn.ir/

Current Iranian esports coverage also uses competition/game-specific navigation and current-event language rather than generic game-description copy.

### Iranian in-person FC 26 + CS2 coverage

Source: https://sabakhabar.ir/552424/%D9%85%DB%8C%D8%B2%D8%A8%D8%A7%D9%86%DB%8C-%D8%A7%D9%87%D9%88%D8%A7%D8%B2-%D9%88-%D8%A7%D8%B5%D9%81%D9%87%D8%A7%D9%86-%D8%A7%D8%B2-%D9%85%D8%B3%D8%A7%D8%A8%D9%82%D8%A7%D8%AA-%D9%84%DB%8C%DA%AF-%D8%B3%DB%8C%D9%85%D8%B1%D8%BA-%D9%87%D9%81%D8%AA-%D8%AE%D9%88%D8%A7%D9%86/

Observed language and intent:

- `مسابقات بازی ویدیویی کانتر استریک ۲ و FC 26`
- `به‌صورت حضوری`
- city/venue context
- qualification and prize information

This directly supports using `مسابقات حضوری`, exact game names, venue and participation information in Game Detail copy.

### Official regional tournament language

Source: https://www.playstation.com/ar-bh/tournaments/

Observed product language:

- tournaments are presented by exact game name;
- competition frequency and eligibility are visible;
- participation is the primary action.

Source: https://playfc26.egamena.com/ar/homepage

Observed product language:

- `بطولة EA SPORTS FC 26`
- eligibility, registration, tournament schedule and rules are grouped around the competition.

### Official ranking terminology

Source: https://www.ea.com/games/ea-sports-fc/fc-pro/fc-pro-world-rankings

The official FC competitive ecosystem presents rankings as a distinct competition information domain. Turnoment keeps ranking separate from tournament discovery but links it from the game hub when relevant.

## 4. Search-intent decision

Primary intent:

**Find competitions/tournaments for a specific game in Iran and understand how to participate.**

Primary query/topic cluster:

- `مسابقات {game}`
- `تورنمنت {game}`
- `مسابقات حضوری {game}`
- `مسابقات {game} در ایران`

Supporting clusters:

- `ثبت نام مسابقات {game}`
- `گیم نت {game}` / `گیم سنتر {game}`
- `براکت {game}`
- `لیگ {game}`
- `فرمت مسابقات {game}`
- `رتبه بندی بازیکنان {game}`

No numeric search-volume or difficulty claims are made.

## 5. Name / spelling strategy

Use exact official/recognizable Latin game names in the H1 and semantic title context, while surrounding them with natural Persian competition language.

Relevant variants considered:

- `EA SPORTS FC 26`, `EA FC 26`, `FC 26`
- `Counter-Strike 2`, `CS2`, `کانتر استرایک ۲`
- `Tekken 8`, `تکن ۸`
- `Mortal Kombat`, `مورتال کامبت`
- `eFootball`, `ای‌فوتبال`
- `Warcraft`

Decision:

- H1 stays the canonical product/game name from the contract;
- copy may include the widely recognized abbreviation where it improves recognition, e.g. `Counter-Strike 2 (CS2)`;
- do not stuff Persian transliterations next to every English name merely for SEO.

## 6. Cannibalization map

### `/games`
Intent: browse supported competitive games.

### `/games/$slug`
Intent: understand competition availability and competitive context for one game.

### `/tournaments`
Intent: browse/filter all tournaments and registration opportunities.

### `/ranking`
Intent: browse the full player-ranking experience.

### `/centers`
Intent: discover gaming centers.

Game Detail therefore summarizes each adjacent domain and links to the authoritative destination instead of duplicating the full experience.

## 7. Content gap / opportunity

Observed Iranian results are fragmented across organizer/community posts, news coverage and tournament-platform links. Important details such as registration, venue, format/bracket and rankings are commonly split across multiple destinations.

Turnoment's useful page-level opportunity is to provide a single game-specific hub that combines:

- current tournament discovery;
- registration state;
- venue/gaming-center context;
- competition format;
- player ranking state;
- crawlable links to the full tournament/ranking/center destinations.

This is a content-organization opportunity, not a claim of superior rankings or market leadership.

## 8. Final visible-copy plan

### H1

`{canonical game name}`

### Hero summary

People-first summary centered on in-person tournaments, registration, venue, format and ranking where relevant.

### Tournament H2

`مسابقات {short game name}`

Supporting wording includes `مسابقات و تورنمنت‌ها`, registration, capacity, venue and prize context.

### Competition-format H2

`فرمت‌های مسابقات {short game name}`

Do not show implementation terms such as `Ruleset` or `contract`.

### Ranking H2

`رتبه‌بندی بازیکنان {short game name}`

Use `امتیاز` in visible column labels instead of exposing the engineering/model field name `Rating`.

### Gaming-center H2

`گیم‌نت‌های میزبان مسابقات {short game name}`

### Internal anchors

Use descriptive anchors such as:

- `همه مسابقات {game}`
- `مشاهده رتبه‌بندی کامل`
- `مشاهده {gaming center name}`
- `مشاهده گیم‌نت‌ها`

Avoid generic `اینجا کلیک کنید` and reduce ambiguous `مشاهده همه` anchors.

## 9. Final metadata pattern

Title:

`مسابقات {game name} در ایران | تورنمنت حضوری | ایران مهر افزار`

Description:

`مسابقات حضوری {game name} در ایران؛ وضعیت ثبت‌نام، تورنمنت‌ها، گیم‌نت‌های میزبان، فرمت رقابت و رتبه‌بندی بازیکنان را دنبال کن.`

Ranking wording is omitted from the generated description when that game has no published ranking entries.

Canonical:

`/games/{canonical-semantic-slug}`

Robots:

- published → `index,follow`
- archived/non-public → `noindex,follow`

## 10. Structured-data decision

Visible Games → Game breadcrumb remains useful.

`BreadcrumbList` JSON-LD remains intentionally omitted until the project has a stable absolute public-origin contract for structured-data item URLs.

No unsupported/speculative `VideoGame` rich-result markup is added.

## 11. Final-copy forbidden-language audit

The final Game Detail copy must not expose:

- `Ruleset`
- `Rating` as a UI/system field label
- `رابط کاربری`
- `قرارداد`
- `فهرست عمومی`
- `سیستم رتبه‌بندی عمومی`
- `mock`, `demo`, backend/server/API implementation-state wording

A targeted contract/final-copy regression test enforces this for game catalog descriptions, competition-format descriptions and SEO metadata.

## 12. Acceptance decision

F02 is SEO/final-copy complete only after:

- the researched copy is merged;
- targeted regression tests pass;
- browser QA confirms Persian wrapping at required breakpoints;
- PR review threads are zero;
- post-merge and terminal main CI are green;
- continuity and the route compliance registry record `/games/$slug` as current-law FINAL.
