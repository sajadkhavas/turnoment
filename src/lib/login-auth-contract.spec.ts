import { MockLoginAuthRepository } from "./login-auth-data";
import {
  authenticatedPlayerSchema,
  normalizeIranMobileForUi,
  normalizeOtpCode,
  sanitizeLoginRedirect,
} from "./login-auth-contract";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertThrows(run: () => unknown, message: string) {
  let threw = false;
  try {
    run();
  } catch {
    threw = true;
  }
  assert(threw, message);
}

assert(normalizeIranMobileForUi("0912 123 4567") === "+989121234567", "Local Iran mobile must normalize to E.164.");
assert(normalizeIranMobileForUi("۹۱۲۱۲۳۴۵۶۷") === "+989121234567", "Persian mobile digits must normalize.");
assert(normalizeIranMobileForUi("0098-912-123-4567") === "+989121234567", "0098 prefix must normalize.");
assert(normalizeIranMobileForUi("02112345678") === null, "Non-mobile Iran number must be rejected.");
assert(normalizeOtpCode("۱۲٣ 45x6") === "123456", "OTP input must normalize Persian/Arabic digits and strip non-digits.");

assert(sanitizeLoginRedirect("/dashboard/matches?state=upcoming") === "/dashboard/matches?state=upcoming", "Safe internal redirect must survive.");
assert(sanitizeLoginRedirect("https://evil.example/") === "/dashboard", "External redirect must fail closed.");
assert(sanitizeLoginRedirect("//evil.example/path") === "/dashboard", "Protocol-relative redirect must fail closed.");
assert(sanitizeLoginRedirect("/\\evil.example") === "/dashboard", "Backslash redirect ambiguity must fail closed.");
assert(sanitizeLoginRedirect("/login?redirect=/dashboard") === "/dashboard", "Login redirect loop must fail closed.");

const repository = new MockLoginAuthRepository();
const session = await repository.getSession();
assert(session.state === "unauthenticated", "Login QA adapter must begin unauthenticated.");

const badPhone = await repository.requestOtp("02112345678");
assert(badPhone.outcome === "validation_error", "Invalid mobile must not issue OTP challenge.");

const issued = await repository.requestOtp("09121234567");
assert(issued.outcome === "issued", "Valid Iran mobile must issue challenge in QA adapter.");
assert(issued.challenge.phone === "+989121234567", "Issued challenge must retain canonical phone identity.");

const invalidCode = await repository.verifyOtp({ challengeId: issued.challenge.challengeId, code: "000000" });
assert(invalidCode.outcome === "invalid", "Wrong OTP must remain unauthenticated.");

const authenticated = await repository.verifyOtp({ challengeId: issued.challenge.challengeId, code: "123456" });
assert(authenticated.outcome === "authenticated", "Valid QA OTP must authenticate.");
assert(authenticatedPlayerSchema.parse(authenticated.player).phone === "+989121234567", "Authenticated identity must validate at runtime.");

assertThrows(
  () => authenticatedPlayerSchema.parse({ ...authenticated.player, id: "not-a-uuid" }),
  "Malformed authenticated player identity must be rejected.",
);
assertThrows(
  () => authenticatedPlayerSchema.parse({ ...authenticated.player, is_active: false }),
  "Authenticated projection must never accept inactive account state.",
);

console.log("F07 OTP Login contract checks passed.");
