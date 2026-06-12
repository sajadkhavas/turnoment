import { Link } from "@tanstack/react-router";
import { Send, Instagram, MessageCircle, Phone, MapPin, Mail, ShieldCheck, Truck, CreditCard, RotateCcw } from "lucide-react";

const cols = [
  {
    title: "دسترسی سریع",
    links: [
      { to: "/products", label: "همه محصولات" },
      { to: "/category/consoles", label: "کنسول‌ها" },
      { to: "/category/games", label: "بازی‌ها" },
      { to: "/services", label: "خدمات تعمیر" },
      { to: "/blog", label: "وبلاگ" },
    ],
  },
  {
    title: "خدمات مشتری",
    links: [
      { to: "/about", label: "درباره ما" },
      { to: "/contact", label: "تماس با ما" },
      { to: "/faq", label: "سوالات متداول" },
      { to: "/dashboard/orders", label: "پیگیری سفارش" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface/40">
      {/* Trust bar */}
      <div className="border-b border-border/60">
        <div className="container mx-auto grid grid-cols-2 gap-4 px-4 py-8 md:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "ضمانت اصالت", d: "تضمین کیفیت تمام محصولات" },
            { icon: Truck, t: "ارسال سراسری", d: "پست پیشتاز و تیپاکس" },
            { icon: CreditCard, t: "پرداخت امن", d: "درگاه زرین‌پال" },
            { icon: RotateCcw, t: "هفت روز ضمانت بازگشت", d: "بدون قید و شرط" },
          ].map((it) => (
            <div key={it.t} className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <it.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold">{it.t}</div>
                <div className="truncate text-xs text-muted-foreground">{it.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary font-mono-num font-bold text-white">IM</div>
            <div>
              <div className="font-bold">ایران مهر افزار</div>
              <div className="text-xs text-muted-foreground">iranmehrafzar.ir</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            فروشگاه تخصصی کنسول‌های بازی، لوازم جانبی و خدمات نصب و تعمیر در ایران. با بیش از ۱۰ سال تجربه در خدمت گیمرهای ایرانی.
          </p>
          <div className="mt-4 flex gap-2">
            <a href="#" aria-label="اینستاگرام" className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background transition-colors hover:border-primary hover:text-primary"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="تلگرام" className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background transition-colors hover:border-primary hover:text-primary"><Send className="h-4 w-4" /></a>
            <a href="#" aria-label="واتساپ" className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background transition-colors hover:border-primary hover:text-primary"><MessageCircle className="h-4 w-4" /></a>
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="mb-4 text-sm font-bold">{c.title}</h3>
            <ul className="space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l.to}><Link to={l.to} className="text-muted-foreground transition-colors hover:text-primary">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="mb-4 text-sm font-bold">تماس با ما</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><span className="font-mono-num" dir="ltr">021-1234 5678</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><span dir="ltr">info@iranmehrafzar.ir</span></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /><span>تهران، خیابان ولیعصر، پلاک ۱۲۳۴</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border bg-background/60">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row">
          <div>© ۱۴۰۳ ایران مهر افزار — تمامی حقوق محفوظ است</div>
          <div className="flex gap-4">
            <a href="#">حریم خصوصی</a>
            <a href="#">شرایط استفاده</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
