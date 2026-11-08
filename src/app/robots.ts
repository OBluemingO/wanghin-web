import type { MetadataRoute } from "next";
import { DEMO, SITE_URL } from "@/lib/clinic";

export default function robots(): MetadataRoute.Robots {
  if (DEMO) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: "/proposal" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
