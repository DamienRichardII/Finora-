import type { MetadataRoute } from "next";
import { modules } from "@/content/modules";
import { site } from "@/content/site";

const routes = ["", "/formations", "/packs", "/ateliers", "/parrainage", "/a-propos", "/faq", "/contact", "/mentions-legales", "/confidentialite", "/cgv", "/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((r) => ({ url: `${site.url}${r}`, changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.7 })),
    ...modules.map((m) => ({ url: `${site.url}/formations/${m.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
