import { INDEXABLE_ROUTES, SITE_URL } from "@/lib/pageMeta";

export default function sitemap() {
  const lastModified = new Date();
  return INDEXABLE_ROUTES.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "/" : route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
