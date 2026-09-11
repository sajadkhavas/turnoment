import {
  gamingCenterDetailSchema,
  gamingCenterPublicIdSchema,
  type GamingCenterDetailData,
  type GamingCenterDetailRepository,
} from "./gaming-center-detail-contract";

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) {
    throw new Error("VITE_API_BASE_URL is required for the production gaming center detail adapter.");
  }
  return configured.endsWith("/") ? configured : `${configured}/`;
}

export class DjangoGamingCenterDetailRepository implements GamingCenterDetailRepository {
  async getByPublicId(publicId: string): Promise<GamingCenterDetailData | null> {
    const validatedPublicId = gamingCenterPublicIdSchema.parse(publicId);
    const url = new URL(`api/v1/centers/${encodeURIComponent(validatedPublicId)}/`, apiBaseUrl());

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (response.status === 404) return null;
    if (!response.ok) {
      throw new Error(`Gaming center detail request failed with HTTP ${response.status}.`);
    }

    const parsed = gamingCenterDetailSchema.parse(await response.json());
    if (parsed.publicId !== validatedPublicId) {
      throw new Error("Gaming center detail publicId does not match the requested canonical identifier.");
    }
    return parsed;
  }
}
