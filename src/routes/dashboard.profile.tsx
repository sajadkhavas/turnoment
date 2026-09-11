import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/profile")({
  component: Profile,
});

function Profile() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black">پروفایل من</h1>
      <form className="space-y-4 rounded-2xl border border-border bg-card p-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="نام و نام خانوادگی" value="علی محمدی" />
          <Field label="ایمیل" value="ali@example.com" />
          <Field label="شماره موبایل" value="09123456789" />
          <Field label="تاریخ تولد" value="۱۳۷۵/۰۵/۱۲" />
        </div>
        <h2 className="pt-4 text-sm font-bold">تغییر رمز عبور</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="رمز فعلی" type="password" />
          <Field label="رمز جدید" type="password" />
        </div>
        <button type="submit" className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:glow-violet-strong">ذخیره تغییرات</button>
      </form>
    </div>
  );
}

function Field({ label, value, type = "text" }: { label: string; value?: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-muted-foreground">{label}</span>
      <input type={type} defaultValue={value} className="w-full rounded-lg border border-border bg-elevated px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
    </label>
  );
}
