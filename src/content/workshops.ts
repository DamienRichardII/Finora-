/**
 * Ateliers. ⚠ Exemples de démonstration : dates, thèmes et tarifs fictifs,
 * à remplacer par le planning réel de Chris (table `workshops`, phase 7).
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
  demo: boolean;
};

export const workshops: Workshop[] = [
  {
    slug: "construire-son-premier-budget",
    title: "Construire son premier budget",
    theme: "Budget",
    startsAt: "2027-01-14T19:00:00+01:00",
    durationMinutes: 90,
    format: "En ligne",
    seatsLeft: 18,
    seatsTotal: 25,
    priceCents: 0,
    demo: true,
  },
  {
    slug: "epargne-de-precaution",
    title: "Mettre en place son épargne de précaution",
    theme: "Épargne",
    startsAt: "2027-01-28T19:00:00+01:00",
    durationMinutes: 90,
    format: "En ligne",
    seatsLeft: 22,
    seatsTotal: 25,
    priceCents: 1500,
    demo: true,
  },
  {
    slug: "comprendre-son-credit",
    title: "Lire et comparer une offre de crédit",
    theme: "Crédit",
    startsAt: "2027-02-11T18:30:00+01:00",
    durationMinutes: 120,
    format: "Présentiel",
    seatsLeft: 9,
    seatsTotal: 12,
    priceCents: 2500,
    demo: true,
  },
];

const tz = "Europe/Paris";
export const formatWorkshopDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: tz }).format(new Date(iso));
export const formatWorkshopTime = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date(iso));
export const formatDuration = (min: number) => (min % 60 === 0 ? `${min / 60} h` : `${Math.floor(min / 60)} h ${min % 60}`);
