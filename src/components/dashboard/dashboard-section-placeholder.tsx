import { Link } from "@tanstack/react-router";
import { Construction } from "lucide-react";

export function DashboardSectionPlaceholder({ title }: { title: string }) {
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-black sm:text-2xl">{title}</h1>
      <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card p-10 text-center">
        <Construction className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
        <p className="mt-4 text-sm font-bold">این بخش به‌زودی فعال می‌شود</p>
        <p className="mt-2 max-w-sm text-xs text-muted-foreground">
          اطلاعات این بخش پس از اتصال سرویس مسابقات نمایش داده می‌شود.
        </p>
        <Link
          to="/dashboard"
          className="mt-5 inline-flex h-10 items-center rounded-lg border border-border bg-elevated px-4 text-xs font-bold hover:text-primary"
        >
          بازگشت به نمای کلی
        </Link>
      </div>
    </div>
  );
}
