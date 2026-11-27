import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";

/** Mise en forme commune des documents juridiques. Les champs <Todo> restent à remplir avec les informations légales du client. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Informations légales" title={title} description={`Dernière mise à jour : ${updated}`} />
      <Container className="max-w-3xl py-14 sm:py-20">
        <div className="space-y-4 text-[15px] leading-relaxed text-navy/80 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">{children}</div>
      </Container>
    </>
  );
}

export function Todo({ children }: { children: React.ReactNode }) {
  return <>[{children}]</>;
}
