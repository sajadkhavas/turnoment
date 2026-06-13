export function GlitchText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`} aria-label={children}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 text-secondary mix-blend-screen"
        style={{ animation: "glitch-1 3.2s infinite linear alternate-reverse" }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 text-primary mix-blend-screen"
        style={{ animation: "glitch-2 2.4s infinite linear alternate-reverse" }}
      >
        {children}
      </span>
    </span>
  );
}
