import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/product-card";
import { products } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/wishlist")({
  component: Wishlist,
});

function Wishlist() {
  const items = products.slice(0, 4);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black">علاقه‌مندی‌ها</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
