import type { MetadataRoute } from "next";
import { BRAND, conceptDir } from "@/config/brand";

export default function manifest(): MetadataRoute.Manifest {
  const icons = `${BRAND.assetsPath}/favicons/${conceptDir[BRAND.logoConcept]}`;
  const v = `?v=${BRAND.assetsVersion}`;
  return {
    name: `${BRAND.name} — ${BRAND.description}`,
    short_name: BRAND.name,
    description: BRAND.seo.description,
    lang: "fr",
    start_url: "/",
    display: "standalone",
    background_color: BRAND.colors.primary,
    theme_color: BRAND.colors.primary,
    icons: [
      { src: `${icons}/icon-192.png${v}`, sizes: "192x192", type: "image/png" },
      { src: `${icons}/icon-512.png${v}`, sizes: "512x512", type: "image/png" },
      { src: `${icons}/icon-maskable-512.png${v}`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
