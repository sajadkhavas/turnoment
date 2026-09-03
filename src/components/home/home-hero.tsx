import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, BadgeCheck, CalendarDays, Trophy } from "lucide-react";
import { TournamentFinder } from "./tournament-finder";
import { homeStats } from "@/lib/tournament-home-data";
import { formatNumber } from "@/lib/format";
import heroImg from "@/assets/tournament/hero-arena.jpg";

const stats = [
  { value: homeStats.centers, label: "گیم‌نت فعال" },
  { value: homeStats.tournaments, label: "مسابقه در جریان" },
  { value: homeStats.players, label: "بازیکن ثبت‌نام‌شده" },
];

const floatingCards = [
  { icon: BadgeCheck, title: "گیم‌نت تأییدشده", desc: "Arena Gaming Center", className: "end-4 top-8 md:end-8" },
  { icon: CalendarDays, title: "جمعه ۲۰:۳۰", desc: "فینال EA FC 26", className: "start-4 top-40 md:start-6" },
  { icon: Trophy, title: "جایزه ثابت", desc: "۵٬۰۰۰٬۰۰۰ تومان", className: "end-8 bottom-8" },
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <img src={heroImg} alt="" aria-hidden="true" className="h-full w-full object-cover" width={1024} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-l from-background/85 via-background/40 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/50 bg-secondary/10 px-3 py-1.5 text-xs font-bold text-secondary">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              رقابت واقعی، نزدیک تو
            </span>

            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              رقابت از همین‌جا <span className="text-gradient">شروع میشه</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-8 text-muted-foreground md:text-base">
              مسابقات حضوری بازی‌های محبوبت را در گیم‌نت‌های معتبر پیدا کن، آنلاین ثبت‌نام کن و برای صدر جدول بجنگ.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong"
              >
                مشاهده مسابقات
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-surface/70 px-6 text-sm font-bold backdrop-blur transition-colors hover:border-primary hover:text-primary"
              >
                ثبت گیم‌نت
              </Link>
            </div>

            <dl className="mt-9 grid max-w-lg grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="min-w-0">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-mono-num text-2xl font-black text-secondary md:text-3xl">{formatNumber(s.value)}</dd>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </dl>

            <div className="mt-9 max-w-2xl">
              <TournamentFinder />
            </div>
          </motion.div>

          <div className="relative hidden h-[460px] lg:block" aria-hidden="true">
            {floatingCards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                className={`absolute ${c.className} w-56 rounded-2xl border border-border bg-surface/80 p-4 backdrop-blur-xl`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold">{c.title}</div>
                    <div className="truncate text-xs text-muted-foreground">{c.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
