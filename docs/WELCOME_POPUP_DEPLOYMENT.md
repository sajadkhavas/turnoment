# Welcome popup release check

Keep the current production welcome media when building the next release. Before
building, copy these existing files from the active frontend source release
(`/srv/turnoment/releases/frontend-7afc6f7` when inspected) to the corresponding
locations under the new release:

- `public/brand/tournomatch-intro.webp`
- `public/brand/tournomatch-welcome.mp4`, unless
  `VITE_WELCOME_VIDEO_URL` points to the deployed video.

Verify paths and file sizes before building. Do not copy the old component over the
new source. The repo contains a fallback logo if the intro artwork cannot load.

On the staged deployment, open home in a fresh private browser session. The
popup should appear once, show only the tournaments CTA, close on Escape or
after 30 seconds, and switch to logo artwork after playing. Sign in and reopen
home in a new tab: the popup must not render. On a simulated failed session
request, home remains usable without opening the popup.
