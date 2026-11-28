import { BRAND } from "@/config/brand";
/** FAQ — réponses provisoires à valider par Chris (table `site_settings` / FAQ en phase 7). */
export const faq = [
  {
    q: "À qui s'adressent les formations ?",
    a: "À toute personne qui souhaite mieux comprendre et mieux gérer son argent : étudiants, jeunes actifs, familles, indépendants. Les formations partent des bases et avancent progressivement.",
  },
  {
    q: "Faut-il déjà avoir des connaissances financières ?",
    a: "Non. Le premier module pose les fondamentaux et chaque notion est expliquée simplement, avec des exemples concrets du quotidien.",
  },
  {
    q: "Comment accéder aux vidéos ?",
    a: "Après votre inscription et la confirmation de votre paiement, les modules inclus dans votre pack sont disponibles dans votre espace adhérent, sur ordinateur, tablette et smartphone. Votre progression est sauvegardée.",
  },
  {
    q: "Combien de temps dure la formation ?",
    a: "La formation est composée de huit modules à suivre à votre rythme. La durée exacte de chaque module sera précisée à la publication des vidéos.",
  },
  {
    q: "Comment fonctionnent les ateliers ?",
    a: "Les ateliers sont des sessions collectives, en ligne ou en présentiel, sur une thématique précise. Le nombre de places est limité : vous réservez votre place depuis la page Ateliers ou votre espace adhérent.",
  },
  {
    q: "Comment fonctionne le parrainage ?",
    a: "Chaque adhérent dispose d'un code et d'un lien de parrainage personnels. Lorsqu'un proche s'inscrit avec votre lien et que son inscription est confirmée, une récompense peut être attribuée selon les conditions du programme en vigueur.",
  },
  {
    q: "Quels moyens de paiement sont acceptés ?",
    a: `Le paiement est prévu par carte bancaire via une plateforme sécurisée (Stripe), ainsi que par Apple Pay et Google Pay selon la compatibilité de votre appareil. ${BRAND.name} ne stocke jamais vos données bancaires.`,
  },
];
