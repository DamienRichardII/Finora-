import type { LucideIcon } from "lucide-react";
import { BookOpen, Wallet, PiggyBank, Landmark, LineChart, FileText, Building2, Compass } from "lucide-react";

/** Programme provisoire des huit modules. Titres définitifs à fournir par Chris. */
export type Module = {
  number: number;
  slug: string;
  title: string;
  summary: string;
  objectives: string[];
  icon: LucideIcon;
};

export const modules: Module[] = [
  {
    number: 1,
    slug: "fondamentaux-education-financiere",
    title: "Les fondamentaux de l'éducation financière",
    summary: "Comprendre les mécanismes de l'argent et les notions financières essentielles.",
    objectives: ["Le vocabulaire financier de base", "Revenus, dépenses, actifs et passifs", "Le rôle de l'inflation et des taux"],
    icon: BookOpen,
  },
  {
    number: 2,
    slug: "gerer-son-budget",
    title: "Apprendre à gérer son budget",
    summary: "Identifier ses dépenses, organiser ses revenus et construire un budget.",
    objectives: ["Faire le point sur ses dépenses", "Choisir une méthode de budget", "Suivre son budget dans la durée"],
    icon: Wallet,
  },
  {
    number: 3,
    slug: "epargne-securite-financiere",
    title: "Épargne et sécurité financière",
    summary: "Comprendre les différents mécanismes d'épargne et la constitution d'une réserve financière.",
    objectives: ["Pourquoi et comment épargner", "Constituer une épargne de précaution", "Comparer les grandes familles d'épargne"],
    icon: PiggyBank,
  },
  {
    number: 4,
    slug: "credits-et-dettes",
    title: "Comprendre les crédits et les dettes",
    summary: "Comprendre les taux, les intérêts, les emprunts et les risques liés à l'endettement.",
    objectives: ["Lire une offre de crédit", "Taux, TAEG et coût total", "Prévenir le surendettement"],
    icon: Landmark,
  },
  {
    number: 5,
    slug: "fondamentaux-investissement",
    title: "Les fondamentaux de l'investissement",
    summary: "Découvrir les grandes catégories d'investissement, leur fonctionnement et leurs risques.",
    objectives: ["Le couple rendement et risque", "Les grandes classes d'actifs", "Horizon de placement et diversification"],
    icon: LineChart,
  },
  {
    number: 6,
    slug: "comprendre-la-fiscalite",
    title: "Comprendre la fiscalité",
    summary: "Introduire les principales notions fiscales applicables aux finances personnelles.",
    objectives: ["Les bases de l'impôt sur le revenu", "Fiscalité de l'épargne : les notions clés", "S'organiser pour ses déclarations"],
    icon: FileText,
  },
  {
    number: 7,
    slug: "construire-son-patrimoine",
    title: "Construire son patrimoine",
    summary: "Comprendre la diversification, la protection et la gestion patrimoniale.",
    objectives: ["Qu'est-ce qu'un patrimoine", "Diversifier et protéger", "Les étapes de la vie et le patrimoine"],
    icon: Building2,
  },
  {
    number: 8,
    slug: "strategie-financiere-long-terme",
    title: "Élaborer sa stratégie financière à long terme",
    summary: "Structurer ses objectifs et construire une feuille de route financière personnelle.",
    objectives: ["Définir des objectifs financiers clairs", "Prioriser et planifier", "Construire sa feuille de route"],
    icon: Compass,
  },
];

export const getModule = (slug: string) => modules.find((m) => m.slug === slug);
