import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  Gamepad2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useState } from "react";

const cols = [
  {
    title: "رقابت",
    icon: Trophy,
    links: [
      { to: "/tournaments", label: "همه مسابقات" },
      { to: "/games", label: "بازی‌ها" },
      { to: "/ranking", label: "رتبه‌بندی بازیکنان" },
      { to: "/rules", label: "قوانین مسابقات" },
    ],
  },
  {
    title: "مراکز و میزبانی",
    icon: MapPin,
    links: [
      { to: "/centers", label: "همه گیم‌نت‌ها" },
      { to: "/host", label: "مسیر میزبانی" },
      { to: "/host", label: "ثبت مرکز میزبان" },
      { to: "/rules", label: "شرایط و قوانین" },
    ],
  },
  {
    title: "حساب بازیکن",
    icon: Gamepad2,
    links: [
      { to: "/login", label: "ورود بازیکن" },
      { to: "/register", label: "ساخت حساب" },
      { to: "/dashboard", label: "داشبورد" },
      { to: "/dashboard/matches", label: "مسابقه‌های من" },
    ],
  },
] as const;

export function TournamentFooter() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection((current) => (current === title ? null : title));
  };

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/10 bg-background">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-primary/10 blur-[110px]" />
        <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-secondary/10 blur-[110px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 py-10 sm:py-12 lg:py-16">
        {/* Main footer */}
        <div className="grid gap-8 lg:grid-cols-[1.25fr_2fr] lg:gap-14">
          {/* Brand */}
          <div>
            <Link
              to="/"
              aria-label="Turnoment — خانه"
              className="inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <img
                src="/brand/turnoment-logo.png"
                alt="Turnoment"
                className="h-12 w-auto object-contain sm:h-14"
              />
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              مسیر پیدا کردن مسابقات حضوری گیمینگ، بررسی مراکز میزبان،
              دنبال کردن رقابت‌ها و ساخت مسیر حرفه‌ای بازیکنان.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-muted-foreground">
                <Trophy className="h-3.5 w-3.5 text-primary" />
                مسابقات حضوری
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                مراکز میزبان
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                رقابت ساختاریافته
              </div>
            </div>
          </div>

          {/* Desktop columns */}
          <div className="hidden grid-cols-3 gap-8 md:grid">
            {cols.map((column) => {
              const Icon = column.icon;

              return (
                <div key={column.title}>
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg border border-primary/15 bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>

                    <h2 className="text-sm font-black text-foreground">
                      {column.title}
                    </h2>
                  </div>

                  <ul className="space-y-1.5">
                    {column.links.map((link) => (
                      <li key={`${column.title}-${link.label}`}>
                        <Link
                          to={link.to}
                          className="group inline-flex min-h-9 items-center text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <span className="transition-transform duration-200 group-hover:-translate-x-1">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Mobile accordion */}
          <div className="space-y-2 md:hidden">
            {cols.map((column, index) => {
              const Icon = column.icon;
              const isOpen = openSection === column.title;
              const panelId = `footer-section-${index}`;

              return (
                <div
                  key={column.title}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleSection(column.title)}
                    className="flex min-h-14 w-full items-center gap-3 px-4 text-right transition-colors hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-primary/15 bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>

                    <span className="flex-1 text-sm font-bold text-foreground">
                      {column.title}
                    </span>

                    <ChevronDown
                      aria-hidden="true"
                      className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""
                        }`}
                    />
                  </button>

                  <div
                    id={panelId}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="space-y-1 border-t border-white/5 px-4 py-3">
                        {column.links.map((link) => (
                          <li key={`${column.title}-${link.label}`}>
                            <Link
                              to={link.to}
                              className="flex min-h-11 items-center rounded-xl px-3 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="relative border-t border-white/10 bg-black/20">
        <div className="container mx-auto flex flex-col gap-5 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center text-xs leading-6 text-muted-foreground sm:text-right">
            © ۲۰۲۶ Turnoment — تمامی حقوق محفوظ است.
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link
                to="/rules"
                className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                قوانین مسابقات
              </Link>

              <Link
                to="/host"
                className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                میزبانی مسابقه
              </Link>
            </div>

            <div
              className="hidden h-4 w-px bg-white/10 sm:block"
              aria-hidden="true"
            />

            <div className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sparkles
                className="h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover:rotate-12"
                aria-hidden="true"
              />

              <span>طراحی شده توسط مجموعه</span>

              <span className="font-bold tracking-wide text-foreground transition-colors group-hover:text-primary">
                Shinethree
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}