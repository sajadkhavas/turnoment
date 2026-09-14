# F26 — Tournament Detail Current-Law Recertification

## Status

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Tracking Issue: `#116`.

Route: `/tournaments/$id`.

START_SHA:

`8d6148b563b8fa84d5cef41903b8dea6de07a6c9`

Implementation branch:

`phase/f26-tournament-detail-recertification`

Final implementation head:

`ca0463fb9b5c2bf9f0189dec7481badad3d5464b`

Implementation PR:

`#117` — MERGED with expected-head lock.

Implementation merge/main and closeout base:

`73d16522811ef758cbfc0cd6826cdb4a2be84c96`

Closeout branch:

`closeout/f26-tournament-detail-recertification`

## Why F26 exists

F01 originally delivered and terminally froze Tournament Detail + Registration. The public detail route remained `FINAL_PRE_SEO` because F01 predated the current strict frontend page-delivery and SEO/final-copy laws. F26 recertifies the existing permanent architecture rather than rebuilding a working product surface.

F25 was terminally closed before F26 started. Issue #113 is `CLOSED / COMPLETED`; the exact F26 START is the frozen F25 closeout main SHA above.

## Preserved architecture

Permanent boundary remains:

`Route → canonical identifier/slug resolution → loader → TournamentDetailRepository → Zod-validated TournamentDetail → UI`

Registration remains a separate private flow at `/tournaments/$id/register` and continues to use the accepted repository/action contract. Frontend does not authoritatively calculate lifecycle, registration eligibility, capacity, bracket/result, payment/refund, moderation or dispute truth.

The production Django adapter continues to runtime-validate network responses with the existing Zod schemas.

## Official-source audit

Current official sources were reviewed before material implementation:

- TanStack Router — Document Head Management: route `head` is the accepted route-level mechanism for title/meta/link/social metadata in Start/Router applications.
- TanStack Start / Router SSR behavior: the public route remains `ssr: true`; loader-provided tournament identity/content is available to server-rendered output and head generation.
- Google Search Central — Event structured data: physical Event eligibility requires authoritative event location data including `Place` and sufficiently detailed `PostalAddress` data.
- Google Search Central baseline sources named by `SEO_FINAL_COPY_PROTOCOL.md`: people-first content, titles/snippets, crawlable links, canonical/indexing and structured-data policy.
- WCAG 2.2 baseline inherited from F01 and rechecked through browser/responsive QA.

### Structured-data decision

`Event` JSON-LD is intentionally **not added in F26**.

Current authoritative `TournamentDetail.venue` contains stable venue identity, city and district but does not contain a sufficiently detailed postal street-address contract for Google's Event location requirements. F26 does not fabricate that data. Event structured data may be reconsidered only after the authoritative tournament/venue API contract exposes sufficient location fields.

## Design / competitive reference audit

Current tournament-product references reviewed included Battlefy tournament-page/navigation/flow guidance and FACEIT tournament setup/rules guidance.

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

The existing Turnoment information architecture already covered these jobs. F26 therefore preserved the accepted premium RTL esports layout and improved current-law copy/metadata/QA rather than introducing a gratuitous redesign.

## SEO content research

### Identity

- Indexability: public / `index,follow` on canonical tournament slug.
- Canonical route: `/tournaments/{tournament.slug}`.
- Legacy stable identifiers remain compatibility inputs only and redirect to the canonical slug.

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

Persian/English variants evaluated: natural Persian product labels are preferred for page-owned copy; canonical game names/gamer tags/platform names remain authoritative product data.

### Current content landscape

Battlefy and FACEIT materials repeatedly surface overview/details, rules, prizes, schedule/check-in, participants/brackets and join actions. Turnoment answers the same core decision needs in one SSR Persian page with direct venue/player/rules links and an authoritative registration state.

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

## Final copy / metadata acceptance

H1: authoritative `tournament.title`.

Dynamic title:

`{tournament.title} | تورنمنت {game.name} | Turnoment`

Dynamic meta description summarizes the visible tournament identity, game, venue/city, date/time and available rules/capacity/participants/registration information without unsupported superlatives.

Not-found title:

`مسابقه پیدا نشد | Turnoment`

Accepted page-owned copy changes include natural Persian labels such as:
- `Check-in` → `اعلام حضور`;
- `Ruleset` → `نسخه قوانین`;
- `Roster` → `فهرست رقابت`;
- page-owned bracket headings → `جدول مسابقات` / `مسیر رقابت`;
- `Seed` label → `جایگاه`;
- explanatory seeding copy → `چیدمان اولیه رقابت`.

No keyword-stuffing, fabricated popularity/ranking claims or unsupported `best/official/largest` language is introduced.

## Technical SEO acceptance

- SSR: `true`.
- Robots canonical page: `index,follow`.
- Not-found fallback head: `noindex,nofollow`.
- Canonical: canonical tournament slug only.
- OG: title, description, type, site name, canonical URL; authoritative hero image when available.
- Twitter: card/title/description.
- Event structured data: omitted for insufficient authoritative postal-address contract data.

## UI-state / accessibility / responsive acceptance

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

F26 focused QA verifies one semantic `<main>`, SSR content/head, canonical legacy-id redirect, descriptive links and screenshots at `375 / 390 / 430 / 768 / 1024 / 1440`.

## Implementation scope

Material implementation changes remained bounded to:
- `src/routes/tournaments.$id.tsx` — current Turnoment metadata/final head;
- `src/components/tournaments/tournament-detail-page.tsx` — page-owned final Persian copy;
- `.github/workflows/f26-tournament-detail-quality.yml` — focused current-law gate;
- F26 governance/evidence documentation.

No backend, dependency, lockfile or registration-contract mutation occurred.

## Exact-head acceptance

Final implementation head:

`ca0463fb9b5c2bf9f0189dec7481badad3d5464b`

- Full Frontend Quality `34849589140` — PASS;
  - artifact `10349556999`;
  - digest `sha256:c8be380de56930aabd4a1e4037a60152b7756ed8e2293f688b69294933dc3003`.
- F26 Tournament Detail Recertification `34849589075` — PASS;
  - artifact `10350060005`;
  - digest `sha256:07a05870b5fb16c5488d11a55a566cfaafad3fabf6c503f32ef3cadd74c904bd`.

## PR-context acceptance

PR `#117` actually triggered and passed:
- Full Frontend Quality `34850076098` — PASS;
- F26 Tournament Detail Recertification `34850076182` — PASS;
- F17 Public Tournament Discovery regression `34850076086` — PASS.

Before merge:
- PR mergeable = `true`;
- unresolved review threads = `0`;
- exact live `main` still equaled START `8d6148b563b8fa84d5cef41903b8dea6de07a6c9`;
- merge used expected implementation-head SHA.

Implementation merge/main:

`73d16522811ef758cbfc0cd6826cdb4a2be84c96`

## Post-main acceptance

Every workflow actually triggered on exact implementation main passed with real runner execution:

- Full Frontend Quality `34864166474` — PASS;
  - artifact `10355383823`;
  - digest `sha256:88ff8d1fef78c248e738315fa358e50b623153e6f64a9d3c191008dc3af3eb9e`.
- F26 Tournament Detail Recertification `34864166083` — PASS;
  - artifact `10356243874`;
  - digest `sha256:d996b4a5f0067087461d1ddee60d69005124c2496f50da9a3ceb7930b328193e`.
- F17 Public Tournament Discovery regression `34864166079` — PASS;
  - artifact `10356049157`;
  - digest `sha256:658b73c2a1b24548a2ab460f43c4346732aeb9c7b1023b440ca53748f73a4069`.

The route is therefore accepted at route level as `FINAL_CURRENT`.

## Closeout law

The remaining closeout is documentation-only and must be exactly one commit changing exactly:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F26_TOURNAMENT_DETAIL_RECERTIFICATION.md`;
4. `docs/workstreams/F26_CLOSEOUT.md`.

No source/package/lockfile/workflow/dependency/runtime/backend mutation is permitted.

Terminal completion requires:
1. exact closeout compare = ahead `1`, behind `0`, one commit, four Markdown files;
2. closeout PR-context actually-triggered gates PASS;
3. mergeable `true`, unresolved review threads `0`;
4. live `main` still exact implementation merge `73d16522811ef758cbfc0cd6826cdb4a2be84c96` before expected-head merge;
5. terminal frozen-main actually-triggered gates PASS on the exact closeout merge SHA;
6. terminal artifacts/digests recorded in Issue #116;
7. exact live `main` reverified;
8. Issue #116 closed completed.

Future closeout-head/merge/frozen-main facts belong in Issue #116 after they exist. No recursive follow-up docs commit is required.

## Acceptance status

- Mandatory root/protocol read: PASS.
- Exact START/main lock: PASS.
- Official-source audit: PASS.
- Design/reference audit: PASS.
- Search-intent/content research: PASS.
- Cannibalization check: PASS.
- Structured-data decision: PASS — intentionally omitted with documented authoritative-data reason.
- Current-law implementation: PASS.
- Exact-head Full Quality: PASS.
- Exact-head F26 focused QA: PASS.
- PR-context gates: PASS.
- PR review/merge: PASS.
- Exact post-main acceptance: PASS.
- Route-level status: `FINAL_CURRENT`.
- Docs-only closeout: IN PROGRESS.
- Terminal frozen-main evidence: PENDING.
- Issue #116 terminal closure: PENDING.

## Exact NEXT

Complete the single-commit documentation-only closeout from exact base `73d16522811ef758cbfc0cd6826cdb4a2be84c96`, open the closeout PR, pass actually-triggered PR-context gates, merge with expected-head lock, then collect frozen-main terminal evidence and close Issue #116.