import { Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpenCheck, Info, ListChecks, ShieldCheck } from "lucide-react";
import { formatNumber } from "@/lib/format";
import type { RuleItem, RulesPageDocument, RulesSection } from "@/lib/rules-page-contract";

function PolicyMeta({ document }: { document: RulesPageDocument }) {
  const { policyMeta } = document;
  if (!policyMeta.version && !policyMeta.effectiveDate && !policyMeta.lastSubstantiveRevisionDate) return null;

  return (
    <dl className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground" aria-label="اطلاعات نسخه قوانین">
      {policyMeta.version ? <div className="rounded-full border border-border bg-card px-3 py-2"><dt className="sr-only">نسخه</dt><dd>نسخه {policyMeta.version}</dd></div> : null}
      {policyMeta.effectiveDate ? <div className="rounded-full border border-border bg-card px-3 py-2"><dt className="sr-only">تاریخ اجرا</dt><dd><time dateTime={policyMeta.effectiveDate}>تاریخ اجرا: {policyMeta.effectiveDate}</time></dd></div> : null}
      {policyMeta.lastSubstantiveRevisionDate ? <div className="rounded-full border border-border bg-card px-3 py-2"><dt className="sr-only">آخرین بازبینی محتوایی</dt><dd><time dateTime={policyMeta.lastSubstantiveRevisionDate}>آخرین بازبینی: {policyMeta.lastSubstantiveRevisionDate}</time></dd></div> : null}
    </dl>
  );
}

function RuleCard({ rule, index }: { rule: RuleItem; index: number }) {
  return (
    <li id={`rule-${rule.id}`} className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30 sm:p-5">
      <div className="flex items-start gap-3.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-sm font-black text-primary" aria-hidden="true">
          {formatNumber(index + 1)}
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-black leading-7 text-foreground">{rule.title}</h3>
          <p className="mt-1.5 text-sm leading-7 text-muted-foreground sm:text-[15px]">{rule.body}</p>
        </div>
      </div>
    </li>
  );
}

function RulesSectionBlock({ section, index }: { section: RulesSection; index: number }) {
  const headingId = `rules-section-${section.id}-title`;
  return (
    <section id={`rules-section-${section.id}`} aria-labelledby={headingId} className="scroll-mt-24">
      <div className="mb-5">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-primary">{formatNumber(index + 1).padStart(2, "۰")}</span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>
        <h2 id={headingId} className="mt-3 text-xl font-black leading-9 tracking-tight sm:text-2xl">{section.title}</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-[15px]">{section.description}</p>
      </div>
      <ol className="space-y-3">
        {section.rules.map((rule, ruleIndex) => <RuleCard key={rule.id} rule={rule} index={ruleIndex} />)}
      </ol>
    </section>
  );
}

export function RulesPage({ document }: { document: RulesPageDocument }) {
  return (
    <main id="main-content" dir="rtl" lang="fa">
      <header className="relative overflow-hidden border-b border-border bg-gradient-to-l from-primary/10 via-background to-background">
        <div className="pointer-events-none absolute inset-y-0 left-1/4 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
        <div className="container relative mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>{document.eyebrow}</span>
            </div>
            <h1 className="mt-5 text-3xl font-black leading-[1.35] tracking-tight sm:text-4xl lg:text-5xl">{document.heading}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base">{document.summary}</p>
            <PolicyMeta document={document} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 sm:py-10 lg:py-12">
        <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 xl:gap-14">
          <nav aria-label="دسترسی سریع به بخش‌های قوانین" className="mb-7 lg:sticky lg:top-24 lg:mb-0 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-3 sm:p-4">
              <div className="flex items-center gap-2 px-2 pb-3 text-sm font-black">
                <ListChecks className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>دسترسی سریع</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible">
                {document.sections.map((section, index) => (
                  <a key={section.id} href={`#rules-section-${section.id}`} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm leading-6 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex lg:whitespace-normal">
                    <span className="text-xs font-bold text-primary" aria-hidden="true">{formatNumber(index + 1)}</span>
                    <span>{section.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </nav>

          <div className="min-w-0 max-w-4xl">
            <aside className="mb-8 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5" aria-labelledby="rules-scope-title">
              <div className="flex items-start gap-3">
                <Info className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h2 id="rules-scope-title" className="text-base font-black leading-7">{document.scopeNotice.title}</h2>
                  <p className="mt-1.5 text-sm leading-7 text-muted-foreground sm:text-[15px]">{document.scopeNotice.body}</p>
                </div>
              </div>
            </aside>

            <div className="space-y-10 sm:space-y-12">
              {document.sections.map((section, index) => <RulesSectionBlock key={section.id} section={section} index={index} />)}
            </div>

            <aside className="mt-10 rounded-2xl border border-border bg-secondary/40 p-5 sm:p-6" aria-labelledby="rules-precedence-title">
              <div className="flex items-start gap-3">
                <BookOpenCheck className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h2 id="rules-precedence-title" className="text-lg font-black leading-8">{document.precedenceNotice.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-[15px]">{document.precedenceNotice.body}</p>
                </div>
              </div>
            </aside>

            <section className="mt-10 rounded-3xl border border-border bg-card p-5 sm:p-7" aria-labelledby="rules-next-title">
              <h2 id="rules-next-title" className="text-xl font-black">مسابقه بعدی را با جزئیات خودش بررسی کنید</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">برای دیدن رقابت‌های فعال و بررسی زمان، مرکز میزبان، ظرفیت و شرایط اختصاصی هر مسابقه، به فهرست تورنمنت‌ها بروید.</p>
              <div className="mt-5">
                {document.relatedLinks.map((link) => (
                  <Link key={link.id} to={link.href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {link.label}
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
