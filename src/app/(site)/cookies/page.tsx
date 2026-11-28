import { BRAND } from "@/config/brand";
import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { ConsentControls } from "./consent-controls";

export const metadata: Metadata = { title: "Gestion des cookies", alternates: { canonical: "/cookies" } };

export default function Page() {
  return (
    <LegalPage title="Gestion des cookies" updated="27 novembre 2026">
      <p>Un cookie est un petit fichier déposé sur votre appareil lors de la consultation d&apos;un site. {BRAND.name} limite leur usage au strict nécessaire.</p>
      <h2>Cookies nécessaires</h2>
      <p>Indispensables au fonctionnement du site (session de connexion à l&apos;espace adhérent, sécurité, mémorisation de votre choix de consentement). Ils ne nécessitent pas votre accord.</p>
      <h2>Mesure d&apos;audience</h2>
      <p>Aucun outil de mesure d&apos;audience n&apos;est actif à ce jour. Si un tel outil est ajouté, il ne sera activé qu&apos;avec votre accord.</p>
      <h2>Votre choix</h2>
      <ConsentControls />
    </LegalPage>
  );
}
