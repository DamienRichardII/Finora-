import type { Metadata } from "next";
import { BookOpenCheck, PlayCircle, FileDown, BarChart3 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FinalCta } from "@/components/sections/final-cta";
import { ModulesGrid } from "@/components/sections/modules-grid";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/site/json-ld";
import { modules } from "@/content/modules";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Formations en éducation financière",
  description: "Huit modules vidéo pour apprendre à gérer son budget, comprendre l'épargne, le crédit, l'investissement et la fiscalité, et construire sa stratégie financière.",
  alternates: { canonical: "/formations" },
};

const features = [
  { icon: PlayCircle, label: "Vidéos courtes et structurées" },
  { icon: BarChart3, label: "Progression sauvegardée" },
  { icon: FileDown, label: "Ressources PDF à télécharger" },
  { icon: BookOpenCheck, label: "Validation module par module" },
];

export default function FormationsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: modules.map((m, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Course", name: m.title, description: m.summary, url: `${site.url}/formations/${m.slug}`, provider: { "@type": "Organization", name: site.name } },
          })),
        }}
      />
      <PageHero eyebrow="Formations" title="Le programme FINORA Academy" description="Un parcours en huit modules vidéo, des fondamentaux jusqu'à votre stratégie financière à long terme. Programme provisoire, en cours de finalisation.">
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          {features.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
              <Icon className="size-4 shrink-0 text-gold" /> {label}
            </li>
          ))}
        </ul>
      </PageHero>
      <ModulesGrid withHeading={false} withCta={false} />
      <Container className="max-w-3xl py-12">
        <p className="text-center text-xs leading-relaxed text-slate">{site.disclaimer}</p>
      </Container>
      <FinalCta />
    </>
  );
}
