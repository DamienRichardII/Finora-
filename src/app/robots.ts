import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/espace", "/admin", "/api", "/connexion", "/inscription", "/paiement"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
