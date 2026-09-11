import { createFileRoute } from "@tanstack/react-router";
import { DashboardSectionPlaceholder } from "@/components/dashboard/dashboard-section-placeholder";

export const Route = createFileRoute("/dashboard/notifications")({
  head: () => ({ meta: [{ title: "اعلان‌ها — داشبورد بازیکن" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: () => <DashboardSectionPlaceholder title="اعلان‌ها" />,
});
