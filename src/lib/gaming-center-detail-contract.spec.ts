import assert from "node:assert/strict";
import {
  buildGamingCenterLocalBusinessJsonLd,
  gamingCenterDetailSchema,
  gamingCenterDetailTournamentSchema,
  parseGamingCenterPublicId,
} from "./gaming-center-detail-contract";
import {
  getGamingCenterDetailFixture,
  MockGamingCenterDetailRepository,
} from "./gaming-center-detail-fixture";

assert.equal(parseGamingCenterPublicId("c1"), "c1");
assert.equal(parseGamingCenterPublicId("center_ABC-10"), "center_ABC-10");
assert.equal(parseGamingCenterPublicId("../c1"), null);
assert.equal(parseGamingCenterPublicId(""), null);

const repository = new MockGamingCenterDetailRepository();
const c1 = await repository.getByPublicId("c1");
assert.ok(c1);
assert.equal(c1?.schemaVersion, 1);
assert.equal(c1?.publicationState, "published");
assert.equal(c1?.publicId, "c1");
assert.equal(gamingCenterDetailSchema.safeParse(c1).success, true);
assert.equal(await repository.getByPublicId("missing"), null);
assert.ok(c1 && !("rating" in c1) && !("reviews" in c1));

const c4 = getGamingCenterDetailFixture("c4");
assert.ok(c4);
assert.equal(c4?.publicAddress, null);
assert.equal(buildGamingCenterLocalBusinessJsonLd(c4!), null);

const localBusiness = buildGamingCenterLocalBusinessJsonLd(c1!);
assert.ok(localBusiness);
assert.equal(localBusiness?.["@type"], "LocalBusiness");
assert.equal(localBusiness?.address.addressCountry, "IR");
assert.equal(localBusiness?.name, "Arena Gaming Center");
assert.ok(localBusiness && !("aggregateRating" in localBusiness) && !("review" in localBusiness));

const duplicateEquipment = structuredClone(c1!);
duplicateEquipment.equipmentLabels = ["PS5", "PS5"];
assert.equal(gamingCenterDetailSchema.safeParse(duplicateEquipment).success, false);

const duplicateGallery = structuredClone(c1!);
duplicateGallery.galleryImages = ["/a.jpg", "/a.jpg"];
assert.equal(gamingCenterDetailSchema.safeParse(duplicateGallery).success, false);

const duplicateOpeningDay = structuredClone(c1!);
duplicateOpeningDay.openingHours = [
  { dayOfWeek: ["Saturday"], opens: "10:00", closes: "22:00" },
  { dayOfWeek: ["Saturday"], opens: "12:00", closes: "23:00" },
];
assert.equal(gamingCenterDetailSchema.safeParse(duplicateOpeningDay).success, false);

const impossibleCount = structuredClone(c1!);
impossibleCount.upcomingTournamentCount = 1;
assert.equal(gamingCenterDetailSchema.safeParse(impossibleCount).success, false);

const zeroWithTournament = structuredClone(c1!);
zeroWithTournament.upcomingTournamentCount = 0;
assert.equal(gamingCenterDetailSchema.safeParse(zeroWithTournament).success, false);

const invalidPhone = structuredClone(c1!);
invalidPhone.publicPhone = "private-extension-secret";
assert.equal(gamingCenterDetailSchema.safeParse(invalidPhone).success, false);

const privateLeak = { ...c1!, verificationDocument: "private.pdf" };
assert.equal(gamingCenterDetailSchema.safeParse(privateLeak).success, false);

const tournament = c1!.tournaments[0];
assert.equal(gamingCenterDetailTournamentSchema.safeParse(tournament).success, true);
const leakedTournament = { ...tournament, venueInternalId: "secret" };
assert.equal(gamingCenterDetailTournamentSchema.safeParse(leakedTournament).success, false);

console.log("gaming-center-detail contract checks passed");
