import { createFileRoute } from "@tanstack/react-router";
import { Plus, Star } from "lucide-react";

export const Route = createFileRoute("/dashboard/addresses")({
  component: Addresses,
});

const addresses = [
  { title: "خانه", name: "علی محمدی", phone: "۰۹۱۲ ۳۴۵ ۶۷۸۹", body: "تهران، خیابان ولیعصر، کوچه گل‌ها، پلاک ۲۰، واحد ۵", postal: "۱۹۳۴۵۶۷۸۹۰", def: true },
  { title: "محل کار", name: "علی محمدی", phone: "۰۹۱۲ ۳۴۵ ۶۷۸۹", body: "تهران، میدان آرژانتین، برج آلتون، طبقه ۸", postal: "۱۵۱۴۸۳۲۱۹۰", def: false },
];

function Addresses() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h1 className="text-2xl font-black">آدرس‌های من</h1>
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:glow-violet-strong">
          <Plus className="h-4 w-4" /> آدرس جدید
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((a, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div className="font-bold">{a.title}</div>
              {a.def && <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary"><Star className="h-3 w-3" /> پیش‌فرض</span>}
            </div>
            <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <div>{a.name} — <span className="font-mono-num">{a.phone}</span></div>
              <div className="leading-7">{a.body}</div>
              <div className="font-mono-num text-xs">کد پستی: {a.postal}</div>
            </div>
            <div className="mt-4 flex gap-2 text-xs">
              <button className="rounded-lg border border-border bg-surface px-3 py-1.5 hover:border-primary/40">ویرایش</button>
              <button className="rounded-lg border border-border bg-surface px-3 py-1.5 text-destructive hover:border-destructive/40">حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
