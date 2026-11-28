import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { visuels } from "@/assets/visuels";
import { BrandSymbol } from "@/components/brand/logo";
import { BRAND } from "@/config/brand";
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
      {/* Visuel d'ambiance assombri pour garder le logo dominant et le texte lisible */}
      <Image src={visuels.globe.src} alt="" fill priority placeholder="blur" sizes="100vw" className="object-cover object-[70%_center]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(16_31_44/0.78)_0%,rgb(16_31_44/0.9)_55%,rgb(8_19_31/0.96)_100%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Mobile : le premier écran (hauteur visible moins l'en-tête de 4rem) ne montre que logo, slogan et CTA ; les KPI arrivent au scroll. */}
      <Container className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center py-12 text-center sm:min-h-0 sm:justify-start sm:pb-20 sm:pt-24 lg:pt-28">
        {/* Logo dominant */}
        <div className="flex flex-col items-center">
          <BrandSymbol className="size-20 sm:size-24 lg:size-28" />
          <p className="mt-7 -mr-[0.3em] font-display text-5xl font-semibold uppercase leading-none tracking-[0.3em] sm:text-7xl lg:text-8xl">{BRAND.name}</p>
          <p className="mt-4 -mr-[0.42em] font-display text-xs font-bold uppercase tracking-[0.42em] text-gold sm:text-sm">{BRAND.descriptor}</p>
        </div>

        <h1 className="mt-10 whitespace-nowrap text-[4vw] font-bold leading-snug sm:text-[clamp(1.25rem,3.1vw,2.5rem)]">
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
      <Container className="relative pb-16 pt-4 sm:pb-20 sm:pt-0">
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
