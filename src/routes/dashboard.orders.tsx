import { createFileRoute } from "@tanstack/react-router";
import { formatNumber, formatPrice } from "@/lib/format";

export const Route = createFileRoute("/dashboard/orders")({
  component: Orders,
});

const orders = [
  { ref: "IMA-1403-00321", date: "۱۴۰۳/۰۹/۱۸", total: 48500000, items: 1, status: "در حال پردازش", color: "bg-secondary/20 text-secondary" },
  { ref: "IMA-1403-00298", date: "۱۴۰۳/۰۹/۱۲", total: 4490000, items: 1, status: "تحویل شد", color: "bg-success/20 text-success" },
  { ref: "IMA-1403-00271", date: "۱۴۰۳/۰۹/۰۳", total: 21500000, items: 2, status: "ارسال شد", color: "bg-primary/20 text-primary" },
  { ref: "IMA-1403-00248", date: "۱۴۰۳/۰۸/۲۵", total: 8500000, items: 1, status: "لغو شد", color: "bg-destructive/20 text-destructive" },
];

function Orders() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black">سفارش‌های من</h1>
      <div className="rounded-2xl border border-border bg-card">
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-border px-5 py-3 text-xs font-bold text-muted-foreground md:grid-cols-[1fr_120px_140px_120px]">
          <div>شماره / تاریخ</div>
          <div className="hidden md:block">تعداد</div>
          <div>مبلغ</div>
          <div>وضعیت</div>
        </div>
        {orders.map((o) => (
          <div key={o.ref} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-border px-5 py-4 last:border-b-0 md:grid-cols-[1fr_120px_140px_120px]">
            <div className="min-w-0">
              <div className="font-mono-num text-sm font-bold" dir="ltr">{o.ref}</div>
              <div className="mt-0.5 font-mono-num text-[11px] text-muted-foreground">{o.date}</div>
            </div>
            <div className="hidden font-mono-num text-sm md:block">{formatNumber(o.items)} کالا</div>
            <div className="font-mono-num text-sm font-bold text-secondary">{formatPrice(o.total)}</div>
            <span className={`rounded-full px-2 py-1 text-center text-[10px] font-bold ${o.color}`}>{o.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
