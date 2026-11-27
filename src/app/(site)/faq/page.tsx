import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { FaqList } from "@/components/sections/faq-list";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description: "Toutes les réponses sur les formations FINORA Academy : accès aux vidéos, ateliers, parrainage, paiement.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions fréquentes" description="Vous ne trouvez pas votre réponse ? Écrivez-nous, nous vous répondrons rapidement." />
      <FaqList withHeading={false} />
      <div className="pb-24 text-center">
        <ButtonLink href="/contact" variant="navy">
          Poser une question
        </ButtonLink>
      </div>
    </>
  );
}
