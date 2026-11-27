import { Check, PlayCircle } from "lucide-react";
import { modules } from "@/content/modules";
import { Monogram } from "@/components/brand/logo";

/** Visuel illustratif de l'interface (aucune donnée réelle). Remplacé par `site.heroImage` si une photo est fournie. */
export function HeroVisual() {
  const preview = modules.slice(0, 4);
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md select-none py-6 lg:max-w-none lg:py-10">
      {/* Courbe de progression décorative */}
      <svg viewBox="0 0 400 260" preserveAspectRatio="none" className="absolute -inset-x-6 bottom-0 h-[85%] w-[calc(100%+3rem)]" fill="none">
        <defs>
          <linearGradient id="hv-line" x1="0" x2="1">
            <stop offset="0" stopColor="#D4B77A" stopOpacity="0" />
            <stop offset="1" stopColor="#D4B77A" />
          </linearGradient>
          <linearGradient id="hv-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#D4B77A" stopOpacity="0.18" />
            <stop offset="1" stopColor="#D4B77A" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[60, 110, 160, 210].map((y) => (
          <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="white" strokeOpacity="0.05" />
        ))}
        <path d="M0 220 C60 210 90 190 130 180 S200 170 240 130 S320 80 400 30 V260 H0Z" fill="url(#hv-area)" />
        <path d="M0 220 C60 210 90 190 130 180 S200 170 240 130 S320 80 400 30" stroke="url(#hv-line)" strokeWidth="2.5" />
        
      </svg>

      <div className="relative ml-auto max-w-sm rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-2 shadow-2xl backdrop-blur-xl">
        <div className="rounded-[1.4rem] bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-navy">
                <Monogram className="size-6" />
              </span>
              <div>
                <p className="text-xs text-slate">Mon parcours</p>
                <p className="font-display text-sm font-bold text-navy">Éducation financière</p>
              </div>
            </div>
            <div className="relative size-14">
              <svg viewBox="0 0 36 36" className="size-14 -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#ECE7DA" strokeWidth="3.5" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#D4B77A" strokeWidth="3.5" strokeDasharray="97.4" strokeDashoffset="60.9" strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-display text-xs font-bold text-navy">3/8</span>
            </div>
          </div>

          <ul className="mt-5 space-y-2">
            {preview.map((m, i) => {
              const done = i < 2;
              const current = i === 2;
              return (
                <li key={m.slug} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${current ? "bg-navy text-white" : "bg-ivory"}`}>
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${done ? "bg-gold text-navy" : current ? "bg-white/10 text-gold" : "bg-white text-slate"}`}
                  >
                    {done ? <Check className="size-3.5" /> : String(m.number).padStart(2, "0")}
                  </span>
                  <span className={`truncate text-sm font-medium ${current ? "text-white" : "text-navy"}`}>{m.title}</span>
                  {current && <PlayCircle className="ml-auto size-5 shrink-0 text-gold" />}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="absolute bottom-2 left-0 hidden rounded-2xl border border-white/10 bg-navy-700/90 px-4 py-3 shadow-xl backdrop-blur sm:block">
        <p className="text-[11px] uppercase tracking-wider text-white/50">Reprendre</p>
        <p className="font-display text-sm font-semibold text-white">Module 3 · Épargne</p>
      </div>
    </div>
  );
}
