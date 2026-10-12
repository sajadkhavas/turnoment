# B99 dashboard contract correction — unranked players

Integration-owner decision, 2026-10-12.

Frozen reference `1668109bae5ec7abb5e022e5857ffa65cc131501` remains immutable and is not rewritten. This coordinated PR makes one **minimal, justified exception** under the contract-bug approval clause of backend `docs/B00_FINAL_BACKEND_EXECUTION_LOCK.md`.

Bug: the frozen dashboard Zod schema required a strictly positive `snapshot.tournamentRank` plus numeric tournament/challenge ratings for **every** authenticated player. A new player with no verified B08 finalizations/B09 rating has no truthful rank or rating. Any positive rank or artificial rating is a business-truth fabrication.

Approved change: `tournamentRank: number | null`, `tournamentRating: number | null`, `challengeRating: number | null`. Preserve positive-rank invariant when present. UI shows “هنوز رتبه‌ای ثبت نشده” / “بدون امتیاز” rather than `0`, `1` or `1000`. Historical ranked mock fixtures and other contracts remain intact.

The authoritative Django dashboard adapter must use `null` for absence and real B09 sourced rating/rank when present. This must be accepted with full frontend typecheck + tests and B02 backend schema integration before B99 terminal acceptance. No financial execution or new backend rating calculation.
