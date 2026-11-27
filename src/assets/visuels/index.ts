import type { StaticImageData } from "next/image";
import globe from "./bureau-globe-livre.webp";
import graphiques from "./bureau-graphiques-calculatrice.webp";
import tirelire from "./tirelire-enveloppes-budget.webp";
import maison from "./maison-documents-credit.webp";
import croissance from "./ordinateur-croissance.webp";

/** Visuels d'ambiance (natures mortes, aucune personne représentée). */
export type Visual = { src: StaticImageData; alt: string };

export const visuels = {
  globe: { src: globe, alt: "Bureau élégant avec globe doré, livre ouvert sur des graphiques et pièces d'or" },
  graphiques: { src: graphiques, alt: "Ordinateur affichant des graphiques financiers, calculatrice et carnet de notes sur un bureau en marbre" },
  tirelire: { src: tirelire, alt: "Tirelire dorée, enveloppes de budget et pièces sur un bureau" },
  maison: { src: maison, alt: "Petite maison dorée, documents financiers, calculatrice et stylo sur un bureau" },
  croissance: { src: croissance, alt: "Ordinateur portable affichant une courbe de croissance, piles de pièces et carnet" },
} satisfies Record<string, Visual>;
