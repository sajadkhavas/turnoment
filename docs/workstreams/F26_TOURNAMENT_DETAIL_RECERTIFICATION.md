# F26 — Tournament Detail Current-Law Recertification

## Status

`IN PROGRESS — IMPLEMENTATION / EXACT-HEAD QA`

Tracking Issue: `#116`.

Route: `/tournaments/$id`.

START_SHA:

`8d6148b563b8fa84d5cef41903b8dea6de07a6c9`

Implementation branch:

`phase/f26-tournament-detail-recertification`

## Why F26 exists

F01 originally delivered and terminally froze Tournament Detail + Registration. The public detail route remains classified `FINAL_PRE_SEO` because F01 predates the current strict frontend page-delivery and SEO/final-copy laws. F26 recertifies the existing permanent architecture rather than rebuilding a working product surface.

F25 was terminally closed before F26 started. Issue #113 is `CLOSED / COMPLETED` and the exact F26 START is the frozen F25 main SHA above.

## Preserved architecture

Permanent boundary remains:

`Route → canonical identifier/slug resolution → loader → TournamentDetailRepository → Zod-validated TournamentDetail → UI`

Registration remains a separate private flow at `/tournaments/$id/register` and continues to use the accepted repository/action contract. Frontend does not authoritatively calculate lifecycle, registration eligibility, capacity, bracket/result, payment/refund, moderation or dispute truth.

The production Django adapter continues to runtime-validate network responses with the existing Zod schemas.

## Official-source audit

Reviewed current official sources before material implementation:

- TanStack Router — Document Head Management: route `head` is the accepted route-level mechanism for title/meta/link/social metadata in Start/Router applications.
- TanStack Start / Router SSR behavior: the existing public route remains `ssr: true`; loader-provided tournament identity/content is available to server-rendered output and head generation.
- Google Search Central — Event structured data: physical Event eligibility requires authoritative event location data including `Place` and a detailed `PostalAddress`.
- Google Search Central baseline sources named by `SEO_FINAL_COPY_PROTOCOL.md`: people-first content, titles/snippets, crawlable links, canonical/indexing and structured-data policy.
- WCAG 2.2 baseline remains inherited from F01 and is rechecked by F26 responsive/browser QA.

### Structured-data decision

`Event` JSON-LD is intentionally **not added in F26**.

Current authoritative `TournamentDetail.venue` contains stable venue identity, city and district but does not contain a detailed postal street address/postal code/country contract suitable for Google's Event location requirements. F26 must not invent that data. Event structured data may be reconsidered only after the authoritative tournament/venue API contract exposes sufficient location fields.

## Design / competitive reference audit

Current tournament-product references reviewed include Battlefy tournament-page/navigation/flow guidance and FACEIT tournament setup/rules guidance.

Repeated user needs observed:

- event identity and game/platform;
- date/time and venue;
- competition format;
- registration availability/capacity;
- entry fee and prize;
- tournament-specific rules;
- participant roster;
- bracket/progression state;
- clear join/registration action.

The existing Turnoment information architecture already covers these jobs. F26 therefore preserves the accepted premium RTL esports layout and improves current-law copy/metadata/QA rather than introducing a gratuitous redesign.

## SEO content research

### Identity

- Indexability: public / `index,follow` on canonical tournament slug.
- Canonical route: `/tournaments/{tournament.slug}`.
- Legacy stable identifiers remain accepted only as compatibility inputs and redirect to the canonical slug.

### Page purpose and audience

Product/user job: help a player evaluate one specific in-person tournament and decide what to do next without needing another search.

Primary audience: players considering or preparing to enter the tournament.

Secondary audience: visitors checking participants, bracket state, venue and event logistics.

Why this route exists independently: discovery `/tournaments` answers "which tournament?"; detail `/tournaments/$id` answers "what exactly is this tournament and can/how do I participate?".

### Search intent

Primary intent: navigational + participation/transactional detail intent for a named tournament.

Secondary intent: informational event details (game, city/venue, schedule, format, rules, capacity, participants, bracket).

Primary topic/query cluster: tournament identity + game tournament detail.

Supporting clusters: tournament registration, tournament rules, tournament schedule, tournament bracket/participants, gaming-center venue.

Important entities: tournament title, game name, platform, venue, city/district, date/time, format, registration state, capacity, rules, participants.

Persian/English variants evaluated: natural Persian product labels are preferred for page-owned copy; canonical game names/gamer tags/platform names remain authoritative product data. Gaming-community terms may remain when they are actual authoritative data labels, but engineering-stage words are not page-owned copy.

### Current content landscape

Battlefy and FACEIT materials repeatedly surface overview/details, rules, prizes, schedule/check-in, participants/brackets and join actions. Turnoment can answer the same core decision needs in one SSR Persian page with direct venue/player/rules links and an authoritative registration state.

No search-volume or keyword-difficulty values are claimed.

### Cannibalization

Closest routes:

- `/tournaments` — discovery/list intent;
- `/rules` — platform-wide rules intent;
- `/centers/$id` — venue identity/local intent;
- `/players/$username` — player identity intent;
- `/tournaments/$id/register` — private registration completion intent.

F26 remains distinct because it is the canonical public entity page for one tournament.

Internal links from detail remain descriptive and crawlable where public: tournaments discovery breadcrumb, platform rules, venue page and public participant profiles. Registration CTA points to the separate private registration route.

## Final copy / metadata plan

H1: authoritative `tournament.title`.

Dynamic title:

`{tournament.title} | تورنمنت {game.name} | Turnoment`

Dynamic meta description summarizes the visible tournament identity, game, venue/city, date/time and the available rules/capacity/participants/registration information without unsupported superlatives.

Not-found title:

`مسابقه پیدا نشد | Turnoment`

Page-owned copy changes include natural Persian labels such as:

- `Check-in` → `اعلام حضور`;
- `Ruleset` → `نسخه قوانین`;
- `Roster` → `فهرست رقابت`;
- page-owned bracket headings → `جدول مسابقات` / `مسیر رقابت`;
- `Seed` label → `جایگاه`;
- explanatory seeding copy → `چیدمان اولیه رقابت`.

No keyword-stuffing, fabricated popularity/ranking claims or unsupported "best/official/largest" language is introduced.

## Technical SEO

- SSR: `true`.
- Robots canonical page: `index,follow`.
- Not-found fallback head: `noindex,nofollow`.
- Canonical: canonical tournament slug only.
- OG: title, description, type, site name, canonical URL; authoritative hero image when available.
- Twitter: card/title/description.
- Event structured data: omitted for insufficient authoritative postal-address contract data.

## UI-state / accessibility / responsive scope

Existing accepted F01 states are preserved:

- normal;
- pending/skeleton;
- route error/retry;
- not found;
- open/full/closed/upcoming registration projections;
- participant empty/content states;
- bracket unpublished/content states;
- mobile sticky registration action;
- desktop sticky registration summary.

F26 focused QA must verify one semantic `<main>`, SSR content/head, canonical legacy-id redirect, descriptive links and screenshots at `375 / 390 / 430 / 768 / 1024 / 1440`.

## Current implementation scope

Material changes are intentionally bounded to:

- `src/routes/tournaments.$id.tsx` — current Turnoment metadata/final head;
- `src/components/tournaments/tournament-detail-page.tsx` — page-owned final Persian copy;
- `.github/workflows/f26-tournament-detail-quality.yml` — focused current-law gate;
- F26 governance/evidence documentation.

No backend, dependency, lockfile or registration-contract mutation is authorized by F26 unless a concrete current-law blocker is discovered.

## Acceptance status

- Mandatory root/protocol read: PASS.
- Exact START/main lock: PASS.
- Official-source audit: PASS.
- Design/reference audit: PASS.
- Search-intent/content research: PASS.
- Cannibalization check: PASS.
- Structured-data decision: PASS — intentionally omitted with documented authoritative-data reason.
- Current-law implementation: IN PROGRESS.
- Exact-head Full Quality: PENDING.
- Exact-head F26 focused QA: PENDING.
- PR/review/merge/post-main: PENDING.
- Docs-only closeout/terminal freeze: PENDING.

## Exact NEXT

Complete exact-head Full + F26 focused QA on the final implementation/evidence head; inspect artifacts; then open the implementation PR only when both gates are green.
