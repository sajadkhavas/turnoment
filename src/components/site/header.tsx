import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, User, Menu, Headphones } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import { formatNumber } from "@/lib/format";

const nav = [
  { to: "/", label: "خانه" },
  { to: "/products", label: "محصولات" },
  { to: "/category/consoles", label: "کنسول‌ها" },
  { to: "/category/games", label: "بازی‌ها" },
  { to: "/services", label: "خدمات" },
  { to: "/blog", label: "وبلاگ" },
];

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="h-[2px] w-full rgb-strip" />
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-surface lg:hidden"
          aria-label="منو"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary font-mono-num text-sm font-bold text-white shadow-[var(--shadow-glow)]">
            IM
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-bold">ایران مهر افزار</span>
            <span className="text-[10px] text-muted-foreground">iranmehrafzar.ir</span>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm text-foreground bg-surface" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <Link
            to="/products"
            className="hidden h-10 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground md:flex"
          >
            <Search className="h-4 w-4" />
            <span>جستجو در محصولات…</span>
          </Link>

          <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface transition-colors hover:border-primary/60 hover:text-primary">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -end-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 font-mono-num text-[10px] font-bold text-primary-foreground glow-violet">
                {formatNumber(count)}
              </span>
            )}
          </Link>

          <Link to="/dashboard" className="hidden h-10 w-10 place-items-center rounded-lg border border-border bg-surface transition-colors hover:border-primary/60 hover:text-primary md:grid">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="container mx-auto flex flex-col px-4 py-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-3 text-sm text-muted-foreground">
              <Headphones className="h-4 w-4" /> پشتیبانی
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
