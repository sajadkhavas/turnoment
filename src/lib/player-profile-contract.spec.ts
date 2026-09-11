import { authenticatedPlayerSchema } from "./login-auth-contract";
import { MockPlayerProfileRepository } from "./player-profile-data";
import {
  playerProfileUpdateCommandSchema,
  playerToProfileDraft,
  validatePlayerProfileDraft,
} from "./player-profile-contract";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const player = authenticatedPlayerSchema.parse({
  id: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
  phone: "+989121234567",
  email: null,
  is_active: true,
  date_joined: "2026-09-10T07:00:00+03:30",
  platform_roles: ["player"],
  profile: {
    gamer_tag: "player.one",
    display_name: "بازیکن نمونه",
    city: "کرج",
    bio: "یک معرفی کوتاه",
    interview_opt_in: false,
    avatar_key: "",
  },
});

const draft = playerToProfileDraft(player);
assert(draft.gamerTag === "player.one", "Profile draft must project backend gamer_tag.");
assert(draft.displayName === "بازیکن نمونه", "Profile draft must project backend display_name.");

const valid = validatePlayerProfileDraft({
  ...draft,
  gamerTag: "  player-two  ",
  displayName: "  بازیکن دوم  ",
  city: "  تهران  ",
  bio: "  معرفی تازه  ",
  interviewOptIn: true,
});
assert(valid.valid, "Supported profile fields must validate.");
assert(valid.command.gamer_tag === "player-two", "Gamer tag must be trimmed before mutation.");
assert(valid.command.display_name === "بازیکن دوم", "Display name must be trimmed before mutation.");
assert(valid.command.city === "تهران", "City must be trimmed before mutation.");
assert(valid.command.bio === "معرفی تازه", "Bio must be trimmed before mutation.");
assert(valid.command.interview_opt_in === true, "Interview opt-in must preserve boolean truth.");

const emptyGamerTag = validatePlayerProfileDraft({ ...draft, gamerTag: "   " });
assert(emptyGamerTag.valid, "Gamer tag is optional in backend P01 truth.");
assert(emptyGamerTag.command.gamer_tag === null, "Empty gamer tag must map to backend null.");

const invalidGamerTag = validatePlayerProfileDraft({ ...draft, gamerTag: "بازیکن فارسی" });
assert(!invalidGamerTag.valid && Boolean(invalidGamerTag.fieldErrors.gamerTag), "Invalid gamer tag must fail locally.");

const tooLongBio = validatePlayerProfileDraft({ ...draft, bio: "x".repeat(281) });
assert(!tooLongBio.valid && Boolean(tooLongBio.fieldErrors.bio), "Bio must honor backend 280-character limit.");

assert(
  !playerProfileUpdateCommandSchema.safeParse({
    gamer_tag: "ok-player",
    display_name: "ok",
    city: "کرج",
    bio: "ok",
    interview_opt_in: false,
    phone: "+989121234567",
  }).success,
  "Profile mutation contract must reject unsupported identity fields.",
);

const repository = new MockPlayerProfileRepository();
const loaded = await repository.getProfile();
assert(loaded.state === "authenticated", "Profile QA repository must provide an authenticated player.");

const saved = await repository.updateProfile({
  gamer_tag: "new-player",
  display_name: "نام تازه",
  city: "تهران",
  bio: "پروفایل تازه",
  interview_opt_in: true,
});
assert(saved.outcome === "saved", "Valid profile mutation must use the saved outcome.");
assert(saved.profile.gamer_tag === "new-player", "Saved profile must reflect authoritative mutation result.");

const conflict = await repository.updateProfile({
  gamer_tag: "taken-player",
  display_name: "نام تازه",
  city: "تهران",
  bio: "پروفایل تازه",
  interview_opt_in: true,
});
assert(conflict.outcome === "conflict", "Gamer-tag conflicts must remain explicit outcomes.");
assert(Boolean(conflict.fieldErrors.gamerTag), "Conflict must identify the gamer-tag field.");

console.log("F09 Player Profile contract checks passed.");
