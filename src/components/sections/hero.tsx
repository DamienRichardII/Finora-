import Image from "next/image";
import { ArrowRight, GraduationCap, MonitorSmartphone, Clock } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { HeroVisual } from "./hero-visual";

const reassurance = [
  { icon: GraduationCap, label: "8 modules", sub: "de formation" },
  { icon: MonitorSmartphone, label: "100 % en ligne", sub: "sur tous vos écrans" },
  { icon: Clock, label: "À votre rythme", sub: "sans contrainte d'horaire" },
];

export function Hero() {
  return (
    <section className="bg-navy-grain relative overflow-hidden text-white">
      <Container className="grid items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pb-28 lg:pt-20 [&>*]:min-w-0">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80">
            <span className="size-1.5 rounded-full bg-gold" /> Académie d&apos;éducation financière
          </p>
          <h1 className="mt-6 text-[2.5rem] font-extrabold leading-[1.05] sm:text-6xl lg:text-[4.1rem]">
            Maîtrisez votre argent, <span className="text-gold-gradient">construisez votre avenir.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Développez votre culture financière, apprenez à mieux gérer votre argent et construisez votre avenir grâce à des formations accessibles, concrètes et structurées.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/formations" size="lg">
              Découvrir les formations <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/packs" variant="outline-light" size="lg">
              Voir les offres
            </ButtonLink>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-5 border-t border-white/10 pt-8 sm:grid-cols-3">
            {reassurance.map(({ icon: Icon, label, sub }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                  <Icon className="size-5" />
                </span>
                <span className="leading-tight">
                  <span className="block font-display text-sm font-semibold">{label}</span>
                  <span className="text-xs text-white/55">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {site.heroImage ? (
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            {/* Visuel illustratif : ne représente pas le fondateur. */}
            <Image src={site.heroImage} alt="Personne apprenant à gérer ses finances" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        ) : (
          <HeroVisual />
        )}
      </Container>
    </section>
  );
}
