import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تماس با ما — ایران مهر افزار" },
      { name: "description", content: "راه‌های ارتباطی با تیم پشتیبانی ایران مهر افزار." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-black md:text-4xl">تماس با ما</h1>
        <p className="mt-2 text-sm text-muted-foreground">پاسخگوی شما در همه روزهای هفته، ۹ صبح تا ۹ شب.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold">پیام به ما</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="نام" />
              <Input label="ایمیل یا تلفن" />
            </div>
            <Input label="موضوع" />
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-muted-foreground">پیام</span>
              <textarea rows={6} className="w-full rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
            </label>
            <button type="submit" className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:glow-violet-strong">ارسال پیام</button>
            {sent && <p className="text-sm text-success">✓ پیام شما با موفقیت ارسال شد.</p>}
          </form>

          <aside className="space-y-3 rounded-2xl border border-border bg-card p-6">
            <Item icon={Phone} title="تلفن" value="۰۲۱-۱۲۳۴ ۵۶۷۸" />
            <Item icon={Mail} title="ایمیل" value="info@iranmehrafzar.ir" />
            <Item icon={MapPin} title="آدرس" value="تهران، خیابان ولیعصر، پلاک ۱۲۳۴" />
            <Item icon={MessageCircle} title="واتساپ" value="۰۹۱۲ ۳۴۵ ۶۷۸۹" />
            <Item icon={Send} title="تلگرام" value="@iranmehrafzar" />
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}

function Input({ label }: { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-muted-foreground">{label}</span>
      <input className="w-full rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
    </label>
  );
}
function Item({ icon: Icon, title, value }: { icon: typeof Phone; title: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-elevated p-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary"><Icon className="h-4 w-4" /></div>
      <div className="min-w-0">
        <div className="text-[11px] text-muted-foreground">{title}</div>
        <div className="truncate text-sm font-bold">{value}</div>
      </div>
    </div>
  );
}
