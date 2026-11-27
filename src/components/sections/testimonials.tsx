import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PlaceholderBadge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Avis clients administrables (table `reviews`, phase 7).
 * Aucun faux témoignage : tant qu'aucun avis réel n'est publié, la section
 * affiche des emplacements explicitement identifiés en démonstration, et rien en production.
 */
type Review = { author: string; text: string };
const reviews: Review[] = [];

export function Testimonials({ demo }: { demo: boolean }) {
  if (reviews.length === 0 && !demo) return null;
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Avis des adhérents" title="Ils apprennent avec FINORA Academy" />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {(reviews.length ? reviews : [null, null, null]).map((r, i) => (
            <figure key={i} className="flex flex-col rounded-card border border-dashed border-navy/15 bg-ivory p-7">
              <Quote className="size-7 text-gold" />
              {r ? (
                <>
                  <blockquote className="mt-4 text-navy/80">« {r.text} »</blockquote>
                  <figcaption className="mt-5 font-semibold text-navy">{r.author}</figcaption>
                </>
              ) : (
                <>
                  <p className="mt-4 text-sm leading-relaxed text-slate">Emplacement réservé à un avis authentique d&apos;adhérent, publié avec son accord depuis l&apos;espace administrateur.</p>
                  <PlaceholderBadge className="mt-5 self-start">Démonstration</PlaceholderBadge>
                </>
              )}
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
