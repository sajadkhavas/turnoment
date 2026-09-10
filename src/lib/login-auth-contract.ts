import { z } from "zod";

const persianArabicDigits = "۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩";
const asciiDigits = "01234567890123456789";

export function toAsciiDigits(value: string) {
  return Array.from(value, (char) => {
    const index = persianArabicDigits.indexOf(char);
    return index >= 0 ? asciiDigits[index] : char;
  }).join("");
}

export function normalizeIranMobileForUi(value: string): string | null {
  let normalized = toAsciiDigits(value.trim()).replace(/[\s\-()]/g, "");
  if (normalized.startsWith("0098")) normalized = `+98${normalized.slice(4)}`;
  else if (normalized.startsWith("98")) normalized = `+${normalized}`;
  else if (normalized.startsWith("0")) normalized = `+98${normalized.slice(1)}`;
  else if (normalized.startsWith("9")) normalized = `+98${normalized}`;
  return /^\+989\d{9}$/.test(normalized) ? normalized : null;
}

export function normalizeOtpCode(value: string) {
  return toAsciiDigits(value).replace(/\D/g, "").slice(0, 6);
}

export function sanitizeLoginRedirect(value: unknown) {
  const fallback = "/dashboard";
  if (typeof value !== "string") return fallback;
  const candidate = value.trim();
  if (!candidate || candidate.length > 2048) return fallback;
  if (!candidate.startsWith("/") || candidate.startsWith("//")) return fallback;
  if (candidate.includes("\\") || /[\u0000-\u001f\u007f]/.test(candidate)) return fallback;

  try {
    const url = new URL(candidate, "https://turnoment.invalid");
    if (url.origin !== "https://turnoment.invalid") return fallback;
    if (url.pathname === "/login") return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export const playerProfileSchema = z.object({
  gamer_tag: z.string().nullable(),
  display_name: z.string(),
  city: z.string(),
  bio: z.string(),
  interview_opt_in: z.boolean(),
  avatar_key: z.string(),
});

export const authenticatedPlayerSchema = z.object({
  id: z.string().uuid(),
  phone: z.string().regex(/^\+989\d{9}$/),
  email: z.string().email().nullable(),
  is_active: z.literal(true),
  date_joined: z.string().min(1),
  platform_roles: z.array(z.string()),
  profile: playerProfileSchema,
});

export type AuthenticatedPlayer = z.infer<typeof authenticatedPlayerSchema>;

export const loginSessionSchema = z.discriminatedUnion("state", [
  z.object({ state: z.literal("unauthenticated") }),
  z.object({ state: z.literal("authenticated"), player: authenticatedPlayerSchema }),
]);

export type LoginSession = z.infer<typeof loginSessionSchema>;

export const otpChallengeSchema = z.object({
  challengeId: z.string().uuid(),
  phone: z.string().regex(/^\+989\d{9}$/),
  expiresIn: z.number().int().positive(),
  resendAfter: z.number().int().nonnegative(),
});

export type OtpChallenge = z.infer<typeof otpChallengeSchema>;

export const requestOtpActionSchema = z.discriminatedUnion("outcome", [
  z.object({ outcome: z.literal("issued"), challenge: otpChallengeSchema }),
  z.object({ outcome: z.literal("rate_limited"), retryAfter: z.number().int().positive(), message: z.string().min(1) }),
  z.object({ outcome: z.literal("delivery_unavailable"), message: z.string().min(1) }),
  z.object({ outcome: z.literal("validation_error"), message: z.string().min(1) }),
]);

export type RequestOtpAction = z.infer<typeof requestOtpActionSchema>;

export const verifyOtpCommandSchema = z.object({
  challengeId: z.string().uuid(),
  code: z.string().regex(/^\d{6}$/),
});

export type VerifyOtpCommand = z.infer<typeof verifyOtpCommandSchema>;

export const verifyOtpActionSchema = z.discriminatedUnion("outcome", [
  z.object({ outcome: z.literal("authenticated"), player: authenticatedPlayerSchema }),
  z.object({ outcome: z.literal("invalid"), message: z.string().min(1) }),
  z.object({ outcome: z.literal("expired"), message: z.string().min(1) }),
  z.object({ outcome: z.literal("consumed"), message: z.string().min(1) }),
  z.object({ outcome: z.literal("inactive"), message: z.string().min(1) }),
  z.object({ outcome: z.literal("validation_error"), message: z.string().min(1) }),
]);

export type VerifyOtpAction = z.infer<typeof verifyOtpActionSchema>;

export interface LoginAuthRepository {
  getSession(): Promise<LoginSession>;
  requestOtp(phone: string): Promise<RequestOtpAction>;
  verifyOtp(command: VerifyOtpCommand): Promise<VerifyOtpAction>;
}
