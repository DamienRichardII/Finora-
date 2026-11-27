import { cn } from "@/lib/utils";

/** Pastille "à compléter" / "démonstration" : rend les placeholders explicites. */
export function PlaceholderBadge({ children = "À compléter", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-dashed border-gold-ink/40 bg-gold/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-gold-ink", className)}>
      {children}
    </span>
  );
}

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium", className)}>{children}</span>;
}
