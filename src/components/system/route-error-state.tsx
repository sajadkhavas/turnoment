import { AlertTriangle, RotateCcw } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

interface RouteErrorStateProps {
  title?: string;
  description?: string;
}

export function RouteErrorState({
  title = "بارگذاری این بخش با مشکل روبه‌رو شد",
  description = "دوباره تلاش کن. اگر مشکل ادامه داشت، بعداً این بخش را دوباره باز کن.",
}: RouteErrorStateProps) {
  const router = useRouter();

  return (
    <section className="container mx-auto px-4 py-20" role="alert">
      <div className="mx-auto max-w-xl rounded-3xl border border-danger/30 bg-card p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-danger/10 text-danger">
          <AlertTriangle className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="mt-4 text-xl font-black">{title}</h1>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>
        <button
          type="button"
          onClick={() => void router.invalidate()}
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          تلاش دوباره
        </button>
      </div>
    </section>
  );
}
