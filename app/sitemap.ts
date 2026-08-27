import type { MetadataRoute } from "next"

// Edit SITE_URL if you ever move off nyova.xyz. Add a new entry here
// any time you add a new public page you want search engines to index.
const SITE_URL = "https://nyova.xyz"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/feedback", "/policy", "/tos", "/contact"]

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }))
}
