export type DataAdapterMode = "mock" | "api";

/**
 * Resolve the public data adapter deliberately.
 *
 * - Local development/test defaults to deterministic mock data.
 * - Production defaults to the real HTTP API so it can never silently serve mock data.
 * - Explicit mock remains available for production-like pre-backend acceptance builds.
 * - Unknown/legacy adapter names fail closed instead of silently changing behavior.
 */
export function resolveDataAdapterMode(
  rawValue: string | undefined,
  isProduction: boolean,
): DataAdapterMode {
  const normalized = rawValue?.trim().toLowerCase();

  if (normalized === "mock") return "mock";
  if (normalized === "api") return "api";

  if (!normalized) {
    return isProduction ? "api" : "mock";
  }

  throw new Error(
    `Unsupported VITE_DATA_ADAPTER="${rawValue}". Expected "mock" or "api".`,
  );
}

export function getDataAdapterMode(): DataAdapterMode {
  return resolveDataAdapterMode(
    import.meta.env.VITE_DATA_ADAPTER,
    import.meta.env.PROD,
  );
}
