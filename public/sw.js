const VERSION = "turnoment-pwa-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // Network behavior remains unchanged for now.
});

self.addEventListener("push", (event) => {
  let payload;
  try { payload = event.data.json(); } catch { return; }
  event.waitUntil(self.registration.showNotification(payload.title || "Turnoment", {
    body: payload.body || "", tag: payload.tag,
    icon: "/brand/turnoment-logo.png", data: { url: payload.url },
  }));
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  let target = new URL("/dashboard/notifications", self.location.origin);
  try {
    const requested = new URL(event.notification.data.url, self.location.origin);
    if (requested.origin === self.location.origin) target = requested;
  } catch {}
  event.waitUntil(self.clients.openWindow(target.href));
});
