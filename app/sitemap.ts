import type { MetadataRoute } from "next";

const siteUrl = "https://hakandemir.com.tr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-06-13"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/vitadraft/privacy`,
      lastModified: new Date("2026-07-13"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
