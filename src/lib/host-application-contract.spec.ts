import { hostApplicationInputSchema, hostApplicationReceiptSchema, validateHostApplicationDraft, type HostApplicationDraft } from "./host-application-contract";
import { MockHostApplicationRepository } from "./host-application-fixture";

function assert(condition: unknown, message: string): asserts condition { if (!condition) throw new Error(message); }

const validDraft: HostApplicationDraft = {
  venueName: " مرکز بازی آلفا ", managerName: " سجاد احمدی ", phone: "۰۹۱۲ ۱۲۳ ۴۵۶۷", city: " تهران ", area: " سعادت‌آباد ", stationCount: "۲۴", games: " Valorant، CS2 ", description: "  فضای اختصاصی برای مسابقات تیمی  ",
};

const parsed = validateHostApplicationDraft(validDraft);
assert(parsed.success, "A valid host application draft must parse.");
assert(parsed.data.phone === "+989121234567", "Iranian mobile digits must normalize.");
assert(parsed.data.stationCount === 24, "Persian station count digits must become a number.");
assert(parsed.data.venueName === "مرکز بازی آلفا", "Text fields must trim.");

const plus98Result = validateHostApplicationDraft({ ...validDraft, phone: "+۹۸۹۱۲۱۲۳۴۵۶۷", stationCount: "٢٥" });
assert(plus98Result.success, "+98/Persian and Arabic digits must parse.");
assert(plus98Result.data.phone === "+989121234567", "+98 Persian digits must normalize.");
assert(plus98Result.data.stationCount === 25, "Arabic station count digits must normalize.");

for (const [field, value] of [["phone", "02112345678"], ["stationCount", "0"], ["stationCount", "12.5"], ["venueName", ""]] as const) {
  const result = validateHostApplicationDraft({ ...validDraft, [field]: value });
  assert(!result.success, `${field}=${value} must be rejected.`);
  assert(Boolean(result.fieldErrors[field]), `${field} must expose a field error.`);
}

assert(!hostApplicationInputSchema.safeParse({ ...parsed.data, unexpected: true }).success, "Unknown application request fields must be rejected.");
const noDescription = validateHostApplicationDraft({ ...validDraft, description: "   " });
assert(noDescription.success, "An empty optional description must remain valid.");
assert(noDescription.data.description === null, "Empty optional description must normalize to null.");

const receipt = hostApplicationReceiptSchema.parse({ schemaVersion: 1, applicationId: "app_123", state: "received", submittedAt: "2026-09-12T15:00:00+03:30" });
for (const invalidReceipt of [{ ...receipt, state: "approved" }, { ...receipt, submittedAt: "2026-09-12" }, { ...receipt, unexpected: true }]) {
  assert(!hostApplicationReceiptSchema.safeParse(invalidReceipt).success, "Malformed or extended receipt payloads must fail strict validation.");
}
const fixtureReceipt = await new MockHostApplicationRepository().submit(parsed.data);
assert(hostApplicationReceiptSchema.safeParse(fixtureReceipt).success, "The deterministic development repository must satisfy the production receipt contract.");
console.log("F23 host application contract checks passed.");
