import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/site-layout";
import { blogPosts } from "@/lib/mock-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }): { post: typeof blogPosts[number] } => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.post.title} — وبلاگ ایران مهر افزار` },
      { name: "description", content: loaderData.post.excerpt },
      { property: "og:title", content: loaderData.post.title },
      { property: "og:description", content: loaderData.post.excerpt },
      { property: "og:image", content: loaderData.post.cover },
      { property: "og:type", content: "article" },
    ] : [],
    links: loaderData ? [{ rel: "canonical", href: `/blog/${loaderData.post.slug}` }] : [],
  }),
  notFoundComponent: () => (
    <SiteLayout><div className="container mx-auto px-4 py-24 text-center"><h1 className="text-2xl font-black">مقاله یافت نشد</h1></div></SiteLayout>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  return (
    <SiteLayout>
      <article className="container mx-auto max-w-3xl px-4 py-10">
        <Link to="/blog" className="text-xs text-primary hover:underline">← همه مقالات</Link>
        <div className="mt-4 text-xs font-bold text-primary">{post.category}</div>
        <h1 className="mt-2 text-3xl font-black leading-snug md:text-4xl">{post.title}</h1>
        <div className="mt-4 flex items-center gap-3 font-mono-num text-xs text-muted-foreground">
          <span>{post.date}</span><span>•</span><span>{post.readTime} مطالعه</span>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-elevated">
          <img src={post.cover} alt={post.title} className="aspect-[16/9] w-full object-cover" />
        </div>
        <div className="prose prose-invert mt-8 max-w-none text-base leading-9 text-muted-foreground">
          <p>{post.excerpt}</p>
          <p>این یک مقاله نمونه است. در اینجا متن کامل مقاله نمایش داده می‌شود. تیم ایران مهر افزار به‌طور مرتب مقالات تخصصی در حوزه گیمینگ، بررسی کنسول‌ها و راهنمای خرید منتشر می‌کند.</p>
          <p>برای مطالعه آخرین اخبار و راهنماها، به صفحه وبلاگ سر بزنید و خبرنامه ما را دنبال کنید.</p>
        </div>
      </article>
    </SiteLayout>
  );
}
