import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { popularGames } from "@/lib/tournament-home-data";
import { formatNumber } from "@/lib/format";

export function PopularGames() {
  return (
    <section className="container mx-auto px-4 py-14">
      <SectionHeading title="بازی‌های محبوب" subtitle="مسابقات فعال را بر اساس بازی مرور کن" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {popularGames.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <Link
              to="/products"
              className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/60"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-elevated">
                <img
                  src={g.image}
                  alt={g.name}
                  loading="lazy"
                  width={768}
                  height={576}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="truncate text-sm font-bold transition-colors group-hover:text-primary">{g.name}</div>
                  <div className="mt-0.5 truncate text-[11px] text-muted-foreground">{g.platform}</div>
                  <div className="mt-1 font-mono-num text-[11px] text-secondary">
                    {formatNumber(g.tournamentCount)} مسابقه فعال
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
