import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { TournamentCard } from "./tournament-card";
import { featuredTournaments } from "@/lib/tournament-home-data";

export function FeaturedTournaments() {
  return (
    <section className="border-y border-border bg-surface/30">
      <div className="container mx-auto px-4 py-14">
        <SectionHeading
          title="مسابقات پیش‌رو"
          subtitle="ثبت‌نام باز در گیم‌نت‌های تأییدشده"
          action={
            <Link to="/tournaments" className="inline-flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/10">
              همه مسابقات <ChevronLeft className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredTournaments.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <TournamentCard t={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
