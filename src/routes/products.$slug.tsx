import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Heart, ShieldCheck, Truck, RotateCcw, Star, Plus, Minus } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { ProductCard } from "@/components/site/product-card";
import { products, conditionLabel, platformColors, stockMeta } from "@/lib/mock-data";
import { formatNumber, formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} — ایران مهر افزار` },
      { name: "description", content: loaderData.product.shortDescription },
      { property: "og:title", content: loaderData.product.name },
      { property: "og:description", content: loaderData.product.shortDescription },
      { property: "og:image", content: loaderData.product.image },
      { property: "og:type", content: "product" },
    ] : [],
    links: loaderData ? [{ rel: "canonical", href: `/products/${loaderData.product.slug}` }] : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black">محصول مورد نظر یافت نشد</h1>
        <Link to="/products" className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">بازگشت به محصولات</Link>
      </div>
    </SiteLayout>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(product.image);
  const sale = product.salePrice && product.salePrice < product.price;
  const similar = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-6">
        {/* breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">خانه</Link>
          <ChevronLeft className="h-3 w-3" />
          <Link to="/products" className="hover:text-primary">محصولات</Link>
          <ChevronLeft className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-elevated">
              <img src={img} alt={product.name} width={800} height={800} className="h-full w-full object-cover" />
              {sale && (
                <span className="absolute start-4 top-4 rounded-full bg-destructive/90 px-3 py-1.5 font-mono-num text-sm font-bold text-white">
                  {formatNumber(Math.round(((product.price - product.salePrice!) / product.price) * 100))}٪ تخفیف
                </span>
              )}
            </div>
            {product.gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {product.gallery.map((g, i) => (
                  <button key={i} onClick={() => setImg(g)} className={`aspect-square overflow-hidden rounded-xl border ${img === g ? "border-primary glow-violet" : "border-border"}`}>
                    <img src={g} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              {product.platforms.map((pl) => (
                <span key={pl} className={`rounded-full border px-2.5 py-1 font-mono-num text-[11px] font-bold ${platformColors[pl]}`}>{pl}</span>
              ))}
              <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11px]">{conditionLabel[product.condition]}</span>
            </div>
            <h1 className="text-2xl font-black leading-snug md:text-3xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-mono-num font-bold text-foreground">{formatNumber(product.rating)}</span>
                <span className="font-mono-num">({formatNumber(product.reviews)} نظر)</span>
              </div>
              <span className="text-border">|</span>
              <span>برند: <span className="font-bold text-foreground">{product.brand}</span></span>
            </div>

            <p className="mt-5 text-sm leading-8 text-muted-foreground">{product.description}</p>

            {/* Price card */}
            <div className="mt-6 rounded-2xl border border-primary/30 bg-gradient-to-l from-primary/10 to-transparent p-5">
              <div className="flex items-center gap-2 text-xs">
                <span className={`inline-block h-2 w-2 rounded-full ${stockMeta[product.stock].dot}`} />
                <span className="text-muted-foreground">{stockMeta[product.stock].label}</span>
              </div>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  {sale && <div className="font-mono-num text-sm text-muted-foreground line-through">{formatPrice(product.price)}</div>}
                  <div className="font-mono-num text-2xl font-black text-secondary md:text-3xl">{formatPrice(product.salePrice ?? product.price)}</div>
                </div>
                <div className="flex items-center gap-1 rounded-xl border border-border bg-background p-1">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-surface" aria-label="کاهش"><Minus className="h-4 w-4" /></button>
                  <div className="grid w-10 place-items-center font-mono-num font-bold">{formatNumber(qty)}</div>
                  <button onClick={() => setQty(qty + 1)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-surface" aria-label="افزایش"><Plus className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-[1fr_auto] gap-3">
                <button
                  onClick={() => add(product, qty)}
                  disabled={product.stock === "out"}
                  className="rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong disabled:opacity-50"
                >
                  افزودن به سبد خرید
                </button>
                <button className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-surface hover:border-primary hover:text-primary" aria-label="علاقه‌مندی">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Trust */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, t: "ضمانت اصالت" },
                { icon: Truck, t: "ارسال سریع" },
                { icon: RotateCcw, t: "۷ روز بازگشت" },
              ].map((x) => (
                <div key={x.t} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 text-center">
                  <x.icon className="h-5 w-5 text-primary" />
                  <span className="text-[11px] text-muted-foreground">{x.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-12 rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-black">مشخصات فنی</h2>
          <dl className="grid gap-3 sm:grid-cols-2">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-elevated px-4 py-3 text-sm">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-bold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-black md:text-2xl">محصولات مشابه</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {similar.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
