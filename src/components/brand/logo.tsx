import { cn } from "@/lib/utils";

/** Monogramme FINORA : un F dont le bras supérieur s'élève (progression). Source : scripts/build-brand.mjs */
export function Monogram({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("text-gold", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d="M17 54V26.5H38.5L49 16" fill="none" stroke="currentColor" strokeWidth="7.5" strokeMiterlimit="10" />
      <path d="M41.5 11.5H53.5V23.5Z" fill="currentColor" />
      <path d="M17 40.5H35" fill="none" stroke="currentColor" strokeWidth="7.5" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Monogram className="size-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[19px] font-extrabold tracking-[0.06em]", tone === "dark" ? "text-white" : "text-navy")}>FINORA</span>
        <span className={cn("mt-1 font-display text-[9.5px] font-bold tracking-[0.42em]", tone === "dark" ? "text-gold" : "text-gold-ink")}>ACADEMY</span>
      </span>
    </span>
  );
}
