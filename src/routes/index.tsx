import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Zap, Wrench, Gamepad2, ChevronLeft, Star } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import CountUp from "react-countup";
import Typewriter from "typewriter-effect";
import { SiteLayout } from "@/components/site/site-layout";
import { ProductCard } from "@/components/site/product-card";
import { ParticlesBackground } from "@/components/site/particles-bg";
import { GlitchText } from "@/components/site/glitch-text";
import { TiltCard } from "@/components/site/tilt-card";
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } }),
};

const BRANDS = ["PlayStation", "Xbox", "Nintendo", "Razer", "Logitech", "SteelSeries", "HyperX", "Sony"];

function HomePage() {
  const featured = products.filter((p) => p.featured);
  const onSale = products.filter((p) => p.salePrice);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-l from-background/70 via-background/15 to-transparent" />
        </div>
        <ParticlesBackground />
        <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-60" />
        <div className="rgb-strip pointer-events-none absolute inset-x-0 top-0 h-[2px]" />

        <div className="relative container mx-auto px-4 py-20 md:py-28 lg:py-36">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-2xl">
            <motion.div variants={fadeUp} custom={0} className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/50 bg-secondary/10 px-3 py-1.5 text-xs pulse-glow-anim">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              <span className="font-bold">پلی‌استیشن ۵ پرو موجود شد</span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="text-4xl font-black leading-tight md:text-6xl lg:text-7xl">
              دنیای{" "}
              <GlitchText className="text-gradient neon-flicker-anim">گیمینگ</GlitchText>{" "}
              در <br className="hidden sm:block" />
              دستان شما
            </motion.h1>

            <motion.div variants={fadeUp} custom={2} className="mt-5 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              <Typewriter
                options={{
                  strings: [
                    "کنسول، بازی و لوازم جانبی اورجینال",
                    "تعمیر تخصصی PS5، PS4 و Xbox",
                    "نصب بازی با گارانتی و پشتیبانی",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 45,
                  deleteSpeed: 25,
                }}
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong">
                <span className="relative z-10">مشاهده محصولات</span>
                <ArrowLeft className="relative z-10 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-6 py-3.5 text-sm font-bold backdrop-blur transition-colors hover:border-primary hover:text-primary">
                خدمات تعمیر
                <Wrench className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                { n: 10, suf: "+", l: "سال تجربه" },
                { n: 50000, suf: "+", l: "مشتری راضی" },
                { n: 98, suf: "٪", l: "رضایت" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-mono-num text-2xl font-black text-secondary md:text-3xl">
                    <CountUp end={s.n} duration={2.4} separator="," enableScrollSpy scrollSpyOnce />
                    {s.suf}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BRANDS MARQUEE */}
      <section className="relative overflow-hidden border-b border-border bg-surface/40 py-6">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
          {[...BRANDS, ...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="font-mono-num text-xl font-bold text-muted-foreground/60 transition-colors hover:text-primary md:text-2xl">
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="دسته‌بندی محصولات" subtitle="سریع به آنچه دنبالش هستید برسید" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c, i) => (
            <motion.div
              key={c.slug}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i}
            >
              <Link
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-primary/60 hover:glow-violet"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-elevated text-3xl transition-all duration-500 group-hover:bg-primary/20 group-hover:[transform:rotateY(360deg)]">
                  {c.icon}
                </div>
                <div>
                  <div className="text-sm font-bold">{c.name}</div>
                  <div className="mt-1 font-mono-num text-[11px] text-muted-foreground">{formatNumber(c.count)} محصول</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container mx-auto px-4 py-8">
        <SectionHeader title="پیشنهاد ویژه" subtitle="منتخب تیم ایران مهر افزار" link="/products" linkLabel="همه محصولات" icon={<Zap className="h-5 w-5" />} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.slice(0, 4).map((p, i) => (
            <motion.div key={p.id} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={i}>
              <ProductCard p={p} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES with 3D tilt */}
      <section className="container mx-auto mt-16 px-4">
        <SectionHeader title="خدمات تخصصی" subtitle="نصب و تعمیر با گارانتی" link="/services" linkLabel="همه خدمات" icon={<Wrench className="h-5 w-5" />} />
        <div className="grid gap-5 md:grid-cols-3" style={{ perspective: "1000px" }}>
          {services.slice(0, 3).map((s, i) => (
            <motion.div key={s.slug} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={i}>
              <TiltCard className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/60">
                <div className="rgb-strip absolute inset-x-0 top-0 h-[2px]" />
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-elevated text-3xl float-anim">{s.icon}</div>
                <h3 className="mt-4 text-lg font-black">{s.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <div className="font-mono-num text-base font-bold text-secondary">از {formatPrice(s.priceFrom)}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">زمان: {s.duration}</div>
                  </div>
                  <Link to="/services/request" className="inline-flex items-center gap-1 rounded-lg bg-primary/15 px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                    درخواست <ArrowLeft className="h-3 w-3" />
                  </Link>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ON SALE */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="تخفیف‌های داغ" subtitle="فرصت‌های محدود — از دست ندهید" link="/products" linkLabel="همه تخفیف‌ها" icon={<Star className="h-5 w-5 text-warning" />} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {onSale.map((p, i) => (
            <motion.div key={p.id} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={i}>
              <ProductCard p={p} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="از وبلاگ ما" subtitle="آخرین اخبار، نقد و آموزش‌ها" link="/blog" linkLabel="همه مقالات" icon={<Gamepad2 className="h-5 w-5" />} />
        <div className="grid gap-5 md:grid-cols-3">
          {blogPosts.map((b, i) => (
            <motion.div key={b.slug} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={i}>
              <Link to="/blog/$slug" params={{ slug: b.slug }} className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/60 hover:glow-violet">
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
            </motion.div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function SectionHeader({ title, subtitle, link, linkLabel, icon }: { title: string; subtitle?: string; link?: string; linkLabel?: string; icon?: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
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
    </motion.div>
  );
}
