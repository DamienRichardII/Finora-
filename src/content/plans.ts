/**
 * Packs commerciaux. ⚠ Tarifs et prestations = HYPOTHÈSES DE DÉMONSTRATION,
 * non validées par Chris. Aucune commercialisation réelle sans validation.
 * Phase 6 : lus depuis les tables `plans` / `plan_entitlements`, prix Stripe.
 */
export type Plan = {
  slug: "decouverte" | "essentiel" | "premium";
  name: string;
  tagline: string;
  priceCents: number;
  interval: "month" | "year" | "one_time";
  features: string[];
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    slug: "decouverte",
    name: "Pack Découverte",
    tagline: "Pour poser des bases solides",
    priceCents: 2900,
    interval: "month",
    features: ["Accès aux huit modules vidéo", "Ressources pédagogiques", "Espace personnel"],
  },
  {
    slug: "essentiel",
    name: "Pack Essentiel",
    tagline: "Pour progresser avec un cadre",
    priceCents: 4900,
    interval: "month",
    highlighted: true,
    features: ["Tous les avantages du Pack Découverte", "Ateliers collectifs", "Accès aux replays", "Support complémentaire"],
  },
  {
    slug: "premium",
    name: "Pack Premium",
    tagline: "Pour aller plus loin",
    priceCents: 7900,
    interval: "month",
    features: [
      "Tous les avantages du Pack Essentiel",
      "Sessions collectives approfondies",
      "Ressources supplémentaires",
      "Accompagnement pédagogique renforcé",
    ],
  },
];

export const intervalLabel = { month: "/mois", year: "/an", one_time: "" } as const;
export const getPlan = (slug: string | null | undefined) => plans.find((p) => p.slug === slug);
