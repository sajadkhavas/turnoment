import {
  playerProfileLoadResultSchema,
  playerProfileUpdateCommandSchema,
  updatePlayerProfileActionSchema,
  type PlayerProfileRepository,
} from "./player-profile-contract";
import { authenticatedPlayerSchema, playerProfileSchema } from "./login-auth-contract";

const initialPlayer = authenticatedPlayerSchema.parse({
  id: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
  phone: "+989121234567",
  email: null,
  is_active: true,
  date_joined: "2026-08-18T14:20:00+03:30",
  platform_roles: ["player"],
  profile: {
    gamer_tag: "sajadx",
    display_name: "سجاد",
    city: "کرج",
    bio: "بازیکن رقابتی EA FC و دنبال‌کننده تورنومنت‌های حضوری.",
    interview_opt_in: true,
    avatar_key: "",
  },
});

export class MockPlayerProfileRepository implements PlayerProfileRepository {
  private player = initialPlayer;

  async getProfile() {
    return playerProfileLoadResultSchema.parse({ state: "authenticated", player: this.player });
  }

  async updateProfile(command: unknown) {
    const parsed = playerProfileUpdateCommandSchema.parse(command);

    if (parsed.gamer_tag?.toLowerCase() === "taken-player") {
      return updatePlayerProfileActionSchema.parse({
        outcome: "conflict",
        message: "این شناسه بازیکن قبلاً استفاده شده است.",
        fieldErrors: { gamerTag: "این شناسه بازیکن قبلاً استفاده شده است." },
      });
    }

    const profile = playerProfileSchema.parse({
      ...this.player.profile,
      ...parsed,
    });
    this.player = authenticatedPlayerSchema.parse({ ...this.player, profile });

    return updatePlayerProfileActionSchema.parse({ outcome: "saved", profile });
  }
}
