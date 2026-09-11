import assert from "node:assert/strict";
import {
  buildGamingCenterDiscoveryQuery,
  compactGamingCenterDiscoverySearch,
  gamingCenterDiscoveryItemSchema,
  gamingCenterDiscoveryPageSchema,
  normalizeGamingCenterDiscoverySearch,
} from "./gaming-center-discovery-contract";
import {
  getGamingCenterDiscoveryFixture,
  MockGamingCenterDiscoveryRepository,
} from "./gaming-center-discovery-fixture";

assert.deepEqual(normalizeGamingCenterDiscoverySearch({ city: "tehran", page: "2" }), {
  city: "tehran",
  page: 2,
});
assert.deepEqual(normalizeGamingCenterDiscoverySearch({ city: "Tehran!", page: "0" }), {
  city: undefined,
  page: undefined,
});
assert.deepEqual(normalizeGamingCenterDiscoverySearch({ city: "karaj", page: "1" }), {
  city: "karaj",
  page: undefined,
});

const built = buildGamingCenterDiscoveryQuery({ city: "tehran" });
assert.deepEqual(built, { city: "tehran", page: 1 });
assert.deepEqual(compactGamingCenterDiscoverySearch({ city: "tehran", page: 1 }), {
  city: "tehran",
  page: undefined,
});

const repository = new MockGamingCenterDiscoveryRepository();
const base = await repository.getDiscovery({ page: 1 });
assert.equal(base.schemaVersion, 1);
assert.equal(base.pagination.totalItems, 4);
assert.equal(base.pagination.totalPages, 2);
assert.equal(base.items.length, 2);
assert.equal(gamingCenterDiscoveryPageSchema.safeParse(base).success, true);
assert.ok(base.items.every((center) => !("rating" in center) && !("reviews" in center)));

const tehran = await repository.getDiscovery({ city: "tehran", page: 1 });
assert.equal(tehran.activeQuery.city, "tehran");
assert.equal(tehran.pagination.totalItems, 2);
assert.ok(tehran.items.every((center) => center.city.slug === "tehran"));

const secondPage = getGamingCenterDiscoveryFixture({ page: 2 });
assert.equal(secondPage.pagination.currentPage, 2);
assert.equal(secondPage.items.length, 2);
assert.notEqual(secondPage.items[0].centerId, base.items[0].centerId);

const clampedPage = getGamingCenterDiscoveryFixture({ page: 99 });
assert.equal(clampedPage.pagination.currentPage, 2);

const duplicateEquipment = structuredClone(base.items[0]);
duplicateEquipment.equipmentLabels = ["PS5", "PS5"];
assert.equal(gamingCenterDiscoveryItemSchema.safeParse(duplicateEquipment).success, false);

const negativeUpcoming = structuredClone(base.items[0]);
negativeUpcoming.upcomingTournamentCount = -1;
assert.equal(gamingCenterDiscoveryItemSchema.safeParse(negativeUpcoming).success, false);

const privateLeak = { ...base.items[0], phone: "09120000000" };
assert.equal(gamingCenterDiscoveryItemSchema.safeParse(privateLeak).success, false);

const duplicateCenter = structuredClone(base);
duplicateCenter.items = [duplicateCenter.items[0], duplicateCenter.items[0]];
assert.equal(gamingCenterDiscoveryPageSchema.safeParse(duplicateCenter).success, false);

const wrongPages = structuredClone(base);
wrongPages.pagination.totalPages = 3;
assert.equal(gamingCenterDiscoveryPageSchema.safeParse(wrongPages).success, false);

console.log("gaming-center-discovery contract checks passed");
