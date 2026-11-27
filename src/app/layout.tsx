import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";
import "./globals.css";
import { site } from "@/content/site";

// Polices auto-hébergées (aucun appel à un serveur tiers : conforme RGPD).
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "FINORA Academy | Formation en éducation financière en ligne",
    template: "%s | FINORA Academy",
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
    title: "FINORA Academy | Maîtrisez votre argent, construisez votre avenir",
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "FINORA Academy" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#101F2C",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
