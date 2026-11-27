import { ArrowRight } from "lucide-react";
import { Monogram } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";

/** KPI : uniquement des faits vrais de l'offre, aucune statistique inventée. */
const kpis = [
  { value: 8, suffix: "", label: "modules de formation" },
  { value: 100, suffix: " %", label: "en ligne" },
  { value: 24, suffix: "/7", label: "à votre rythme" },
];

export function Hero() {
  return (
    <section className="bg-navy-grain relative overflow-hidden text-white">
      {/* Filigrane : monogramme géant, très discret */}
      <Monogram className="pointer-events-none absolute -right-24 top-1/2 size-[34rem] -translate-y-1/2 opacity-[0.035] max-lg:hidden" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <Container className="relative flex flex-col items-center pb-16 pt-16 text-center sm:pb-20 sm:pt-24 lg:pt-28">
        {/* Logo dominant */}
        <div className="flex flex-col items-center">
          <Monogram className="size-20 sm:size-24 lg:size-28" />
          <p className="mt-6 font-display text-5xl font-extrabold leading-none tracking-[0.06em] sm:text-7xl lg:text-8xl">FINORA</p>
          <p className="mt-3 font-display text-sm font-bold tracking-[0.55em] text-gold sm:text-base">ACADEMY</p>
        </div>

        <h1 className="mt-10 text-[clamp(1.25rem,3.1vw,2.5rem)] font-bold leading-snug sm:whitespace-nowrap">
          Maîtrisez votre argent, <span className="text-gold-gradient">construisez votre avenir.</span>
        </h1>

        <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href="/formations" size="lg">
            Découvrir les formations <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/packs" variant="outline-light" size="lg">
            Voir les offres
          </ButtonLink>
        </div>
      </Container>

      {/* KPI qui apparaissent au scroll */}
      <Container className="relative pb-16 sm:pb-20">
        <dl className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-white/10 rounded-[1.5rem] border border-white/10 bg-white/[0.03] backdrop-blur">
          {kpis.map((k, i) => (
            <Reveal key={k.label} delay={i * 120} className="px-2 py-6 text-center sm:px-6 sm:py-7">
              <dt className="sr-only">{k.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-extrabold text-gold sm:text-5xl">
                  <CountUp to={k.value} suffix={k.suffix} />
                </span>
                <span className="mt-2 block text-xs text-white/65 sm:text-sm">{k.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
