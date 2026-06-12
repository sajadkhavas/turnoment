import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/services")({
  component: ServicesList,
});

const items = [
  { ref: "SRV-1403-00045", type: "تعمیر کنسول PS5", date: "۱۴۰۳/۰۹/۱۵", status: "در حال انجام", color: "bg-warning/20 text-warning" },
  { ref: "SRV-1403-00038", type: "نصب بازی", date: "۱۴۰۳/۰۸/۲۸", status: "تکمیل شد", color: "bg-success/20 text-success" },
];

function ServicesList() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black">درخواست‌های خدمات</h1>
      <div className="rounded-2xl border border-border bg-card">
        {items.map((s) => (
          <div key={s.ref} className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border px-5 py-4 last:border-b-0">
            <div className="min-w-0">
              <div className="text-sm font-bold">{s.type}</div>
              <div className="mt-1 flex items-center gap-2 font-mono-num text-[11px] text-muted-foreground" dir="ltr"><span>{s.ref}</span><span>•</span><span>{s.date}</span></div>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${s.color}`}>{s.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
