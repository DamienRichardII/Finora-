/**
 * Ateliers datés (table `workshops`, phase 7). Vide tant que le planning réel
 * n'est pas publié : la page affiche alors les thématiques ci-dessous.
 */
export type Workshop = {
  slug: string;
  title: string;
  theme: string;
  startsAt: string; // ISO, fuseau Europe/Paris
  durationMinutes: number;
  format: "En ligne" | "Présentiel";
  seatsLeft: number;
  seatsTotal: number;
  priceCents: number; // 0 = inclus dans le pack
};

export const workshops: Workshop[] = [];

/** Thématiques d'ateliers présentées sans date (aucun planning inventé). */
export const workshopThemes = [
  { theme: "Budget", title: "Construire son budget", text: "Faire le point sur ses dépenses et mettre en place une méthode simple à tenir." },
  { theme: "Épargne", title: "Mettre en place son épargne de précaution", text: "Définir le bon montant et choisir où placer sa réserve de sécurité." },
  { theme: "Crédit", title: "Lire et comparer une offre de crédit", text: "Comprendre le TAEG, le coût total et les points de vigilance avant de signer." },
];

const tz = "Europe/Paris";
export const formatWorkshopDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: tz }).format(new Date(iso));
export const formatWorkshopTime = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date(iso));
export const formatDuration = (min: number) => (min % 60 === 0 ? `${min / 60} h` : `${Math.floor(min / 60)} h ${min % 60}`);
