import { describe, expect, test } from "bun:test";
import {
  compactTournamentSearch,
  parseTournamentSearch,
  toTournamentQuery,
} from "./tournament-search";

describe("tournament search contract", () => {
  test("accepts safe public search values", () => {
    expect(
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
    ).toEqual({
      game: "eafc26",
      city: "karaj",
      date: "weekend",
      status: "open",
      format: "1v1",
      price: "lt300",
      verified: true,
      sort: "soonest",
    });
  });

  test("drops unsafe or unknown values instead of trusting the URL", () => {
    expect(
      parseTournamentSearch({
        game: "../../admin",
        city: "Karaj<script>",
        date: "yesterday",
        status: "deleted",
        verified: "false",
        sort: "magic-ai",
      }),
    ).toEqual({
      game: undefined,
      city: undefined,
      date: undefined,
      status: undefined,
      format: undefined,
      price: undefined,
      verified: undefined,
      sort: undefined,
    });
  });

  test("expands compact URL search to the stable repository query", () => {
    expect(toTournamentQuery({ game: "tekken8", verified: true })).toEqual({
      game: "tekken8",
      city: "all",
      date: "all",
      status: "all",
      format: "all",
      price: "all",
      verified: true,
      sort: "suggested",
    });
  });

  test("does not serialize defaults back into the URL", () => {
    expect(
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
    ).toEqual({
      game: undefined,
      city: "karaj",
      date: undefined,
      status: undefined,
      format: undefined,
      price: undefined,
      verified: undefined,
      sort: undefined,
    });
  });
});
