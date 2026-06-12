import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { services } from "@/lib/mock-data";
import { formatNumber } from "@/lib/format";

const search = z.object({ type: z.string().optional() });

export const Route = createFileRoute("/services/request")({
  validateSearch: search.parse,
  head: () => ({ meta: [{ title: "درخواست خدمات — ایران مهر افزار" }, { name: "description", content: "ثبت درخواست تعمیر یا نصب با انتخاب زمان مناسب." }] }),
  component: ServiceRequest,
});

const timeSlots = ["۱۰:۰۰ - ۱۱:۰۰", "۱۱:۰۰ - ۱۲:۰۰", "۱۲:۰۰ - ۱۳:۰۰", "۱۵:۰۰ - ۱۶:۰۰", "۱۶:۰۰ - ۱۷:۰۰", "۱۷:۰۰ - ۱۸:۰۰"];

function ServiceRequest() {
  const { type } = Route.useSearch();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    serviceType: type ?? services[0].slug,
    device: "PS5",
    model: "",
    problem: "",
    name: "",
    phone: "",
    date: "",
    slot: timeSlots[0],
  });

  if (done) {
    return (
      <SiteLayout>
        <div className="container mx-auto grid place-items-center px-4 py-20">
          <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/15 text-success"><CheckCircle2 className="h-12 w-12" /></div>
            <h1 className="mt-5 text-2xl font-black">درخواست شما ثبت شد</h1>
            <p className="mt-2 text-sm text-muted-foreground">کارشناسان ما به‌زودی با شما تماس می‌گیرند.</p>
            <div className="mt-5 rounded-xl border border-border bg-elevated p-4">
              <div className="text-xs text-muted-foreground">شماره پیگیری</div>
              <div className="mt-1 font-mono-num text-lg font-black text-secondary" dir="ltr">SRV-1403-{formatNumber(Math.floor(Math.random() * 99999)).padStart(5, "0")}</div>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-black md:text-3xl">درخواست خدمات</h1>
        <p className="mt-2 text-sm text-muted-foreground">فرم زیر را تکمیل کنید تا با شما تماس بگیریم.</p>

        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <Sel label="نوع خدمات" value={form.serviceType} onChange={(v) => setForm({ ...form, serviceType: v })}>
              {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            </Sel>
            <div className="grid gap-4 sm:grid-cols-2">
              <Sel label="نوع دستگاه" value={form.device} onChange={(v) => setForm({ ...form, device: v })}>
                {["PS5", "PS4", "Xbox Series X/S", "Xbox One", "Nintendo Switch", "PC"].map((x) => <option key={x}>{x}</option>)}
              </Sel>
              <Inp label="مدل / نسخه دستگاه" value={form.model} onChange={(v) => setForm({ ...form, model: v })} placeholder="مثلاً Digital Edition" />
            </div>
            <Area label="توضیح مشکل / درخواست" value={form.problem} onChange={(v) => setForm({ ...form, problem: v })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Inp label="نام و نام خانوادگی" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Inp label="شماره موبایل" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="09xxxxxxxxx" required />
              <Inp label="تاریخ مراجعه" value={form.date} onChange={(v) => setForm({ ...form, date: v })} placeholder="۱۴۰۳/۰۹/۲۰" />
              <Sel label="ساعت مراجعه" value={form.slot} onChange={(v) => setForm({ ...form, slot: v })}>
                {timeSlots.map((t) => <option key={t}>{t}</option>)}
              </Sel>
            </div>
            <button type="submit" className="w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong">
              ثبت درخواست
            </button>
          </div>

          <aside className="space-y-4 rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
            <h3 className="text-sm font-black">راهنمای درخواست</h3>
            <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
              <li>• تشخیص اولیه و قیمت دقیق پس از بازدید اعلام می‌شود.</li>
              <li>• هزینه فقط در صورت تأیید شما اخذ می‌شود.</li>
              <li>• گارانتی تا ۹۰ روز روی تعمیرات.</li>
              <li>• امکان ارسال دستگاه با پیک هم وجود دارد.</li>
            </ul>
          </aside>
        </form>
      </div>
    </SiteLayout>
  );
}

function Inp({ label, value, onChange, placeholder, required }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-muted-foreground">{label}{required && <span className="text-destructive"> *</span>}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} className="w-full rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
    </label>
  );
}
function Sel({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm focus:border-primary focus:outline-none">{children}</select>
    </label>
  );
}
function Area({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-muted-foreground">{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className="w-full rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
    </label>
  );
}
