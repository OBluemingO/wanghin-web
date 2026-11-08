import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/clinic";
import { clips } from "@/lib/videos";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/videos`, changeFrequency: "weekly", priority: 0.8 },
    ...clips.map((c) => ({ url: `${SITE_URL}/videos/${c.slug}`, lastModified: new Date(c.date), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
