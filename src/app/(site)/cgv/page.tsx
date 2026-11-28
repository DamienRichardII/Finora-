import { BRAND } from "@/config/brand";
import type { Metadata } from "next";
import { LegalPage, Todo } from "@/components/site/legal-page";

export const metadata: Metadata = { title: "Conditions générales de vente", alternates: { canonical: "/cgv" } };

export default function Page() {
  return (
    <LegalPage title="Conditions générales de vente" updated="27 novembre 2026">
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions régissent la vente des formations en ligne, abonnements et ateliers proposés par <Todo>dénomination sociale</Todo> sous la marque {BRAND.name} aux consommateurs.
      </p>
      <h2>2. Offres et prix</h2>
      <p>Les packs, leur contenu et leurs prix sont présentés sur la page Packs et tarifs. Les prix sont indiqués en euros toutes taxes comprises. Le prix applicable est celui affiché au moment de la commande.</p>
      <h2>3. Commande</h2>
      <p>La commande comprend la sélection d&apos;un pack, la création d&apos;un compte, la vérification du récapitulatif, la saisie éventuelle d&apos;un code promotionnel ou de parrainage, l&apos;acceptation des présentes conditions et le paiement. Une confirmation est adressée par e-mail.</p>
      <h2>4. Paiement</h2>
      <p>Le paiement s&apos;effectue en ligne par carte bancaire, Apple Pay ou Google Pay via la plateforme sécurisée Stripe. Les abonnements sont prélevés à chaque échéance (mensuelle ou annuelle) jusqu&apos;à résiliation. L&apos;accès aux contenus est activé après confirmation du paiement par le prestataire.</p>
      <h2>5. Durée, renouvellement et résiliation</h2>
      <p>
        Les abonnements sont conclus pour la période choisie et renouvelés tacitement. Vous pouvez résilier à tout moment depuis votre espace adhérent ; la résiliation prend effet à la fin de la période en cours. Conformément à la réglementation, la résiliation est accessible en ligne en quelques clics.
      </p>
      <h2>6. Droit de rétractation</h2>
      <p>
        Vous disposez d&apos;un délai de quatorze jours à compter de la souscription pour exercer votre droit de rétractation. Si vous demandez à accéder immédiatement aux contenus numériques, vous reconnaissez que l&apos;exécution commence avant la fin de ce délai et que vous renoncez à votre droit de rétractation pour les contenus déjà fournis, dans les conditions prévues par le Code de la consommation.
      </p>
      <h2>7. Ateliers</h2>
      <p>
        Les ateliers sont proposés dans la limite des places disponibles. Les conditions d&apos;annulation et de remboursement sont précisées lors de la réservation.
      </p>
      <h2>8. Nature pédagogique des contenus</h2>
      <p>Les contenus ont une vocation éducative et informative et ne constituent pas une recommandation d&apos;investissement personnalisée. Aucun rendement n&apos;est garanti. Tout investissement comporte un risque de perte en capital.</p>
      <h2>9. Médiation et litiges</h2>
      <p>
        En cas de litige, vous pouvez recourir gratuitement au médiateur de la consommation : <Todo>nom et coordonnées du médiateur</Todo>. Les présentes conditions sont soumises au droit français.
      </p>
    </LegalPage>
  );
}
