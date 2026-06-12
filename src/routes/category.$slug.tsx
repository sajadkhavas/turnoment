import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/site-layout";
import { ProductCard } from "@/components/site/product-card";
import { categories, products } from "@/lib/mock-data";
import { formatNumber } from "@/lib/format";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }): { category: typeof categories[number]; items: typeof products } => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category, items: products.filter((p) => p.category === params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.category.name} — ایران مهر افزار` },
      { name: "description", content: `خرید ${loaderData.category.name} با بهترین قیمت و ضمانت.` },
    ] : [],
    links: loaderData ? [{ rel: "canonical", href: `/category/${loaderData.category.slug}` }] : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black">دسته‌بندی یافت نشد</h1>
      </div>
    </SiteLayout>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category, items } = Route.useLoaderData();
  return (
    <SiteLayout>
      <div className="border-b border-border bg-gradient-to-l from-primary/10 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="text-sm text-muted-foreground"><Link to="/" className="hover:text-primary">خانه</Link> / دسته‌بندی</div>
          <div className="mt-3 flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-elevated text-4xl">{category.icon}</div>
            <div>
              <h1 className="text-3xl font-black md:text-4xl">{category.name}</h1>
              <p className="mt-1 font-mono-num text-sm text-muted-foreground">{formatNumber(items.length)} محصول</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {items.length === 0 ? (
          <div className="grid place-items-center rounded-2xl border border-border bg-card p-16 text-center text-muted-foreground">محصولی در این دسته نیست.</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
