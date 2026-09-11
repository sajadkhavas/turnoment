import {
  loginSessionSchema,
  normalizeIranMobileForUi,
  requestOtpActionSchema,
  verifyOtpActionSchema,
  verifyOtpCommandSchema,
  type LoginAuthRepository,
} from "./login-auth-contract";

const MOCK_CHALLENGE_ID = "11111111-2222-4333-8444-555555555555";
const MOCK_CODE = "123456";

const mockPlayer = {
  id: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
  phone: "+989121234567",
  email: null,
  is_active: true as const,
  date_joined: "2026-09-10T07:00:00+03:30",
  platform_roles: ["player"],
  profile: {
    gamer_tag: "sajadx",
    display_name: "سجاد",
    city: "کرج",
    bio: "",
    interview_opt_in: false,
    avatar_key: "",
  },
};

export class MockLoginAuthRepository implements LoginAuthRepository {
  async getSession() {
    return loginSessionSchema.parse({ state: "unauthenticated" });
  }

  async requestOtp(phone: string) {
    const normalized = normalizeIranMobileForUi(phone);
    if (!normalized) {
      return requestOtpActionSchema.parse({
        outcome: "validation_error",
        message: "شماره موبایل ایران معتبر نیست.",
      });
    }

    return requestOtpActionSchema.parse({
      outcome: "issued",
      challenge: {
        challengeId: MOCK_CHALLENGE_ID,
        phone: normalized,
        expiresIn: 120,
        resendAfter: 30,
      },
    });
  }

  async verifyOtp(command: { challengeId: string; code: string }) {
    const parsed = verifyOtpCommandSchema.safeParse(command);
    if (!parsed.success) {
      return verifyOtpActionSchema.parse({
        outcome: "validation_error",
        message: "کد ورود باید ۶ رقم باشد.",
      });
    }
    if (parsed.data.challengeId !== MOCK_CHALLENGE_ID || parsed.data.code !== MOCK_CODE) {
      return verifyOtpActionSchema.parse({ outcome: "invalid", message: "کد ورود صحیح نیست." });
    }
    return verifyOtpActionSchema.parse({ outcome: "authenticated", player: mockPlayer });
  }
}
