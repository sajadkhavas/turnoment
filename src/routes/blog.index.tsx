import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/site-layout";
import { blogPosts } from "@/lib/mock-data";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "وبلاگ — ایران مهر افزار" },
      { name: "description", content: "اخبار، نقد و آموزش‌های دنیای گیمینگ" },
      { property: "og:title", content: "وبلاگ ایران مهر افزار" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-black md:text-4xl">وبلاگ گیمینگ</h1>
        <p className="mt-2 text-sm text-muted-foreground">اخبار، نقد، آموزش و راهنمای خرید</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((b) => (
            <Link key={b.slug} to="/blog/$slug" params={{ slug: b.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/60 hover:glow-violet">
              <div className="aspect-[16/10] overflow-hidden bg-elevated">
                <img src={b.cover} alt={b.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="text-xs font-bold text-primary">{b.category}</div>
                <h2 className="mt-2 line-clamp-2 text-base font-bold leading-7 group-hover:text-primary">{b.title}</h2>
                <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted-foreground">{b.excerpt}</p>
                <div className="mt-4 flex items-center justify-between font-mono-num text-[11px] text-muted-foreground">
                  <span>{b.date}</span><span>{b.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
