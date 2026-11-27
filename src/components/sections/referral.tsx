import { ArrowRight, Gift, Link2, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  { icon: Link2, title: "Partagez votre lien", text: "Chaque adhérent dispose d'un code et d'un lien personnels." },
  { icon: ShieldCheck, title: "Votre proche s'inscrit", text: "La récompense est validée après confirmation de son inscription." },
  { icon: Gift, title: "Vous avancez ensemble", text: "Des avantages pour vous et pour votre filleul, selon les conditions en vigueur." },
];

export function Referral({ withCta = true }: { withCta?: boolean }) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#F3EAD6] via-[#EADCBC] to-gold p-8 sm:p-12 lg:p-16">
            <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -right-16 -top-16 size-80 text-navy/[0.06]">
              <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="20" />
              <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="20" />
            </svg>
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy/60">Programme de parrainage</p>
                <h2 className="text-3xl font-extrabold leading-tight text-navy sm:text-4xl">Apprenez ensemble, avancez ensemble.</h2>
                <p className="mt-4 max-w-md text-navy/70">Invitez un proche à rejoindre FINORA Academy et progressez à deux. Les récompenses du programme seront annoncées au lancement.</p>
                {withCta && (
                  <ButtonLink href="/parrainage" variant="navy" className="mt-8">
                    Découvrir le parrainage <ArrowRight />
                  </ButtonLink>
                )}
              </div>
              <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {steps.map(({ icon: Icon, title, text }, i) => (
                  <li key={title} className="flex gap-4 rounded-2xl bg-white/70 p-5 backdrop-blur">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-display font-bold text-navy">
                        <span className="text-gold-ink">{i + 1}.</span> {title}
                      </p>
                      <p className="mt-1 text-sm text-navy/70">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
