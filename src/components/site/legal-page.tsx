import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";

/** Mise en forme commune des documents juridiques (modèles à faire valider avant production). */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Informations légales" title={title} description={`Dernière mise à jour : ${updated}`} />
      <Container className="max-w-3xl py-14 sm:py-20">
        <p role="note" className="mb-10 flex gap-3 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-navy">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-gold-ink" />
          Document modèle : les informations entre crochets doivent être complétées et le texte validé par un professionnel du droit avant la mise en production.
        </p>
        <div className="space-y-4 text-[15px] leading-relaxed text-navy/80 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">{children}</div>
      </Container>
    </>
  );
}

export function Todo({ children }: { children: React.ReactNode }) {
  return <mark className="rounded bg-gold/20 px-1 text-gold-ink">[{children}]</mark>;
}
