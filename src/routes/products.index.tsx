import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { ProductCard } from "@/components/site/product-card";
import { categories, products, type Platform } from "@/lib/mock-data";
import { formatNumber } from "@/lib/format";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "همه محصولات — ایران مهر افزار" },
      { name: "description", content: "تمامی کنسول‌ها، دسته‌ها، بازی‌ها و لوازم جانبی گیمینگ در یک صفحه." },
      { property: "og:title", content: "محصولات ایران مهر افزار" },
      { property: "og:description", content: "کنسول، دسته، بازی و لوازم جانبی" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

const platforms: Platform[] = ["PS5", "PS4", "Xbox", "Nintendo", "PC"];

function ProductsPage() {
  const [cat, setCat] = useState<string>("all");
  const [plat, setPlat] = useState<Platform | "all">("all");
  const [sort, setSort] = useState<"new" | "price-asc" | "price-desc">("new");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(() => {
    let r = [...products];
    if (cat !== "all") r = r.filter((p) => p.category === cat);
    if (plat !== "all") r = r.filter((p) => p.platforms.includes(plat));
    if (sort === "price-asc") r.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    if (sort === "price-desc") r.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    return r;
  }, [cat, plat, sort]);

  const Filters = (
    <div className="space-y-6">
      <FilterGroup title="دسته‌بندی">
        <button onClick={() => setCat("all")} className={chip(cat === "all")}>همه</button>
        {categories.map((c) => (
          <button key={c.slug} onClick={() => setCat(c.slug)} className={chip(cat === c.slug)}>{c.name}</button>
        ))}
      </FilterGroup>
      <FilterGroup title="پلتفرم">
        <button onClick={() => setPlat("all")} className={chip(plat === "all")}>همه</button>
        {platforms.map((p) => (
          <button key={p} onClick={() => setPlat(p)} className={chip(plat === p) + " font-mono-num"}>{p}</button>
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl font-black md:text-4xl">همه محصولات</h1>
            <p className="mt-1 font-mono-num text-sm text-muted-foreground">{formatNumber(filtered.length)} محصول یافت شد</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setMobileOpen(true)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm lg:hidden">
              <SlidersHorizontal className="h-4 w-4" /> فیلتر
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="rounded-lg border border-border bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none">
              <option value="new">جدیدترین</option>
              <option value="price-asc">ارزان‌ترین</option>
              <option value="price-desc">گران‌ترین</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="hidden rounded-2xl border border-border bg-card p-5 lg:block">{Filters}</aside>

          {mobileOpen && (
            <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur lg:hidden" onClick={() => setMobileOpen(false)}>
              <div onClick={(e) => e.stopPropagation()} className="absolute inset-y-0 end-0 w-80 max-w-[85vw] overflow-y-auto border-s border-border bg-card p-5">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-bold">فیلترها</h3>
                  <button onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-1 text-sm hover:bg-surface">بستن</button>
                </div>
                {Filters}
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="grid place-items-center rounded-2xl border border-border bg-card p-16 text-center">
              <p className="text-muted-foreground">محصولی با این فیلتر یافت نشد.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function chip(active: boolean) {
  return `rounded-full border px-3 py-1.5 text-xs transition-colors ${
    active ? "border-primary bg-primary/20 text-primary" : "border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground"
  }`;
}
