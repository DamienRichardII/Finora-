import { CalendarDays, Clock, MapPin, Users, Video } from "lucide-react";
import { PlaceholderBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatDuration, formatWorkshopDate, formatWorkshopTime, workshops } from "@/content/workshops";
import { formatPrice } from "@/lib/utils";

export function WorkshopsList({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section id="ateliers" className="py-20 sm:py-28">
      <Container>
        {withHeading && (
          <SectionHeading eyebrow="Ateliers et cours" title="Apprendre ensemble, en direct" description="Des sessions collectives sur une thématique précise, pour poser vos questions et passer à la pratique." />
        )}
        <div className="mx-auto mt-14 grid max-w-5xl gap-4">
          {workshops.map((w, i) => (
            <Reveal key={w.slug} delay={i * 80}>
              <article className="grid gap-5 rounded-card border border-navy/[0.06] bg-white p-5 shadow-card sm:p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8">
                <div className="flex size-20 flex-col items-center justify-center rounded-2xl bg-navy text-white">
                  <span className="font-display text-2xl font-extrabold leading-none">{new Intl.DateTimeFormat("fr-FR", { day: "2-digit", timeZone: "Europe/Paris" }).format(new Date(w.startsAt))}</span>
                  <span className="mt-1 text-xs uppercase tracking-wider text-gold">{new Intl.DateTimeFormat("fr-FR", { month: "short", timeZone: "Europe/Paris" }).format(new Date(w.startsAt))}</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-ivory px-2.5 py-0.5 text-xs font-semibold text-navy">{w.theme}</span>
                    {w.demo && <PlaceholderBadge>Exemple</PlaceholderBadge>}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-navy">{w.title}</h3>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate">
                    <li className="flex items-center gap-1.5"><CalendarDays className="size-4 text-gold-ink" /><span className="first-letter:uppercase">{formatWorkshopDate(w.startsAt)}</span></li>
                    <li className="flex items-center gap-1.5"><Clock className="size-4 text-gold-ink" />{formatWorkshopTime(w.startsAt)} · {formatDuration(w.durationMinutes)}</li>
                    <li className="flex items-center gap-1.5">{w.format === "En ligne" ? <Video className="size-4 text-gold-ink" /> : <MapPin className="size-4 text-gold-ink" />}{w.format}</li>
                    <li className="flex items-center gap-1.5"><Users className="size-4 text-gold-ink" />{w.seatsLeft} places disponibles</li>
                  </ul>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-navy/[0.06] pt-4 md:flex-col md:items-end md:border-0 md:pt-0">
                  <p className="font-display text-xl font-bold text-navy">{w.priceCents === 0 ? "Inclus" : formatPrice(w.priceCents)}</p>
                  <ButtonLink href={`/contact?sujet=${encodeURIComponent(`Réservation : ${w.title}`)}`} size="sm">
                    Réserver
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
