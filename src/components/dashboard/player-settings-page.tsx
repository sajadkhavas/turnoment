import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BellRing,
  CheckCircle2,
  Gamepad2,
  LockKeyhole,
  RotateCcw,
  Save,
  ShieldCheck,
  Swords,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import type {
  OptionalNotificationPreferences,
  PlayerSettings,
} from "@/lib/player-settings-contract";

export type SettingsMutationMessage = {
  tone: "success" | "error";
  text: string;
} | null;

type OptionalPreferenceKey = keyof OptionalNotificationPreferences;

const optionalRows: Array<{
  key: OptionalPreferenceKey;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    key: "tournament",
    title: "اعلان‌های تورنومنت",
    description: "ثبت‌نام، زمان‌بندی و تغییرات مهم تورنومنت‌هایی که به حساب تو مربوط‌اند.",
    icon: Trophy,
  },
  {
    key: "match",
    title: "اعلان‌های Match",
    description: "زمان Match، ثبت نتیجه و تغییرات مهم مرتبط با مسابقه‌های تو.",
    icon: Gamepad2,
  },
  {
    key: "challenge",
    title: "اعلان‌های چالش",
    description: "دعوت‌ها و تغییرات مهم چالش‌ها، بدون تغییر خودکار وضعیت خود چالش.",
    icon: Swords,
  },
];

function PreferenceRow({
  item,
  checked,
  disabled,
  onCheckedChange,
}: {
  item: (typeof optionalRows)[number];
  checked: boolean;
  disabled: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  const Icon = item.icon;
  const controlId = `preference-${item.key}`;
  const descriptionId = `${controlId}-description`;

  return (
    <div className="flex items-start gap-3 border-b border-border/70 py-4 last:border-b-0 sm:gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <label htmlFor={controlId} className="cursor-pointer text-sm font-black sm:text-base">
          {item.title}
        </label>
        <p id={descriptionId} className="mt-1 max-w-2xl text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">
          {item.description}
        </p>
      </div>
      <Switch
        id={controlId}
        dir="ltr"
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        aria-describedby={descriptionId}
        aria-label={item.title}
        className="mt-1 h-6 w-11 data-[state=checked]:bg-primary [&>span]:h-5 [&>span]:w-5 data-[state=checked]:[&>span]:translate-x-5"
      />
    </div>
  );
}

function RequiredNoticeRow({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-border/70 py-4 last:border-b-0 sm:gap-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-success/10 text-success" aria-hidden="true">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-black sm:text-base">{title}</h3>
          <span className="inline-flex items-center gap-1 rounded-full border border-success/25 bg-success/10 px-2 py-1 text-[10px] font-black text-success">
            <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> همیشه فعال
          </span>
        </div>
        <p className="mt-1 max-w-2xl text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">{description}</p>
      </div>
    </div>
  );
}

function samePreferences(a: OptionalNotificationPreferences, b: OptionalNotificationPreferences) {
  return a.tournament === b.tournament && a.match === b.match && a.challenge === b.challenge;
}

export function PlayerSettingsPage({
  settings,
  saving,
  mutationMessage,
  onSave,
}: {
  settings: PlayerSettings;
  saving: boolean;
  mutationMessage: SettingsMutationMessage;
  onSave: (preferences: OptionalNotificationPreferences) => void;
}) {
  const [draft, setDraft] = useState<OptionalNotificationPreferences>({ ...settings.optional });

  useEffect(() => {
    setDraft({ ...settings.optional });
  }, [settings]);

  const dirty = useMemo(() => !samePreferences(draft, settings.optional), [draft, settings.optional]);

  const setPreference = (key: OptionalPreferenceKey, checked: boolean) => {
    setDraft((current) => ({ ...current, [key]: checked }));
  };

  const resetDraft = () => setDraft({ ...settings.optional });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dirty || saving) return;
    onSave({ ...draft });
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <header className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold text-primary">داشبورد بازیکن</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">تنظیمات اعلان‌ها</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
              مشخص کن برای رویدادهای اختیاری مسابقه‌ها چه اعلان‌هایی دریافت کنی؛ پیام‌های ضروری حساب و سامانه همیشه فعال می‌مانند.
            </p>
          </div>
          <Link
            to="/dashboard/notifications"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-elevated px-4 text-xs font-bold transition-colors hover:border-primary/45 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <BellRing className="h-4 w-4" aria-hidden="true" />
            صندوق اعلان‌ها
          </Link>
        </div>
      </header>

      {mutationMessage ? (
        <div
          role={mutationMessage.tone === "error" ? "alert" : "status"}
          aria-live={mutationMessage.tone === "error" ? "assertive" : "polite"}
          className={`rounded-xl border p-3 text-xs font-bold leading-6 sm:text-sm ${
            mutationMessage.tone === "success"
              ? "border-success/35 bg-success/10 text-success"
              : "border-destructive/35 bg-destructive/10 text-destructive"
          }`}
        >
          {mutationMessage.text}
        </div>
      ) : null}

      <form onSubmit={submit} className="space-y-5 sm:space-y-6" aria-label="تنظیمات اعلان‌های بازیکن">
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6" aria-labelledby="optional-notices-title">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
              <BellRing className="h-5 w-5" />
            </span>
            <div>
              <h2 id="optional-notices-title" className="text-base font-black sm:text-lg">اعلان‌های رقابتی اختیاری</h2>
              <p className="mt-1 max-w-2xl text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">
                هر موضوع را مستقل روشن یا خاموش کن. این انتخاب فقط روی اعلان‌های اختیاری آینده اثر دارد و اعلان‌های قبلی صندوق را پاک نمی‌کند.
              </p>
            </div>
          </div>

          <div className="mt-3">
            {optionalRows.map((item) => (
              <PreferenceRow
                key={item.key}
                item={item}
                checked={draft[item.key]}
                disabled={saving}
                onCheckedChange={(checked) => setPreference(item.key, checked)}
              />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6" aria-labelledby="required-notices-title">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-success/10 text-success" aria-hidden="true">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h2 id="required-notices-title" className="text-base font-black sm:text-lg">اعلان‌های ضروری</h2>
              <p className="mt-1 max-w-2xl text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">
                پیام‌های مرتبط با امنیت حساب و اطلاع‌رسانی‌های ضروری سامانه برای حفاظت از حساب و شفافیت عملیات خاموش نمی‌شوند.
              </p>
            </div>
          </div>

          <div className="mt-3">
            <RequiredNoticeRow
              title="حساب و امنیت"
              description="هشدارهای ورود، امنیت حساب و تغییرات مهم هویتی که باید به خود بازیکن برسند."
              icon={LockKeyhole}
            />
            <RequiredNoticeRow
              title="پیام‌های ضروری سامانه"
              description="اطلاع‌رسانی‌های ضروری عملیاتی یا سیاستی که برای استفاده امن و درست از پلتفرم لازم‌اند."
              icon={ShieldCheck}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6" aria-labelledby="save-settings-title">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="save-settings-title" className="text-sm font-black">ثبت انتخاب‌ها</h2>
              <p className="mt-1 text-xs leading-6 text-muted-foreground" aria-live="polite">
                {dirty
                  ? "تغییر ذخیره‌نشده داری. پس از بررسی، انتخاب‌ها را ذخیره کن."
                  : "انتخاب‌های نمایش‌داده‌شده با آخرین نسخه ثبت‌شده هماهنگ‌اند."}
              </p>
            </div>
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <button
                type="button"
                onClick={resetDraft}
                disabled={!dirty || saving}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-elevated px-4 text-sm font-bold text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-45"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                بازگردانی
              </button>
              <button
                type="submit"
                disabled={!dirty || saving}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save className="h-4 w-4" aria-hidden="true" />
                {saving ? "در حال ذخیره..." : "ذخیره تنظیمات"}
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-elevated ${className}`} />;
}

export function PlayerSettingsSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-live="polite" aria-label="در حال بارگذاری تنظیمات">
      <SkeletonBar className="h-36 w-full" />
      <SkeletonBar className="h-72 w-full" />
      <SkeletonBar className="h-56 w-full" />
      <SkeletonBar className="h-28 w-full" />
    </div>
  );
}

export function PlayerSettingsErrorState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-border bg-card p-8 text-center sm:p-10" role="alert">
      <AlertTriangle className="h-8 w-8 text-warning" aria-hidden="true" />
      <h1 className="mt-4 text-base font-black">تنظیمات بارگذاری نشد</h1>
      <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
        دریافت آخرین تنظیمات انجام نشد. دوباره تلاش کن؛ انتخابی بدون تأیید ذخیره نمی‌شود.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        تلاش دوباره
      </button>
    </div>
  );
}
