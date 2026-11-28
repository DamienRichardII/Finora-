import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";
import "./globals.css";
import { site } from "@/content/site";
import { BRAND } from "@/config/brand";

// Polices auto-hébergées (aucun appel à un serveur tiers : conforme RGPD).
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: BRAND.seo.title,
    template: `%s | ${BRAND.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "éducation financière",
    "formation éducation financière",
    "apprendre à gérer son argent",
    "formation finances personnelles",
    "apprendre à gérer son budget",
    "comprendre l'épargne",
    "comprendre l'investissement",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: BRAND.seo.title,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${BRAND.name}, ${BRAND.description.toLowerCase()}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.seo.title,
    description: site.description,
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: BRAND.colors.primary,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full" suppressHydrationWarning>
      <head>
        {/* Active les animations d'apparition seulement si JavaScript s'exécute */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
