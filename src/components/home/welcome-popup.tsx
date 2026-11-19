import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigationSession } from "@/lib/use-account-navigation";

const artwork = "/brand/tournomatch-intro.webp";
const fallbackArtwork = "/brand/turnoment-logo.png";
const seenKey = "tournomatch:welcome:v1";
let shown = false;

export function WelcomePopup() {
  const session = useNavigationSession(true);
  if (!session.isFetchedAfterMount || !session.isSuccess || session.data.state !== "unauthenticated") {
    return null;
  }
  return <GuestWelcomeDialog />;
}

function GuestWelcomeDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [finished, setFinished] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [image, setImage] = useState(artwork);
  const videoSrc = import.meta.env.VITE_WELCOME_VIDEO_URL?.trim() || "/brand/tournomatch-welcome.mp4";

  useEffect(() => {
    const element = dialog.current;
    if (!element || shown || typeof element.showModal !== "function") return;
    try {
      if (sessionStorage.getItem(seenKey)) return;
    } catch {
      // The in-memory flag still prevents repeat opens.
    }

    let expiry: number | undefined;
    const opening = window.setTimeout(() => {
      element.showModal();
      const media = video.current;
      if (media) {
        media.src = videoSrc;
        void media.play().catch(() => {
          if (!element.open) return;
          media.muted = true;
          return media.play().catch(() => {
            if (element.open) setFinished(true);
          });
        });
      }
      shown = true;
      try {
        sessionStorage.setItem(seenKey, "1");
      } catch {
        // Closing remains available without storage.
      }
      expiry = window.setTimeout(() => element.close(), 30_000);
    }, 0);

    return () => {
      window.clearTimeout(opening);
      window.clearTimeout(expiry);
      video.current?.pause();
      if (element.open) element.close();
    };
  }, [videoSrc]);

  return (
    <dialog
      ref={dialog}
      dir="rtl"
      aria-labelledby="welcome-popup-title"
      onClose={() => video.current?.pause()}
      className="m-auto max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-2xl border border-primary/30 bg-background p-5 font-sans text-foreground shadow-2xl backdrop:bg-black/75 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 id="welcome-popup-title" className="pt-2 text-xl font-black">به تورنومچ خوش اومدی!</h2>
        <button type="button" aria-label="بستن پیام خوش‌آمد" onClick={() => dialog.current?.close()}
          className="grid size-11 shrink-0 place-items-center rounded-xl border border-border hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      <video
        ref={video}
        playsInline
        preload="none"
        poster={artwork}
        onContextMenu={(event) => event.preventDefault()}
        onPlay={() => setPlaying(true)}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        onEnded={() => setFinished(true)}
        onError={() => setFinished(true)}
        aria-label="ویدیوی معرفی تورنومچ"
        className={`mt-4 max-h-[58dvh] w-full rounded-xl bg-black ${finished ? "hidden" : ""}`}
      />
      {playing && !finished && (
        <button type="button" className="mt-2 rounded-lg border border-border px-3 py-2 text-sm"
          onClick={() => {
            const media = video.current;
            if (!media) return;
            media.muted = !media.muted;
            if (!media.muted && media.paused) {
              void media.play().catch(() => { media.muted = true; });
            }
          }}>
          {muted ? "روشن‌کردن صدا" : "قطع صدا"}
        </button>
      )}
      {finished && (
        <div className="mt-3">
          <img src={image} alt="لوگوی تورنومچ" onError={() => setImage(fallbackArtwork)}
            className="mx-auto max-h-[42dvh] max-w-full rounded-xl object-contain" />
          <div className="mt-3 space-y-1 text-center">
            <p className="text-lg font-black sm:text-xl">تورنومچ فراتر از مسابقس</p>
            <p className="text-sm font-bold text-primary">اینجا هویت خودتو بساز</p>
          </div>
        </div>
      )}
      <Link to="/tournaments" onClick={() => dialog.current?.close()}
        className="mt-4 flex min-h-11 items-center justify-center rounded-xl bg-primary px-3 text-center text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        مشاهده مسابقات
      </Link>
    </dialog>
  );
}
