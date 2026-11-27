import { ArrowRight, Briefcase, GraduationCap, Eye } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/content/site";
import Image from "next/image";
import { photosFondateur, type FounderPhoto } from "@/assets/fondateur";

export function Founder({ withCta = true, photo = photosFondateur.bureau }: { withCta?: boolean; photo?: FounderPhoto }) {
  const f = site.founder;
  const cutout = photo.variant === "cutout";
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div
            className={
              cutout
                ? "relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-gold/25 bg-gradient-to-b from-ivory via-[#efe8da] to-[#e4d7bd] shadow-card"
                : "relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-navy shadow-card"
            }
          >
            {cutout && <div aria-hidden className="absolute left-1/2 top-[18%] size-72 -translate-x-1/2 rounded-full bg-white/60 blur-3xl" />}
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              placeholder={cutout ? "empty" : "blur"}
              sizes="(min-width: 1024px) 448px, 90vw"
              className={cutout ? "object-contain object-bottom pt-8" : "object-cover object-[42%_center]"}
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 p-4 backdrop-blur">
              <p className="font-display text-base font-bold text-navy">{f.firstName}</p>
              <p className="text-sm text-slate">Fondateur de FINORA Academy</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-ink">Le fondateur</p>
          <h2 className="text-3xl font-bold leading-tight text-navy sm:text-4xl">Rendre l&apos;éducation financière accessible à tous</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate">
            {f.bio ?? "Après plusieurs années dans le secteur financier, Chris a fondé FINORA Academy avec une conviction : comprendre l'argent ne devrait pas être réservé à quelques-uns."}
          </p>

          <dl className="mt-8 space-y-4">
            <div className="flex gap-4 rounded-2xl border border-navy/[0.06] bg-white p-4">
              <Briefcase className="mt-0.5 size-5 shrink-0 text-gold-ink" />
              <div>
                <dt className="font-semibold text-navy">Expérience professionnelle</dt>
                <dd className="text-sm text-slate">{f.experience}</dd>
              </div>
            </div>
            {f.diplomas.length > 0 && (
              <div className="flex gap-4 rounded-2xl border border-navy/[0.06] bg-white p-4">
                <GraduationCap className="mt-0.5 size-5 shrink-0 text-gold-ink" />
                <div>
                  <dt className="font-semibold text-navy">Diplômes</dt>
                  <dd className="text-sm text-slate">{f.diplomas.join(" · ")}</dd>
                </div>
              </div>
            )}
            <div className="flex gap-4 rounded-2xl border border-navy/[0.06] bg-white p-4">
              <Eye className="mt-0.5 size-5 shrink-0 text-gold-ink" />
              <div>
                <dt className="font-semibold text-navy">Vision</dt>
                <dd className="text-sm text-slate">Donner à chacun les clés pour comprendre, maîtriser et construire son avenir financier en toute autonomie.</dd>
              </div>
            </div>
          </dl>
          {withCta && (
            <ButtonLink href="/a-propos" variant="navy" className="mt-8">
              Découvrir notre histoire <ArrowRight />
            </ButtonLink>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
