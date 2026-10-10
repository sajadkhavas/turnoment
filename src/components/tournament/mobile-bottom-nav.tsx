import { Link, useRouterState } from "@tanstack/react-router";
import {
    Gamepad2,
    House,
    MapPin,
    Medal,
    Trophy,
} from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
    { to: "/", label: "خانه", icon: House },
    { to: "/tournaments", label: "مسابقات", icon: Trophy },
    { to: "/games", label: "بازی‌ها", icon: Gamepad2 },
    { to: "/centers", label: "گیم‌نت", icon: MapPin },
    { to: "/ranking", label: "رتبه", icon: Medal },
] as const;

export function MobileBottomNav() {
    const pathname = useRouterState({
        select: (state) => state.location.pathname,
    });

    return (
        <nav
            aria-label="ناوبری سریع موبایل"
            className="fixed bottom-[calc(env(safe-area-inset-bottom)+14px)] left-1/2 z-50 w-[calc(100%-24px)] max-w-[430px] -translate-x-1/2 lg:hidden"
        >
            <div className="grid grid-cols-5 rounded-[26px] border border-white/10 bg-background/85 px-2 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.45),0_0_30px_rgba(124,58,237,0.08)] backdrop-blur-2xl">
                {items.map((item) => {
                    const Icon = item.icon;

                    const active =
                        item.to === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.to);

                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            aria-label={item.label}
                            className={cn(
                                "group relative flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-bold text-muted-foreground transition-all duration-200",
                                active &&
                                "bg-primary/10 text-primary",
                            )}
                        >
                            <span
                                className={cn(
                                    "grid h-8 w-8 place-items-center rounded-xl transition-all duration-200",
                                    active &&
                                    "-translate-y-0.5 bg-primary text-primary-foreground shadow-[0_7px_20px_rgba(124,58,237,0.35)]",
                                )}
                            >
                                <Icon className="h-[18px] w-[18px]" />
                            </span>

                            <span>{item.label}</span>

                            {active && (
                                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}