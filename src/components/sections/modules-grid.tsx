import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { modules } from "@/content/modules";
import { ModuleCard } from "./module-card";

export function ModulesGrid({ withHeading = true, withCta = true }: { withHeading?: boolean; withCta?: boolean }) {
  return (
    <section id="modules" className="bg-white py-20 sm:py-28">
      <Container>
        {withHeading && (
          <SectionHeading eyebrow="Le programme" title="Huit modules pour reprendre la main" description="Un parcours vidéo structuré, des fondamentaux jusqu'à votre stratégie financière à long terme." />
        )}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 4) * 70}>
              <ModuleCard module={m} />
            </Reveal>
          ))}
        </div>
        {withCta && (
          <div className="mt-12 text-center">
            <ButtonLink href="/formations" variant="outline-dark">
              Voir le programme complet <ArrowRight />
            </ButtonLink>
          </div>
        )}
      </Container>
    </section>
  );
}
