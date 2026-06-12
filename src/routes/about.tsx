import { createFileRoute } from "@tanstack/react-router";
import { Award, Users, Trophy, Zap } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "درباره ما — ایران مهر افزار" },
      { name: "description", content: "داستان ایران مهر افزار، فروشگاه تخصصی گیمینگ با بیش از ۱۰ سال تجربه." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-to-l from-primary/15 to-transparent">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-black md:text-5xl">درباره ایران مهر افزار</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            ما از سال ۱۳۹۲ با هدف ارائه بهترین تجربه گیمینگ به گیمرهای ایرانی فعالیت می‌کنیم. از فروش کنسول‌های نسل جدید تا تعمیرات تخصصی، همراه شما هستیم.
          </p>
        </div>
      </section>

      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-xl font-black">داستان ما</h2>
          <p className="text-sm leading-8 text-muted-foreground">
            ایران مهر افزار با تیمی متشکل از علاقه‌مندان واقعی به دنیای گیم متولد شد. ما باور داریم که هر گیمر حق دارد بهترین تجربه را داشته باشد؛ از انتخاب کنسول گرفته تا پشتیبانی پس از فروش.
          </p>
          <p className="text-sm leading-8 text-muted-foreground">
            امروز با شعبه‌های فعال در تهران و ارسال به سراسر ایران، در خدمت بیش از ۵۰ هزار مشتری وفادار هستیم.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Trophy, n: "+۱۰", l: "سال تجربه" },
            { icon: Users, n: "+۵۰هزار", l: "مشتری راضی" },
            { icon: Award, n: "+۲۰۰", l: "تعمیر در ماه" },
            { icon: Zap, n: "۹۸٪", l: "رضایت‌مندی" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-6 text-center">
              <s.icon className="mx-auto h-8 w-8 text-primary" />
              <div className="mt-3 font-mono-num text-2xl font-black text-secondary">{s.n}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
