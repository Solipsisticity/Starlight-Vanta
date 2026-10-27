import { SITE_URL } from "@/lib/pageMeta";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/saved", "/settings", "/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
