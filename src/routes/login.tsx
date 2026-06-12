import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "ورود — ایران مهر افزار" }, { name: "robots", content: "noindex" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <SiteLayout>
      <div className="container mx-auto grid place-items-center px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8">
          <div className="text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary font-mono-num text-lg font-black text-white glow-violet">IM</div>
            <h1 className="mt-4 text-2xl font-black">خوش آمدید</h1>
            <p className="mt-1 text-sm text-muted-foreground">برای ادامه وارد حساب کاربری شوید</p>
          </div>
          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Field label="ایمیل یا شماره موبایل" type="text" />
            <Field label="رمز عبور" type="password" />
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" className="accent-primary" /> مرا به خاطر بسپار</label>
              <Link to="/login" className="text-primary hover:underline">فراموشی رمز؟</Link>
            </div>
            <button type="submit" className="w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground hover:glow-violet-strong">ورود</button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">حساب ندارید؟ <Link to="/register" className="font-bold text-primary hover:underline">ثبت‌نام</Link></p>
        </div>
      </div>
    </SiteLayout>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-muted-foreground">{label}</span>
      <input type={type} className="w-full rounded-lg border border-border bg-elevated px-3 py-3 text-sm focus:border-primary focus:outline-none" />
    </label>
  );
}
