import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { intervalLabel, plans } from "@/content/plans";
import { cn, formatPrice } from "@/lib/utils";

export function Pricing({ withHeading = true, headingAs = "h2" }: { withHeading?: boolean; headingAs?: "h1" | "h2" }) {
  return (
    <section id="offres" className="bg-navy-grain py-20 text-white sm:py-28">
      <Container>
        {withHeading && <SectionHeading as={headingAs} tone="dark" eyebrow="Packs et tarifs" title="Choisissez le pack qui vous correspond" description="Des formules claires pour apprendre à votre rythme. Les conditions d'abonnement et de résiliation sont détaillées dans les conditions générales de vente." />}
        <div className="mx-auto mt-14 grid max-w-5xl items-stretch gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-[1.5rem] p-7 sm:p-8",
                  p.highlighted ? "bg-white text-navy shadow-[0_30px_60px_-20px_rgb(212_183_122/0.45)] ring-2 ring-gold lg:-my-4 lg:py-12" : "border border-white/10 bg-white/[0.04]",
                )}
              >
                {p.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold text-navy">Le plus choisi</span>
                )}
                <h3 className={cn("text-xl font-bold", p.highlighted ? "text-navy" : "text-white")}>{p.name}</h3>
                <p className={cn("mt-1 text-sm", p.highlighted ? "text-slate" : "text-white/60")}>{p.tagline}</p>
                <p className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-extrabold">{formatPrice(p.priceCents)}</span>
                  <span className={cn("text-sm", p.highlighted ? "text-slate" : "text-white/60")}>{intervalLabel[p.interval]}</span>
                </p>
                <ul className={cn("mt-7 space-y-3 border-t pt-7 text-sm", p.highlighted ? "border-navy/10" : "border-white/10")}>
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check className={cn("mt-0.5 size-4 shrink-0", p.highlighted ? "text-gold-ink" : "text-gold")} />
                      <span className={p.highlighted ? "text-navy/80" : "text-white/80"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <ButtonLink href={`/inscription?pack=${p.slug}`} variant={p.highlighted ? "gold" : "outline-light"} className="w-full">
                    Choisir ce pack
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
