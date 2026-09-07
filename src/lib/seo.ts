export interface PublicSeoInput {
  title: string;
  description: string;
  canonical: string;
  ogType?: "website" | "article";
}

export function publicSeoHead({
  title,
  description,
  canonical,
  ogType = "website",
}: PublicSeoInput) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

export function privateNoindexHead(title: string, description?: string) {
  return {
    meta: [
      { title },
      ...(description ? [{ name: "description", content: description }] : []),
      { name: "robots", content: "noindex, nofollow" },
    ],
  };
}
