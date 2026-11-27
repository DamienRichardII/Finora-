/**
 * Contenus éditoriaux du site public.
 * Phase 4+ : ces données seront lues depuis la table `site_settings` (Supabase)
 * et modifiables depuis l'espace administrateur. Les champs `null` sont des
 * informations à fournir par le client : ils ne sont jamais inventés.
 */
export const site = {
  name: "FINORA Academy",
  slogan: "Comprendre. Maîtriser. Construire.",
  tagline: "Maîtrisez votre argent, construisez votre avenir.",
  description:
    "FINORA Academy, académie en ligne d'éducation financière : des formations vidéo, des ateliers et des cours pour apprendre à gérer son budget, comprendre l'épargne et découvrir l'investissement.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Version de démonstration : affiche un bandeau et identifie les contenus fictifs. */
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
  contact: {
    email: null as string | null, // à fournir par Chris
    phone: null as string | null,
    address: null as string | null,
  },
  /** Réseaux sociaux : vides tant que le client ne les a pas communiqués. */
  socials: [] as { label: string; href: string }[],
  disclaimer:
    "Les contenus proposés par FINORA Academy ont une vocation éducative et informative. Ils ne constituent pas, par eux-mêmes, une recommandation d'investissement personnalisée. Tout investissement comporte des risques, notamment un risque de perte en capital.",
  /** Photo du hero : chemin dans /public une fois une photographie sous licence fournie. */
  heroImage: null as string | null,
  founder: {
    firstName: "Chris",
    photo: null as string | null,
    experience: "Trois ans et demi d'expérience dans le domaine financier.",
    bio: null as string | null,
    diplomas: [] as string[], // uniquement des diplômes vérifiés
  },
};

export const mainNav = [
  { label: "Accueil", href: "/" },
  { label: "Formations", href: "/formations" },
  { label: "Packs et tarifs", href: "/packs" },
  { label: "Ateliers", href: "/ateliers" },
  { label: "Parrainage", href: "/parrainage" },
  { label: "À propos", href: "/a-propos" },
] as const;

export const legalNav = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "CGV", href: "/cgv" },
  { label: "Cookies", href: "/cookies" },
] as const;
