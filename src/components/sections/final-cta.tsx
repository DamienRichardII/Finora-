import { BRAND } from "@/config/brand";
import { ArrowRight } from "lucide-react";
import { Monogram } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function FinalCta() {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <Reveal>
          <div className="bg-navy-grain relative overflow-hidden rounded-[2rem] px-6 py-16 text-center text-white sm:px-12 sm:py-20">
            <Monogram className="absolute -bottom-10 -left-10 size-64 opacity-[0.07]" />
            <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">Prêt à reprendre le contrôle de vos finances ?</h2>
            <p className="relative mx-auto mt-5 max-w-lg text-white/70">Commencez dès aujourd&apos;hui votre parcours d&apos;éducation financière, à votre rythme.</p>
            <ButtonLink href="/packs" size="lg" className="relative mt-9">
              Rejoindre {BRAND.name} <ArrowRight />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
