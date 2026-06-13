import Particles, { ParticlesProvider, useParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { useEffect, useState, type ReactNode } from "react";

const OPTIONS: ISourceOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  fullScreen: { enable: false },
  particles: {
    number: { value: 60, density: { enable: true } },
    color: { value: ["#7c3aed", "#06b6d4", "#a855f7"] },
    shape: { type: "circle" },
    opacity: { value: { min: 0.1, max: 0.45 }, animation: { enable: true, speed: 1, sync: false } },
    size: { value: { min: 1, max: 2.5 } },
    links: { enable: true, distance: 130, color: "#7c3aed", opacity: 0.18, width: 1 },
    move: { enable: true, speed: 0.7, direction: "none", random: true, outModes: { default: "bounce" } },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: "grab" } },
    modes: { grab: { distance: 140, links: { opacity: 0.55 } } },
  },
  detectRetina: true,
};

const init = async (engine: Engine) => {
  await loadSlim(engine);
};

function ParticlesInner({ className }: { className: string }) {
  const { loaded } = useParticlesProvider();
  if (!loaded) return null;
  return <Particles id="ima-particles" options={OPTIONS} className={className} />;
}

export function ParticlesBackground({ className = "" }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;
    setEnabled(true);
  }, []);
  if (!enabled) return null;
  return (
    <ProviderWrapper>
      <ParticlesInner className={`pointer-events-none absolute inset-0 ${className}`} />
    </ProviderWrapper>
  );
}

function ProviderWrapper({ children }: { children: ReactNode }) {
  return <ParticlesProvider init={init}>{children}</ParticlesProvider>;
}
