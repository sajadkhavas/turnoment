import { playerTeamsPageSchema } from "./player-teams-contract";
import { MockPlayerTeamsRepository } from "./player-teams-data";

const repository = new MockPlayerTeamsRepository();

const defaultLoad = await repository.getTeams({ page: 1 });
if (defaultLoad.state !== "authenticated") throw new Error("Teams fixture unexpectedly returned unauthenticated state.");
const firstPage = defaultLoad.data;
if (!playerTeamsPageSchema.safeParse(firstPage).success) throw new Error("Mock Teams data no longer matches the runtime contract.");
if (
  firstPage.summary.totalTeams !== 2 ||
  firstPage.summary.captainOf !== 1 ||
  firstPage.summary.memberOf !== 1 ||
  firstPage.memberships.length !== 2
) {
  throw new Error("Teams fixture summary/membership truth drifted unexpectedly.");
}
if (firstPage.selectionState !== "selected" || firstPage.selectedTeam?.teamId !== "team-07") {
  throw new Error("Teams default selection is not deterministic.");
}
if (
  firstPage.selectedTeam.currentPlayerRole !== "captain" ||
  firstPage.selectedTeam.rosterPagination.totalItems !== 5 ||
  firstPage.selectedTeam.roster.length !== 4
) {
  throw new Error("Teams default roster projection drifted unexpectedly.");
}

const secondPageLoad = await repository.getTeams({ teamId: "team-07", page: 2 });
if (
  secondPageLoad.state !== "authenticated" ||
  secondPageLoad.data.selectedTeam?.rosterPagination.currentPage !== 2 ||
  secondPageLoad.data.selectedTeam.roster.length !== 1
) {
  throw new Error("Teams roster pagination is not deterministic.");
}

const memberTeamLoad = await repository.getTeams({ teamId: "team-12", page: 1 });
if (
  memberTeamLoad.state !== "authenticated" ||
  memberTeamLoad.data.selectedTeam?.teamId !== "team-12" ||
  memberTeamLoad.data.selectedTeam.currentPlayerRole !== "member" ||
  memberTeamLoad.data.selectedTeam.rosterPagination.totalItems !== 4
) {
  throw new Error("Teams explicit membership selection is not deterministic.");
}

const unavailableLoad = await repository.getTeams({ teamId: "team-does-not-belong-to-player", page: 1 });
if (
  unavailableLoad.state !== "authenticated" ||
  unavailableLoad.data.selectionState !== "unavailable" ||
  unavailableLoad.data.selectedTeam !== null ||
  unavailableLoad.data.memberships.length !== 2
) {
  throw new Error("Teams unavailable selection does not fail closed to current-player memberships.");
}

const badSummary = {
  ...firstPage,
  summary: { ...firstPage.summary, memberOf: firstPage.summary.memberOf + 1 },
};
if (playerTeamsPageSchema.safeParse(badSummary).success) {
  throw new Error("Teams runtime contract accepted a summary that does not partition memberships.");
}

const duplicateMembership = {
  ...firstPage,
  memberships: [firstPage.memberships[0], { ...firstPage.memberships[1], teamId: firstPage.memberships[0].teamId }],
};
if (playerTeamsPageSchema.safeParse(duplicateMembership).success) {
  throw new Error("Teams runtime contract accepted duplicate membership team IDs.");
}

const selectedOutsideMembership = {
  ...firstPage,
  selectedTeam: { ...firstPage.selectedTeam!, teamId: "team-outside-memberships" },
};
if (playerTeamsPageSchema.safeParse(selectedOutsideMembership).success) {
  throw new Error("Teams runtime contract accepted a selected team outside current-player memberships.");
}

const mismatchedRole = {
  ...firstPage,
  selectedTeam: { ...firstPage.selectedTeam!, currentPlayerRole: "member" as const },
};
if (playerTeamsPageSchema.safeParse(mismatchedRole).success) {
  throw new Error("Teams runtime contract accepted selected-team role drift.");
}

const mismatchedMemberCount = {
  ...firstPage,
  selectedTeam: { ...firstPage.selectedTeam!, memberCount: firstPage.selectedTeam!.memberCount + 1 },
};
if (playerTeamsPageSchema.safeParse(mismatchedMemberCount).success) {
  throw new Error("Teams runtime contract accepted member-count drift.");
}

const duplicateRosterMember = {
  ...firstPage,
  selectedTeam: {
    ...firstPage.selectedTeam!,
    roster: [
      firstPage.selectedTeam!.roster[0],
      { ...firstPage.selectedTeam!.roster[1], playerId: firstPage.selectedTeam!.roster[0].playerId },
      ...firstPage.selectedTeam!.roster.slice(2),
    ],
  },
};
if (playerTeamsPageSchema.safeParse(duplicateRosterMember).success) {
  throw new Error("Teams runtime contract accepted duplicate roster player IDs.");
}

const multipleCaptains = {
  ...firstPage,
  selectedTeam: {
    ...firstPage.selectedTeam!,
    roster: firstPage.selectedTeam!.roster.map((member, index) =>
      index === 1 ? { ...member, role: "captain" as const } : member,
    ),
  },
};
if (playerTeamsPageSchema.safeParse(multipleCaptains).success) {
  throw new Error("Teams runtime contract accepted multiple captains on one roster page.");
}

const completeMemberTeam = memberTeamLoad.state === "authenticated" ? memberTeamLoad.data : firstPage;
const noCaptainOnCompleteRoster = {
  ...completeMemberTeam,
  selectedTeam:
    memberTeamLoad.state === "authenticated" && memberTeamLoad.data.selectedTeam
      ? {
          ...memberTeamLoad.data.selectedTeam,
          roster: memberTeamLoad.data.selectedTeam.roster.map((member) => ({ ...member, role: "member" as const })),
        }
      : firstPage.selectedTeam,
};
if (playerTeamsPageSchema.safeParse(noCaptainOnCompleteRoster).success) {
  throw new Error("Teams runtime contract accepted a complete roster without a captain.");
}

const currentPlayerRoleMismatch = {
  ...firstPage,
  selectedTeam: {
    ...firstPage.selectedTeam!,
    roster: firstPage.selectedTeam!.roster.map((member) =>
      member.playerId === firstPage.player.playerId ? { ...member, role: "member" as const } : member,
    ),
  },
};
if (playerTeamsPageSchema.safeParse(currentPlayerRoleMismatch).success) {
  throw new Error("Teams runtime contract accepted current-player roster role mismatch.");
}

const selectedWithoutTeam = { ...firstPage, selectionState: "selected" as const, selectedTeam: null };
if (playerTeamsPageSchema.safeParse(selectedWithoutTeam).success) {
  throw new Error("Teams runtime contract accepted selected state without selectedTeam.");
}

const validNoTeams = {
  player: firstPage.player,
  summary: { totalTeams: 0, captainOf: 0, memberOf: 0 },
  memberships: [],
  selectionState: "none" as const,
  selectedTeam: null,
};
if (!playerTeamsPageSchema.safeParse(validNoTeams).success) {
  throw new Error("Teams runtime contract rejected the legitimate no-memberships state.");
}

console.log("F14 Player Teams contract checks passed.");
