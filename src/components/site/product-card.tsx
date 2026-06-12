import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { conditionLabel, platformColors, stockMeta, type Product } from "@/lib/mock-data";
import { formatPrice, formatNumber } from "@/lib/format";
import { useCart } from "@/lib/cart-store";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const sale = p.salePrice && p.salePrice < p.price;
  const off = sale ? Math.round(((p.price - p.salePrice!) / p.price) * 100) : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:glow-violet">
      {/* Image */}
      <Link to="/products/$slug" params={{ slug: p.slug }} className="relative block aspect-square overflow-hidden bg-elevated">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Top-left: discount */}
        {sale && (
          <span className="absolute start-2 top-2 rounded-full bg-destructive/90 px-2 py-1 font-mono-num text-[11px] font-bold text-white shadow-lg">
            {formatNumber(off)}٪
          </span>
        )}
        {/* Top-right: wishlist */}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); }}
          className="absolute end-2 top-2 grid h-9 w-9 place-items-center rounded-full border border-border bg-background/70 backdrop-blur transition-colors hover:border-primary hover:text-primary"
          aria-label="افزودن به علاقه‌مندی"
        >
          <Heart className="h-4 w-4" />
        </button>
        {/* Platforms */}
        <div className="absolute bottom-2 start-2 flex flex-wrap gap-1">
          {p.platforms.map((pl) => (
            <span key={pl} className={`rounded-full border px-2 py-0.5 font-mono-num text-[10px] font-bold ${platformColors[pl]}`}>{pl}</span>
          ))}
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className={`inline-block h-2 w-2 rounded-full ${stockMeta[p.stock].dot}`} />
          <span>{stockMeta[p.stock].label}</span>
          <span className="text-border">•</span>
          <span>{conditionLabel[p.condition]}</span>
        </div>
        <Link to="/products/$slug" params={{ slug: p.slug }} className="line-clamp-2 text-sm font-bold leading-6 transition-colors hover:text-primary">
          {p.name}
        </Link>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="min-w-0">
            {sale && (
              <div className="font-mono-num text-xs text-muted-foreground line-through">
                {formatPrice(p.price)}
              </div>
            )}
            <div className="font-mono-num text-base font-bold text-secondary">
              {formatPrice(p.salePrice ?? p.price)}
            </div>
          </div>
          <button
            type="button"
            onClick={() => add(p)}
            disabled={p.stock === "out"}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-all hover:glow-violet-strong disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="افزودن به سبد"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
