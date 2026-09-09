import { z } from "zod";
import type {
  MyTournamentsPageData,
  MyTournamentsQuery,
  MyTournamentsRepository,
} from "./my-tournaments-data";

const gameSchema = z.object({
  gameId: z.string().min(1),
  name: z.string().min(1),
});

const venueSchema = z.object({
  gamingCenterId: z.string().min(1),
  name: z.string().min(1),
  city: z.string().min(1),
});

const participationSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("individual") }),
  z.object({
    kind: z.literal("team"),
    teamId: z.string().min(1),
    teamName: z.string().min(1),
    role: z.enum(["captain", "member"]),
  }),
]);

const resultSchema = z.object({
  placement: z.number().int().positive().nullable(),
  matchesPlayed: z.number().int().nonnegative(),
  wins: z.number().int().nonnegative(),
});

export const myTournamentItemSchema = z.object({
  tournamentId: z.string().min(1),
  tournamentSlug: z.string().min(1),
  title: z.string().min(1),
  game: gameSchema,
  venue: venueSchema,
  startsAt: z.string().datetime({ offset: true }),
  timezone: z.string().min(1),
  formatLabel: z.string().min(1),
  lifecycleState: z.enum(["upcoming", "live", "completed", "cancelled"]),
  registrationState: z.enum(["pending", "confirmed", "waitlisted", "rejected", "cancelled"]),
  checkInState: z.enum(["not-required", "not-open", "open", "completed", "missed"]),
  participation: participationSchema,
  result: resultSchema.nullable(),
  nextAction: z.enum(["view", "check-in", "view-bracket", "view-results"]),
});

export const myTournamentsPageSchema = z.object({
  summary: z.object({
    total: z.number().int().nonnegative(),
    upcoming: z.number().int().nonnegative(),
    live: z.number().int().nonnegative(),
    completed: z.number().int().nonnegative(),
  }),
  games: z.array(gameSchema),
  items: z.array(myTournamentItemSchema),
  pagination: z.object({
    currentPage: z.number().int().positive(),
    totalPages: z.number().int().positive(),
    totalItems: z.number().int().nonnegative(),
  }),
});

export class MyTournamentsHttpError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`My Tournaments request failed with HTTP ${status}.`);
    this.name = "MyTournamentsHttpError";
    this.status = status;
  }
}

export class DjangoMyTournamentsRepository implements MyTournamentsRepository {
  async getMyTournaments(query: MyTournamentsQuery): Promise<MyTournamentsPageData> {
    const configured = import.meta.env.VITE_API_BASE_URL?.trim();
    if (!configured) {
      throw new Error("VITE_API_BASE_URL is required when the Django My Tournaments adapter is enabled.");
    }

    const baseUrl = configured.endsWith("/") ? configured : `${configured}/`;
    const url = new URL("api/v1/me/tournaments/", baseUrl);

    if (query.state !== "all") {
      url.searchParams.set("state", query.state);
    }
    if (query.gameId) {
      url.searchParams.set("game", query.gameId);
    }
    if (query.page > 1) {
      url.searchParams.set("page", String(query.page));
    }

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new MyTournamentsHttpError(response.status);
    }

    return myTournamentsPageSchema.parse(await response.json()) as MyTournamentsPageData;
  }
}
