import { BadgeCheck, ListOrdered, Radio, TicketCheck } from "lucide-react";
import { benefits } from "@/lib/tournament-home-data";

const icons = [BadgeCheck, TicketCheck, ListOrdered, Radio];

export function PlatformBenefits() {
  return (
    <section className="border-b border-border bg-surface/30">
      <div className="container mx-auto grid gap-4 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={b.id} className="rounded-2xl border border-border bg-card p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-bold">{b.title}</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{b.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
