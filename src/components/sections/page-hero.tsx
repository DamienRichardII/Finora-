import Image from "next/image";
import type { Visual } from "@/assets/visuels";
import { Container } from "@/components/ui/container";

export function PageHero({ eyebrow, title, description, visual, children }: { eyebrow?: string; title: React.ReactNode; description?: React.ReactNode; visual?: Visual; children?: React.ReactNode }) {
  return (
    <section className="bg-navy-grain relative overflow-hidden text-white">
      {visual && (
        <>
          <Image src={visual.src} alt="" fill priority placeholder="blur" sizes="100vw" className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/45" />
        </>
      )}
      <Container className="relative py-16 sm:py-24">
        {eyebrow && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] sm:text-5xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{description}</p>}
        {children}
      </Container>
    </section>
  );
}
