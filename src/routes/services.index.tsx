import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, ShieldCheck, Wrench } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { services } from "@/lib/mock-data";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "خدمات تعمیر و نصب — ایران مهر افزار" },
      { name: "description", content: "خدمات تخصصی نصب بازی، تعمیر کنسول PS5، PS4، Xbox و دسته بازی." },
      { property: "og:title", content: "خدمات گیمینگ" },
      { property: "og:description", content: "نصب بازی و تعمیر تخصصی کنسول" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-to-l from-primary/15 via-transparent to-secondary/10">
        <div className="container mx-auto px-4 py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold">
            <Wrench className="h-3 w-3" /> خدمات تخصصی
          </div>
          <h1 className="mt-4 text-3xl font-black md:text-5xl">تعمیر و نصب با تیم متخصص</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            از نصب بازی روی PS5 تا تعمیرات پیچیده برد کنسول؛ همه چیز را به متخصصان ما بسپارید. تشخیص رایگان و گارانتی روی تعمیرات.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.slug} className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/60 hover:glow-violet">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-elevated text-3xl">{s.icon}</div>
              <h3 className="mt-5 text-lg font-black">{s.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-muted-foreground">{s.description}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-muted-foreground">قیمت از</div>
                  <div className="mt-1 font-mono-num text-sm font-bold text-secondary">{formatPrice(s.priceFrom)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">زمان تخمینی</div>
                  <div className="mt-1 flex items-center gap-1 text-sm font-bold"><Clock className="h-3 w-3" /> {s.duration}</div>
                </div>
              </div>
              <Link to="/services/request" search={{ type: s.slug }} className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong">
                درخواست خدمات <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 rounded-3xl border border-border bg-card p-8 md:grid-cols-3 md:p-12">
          {[
            { icon: ShieldCheck, t: "گارانتی روی تعمیرات", d: "تا ۹۰ روز ضمانت پس از تحویل" },
            { icon: Clock, t: "تحویل سریع", d: "اکثر تعمیرات در ۱ تا ۳ روز" },
            { icon: Wrench, t: "تشخیص رایگان", d: "هزینه فقط در صورت تأیید شما" },
          ].map((x) => (
            <div key={x.t} className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary"><x.icon className="h-5 w-5" /></div>
              <div className="min-w-0">
                <div className="font-bold">{x.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{x.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
