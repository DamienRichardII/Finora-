import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Module } from "@/content/modules";

export function ModuleCard({ module: m }: { module: Module }) {
  const Icon = m.icon;
  const n = String(m.number).padStart(2, "0");
  return (
    <Link
      href={`/formations/${m.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-navy/[0.06] bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative flex aspect-[16/10] items-end overflow-hidden bg-navy p-5">
        <Image src={m.visual.src} alt="" fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw" placeholder="blur" className="object-cover transition duration-500 group-hover:scale-105" />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/10" />
        <span className="absolute -bottom-5 right-3 font-display text-[6.5rem] font-extrabold leading-none text-white/[0.12]">{n}</span>
        <span className="absolute left-5 top-5 flex size-11 items-center justify-center rounded-2xl border border-gold/30 bg-navy/60 text-gold backdrop-blur transition duration-300 group-hover:scale-110">
          <Icon className="size-5" />
        </span>
        <span className="relative font-display text-sm font-bold tracking-wider text-gold">MODULE {n}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-bold leading-snug text-navy">{m.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">{m.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-gold-ink">
          Découvrir <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
