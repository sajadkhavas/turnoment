import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid, Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatNumber } from "@/lib/format";

const items = [
  { to: "/", icon: Home, label: "خانه" },
  { to: "/products", icon: LayoutGrid, label: "محصولات" },
  { to: "/products", icon: Search, label: "جستجو" },
  { to: "/cart", icon: ShoppingCart, label: "سبد" },
  { to: "/dashboard", icon: User, label: "حساب" },
];

export function MobileBottomNav() {
  const { count } = useCart();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-5">
        {items.map((it) => (
          <Link
            key={it.label}
            to={it.to}
            className="relative flex flex-col items-center justify-center gap-1 py-2 text-[11px] text-muted-foreground transition-colors hover:text-primary"
            activeProps={{ className: "relative flex flex-col items-center justify-center gap-1 py-2 text-[11px] text-primary" }}
          >
            <it.icon className="h-5 w-5" />
            <span>{it.label}</span>
            {it.to === "/cart" && count > 0 && (
              <span className="absolute end-4 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 font-mono-num text-[9px] font-bold text-primary-foreground">
                {formatNumber(count)}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
