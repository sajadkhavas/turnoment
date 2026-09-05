import { SectionHeading } from "./section-heading";
import { howItWorks } from "@/lib/tournament-home-data";
import { toPersianDigits } from "@/lib/format";

export function HowItWorks() {
  return (
    <section className="container mx-auto px-4 py-14">
      <SectionHeading title="چطور کار می‌کند؟" subtitle="سه قدم تا اولین مسابقه حضوری" />
      <ol className="grid gap-4 md:grid-cols-3">
        {howItWorks.map((s) => (
          <li key={s.id} className="relative rounded-2xl border border-border bg-card p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary font-mono-num text-base font-black text-primary-foreground">
              {toPersianDigits(String(s.step))}
            </span>
            <h3 className="mt-4 text-base font-bold">{s.title}</h3>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
