import { BRAND } from "@/config/brand";
import type { Metadata } from "next";
import { visuels } from "@/assets/visuels";
import { photosFondateur } from "@/assets/fondateur";
import { HeartHandshake, Scale, Sparkles, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { FinalCta } from "@/components/sections/final-cta";
import { Founder } from "@/components/sections/founder";
import { PageHero } from "@/components/sections/page-hero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "À propos : notre mission",
  description: `${BRAND.name} rend l'éducation financière accessible : une plateforme en ligne pour comprendre, maîtriser et construire son avenir financier.`,
  alternates: { canonical: "/a-propos" },
};

const values = [
  { icon: Sparkles, title: "Pédagogie", text: "Des notions expliquées simplement, avec des exemples tirés du quotidien." },
  { icon: Scale, title: "Honnêteté", text: "Aucune promesse d'enrichissement rapide ni de rendement garanti." },
  { icon: HeartHandshake, title: "Accessibilité", text: "Des formations pensées pour tous les niveaux, à suivre à son rythme." },
  { icon: ShieldCheck, title: "Autonomie", text: "Vous donner les clés pour prendre vos propres décisions, en connaissance de cause." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero visual={visuels.maison} eyebrow="À propos" title={<>Comprendre. Maîtriser. <span className="text-gold-gradient">Construire.</span></>} description={`${BRAND.name} est née d'une conviction simple : bien gérer son argent s'apprend, et cet apprentissage doit être accessible à chacun.`} />
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Nos valeurs" title="Une plateforme exigeante et bienveillante" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="h-full rounded-card border border-navy/[0.06] bg-white p-7 shadow-card">
                  <Icon className="size-7 text-gold-ink" />
                  <h3 className="mt-5 text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <div className="bg-white">
        <Founder withCta={false} photo={photosFondateur.portrait} />
      </div>
      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="rounded-card border border-navy/10 bg-white p-6 text-sm leading-relaxed text-slate sm:p-8">
            <p className="font-semibold text-navy">Notre cadre</p>
            <p className="mt-2">{BRAND.name} est un organisme d&apos;éducation financière. Ce n&apos;est ni une banque, ni un établissement financier agréé, et ne propose pas de conseil en investissement personnalisé.</p>
            <p className="mt-3">{site.disclaimer}</p>
          </div>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
