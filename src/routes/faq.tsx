import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { faqs } from "@/lib/mock-data";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "سوالات متداول — ایران مهر افزار" },
      { name: "description", content: "پاسخ پرتکرارترین سوالات درباره سفارش، پرداخت، ضمانت و خدمات." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }),
    }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  const cats = Array.from(new Set(faqs.map((f) => f.cat)));
  const [cat, setCat] = useState<string>("all");
  const list = cat === "all" ? faqs : faqs.filter((f) => f.cat === cat);

  return (
    <SiteLayout>
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-black md:text-4xl">سوالات متداول</h1>
        <p className="mt-2 text-sm text-muted-foreground">پاسخ سوالات پرتکرار را اینجا پیدا کنید.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Chip label="همه" active={cat === "all"} onClick={() => setCat("all")} />
          {cats.map((c) => <Chip key={c} label={c} active={cat === c} onClick={() => setCat(c)} />)}
        </div>

        <div className="mt-6 space-y-3">
          {list.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start">
                  <span className="text-sm font-bold">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
                </button>
                {isOpen && <div className="border-t border-border bg-elevated/40 px-5 py-4 text-sm leading-7 text-muted-foreground">{f.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </SiteLayout>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${active ? "border-primary bg-primary/20 text-primary" : "border-border bg-surface text-muted-foreground hover:border-primary/40"}`}>
      {label}
    </button>
  );
}
