import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#120d0b",
    theme_color: "#e9a75f",
    lang: siteConfig.language,
    categories: ["portfolio", "developer", "technology"],
    icons: [
      {
        src: "/brand/hd-logo-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/hd-logo-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
