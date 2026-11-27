import type { Metadata } from "next";
import { LegalPage, Todo } from "@/components/site/legal-page";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" } };

export default function Page() {
  return (
    <LegalPage title="Mentions légales" updated="27 novembre 2026">
      <h2>Éditeur du site</h2>
      <p>
        Le site FINORA Academy est édité par <Todo>dénomination sociale</Todo>, <Todo>forme juridique</Todo> au capital de <Todo>montant</Todo> €, immatriculée au RCS de <Todo>ville</Todo> sous le numéro <Todo>SIREN</Todo>, dont le siège social est situé <Todo>adresse</Todo>.
      </p>
      <p>
        Directeur de la publication : <Todo>nom du responsable</Todo>. Contact : <Todo>adresse e-mail professionnelle</Todo>. Numéro de TVA intracommunautaire : <Todo>numéro ou mention d&apos;exonération</Todo>.
      </p>
      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <Todo>hébergeur, par exemple Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</Todo>.
      </p>
      <h2>Conception et développement</h2>
      <p>Site conçu et développé par DamCompany.</p>
      <h2>Nature de l&apos;activité</h2>
      <p>
        FINORA Academy propose des contenus d&apos;éducation financière à vocation pédagogique et informative. FINORA Academy n&apos;est ni une banque, ni un établissement financier agréé, et ne fournit pas de conseil en investissement personnalisé. Les contenus ne constituent pas, par eux-mêmes, une recommandation d&apos;investissement personnalisée. Tout investissement comporte des risques, notamment un risque de perte en capital.
      </p>
      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus du site (textes, vidéos, logos, visuels, ressources pédagogiques) est protégé par le droit de la propriété intellectuelle. Toute reproduction ou diffusion sans autorisation écrite préalable est interdite.
      </p>
      <h2>Données personnelles</h2>
      <p>Le traitement des données personnelles est décrit dans la politique de confidentialité.</p>
    </LegalPage>
  );
}
