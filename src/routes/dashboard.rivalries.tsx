import { createFileRoute } from "@tanstack/react-router";
import { DashboardSectionPlaceholder } from "@/components/dashboard/dashboard-section-placeholder";

export const Route = createFileRoute("/dashboard/rivalries")({
  head: () => ({ meta: [{ title: "رقابت‌ها — داشبورد بازیکن" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: () => <DashboardSectionPlaceholder title="رقابت‌ها" />,
});
