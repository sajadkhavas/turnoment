import venueArena from "@/assets/tournament/venue-arena.jpg";
import venueNova from "@/assets/tournament/venue-nova.jpg";
import venuePixel from "@/assets/tournament/venue-pixel.jpg";
import {
  gamingCenterDiscoveryPageSchema,
  type GamingCenterDiscoveryPageData,
  type GamingCenterDiscoveryQuery,
  type GamingCenterDiscoveryRepository,
} from "./gaming-center-discovery-contract";

const centers = [
  {
    centerId: "c1",
    publicId: "c1",
    publicationState: "published" as const,
    name: "Arena Gaming Center",
    verified: true,
    city: { cityId: "karaj", slug: "karaj", name: "کرج" },
    district: "عظیمیه",
    summary: "مرکز گیمینگ در عظیمیه کرج با فضای رقابتی و تجهیزات مناسب برای برگزاری و دنبال‌کردن مسابقات حضوری.",
    equipmentLabels: ["PS5", "مانیتور ۱۴۴ هرتز", "دسته حرفه‌ای"],
    coverImage: venueArena,
    upcomingTournamentCount: 3,
  },
  {
    centerId: "c2",
    publicId: "c2",
    publicationState: "published" as const,
    name: "Nova Gaming",
    verified: true,
    city: { cityId: "tehran", slug: "tehran", name: "تهران" },
    district: "سعادت‌آباد",
    summary: "مرکز گیمینگ در سعادت‌آباد تهران با فضای میزبانی رقابت و امکانات کنسولی برای رویدادهای حضوری گیمینگ.",
    equipmentLabels: ["PS5", "تلویزیون ۴K", "صندلی گیمینگ"],
    coverImage: venueNova,
    upcomingTournamentCount: 2,
  },
  {
    centerId: "c3",
    publicId: "c3",
    publicationState: "published" as const,
    name: "Pixel House",
    verified: true,
    city: { cityId: "tehran", slug: "tehran", name: "تهران" },
    district: "نارمک",
    summary: "مرکز گیمینگ در نارمک تهران با سیستم‌های PC و فضای اختصاصی برای مسابقات تیمی و رقابت‌های حضوری.",
    equipmentLabels: ["PC گیمینگ", "استیج مسابقه", "پخش زنده"],
    coverImage: venuePixel,
    upcomingTournamentCount: 2,
  },
  {
    centerId: "c4",
    publicId: "c4",
    publicationState: "published" as const,
    name: "Gohardasht Play",
    verified: false,
    city: { cityId: "karaj", slug: "karaj", name: "کرج" },
    district: "گوهردشت",
    summary: "مرکز گیمینگ در گوهردشت کرج برای بازیکنانی که می‌خواهند مسیر رقابت‌های حضوری و رویدادهای محلی را دنبال کنند.",
    equipmentLabels: ["PS5", "PC گیمینگ"],
    coverImage: null,
    upcomingTournamentCount: null,
  },
];

const cityFacets = [
  { cityId: "karaj", slug: "karaj", name: "کرج", count: 2 },
  { cityId: "tehran", slug: "tehran", name: "تهران", count: 2 },
];

const PAGE_SIZE = 2;

export function getGamingCenterDiscoveryFixture(query: GamingCenterDiscoveryQuery): GamingCenterDiscoveryPageData {
  const filtered = query.city ? centers.filter((center) => center.city.slug === query.city) : centers;
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const currentPage = Math.min(query.page, totalPages);
  const offset = (currentPage - 1) * PAGE_SIZE;

  return gamingCenterDiscoveryPageSchema.parse({
    schemaVersion: 1,
    filters: { cities: cityFacets },
    activeQuery: {
      city: query.city,
      page: currentPage,
    },
    items: filtered.slice(offset, offset + PAGE_SIZE),
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      pageSize: PAGE_SIZE,
    },
  });
}

export class MockGamingCenterDiscoveryRepository implements GamingCenterDiscoveryRepository {
  async getDiscovery(query: GamingCenterDiscoveryQuery): Promise<GamingCenterDiscoveryPageData> {
    return getGamingCenterDiscoveryFixture(query);
  }
}
