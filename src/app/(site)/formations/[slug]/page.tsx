import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ModuleCard } from "@/components/sections/module-card";
import { JsonLd } from "@/components/site/json-ld";
import { getModule, modules } from "@/content/modules";
import { site } from "@/content/site";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/formations/[slug]">): Promise<Metadata> {
  const m = getModule((await params).slug);
  if (!m) return {};
  return { title: `Module ${m.number} : ${m.title}`, description: m.summary, alternates: { canonical: `/formations/${m.slug}` } };
}

export default async function ModulePage({ params }: PageProps<"/formations/[slug]">) {
  const m = getModule((await params).slug);
  if (!m) notFound();
  const Icon = m.icon;
  const n = String(m.number).padStart(2, "0");
  const prev = modules.find((x) => x.number === m.number - 1);
  const next = modules.find((x) => x.number === m.number + 1);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Course", name: m.title, description: m.summary, provider: { "@type": "Organization", name: site.name, url: site.url } }} />
      <section className="bg-navy-grain text-white">
        <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <Link href="/formations" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-gold">
              <ArrowLeft className="size-4" /> Toutes les formations
            </Link>
            <p className="mt-8 font-display text-sm font-bold tracking-widest text-gold">MODULE {n} / 08</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] sm:text-5xl">{m.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">{m.summary}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/packs" size="lg">
                Accéder à ce module <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/formations#modules" variant="outline-light" size="lg">
                Voir le programme
              </ButtonLink>
            </div>
          </div>
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04]">
            <span className="absolute -bottom-8 right-4 font-display text-[10rem] font-extrabold leading-none text-white/[0.05]">{n}</span>
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="flex size-16 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
                <Icon className="size-8" />
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-white/60">
                <Lock className="size-4" /> Vidéo réservée aux adhérents
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold text-navy">Ce que vous allez apprendre</h2>
            <ul className="mt-6 space-y-3">
              {m.objectives.map((o) => (
                <li key={o} className="flex gap-3 rounded-2xl border border-navy/[0.06] bg-white p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-ink" />
                  <span className="text-navy/85">{o}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate">Chaque module est organisé en chapitres vidéo, accompagnés de ressources PDF à télécharger depuis votre espace adhérent.</p>
          </div>
          <aside className="h-fit rounded-card bg-white p-6 shadow-card">
            <p className="font-display font-bold text-navy">Inclus dans tous les packs</p>
            <p className="mt-2 text-sm text-slate">Les huit modules vidéo sont accessibles dès le Pack Découverte, depuis votre espace adhérent.</p>
            <ButtonLink href="/packs" className="mt-5 w-full">
              Comparer les packs
            </ButtonLink>
            <p className="mt-5 border-t border-navy/10 pt-5 text-xs leading-relaxed text-slate">{site.disclaimer}</p>
          </aside>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <h2 className="text-2xl font-bold text-navy">Poursuivre le parcours</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:max-w-3xl">
            {[prev, next].filter((x) => x !== undefined).map((x) => (
              <ModuleCard key={x.slug} module={x} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
