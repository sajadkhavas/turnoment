import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Zap, Wrench, Gamepad2, ChevronLeft, Star } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { ProductCard } from "@/components/site/product-card";
import { products, categories, services, blogPosts } from "@/lib/mock-data";
import { formatNumber, formatPrice } from "@/lib/format";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ایران مهر افزار — کنسول، بازی و خدمات گیمینگ" },
      { name: "description", content: "خرید کنسول PS5، Xbox، Nintendo، دسته بازی و خدمات تعمیر و نصب در ایران مهر افزار." },
      { property: "og:title", content: "ایران مهر افزار — فروشگاه گیمینگ" },
      { property: "og:description", content: "کنسول، بازی و خدمات تعمیر و نصب" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = products.filter((p) => p.featured);
  const onSale = products.filter((p) => p.salePrice);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" width={1920} height={1080} className="h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-l from-background/80 via-transparent to-background/20" />
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-28 lg:py-36">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span><span className="relative inline-flex h-2 w-2 rounded-full bg-secondary"></span></span>
              <span className="font-bold">پلی‌استیشن ۵ پرو موجود شد</span>
            </div>
            <h1 className="text-4xl font-black leading-tight md:text-6xl lg:text-7xl">
              دنیای <span className="text-gradient">گیمینگ</span> در <br className="hidden sm:block" />
              دستان شما
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              فروشگاه تخصصی کنسول‌های PS5، Xbox، Nintendo و خدمات حرفه‌ای تعمیر و نصب با بیش از ۱۰ سال تجربه.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong">
                مشاهده محصولات
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-6 py-3.5 text-sm font-bold backdrop-blur transition-colors hover:border-primary hover:text-primary">
                خدمات تعمیر
                <Wrench className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                { n: "۱۰+", l: "سال تجربه" },
                { n: "۵۰هزار+", l: "مشتری راضی" },
                { n: "۹۸٪", l: "رضایت" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-mono-num text-2xl font-black text-secondary md:text-3xl">{s.n}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="دسته‌بندی محصولات" subtitle="سریع به آنچه دنبالش هستید برسید" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-primary/60 hover:glow-violet"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-elevated text-3xl transition-all group-hover:bg-primary/20">{c.icon}</div>
              <div>
                <div className="text-sm font-bold">{c.name}</div>
                <div className="mt-1 font-mono-num text-[11px] text-muted-foreground">{formatNumber(c.count)} محصول</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container mx-auto px-4 py-8">
        <SectionHeader title="پیشنهاد ویژه" subtitle="منتخب تیم ایران مهر افزار" link="/products" linkLabel="همه محصولات" icon={<Zap className="h-5 w-5" />} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="container mx-auto mt-16 px-4">
        <div className="overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-l from-primary/20 via-surface to-secondary/20 p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-[11px] font-bold text-secondary">
                <Wrench className="h-3 w-3" /> خدمات تخصصی
              </div>
              <h2 className="mt-4 text-2xl font-black md:text-4xl">تعمیر و نصب با ضمانت توسط تیم متخصص</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                از نصب بازی تا تعمیرات پیچیده برد؛ همه چیز را به متخصصان ما بسپارید. تشخیص رایگان، گارانتی روی تعمیرات.
              </p>
            </div>
            <Link to="/services" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong">
              درخواست خدمات <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {services.slice(0, 3).map((s) => (
              <div key={s.slug} className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-elevated text-2xl">{s.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold">{s.name}</div>
                    <div className="mt-1 font-mono-num text-xs text-secondary">از {formatPrice(s.priceFrom)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ON SALE */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="تخفیف‌های داغ" subtitle="فرصت‌های محدود — از دست ندهید" link="/products" linkLabel="همه تخفیف‌ها" icon={<Star className="h-5 w-5 text-warning" />} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {onSale.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* BLOG */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="از وبلاگ ما" subtitle="آخرین اخبار، نقد و آموزش‌ها" link="/blog" linkLabel="همه مقالات" icon={<Gamepad2 className="h-5 w-5" />} />
        <div className="grid gap-5 md:grid-cols-3">
          {blogPosts.map((b) => (
            <Link key={b.slug} to="/blog/$slug" params={{ slug: b.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/60 hover:glow-violet">
              <div className="relative aspect-[16/10] overflow-hidden bg-elevated">
                <img src={b.cover} alt={b.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute start-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-bold backdrop-blur">{b.category}</span>
              </div>
              <div className="p-5">
                <h3 className="line-clamp-2 text-base font-bold leading-7 transition-colors group-hover:text-primary">{b.title}</h3>
                <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted-foreground">{b.excerpt}</p>
                <div className="mt-4 flex items-center justify-between font-mono-num text-[11px] text-muted-foreground">
                  <span>{b.date}</span>
                  <span>{b.readTime} مطالعه</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function SectionHeader({ title, subtitle, link, linkLabel, icon }: { title: string; subtitle?: string; link?: string; linkLabel?: string; icon?: React.ReactNode }) {
  return (
    <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          <h2 className="truncate text-2xl font-black md:text-3xl">{title}</h2>
        </div>
        {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link} className="inline-flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/10">
          {linkLabel} <ChevronLeft className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
