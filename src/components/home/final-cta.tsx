import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function FinalCta() {
  return (
    <section className="container mx-auto px-4 pb-16 pt-4">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card px-6 py-12 text-center md:px-10 md:py-16">
        <div className="pointer-events-none absolute -bottom-24 start-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl" />
        <h2 className="relative text-2xl font-black md:text-3xl">آماده‌ای وارد رقابت بشی؟</h2>
        <p className="relative mt-3 text-sm leading-7 text-muted-foreground">
          مسابقه بعدیت فقط چند کلیک باهات فاصله داره.
        </p>
        <div className="relative mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/tournaments"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong"
          >
            مشاهده مسابقات <ArrowLeft className="h-4 w-4" />
          </Link>
          <Link
            to="/host"
            className="inline-flex h-12 items-center rounded-xl border border-border bg-surface px-6 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
          >
            ثبت گیم‌نت
          </Link>
        </div>
      </div>
    </section>
  );
}
