import type { Metadata } from "next";
import { visuels } from "@/assets/visuels";
import { Ban, BadgeCheck, Clock, Settings2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { Referral } from "@/components/sections/referral";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Programme de parrainage",
  description: "Parrainez un proche chez FINORA Academy : apprenez ensemble, avancez ensemble.",
  alternates: { canonical: "/parrainage" },
};

const rules = [
  { icon: BadgeCheck, title: "Récompense après validation", text: "Une récompense n'est attribuée qu'après confirmation d'une inscription payante éligible du filleul." },
  { icon: Settings2, title: "Conditions transparentes", text: "La nature des avantages, leur durée de validité et leurs limites d'utilisation sont publiées avec le programme." },
  { icon: Ban, title: "Un seul niveau", text: "Pas de système multiniveau : seul le parrainage direct d'un proche est récompensé." },
  { icon: Clock, title: "Protection anti-fraude", text: "Auto-parrainage et inscriptions abusives sont détectés et exclus du programme." },
];

export default function ReferralPage() {
  return (
    <>
      <PageHero visual={visuels.tirelire} eyebrow="Parrainage" title="Apprenez ensemble, avancez ensemble." description="Partagez FINORA Academy avec vos proches grâce à votre lien personnel, disponible dans votre espace adhérent." />
      <Referral withCta={false} />
      <section className="pb-20">
        <Container>
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">Les règles du programme</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {rules.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 rounded-card border border-navy/[0.06] bg-white p-6">
                <Icon className="mt-0.5 size-6 shrink-0 text-gold-ink" />
                <div>
                  <p className="font-display font-bold text-navy">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
