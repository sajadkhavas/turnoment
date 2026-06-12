import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, XCircle } from "lucide-react";
import { z } from "zod";
import { SiteLayout } from "@/components/site/site-layout";

const search = z.object({
  status: z.enum(["success", "failure"]).default("success"),
  ref: z.string().optional(),
});

export const Route = createFileRoute("/payment/result")({
  validateSearch: search.parse,
  head: () => ({ meta: [{ title: "نتیجه پرداخت — ایران مهر افزار" }, { name: "robots", content: "noindex" }] }),
  component: PaymentResult,
});

function PaymentResult() {
  const { status, ref } = Route.useSearch();
  const ok = status === "success";

  return (
    <SiteLayout>
      <div className="container mx-auto grid place-items-center px-4 py-20">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center">
          {ok ? (
            <>
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/15 text-success glow-violet">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h1 className="mt-6 text-2xl font-black">پرداخت با موفقیت انجام شد</h1>
              <p className="mt-2 text-sm text-muted-foreground">سفارش شما ثبت شد و در حال آماده‌سازی است.</p>
              {ref && (
                <div className="mt-6 rounded-xl border border-border bg-elevated p-4">
                  <div className="text-xs text-muted-foreground">شماره پیگیری سفارش</div>
                  <div className="mt-1 font-mono-num text-lg font-black text-secondary" dir="ltr">{ref}</div>
                </div>
              )}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link to="/dashboard/orders" className="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">سفارش‌های من</Link>
                <Link to="/" className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-bold">صفحه اصلی</Link>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-destructive/15 text-destructive">
                <XCircle className="h-12 w-12" />
              </div>
              <h1 className="mt-6 text-2xl font-black">پرداخت ناموفق بود</h1>
              <p className="mt-2 text-sm text-muted-foreground">مشکلی در پرداخت رخ داد. لطفاً دوباره تلاش کنید.</p>
              <Link to="/cart" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">بازگشت به سبد</Link>
            </>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
