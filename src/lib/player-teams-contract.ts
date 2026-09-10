import { z } from "zod";

export interface PlayerTeamsQuery {
  teamId?: string;
  page: number;
}

const stableIdSchema = z.string().trim().min(1).max(128).regex(/^[A-Za-z0-9_-]+$/);
const gamerTagSchema = z.string().trim().min(1).max(80);
export const playerTeamRoleSchema = z.enum(["captain", "member"]);

export const playerTeamMembershipSchema = z
  .object({
    teamId: stableIdSchema,
    name: z.string().trim().min(1).max(120),
    role: playerTeamRoleSchema,
    memberCount: z.number().int().positive(),
  })
  .strict();

export const playerTeamRosterMemberSchema = z
  .object({
    playerId: stableIdSchema,
    gamerTag: gamerTagSchema,
    role: playerTeamRoleSchema,
  })
  .strict();

export const playerTeamRosterPaginationSchema = z
  .object({
    currentPage: z.number().int().positive(),
    totalPages: z.number().int().positive(),
    totalItems: z.number().int().positive(),
  })
  .strict()
  .refine((pagination) => pagination.currentPage <= pagination.totalPages, {
    message: "Current roster page cannot exceed total pages.",
    path: ["currentPage"],
  });

export const selectedPlayerTeamSchema = z
  .object({
    teamId: stableIdSchema,
    name: z.string().trim().min(1).max(120),
    currentPlayerRole: playerTeamRoleSchema,
    memberCount: z.number().int().positive(),
    roster: z.array(playerTeamRosterMemberSchema),
    rosterPagination: playerTeamRosterPaginationSchema,
  })
  .strict()
  .superRefine((team, ctx) => {
    if (team.memberCount !== team.rosterPagination.totalItems) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selected-team member count must match roster total.",
        path: ["memberCount"],
      });
    }

    const rosterIds = team.roster.map((member) => member.playerId);
    if (new Set(rosterIds).size !== rosterIds.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Roster player IDs must be unique within a page.",
        path: ["roster"],
      });
    }

    const captainsOnPage = team.roster.filter((member) => member.role === "captain").length;
    if (captainsOnPage > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A roster page cannot expose multiple captains.",
        path: ["roster"],
      });
    }
    if (team.rosterPagination.totalPages === 1 && captainsOnPage !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A complete single-page roster must expose exactly one captain.",
        path: ["roster"],
      });
    }
  });

export const playerTeamsSummarySchema = z
  .object({
    totalTeams: z.number().int().nonnegative(),
    captainOf: z.number().int().nonnegative(),
    memberOf: z.number().int().nonnegative(),
  })
  .strict()
  .refine((summary) => summary.captainOf + summary.memberOf === summary.totalTeams, {
    message: "Team role counts must partition the total memberships.",
    path: ["totalTeams"],
  });

export const playerTeamsPageSchema = z
  .object({
    player: z
      .object({
        playerId: stableIdSchema,
        gamerTag: gamerTagSchema,
      })
      .strict(),
    summary: playerTeamsSummarySchema,
    memberships: z.array(playerTeamMembershipSchema),
    selectionState: z.enum(["none", "selected", "unavailable"]),
    selectedTeam: selectedPlayerTeamSchema.nullable(),
  })
  .strict()
  .superRefine((page, ctx) => {
    if (page.summary.totalTeams !== page.memberships.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Summary team total must match the membership switcher projection.",
        path: ["summary", "totalTeams"],
      });
    }

    const membershipIds = page.memberships.map((membership) => membership.teamId);
    if (new Set(membershipIds).size !== membershipIds.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Membership team IDs must be unique.",
        path: ["memberships"],
      });
    }

    const captainCount = page.memberships.filter((membership) => membership.role === "captain").length;
    const memberCount = page.memberships.filter((membership) => membership.role === "member").length;
    if (captainCount !== page.summary.captainOf || memberCount !== page.summary.memberOf) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Summary role counts must match membership roles.",
        path: ["summary"],
      });
    }

    if (page.selectionState === "selected") {
      if (page.selectedTeam === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Selected state requires selectedTeam.",
          path: ["selectedTeam"],
        });
        return;
      }

      const membership = page.memberships.find((item) => item.teamId === page.selectedTeam?.teamId);
      if (!membership) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Selected team must exist in current-player memberships.",
          path: ["selectedTeam", "teamId"],
        });
      } else {
        if (membership.name !== page.selectedTeam.name) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Selected-team name must match membership projection.", path: ["selectedTeam", "name"] });
        }
        if (membership.role !== page.selectedTeam.currentPlayerRole) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Selected-team role must match membership projection.", path: ["selectedTeam", "currentPlayerRole"] });
        }
        if (membership.memberCount !== page.selectedTeam.memberCount) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Selected-team member count must match membership projection.", path: ["selectedTeam", "memberCount"] });
        }
      }

      const currentPlayerOnPage = page.selectedTeam.roster.find((member) => member.playerId === page.player.playerId);
      if (currentPlayerOnPage && currentPlayerOnPage.role !== page.selectedTeam.currentPlayerRole) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Current player's roster role must match selected-team role.",
          path: ["selectedTeam", "roster"],
        });
      }
      return;
    }

    if (page.selectedTeam !== null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Only selected state may expose selectedTeam.",
        path: ["selectedTeam"],
      });
    }

    if (page.selectionState === "none" && (page.memberships.length !== 0 || page.summary.totalTeams !== 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "None state requires zero current-player team memberships.",
        path: ["selectionState"],
      });
    }
  });

export type PlayerTeamRole = z.infer<typeof playerTeamRoleSchema>;
export type PlayerTeamMembership = z.infer<typeof playerTeamMembershipSchema>;
export type PlayerTeamRosterMember = z.infer<typeof playerTeamRosterMemberSchema>;
export type PlayerTeamsPageData = z.infer<typeof playerTeamsPageSchema>;

export const playerTeamsLoadResultSchema = z.discriminatedUnion("state", [
  z.object({ state: z.literal("authenticated"), data: playerTeamsPageSchema }).strict(),
  z.object({ state: z.literal("unauthenticated") }).strict(),
]);

export type PlayerTeamsLoadResult = z.infer<typeof playerTeamsLoadResultSchema>;

export interface PlayerTeamsRepository {
  getTeams(query: PlayerTeamsQuery): Promise<PlayerTeamsLoadResult>;
}
