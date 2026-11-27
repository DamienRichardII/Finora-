import { site } from "@/content/site";

export function DemoBanner() {
  if (!site.demoMode) return null;
  return (
    <div className="bg-gold px-4 py-1.5 text-center text-xs font-medium text-navy">
      Version de démonstration<span className="hidden sm:inline"> : tarifs, ateliers et avis sont des exemples non contractuels</span>.
    </div>
  );
}
