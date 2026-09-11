# F16 — Public Home SEO & Final Copy Evidence

Route: `/`

Target: `FINAL_CURRENT`

Research date: `2026-09-11`

## 1. Search intent and audience

Primary audience:
- players in Iran looking for an in-person gaming competition they can actually attend.

Secondary audience:
- gaming-center operators evaluating the host path.

Primary intent:
- discovery / participation.

Primary topic cluster:
- `مسابقات گیمینگ حضوری`;
- `تورنمنت بازی`;
- `مسابقات گیم نت`.

Supporting intent:
- find tournament by game;
- find tournament by city;
- find tournament by date;
- inspect gaming center context;
- view player ranking;
- host a tournament.

No keyword search-volume or difficulty number is claimed; F16 has no authoritative commercial keyword dataset.

## 2. Current SERP/content landscape

Qualitative Persian search review found a fragmented landscape dominated by:
- individual gaming-center/event pages;
- articles about LAN/in-person competitions;
- isolated tournament announcements.

F16 therefore positions `/` as a useful broad discovery gateway instead of pretending to be a single-event landing page.

This observation is qualitative only; it is not presented as market-share or ranking evidence.

## 3. Cannibalization boundary

`/`:
- broad discovery gateway;
- product explanation;
- entry into game/city/date tournament discovery;
- previews of authoritative tournaments, centers and ranking when available.

`/tournaments`:
- complete tournament search/filter inventory;
- owns detailed filter/search intent.

`/games`:
- game catalog/discovery.

`/centers`:
- gaming-center discovery.

`/ranking`:
- full ranking inventory.

`/host`:
- host/operator acquisition.

Home copy and internal links are written to hand users off to these more specific routes rather than duplicate their entire content.

## 4. Official technical sources reviewed

TanStack Start — Selective SSR:
`https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr`

Decision:
- keep Home `ssr: true`;
- initial loader and route component remain server-rendered so important public content exists in initial HTML.

TanStack Router — Data Loading:
`https://tanstack.com/router/latest/docs/guide/data-loading`

Decision:
- route loader coordinates the Home public projection before rendering;
- component-level direct fixture imports are removed from the active route architecture.

Google Search Central — canonicalization:
`https://developers.google.com/search/docs/crawling-indexing/canonicalization`

Decision:
- one canonical Home URL: `/`;
- no query-dependent Home canonical variants.

Google Search Central — title/snippet/helpful-content/internal-link guidance:
`https://developers.google.com/search/docs/appearance/title-link`
`https://developers.google.com/search/docs/appearance/snippet`
`https://developers.google.com/search/docs/fundamentals/creating-helpful-content`
`https://developers.google.com/search/docs/crawling-indexing/links-crawlable`

Decisions:
- descriptive, concise title aligned with visible H1/topic;
- meta description describes the actual discovery job rather than keyword stuffing;
- semantic crawlable links connect games/tournaments/centers/ranking/host routes;
- no fabricated authority, popularity, inventory or “best/number one” claim.

Google Search Central — Organization structured data:
`https://developers.google.com/search/docs/appearance/structured-data/organization`

Decision:
- omit Organization JSON-LD in F16 because stable absolute production site URL/logo identity has not been explicitly locked in current project truth;
- do not invent structured-data identifiers merely to satisfy a checklist.

W3C WCAG 2.2:
`https://www.w3.org/TR/WCAG22/`

Applied:
- visible focus styles;
- meaningful semantic labels;
- minimum touch-friendly control sizing;
- no interaction that exists only on hover;
- responsive hierarchy without hiding critical content behind pointer-only behavior.

## 5. Current product/design references

Reviewed for information hierarchy/patterns only, not for branding/copy replication:
- start.gg Home/Search — direct “find events” entry point, choose-game discovery and featured-event hierarchy;
- Toornament — discovery/participation direction;
- Challonge — tournament/community discovery patterns.

Turnoment retains its established RTL dark esports visual identity. The borrowed lesson is the hierarchy: clear discovery first, then current opportunities, venue context, ranking preview and host path.

## 6. Final metadata

Title:
`مسابقات گیمینگ حضوری و تورنمنت‌های گیم‌نت | Turnoment`

Meta description:
`مسابقات گیمینگ حضوری را بر اساس بازی، شهر و زمان پیدا کن؛ جزئیات رقابت و مرکز میزبان را ببین و از همان صفحه مسیر ثبت‌نام را ادامه بده.`

Canonical:
`/`

Robots:
`index,follow`

Open Graph type:
`website`

Twitter card:
`summary_large_image`

No unsupported OG image URL is invented in F16.

## 7. Final visible copy anchors

H1:
`مسابقات گیمینگ حضوری نزدیکت را پیدا کن`

Hero support copy:
`بازی، شهر و زمان را انتخاب کن؛ مسابقات گیم‌نت‌ها را مقایسه کن و برای دیدن جزئیات هر رقابت مستقیم وارد صفحه همان مسابقه شو.`

Primary CTA:
`مشاهده مسابقات`

Secondary CTA:
`برای میزبانی مسابقه`

Finder CTA:
`پیدا کردن مسابقه`

Main section intent labels:
- `مسابقه را از بازی موردعلاقه‌ات پیدا کن`;
- `مسابقات پیش‌رو`;
- `مرکزهای میزبان مسابقه`;
- ranking preview only when authoritative projection exists;
- `از پیدا کردن مسابقه تا روز رقابت`.

## 8. Claim-control decisions

Removed/reworked from the previous active Home route:
- legacy `ایران مهر افزار` brand title;
- local hardcoded platform-stat authority;
- no-op finder;
- generic game navigation that discarded game identity;
- dynamic center verification/ranking/showdown truth read directly from browser fixture arrays.

Dynamic values may still appear in deterministic QA/dev fixture mode, but Production defaults to the HTTP repository and never silently falls back to those fixture records.

## 9. Structured-data and rich-result boundary

No FAQ/Review/Event/Organization schema is added merely because those schema types exist.

Reasons:
- Home is an aggregate discovery page, not one specific Event detail page;
- center ratings/reviews and event details belong to authoritative domain/detail pages;
- stable absolute Organization identity is not yet locked;
- structured data must reflect actual visible authoritative content and must not amplify fixture truth.

Future route-specific recertification may introduce eligible structured data only when the owning route has the required authoritative fields.

## 10. Acceptance evidence required

Before `FINAL_CURRENT`:
- SSR initial HTML includes final H1/title/meta/robots/canonical;
- no legacy brand or engineering-stage copy in Home SSR;
- finder is functional and navigates into `/tournaments` search;
- key internal links are crawlable;
- six-width visual QA passes;
- contract/runtime validation tests pass;
- normal and F16 focused CI pass on exact implementation/PR/post-main/terminal frozen main;
- Issue #81 records terminal evidence and closes completed.
