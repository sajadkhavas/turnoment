# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-12`

## 1. Mandatory continuation law

Every chat/agent MUST read `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable work, and `docs/ROUTE_COMPLIANCE_REGISTRY.md`; verify exact live `main`; use a dedicated branch/Issue/PR; preserve frozen routes; keep production fail-closed; and never claim `DONE / MERGED / FROZEN` from chat memory alone.

Terminal closeout SHA/CI belongs in the tracking Issue after merge. Do not create recursive documentation commits to self-record their own SHA.

## 2. Current frontend baseline

Repository: `sajadkhavas/turnoment`.

Exact accepted F24 implementation main / closeout base:

`3e1f4747997afda1c4c275db93f2905379d36a37`

F23 `/host` is terminally frozen:
- Issue #104 — CLOSED / COMPLETED;
- implementation PR #105 — MERGED;
- closeout PR #106 — MERGED;
- exact final F23 main `b3143885a4aacc4301a952eb24bdad608b594d3b`;
- terminal frozen-main evidence recorded in Issue #104;
- final status `F23 — DONE / MERGED / FROZEN — FINAL_CURRENT`.

F24 `/rules` implementation is merged and post-main accepted:
- Tracking Issue #107 remains OPEN;
- implementation PR #108 — MERGED with expected-head lock;
- implementation head `b11101bfd6261360a31e66e10e2bd5b08c260e63`;
- implementation merge/main `3e1f4747997afda1c4c275db93f2905379d36a37`;
- F24 post-main `34710368111` — PASS;
- Full post-main `34710368093` — PASS;
- live `main` reverified exact at the implementation merge after post-main acceptance;
- route-level `/rules` is eligible for `FINAL_CURRENT`, but terminal workstream freeze still requires closeout merge + frozen-main evidence.

Protected/frozen or accepted-current public routes:
- F16 `/`;
- F17 `/tournaments`;
- F18 `/games`;
- F19 `/centers`;
- F20 `/centers/$id`;
- F21 `/ranking`;
- F22 `/players/$username`;
- F23 `/host`;
- F24 `/rules` — route-level current implementation accepted, closeout in progress;
- F02 `/games/$slug`.

`/tournaments/$id` remains `FINAL_PRE_SEO` and is the next public competitive recertification candidate after terminal F24.

## 3. Active workstream — F24 Rules Page closeout

Route: `/rules`.

Tracking Issue: `#107` — OPEN.

F24 START_SHA:

`b3143885a4aacc4301a952eb24bdad608b594d3b`

Implementation branch:

`phase/f24-rules-recertification`

Implementation head:

`b11101bfd6261360a31e66e10e2bd5b08c260e63`

Implementation PR:

`#108` — MERGED with expected-head lock.

Accepted implementation main / closeout base:

`3e1f4747997afda1c4c275db93f2905379d36a37`

Closeout branch:

`closeout/f24-rules-recertification`

Current status:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

F24 is not terminally `DONE / MERGED / FROZEN` until the closeout PR is accepted, merged with expected-head lock, terminal frozen-main gates pass, terminal artifacts/digests are recorded in Issue #107, exact live `main` is reverified, and Issue #107 is closed completed.

## 4. Permanent F24 architecture

`Route → loader → RulesPageRepository → strict RulesPageDocument validation → RulesPage UI`

Current production authority is reviewed, version-controlled public policy content behind `RulesPageRepository`.

No production rules API endpoint is claimed as existing. A future HTTP/admin-backed repository may implement the same interface without rebuilding the route/UI tree. Backend NEXT remains independently `P02 — Games / Catalog Foundation`.

Public `version`, `effectiveDate`, and `lastSubstantiveRevisionDate` remain nullable until authoritative governance values exist. F24 does not fabricate freshness metadata.

## 5. Accepted F24 product-policy truth

Product owner explicitly approved these narrow platform-wide principles:
1. participant-provided information needed for registration/coordination must be accurate and current;
2. cheating, collusion, and deliberate result manipulation are prohibited;
3. respectful conduct toward players, hosts, organizers, and event staff is required;
4. players must review and follow the published tournament-specific rules for that event.

Tournament-specific operational details such as timing/check-in, eligibility, format, equipment, venue and event-specific rules belong on the tournament detail.

F24 explicitly does **not** publish or imply these unsupported inherited claims:
- universal 30-minute early-arrival requirement;
- 15-minute lateness = technical loss;
- universal mandatory identification;
- referee approval requirement for personal controllers;
- elimination/ranking-point deduction sanction;
- 24-hour/full-refund promise or any invented refund timeline.

No sanction, refund, withdrawal, identity-verification, age, dispute deadline, payment or legal promise is inferred from the four approved baseline principles.

## 6. F24 SEO / final-copy lock

Purpose: explain which participation rules are common to Turnoment and which operational details must be checked on the individual tournament.

Primary audience: players considering registration, preparing to register, or checking expectations after registration.

Primary search intent: informational / pre-participation.

Final H1:

`قوانین شرکت در تورنمنت‌های Turnoment`

Final title:

`قوانین و شرایط شرکت در تورنمنت‌ها | Turnoment`

Final description:

`قوانین عمومی شرکت در تورنمنت‌های Turnoment را بخوانید و ببینید کدام شرایط در همه رقابت‌ها مشترک است و کدام جزئیات در صفحه هر تورنمنت اعلام می‌شود.`

Canonical: `/rules`.

Robots: `index,follow`.

Primary CTA: `مشاهده تورنمنت‌ها` → `/tournaments`.

Page-specific structured data is intentionally omitted. No FAQ/Article/Event schema is added merely for coverage.

## 7. F24 evidence accepted so far

Exact implementation head `b11101bfd6261360a31e66e10e2bd5b08c260e63`:
- START → head = ahead `1` / behind `0` / exactly `1` commit / exactly `8` changed files;
- no package/lock/dependency drift;
- frozen public route source untouched.

Exact-head QA:
- F24 `34707551043` — PASS — artifact `10302685750` — digest `sha256:8504a47e1e80f283e460572e6d69812b5f899bd60b88a02fe4d8b9b54c8d705a`;
- Full `34707550985` — PASS — artifact `10301957784` — digest `sha256:1074ab071c9c78416e810435b1656f238de3dc11cf227d215c97b9c0fca86b47`.

Implementation PR #108 PR-context QA:
- mergeable `true`;
- unresolved review threads `0`;
- live `main` remained exact F24 START before merge;
- expected head `b11101bfd6261360a31e66e10e2bd5b08c260e63` used;
- F24 `34710086614` — PASS — artifact `10303535413` — digest `sha256:1f6c8b8c2d9efe5cc82088774f042b96f60af02894c92d09b3232e3a4a8c978b`;
- Full `34710086598` — PASS — artifact `10302723472` — digest `sha256:8330d3959aaba5c7ccfec82214669a622e53d2a5b63d3c2c8b869924d31b56d6`.

Implementation merge/main:

`3e1f4747997afda1c4c275db93f2905379d36a37`

Post-main implementation acceptance:
- F24 `34710368111` — PASS — artifact `10302858188` — digest `sha256:0d1099a0fe6858595adc6437ed9ff35ee67a846a47e21d9bb215343d107e9d60`;
- Full `34710368093` — PASS — artifact `10303176790` — digest `sha256:7c83f34d566af8797e34f9a05911fe62c74ca1bc30e8c6ccaee2b1a7e2672dcb`.

Exact live `main` was reverified at `3e1f4747997afda1c4c275db93f2905379d36a37` after post-main acceptance.

## 8. Documentation-only closeout law

Closeout is exactly one commit changing exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F24_RULES_RECERTIFICATION.md`;
4. `docs/workstreams/F24_CLOSEOUT.md`.

No source code, package, lockfile, workflow, dependency, runtime configuration or backend phase mutation is authorized.

Route-level `/rules` may be promoted to `FINAL_CURRENT` in this non-recursive closeout snapshot because implementation merge + required post-main acceptance already exist.

Future closeout head/merge/frozen-main facts must be recorded in Issue #107 after they exist, not recursively self-recorded here.

## 9. Remaining terminal chain

After this closeout commit exists, F24 still requires:
1. exact closeout compare = ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to `main` without auto-closing Issue #107;
3. every actually-triggered PR-context Full/F24/frozen-route regression gate PASS;
4. `mergeable=true` and unresolved review threads=0;
5. exact live-main lock at implementation merge `3e1f4747997afda1c4c275db93f2905379d36a37` before merge;
6. expected-head closeout merge;
7. terminal frozen-main Full/F24/frozen-route regressions PASS;
8. terminal artifact IDs and SHA-256 digests recorded in Issue #107;
9. exact live frontend `main` reverified;
10. Issue #107 updated with terminal evidence and CLOSED / COMPLETED.

Only after those facts exist may F24 be reported:

`F24 — DONE / MERGED / FROZEN — FINAL_CURRENT`

## 10. NEXT after terminal F24

Frontend public recertification candidate:

`/tournaments/$id` — currently `FINAL_PRE_SEO`.

Backend NEXT independently remains:

`P02 — Games / Catalog Foundation`.
