import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "center", tone = "light", as: H = "h2", className }: Props) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("mb-3 text-xs font-semibold uppercase tracking-[0.2em]", dark ? "text-gold" : "text-gold-ink")}>{eyebrow}</p>
      )}
      <H className={cn("text-3xl font-bold leading-tight sm:text-4xl", dark ? "text-white" : "text-navy")}>{title}</H>
      {description && <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-white/70" : "text-slate")}>{description}</p>}
    </Reveal>
  );
}
