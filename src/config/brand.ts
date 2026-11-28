import type { ConceptId } from "@/components/brand/symbols";

/**
 * Configuration de marque centralisée : seul endroit où le nom, les accroches
 * et le concept de logo sont définis. Les couleurs sont dupliquées en tokens
 * CSS dans src/app/globals.css (Tailwind) : garder les deux synchronisés.
 *
 * Ne pas renommer ici les identifiants techniques historiques (clé de
 * consentement « finora-consent-v1 », nom du paquet, URLs) : voir
 * docs/REBRANDING_PLENTY.md.
 */
export const BRAND = {
  name: "Plenty",
  tagline: "Comprendre. Maîtriser. Construire.",
  /** Variante marketing proposée, à valider par le client avant tout usage. */
  taglineAlt: "Le savoir au service de la liberté.",
  headline: "Maîtrisez votre argent, construisez votre avenir.",
  description: "Votre plateforme d'éducation financière",
  descriptor: "Éducation financière",
  seo: {
    title: "Plenty — Votre plateforme d'éducation financière",
    description:
      "Apprenez à gérer votre argent, comprendre l'épargne et l'investissement, et construire votre avenir financier avec Plenty. Découvrez nos formations, modules vidéo et ateliers.",
  },
  /** Concept de logo affiché sur le site, en attente du choix du client. */
  logoConcept: "freedom" as ConceptId,
  /** Dossier des fichiers de marque générés par `npm run brand`. */
  assetsPath: "/branding/plenty",
  emailSignature: "L'équipe Plenty\nComprendre. Maîtriser. Construire.",
  colors: {
    primary: "#101F2C",
    accent: "#D4B77A",
    background: "#F7F5EF",
    white: "#FFFFFF",
    dark: "#08131F",
    muted: "#64748B",
  },
} as const;

/** Dossier d'un concept dans public/branding/plenty. */
export const conceptDir: Record<ConceptId, string> = {
  freedom: "concept-01-freedom",
  wisdom: "concept-02-wisdom",
  heritage: "concept-03-heritage",
};
