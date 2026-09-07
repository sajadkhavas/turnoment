import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  cityOptions,
  dateFilterOptions,
  formatOptions,
  gameOptions,
  priceOptions,
  sortOptions,
  statusOptions,
  type TournamentQuery,
} from "@/lib/tournament-data";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type DiscoverySearch = Partial<TournamentQuery>;

type UpdateSearch = (patch: Partial<DiscoverySearch>) => void;

type ControlsProps = {
  query: TournamentQuery;
  onUpdate: UpdateSearch;
  onReset: () => void;
};

const selectClass = "h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary";

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (value: string) => void }) {
  return (
    <label className="min-w-0">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={selectClass}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}

export function TournamentFinder({ query, onUpdate }: Omit<ControlsProps, "onReset">) {
  return (
    <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
      <SelectField label="بازی" value={query.game} options={gameOptions} onChange={(game) => onUpdate({ game })} />
      <SelectField label="شهر" value={query.city} options={cityOptions} onChange={(city) => onUpdate({ city })} />
      <SelectField label="تاریخ" value={query.date} options={dateFilterOptions} onChange={(date) => onUpdate({ date })} />
      <button type="button" onClick={() => onUpdate({})} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong">
        <Search className="h-4 w-4" />پیدا کردن مسابقه
      </button>
    </div>
  );
}

function AdvancedFields({ query, onUpdate }: Pick<ControlsProps, "query" | "onUpdate">) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <SelectField label="وضعیت ثبت‌نام" value={query.status} options={statusOptions} onChange={(status) => onUpdate({ status })} />
      <SelectField label="فرمت مسابقه" value={query.format} options={formatOptions} onChange={(format) => onUpdate({ format })} />
      <SelectField label="هزینه" value={query.price} options={priceOptions} onChange={(price) => onUpdate({ price })} />
      <label className="flex h-11 items-center justify-between self-end rounded-xl border border-border bg-background px-3 text-sm">
        <span>فقط گیم‌نت‌های تأییدشده</span>
        <input
          type="checkbox"
          checked={query.verified}
          onChange={(e) => onUpdate({ verified: e.target.checked })}
          className="h-4 w-4 accent-primary"
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
            <button type="button" className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-bold">
              <SlidersHorizontal className="h-4 w-4 text-primary" />فیلترهای بیشتر
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[90vw] overflow-y-auto sm:max-w-md" dir="rtl">
            <SheetHeader className="text-right">
              <SheetTitle>فیلتر مسابقات</SheetTitle>
              <SheetDescription>نتایج را بر اساس وضعیت، فرمت، هزینه و تأیید گیم‌نت محدود کن.</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-3">
              <AdvancedFields query={query} onUpdate={onUpdate} />
              <button type="button" onClick={onReset} className="h-11 w-full rounded-xl border border-border text-sm font-bold text-muted-foreground">پاک کردن همه فیلترها</button>
            </div>
          </SheetContent>
        </Sheet>

        <label className="min-w-[150px] flex-1">
          <span className="sr-only">مرتب‌سازی</span>
          <select value={query.sort} onChange={(e) => onUpdate({ sort: e.target.value })} className={selectClass} aria-label="مرتب‌سازی مسابقات">
            {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>
    </div>
  );
}

const chipLabels = {
  game: gameOptions,
  city: cityOptions,
  date: dateFilterOptions,
  status: statusOptions,
  format: formatOptions,
  price: priceOptions,
} as const;

export function ResultsToolbar({ query, count, onUpdate, onReset }: ControlsProps & { count: number }) {
  const chips = (Object.keys(chipLabels) as Array<keyof typeof chipLabels>)
    .filter((key) => query[key] !== "all")
    .map((key) => ({
      key,
      label: chipLabels[key].find((item) => item.value === query[key])?.label ?? String(query[key]),
    }));

  if (query.verified) chips.push({ key: "verified" as never, label: "گیم‌نت تأییدشده" });

  return (
    <div className="mt-7 flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="font-mono-num text-sm font-bold">{count.toLocaleString("fa-IR")} مسابقه پیدا شد</p>
        {chips.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {chips.map((chip) => (
              <button
                key={`${chip.key}-${chip.label}`}
                type="button"
                onClick={() => chip.key === "verified" ? onUpdate({ verified: false }) : onUpdate({ [chip.key]: "all" })}
                className="inline-flex h-8 items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 text-xs font-bold text-primary"
              >
                {chip.label}<X className="h-3 w-3" />
              </button>
            ))}
            <button type="button" onClick={onReset} className="text-xs font-bold text-muted-foreground hover:text-foreground">پاک کردن همه</button>
          </div>
        )}
      </div>

      <label className="hidden w-52 lg:block">
        <span className="mb-1.5 block text-xs text-muted-foreground">مرتب‌سازی</span>
        <select value={query.sort} onChange={(e) => onUpdate({ sort: e.target.value })} className={selectClass}>
          {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
    </div>
  );
}
