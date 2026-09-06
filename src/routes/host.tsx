import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, CalendarClock, Users } from "lucide-react";
import { TournamentLayout } from "@/components/tournament/tournament-layout";

const TITLE = "ثبت گیم‌نت و میزبانی مسابقات | ایران مهر افزار";
const DESCRIPTION = "گیم‌نت خود را ثبت کنید، تأییدیه بگیرید و میزبان مسابقات حضوری با ثبت‌نام آنلاین بازیکنان شوید.";

export const Route = createFileRoute("/host")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/host" }],
  }),
  component: HostPage,
});

const perks = [
  { icon: BadgeCheck, title: "نشان تأییدشده", desc: "پس از بررسی مدارک و تجهیزات، نشان تأیید روی صفحه مرکز شما نمایش داده می‌شود." },
  { icon: Users, title: "بازیکن آماده", desc: "مسابقه شما به بازیکنان شهر خودتان پیشنهاد می‌شود و ثبت‌نام آنلاین انجام می‌گیرد." },
  { icon: CalendarClock, title: "مدیریت برنامه", desc: "تاریخ، ظرفیت و فرمت مسابقات را خودتان تعیین می‌کنید." },
];

function HostPage() {
  const [sent, setSent] = useState(false);

  return (
    <TournamentLayout>
      <section className="border-b border-border bg-gradient-to-l from-secondary/15 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-black md:text-4xl">ثبت گیم‌نت</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{DESCRIPTION}</p>
        </div>
      </section>

      <div className="container mx-auto grid gap-6 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {perks.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary"><p.icon className="h-5 w-5" /></span>
              <h2 className="mt-3 text-sm font-bold">{p.title}</h2>
              <p className="mt-1.5 text-xs leading-6 text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-black">فرم درخواست میزبانی</h2>
          {sent ? (
            <div className="mt-5 rounded-xl border border-success/40 bg-success/10 p-5 text-center text-sm text-success">
              درخواست شما ثبت شد. کارشناسان ما برای بررسی و تأیید تماس می‌گیرند.
            </div>
          ) : (
            <form
              className="mt-5 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <Field label="نام گیم‌نت" type="text" />
              <Field label="نام مدیر" type="text" />
              <Field label="شماره تماس" type="tel" />
              <Field label="شهر و منطقه" type="text" />
              <label className="block">
                <span className="mb-1.5 block text-xs text-muted-foreground">تجهیزات و ظرفیت</span>
                <textarea rows={4} className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-primary" />
              </label>
              <button type="submit" className="h-12 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong">
                ارسال درخواست
              </button>
            </form>
          )}
        </div>
      </div>
    </TournamentLayout>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      <input required type={type} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
    </label>
  );
}
