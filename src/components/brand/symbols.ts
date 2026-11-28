/**
 * Symboles Plenty : géométrie partagée entre le site (composants React) et le
 * script d'export (scripts/build-plenty-brand.mjs). Grille 100 × 100, tracés
 * vectoriels en trait (stroke), sans dépendance.
 *
 * Ce sont des interprétations graphiques contemporaines inspirées de symboles
 * Adinkra (Fawohodie, Nyansapao), pas des reproductions ni de nouveaux symboles
 * traditionnels.
 */

export type ConceptId = "freedom" | "wisdom" | "heritage";

export type BrandSymbol = {
  /** Tracés en trait (stroke). */
  paths: string[];
  /** Épaisseur de trait par défaut sur la grille 100 × 100. */
  stroke: number;
  /** Épaisseur conseillée pour les petites tailles (favicon, header mobile). */
  strokeSmall: number;
};

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Courbe fermée lissée (Catmull-Rom → Bézier cubiques). */
function smoothClosed(pts: [number, number][]): string {
  const n = pts.length;
  let d = `M${r2(pts[0][0])} ${r2(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${r2(c1[0])} ${r2(c1[1])} ${r2(c2[0])} ${r2(c2[1])} ${r2(p2[0])} ${r2(p2[1])}`;
  }
  return d + "Z";
}

/**
 * Nœud à quatre boucles (hypotrochoïde k = 3), tracé d'un seul trait continu :
 * les boucles s'entrelacent autour d'un centre, comme un nœud.
 */
function knot({ cx = 50, cy = 50, sx, sy, d = 1.9, rot = 0, steps = 120 }: { cx?: number; cy?: number; sx: number; sy: number; d?: number; rot?: number; steps?: number }): string {
  const pts: [number, number][] = [];
  const c = Math.cos(rot), s = Math.sin(rot);
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const x = (3 * Math.cos(t) + d * Math.cos(3 * t)) / (3 + d);
    const y = (3 * Math.sin(t) - d * Math.sin(3 * t)) / (3 + d);
    const X = x * sx, Y = y * sy;
    pts.push([cx + X * c - Y * s, cy + X * s + Y * c]);
  }
  return smoothClosed(pts);
}

/**
 * Moitié haute de Freedom (bord droit avec encoche centrale, flancs qui se
 * rejoignent au centre), mise à l'échelle k et décalée de dy ; flip = moitié basse.
 */
function wing(k: number, dy: number, flip = false): string {
  const T = (x: number, y: number) => {
    const X = 50 + (x - 50) * k;
    let Y = 12 + (y - 12) * k + dy;
    if (flip) Y = 100 - Y;
    return `${r2(X)} ${r2(Y)}`;
  };
  return `M${T(14, 12)}L${T(36, 12)}C${T(42, 12)} ${T(46, 22)} ${T(50, 30)}C${T(54, 22)} ${T(58, 12)} ${T(64, 12)}L${T(86, 12)}C${T(86, 30)} ${T(66, 40)} ${T(54, 47)}C${T(51.5, 48.6)} ${T(48.5, 48.6)} ${T(46, 47)}C${T(34, 40)} ${T(14, 30)} ${T(14, 12)}Z`;
}

/** Concept 01, Freedom : deux ailes symétriques à double contour, inspirées de Fawohodie. */
const freedom: BrandSymbol = {
  stroke: 4.6,
  strokeSmall: 7,
  paths: [wing(1, 0), wing(1, 0, true), wing(0.56, 7.5), wing(0.56, 7.5, true)],
};

/** Concept 02, Wisdom : nœud vertical d'un seul trait, boucles entrelacées, inspiré de Nyansapao. */
const wisdom: BrandSymbol = {
  stroke: 4.6,
  strokeSmall: 7,
  paths: [knot({ sx: 34, sy: 44, d: 4 })],
};

/** Concept 03, Heritage : nœud en X (Nyansapao) tenu par les barres de Fawohodie. */
const heritage: BrandSymbol = {
  stroke: 4.8,
  strokeSmall: 7.2,
  paths: [knot({ sx: 33, sy: 33, d: 2.2, rot: Math.PI / 4 }), "M20 12H80", "M20 88H80"],
};

export const SYMBOLS: Record<ConceptId, BrandSymbol> = { freedom, wisdom, heritage };

export const CONCEPTS: Record<ConceptId, { label: string; inspiration: string; idea: string }> = {
  freedom: {
    label: "Concept 01 · Freedom",
    inspiration: "Fawohodie",
    idea: "Liberté, indépendance et émancipation, avec les responsabilités qui les accompagnent : la finalité de Plenty, l'autonomie financière par l'éducation.",
  },
  wisdom: {
    label: "Concept 02 · Wisdom",
    inspiration: "Nyansapao",
    idea: "Le nœud de la sagesse : intelligence, ingéniosité et patience, la capacité à choisir les meilleurs moyens pour atteindre un objectif. La méthode de Plenty : apprendre pour décider de façon éclairée.",
  },
  heritage: {
    label: "Concept 03 · Heritage",
    inspiration: "Fawohodie et Nyansapao",
    idea: "Une interprétation contemporaine qui réunit les deux inspirations : le nœud entrelacé de la sagesse, ouvert en X comme Fawohodie et tenu par deux barres. Ce n'est pas un symbole Adinkra traditionnel.",
  },
};
