import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CreditCard, MapPin, ShoppingBag } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { useCart } from "@/lib/cart-store";
import { formatNumber, formatPrice } from "@/lib/format";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "تسویه‌حساب — ایران مهر افزار" }, { name: "description", content: "ثبت سفارش و پرداخت امن از طریق درگاه زرین‌پال." }] }),
  component: CheckoutPage,
});

const steps = [
  { id: 1, label: "آدرس", icon: MapPin },
  { id: 2, label: "بازبینی", icon: ShoppingBag },
  { id: 3, label: "پرداخت", icon: CreditCard },
];

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", province: "تهران", city: "تهران", address: "", postal: "" });
  const shipping = subtotal > 30000000 ? 0 : 250000;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-black">سبد خرید شما خالی است</h1>
          <Link to="/products" className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">مشاهده محصولات</Link>
        </div>
      </SiteLayout>
    );
  }

  function pay() {
    // Stubbed: simulate Zarinpal redirect+verify
    clear();
    navigate({ to: "/payment/result", search: { status: "success", ref: "IMA-1403-" + Math.floor(Math.random() * 99999).toString().padStart(5, "0") } });
  }

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-black md:text-3xl">تسویه‌حساب</h1>

        {/* Stepper */}
        <div className="mb-8 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card p-3">
          {steps.map((s) => {
            const active = step === s.id;
            const done = step > s.id;
            return (
              <div key={s.id} className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition-colors ${active ? "bg-primary/15 text-primary" : done ? "text-success" : "text-muted-foreground"}`}>
                <div className={`grid h-7 w-7 place-items-center rounded-full font-mono-num text-xs ${active ? "bg-primary text-primary-foreground" : done ? "bg-success/20 text-success" : "bg-elevated"}`}>
                  {done ? <Check className="h-4 w-4" /> : formatNumber(s.id)}
                </div>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-border bg-card p-6">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold">آدرس تحویل</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="نام و نام خانوادگی" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label="شماره موبایل" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="09xxxxxxxxx" />
                  <Field label="استان" value={form.province} onChange={(v) => setForm({ ...form, province: v })} />
                  <Field label="شهر" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
                  <div className="sm:col-span-2"><Field label="آدرس پستی" value={form.address} onChange={(v) => setForm({ ...form, address: v })} /></div>
                  <Field label="کد پستی" value={form.postal} onChange={(v) => setForm({ ...form, postal: v })} placeholder="۱۰ رقمی" />
                </div>
                <div className="flex justify-end pt-2">
                  <button onClick={() => setStep(2)} disabled={!form.name || !form.phone || !form.address} className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:glow-violet-strong disabled:opacity-50">
                    ادامه
                  </button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold">بازبینی سفارش</h2>
                <div className="space-y-2">
                  {items.map((it) => (
                    <div key={it.id} className="grid grid-cols-[60px_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-elevated p-3">
                      <img src={it.image} alt={it.name} className="aspect-square rounded-lg object-cover" />
                      <div className="min-w-0">
                        <div className="line-clamp-1 text-sm font-bold">{it.name}</div>
                        <div className="mt-1 font-mono-num text-xs text-muted-foreground">{formatNumber(it.quantity)} × {formatPrice(it.price)}</div>
                      </div>
                      <div className="font-mono-num text-sm font-bold text-secondary">{formatPrice(it.price * it.quantity)}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-border bg-elevated p-4 text-sm">
                  <div className="font-bold">ارسال به:</div>
                  <div className="mt-1 text-muted-foreground">{form.name} — {form.phone}</div>
                  <div className="text-muted-foreground">{form.province}، {form.city}، {form.address}</div>
                </div>
                <div className="flex justify-between pt-2">
                  <button onClick={() => setStep(1)} className="rounded-xl border border-border bg-surface px-6 py-3 text-sm font-bold">بازگشت</button>
                  <button onClick={() => setStep(3)} className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:glow-violet-strong">ادامه به پرداخت</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4 text-center">
                <h2 className="text-lg font-bold">پرداخت</h2>
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-primary/15 text-primary">
                  <CreditCard className="h-10 w-10" />
                </div>
                <p className="text-sm text-muted-foreground">با کلیک روی دکمه زیر، به درگاه امن زرین‌پال منتقل می‌شوید.</p>
                <p className="font-mono-num text-2xl font-black text-secondary">{formatPrice(total)}</p>
                <button onClick={pay} className="w-full rounded-xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground hover:glow-violet-strong">
                  پرداخت با زرین‌پال
                </button>
                <p className="text-[11px] text-muted-foreground">پرداخت شبیه‌سازی شده — آماده اتصال به درگاه واقعی</p>
              </div>
            )}
          </div>

          <aside className="rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24 lg:self-start">
            <h2 className="mb-4 text-sm font-black">خلاصه</h2>
            <div className="space-y-1.5 text-sm">
              <Row label={`${formatNumber(items.length)} کالا`} value={formatPrice(subtotal)} />
              <Row label="ارسال" value={shipping === 0 ? "رایگان" : formatPrice(shipping)} />
            </div>
            <div className="my-4 border-t border-border" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">جمع کل</span>
              <span className="font-mono-num text-lg font-black text-secondary">{formatPrice(total)}</span>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
    </label>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span className="font-mono-num font-bold">{value}</span></div>;
}
