import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "ثبت‌نام — ایران مهر افزار" }, { name: "robots", content: "noindex" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <SiteLayout>
      <div className="container mx-auto grid place-items-center px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8">
          <h1 className="text-center text-2xl font-black">ساخت حساب کاربری</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">رایگان و در چند ثانیه</p>
          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Field label="نام و نام خانوادگی" />
            <Field label="ایمیل" type="email" />
            <Field label="شماره موبایل" placeholder="09xxxxxxxxx" />
            <Field label="رمز عبور" type="password" />
            <button type="submit" className="w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground hover:glow-violet-strong">ثبت‌نام</button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">حساب دارید؟ <Link to="/login" className="font-bold text-primary hover:underline">ورود</Link></p>
        </div>
      </div>
    </SiteLayout>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-muted-foreground">{label}</span>
      <input type={type} placeholder={placeholder} className="w-full rounded-lg border border-border bg-elevated px-3 py-3 text-sm focus:border-primary focus:outline-none" />
    </label>
  );
}
