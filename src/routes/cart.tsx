import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site/site-layout";
import { useCart } from "@/lib/cart-store";
import { formatNumber, formatPrice } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "سبد خرید — ایران مهر افزار" }, { name: "description", content: "بازبینی سبد خرید و ادامه فرآیند پرداخت." }] }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, setQty, remove, clear } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const shipping = subtotal > 0 ? (subtotal > 30000000 ? 0 : 250000) : 0;
  const total = subtotal - discount + shipping;

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === "WELCOME10") setDiscount(Math.round(subtotal * 0.1));
    else setDiscount(0);
  }

  if (items.length === 0) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto grid max-w-md place-items-center rounded-3xl border border-border bg-card p-10 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-elevated text-primary"><ShoppingBag className="h-10 w-10" /></div>
            <h1 className="mt-6 text-xl font-black">سبد خرید شما خالی است</h1>
            <p className="mt-2 text-sm text-muted-foreground">برای شروع، محصولی به سبد اضافه کنید.</p>
            <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">
              مشاهده محصولات <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <h1 className="text-2xl font-black md:text-3xl">سبد خرید</h1>
          <button onClick={clear} className="text-xs text-muted-foreground hover:text-destructive">حذف همه</button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Items */}
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.id} className="grid grid-cols-[80px_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-border bg-card p-3 sm:grid-cols-[100px_minmax(0,1fr)_auto] sm:p-4">
                <Link to="/products/$slug" params={{ slug: it.slug }} className="block aspect-square overflow-hidden rounded-xl bg-elevated">
                  <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                </Link>
                <div className="min-w-0">
                  <Link to="/products/$slug" params={{ slug: it.slug }} className="line-clamp-2 text-sm font-bold hover:text-primary">{it.name}</Link>
                  <div className="mt-2 font-mono-num text-sm font-bold text-secondary">{formatPrice(it.price)}</div>
                  <div className="mt-3 flex items-center justify-between gap-2 sm:hidden">
                    <QtyCtl qty={it.quantity} onMinus={() => setQty(it.id, it.quantity - 1)} onPlus={() => setQty(it.id, it.quantity + 1)} />
                    <button onClick={() => remove(it.id)} className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="hidden items-center gap-3 sm:flex">
                  <QtyCtl qty={it.quantity} onMinus={() => setQty(it.id, it.quantity - 1)} onPlus={() => setQty(it.id, it.quantity + 1)} />
                  <button onClick={() => remove(it.id)} className="grid h-10 w-10 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="mb-4 text-sm font-black">کد تخفیف</h2>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="WELCOME10" className="w-full rounded-lg border border-border bg-elevated px-4 py-2.5 pe-10 text-sm focus:border-primary focus:outline-none" />
                </div>
                <button onClick={applyCoupon} className="rounded-lg border border-primary/40 bg-primary/10 px-4 text-sm font-bold text-primary hover:bg-primary/20">اعمال</button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="mb-4 text-sm font-black">خلاصه سفارش</h2>
              <SummaryRow label={`${formatNumber(items.length)} کالا`} value={formatPrice(subtotal)} />
              {discount > 0 && <SummaryRow label="تخفیف" value={`- ${formatPrice(discount)}`} accent="text-success" />}
              <SummaryRow label="هزینه ارسال" value={shipping === 0 ? "رایگان" : formatPrice(shipping)} accent={shipping === 0 ? "text-success" : undefined} />
              <div className="my-4 border-t border-border" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">مبلغ قابل پرداخت</span>
                <span className="font-mono-num text-xl font-black text-secondary">{formatPrice(total)}</span>
              </div>
              <Link to="/checkout" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong">
                ادامه و پرداخت <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function QtyCtl({ qty, onMinus, onPlus }: { qty: number; onMinus: () => void; onPlus: () => void }) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
      <button onClick={onMinus} className="grid h-8 w-8 place-items-center rounded-md hover:bg-surface"><Minus className="h-3.5 w-3.5" /></button>
      <div className="grid w-8 place-items-center font-mono-num text-sm font-bold">{formatNumber(qty)}</div>
      <button onClick={onPlus} className="grid h-8 w-8 place-items-center rounded-md hover:bg-surface"><Plus className="h-3.5 w-3.5" /></button>
    </div>
  );
}

function SummaryRow({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-mono-num font-bold ${accent ?? ""}`}>{value}</span>
    </div>
  );
}
