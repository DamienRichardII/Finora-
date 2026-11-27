import type { Metadata } from "next";
import { visuels } from "@/assets/visuels";
import { CalendarCheck, MailCheck, PlaySquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { WorkshopsList } from "@/components/sections/workshops-list";

export const metadata: Metadata = {
  title: "Ateliers et cours d'éducation financière",
  description: "Participez aux ateliers collectifs FINORA Academy, en ligne ou en présentiel : budget, épargne, crédit. Places limitées.",
  alternates: { canonical: "/ateliers" },
};

const steps = [
  { icon: CalendarCheck, title: "Choisissez un atelier", text: "Consultez les prochaines dates et réservez votre place." },
  { icon: MailCheck, title: "Recevez la confirmation", text: "Les informations pratiques et le lien de connexion vous sont envoyés." },
  { icon: PlaySquare, title: "Revoyez le replay", text: "Les replays sont inclus à partir du Pack Essentiel." },
];

export default function WorkshopsPage() {
  return (
    <>
      <PageHero visual={visuels.croissance} eyebrow="Ateliers et cours" title="Apprendre en direct, poser ses questions" description="Des sessions collectives, en petit groupe, pour mettre en pratique les notions de la formation." />
      <section className="pt-16">
        <Container className="grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="flex gap-4 rounded-card bg-white p-5 shadow-card">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-display font-bold text-navy">
                  {i + 1}. {title}
                </p>
                <p className="mt-1 text-sm text-slate">{text}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>
      <WorkshopsList withHeading={false} />
    </>
  );
}
