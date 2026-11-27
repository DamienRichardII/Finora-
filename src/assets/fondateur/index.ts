import bureau from "./fondateur-bureau.webp";
import portrait from "./fondateur-portrait.webp";
import type { StaticImageData } from "next/image";

export type FounderPhoto = {
  src: StaticImageData;
  alt: string;
  /** "cover" : photo plein cadre ; "cutout" : détourée, posée sur un fond ivoire. */
  variant: "cover" | "cutout";
};

export const photosFondateur = {
  bureau: { src: bureau, alt: "Le fondateur de FINORA Academy, assis à son bureau", variant: "cover" },
  portrait: { src: portrait, alt: "Portrait du fondateur de FINORA Academy", variant: "cutout" },
} satisfies Record<string, FounderPhoto>;
