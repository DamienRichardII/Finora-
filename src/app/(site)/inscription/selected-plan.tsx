"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getPlan, intervalLabel } from "@/content/plans";
import { formatPrice } from "@/lib/utils";

export function SelectedPlan() {
  const plan = getPlan(useSearchParams().get("pack"));
  if (!plan) return null;
  return (
    <div className="mb-6 flex items-center justify-between gap-4 rounded-xl bg-navy p-4 text-white">
      <div>
        <p className="text-xs uppercase tracking-wider text-white/50">Pack sélectionné</p>
        <p className="font-display font-bold">
          {plan.name} · {formatPrice(plan.priceCents)}
          {intervalLabel[plan.interval]}
        </p>
      </div>
      <Link href="/packs" className="text-sm font-semibold text-gold hover:underline">
        Modifier
      </Link>
    </div>
  );
}
