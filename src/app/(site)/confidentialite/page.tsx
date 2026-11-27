import type { Metadata } from "next";
import { LegalPage, Todo } from "@/components/site/legal-page";

export const metadata: Metadata = { title: "Politique de confidentialité", alternates: { canonical: "/confidentialite" } };

export default function Page() {
  return (
    <LegalPage title="Politique de confidentialité" updated="27 novembre 2026">
      <p>FINORA Academy attache une grande importance à la protection de vos données personnelles, traitées conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.</p>
      <h2>Responsable du traitement</h2>
      <p>
        <Todo>dénomination sociale et adresse</Todo>, joignable à <Todo>adresse e-mail de contact RGPD</Todo>.
      </p>
      <h2>Données collectées et finalités</h2>
      <ul>
        <li>Création et gestion de votre compte adhérent (identité, e-mail, mot de passe chiffré) : exécution du contrat.</li>
        <li>Commandes, abonnements et facturation (historique de paiements, factures) : exécution du contrat et obligations légales. Les données de carte bancaire sont traitées exclusivement par notre prestataire de paiement Stripe et ne sont jamais stockées par FINORA Academy.</li>
        <li>Suivi pédagogique (progression, notes personnelles, réservations d&apos;ateliers) : exécution du contrat.</li>
        <li>Messagerie et demandes de contact : intérêt légitime à vous répondre.</li>
        <li>Newsletter : consentement, retirable à tout moment.</li>
        <li>Mesure d&apos;audience : uniquement avec votre consentement.</li>
      </ul>
      <h2>Durées de conservation</h2>
      <p>
        Les données du compte sont conservées pendant la durée de la relation contractuelle puis <Todo>durée</Todo> à des fins probatoires. Les pièces comptables sont conservées dix ans. Les demandes de contact sont conservées <Todo>durée</Todo>.
      </p>
      <h2>Destinataires et sous-traitants</h2>
      <p>
        Vos données sont destinées à FINORA Academy et à ses sous-traitants techniques : hébergement (<Todo>Vercel</Todo>), base de données et authentification (<Todo>Supabase</Todo>), paiement (Stripe), e-mails transactionnels (<Todo>Resend</Todo>), diffusion vidéo (<Todo>prestataire retenu</Todo>). Certains peuvent être situés hors de l&apos;Union européenne ; les transferts sont alors encadrés par des garanties appropriées.
      </p>
      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de portabilité de vos données. Depuis votre espace adhérent, vous pourrez exporter vos données et demander la suppression de votre compte. Vous pouvez aussi écrire à <Todo>adresse e-mail de contact RGPD</Todo>. Vous pouvez introduire une réclamation auprès de la CNIL (cnil.fr).
      </p>
      <h2>Sécurité</h2>
      <p>Les données sont protégées par des mesures techniques adaptées : chiffrement des communications, contrôle d&apos;accès par rôle, cloisonnement des données entre adhérents, journalisation des actions sensibles et sauvegardes régulières.</p>
    </LegalPage>
  );
}
