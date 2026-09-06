import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { GamingCenterCard } from "./gaming-center-card";
import { gamingCenters } from "@/lib/tournament-home-data";

export function FeaturedGamingCenters() {
  return (
    <section className="container mx-auto px-4 py-14">
      <SectionHeading
        title="گیم‌نت‌های تأییدشده"
        subtitle="مراکز میزبان با تجهیزات بررسی‌شده"
        action={
          <Link to="/centers" className="inline-flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/10">
            همه گیم‌نت‌ها <ChevronLeft className="h-4 w-4" />
          </Link>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {gamingCenters.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <GamingCenterCard c={c} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
