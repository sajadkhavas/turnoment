import ps5 from "@/assets/ps5.jpg";
import xbox from "@/assets/xbox.jpg";
import switchImg from "@/assets/switch.jpg";
import controller from "@/assets/controller.jpg";
import headset from "@/assets/headset.jpg";
import game1 from "@/assets/game1.jpg";

export type Platform = "PS5" | "PS4" | "Xbox" | "Nintendo" | "PC";
export type Condition = "new" | "used" | "refurbished";
export type Stock = "in" | "low" | "out";

export interface Product {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  gallery: string[];
  category: string;
  brand: string;
  platforms: Platform[];
  condition: Condition;
  stock: Stock;
  rating: number;
  reviews: number;
  specs: Record<string, string>;
  featured?: boolean;
}

export const conditionLabel: Record<Condition, string> = {
  new: "نو",
  used: "کارکرده",
  refurbished: "بازسازی‌شده",
};

export const platformColors: Record<Platform, string> = {
  PS5: "bg-blue-600/20 text-blue-300 border-blue-500/40",
  PS4: "bg-blue-800/20 text-blue-300 border-blue-700/40",
  Xbox: "bg-emerald-600/20 text-emerald-300 border-emerald-500/40",
  Nintendo: "bg-red-600/20 text-red-300 border-red-500/40",
  PC: "bg-violet-600/20 text-violet-300 border-violet-500/40",
};

export const stockMeta: Record<Stock, { dot: string; label: string }> = {
  in: { dot: "bg-emerald-400", label: "موجود" },
  low: { dot: "bg-amber-400", label: "موجودی کم" },
  out: { dot: "bg-red-500", label: "ناموجود" },
};

export const products: Product[] = [
  {
    id: 1, slug: "playstation-5-standard",
    name: "کنسول PlayStation 5 استاندارد",
    shortDescription: "نسل جدید بازی با درایو نوری و SSD فوق‌سریع",
    description: "PlayStation 5 با SSD سفارشی، گرافیک Ray Tracing و دسته DualSense. تجربه‌ای بی‌نظیر از بازی‌های نسل جدید.",
    price: 52000000, salePrice: 48500000,
    image: ps5, gallery: [ps5, controller],
    category: "consoles", brand: "Sony",
    platforms: ["PS5"], condition: "new", stock: "in",
    rating: 4.8, reviews: 234, featured: true,
    specs: { حافظه: "۸۲۵ گیگابایت SSD", رنگ: "سفید", "نوع درایو": "Blu-ray", رزولوشن: "تا 4K 120Hz", ضمانت: "۱۸ ماه" },
  },
  {
    id: 2, slug: "xbox-series-x",
    name: "کنسول Xbox Series X",
    shortDescription: "قدرتمندترین کنسول مایکروسافت با ۱۲ ترافلاپ",
    description: "ایکس‌باکس سری اکس با پردازنده Zen 2 و گرافیک RDNA 2، آماده اجرای بازی‌ها در 4K واقعی.",
    price: 49000000,
    image: xbox, gallery: [xbox],
    category: "consoles", brand: "Microsoft",
    platforms: ["Xbox"], condition: "new", stock: "in",
    rating: 4.7, reviews: 187, featured: true,
    specs: { حافظه: "۱ ترابایت SSD", قدرت: "۱۲ TFLOPS", رزولوشن: "تا 4K 120Hz", ضمانت: "۱۸ ماه" },
  },
  {
    id: 3, slug: "nintendo-switch-oled",
    name: "نینتندو سوییچ OLED",
    shortDescription: "نمایشگر OLED هفت اینچی با رنگ‌های زنده",
    description: "نسخه OLED نینتندو سوییچ با صفحه‌نمایش بزرگ‌تر، صدای بهتر و حافظه داخلی ۶۴ گیگابایت.",
    price: 21500000, salePrice: 19900000,
    image: switchImg, gallery: [switchImg],
    category: "consoles", brand: "Nintendo",
    platforms: ["Nintendo"], condition: "new", stock: "low",
    rating: 4.9, reviews: 412, featured: true,
    specs: { نمایشگر: "۷ اینچ OLED", حافظه: "۶۴ گیگابایت", باتری: "تا ۹ ساعت", ضمانت: "۱۲ ماه" },
  },
  {
    id: 4, slug: "dualsense-controller-violet",
    name: "دسته DualSense بنفش کهکشانی",
    shortDescription: "دسته بی‌سیم PS5 با لمس هپتیک و ماشه‌های تطبیقی",
    description: "تجربه‌ای زنده و واقعی با هپتیک فیدبک و ماشه‌های تطبیقی. سازگار با PS5 و کامپیوتر.",
    price: 4900000, salePrice: 4490000,
    image: controller, gallery: [controller],
    category: "controllers", brand: "Sony",
    platforms: ["PS5", "PC"], condition: "new", stock: "in",
    rating: 4.8, reviews: 156, featured: true,
    specs: { اتصال: "بی‌سیم", باتری: "تا ۱۲ ساعت", رنگ: "بنفش کهکشانی" },
  },
  {
    id: 5, slug: "razer-kraken-v3",
    name: "هدست گیمینگ Razer Kraken V3",
    shortDescription: "هدست RGB با صدای ۷.۱ کانال فضایی",
    description: "هدست حرفه‌ای گیمینگ با درایور ۵۰ میلی‌متری و میکروفون قابل تنظیم. نورپردازی Razer Chroma RGB.",
    price: 8500000,
    image: headset, gallery: [headset],
    category: "accessories", brand: "Razer",
    platforms: ["PC", "PS5", "Xbox"], condition: "new", stock: "in",
    rating: 4.6, reviews: 89,
    specs: { اتصال: "USB", درایور: "۵۰ میلی‌متر", صدا: "7.1 فضایی" },
  },
  {
    id: 6, slug: "spider-man-2-ps5",
    name: "بازی Spider-Man 2 برای PS5",
    shortDescription: "ماجراجویی جدید مرد عنکبوتی نسل بعدی",
    description: "بازی انحصاری Marvel’s Spider-Man 2 با گرافیک خیره‌کننده و دو شخصیت قابل بازی.",
    price: 3800000, salePrice: 2990000,
    image: game1, gallery: [game1],
    category: "games", brand: "Sony",
    platforms: ["PS5"], condition: "new", stock: "in",
    rating: 4.9, reviews: 298, featured: true,
    specs: { ژانر: "اکشن / ماجراجویی", سن: "۱۶+", زبان: "انگلیسی" },
  },
  {
    id: 7, slug: "ps4-pro-1tb",
    name: "کنسول PS4 Pro یک ترابایت کارکرده",
    shortDescription: "PS4 پرو با تضمین سلامت کامل",
    description: "PS4 Pro کارکرده با کنترل کیفیت کامل، تعویض خمیر سیلیکون و گارانتی شش ماهه.",
    price: 14500000,
    image: ps5, gallery: [ps5],
    category: "consoles", brand: "Sony",
    platforms: ["PS4"], condition: "used", stock: "low",
    rating: 4.4, reviews: 67,
    specs: { حافظه: "۱ ترابایت", وضعیت: "کارکرده تمیز", ضمانت: "۶ ماه" },
  },
  {
    id: 8, slug: "xbox-controller-black",
    name: "دسته Xbox Series مشکی",
    shortDescription: "دسته بی‌سیم Xbox با گریپ بهبودیافته",
    description: "دسته رسمی Xbox Series با طراحی ارگونومیک و سازگاری کامل با PC.",
    price: 3500000,
    image: controller, gallery: [controller],
    category: "controllers", brand: "Microsoft",
    platforms: ["Xbox", "PC"], condition: "new", stock: "in",
    rating: 4.7, reviews: 134,
    specs: { اتصال: "بی‌سیم", رنگ: "مشکی" },
  },
];

export interface Category {
  slug: string; name: string; icon: string; count: number;
}
export const categories: Category[] = [
  { slug: "consoles", name: "کنسول‌های بازی", icon: "🎮", count: 24 },
  { slug: "controllers", name: "دسته بازی", icon: "🕹️", count: 38 },
  { slug: "games", name: "بازی‌ها", icon: "💿", count: 120 },
  { slug: "accessories", name: "لوازم جانبی", icon: "🎧", count: 56 },
  { slug: "vr", name: "واقعیت مجازی", icon: "🥽", count: 12 },
  { slug: "used", name: "کارکرده", icon: "♻️", count: 31 },
];

export interface ServiceType {
  slug: string; name: string; description: string;
  priceFrom: number; priceTo: number; duration: string; icon: string;
}
export const services: ServiceType[] = [
  { slug: "install-ps5", name: "نصب بازی روی PS5", description: "نصب بازی‌های نسل جدید با اکانت قانونی و راهنمایی کامل", priceFrom: 150000, priceTo: 400000, duration: "همان روز", icon: "🎮" },
  { slug: "repair-ps5", name: "تعمیر کنسول PS5", description: "تعویض خمیر، رفع HDMI، بازسازی برد و خدمات تخصصی", priceFrom: 600000, priceTo: 3500000, duration: "۱ تا ۳ روز", icon: "🛠️" },
  { slug: "repair-ps4", name: "تعمیر کنسول PS4", description: "تعمیرات تخصصی PS4 و PS4 Pro با ضمانت", priceFrom: 400000, priceTo: 2500000, duration: "۱ تا ۳ روز", icon: "🔧" },
  { slug: "repair-controller", name: "تعمیر دسته بازی", description: "رفع دریفت آنالوگ، تعویض دکمه و باتری", priceFrom: 200000, priceTo: 900000, duration: "۲۴ تا ۴۸ ساعت", icon: "🕹️" },
  { slug: "install-pc", name: "نصب بازی روی کامپیوتر", description: "نصب و راه‌اندازی بازی‌های PC به همراه تنظیم گرافیک", priceFrom: 100000, priceTo: 300000, duration: "همان روز", icon: "💻" },
  { slug: "console-cleaning", name: "سرویس و تمیزکاری", description: "سرویس کامل، تعویض خمیر سیلیکون و گردگیری", priceFrom: 350000, priceTo: 700000, duration: "۲۴ ساعت", icon: "✨" },
];

export interface BlogPost {
  slug: string; title: string; excerpt: string; cover: string;
  category: string; date: string; readTime: string;
}
export const blogPosts: BlogPost[] = [
  { slug: "ps5-pro-review", title: "بررسی کامل PlayStation 5 Pro؛ آیا ارزش خرید دارد؟", excerpt: "نگاهی دقیق به مشخصات، عملکرد و قیمت نسخه پرو پلی‌استیشن ۵...", cover: ps5, category: "بررسی", date: "۱۴۰۳/۰۹/۱۲", readTime: "۸ دقیقه" },
  { slug: "best-2024-games", title: "بهترین بازی‌های سال ۲۰۲۴ که نباید از دست بدهید", excerpt: "لیست منتخب ما از برترین عناوین سال؛ از اکشن تا ماجراجویی...", cover: game1, category: "راهنمای خرید", date: "۱۴۰۳/۰۹/۰۵", readTime: "۱۲ دقیقه" },
  { slug: "fix-controller-drift", title: "آموزش رفع مشکل دریفت آنالوگ دسته بازی", excerpt: "راهنمای گام‌به‌گام برای تشخیص و رفع دریفت دسته PS5 و Xbox...", cover: controller, category: "آموزش", date: "۱۴۰۳/۰۸/۲۸", readTime: "۶ دقیقه" },
];

export interface Faq { q: string; a: string; cat: string; }
export const faqs: Faq[] = [
  { cat: "سفارش", q: "چگونه می‌توانم سفارش خود را پیگیری کنم؟", a: "پس از ثبت سفارش، کد پیگیری به شماره شما پیامک می‌شود و می‌توانید از طریق صفحه «پیگیری سفارش» وضعیت را ببینید." },
  { cat: "پرداخت", q: "از چه روش‌های پرداختی پشتیبانی می‌کنید؟", a: "در حال حاضر تمام پرداخت‌ها از طریق درگاه امن زرین‌پال و کلیه کارت‌های شتاب انجام می‌شود." },
  { cat: "ضمانت", q: "ضمانت محصولات چقدر است؟", a: "تمامی کنسول‌های نو دارای ۱۲ تا ۱۸ ماه ضمانت رسمی و محصولات کارکرده دارای ۶ ماه ضمانت سلامت هستند." },
  { cat: "خدمات", q: "چه مدت زمان برای تعمیر کنسول لازم است؟", a: "اکثر تعمیرات بین ۱ تا ۳ روز کاری انجام می‌شود. در موارد خاص ممکن است زمان بیشتری نیاز باشد که از قبل اعلام می‌گردد." },
  { cat: "سفارش", q: "آیا امکان ارسال به سراسر ایران وجود دارد؟", a: "بله، با همکاری پست پیشتاز و تیپاکس به تمامی نقاط کشور ارسال انجام می‌شود." },
];
