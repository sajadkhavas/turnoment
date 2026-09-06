import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, MessageCircle, Phone, Send, Swords } from "lucide-react";

const cols = [
  {
    title: "مسابقات",
    links: [
      { to: "/tournaments", label: "همه مسابقات" },
      { to: "/games", label: "بازی‌های مسابقات" },
      { to: "/ranking", label: "رتبه‌بندی بازیکنان" },
      { to: "/rules", label: "قوانین مسابقات" },
    ],
  },
  {
    title: "گیم‌نت‌ها",
    links: [
      { to: "/centers", label: "گیم‌نت‌های تأییدشده" },
      { to: "/host", label: "ثبت گیم‌نت" },
      { to: "/host", label: "درخواست میزبانی" },
      { to: "/rules", label: "شرایط و قوانین" },
    ],
  },
];

export function TournamentFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface/40">
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground">
              <Swords className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div className="truncate font-bold">ایران مهر افزار</div>
              <div className="truncate text-xs text-muted-foreground">iranmehrafzar.ir</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            پلتفرم مسابقات حضوری گیمینگ — پیدا کردن مسابقه در گیم‌نت‌های معتبر، ثبت‌نام آنلاین و پیگیری نتایج و رتبه‌بندی.
          </p>
          <div className="mt-4 flex gap-2">
            <a href="#" aria-label="اینستاگرام" className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background transition-colors hover:border-primary hover:text-primary"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="تلگرام" className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background transition-colors hover:border-primary hover:text-primary"><Send className="h-4 w-4" /></a>
            <a href="#" aria-label="واتساپ" className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background transition-colors hover:border-primary hover:text-primary"><MessageCircle className="h-4 w-4" /></a>
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h2 className="mb-4 text-sm font-bold">{c.title}</h2>
            <ul className="space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-muted-foreground transition-colors hover:text-primary">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="mb-4 text-sm font-bold">ارتباط با ما</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" /><span className="font-mono-num" dir="ltr">021-1234 5678</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-primary" /><span dir="ltr">info@iranmehrafzar.ir</span></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>تهران، خیابان ولیعصر، پلاک ۱۲۳۴</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border bg-background/60">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row">
          <div>© ۱۴۰۳ ایران مهر افزار — پلتفرم مسابقات حضوری گیمینگ</div>
          <div className="flex gap-4">
            <Link to="/rules" className="hover:text-primary">قوانین مسابقات</Link>
            <Link to="/host" className="hover:text-primary">همکاری با ما</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
