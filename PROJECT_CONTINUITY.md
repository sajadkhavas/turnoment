# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-14`

## 1. Mandatory continuation law

Every chat/agent MUST read `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable work, and `docs/ROUTE_COMPLIANCE_REGISTRY.md`; verify exact live `main`; use a dedicated branch/Issue/PR; preserve frozen routes; keep production fail-closed; and never claim `DONE / MERGED / FROZEN` from chat memory alone.

Terminal closeout SHA/CI belongs in the tracking Issue after merge. Do not create recursive documentation commits to self-record their own SHA.

## 2. Accepted frontend baseline before F26

Repository: `sajadkhavas/turnoment`.

F25 legacy-route removal is terminally closed:
- Issue #113 — `CLOSED / COMPLETED`;
- final F25 closeout main `8d6148b563b8fa84d5cef41903b8dea6de07a6c9`;
- 17 inherited non-Turnoment ecommerce/service routes remain intentionally removed;
- terminal evidence is recorded in Issue #113.

F24-R1 `/rules` is also terminally closed:
- Issue #110 — `CLOSED / COMPLETED`;
- final F24-R1 main `faf2b18287484d2ed78094589fe2db80f2841f55`;
- status `DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 3. Active workstream — F26 Tournament Detail recertification

Tracking Issue: `#116`.

Route: `/tournaments/$id`.

START/main:

`8d6148b563b8fa84d5cef41903b8dea6de07a6c9`

Implementation branch:

`phase/f26-tournament-detail-recertification`

Final implementation head:

`ca0463fb9b5c2bf9f0189dec7481badad3d5464b`

Implementation PR:

`#117` — MERGED with expected-head lock.

Implementation merge/main and closeout base:

`73d16522811ef758cbfc0cd6826cdb4a2be84c96`

Current status:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route-level status is now `FINAL_CURRENT`. Workstream-level terminal `DONE / MERGED / FROZEN` is still forbidden until the closeout PR and frozen-main evidence chain complete.

## 4. F26 accepted implementation truth

F26 recertified the existing F01 Tournament Detail architecture rather than replacing it.

Permanent boundary remains:

`Route → canonical identifier/slug resolution → loader → TournamentDetailRepository → Zod-validated TournamentDetail → UI`

Accepted outcomes:
- public SSR remains enabled;
- canonical tournament slug remains the indexable URL;
- legacy stable identifiers redirect to the canonical slug;
- final dynamic Turnoment title/meta/canonical/robots/OG/Twitter metadata is present;
- remaining Iran Mehr Afzar branding was removed from route-level metadata/not-found copy;
- visible page-owned copy was recertified under the current SEO/final-copy law;
- crawlable links to rules, venue and public player profiles remain;
- registration remains a separate private route at `/tournaments/$id/register`;
- authoritative tournament/registration/bracket/payment truth remains repository/server-owned;
- `Event` JSON-LD is intentionally omitted because the authoritative venue contract does not expose a sufficiently detailed postal address; no location data is fabricated.

No backend, dependency, lockfile or registration-contract mutation was made by F26.

## 5. F26 exact-head and PR-context acceptance

Exact implementation-head acceptance on `ca0463fb9b5c2bf9f0189dec7481badad3d5464b`:
- Full Frontend Quality `34849589140` — PASS — artifact `10349556999` — digest `sha256:c8be380de56930aabd4a1e4037a60152b7756ed8e2293f688b69294933dc3003`;
- F26 focused gate `34849589075` — PASS — artifact `10350060005` — digest `sha256:07a05870b5fb16c5488d11a55a566cfaafad3fabf6c503f32ef3cadd74c904bd`.

PR #117 actually-triggered PR-context gates all passed:
- Full Frontend Quality `34850076098` — PASS;
- F26 Tournament Detail `34850076182` — PASS;
- F17 Tournament Discovery regression `34850076086` — PASS;
- unresolved review threads: `0`;
- PR mergeable: `true`;
- live `main` was still the exact START SHA immediately before expected-head merge.

## 6. F26 post-main acceptance

Exact implementation merge/main:

`73d16522811ef758cbfc0cd6826cdb4a2be84c96`

Every workflow actually triggered by this merge SHA passed with real runner execution:

- Full Frontend Quality `34864166474` — PASS;
  - artifact `10355383823`;
  - digest `sha256:88ff8d1fef78c248e738315fa358e50b623153e6f64a9d3c191008dc3af3eb9e`.
- F26 Tournament Detail Recertification `34864166083` — PASS;
  - artifact `10356243874`;
  - digest `sha256:d996b4a5f0067087461d1ddee60d69005124c2496f50da9a3ceb7930b328193e`.
- F17 Public Tournament Discovery regression `34864166079` — PASS;
  - artifact `10356049157`;
  - digest `sha256:658b73c2a1b24548a2ab460f43c4346732aeb9c7b1023b440ca53748f73a4069`.

The Full job passed frozen install, lint, production build/route generation, typecheck, contract checks and browser/responsive evidence. The F26 job passed lint, tournament-detail contracts, production build, typecheck, SSR/SEO/copy/link checks and six responsive screenshots.

## 7. Accepted route inventory

Public/current routes:
- `/` — `FINAL_CURRENT`;
- `/tournaments` — `FINAL_CURRENT`;
- `/tournaments/$id` — `FINAL_CURRENT` (F26 route-level acceptance; terminal workstream closeout still in progress);
- `/games` — `FINAL_CURRENT`;
- `/games/$slug` — `FINAL_CURRENT`;
- `/centers` — `FINAL_CURRENT`;
- `/centers/$id` — `FINAL_CURRENT`;
- `/ranking` — `FINAL_CURRENT`;
- `/players/$username` — `FINAL_CURRENT`;
- `/host` — `FINAL_CURRENT`;
- `/rules` — `FINAL_CURRENT`.

Accepted private/noindex routes:
- `/tournaments/$id/register`;
- `/dashboard`;
- `/dashboard/tournaments`;
- `/dashboard/matches`;
- `/matches/$id/result`;
- `/matches/$id/dispute`;
- `/login`;
- `/register`;
- `/dashboard/profile`;
- `/dashboard/notifications`;
- `/dashboard/settings`;
- `/dashboard/rivalries`;
- `/dashboard/achievements`;
- `/dashboard/teams`;
- `/dashboard/challenges`.

The 17 F25 legacy routes remain `REMOVED` and must not be revived.

## 8. F26 closeout law

Closeout branch:

`closeout/f26-tournament-detail-recertification`

The closeout is documentation-only and must be exactly one commit changing exactly these four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F26_TOURNAMENT_DETAIL_RECERTIFICATION.md`;
4. `docs/workstreams/F26_CLOSEOUT.md`.

No source, package, lockfile, workflow, dependency, runtime configuration or backend mutation is authorized in closeout.

Required terminal chain:
1. exact compare from `73d16522811ef758cbfc0cd6826cdb4a2be84c96` = ahead `1`, behind `0`, one commit, exactly four Markdown files;
2. closeout PR to `main` without auto-closing Issue #116;
3. every actually-triggered PR-context Full/frozen-route regression gate PASS;
4. PR mergeable `true` and unresolved review threads `0`;
5. exact live `main` still equals `73d16522811ef758cbfc0cd6826cdb4a2be84c96` immediately before merge;
6. merge with expected closeout-head SHA;
7. every actually-triggered terminal frozen-main gate on the exact closeout merge SHA PASS;
8. record terminal run IDs, artifacts and digests in Issue #116;
9. reverify exact live `main`;
10. close Issue #116 as completed.

Future closeout-head/merge/frozen-main facts must be recorded in Issue #116 after they exist, not recursively self-recorded in another documentation commit.

## 9. NEXT

Immediate task: complete the F26 documentation-only closeout and terminal evidence chain.

After terminal F26, the route registry has no remaining public route classified `FINAL_PRE_SEO` or `NEEDS_RECERTIFICATION`. Do not invent another frontend recertification workstream; the next frontend phase requires an explicit product-scope decision or a new audited requirement.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.