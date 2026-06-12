import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/site-layout";
import { blogPosts } from "@/lib/mock-data";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    return {
      meta: post ? [
        { title: `${post.title} — وبلاگ ایران مهر افزار` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: post.cover },
        { property: "og:type", content: "article" },
      ] : [{ title: "مقاله یافت نشد" }],
      links: post ? [{ rel: "canonical", href: `/blog/${post.slug}` }] : [],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-black">مقاله یافت نشد</h1>
          <Link to="/blog" className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">بازگشت به وبلاگ</Link>
        </div>
      </SiteLayout>
    );
  }

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
        <div className="mt-8 space-y-5 text-base leading-9 text-muted-foreground">
          <p>{post.excerpt}</p>
          <p>این یک مقاله نمونه است. تیم ایران مهر افزار به‌طور مرتب مقالات تخصصی در حوزه گیمینگ، بررسی کنسول‌ها و راهنمای خرید منتشر می‌کند.</p>
          <p>برای مطالعه آخرین اخبار و راهنماها، به صفحه وبلاگ سر بزنید.</p>
        </div>
      </article>
    </SiteLayout>
  );
}
