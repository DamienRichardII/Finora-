import { BRAND } from "@/config/brand";
import { Wallet, PiggyBank, TrendingUp, Route } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const items = [
  { icon: Wallet, title: "Apprendre à gérer son budget", text: "Savoir où va votre argent, organiser vos revenus et garder le cap chaque mois." },
  { icon: PiggyBank, title: "Comprendre les mécanismes de l'épargne", text: "Constituer une réserve de sécurité et choisir des solutions adaptées à vos objectifs." },
  { icon: TrendingUp, title: "Découvrir les principes de l'investissement", text: "Comprendre le rendement, le risque et l'horizon de placement avant toute décision." },
  { icon: Route, title: "Construire une stratégie financière durable", text: "Fixer des objectifs clairs et bâtir une feuille de route qui vous ressemble." },
];

export function Benefits() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={`Pourquoi choisir ${BRAND.name}`} title="Des compétences utiles pour toute la vie" description="Une pédagogie progressive pour passer de la compréhension à l'action, sans jargon et sans promesse irréaliste." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 80}>
              <article className="group h-full rounded-card border border-navy/[0.06] bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-navy text-gold transition group-hover:bg-gold group-hover:text-navy">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-lg font-bold leading-snug text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
