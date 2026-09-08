import type { LinkProps } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Trophy,
  Swords,
  Flame,
  Users,
  Medal,
  Bell,
  Settings,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";

export interface DashboardNavItem {
  to: LinkProps["to"];
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

export const dashboardNav: DashboardNavItem[] = [
  { to: "/dashboard", label: "نمای کلی", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/tournaments", label: "مسابقات من", icon: Trophy },
  { to: "/dashboard/matches", label: "Matchهای من", icon: Gamepad2 },
  { to: "/dashboard/challenges", label: "چالش‌ها", icon: Swords },
  { to: "/dashboard/rivalries", label: "رقابت‌ها", icon: Flame },
  { to: "/dashboard/teams", label: "تیم‌ها", icon: Users },
  { to: "/dashboard/achievements", label: "دستاوردها", icon: Medal },
  { to: "/dashboard/notifications", label: "اعلان‌ها", icon: Bell },
  { to: "/dashboard/settings", label: "تنظیمات", icon: Settings },
];
