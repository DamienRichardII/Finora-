import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Download } from "lucide-react";
import { BrandSymbol, Wordmark } from "@/components/brand/logo";
import { CONCEPTS, type ConceptId } from "@/components/brand/symbols";
import { Container } from "@/components/ui/container";
import { BRAND, conceptDir } from "@/config/brand";

/**
 * Page temporaire de comparaison des 3 concepts de logo, pour le choix du client.
 * Désactivée en production Vercel (VERCEL_ENV=production) ; visible en local et
 * sur les préversions. À supprimer après validation.
 */
export const metadata: Metadata = {
  title: "Prévisualisation de l'identité",
  robots: { index: false, follow: false },
};

const ids = Object.keys(CONCEPTS) as ConceptId[];
const base = BRAND.assetsPath;

export default function BrandingPreviewPage() {
  if (process.env.VERCEL_ENV === "production") notFound();

  return (
    <div className="bg-ivory pb-24">
      <section className="bg-navy-grain py-16 text-white sm:py-20">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Identité visuelle · à valider</p>
          <h1 className="mt-4 text-3xl font-bold sm:text-5xl">Trois propositions de logo pour {BRAND.name}</h1>
          <p className="mt-5 max-w-2xl text-white/70">
            Les trois concepts sont présentés dans des conditions identiques. Le site affiche aujourd&apos;hui le concept 01, recommandé par DamCompany. Les noms Freedom, Wisdom et Heritage sont internes : seul le nom {BRAND.name} figure sur les logos.
          </p>
          <a href={`${base}/previews/comparatif-concepts.png`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-gold-light">
            Voir la planche comparative <ArrowRight className="size-4" />
          </a>
        </Container>
      </section>

      {/* Logos principaux côte à côte */}
      <Container className="mt-12 grid gap-6 lg:grid-cols-3">
        {ids.map((id) => (
          <article key={id} className={`overflow-hidden rounded-card bg-white shadow-card ${id === "freedom" ? "ring-2 ring-gold" : ""}`}>
            <div className="flex flex-col items-center bg-navy px-6 py-12 text-gold">
              <BrandSymbol concept={id} className="size-28" title={`Symbole ${CONCEPTS[id].label}`} />
              <Wordmark className="mt-8 -mr-[0.3em] text-4xl" />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-ink">
                {CONCEPTS[id].label}
                {id === "freedom" && " · recommandé"}
              </p>
              <p className="mt-1 font-semibold text-navy">Inspiration : {CONCEPTS[id].inspiration}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate">{CONCEPTS[id].idea}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-sm">
                <a className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 px-4 py-2 font-medium text-navy hover:bg-ivory" href={`${base}/previews/planche-${conceptDir[id]}.png`}>
                  Planche complète
                </a>
                <a className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 px-4 py-2 font-medium text-navy hover:bg-ivory" href={`${base}/${conceptDir[id]}/svg/plenty-horizontal-transparent.svg`} download>
                  <Download className="size-4" /> SVG
                </a>
              </div>
            </div>
          </article>
        ))}
      </Container>

      {/* Header du site */}
      <Container className="mt-16">
        <h2 className="text-xl font-bold text-navy">Dans le header du site</h2>
        <div className="mt-5 space-y-3">
          {ids.map((id) => (
            <div key={id} className="flex h-16 items-center justify-between rounded-2xl bg-navy px-5">
              <span className="inline-flex items-center gap-3">
                <BrandSymbol concept={id} small className="size-9" />
                <Wordmark className="-mr-[0.3em] text-[19px] text-white" />
              </span>
              <span className="hidden gap-6 text-sm text-white/70 md:flex">
                <span>Formations</span>
                <span>Packs et tarifs</span>
                <span>Ateliers</span>
                <span>À propos</span>
              </span>
              <span className="rounded-full bg-gold px-4 py-2 text-xs font-semibold text-navy">Nous rejoindre</span>
            </div>
          ))}
        </div>
      </Container>

      {/* Hero et smartphone */}
      <Container className="mt-16">
        <h2 className="text-xl font-bold text-navy">Dans le hero et sur smartphone</h2>
        <div className="mt-5 grid gap-6 lg:grid-cols-3">
          {ids.map((id) => (
            <div key={id} className="flex justify-center rounded-card bg-white p-6 shadow-card">
              <div className="w-[260px] rounded-[2.25rem] bg-night p-2.5">
                <div className="flex h-[500px] flex-col items-center justify-center rounded-[1.8rem] bg-navy px-5 text-center text-white">
                  <BrandSymbol concept={id} className="size-16" />
                  <Wordmark className="mt-5 -mr-[0.3em] text-2xl" />
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.42em] text-gold">{BRAND.descriptor}</p>
                  <p className="mt-6 text-sm font-semibold">
                    Maîtrisez votre argent, <span className="text-gold">construisez votre avenir.</span>
                  </p>
                  <span className="mt-6 w-full rounded-full bg-gold py-2.5 text-xs font-semibold text-navy">Découvrir les formations</span>
                  <span className="mt-2.5 w-full rounded-full border border-white/30 py-2.5 text-xs font-semibold">Voir les offres</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Petites tailles et fonds */}
      <Container className="mt-16">
        <h2 className="text-xl font-bold text-navy">Petites tailles et fonds</h2>
        <div className="mt-5 grid gap-6 lg:grid-cols-3">
          {ids.map((id) => (
            <div key={id} className="rounded-card bg-white p-6 shadow-card">
              <div className="flex items-end gap-5">
                {[64, 32, 16].map((z) => (
                  <span key={z} className="flex flex-col items-center gap-2">
                    <span className="flex items-center justify-center rounded-[22%] bg-navy" style={{ width: z, height: z }}>
                      <BrandSymbol concept={id} small className="size-[70%] text-gold" />
                    </span>
                    <span className="text-[11px] text-slate">{z} px</span>
                  </span>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 rounded-xl bg-white p-3 ring-1 ring-navy/10">
                  <BrandSymbol concept={id} small className="size-7 text-night" />
                  <Wordmark className="-mr-[0.3em] text-sm text-night" />
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-night p-3">
                  <BrandSymbol concept={id} small className="size-7 text-white" />
                  <Wordmark className="-mr-[0.3em] text-sm text-white" />
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-ivory p-3 ring-1 ring-navy/10">
                  <BrandSymbol concept={id} small className="size-7 text-night" />
                  <Wordmark className="-mr-[0.3em] text-sm text-night" />
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-white p-3 ring-1 ring-navy/10">
                  <BrandSymbol concept={id} small className="size-7 text-gold" />
                  <Wordmark className="-mr-[0.3em] text-sm text-gold-ink" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-16 text-sm text-slate">
        <p>
          Slogan conservé : « {BRAND.tagline} ». Variante proposée, à valider : « {BRAND.taglineAlt} ». Les fichiers (SVG, PNG 4096 px, JPEG, favicons, icônes, motifs, planches) sont dans <code className="rounded bg-white px-1.5 py-0.5">public{base}</code>.
        </p>
      </Container>
    </div>
  );
}
