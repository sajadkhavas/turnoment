import type { ReactNode } from "react";

export function SectionHeading({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <h2 className="text-2xl font-black md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
