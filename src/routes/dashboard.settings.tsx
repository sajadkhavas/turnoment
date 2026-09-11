import { useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import {
  PlayerSettingsErrorState,
  PlayerSettingsPage,
  PlayerSettingsSkeleton,
  type SettingsMutationMessage,
} from "@/components/dashboard/player-settings-page";
import type { OptionalNotificationPreferences, PlayerSettings } from "@/lib/player-settings-contract";
import { playerSettingsRepository } from "@/lib/player-settings-repository";

export const Route = createFileRoute("/dashboard/settings")({
  loader: async () => {
    const result = await playerSettingsRepository.getSettings();
    if (result.state !== "authenticated") {
      throw redirect({
        to: "/login",
        search: { redirect: "/dashboard/settings" },
      });
    }
    return result.data;
  },
  head: () => ({
    meta: [
      { title: "تنظیمات اعلان‌ها — داشبورد بازیکن" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  pendingComponent: PlayerSettingsSkeleton,
  errorComponent: PlayerSettingsErrorState,
  component: PlayerSettingsRoute,
});

function PlayerSettingsRoute() {
  const loadedSettings = Route.useLoaderData();
  const navigate = useNavigate({ from: Route.fullPath });
  const [settings, setSettings] = useState<PlayerSettings>(loadedSettings);
  const [saving, setSaving] = useState(false);
  const [mutationMessage, setMutationMessage] = useState<SettingsMutationMessage>(null);

  const expireSession = () => {
    void navigate({
      to: "/login",
      search: { redirect: "/dashboard/settings" },
      replace: true,
    });
  };

  const handleSave = async (optional: OptionalNotificationPreferences) => {
    if (saving) return;
    setSaving(true);
    setMutationMessage(null);

    try {
      const action = await playerSettingsRepository.saveSettings({
        revision: settings.revision,
        optional,
      });

      if (action.outcome === "session_expired") {
        expireSession();
        return;
      }

      if (action.outcome === "stale") {
        setSettings(action.settings);
        setMutationMessage({ tone: "error", text: action.message });
        return;
      }

      setSettings(action.settings);
      setMutationMessage({ tone: "success", text: "تنظیمات اعلان‌ها با موفقیت ذخیره شد." });
    } catch {
      setMutationMessage({
        tone: "error",
        text: "ذخیره تنظیمات انجام نشد. انتخاب‌هایت حفظ شده‌اند؛ دوباره تلاش کن.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <PlayerSettingsPage
      settings={settings}
      saving={saving}
      mutationMessage={mutationMessage}
      onSave={(optional) => void handleSave(optional)}
    />
  );
}
