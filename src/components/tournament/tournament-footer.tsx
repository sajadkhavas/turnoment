import { Link } from "@tanstack/react-router";
import { Swords } from "lucide-react";

const cols = [
  {
    title: "رقابت",
    links: [
      { to: "/tournaments", label: "همه مسابقات" },
      { to: "/games", label: "بازی‌ها" },
      { to: "/ranking", label: "رتبه‌بندی بازیکنان" },
      { to: "/rules", label: "قوانین مسابقات" },
    ],
  },
  {
    title: "مراکز و میزبانی",
    links: [
      { to: "/centers", label: "همه گیم‌نت‌ها" },
      { to: "/host", label: "مسیر میزبانی" },
      { to: "/host", label: "ثبت مرکز میزبان" },
      { to: "/rules", label: "شرایط و قوانین" },
    ],
  },
  {
    title: "حساب بازیکن",
    links: [
      { to: "/login", label: "ورود بازیکن" },
      { to: "/register", label: "ساخت حساب" },
      { to: "/dashboard", label: "داشبورد" },
      { to: "/dashboard/matches", label: "Matchهای من" },
    ],
  },
];

export function TournamentFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface/40">
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" aria-label="Turnoment — خانه" className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground">
              <Swords className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-black">Turnoment</span>
              <span className="block truncate text-xs text-muted-foreground">مسابقات حضوری گیمینگ</span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            مسیر پیدا کردن مسابقات گیمینگ حضوری، بررسی مرکز میزبان و دنبال کردن رقابت و رتبه‌بندی در یک تجربه یکپارچه.
          </p>
        </div>

        {cols.map((column) => (
          <div key={column.title}>
            <h2 className="mb-4 text-sm font-bold">{column.title}</h2>
            <ul className="space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.label}`}>
                  <Link to={link.to} className="inline-flex min-h-10 items-center text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-background/60">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row">
          <div>© ۲۰۲۶ Turnoment — مسابقات حضوری گیمینگ</div>
          <div className="flex gap-4">
            <Link to="/rules" className="min-h-8 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">قوانین مسابقات</Link>
            <Link to="/host" className="min-h-8 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">میزبانی مسابقه</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
