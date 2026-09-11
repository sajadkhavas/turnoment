import { SlidersHorizontal, X } from "lucide-react";
import {
  type TournamentDiscoveryPageData,
  type TournamentDiscoveryQuery,
} from "@/lib/tournament-discovery-contract";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type TournamentDiscoveryPatch = Partial<TournamentDiscoveryQuery>;

type ControlsProps = {
  query: TournamentDiscoveryQuery;
  filters: TournamentDiscoveryPageData["filters"];
  onUpdate: (patch: TournamentDiscoveryPatch) => void;
  onReset: () => void;
};

const dateOptions = [
  { value: "", label: "همه تاریخ‌ها" },
  { value: "today", label: "امروز" },
  { value: "tomorrow", label: "فردا" },
  { value: "weekend", label: "آخر هفته" },
  { value: "week", label: "این هفته" },
];

const statusOptions = [
  { value: "", label: "همه وضعیت‌ها" },
  { value: "open", label: "ثبت‌نام باز" },
  { value: "filling", label: "ظرفیت رو به تکمیل" },
  { value: "closed", label: "ثبت‌نام بسته" },
  { value: "upcoming", label: "ثبت‌نام به‌زودی" },
];

const formatOptions = [
  { value: "", label: "همه فرمت‌ها" },
  { value: "1v1", label: "۱ نفره (1v1)" },
  { value: "team", label: "تیمی" },
  { value: "single-elim", label: "حذفی تک‌حذفی" },
  { value: "double-elim", label: "دوحذفی" },
  { value: "round-robin", label: "لیگ گروهی" },
];

const priceOptions = [
  { value: "", label: "همه هزینه‌ها" },
  { value: "free", label: "رایگان" },
  { value: "lt300", label: "کمتر از ۳۰۰ هزار تومان" },
  { value: "300-500", label: "۳۰۰ تا ۵۰۰ هزار تومان" },
  { value: "gt500", label: "بیش از ۵۰۰ هزار تومان" },
];

const sortOptions = [
  { value: "suggested", label: "پیشنهادی" },
  { value: "soonest", label: "نزدیک‌ترین زمان" },
  { value: "limited", label: "کمترین ظرفیت باقی‌مانده" },
  { value: "cheapest", label: "کمترین هزینه" },
  { value: "prize", label: "بیشترین جایزه ثابت" },
];

const selectClass =
  "min-h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring";

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="min-w-0">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className={selectClass}>
        {options.map((option) => (
          <option key={option.value || "all"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function gameOptions(filters: TournamentDiscoveryPageData["filters"]) {
  return [{ value: "", label: "همه بازی‌ها" }, ...filters.games.map((game) => ({ value: game.gameId, label: game.name }))];
}

function cityOptions(filters: TournamentDiscoveryPageData["filters"]) {
  return [{ value: "", label: "همه شهرها" }, ...filters.cities.map((city) => ({ value: city.value, label: city.label }))];
}

export function TournamentFinder({ query, filters, onUpdate }: Omit<ControlsProps, "onReset">) {
  return (
    <section aria-labelledby="primary-filters-title" className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-4">
        <h2 id="primary-filters-title" className="text-base font-black">مسابقه مناسب را پیدا کن</h2>
        <p className="mt-1 text-xs leading-6 text-muted-foreground">بازی، شهر یا زمان را تغییر بده؛ فهرست بر اساس همان انتخاب دوباره بارگذاری می‌شود.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <SelectField label="بازی" value={query.game ?? ""} options={gameOptions(filters)} onChange={(game) => onUpdate({ game: game || undefined })} />
        <SelectField label="شهر" value={query.city ?? ""} options={cityOptions(filters)} onChange={(city) => onUpdate({ city: city || undefined })} />
        <SelectField label="زمان برگزاری" value={query.date ?? ""} options={dateOptions} onChange={(date) => onUpdate({ date: (date || undefined) as TournamentDiscoveryQuery["date"] })} />
      </div>
    </section>
  );
}

function AdvancedFields({ query, onUpdate }: Pick<ControlsProps, "query" | "onUpdate">) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <SelectField label="وضعیت ثبت‌نام" value={query.status ?? ""} options={statusOptions} onChange={(status) => onUpdate({ status: (status || undefined) as TournamentDiscoveryQuery["status"] })} />
      <SelectField label="فرمت مسابقه" value={query.format ?? ""} options={formatOptions} onChange={(format) => onUpdate({ format: (format || undefined) as TournamentDiscoveryQuery["format"] })} />
      <SelectField label="هزینه ثبت‌نام" value={query.price ?? ""} options={priceOptions} onChange={(price) => onUpdate({ price: (price || undefined) as TournamentDiscoveryQuery["price"] })} />
      <label className="flex min-h-11 items-center justify-between self-end rounded-xl border border-border bg-background px-3 text-sm focus-within:ring-2 focus-within:ring-ring">
        <span>فقط مرکزهای تأییدشده</span>
        <input
          type="checkbox"
          checked={query.verified}
          onChange={(event) => onUpdate({ verified: event.target.checked })}
          className="h-5 w-5 accent-primary"
        />
      </label>
    </div>
  );
}

export function AdvancedTournamentFilters({ query, onUpdate, onReset }: ControlsProps) {
  return (
    <div className="mt-4">
      <div className="hidden rounded-2xl border border-border bg-card p-4 md:block">
        <AdvancedFields query={query} onUpdate={onUpdate} />
      </div>

      <div className="flex gap-2 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button type="button" className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
              فیلترهای بیشتر
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[90vw] overflow-y-auto sm:max-w-md" dir="rtl">
            <SheetHeader className="text-right">
              <SheetTitle>فیلتر مسابقات</SheetTitle>
              <SheetDescription>نتایج را بر اساس وضعیت ثبت‌نام، فرمت، هزینه و تأیید مرکز محدود کن.</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <AdvancedFields query={query} onUpdate={onUpdate} />
              <button type="button" onClick={onReset} className="min-h-11 w-full rounded-xl border border-border px-4 text-sm font-bold text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                پاک کردن همه فیلترها
              </button>
            </div>
          </SheetContent>
        </Sheet>

        <label className="min-w-[150px] flex-1">
          <span className="sr-only">مرتب‌سازی مسابقات</span>
          <select value={query.sort} onChange={(event) => onUpdate({ sort: event.target.value as TournamentDiscoveryQuery["sort"] })} className={selectClass} aria-label="مرتب‌سازی مسابقات">
            {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>
    </div>
  );
}

type FilterChipKey = "game" | "city" | "date" | "status" | "format" | "price" | "verified";

function optionLabel(options: { value: string; label: string }[], value?: string) {
  return options.find((option) => option.value === value)?.label ?? value ?? "";
}

function clearPatch(key: FilterChipKey): TournamentDiscoveryPatch {
  if (key === "verified") return { verified: false };
  if (key === "game") return { game: undefined };
  if (key === "city") return { city: undefined };
  if (key === "date") return { date: undefined };
  if (key === "status") return { status: undefined };
  if (key === "format") return { format: undefined };
  return { price: undefined };
}

export function ResultsToolbar({ query, filters, count, onUpdate, onReset }: ControlsProps & { count: number }) {
  const chips: Array<{ key: FilterChipKey; label: string }> = [];
  if (query.game) chips.push({ key: "game", label: optionLabel(gameOptions(filters), query.game) });
  if (query.city) chips.push({ key: "city", label: optionLabel(cityOptions(filters), query.city) });
  if (query.date) chips.push({ key: "date", label: optionLabel(dateOptions, query.date) });
  if (query.status) chips.push({ key: "status", label: optionLabel(statusOptions, query.status) });
  if (query.format) chips.push({ key: "format", label: optionLabel(formatOptions, query.format) });
  if (query.price) chips.push({ key: "price", label: optionLabel(priceOptions, query.price) });
  if (query.verified) chips.push({ key: "verified", label: "مرکز تأییدشده" });

  return (
    <div className="mt-7 flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="font-mono-num text-sm font-bold" aria-live="polite">{count.toLocaleString("fa-IR")} مسابقه مطابق فیلترها</p>
        {chips.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2" aria-label="فیلترهای فعال">
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() => onUpdate(clearPatch(chip.key))}
                className="inline-flex min-h-9 items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 text-xs font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`حذف فیلتر ${chip.label}`}
              >
                {chip.label}
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ))}
            <button type="button" onClick={onReset} className="min-h-9 rounded-lg px-2 text-xs font-bold text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              پاک کردن همه
            </button>
          </div>
        )}
      </div>

      <label className="hidden w-56 lg:block">
        <span className="mb-1.5 block text-xs text-muted-foreground">مرتب‌سازی</span>
        <select value={query.sort} onChange={(event) => onUpdate({ sort: event.target.value as TournamentDiscoveryQuery["sort"] })} className={selectClass}>
          {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
    </div>
  );
}
