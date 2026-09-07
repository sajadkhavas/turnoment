import {
  tournamentListResponseSchema,
  tournamentSummarySchema,
} from "./tournament";

const validTournament = {
  id: "t1",
  slug: "fc26-karaj-champions-cup",
  title: "جام قهرمانان کرج",
  game: "EA FC 26",
  gameId: "eafc26",
  gamingCenterId: "c1",
  formatKind: "single-elim",
  bracket: "حذفی تک‌حذفی",
  dateBucket: "weekend",
  venue: "Arena Gaming Center",
  venueVerified: true,
  city: "کرج",
  district: "عظیمیه",
  date: "جمعه",
  time: "20:30",
  format: "۱ نفره",
  capacity: 32,
  registered: 26,
  entryFee: 150000,
  fixedPrize: 5000000,
  status: "filling",
};

if (!tournamentSummarySchema.safeParse(validTournament).success) {
  throw new Error("Valid tournament contract was rejected.");
}

if (tournamentSummarySchema.safeParse({ ...validTournament, entryFee: -1 }).success) {
  throw new Error("Negative entry fee must be rejected by the runtime contract.");
}

if (tournamentSummarySchema.safeParse({ ...validTournament, status: "deleted" }).success) {
  throw new Error("Unknown tournament status must be rejected by the runtime contract.");
}

const listPayload = {
  items: [validTournament],
  meta: { tournaments: 1, centers: 1, cities: 1 },
  facets: {
    games: [{ value: "eafc26", label: "EA FC 26" }],
    cities: [{ value: "karaj", label: "کرج" }],
  },
};

if (!tournamentListResponseSchema.safeParse(listPayload).success) {
  throw new Error("Valid tournament list HTTP envelope was rejected.");
}

if (
  tournamentListResponseSchema.safeParse({
    ...listPayload,
    meta: { tournaments: -1, centers: 1, cities: 1 },
  }).success
) {
  throw new Error("Invalid HTTP metadata must be rejected at runtime.");
}

console.log("Tournament HTTP contract checks passed.");
