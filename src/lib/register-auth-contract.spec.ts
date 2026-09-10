import { MockLoginAuthRepository } from "./login-auth-data";
import { sanitizeRegisterRedirect } from "./register-auth-contract";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

assert(
  sanitizeRegisterRedirect("/dashboard/tournaments?state=upcoming") === "/dashboard/tournaments?state=upcoming",
  "Safe internal register redirect must survive.",
);
assert(
  sanitizeRegisterRedirect("https://example.com/") === "/dashboard",
  "External register redirect must fail closed.",
);
assert(
  sanitizeRegisterRedirect("//example.com/path") === "/dashboard",
  "Protocol-relative register redirect must fail closed.",
);
assert(
  sanitizeRegisterRedirect("/login?redirect=/dashboard") === "/dashboard",
  "Register flow must not redirect back into Login.",
);
assert(
  sanitizeRegisterRedirect("/register?redirect=/dashboard") === "/dashboard",
  "Register redirect loop must fail closed.",
);
assert(
  sanitizeRegisterRedirect("/register/") === "/dashboard",
  "Trailing-slash register loop must fail closed.",
);

const repository = new MockLoginAuthRepository();
const session = await repository.getSession();
assert(session.state === "unauthenticated", "Registration QA must begin unauthenticated.");

const issued = await repository.requestOtp("۰۹۱۲۱۲۳۴۵۶۷");
assert(issued.outcome === "issued", "Registration must reuse the accepted P01 OTP request contract.");

const verified = await repository.verifyOtp({ challengeId: issued.challenge.challengeId, code: "123456" });
assert(verified.outcome === "authenticated", "Successful registration OTP verify must establish authenticated identity.");
assert(
  verified.player.profile !== undefined,
  "P01 verified identity must include the PlayerProfile projection.",
);

console.log("F08 OTP Account Onboarding contract checks passed.");
