import type { MetadataRoute } from "next"

// Edit SITE_URL if you ever move off nyova.xyz.
const SITE_URL = "https://nyova.xyz"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
