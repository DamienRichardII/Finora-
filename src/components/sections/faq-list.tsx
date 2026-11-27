import { Plus } from "lucide-react";
import { JsonLd } from "@/components/site/json-ld";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { faq } from "@/content/faq";

/** FAQ accessible sans JavaScript (details/summary) + données structurées FAQPage. */
export function FaqList({ withHeading = true }: { withHeading?: boolean }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        {withHeading && <SectionHeading eyebrow="FAQ" title="Vos questions, nos réponses" />}
        <div className="mt-12 divide-y divide-navy/10 rounded-card border border-navy/[0.06] bg-white px-2 shadow-card sm:px-4">
          {faq.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-3 py-5 font-display font-semibold text-navy [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ivory text-gold-ink transition group-open:rotate-45 group-open:bg-gold group-open:text-navy">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="px-3 pb-6 text-sm leading-relaxed text-slate">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
      <JsonLd data={jsonLd} />
    </section>
  );
}
