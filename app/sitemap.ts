import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date("2026-07-14"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/vitadraft/privacy`,
      lastModified: new Date("2026-07-13"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
