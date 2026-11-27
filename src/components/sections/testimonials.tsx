import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Avis clients administrables (table `reviews`, phase 7).
 * Aucun faux témoignage : la section reste masquée tant qu'aucun avis réel n'est publié.
 */
type Review = { author: string; text: string };
const reviews: Review[] = [];

export function Testimonials() {
  if (reviews.length === 0) return null;
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Avis des adhérents" title="Ils apprennent avec FINORA Academy" />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.author} className="flex flex-col rounded-card border border-navy/[0.06] bg-ivory p-7">
              <Quote className="size-7 text-gold" />
              <blockquote className="mt-4 text-navy/80">« {r.text} »</blockquote>
              <figcaption className="mt-5 font-semibold text-navy">{r.author}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
