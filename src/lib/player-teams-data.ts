import {
  playerTeamRosterMemberSchema,
  playerTeamsLoadResultSchema,
  type PlayerTeamMembership,
  type PlayerTeamsQuery,
  type PlayerTeamsRepository,
} from "./player-teams-contract";

const memberships: PlayerTeamMembership[] = [
  { teamId: "team-07", name: "Nova Five", role: "captain", memberCount: 5 },
  { teamId: "team-12", name: "Apex Unit", role: "member", memberCount: 4 },
];

const rosters = {
  "team-07": playerTeamRosterMemberSchema.array().parse([
    { playerId: "p-001", gamerTag: "SajadX", role: "captain" },
    { playerId: "p-014", gamerTag: "NimaStrike", role: "member" },
    { playerId: "p-022", gamerTag: "ArmanGG", role: "member" },
    { playerId: "p-031", gamerTag: "RezaAim", role: "member" },
    { playerId: "p-046", gamerTag: "KianRush", role: "member" },
  ]),
  "team-12": playerTeamRosterMemberSchema.array().parse([
    { playerId: "p-063", gamerTag: "MahanCore", role: "captain" },
    { playerId: "p-001", gamerTag: "SajadX", role: "member" },
    { playerId: "p-071", gamerTag: "AliPixel", role: "member" },
    { playerId: "p-089", gamerTag: "PouyaNext", role: "member" },
  ]),
} as const;

const PAGE_SIZE = 4;

export class MockPlayerTeamsRepository implements PlayerTeamsRepository {
  async getTeams(query: PlayerTeamsQuery) {
    const summary = {
      totalTeams: memberships.length,
      captainOf: memberships.filter((membership) => membership.role === "captain").length,
      memberOf: memberships.filter((membership) => membership.role === "member").length,
    };

    const requested = query.teamId
      ? memberships.find((membership) => membership.teamId === query.teamId)
      : memberships[0];

    if (!requested) {
      return playerTeamsLoadResultSchema.parse({
        state: "authenticated",
        data: {
          player: { playerId: "p-001", gamerTag: "SajadX" },
          summary,
          memberships,
          selectionState: memberships.length === 0 ? "none" : "unavailable",
          selectedTeam: null,
        },
      });
    }

    const roster = rosters[requested.teamId as keyof typeof rosters];
    const totalPages = Math.max(1, Math.ceil(roster.length / PAGE_SIZE));
    const currentPage = Math.min(query.page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;

    return playerTeamsLoadResultSchema.parse({
      state: "authenticated",
      data: {
        player: { playerId: "p-001", gamerTag: "SajadX" },
        summary,
        memberships,
        selectionState: "selected",
        selectedTeam: {
          teamId: requested.teamId,
          name: requested.name,
          currentPlayerRole: requested.role,
          memberCount: requested.memberCount,
          roster: roster.slice(start, start + PAGE_SIZE),
          rosterPagination: {
            currentPage,
            totalPages,
            totalItems: roster.length,
          },
        },
      },
    });
  }
}
