import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, ShoppingBag, Wrench, Heart, MapPin, User, LogOut } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "حساب کاربری — ایران مهر افزار" }, { name: "robots", content: "noindex" }] }),
  component: DashboardLayout,
});

const nav = [
  { to: "/dashboard", label: "داشبورد", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/orders", label: "سفارش‌های من", icon: ShoppingBag },
  { to: "/dashboard/services", label: "خدمات من", icon: Wrench },
  { to: "/dashboard/wishlist", label: "علاقه‌مندی‌ها", icon: Heart },
  { to: "/dashboard/addresses", label: "آدرس‌ها", icon: MapPin },
  { to: "/dashboard/profile", label: "پروفایل", icon: User },
];

function DashboardLayout() {
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-1 rounded-2xl border border-border bg-card p-3 lg:sticky lg:top-24 lg:self-start">
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-elevated p-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary font-bold text-white">ع</div>
              <div className="min-w-0">
                <div className="truncate text-sm font-bold">علی محمدی</div>
                <div className="truncate text-[11px] text-muted-foreground">۰۹۱۲ ۳۴۵ ۶۷۸۹</div>
              </div>
            </div>
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={n.exact ? { exact: true } : undefined}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
                activeProps={{ className: "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm bg-primary/15 text-primary font-bold" }}
              >
                <n.icon className="h-4 w-4" /> {n.label}
              </Link>
            ))}
            <button className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4" /> خروج از حساب
            </button>
          </aside>
          <div className="min-w-0"><Outlet /></div>
        </div>
      </div>
    </SiteLayout>
  );
}
