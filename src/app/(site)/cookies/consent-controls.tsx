"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { readConsent, saveConsent, type Consent } from "@/components/site/cookie-banner";

export function ConsentControls() {
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);
  useEffect(() => {
    const sync = () => setConsent(readConsent());
    sync();
    window.addEventListener("finora-consent", sync);
    return () => window.removeEventListener("finora-consent", sync);
  }, []);

  const label = consent === undefined ? "…" : consent === null ? "aucun choix enregistré" : consent.analytics ? "mesure d'audience acceptée" : "mesure d'audience refusée";
  return (
    <div className="rounded-xl border border-navy/10 bg-white p-5">
      <p className="text-sm">
        Choix actuel : <strong>{label}</strong>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" variant="outline-dark" onClick={() => saveConsent(false)}>
          Refuser la mesure d&apos;audience
        </Button>
        <Button size="sm" onClick={() => saveConsent(true)}>
          Accepter la mesure d&apos;audience
        </Button>
      </div>
    </div>
  );
}
