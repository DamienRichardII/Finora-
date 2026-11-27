import { Container } from "@/components/ui/container";

export function PageHero({ eyebrow, title, description, children }: { eyebrow?: string; title: React.ReactNode; description?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="bg-navy-grain text-white">
      <Container className="py-16 sm:py-24">
        {eyebrow && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] sm:text-5xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">{description}</p>}
        {children}
      </Container>
    </section>
  );
}
