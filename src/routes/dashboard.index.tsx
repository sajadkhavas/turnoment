import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, Wrench, Heart, TrendingUp } from "lucide-react";
import { formatNumber, formatPrice } from "@/lib/format";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const stats = [
    { icon: ShoppingBag, n: 4, l: "سفارش فعال", color: "text-secondary" },
    { icon: Wrench, n: 1, l: "درخواست خدمات", color: "text-warning" },
    { icon: Heart, n: 8, l: "علاقه‌مندی", color: "text-destructive" },
    { icon: TrendingUp, n: 12, l: "خرید کل", color: "text-success" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">خوش آمدید، علی</h1>
        <p className="mt-1 text-sm text-muted-foreground">آخرین وضعیت سفارش‌ها و درخواست‌های شما</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-4">
            <s.icon className={`h-5 w-5 ${s.color}`} />
            <div className="mt-3 font-mono-num text-2xl font-black">{formatNumber(s.n)}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-black">آخرین سفارش‌ها</h2>
          <Link to="/dashboard/orders" className="text-xs text-primary hover:underline">همه</Link>
        </div>
        <div className="space-y-2">
          {[
            { ref: "IMA-1403-00321", date: "۱۴۰۳/۰۹/۱۸", total: 48500000, status: "در حال پردازش", color: "bg-secondary/20 text-secondary" },
            { ref: "IMA-1403-00298", date: "۱۴۰۳/۰۹/۱۲", total: 4490000, status: "تحویل شد", color: "bg-success/20 text-success" },
            { ref: "IMA-1403-00271", date: "۱۴۰۳/۰۹/۰۳", total: 21500000, status: "ارسال شد", color: "bg-primary/20 text-primary" },
          ].map((o) => (
            <div key={o.ref} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-elevated p-4">
              <div className="min-w-0">
                <div className="font-mono-num text-sm font-bold" dir="ltr">{o.ref}</div>
                <div className="mt-1 font-mono-num text-[11px] text-muted-foreground">{o.date}</div>
              </div>
              <div className="text-end">
                <div className="font-mono-num text-sm font-bold text-secondary">{formatPrice(o.total)}</div>
                <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${o.color}`}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
