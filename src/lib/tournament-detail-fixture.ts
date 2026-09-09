import {
  allTournaments,
  gamingCenters,
  popularGames,
  type TournamentSummary,
} from "./tournament-data";
import {
  registrationActionResultSchema,
  registrationRequestSchema,
  tournamentDetailSchema,
  tournamentRegistrationContextSchema,
  type RegistrationActionResult,
  type RegistrationAvailability,
  type RegistrationRequest,
  type TournamentDetail,
  type TournamentRegistrationContext,
} from "./tournament-detail-contract";
import type { TournamentDetailRepository } from "./tournament-detail-repository";
import type { PlayerSession } from "./player-session";

const START_AT_BY_ID: Record<string, string> = {
  t1: "2026-09-11T20:30:00+03:30",
  t2: "2026-09-10T18:00:00+03:30",
  t3: "2026-09-12T19:00:00+03:30",
  t4: "2026-09-13T17:30:00+03:30",
  t5: "2026-09-18T15:00:00+03:30",
  t6: "2026-09-24T19:00:00+03:30",
  t7: "2026-09-14T16:00:00+03:30",
  t8: "2026-09-19T20:00:00+03:30",
  t9: "2026-09-18T14:00:00+03:30",
  t10: "2026-09-09T18:00:00+03:30",
  t11: "2026-09-10T19:30:00+03:30",
  t12: "2026-09-18T11:00:00+03:30",
  t13: "2026-10-02T18:30:00+03:30",
  t14: "2026-10-05T17:00:00+03:30",
  t15: "2026-09-15T18:00:00+03:30",
  t16: "2026-09-14T21:00:00+03:30",
};

const RULES = [
  {
    id: "rule-check-in",
    title: "حضور و Check-in",
    description: "بازیکن باید در بازه اعلام‌شده در محل مسابقه حاضر باشد و Check-in را تکمیل کند.",
    mandatory: true,
  },
  {
    id: "rule-fair-play",
    title: "بازی جوانمردانه",
    description: "استفاده از ابزار، نرم‌افزار یا هماهنگی خارج از قوانین مسابقه ممنوع است.",
    mandatory: true,
  },
  {
    id: "rule-result",
    title: "ثبت نتیجه",
    description: "نتیجه هر Match طبق فرایند رسمی مسابقه ثبت و در صورت نیاز تأیید می‌شود.",
    mandatory: true,
  },
  {
    id: "rule-referee",
    title: "تصمیم داوری",
    description: "اعتراض‌ها و شرایط پیش‌بینی‌نشده طبق Ruleset همان مسابقه توسط مسئول مجاز رسیدگی می‌شود.",
    mandatory: true,
  },
] as const;

const GAMER_TAGS = ["SajadX", "ArminFC", "NimaKing", "KazuyaIR", "MiladPro", "RezaGG", "AliZ", "H0ssein"];

function minusMinutes(iso: string, minutes: number) {
  return new Date(new Date(iso).getTime() - minutes * 60_000).toISOString();
}

function lifecycleFor(tournament: TournamentSummary): TournamentDetail["lifecycle"] {
  if (tournament.status === "upcoming") return "upcoming";
  if (tournament.status === "closed") return "registration_closed";
  if (tournament.status === "filling") return "filling";
  return "registration_open";
}

function registrationStateFor(tournament: TournamentSummary): TournamentDetail["registrationPolicy"]["state"] {
  if (tournament.status === "upcoming") return "upcoming";
  if (tournament.registered >= tournament.capacity) return "full";
  if (tournament.status === "closed") return "closed";
  return "open";
}

function availabilityFor(tournament: TournamentSummary): RegistrationAvailability {
  const state = registrationStateFor(tournament);
  if (state === "full") return "full";
  if (state === "closed") return "closed";
  if (state === "upcoming") return "upcoming";
  return "available";
}

function participantsFor(tournament: TournamentSummary) {
  const count = Math.min(tournament.registered, GAMER_TAGS.length);
  return Array.from({ length: count }, (_, index) => ({
    id: `${tournament.id}-participant-${index + 1}`,
    gamerTag: GAMER_TAGS[index],
    seed: tournament.status === "closed" ? index + 1 : null,
    status: "confirmed" as const,
  }));
}

function bracketFor(tournament: TournamentSummary, participants: ReturnType<typeof participantsFor>) {
  if (tournament.status !== "closed" || participants.length < 2) {
    return {
      state: "not_published" as const,
      formatLabel: tournament.bracket,
      participantCount: tournament.registered,
      rounds: [],
    };
  }

  const matches = [0, 2, 4, 6]
    .map((index, matchIndex) => {
      const a = participants[index];
      const b = participants[index + 1];
      if (!a || !b) return null;
      return {
        id: `${tournament.id}-preview-match-${matchIndex + 1}`,
        label: `Match ${matchIndex + 1}`,
        state: "scheduled" as const,
        sideA: { participantId: a.id, gamerTag: a.gamerTag, seed: a.seed, score: null },
        sideB: { participantId: b.id, gamerTag: b.gamerTag, seed: b.seed, score: null },
      };
    })
    .filter((match): match is NonNullable<typeof match> => match !== null);

  return {
    state: "seeded" as const,
    formatLabel: tournament.bracket,
    participantCount: tournament.registered,
    rounds: [{ id: `${tournament.id}-round-1`, title: "مرحله اول", matches }],
  };
}

function toDetail(tournament: TournamentSummary): TournamentDetail {
  const center = gamingCenters.find((item) => item.id === tournament.gamingCenterId);
  const game = popularGames.find((item) => item.id === tournament.gameId);
  const startAt = START_AT_BY_ID[tournament.id] ?? "2026-10-10T18:00:00+03:30";
  const participants = participantsFor(tournament);
  const rulesVersion = "2026.09.1";

  return tournamentDetailSchema.parse({
    id: tournament.id,
    slug: tournament.slug,
    detailVersion: `${tournament.id}:2026-09-09:1`,
    title: tournament.title,
    description: `رقابت ${tournament.game} با فرمت ${tournament.format} در ${tournament.venue}. اطلاعات زمان‌بندی، قوانین، شرکت‌کنندگان و وضعیت ثبت‌نام در همین صفحه در دسترس است.`,
    heroImage: game?.image ?? null,
    lifecycle: lifecycleFor(tournament),
    game: {
      id: tournament.gameId,
      name: tournament.game,
      platform: game?.platform ?? "پلتفرم مسابقه",
      image: game?.image ?? null,
    },
    venue: {
      id: tournament.gamingCenterId,
      name: tournament.venue,
      verified: center?.verified ?? tournament.venueVerified,
      rating: center?.rating ?? null,
      reviews: center?.reviews ?? null,
      city: tournament.city,
      district: tournament.district,
      image: center?.image ?? null,
      equipment: center?.equipment ?? [],
    },
    schedule: {
      startAt,
      registrationClosesAt: minusMinutes(startAt, 180),
      checkInOpensAt: minusMinutes(startAt, 60),
      timezone: "Asia/Tehran",
      displayDate: tournament.date,
      displayTime: tournament.time,
    },
    formatLabel: tournament.format,
    bracketFormatLabel: tournament.bracket,
    capacity: {
      limit: tournament.capacity,
      registered: tournament.registered,
      remaining: Math.max(0, tournament.capacity - tournament.registered),
    },
    entryFee: { amount: tournament.entryFee, currency: "IRR" },
    fixedPrize: { amount: tournament.fixedPrize, currency: "IRR" },
    ruleset: {
      id: `ruleset-${tournament.gameId}-standard`,
      version: rulesVersion,
      rules: RULES,
    },
    participants: {
      total: tournament.registered,
      preview: participants,
    },
    bracketPreview: bracketFor(tournament, participants),
    registrationPolicy: {
      state: registrationStateFor(tournament),
      mode: tournament.formatKind === "team" ? "team" : "solo",
      rulesVersion,
      requiresRulesAcceptance: true,
    },
  });
}

function findTournament(identifier: string) {
  return allTournaments.find((item) => item.slug === identifier || item.id === identifier) ?? null;
}

export class FixtureTournamentDetailRepository implements TournamentDetailRepository {
  async getByIdentifier(identifier: string): Promise<TournamentDetail | null> {
    const tournament = findTournament(identifier);
    return tournament ? toDetail(tournament) : null;
  }

  async getRegistrationContext(
    identifier: string,
    session: PlayerSession,
  ): Promise<TournamentRegistrationContext | null> {
    const tournament = findTournament(identifier);
    if (!tournament || session.state !== "authenticated" || !session.playerId) return null;
    const detail = toDetail(tournament);

    return tournamentRegistrationContextSchema.parse({
      detailVersion: detail.detailVersion,
      tournament: {
        id: detail.id,
        slug: detail.slug,
        title: detail.title,
        game: detail.game.name,
        venue: detail.venue.name,
        displayDate: detail.schedule.displayDate,
        displayTime: detail.schedule.displayTime,
        entryFee: detail.entryFee,
        fixedPrize: detail.fixedPrize,
      },
      player: {
        id: session.playerId,
        gamerTag: session.username ?? "Player",
      },
      availability: availabilityFor(tournament),
      mode: detail.registrationPolicy.mode,
      rules: {
        version: detail.ruleset.version,
        summary: "با ثبت‌نام، قوانین مسابقه و Ruleset نسخه نمایش‌داده‌شده را تأیید می‌کنی.",
      },
      eligibleTeams:
        detail.registrationPolicy.mode === "team"
          ? [{ id: "team-nova-five", name: "Nova Five", memberCount: 5 }]
          : [],
      currentRegistration: null,
    });
  }

  async register(identifier: string, request: RegistrationRequest): Promise<RegistrationActionResult> {
    const tournament = findTournament(identifier);
    if (!tournament) {
      return registrationActionResultSchema.parse({ outcome: "unavailable", reason: "closed" });
    }

    const detail = toDetail(tournament);
    const parsed = registrationRequestSchema.safeParse(request);
    if (!parsed.success) {
      return registrationActionResultSchema.parse({
        outcome: "validation_error",
        fields: { form: "اطلاعات ثبت‌نام کامل نیست." },
      });
    }

    if (request.detailVersion !== detail.detailVersion) {
      return registrationActionResultSchema.parse({ outcome: "stale", detailVersion: detail.detailVersion });
    }

    if (request.rulesVersion !== detail.ruleset.version) {
      return registrationActionResultSchema.parse({ outcome: "stale", detailVersion: detail.detailVersion });
    }

    if (detail.registrationPolicy.mode === "team" && !request.teamId) {
      return registrationActionResultSchema.parse({
        outcome: "validation_error",
        fields: { teamId: "برای مسابقه تیمی، تیم را انتخاب کن." },
      });
    }

    const availability = availabilityFor(tournament);
    if (availability !== "available") {
      return registrationActionResultSchema.parse({ outcome: "unavailable", reason: availability });
    }

    return registrationActionResultSchema.parse({
      outcome: "confirmed",
      registrationId: `registration-${tournament.id}-fixture`,
      status: "confirmed",
    });
  }
}

export function canonicalTournamentSlug(identifier: string) {
  return findTournament(identifier)?.slug ?? null;
}
