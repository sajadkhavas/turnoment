import { createFileRoute } from "@tanstack/react-router";
import { DashboardSectionPlaceholder } from "@/components/dashboard/dashboard-section-placeholder";

export const Route = createFileRoute("/dashboard/challenges")({
  head: () => ({ meta: [{ title: "چالش‌ها — داشبورد بازیکن" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: () => <DashboardSectionPlaceholder title="چالش‌ها" />,
});
