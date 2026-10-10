import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
}

type NavigatorWithStandalone = Navigator & {
    standalone?: boolean;
};

export function PwaInstallPrompt() {
    const [installEvent, setInstallEvent] =
        useState<BeforeInstallPromptEvent | null>(null);

    const [visible, setVisible] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/sw.js").catch((error) => {
                console.error("Service worker registration failed:", error);
            });
        }

        const standalone =
            window.matchMedia("(display-mode: standalone)").matches ||
            Boolean((navigator as NavigatorWithStandalone).standalone);

        if (standalone) {
            return;
        }

        const ios =
            /iphone|ipad|ipod/i.test(navigator.userAgent) &&
            !("MSStream" in window);

        setIsIOS(ios);

        const alreadyShown = sessionStorage.getItem(
            "turnoment-install-prompt-shown",
        );

        if (ios && !alreadyShown) {
            const timer = window.setTimeout(() => {
                setVisible(true);
                sessionStorage.setItem(
                    "turnoment-install-prompt-shown",
                    "1",
                );
            }, 1800);

            return () => window.clearTimeout(timer);
        }

        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();

            const promptEvent = event as BeforeInstallPromptEvent;

            setInstallEvent(promptEvent);

            if (!alreadyShown) {
                window.setTimeout(() => {
                    setVisible(true);
                    sessionStorage.setItem(
                        "turnoment-install-prompt-shown",
                        "1",
                    );
                }, 1800);
            }
        };

        const handleInstalled = () => {
            setVisible(false);
            setInstallEvent(null);
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt,
        );

        window.addEventListener("appinstalled", handleInstalled);

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt,
            );

            window.removeEventListener(
                "appinstalled",
                handleInstalled,
            );
        };
    }, []);

    async function install() {
        if (!installEvent) return;

        await installEvent.prompt();

        const choice = await installEvent.userChoice;

        if (choice.outcome === "accepted") {
            setVisible(false);
        }

        setInstallEvent(null);
    }

    if (!visible) return null;

    return (
        <div
            dir="rtl"
            className="fixed inset-x-3 bottom-4 z-[9999] mx-auto max-w-md"
        >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#100626]/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
                <button
                    type="button"
                    onClick={() => setVisible(false)}
                    aria-label="بستن"
                    className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="flex items-start gap-3 pl-8">
                    <img
                        src="/android-chrome-192x192.png"
                        alt="Turnoment"
                        className="h-14 w-14 shrink-0 rounded-2xl"
                    />

                    <div>
                        <h2 className="text-base font-extrabold text-white">
                            نصب اپلیکیشن Turnoment
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-white/60">
                            Turnoment را روی گوشی نصب کن و مثل یک اپلیکیشن
                            مستقیم اجرا کن.
                        </p>
                    </div>
                </div>

                {isIOS ? (
                    <div className="mt-4 rounded-xl bg-white/5 p-3 text-sm leading-7 text-white/75">
                        <div className="flex items-center gap-2 font-bold text-white">
                            <Share className="h-4 w-4" />
                            نصب در آیفون
                        </div>

                        <p className="mt-1">
                            در Safari روی Share بزن و سپس
                            <strong className="mx-1 text-white">
                                Add to Home Screen
                            </strong>
                            را انتخاب کن.
                        </p>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={install}
                        disabled={!installEvent}
                        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 font-bold text-white transition hover:bg-violet-500 disabled:cursor-wait disabled:opacity-50"
                    >
                        <Download className="h-4 w-4" />
                        نصب برنامه
                    </button>
                )}
            </div>
        </div>
    );
}