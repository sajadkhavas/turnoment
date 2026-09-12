import { type FormEvent, type ReactNode, useId, useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  Gamepad2,
  Globe2,
  Headphones,
  ListChecks,
  MapPin,
  MonitorSmartphone,
  Send,
  ShieldCheck,
  Swords,
  Trophy,
  UserRoundCheck,
  Users,
  Wifi,
} from "lucide-react";
import {
  HostApplicationSubmissionError,
  validateHostApplicationDraft,
  type HostApplicationDraft,
  type HostApplicationField,
  type HostApplicationFieldErrors,
  type HostApplicationInput,
  type HostApplicationReceipt,
} from "@/lib/host-application-contract";

export interface HostPageProps {
  onSubmit: (data: HostApplicationInput) => Promise<HostApplicationReceipt>;
}

type Icon = typeof Trophy;
interface FAQItem { id: string; question: string; answer: string }
interface CardItem { title: string; description: string; icon: Icon }
interface ProcessStep extends CardItem { number: string }

const benefits: CardItem[] = [
  { icon: Trophy, title: "ساخت و انتشار مسابقه", description: "اطلاعات بازی، زمان و ظرفیت را در یک ساختار مشخص آماده کنید و رقابت را برای بازیکنان منتشر کنید." },
  { icon: UserRoundCheck, title: "ثبت‌نام آنلاین بازیکنان", description: "بازیکنان پیش از مراجعه حضوری، مسابقه را می‌بینند و مسیر ثبت‌نام را آنلاین طی می‌کنند." },
  { icon: CalendarDays, title: "مدیریت ظرفیت و زمان‌بندی", description: "ظرفیت و برنامه اجرای مسابقه را متناسب با فضای مرکز و تجهیزات در دسترس مشخص کنید." },
  { icon: Building2, title: "صفحه عمومی مرکز", description: "پس از راه‌اندازی و در صورت تأیید، اطلاعات مرتبط با مرکز و مسابقات آن می‌تواند در Turnoment نمایش داده شود." },
  { icon: ListChecks, title: "مدیریت اطلاعات مسابقه", description: "جزئیات مهم رقابت را منظم نگه دارید و پیش از برگزاری در صورت نیاز به‌روزرسانی کنید." },
  { icon: Users, title: "مشاهده وضعیت ثبت‌نام", description: "ظرفیت و وضعیت ثبت‌نام‌های هر مسابقه را برای برنامه‌ریزی بهتر رویداد دنبال کنید." },
];

const processSteps: ProcessStep[] = [
  { number: "۰۱", icon: Send, title: "ارسال درخواست", description: "اطلاعات پایه مرکز، مسئول مجموعه، تجهیزات و بازی‌های قابل میزبانی را برای بررسی ارسال می‌کنید." },
  { number: "۰۲", icon: ClipboardCheck, title: "بررسی اطلاعات مرکز", description: "تناسب اطلاعات مرکز با مدل میزبانی Turnoment بررسی می‌شود. پذیرش درخواست خودکار نیست." },
  { number: "۰۳", icon: Building2, title: "تکمیل پروفایل میزبان", description: "در صورت تأیید، اطلاعات لازم برای معرفی مرکز و آماده‌سازی تجربه میزبانی تکمیل می‌شود." },
  { number: "۰۴", icon: Swords, title: "ساخت و انتشار مسابقه", description: "پس از راه‌اندازی، رقابت را آماده می‌کنید تا بازیکنان آن را پیدا کنند و ثبت‌نام کنند." },
];

const requirements: CardItem[] = [
  { icon: Building2, title: "فضای فیزیکی مناسب", description: "محیطی که امکان اجرای منظم رقابت حضوری و حضور شرکت‌کنندگان را فراهم کند." },
  { icon: MonitorSmartphone, title: "تجهیزات متناسب", description: "سیستم، کنسول و تجهیزات لازم برای بازی‌هایی که برای میزبانی اعلام می‌کنید." },
  { icon: Wifi, title: "شبکه و اینترنت پایدار", description: "زیرساخت شبکه متناسب با نیاز بازی و شرایط اجرای مسابقه." },
  { icon: Headphones, title: "مسئول پاسخ‌گو", description: "فردی مشخص برای هماهنگی، پاسخ‌گویی و مدیریت روند برگزاری در مرکز." },
  { icon: CalendarDays, title: "تعهد به زمان برگزاری", description: "توانایی آماده‌سازی مرکز و اجرای مسابقه در زمان و شرایط اعلام‌شده." },
  { icon: ShieldCheck, title: "رعایت قوانین", description: "پایبندی به قوانین Turnoment و مقرراتی که برای فعالیت محل شما قابل اعمال است." },
];

const faqItems: FAQItem[] = [
  { id: "faq-eligibility", question: "آیا همه گیم‌نت‌ها می‌توانند درخواست میزبانی بدهند؟", answer: "هر مرکز گیمینگ می‌تواند اطلاعات خود را برای بررسی ارسال کند، اما پذیرش خودکار نیست. فضای مرکز، تجهیزات و توان اجرای مسابقه در مرحله بررسی ارزیابی می‌شود." },
  { id: "faq-review", question: "بررسی درخواست به چه اطلاعاتی وابسته است؟", answer: "مشخصات مرکز، شهر و محدوده، تعداد سیستم یا کنسول، بازی‌های قابل میزبانی و توضیحات تکمیلی به شناخت بهتر شرایط مرکز کمک می‌کنند." },
  { id: "faq-games", question: "چه بازی‌هایی قابل برگزاری هستند؟", answer: "بازی‌های قابل میزبانی به تجهیزات مرکز، ساختار رقابت و بازی‌هایی که در Turnoment پشتیبانی می‌شوند بستگی دارد." },
  { id: "faq-capacity", question: "ظرفیت مسابقه را چه کسی مشخص می‌کند؟", answer: "ظرفیت باید با امکانات واقعی مرکز و قالب رقابت هماهنگ باشد. میزبان هنگام آماده‌سازی مسابقه ظرفیت مناسب را مشخص می‌کند." },
  { id: "faq-multiple", question: "آیا یک مرکز می‌تواند بیش از یک مسابقه برگزار کند؟", answer: "امکان میزبانی رقابت‌های مختلف پس از راه‌اندازی به شرایط مرکز، زمان‌بندی و وضعیت هر مسابقه بستگی دارد." },
  { id: "faq-profile", question: "اطلاعات مرکز کجا نمایش داده می‌شود؟", answer: "در صورت تأیید و راه‌اندازی میزبانی، اطلاعات مرتبط با مرکز می‌تواند در صفحه‌های عمومی مرتبط با مرکز و مسابقات Turnoment نمایش داده شود." },
  { id: "faq-rules", question: "قوانین مسابقات چگونه اعمال می‌شوند؟", answer: "هر مسابقه باید مطابق قوانین و شرایط اعلام‌شده همان رقابت برگزار شود و میزبان اجرای حضوری را با اطلاعات منتشرشده هماهنگ نگه دارد." },
];

const initialFormData: HostApplicationDraft = {
  venueName: "", managerName: "", phone: "", city: "", area: "", stationCount: "", games: "", description: "",
};

function SectionHeading({ eyebrow, title, description, center = false }: { eyebrow?: string; title: string; description?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <p className="mb-4 text-sm font-bold text-primary">{eyebrow}</p> : null}
      <h2 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">{description}</p> : null}
    </div>
  );
}

function ActionLink({ href, secondary = false, children }: { href: string; secondary?: boolean; children: ReactNode }) {
  return (
    <a href={href} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${secondary ? "border border-border bg-card hover:border-primary/40 hover:bg-secondary" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
      {children}
    </a>
  );
}

function HeroPreview() {
  const stats: Array<{ label: string; value: string; icon: Icon }> = [
    { label: "ثبت‌نام", value: "۱۸ / ۲۴", icon: Users },
    { label: "زمان", value: "جمعه، ۱۸:۰۰", icon: CalendarDays },
    { label: "محل", value: "مرکز میزبان", icon: MapPin },
  ];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-xs font-semibold text-muted-foreground">پیش‌نمایش تجربه میزبانی</span>
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">نمای نمونه</span>
        </div>
        <div className="space-y-4 p-4 sm:p-5">
          <div className="rounded-2xl border border-border bg-background p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex gap-2"><span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">ثبت‌نام باز</span><span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-secondary-foreground">حضوری</span></div>
                <p className="mt-4 text-lg font-black">رقابت Valorant پنج‌نفره</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">اطلاعات این بخش برای نمایش ساختار تجربه میزبان است.</p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Swords className="h-6 w-6" aria-hidden="true" /></div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {stats.map((stat) => {
                const PreviewIcon = stat.icon;
                return <div key={stat.label} className="rounded-xl border border-border bg-card p-3"><PreviewIcon className="h-4 w-4 text-primary" aria-hidden="true" /><p className="mt-2 text-[11px] text-muted-foreground">{stat.label}</p><p className="mt-1 text-sm font-bold">{stat.value}</p></div>;
              })}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-4"><p className="text-xs text-muted-foreground">مرکز میزبان</p><p className="mt-1 text-sm font-bold">مرکز بازی آلفا</p><div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Gamepad2 className="h-4 w-4 text-primary" aria-hidden="true" />رقابت تیمی</div></div>
            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4"><p className="text-xs text-muted-foreground">ظرفیت نمونه</p><p className="mt-2 text-3xl font-black">۷۵٪</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-background" role="img" aria-label="ظرفیت نمونه ۷۵ درصد"><div className="h-full w-3/4 bg-primary" /></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContextStrip() {
  const items: CardItem[] = [
    { icon: Globe2, title: "ثبت‌نام آنلاین", description: "بازیکن مسابقه را آنلاین پیدا می‌کند و مسیر ثبت‌نام را طی می‌کند." },
    { icon: MapPin, title: "رقابت در مرکز", description: "اجرای مسابقه به‌صورت حضوری در مرکز میزبان انجام می‌شود." },
    { icon: UserRoundCheck, title: "مدیریت توسط میزبان", description: "میزبان جزئیات عملیاتی رقابت را متناسب با امکانات مرکز مدیریت می‌کند." },
  ];
  return <section aria-label="مدل میزبانی Turnoment" className="border-y border-border bg-card/40"><div className="mx-auto grid max-w-7xl divide-y divide-border px-4 sm:px-6 md:grid-cols-3 md:divide-y-0 lg:px-8">{items.map((item) => { const I = item.icon; return <div key={item.title} className="flex gap-4 py-6 md:px-6"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><I className="h-5 w-5" aria-hidden="true" /></div><div><h2 className="text-sm font-bold">{item.title}</h2><p className="mt-1.5 text-xs leading-6 text-muted-foreground">{item.description}</p></div></div>; })}</div></section>;
}

function HostControlPreview() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-2xl shadow-black/20">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4"><div><p className="text-sm font-bold">نمای مدیریت میزبان</p><p className="mt-1 text-[11px] text-muted-foreground">پیش‌نمایش تجربه محصول؛ اطلاعات نمایش‌داده‌شده نمونه هستند.</p></div><span className="rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-bold text-primary">نمای نمونه</span></div>
      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.35fr_.65fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-background p-5"><div className="flex flex-wrap justify-between gap-4"><div><span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">ثبت‌نام باز</span><h3 className="mt-4 text-lg font-black">جام آخرهفته CS2</h3><p className="mt-2 text-xs text-muted-foreground">جمعه، ساعت ۱۷:۳۰ • مرکز میزبان</p></div><CalendarDays className="h-6 w-6 text-primary" aria-hidden="true" /></div><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">{[["ظرفیت","۳۲ نفر"],["ثبت‌نام","۲۳ نفر"],["نوع","حضوری"],["وضعیت","فعال"]].map(([l,v]) => <div key={l} className="rounded-xl border border-border bg-card p-3"><p className="text-[11px] text-muted-foreground">{l}</p><p className="mt-2 text-sm font-black">{v}</p></div>)}</div></div>
          <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-border bg-background p-4"><p className="text-sm font-bold">برنامه مسابقه</p><div className="mt-4 space-y-3">{[["۱۷:۰۰","پذیرش شرکت‌کنندگان"],["۱۷:۳۰","شروع مرحله اول"],["۲۰:۰۰","مرحله پایانی"]].map(([t,l]) => <div key={t} className="flex gap-3 text-xs"><span className="w-12 font-bold text-primary">{t}</span><span className="text-muted-foreground">{l}</span></div>)}</div></div><div className="rounded-2xl border border-border bg-background p-4"><p className="text-sm font-bold">شرکت‌کنندگان</p><div className="mt-4 space-y-2">{["Arman.GG","Nova Player","Reza_X"].map((name, i) => <div key={name} className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2.5"><span dir="ltr" className="text-xs font-semibold">{name}</span><span className="text-xs text-primary">#{i+1}</span></div>)}</div></div></div>
        </div>
        <aside className="space-y-4"><div className="rounded-2xl border border-border bg-secondary/40 p-5"><MapPin className="h-5 w-5 text-primary" aria-hidden="true" /><p className="mt-4 text-xs text-muted-foreground">محل و بازی</p><p className="mt-1.5 text-sm font-black">مرکز میزبان • Counter-Strike 2</p></div><div className="rounded-2xl border border-primary/20 bg-primary/10 p-5"><ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" /><p className="mt-4 text-sm font-black">تمرکز روی اجرای مسابقه</p><p className="mt-2 text-xs leading-6 text-muted-foreground">Turnoment کشف و ثبت‌نام آنلاین را به تجربه حضوری مرکز متصل می‌کند.</p></div></aside>
      </div>
    </div>
  );
}

const inputClassName = "min-h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive/20";

function FormField({ id, label, hint, error, required, children }: { id: HostApplicationField; label: string; hint?: string; error?: string; required?: boolean; children: ReactNode }) {
  return <div><label htmlFor={id} className="mb-2 block text-sm font-bold">{label}{required ? <span className="mr-1 text-primary" aria-hidden="true">*</span> : null}</label>{children}{hint ? <p id={`${id}-hint`} className="mt-2 text-[11px] leading-5 text-muted-foreground">{hint}</p> : null}{error ? <p id={`${id}-error`} className="mt-2 text-xs leading-6 text-destructive">{error}</p> : null}</div>;
}

function HostApplicationForm({ onSubmit }: { onSubmit: HostPageProps["onSubmit"] }) {
  const [data, setData] = useState<HostApplicationDraft>(initialFormData);
  const [errors, setErrors] = useState<HostApplicationFieldErrors>({});
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const update = <K extends HostApplicationField>(field: K, value: HostApplicationDraft[K]) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => { if (!current[field]) return current; const next = { ...current }; delete next[field]; return next; });
    if (state !== "idle") { setState("idle"); setMessage(""); }
  };
  const describedBy = (field: HostApplicationField, hint = false) => [hint ? `${field}-hint` : "", errors[field] ? `${field}-error` : ""].filter(Boolean).join(" ") || undefined;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "submitting") return;
    const validation = validateHostApplicationDraft(data);
    if (!validation.success) { setErrors(validation.fieldErrors); setState("error"); setMessage("لطفاً موارد مشخص‌شده در فرم را بررسی و اصلاح کنید."); return; }
    setErrors({}); setState("submitting"); setMessage("");
    try {
      await onSubmit(validation.data);
      setState("success");
      setMessage("درخواست میزبانی برای بررسی دریافت شد. در صورت نیاز به اطلاعات بیشتر، از طریق شماره تماس ثبت‌شده با شما ارتباط گرفته می‌شود.");
    } catch (error) {
      setState("error");
      if (error instanceof HostApplicationSubmissionError && error.code === "rate_limited") setMessage("تعداد درخواست‌های ارسالی زیاد بوده است. کمی بعد دوباره تلاش کنید.");
      else if (error instanceof HostApplicationSubmissionError && error.code === "validation") setMessage("بعضی اطلاعات درخواست پذیرفته نشد. موارد فرم را بررسی و دوباره ارسال کنید.");
      else setMessage("در حال حاضر ارسال درخواست انجام نشد. اطلاعات واردشده را نگه داشته‌ایم؛ کمی بعد دوباره تلاش کنید.");
    }
  };

  const fields: Array<{ key: HostApplicationField; label: string; type?: string; inputMode?: "tel" | "numeric"; autoComplete?: string; placeholder: string }> = [
    { key: "venueName", label: "نام گیم‌نت / مرکز", autoComplete: "organization", placeholder: "مثلاً مرکز بازی آلفا" },
    { key: "managerName", label: "نام مدیر یا مسئول", autoComplete: "name", placeholder: "نام و نام خانوادگی" },
    { key: "phone", label: "شماره تماس", type: "tel", inputMode: "tel", autoComplete: "tel", placeholder: "09xxxxxxxxx" },
    { key: "city", label: "شهر", autoComplete: "address-level2", placeholder: "مثلاً تهران" },
    { key: "area", label: "منطقه / محدوده", autoComplete: "address-level3", placeholder: "مثلاً سعادت‌آباد" },
    { key: "stationCount", label: "تعداد سیستم یا کنسول", inputMode: "numeric", placeholder: "مثلاً ۲۴" },
    { key: "games", label: "بازی‌های قابل میزبانی", placeholder: "مثلاً Valorant، CS2، FC" },
  ];

  return (
    <form onSubmit={submit} noValidate className="rounded-[1.75rem] border border-border bg-card p-5 shadow-xl shadow-black/10 sm:p-7 lg:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => <div key={field.key} className={field.key === "venueName" ? "sm:col-span-2" : ""}><FormField id={field.key} label={field.label} required error={errors[field.key]}><input id={field.key} name={field.key} type={field.type ?? "text"} inputMode={field.inputMode} autoComplete={field.autoComplete} required value={data[field.key]} onChange={(e) => update(field.key, e.target.value)} aria-invalid={Boolean(errors[field.key])} aria-describedby={describedBy(field.key)} dir={field.key === "phone" ? "ltr" : undefined} className={`${inputClassName} ${field.key === "phone" ? "text-left" : ""}`} placeholder={field.placeholder} /></FormField></div>)}
        <div className="sm:col-span-2"><FormField id="description" label="توضیحات تکمیلی" hint="در صورت تمایل درباره فضای مرکز، تجهیزات یا تجربه برگزاری رقابت توضیح دهید." error={errors.description}><textarea id="description" name="description" rows={5} value={data.description} onChange={(e) => update("description", e.target.value)} aria-invalid={Boolean(errors.description)} aria-describedby={describedBy("description", true)} className={`${inputClassName} min-h-32 resize-y py-3`} placeholder="اطلاعاتی که به بررسی بهتر مرکز کمک می‌کند..." /></FormField></div>
      </div>
      <div className="mt-7 border-t border-border pt-6">
        {message ? <div role={state === "success" ? "status" : "alert"} aria-live="polite" className={`mb-5 rounded-xl border p-4 text-sm leading-7 ${state === "success" ? "border-success/35 bg-success/10" : "border-destructive/35 bg-destructive/10"}`}>{message}</div> : null}
        <button type="submit" disabled={state === "submitting" || state === "success"} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-black text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"><Send className="h-4 w-4" aria-hidden="true" />{state === "submitting" ? "در حال ارسال..." : state === "success" ? "درخواست دریافت شد" : "ارسال درخواست میزبانی"}</button>
        <p className="mt-4 max-w-2xl text-xs leading-6 text-muted-foreground">اطلاعات این فرم فقط برای بررسی درخواست میزبانی و برقراری ارتباط درباره آن استفاده می‌شود. ارسال فرم به‌معنای تأیید خودکار مرکز نیست.</p>
      </div>
    </form>
  );
}

function FAQAccordion() {
  const [open, setOpen] = useState(faqItems[0].id);
  return <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">{faqItems.map((item) => { const expanded = open === item.id; const panelId = `${item.id}-panel`; return <div key={item.id}><h3><button type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpen(expanded ? "" : item.id)} className="flex min-h-16 w-full items-center justify-between gap-4 px-4 py-4 text-right text-sm font-bold hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-6 sm:text-base"><span>{item.question}</span><ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" /></button></h3><div id={panelId} role="region" aria-hidden={!expanded} className={expanded ? "block" : "hidden"}><p className="px-4 pb-5 text-sm leading-7 text-muted-foreground sm:px-6 sm:pb-6">{item.answer}</p></div></div>; })}</div>;
}

export function HostLandingPage({ onSubmit }: HostPageProps) {
  const applicationHeadingId = useId();
  return (
    <main dir="rtl" lang="fa" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <section className="relative isolate overflow-hidden"><div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" /><div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:py-28"><div className="max-w-2xl"><p className="mb-5 inline-flex rounded-full border border-primary/20 bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary"><Trophy className="ml-2 h-4 w-4" aria-hidden="true" />میزبانی مسابقات در Turnoment</p><h1 className="text-4xl font-black leading-[1.35] tracking-tight sm:text-5xl lg:text-[3.5rem]">گیم‌نتت را به میزبان <span className="text-primary">رقابت‌های واقعی</span> تبدیل کن</h1><p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">Turnoment کشف مسابقه، نمایش اطلاعات و ثبت‌نام بازیکنان را به رقابت حضوری در مرکز شما متصل می‌کند تا تجربه میزبانی ساختاریافته و قابل مدیریت باشد.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><ActionLink href="#application">درخواست میزبانی<ArrowLeft className="h-4 w-4" aria-hidden="true" /></ActionLink><ActionLink href="#how-it-works" secondary>ببین چطور کار می‌کند<ChevronDown className="h-4 w-4" aria-hidden="true" /></ActionLink></div><p className="mt-8 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">ارسال درخواست، شروع فرایند بررسی است و به‌معنای تأیید خودکار میزبانی نیست.</p></div><HeroPreview /></div></section>
      <ContextStrip />

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="ابزارهای میزبانی" title="Turnoment چه چیزی به میزبان می‌دهد؟" description="از آماده‌سازی مسابقه تا دنبال‌کردن ظرفیت و ثبت‌نام، تجربه میزبانی حول یک جریان روشن طراحی می‌شود." /><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{benefits.map((item) => { const I = item.icon; return <article key={item.title} className="rounded-2xl border border-border bg-card p-5"><div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><I className="h-5 w-5" aria-hidden="true" /></div><h3 className="mt-5 text-base font-extrabold">{item.title}</h3><p className="mt-2.5 text-sm leading-7 text-muted-foreground">{item.description}</p></article>; })}</div></div></section>

      <section id="how-it-works" className="scroll-mt-24 border-y border-border bg-card/35 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="مسیر شروع" title="از درخواست تا اولین مسابقه" description="فرایند میزبانی مرحله‌به‌مرحله پیش می‌رود تا اطلاعات مرکز و شرایط اجرای رقابت پیش از انتشار بررسی شود." center /><ol className="mt-12 grid gap-4 lg:grid-cols-4">{processSteps.map((step) => { const I = step.icon; return <li key={step.number} className="rounded-2xl border border-border bg-background p-5"><div className="flex items-center justify-between"><div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary"><I className="h-5 w-5" aria-hidden="true" /></div><span className="text-xs font-black text-primary">مرحله {step.number}</span></div><h3 className="mt-5 font-extrabold">{step.title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p></li>; })}</ol><p className="mx-auto mt-8 max-w-2xl rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm leading-7 text-muted-foreground">تأیید میزبانی به اطلاعات مرکز و تناسب آن با شرایط اجرای رقابت وابسته است و صرفاً با ارسال درخواست انجام نمی‌شود.</p></div></section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><SectionHeading eyebrow="شرایط کلی" title="چه مرکزی برای میزبانی مناسب است؟" description="هدف، ایجاد رقابتی است که بازیکن در زمان اعلام‌شده وارد محیطی آماده، منظم و قابل اتکا شود." /><p className="mt-7 rounded-2xl border border-border bg-secondary/30 p-5 text-sm leading-7 text-muted-foreground">جزئیات نهایی شرایط میزبانی در مرحله بررسی اعلام می‌شود.</p></div><div className="grid gap-3 sm:grid-cols-2">{requirements.map((item) => { const I = item.icon; return <article key={item.title} className="rounded-2xl border border-border bg-card p-5"><div className="flex gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><I className="h-5 w-5" aria-hidden="true" /></div><div><h3 className="text-sm font-extrabold">{item.title}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{item.description}</p></div></div></article>; })}</div></div></section>

      <section className="border-y border-border bg-card/35 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="تجربه میزبان" title="اطلاعات مهم رقابت در یک جریان روشن" description="نمای میزبان می‌تواند مسابقه، ظرفیت، ثبت‌نام، زمان‌بندی و شرکت‌کنندگان را کنار هم قرار دهد." /><div className="mt-10"><HostControlPreview /></div></div></section>

      <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl rounded-[1.75rem] border border-border bg-card p-6 sm:p-10"><div className="grid items-center gap-8 lg:grid-cols-[auto_1fr]"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary"><Globe2 className="h-8 w-8" aria-hidden="true" /></div><div><h2 className="text-2xl font-black sm:text-3xl">رقابت آنلاین پیدا می‌شود؛ در دنیای واقعی اتفاق می‌افتد</h2><p className="mt-4 max-w-3xl text-sm leading-8 text-muted-foreground sm:text-base">مدل Turnoment کشف و ثبت‌نام آنلاین را به اجرای حضوری متصل می‌کند. گیم‌نت نقطه‌ای است که برنامه مسابقه، تجهیزات و تجربه واقعی رقابت در آن به هم می‌رسند.</p></div></div></div></section>

      <section id="application" aria-labelledby={applicationHeadingId} className="scroll-mt-24 border-y border-border bg-card/35 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.72fr_1.28fr]"><div><p className="mb-4 text-sm font-bold text-primary">درخواست میزبانی</p><h2 id={applicationHeadingId} className="text-2xl font-black sm:text-3xl lg:text-4xl">مرکزت را برای میزبانی معرفی کن</h2><p className="mt-4 text-sm leading-8 text-muted-foreground sm:text-base">چند اطلاعات پایه درباره مرکز و امکانات آن وارد کن تا امکان میزبانی برای مجموعه شما بررسی شود.</p><div className="mt-7 space-y-3 text-sm text-muted-foreground">{["فقط اطلاعات ضروری برای بررسی اولیه","بدون تعهد یا تأیید خودکار","امکان ادامه فرایند پس از بررسی اطلاعات"].map((x) => <p key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" aria-hidden="true" />{x}</p>)}</div></div><HostApplicationForm onSubmit={onSubmit} /></div></section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-4xl"><SectionHeading eyebrow="پرسش‌های متداول" title="قبل از ارسال درخواست" description="پاسخ چند سؤال رایج درباره روند بررسی و تجربه میزبانی در Turnoment." center /><div className="mt-10"><FAQAccordion /></div></div></section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24"><div className="mx-auto max-w-7xl rounded-[2rem] border border-primary/20 bg-primary/10 px-6 py-10 text-center sm:px-10 sm:py-12"><Trophy className="mx-auto h-7 w-7 text-primary" aria-hidden="true" /><h2 className="mt-6 text-2xl font-black sm:text-3xl lg:text-4xl">آماده‌ای میزبان رقابت بعدی باشی؟</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">اگر مرکزت فضای مناسب، تجهیزات قابل اتکا و تیمی آماده برای اجرای مسابقه دارد، درخواست میزبانی را برای بررسی ارسال کن.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><ActionLink href="#application">درخواست میزبانی<ArrowLeft className="h-4 w-4" aria-hidden="true" /></ActionLink><ActionLink href="/tournaments" secondary>مشاهده مسابقات<ArrowUpLeft className="h-4 w-4" aria-hidden="true" /></ActionLink></div></div></section>
    </main>
  );
}
