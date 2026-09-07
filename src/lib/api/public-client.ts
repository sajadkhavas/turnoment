export type PublicQueryValue = string | number | boolean | null | undefined;

export interface PublicApiClient {
  get<T>(path: string, query?: Record<string, PublicQueryValue>): Promise<T>;
}

function normalizeBaseUrl(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}

export function getPublicApiBaseUrl(): string {
  // This is intentionally read inside a function instead of once at module scope.
  // It is public configuration, never a secret.
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) {
    throw new Error("VITE_API_BASE_URL is required when the Django HTTP adapter is enabled.");
  }
  return normalizeBaseUrl(configured);
}

export function createPublicApiClient(baseUrlProvider = getPublicApiBaseUrl): PublicApiClient {
  return {
    async get<T>(path: string, query: Record<string, PublicQueryValue> = {}): Promise<T> {
      const baseUrl = baseUrlProvider();
      const url = new URL(path.replace(/^\//, ""), baseUrl);

      for (const [key, value] of Object.entries(query)) {
        if (value === undefined || value === null || value === "") continue;
        url.searchParams.set(key, String(value));
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Public API request failed with HTTP ${response.status}.`);
      }

      return (await response.json()) as T;
    },
  };
}
