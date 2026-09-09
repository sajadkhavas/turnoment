# F01 — Final Tournament Detail & Registration

Status: `READY TO MERGE`

START_SHA: `678c436998417933ee13224754c93cfe71068210`

Branch: `phase/f01-final-tournament-detail-registration`

Tracking issue: `#8`

## Scope

Rebuild `/tournaments/$id` once as the final public tournament detail implementation and add the final registration route `/tournaments/$id/register`. Existing identifier URLs remain compatible, while the canonical public URL is the stable tournament slug.

## Official documentation audit

Reviewed on 2026-09-09 before implementation:

1. TanStack Start — https://tanstack.com/start/latest
   - Start is Router-first; params, loaders, pending states and boundaries remain TanStack Router contracts.
   - Public tournament content therefore stays route-loader driven instead of client-only fetching.
2. TanStack Start selective SSR — https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr
   - Initial matching routes run `beforeLoad`, `loader` and render on the server by default (`ssr: true`).
   - Tournament Detail remains full SSR so event identity, venue, rules and registration state are present in initial HTML.
3. TanStack Router document head management — https://tanstack.com/router/latest/docs/guide/document-head-management
   - Route `head` owns title, description, canonical and social metadata.
4. Google Search Central Event structured data — https://developers.google.com/search/docs/appearance/structured-data/event
   - Event markup belongs on one specific event leaf page with a unique URL.
   - Required event data includes accurate name, start date and a Place with detailed PostalAddress.
   - F01 intentionally does **not** emit Event JSON-LD until the production tournament contract contains a sufficiently detailed venue postal address. Shipping incomplete Event markup would be worse than omitting it.
5. Google canonicalization — https://developers.google.com/search/docs/crawling-indexing/canonicalization
   - Legacy identifier URLs resolve the same event but canonical points to `/tournaments/{slug}`.
6. W3C WCAG 2.2 — https://www.w3.org/TR/WCAG22/
   - Native controls, programmatic name/role/state, keyboard operation, visible focus and accessible status messages are required for registration interaction.
7. Django P01 authentication contract (project source of truth)
   - `GET /api/v1/auth/csrf/` returns `{ csrf_token }` and sets the CSRF cookie.
   - Authenticated requests use Django Session Authentication and `credentials: include`.
   - Registration POST contract uses `X-CSRFToken`; localStorage bearer auth is forbidden.

## Design reference audit

Reviewed current Turnoment masters first: Homepage, Tournament Discovery and Player Dashboard.

External real-product references:

### Battlefy tournament page

Reference: https://help.battlefy.com/en/articles/6961376-navigating-the-tournament-page

Useful patterns:
- event identity remains visible above contextual sections;
- Overview contains About plus details/rules/prizes/schedule;
- Participants and Brackets are primary tournament destinations rather than buried metadata;
- registration action reflects current participation state.

### Battlefy bracket/participant flows

References:
- https://help.battlefy.com/en/collections/1517911-tournament-manage-page
- https://help.battlefy.com/en/articles/6977819-how-do-i-manage-participants

Useful patterns:
- participant state and bracket state are separate information domains;
- registration/check-in status is operational, not decorative;
- bracket format can vary, so F01 does not hard-code one bracket algorithm in UI.

### Toornament white-label tournament pages

Reference family: https://blog.toornament.com/

Useful patterns observed:
- compact event header + participation state;
- Overview / Stages / Matches / Participants information hierarchy;
- dark competitive interface with dense bracket information but strong separation between navigation and bracket canvas;
- responsive white-label layouts preserve tournament identity across desktop/mobile.

## Selected Turnoment direction

- Keep Turnoment navy/black + violet/cyan RTL visual identity.
- Event hero is compact and operational, not a marketing hero.
- Desktop: content column + sticky registration summary.
- Mobile: content stacks naturally and an action bar remains reachable without obscuring content.
- Primary public sections: overview, schedule/format, rules, participants, bracket preview, venue.
- Bracket on Detail is a concise authoritative preview/state only; the complete Live Tournament / Bracket design master remains its own workstream.
- Registration is a dedicated page, not an inline name/mobile form.
- Signed-in identity is reused; registration never asks the player to retype identity fields already owned by account state.

## Final contract / state model

Public detail:
- stable tournament ID + slug
- detail version for stale/concurrency handling
- game and venue stable IDs
- ISO start/check-in/registration times + Persian display labels
- lifecycle state supplied by contract
- capacity counts supplied by contract
- fixed prize and entry fee clearly separated
- ruleset ID/version + visible rule summaries
- privacy-safe participant preview
- bracket preview state supplied by contract

Registration context:
- player identity projection
- `available | already_registered | full | closed | upcoming | ineligible`
- `solo | team` mode
- eligible team IDs when team registration is required
- exact rules version to acknowledge
- payment handoff outcome supported by the action contract without embedding payment truth in the UI

Registration action outcomes:
- `confirmed`
- `payment_required`
- `already_registered`
- `unavailable`
- `stale`
- `validation_error`

The UI never calculates eligibility, final registration truth, bracket result, winner, payment truth or tournament lifecycle.

## API/domain mapping

Permanent frontend contract:
- `GET /api/v1/tournaments/{identifier}/` → public detail
- `GET /api/v1/tournaments/{identifier}/registration/` → authenticated registration context
- `POST /api/v1/tournaments/{identifier}/registrations/` → registration action
- `GET /api/v1/auth/csrf/` → CSRF bootstrap for unsafe session-authenticated requests

Deterministic fixture repositories implement these same TypeScript contracts for local development, tests and visual QA; presentation components do not know which implementation is active.

## Owned files

F01 owns:
- `src/routes/tournaments.$id.tsx`
- `src/routes/tournaments.$id_.register.tsx`
- tournament detail/registration components created by F01
- tournament detail/registration contracts, repositories and tests
- route tree changes caused by the registration child route
- F01-specific quality workflow/test command changes
- F01 evidence and continuity entries

F01 does not own the full Live Tournament / Bracket page design.

## Acceptance evidence — pre-merge

Implementation head before this evidence-only commit:

`3d962cb6eb26a4088618cf052948e78c139f04fe`

Frontend Quality Gate:

`34346918992` — PASS

Verified gates:
- frozen dependency install — PASS
- lint correctness — PASS (repository-existing warnings only; zero lint errors)
- production build and TanStack route generation — PASS
- TypeScript typecheck — PASS
- Player Dashboard regression contract checks — PASS
- F01 Tournament Detail / Registration contract checks — PASS
- browser smoke — PASS
- SSR landmark invariant: exactly one `<main>` on Detail and Registration — PASS
- responsive browser screenshots at `375 / 390 / 430 / 768 / 1024 / 1440` for both routes — PASS

Browser QA artifact:

- artifact: `browser-qa-3d962cb6eb26a4088618cf052948e78c139f04fe`
- artifact id: `10102113344`
- digest: `sha256:143f4b4f55904e85cec85a72d6700dc3fe5924eeb2019c0b6101fd1d513aae85`
- 12 screenshots total
- manual visual review repeated after the final landmark/sticky-navigation fixes on representative mobile and desktop captures — PASS

Final accessibility hardening in this workstream includes a single-main-landmark invariant, sticky tournament section navigation below the persistent header, section scroll offsets, semantic native controls, accessible status/error regions, and RTL-safe responsive navigation.

User-facing copy audit: PASS. No backend/API/mock/demo/temporary engineering-status wording is exposed by the final F01 UI.

Merge/freeze evidence is intentionally recorded after the PR and post-merge main CI; until then this workstream remains `READY TO MERGE`, not `DONE`.
