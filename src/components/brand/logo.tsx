import { cn } from "@/lib/utils";
import { BRAND } from "@/config/brand";
import { SYMBOLS, type ConceptId } from "./symbols";

/**
 * Symbole Plenty (tracés vectoriels partagés avec scripts/build-plenty-brand.mjs).
 * `small` épaissit le trait pour les petites tailles.
 */
export function BrandSymbol({ concept = BRAND.logoConcept, small = false, className, title }: { concept?: ConceptId; small?: boolean; className?: string; title?: string }) {
  const s = SYMBOLS[concept];
  return (
    <svg viewBox="0 0 100 100" className={cn("text-gold", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <g fill="none" stroke="currentColor" strokeWidth={small ? s.strokeSmall : s.stroke} strokeLinecap="round" strokeLinejoin="round">
        {s.paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

/** Ancien nom conservé pour les imports existants. */
export const Monogram = BrandSymbol;

/** Logotype : PLENTY en capitales espacées (Manrope). */
export function Wordmark({ className }: { className?: string }) {
  return <span className={cn("font-display font-semibold uppercase leading-none tracking-[0.3em]", className)}>{BRAND.name}</span>;
}

export function Logo({ tone = "dark", concept, className }: { tone?: "dark" | "light"; concept?: ConceptId; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <BrandSymbol concept={concept} small className="size-9 shrink-0" />
      <Wordmark className={cn("text-[19px] -mr-[0.3em]", tone === "dark" ? "text-white" : "text-navy")} />
    </span>
  );
}
