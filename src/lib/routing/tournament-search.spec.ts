import {
  compactTournamentSearch,
  parseTournamentSearch,
  toTournamentQuery,
} from "./tournament-search";

function assertDeepEqual(actual: unknown, expected: unknown, label: string) {
  const left = JSON.stringify(actual);
  const right = JSON.stringify(expected);
  if (left !== right) {
    throw new Error(`${label} failed.\nExpected: ${right}\nActual:   ${left}`);
  }
}

assertDeepEqual(
  parseTournamentSearch({
    game: "eafc26",
    city: "karaj",
    date: "weekend",
    status: "open",
    format: "1v1",
    price: "lt300",
    verified: "true",
    sort: "soonest",
  }),
  {
    game: "eafc26",
    city: "karaj",
    date: "weekend",
    status: "open",
    format: "1v1",
    price: "lt300",
    verified: true,
    sort: "soonest",
  },
  "safe search parsing",
);

assertDeepEqual(
  parseTournamentSearch({
    game: "../../admin",
    city: "Karaj<script>",
    date: "yesterday",
    status: "deleted",
    verified: "false",
    sort: "magic-ai",
  }),
  {},
  "unsafe search rejection",
);

assertDeepEqual(
  toTournamentQuery({ game: "tekken8", verified: true }),
  {
    game: "tekken8",
    city: "all",
    date: "all",
    status: "all",
    format: "all",
    price: "all",
    verified: true,
    sort: "suggested",
  },
  "query expansion",
);

assertDeepEqual(
  compactTournamentSearch({
    game: "all",
    city: "karaj",
    date: "all",
    status: "all",
    format: "all",
    price: "all",
    verified: false,
    sort: "suggested",
  }),
  { city: "karaj" },
  "default compaction",
);

console.log("Tournament search contract checks passed.");
