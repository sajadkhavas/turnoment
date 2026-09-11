import { MockPlayerSettingsRepository } from "./player-settings-data";
import {
  playerSettingsSaveActionSchema,
  playerSettingsSaveRequestSchema,
  playerSettingsSchema,
} from "./player-settings-contract";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const validSettings = playerSettingsSchema.parse({
  revision: "settings-v1",
  optional: { tournament: true, match: false, challenge: true },
  required: { account: true, system: true },
});
assert(validSettings.required.account && validSettings.required.system, "Essential notices must remain enabled.");

assert(
  !playerSettingsSchema.safeParse({
    revision: "settings-v1",
    optional: { tournament: true, match: true, challenge: true },
    required: { account: false, system: true },
  }).success,
  "Account notices cannot be represented as disabled.",
);

assert(
  !playerSettingsSaveRequestSchema.safeParse({
    revision: "settings-v1",
    optional: { tournament: true, match: true, challenge: false },
    required: { account: false, system: false },
  }).success,
  "Writable settings payload must reject mandatory account/system controls.",
);

assert(
  !playerSettingsSaveRequestSchema.safeParse({
    revision: "settings-v1",
    optional: { tournament: true, match: true, challenge: false, arbitrary: true },
  }).success,
  "Writable optional categories must be strict and reject invented fields.",
);

assert(
  playerSettingsSaveActionSchema.safeParse({
    outcome: "stale",
    message: "نسخه جدیدتری وجود دارد.",
    settings: validSettings,
  }).success,
  "Stale save outcome must carry authoritative current settings.",
);

const repository = new MockPlayerSettingsRepository();
const initial = await repository.getSettings();
assert(initial.state === "authenticated", "QA settings repository must provide an authenticated projection.");
assert(initial.data.revision === "settings-v1", "Initial settings revision must be stable for deterministic QA.");
assert(initial.data.required.account && initial.data.required.system, "QA settings must preserve essential notices.");

const saved = await repository.saveSettings({
  revision: initial.data.revision,
  optional: { tournament: false, match: true, challenge: true },
});
assert(saved.outcome === "saved", "A current revision must save successfully.");
assert(saved.settings.revision !== initial.data.revision, "Successful save must return a new authoritative revision.");
assert(!saved.settings.optional.tournament && saved.settings.optional.challenge, "Saved optional preferences must match the request.");
assert(saved.settings.required.account && saved.settings.required.system, "Save cannot disable mandatory notices.");

const stale = await repository.saveSettings({
  revision: initial.data.revision,
  optional: { tournament: true, match: false, challenge: false },
});
assert(stale.outcome === "stale", "An old revision must fail closed as stale.");
assert(stale.settings.revision === saved.settings.revision, "Stale result must return the authoritative current revision.");
assert(stale.settings.optional.challenge, "Stale write must not overwrite the already-saved authoritative settings.");

console.log("F11 Player Settings contract checks passed.");
