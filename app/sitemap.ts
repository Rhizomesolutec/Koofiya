import type { MetadataRoute } from "next";
import { getAllBusinessSlugs } from "@/lib/data/businesses";
import { siteConfig } from "@/lib/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const businessRoutes = getAllBusinessSlugs().map((slug) => ({
    url: `${base}/businesses/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/businesses`, changeFrequency: "weekly", priority: 0.9 },
    ...businessRoutes,
    { url: `${base}/dry-fruits`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
