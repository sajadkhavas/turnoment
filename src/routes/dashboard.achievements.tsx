import { createFileRoute } from "@tanstack/react-router";
import { DashboardSectionPlaceholder } from "@/components/dashboard/dashboard-section-placeholder";

export const Route = createFileRoute("/dashboard/achievements")({
  head: () => ({ meta: [{ title: "دستاوردها — داشبورد بازیکن" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: () => <DashboardSectionPlaceholder title="دستاوردها" />,
});
