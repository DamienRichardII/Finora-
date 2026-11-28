// Génère l'identité Plenty : 3 concepts de logo (SVG vectoriels, PNG, JPEG),
// favicons, icônes, visuels réseaux sociaux, motifs, planches de présentation
// et image de partage du site. Usage : npm run brand
//
// Tout est vectoriel : symboles en tracés (src/components/brand/symbols.ts),
// textes convertis en contours (Manrope) avec opentype.js. Aucun PNG encodé
// dans les SVG.
import fs from "node:fs";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";
import { SYMBOLS, CONCEPTS } from "../src/components/brand/symbols.ts";

const root = path.resolve(import.meta.dirname, "..");
const OUT = path.join(root, "public/branding/plenty");
const SITE_CONCEPT = "freedom"; // concept appliqué au site (voir src/config/brand.ts)

const C = { navy: "#101F2C", night: "#08131F", gold: "#D4B77A", ivory: "#F7F5EF", white: "#FFFFFF", slate: "#64748B", black: "#0B0D10" };
const DIRS = { freedom: "concept-01-freedom", wisdom: "concept-02-wisdom", heritage: "concept-03-heritage" };

const font = (w) => {
  const buf = fs.readFileSync(path.join(root, `node_modules/@fontsource/manrope/files/manrope-latin-${w}-normal.woff`));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};
const F = { 500: font(500), 600: font(600), 700: font(700), 800: font(800) };

/** Sérialise un tracé opentype décalé de dx (formatage maison : toPathData produit des NaN sur certains flottants). */
function pathData(p, dx) {
  const n = (v) => (Math.round(v * 100) / 100).toString();
  return p.commands
    .map((c) => {
      if (c.type === "M" || c.type === "L") return `${c.type}${n(c.x + dx)} ${n(c.y)}`;
      if (c.type === "Q") return `Q${n(c.x1 + dx)} ${n(c.y1)} ${n(c.x + dx)} ${n(c.y)}`;
      if (c.type === "C") return `C${n(c.x1 + dx)} ${n(c.y1)} ${n(c.x2 + dx)} ${n(c.y2)} ${n(c.x + dx)} ${n(c.y)}`;
      return "Z";
    })
    .join("");
}

/** Texte vectorisé. Retourne le tracé (ligne de base à y = 0), la largeur et la hauteur de capitale. */
function text(f, str, size, tracking = 0) {
  let x = 0;
  const parts = [];
  const glyphs = f.stringToGlyphs(str);
  glyphs.forEach((g, i) => {
    parts.push(pathData(g.getPath(0, 0, size), x));
    const kern = (i < glyphs.length - 1 && f.getKerningValue(g, glyphs[i + 1])) || 0;
    x += ((g.advanceWidth + kern) / f.unitsPerEm) * size + tracking * size;
  });
  const width = x - tracking * size;
  const capH = ((f.tables.os2.sCapHeight || 700) / f.unitsPerEm) * size;
  return { d: parts.join(""), width, capH };
}
const T = (f, str, size, x, y, fill, { tracking = 0, anchor = "start", opacity } = {}) => {
  const t = text(f, str, size, tracking);
  const dx = anchor === "middle" ? x - t.width / 2 : anchor === "end" ? x - t.width : x;
  return `<path transform="translate(${r(dx)} ${r(y)})" fill="${fill}"${opacity ? ` fill-opacity="${opacity}"` : ""} d="${t.d}"/>`;
};
/** Paragraphe vectorisé avec retour à la ligne. */
function para(f, str, size, x, y, maxW, fill, lh = 1.5) {
  const words = str.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (text(f, test, size).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test;
  }
  if (cur) lines.push(cur);
  return { svg: lines.map((l, i) => T(f, l, size, x, y + i * size * lh, fill)).join(""), height: lines.length * size * lh };
}
const r = (n) => Math.round(n * 100) / 100;

/** Symbole d'un concept à la taille `size` (unités du SVG parent). */
function symbol(id, color, x, y, size, small = false) {
  const s = SYMBOLS[id];
  return `<g transform="translate(${r(x)} ${r(y)}) scale(${r(size / 100)})" fill="none" stroke="${color}" stroke-width="${small ? s.strokeSmall : s.stroke}" stroke-linecap="round" stroke-linejoin="round">${s.paths.map((d) => `<path d="${d}"/>`).join("")}</g>`;
}

// Logotype : PLENTY en capitales espacées (principal) ; Plenty en bas de casse (variante testée).
const WORD = { f: F[600], tracking: 0.3 };
const word = (size) => text(WORD.f, "PLENTY", size, WORD.tracking);
const wordTitle = (size) => text(F[700], "Plenty", size, 0.01);

const svg = (w, h, body, bg, label = "Plenty") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(w)} ${r(h)}" width="${r(w)}" height="${r(h)}" role="img" aria-label="${label}">${bg ? `<rect width="${r(w)}" height="${r(h)}" fill="${bg}"/>` : ""}${body}</svg>`;

/** Mises en page du logo. `pad` ajoute une marge (en unités) pour les versions sur fond. */
const LAYOUTS = {
  horizontal(id, sym, wc, pad = 0) {
    const S = 100, wd = word(46), gap = 30;
    const w = S + gap + wd.width + pad * 2, h = S + pad * 2;
    const body = symbol(id, sym, pad, pad, S) + `<path transform="translate(${r(pad + S + gap)} ${r(pad + S / 2 + wd.capH / 2)})" fill="${wc}" d="${wd.d}"/>`;
    return { w, h, body };
  },
  vertical(id, sym, wc, pad = 0) {
    const S = 120, wd = word(44), gap = 34;
    const w = Math.max(S, wd.width) + pad * 2, h = S + gap + wd.capH + pad * 2;
    const body = symbol(id, sym, (w - S) / 2, pad, S) + `<path transform="translate(${r((w - wd.width) / 2)} ${r(pad + S + gap + wd.capH)})" fill="${wc}" d="${wd.d}"/>`;
    return { w, h, body };
  },
  symbole(id, sym, _wc, pad = 0) {
    const S = 100;
    return { w: S + pad * 2, h: S + pad * 2, body: symbol(id, sym, pad, pad, S) };
  },
};

const VARIANTS = {
  principal: { sym: C.gold, word: C.gold, bg: C.navy, label: "doré sur bleu profond" },
  "dore-sur-bleu-nuit": { sym: C.gold, word: C.gold, bg: C.night, label: "doré sur bleu nuit" },
  "dore-sur-blanc": { sym: C.gold, word: C.gold, bg: C.white, label: "doré sur blanc" },
  "noir-sur-blanc": { sym: C.black, word: C.black, bg: C.white, label: "noir sur blanc" },
  "blanc-sur-bleu-nuit": { sym: C.white, word: C.white, bg: C.night, label: "blanc sur bleu nuit" },
  "bleu-nuit-sur-ivoire": { sym: C.night, word: C.night, bg: C.ivory, label: "bleu nuit sur ivoire" },
  transparent: { sym: C.gold, word: C.gold, bg: null, label: "doré, fond transparent" },
};

const logo = (id, layout, v, pad) => {
  const L = LAYOUTS[layout](id, v.sym, v.word, pad ?? (v.bg ? (layout === "symbole" ? 22 : 36) : 0));
  return { ...L, svg: svg(L.w, L.h, L.body, v.bg) };
};

const png = (s, file, width, bg) => {
  // Densité calculée pour rasteriser directement à la taille cible (évite les rendus géants).
  const svgW = Number(/width="([\d.]+)"/.exec(s)?.[1] ?? width);
  let p = sharp(Buffer.from(s), { density: Math.min(2400, Math.max(1, (72 * width) / svgW)) }).resize({ width });
  if (bg) p = p.flatten({ background: bg });
  return file.endsWith(".jpg") ? p.jpeg({ quality: 92 }).toFile(file) : p.png({ compressionLevel: 9 }).toFile(file);
};
const mk = (...p) => { const d = path.join(OUT, ...p); fs.mkdirSync(d, { recursive: true }); return d; };

/** Fichier ICO contenant des PNG : `svgFor(taille)` donne le SVG adapté à chaque taille. */
async function ico(svgFor, file) {
  const sizes = [16, 32, 48];
  const imgs = await Promise.all(sizes.map((z) => sharp(Buffer.from(svgFor(z)), { density: (72 * z) / 100 }).resize(z, z).png().toBuffer()));
  const head = Buffer.alloc(6 + 16 * sizes.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
  let offset = head.length;
  sizes.forEach((z, i) => {
    const o = 6 + i * 16;
    head.writeUInt8(z, o); head.writeUInt8(z, o + 1); head.writeUInt8(0, o + 2); head.writeUInt8(0, o + 3);
    head.writeUInt16LE(1, o + 4); head.writeUInt16LE(32, o + 6);
    head.writeUInt32LE(imgs[i].length, o + 8); head.writeUInt32LE(offset, o + 12);
    offset += imgs[i].length;
  });
  fs.writeFileSync(file, Buffer.concat([head, ...imgs]));
}

/**
 * Icône carrée : symbole doré sur bleu profond. `rx` arrondi (0 pour iOS / Android adaptatif).
 * Si le concept a une version pleine (glyph), elle est utilisée : lisible dès 16 px.
 * `tiny` (16 px) : silhouette seule, sans détails découpés.
 */
const appIcon = (id, rx = 0, scale = 0.62, small = true, tiny = false) => {
  const S = 100 * scale, o = (100 - S) / 2, sym = SYMBOLS[id];
  let mark;
  if (sym.glyph) {
    const g = sym.glyph;
    mark = `<g transform="translate(${r(o)} ${r(o)}) scale(${r(S / 100)})"><g fill="${C.gold}" stroke="${C.gold}" stroke-width="3" stroke-linejoin="round">${g.fill.map((d) => `<path d="${d}"/>`).join("")}</g>${tiny ? "" : `<g fill="none" stroke="${C.navy}" stroke-width="${g.cutStroke}" stroke-linejoin="round">${g.cut.map((d) => `<path d="${d}"/>`).join("")}</g>`}</g>`;
  } else mark = symbol(id, C.gold, o, o, S, small);
  return svg(100, 100, `<rect width="100" height="100" rx="${rx}" fill="${C.navy}"/>${mark}`, null);
};

// ---------------------------------------------------------------------------
// 1. Logos par concept
// ---------------------------------------------------------------------------
let count = 0;
for (const id of Object.keys(SYMBOLS)) {
  const dir = DIRS[id];
  const svgDir = mk(dir, "svg"), pngDir = mk(dir, "png"), jpgDir = mk(dir, "jpg");
  for (const layout of Object.keys(LAYOUTS)) {
    for (const [vn, v] of Object.entries(VARIANTS)) {
      const L = logo(id, layout, v);
      fs.writeFileSync(path.join(svgDir, `plenty-${layout}-${vn}.svg`), L.svg); count++;
    }
    // PNG transparents 4096 px (doré, blanc, noir, bleu nuit)
    for (const [cn, col] of [["dore", C.gold], ["blanc", C.white], ["noir", C.black], ["bleu-nuit", C.night]]) {
      const L = logo(id, layout, { sym: col, word: col, bg: null }, 0);
      fs.writeFileSync(path.join(svgDir, `plenty-${layout}-${cn}-transparent.svg`), L.svg); count++;
      await png(L.svg, path.join(pngDir, `plenty-${layout}-${cn}-transparent-4096.png`), 4096);
    }
    // PNG sur fond blanc et sur fond bleu nuit, JPEG haute résolution
    await png(logo(id, layout, VARIANTS["dore-sur-blanc"]).svg, path.join(pngDir, `plenty-${layout}-fond-blanc.png`), 3000);
    await png(logo(id, layout, VARIANTS["dore-sur-bleu-nuit"]).svg, path.join(pngDir, `plenty-${layout}-fond-bleu-nuit.png`), 3000);
    await png(logo(id, layout, VARIANTS.principal).svg, path.join(jpgDir, `plenty-${layout}-principal.jpg`), 4096);
  }

  // Favicons et icônes
  const fav = mk("favicons", dir);
  const favSvg = appIcon(id, 22, 0.78, true);
  fs.writeFileSync(path.join(fav, "favicon.svg"), favSvg);
  await ico((z) => appIcon(id, 22, z <= 16 ? 0.84 : 0.78, true, z <= 16), path.join(fav, "favicon.ico"));
  await png(appIcon(id, 0, 0.62), path.join(fav, "apple-touch-icon.png"), 180);
  await png(appIcon(id, 0, 0.62), path.join(fav, "icon-192.png"), 192);
  await png(appIcon(id, 0, 0.62), path.join(fav, "icon-512.png"), 512);
  await png(appIcon(id, 0, 0.5), path.join(fav, "icon-maskable-512.png"), 512);
  await png(appIcon(id, 0, 0.58, false), path.join(fav, "app-icon-1024.png"), 1024);

  // Réseaux sociaux : photo de profil (zone sûre circulaire) et bannière de partage
  const soc = mk("social", dir);
  const profile = svg(1080, 1080, `<rect width="1080" height="1080" fill="${C.navy}"/>${symbol(id, C.gold, 290, 290, 500)}`, null);
  fs.writeFileSync(path.join(soc, "photo-profil.svg"), profile);
  await png(profile, path.join(soc, "photo-profil-1080.png"), 1080);
  await png(ogImage(id), path.join(soc, "partage-1200x630.png"), 1200);
}

// ---------------------------------------------------------------------------
// 2. Motifs (tuiles SVG raccordables, faible opacité)
// ---------------------------------------------------------------------------
{
  const dir = mk("patterns");
  const tile = (id, size, scale, op, color = C.gold) => {
    const s = size * scale;
    return svg(size, size, `<g opacity="${op}">${symbol(id, color, size / 4 - s / 2, size / 4 - s / 2, s)}${symbol(id, color, (3 * size) / 4 - s / 2, (3 * size) / 4 - s / 2, s)}</g>`, null, "Motif Plenty");
  };
  const lines = svg(160, 160, `<g fill="none" stroke="${C.gold}" stroke-width="1.6" opacity="0.14" stroke-linecap="round"><path d="M0 40C40 40 40 120 80 120S120 40 160 40"/><path d="M0 120C40 120 40 40 80 40S120 120 160 120"/></g>`, null, "Motif Plenty");
  const pats = {
    "motif-freedom.svg": tile("freedom", 160, 0.3, 0.12),
    "motif-wisdom.svg": tile("wisdom", 160, 0.32, 0.12),
    "motif-heritage.svg": tile("heritage", 160, 0.3, 0.12),
    "motif-entrelacs.svg": lines,
  };
  for (const [name, s] of Object.entries(pats)) {
    fs.writeFileSync(path.join(dir, name), s);
    const b64 = Buffer.from(s).toString("base64");
    const prev = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="600"><defs><pattern id="p" width="160" height="160" patternUnits="userSpaceOnUse"><image width="160" height="160" xlink:href="data:image/svg+xml;base64,${b64}"/></pattern></defs><rect width="1200" height="600" fill="${C.navy}"/><rect width="1200" height="600" fill="url(#p)"/></svg>`;
    await png(prev, path.join(dir, name.replace(".svg", "-apercu.png")), 1200);
  }
}

// ---------------------------------------------------------------------------
// 3. Planches de présentation
// ---------------------------------------------------------------------------
function ogImage(id) {
  // Composition centrée : reste lisible quand WhatsApp ou LinkedIn recadrent en carré.
  const S = 190, wd = word(64), head = "Maîtrisez votre argent, construisez votre avenir.";
  return svg(1200, 630, `<rect width="1200" height="630" fill="${C.navy}"/><defs><radialGradient id="g" cx="0.5" cy="0.32" r="0.6"><stop offset="0" stop-color="${C.gold}" stop-opacity="0.16"/><stop offset="1" stop-color="${C.gold}" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="630" fill="url(#g)"/>${symbol(id, C.gold, 600 - S / 2, 70, S)}<path transform="translate(${r(600 - wd.width / 2)} ${r(70 + S + 50 + wd.capH)})" fill="${C.gold}" d="${wd.d}"/>${T(F[600], head, 32, 600, 470, C.white, { anchor: "middle" })}${T(F[700], "ÉDUCATION FINANCIÈRE", 18, 600, 530, C.gold, { tracking: 0.32, anchor: "middle", opacity: 0.85 })}`, null);
}

/** Bouton arrondi (maquette). */
const btn = (x, y, w, h, label, fill, color, size, stroke) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="1.5"` : ""}/>${T(F[700], label, size, x + w / 2, y + h / 2 + size * 0.36, color, { anchor: "middle" })}`;

function board(id) {
  const W = 2400, M = 120;
  const info = CONCEPTS[id];
  let b = "";
  // En-tête
  b += T(F[700], "PLENTY · IDENTITÉ VISUELLE", 26, M, 150, C.slate, { tracking: 0.3 });
  b += T(F[800], info.label, 84, M, 260, C.navy);
  b += T(F[600], `Inspiration : ${info.inspiration}`, 34, M, 320, "#8A6A2F");
  b += T(F[500], "Proposition DamCompany pour Chris · à valider", 28, W - M, 150, C.slate, { anchor: "end" });

  // Logo principal (or sur bleu profond)
  const y1 = 400, h1 = 900;
  b += `<rect x="${M}" y="${y1}" width="${W - 2 * M}" height="${h1}" rx="40" fill="${C.navy}"/>`;
  const V = LAYOUTS.vertical(id, C.gold, C.gold, 0), vs = 3;
  b += `<g transform="translate(${r(W / 2 - (V.w * vs) / 2)} ${y1 + 130}) scale(${vs})">${V.body}</g>`;
  b += T(F[600], "Comprendre. Maîtriser. Construire.", 34, W / 2, y1 + h1 - 70, C.white, { anchor: "middle", opacity: 0.8 });
  b += T(F[700], "LOGO PRINCIPAL", 22, M + 50, y1 + 70, C.gold, { tracking: 0.3 });

  // Symbole seul + signification
  const y2 = y1 + h1 + 60, h2 = 640, half = (W - 2 * M - 60) / 2;
  b += `<rect x="${M}" y="${y2}" width="${half}" height="${h2}" rx="40" fill="${C.white}"/>`;
  b += symbol(id, C.gold, M + half / 2 - 210, y2 + 110, 420);
  b += T(F[700], "SYMBOLE SEUL", 22, M + 50, y2 + 70, C.slate, { tracking: 0.3 });
  const x2 = M + half + 60;
  b += `<rect x="${x2}" y="${y2}" width="${half}" height="${h2}" rx="40" fill="${C.white}"/>`;
  b += T(F[700], "SIGNIFICATION", 22, x2 + 50, y2 + 70, C.slate, { tracking: 0.3 });
  b += T(F[800], info.inspiration, 46, x2 + 50, y2 + 150, C.navy);
  const p = para(F[500], info.idea, 32, x2 + 50, y2 + 220, half - 100, C.navy, 1.55);
  b += p.svg;
  b += para(F[500], "Interprétation graphique contemporaine inspirée d'un symbole Adinkra traditionnel, dessinée pour Plenty.", 24, x2 + 50, y2 + h2 - 100, half - 100, C.slate, 1.5).svg;

  // Palette + typographie
  const y3 = y2 + h2 + 60, h3 = 420;
  b += `<rect x="${M}" y="${y3}" width="${half}" height="${h3}" rx="40" fill="${C.white}"/>`;
  b += T(F[700], "PALETTE", 22, M + 50, y3 + 70, C.slate, { tracking: 0.3 });
  const sw = [["Bleu profond", C.navy], ["Or champagne", C.gold], ["Ivoire", C.ivory], ["Blanc", C.white], ["Ardoise", C.slate], ["Bleu nuit", C.night]];
  const swW = (half - 100 - 5 * 20) / 6;
  sw.forEach(([n, c], i) => {
    const x = M + 50 + i * (swW + 20);
    b += `<rect x="${r(x)}" y="${y3 + 110}" width="${r(swW)}" height="170" rx="18" fill="${c}" stroke="#E2DED3" stroke-width="2"/>`;
    b += T(F[600], n, 19, x, y3 + 320, C.navy);
    b += T(F[500], c, 19, x, y3 + 350, C.slate);
  });
  b += `<rect x="${x2}" y="${y3}" width="${half}" height="${h3}" rx="40" fill="${C.white}"/>`;
  b += T(F[700], "LOGOTYPE · DEUX TRAITEMENTS TESTÉS", 22, x2 + 50, y3 + 70, C.slate, { tracking: 0.3 });
  const w1 = word(64), w2 = wordTitle(74);
  b += `<path transform="translate(${x2 + 50} ${y3 + 200})" fill="${C.navy}" d="${w1.d}"/>`;
  b += T(F[500], "Capitales espacées (retenu pour le logo principal)", 22, x2 + 50, y3 + 245, C.slate);
  b += `<path transform="translate(${x2 + 50} ${y3 + 345})" fill="${C.navy}" d="${w2.d}"/>`;
  b += T(F[500], "Majuscule initiale (usages éditoriaux)", 22, x2 + 50, y3 + 385, C.slate);

  // Variantes monochromes
  const y4 = y3 + h3 + 60, h4 = 330;
  const mono = [VARIANTS.principal, VARIANTS["noir-sur-blanc"], VARIANTS["blanc-sur-bleu-nuit"], VARIANTS["bleu-nuit-sur-ivoire"], VARIANTS["dore-sur-blanc"]];
  const mw = (W - 2 * M - 4 * 30) / 5;
  mono.forEach((v, i) => {
    const x = M + i * (mw + 30);
    b += `<rect x="${r(x)}" y="${y4}" width="${r(mw)}" height="${h4}" rx="30" fill="${v.bg}" stroke="#E2DED3" stroke-width="2"/>`;
    const Hh = LAYOUTS.horizontal(id, v.sym, v.word, 0), s = (mw - 80) / Hh.w;
    b += `<g transform="translate(${r(x + 40)} ${r(y4 + h4 / 2 - (Hh.h * s) / 2 - 16)}) scale(${r(s)})">${Hh.body}</g>`;
    b += T(F[500], v.label, 19, x + mw / 2, y4 + h4 - 34, v.bg === C.white || v.bg === C.ivory ? C.slate : "#C9D1DB", { anchor: "middle" });
  });

  // Simulations : header + hero du site
  const y5 = y4 + h4 + 60, h5 = 640;
  b += `<rect x="${M}" y="${y5}" width="${W - 2 * M}" height="${h5}" rx="40" fill="${C.navy}"/>`;
  b += `<rect x="${M}" y="${y5}" width="${W - 2 * M}" height="110" rx="40" fill="${C.night}"/><rect x="${M}" y="${y5 + 70}" width="${W - 2 * M}" height="40" fill="${C.night}"/>`;
  const Hd = LAYOUTS.horizontal(id, C.gold, C.white, 0), hs = 0.46;
  b += `<g transform="translate(${M + 60} ${r(y5 + 55 - (Hd.h * hs) / 2)}) scale(${hs})">${Hd.body}</g>`;
  ["Formations", "Packs et tarifs", "Ateliers", "À propos"].forEach((n, i) => (b += T(F[600], n, 22, 980 + i * 200, y5 + 63, "#C9D1DB")));
  b += btn(W - M - 260, y5 + 30, 200, 50, "Nous rejoindre", C.gold, C.navy, 20);
  const Vh = LAYOUTS.vertical(id, C.gold, C.white, 0), vh = 1.1;
  b += `<g transform="translate(${r(W / 2 - (Vh.w * vh) / 2)} ${y5 + 160}) scale(${vh})">${Vh.body}</g>`;
  b += T(F[700], "Maîtrisez votre argent, construisez votre avenir.", 40, W / 2, y5 + 455, C.white, { anchor: "middle" });
  b += btn(W / 2 - 330, y5 + 500, 320, 60, "Découvrir les formations", C.gold, C.navy, 22);
  b += btn(W / 2 + 20, y5 + 500, 260, 60, "Voir les offres", "none", C.white, 22, "#FFFFFF55");
  b += T(F[700], "SIMULATION · HEADER ET HERO DU SITE", 20, W - M - 50, y5 + h5 - 30, C.gold, { tracking: 0.3, anchor: "end" });

  // Rangée de simulations : smartphone, carte de visite, Instagram, couverture de formation
  const y6 = y5 + h5 + 60, h6 = 760, cw = (W - 2 * M - 3 * 40) / 4;
  const cell = (i) => M + i * (cw + 40);
  // Smartphone
  {
    const x = cell(0), pw = 300, ph = 620, px = x + (cw - pw) / 2, py = y6 + 40;
    b += `<rect x="${x}" y="${y6}" width="${r(cw)}" height="${h6}" rx="40" fill="${C.white}"/>`;
    b += `<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="44" fill="${C.night}"/><rect x="${px + 12}" y="${py + 12}" width="${pw - 24}" height="${ph - 24}" rx="34" fill="${C.navy}"/>`;
    b += `<rect x="${px + pw / 2 - 40}" y="${py + 22}" width="80" height="16" rx="8" fill="${C.night}"/>`;
    const Hm = LAYOUTS.horizontal(id, C.gold, C.white, 0), ms = 0.3;
    b += `<g transform="translate(${px + 32} ${py + 62}) scale(${ms})">${Hm.body}</g>`;
    b += `<path d="M${px + pw - 66} ${py + 70}h26M${px + pw - 66} ${py + 78}h26M${px + pw - 66} ${py + 86}h26" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>`;
    b += symbol(id, C.gold, px + pw / 2 - 50, py + 170, 100);
    b += T(F[700], "PLENTY", 30, px + pw / 2, py + 330, C.white, { anchor: "middle", tracking: 0.3 });
    b += T(F[600], "Maîtrisez votre argent,", 17, px + pw / 2, py + 385, C.white, { anchor: "middle" });
    b += T(F[600], "construisez votre avenir.", 17, px + pw / 2, py + 408, C.gold, { anchor: "middle" });
    b += btn(px + 36, py + 450, pw - 72, 44, "Découvrir les formations", C.gold, C.navy, 15);
    b += btn(px + 36, py + 506, pw - 72, 44, "Voir les offres", "none", C.white, 15, "#FFFFFF55");
    b += T(F[700], "SMARTPHONE", 18, x + cw / 2, y6 + h6 - 40, C.slate, { tracking: 0.3, anchor: "middle" });
  }
  // Carte de visite (recto / verso), sans coordonnées inventées
  {
    const x = cell(1), bw = cw - 80, bh = bw * 0.58, bx = x + 40;
    b += `<rect x="${x}" y="${y6}" width="${r(cw)}" height="${h6}" rx="40" fill="${C.white}"/>`;
    b += `<rect x="${bx}" y="${y6 + 60}" width="${r(bw)}" height="${r(bh)}" rx="14" fill="${C.navy}"/>`;
    b += symbol(id, C.gold, bx + bw / 2 - 70, y6 + 60 + bh / 2 - 70, 140);
    const by = y6 + 60 + bh + 40;
    b += `<rect x="${bx}" y="${by}" width="${r(bw)}" height="${r(bh)}" rx="14" fill="${C.ivory}" stroke="#E2DED3" stroke-width="2"/>`;
    const Hc = LAYOUTS.horizontal(id, C.gold, C.navy, 0), cs = 0.42;
    b += `<g transform="translate(${bx + 36} ${by + 36}) scale(${cs})">${Hc.body}</g>`;
    b += T(F[800], "Chris", 30, bx + 36, by + bh - 76, C.navy);
    b += T(F[500], "Fondateur", 22, bx + 36, by + bh - 40, C.slate);
    b += T(F[700], "CARTE DE VISITE", 18, x + cw / 2, y6 + h6 - 40, C.slate, { tracking: 0.3, anchor: "middle" });
  }
  // Instagram
  {
    const x = cell(2);
    b += `<rect x="${x}" y="${y6}" width="${r(cw)}" height="${h6}" rx="40" fill="${C.white}"/>`;
    const cx = x + 130, cy = y6 + 150;
    b += `<circle cx="${cx}" cy="${cy}" r="86" fill="none" stroke="${C.gold}" stroke-width="5"/><circle cx="${cx}" cy="${cy}" r="76" fill="${C.navy}"/>`;
    b += symbol(id, C.gold, cx - 42, cy - 42, 84, true);
    b += T(F[800], "Plenty", 30, x + 250, y6 + 140, C.navy);
    b += T(F[500], "Éducation financière", 22, x + 250, y6 + 178, C.slate);
    const g = (cw - 80 - 20) / 3;
    for (let i = 0; i < 6; i++) {
      const gx = x + 40 + (i % 3) * (g + 10), gy = y6 + 290 + Math.floor(i / 3) * (g + 10);
      b += `<rect x="${r(gx)}" y="${r(gy)}" width="${r(g)}" height="${r(g)}" fill="${i % 2 ? C.ivory : C.navy}"/>`;
      b += symbol(id, i % 2 ? C.navy : C.gold, gx + g / 2 - g * 0.25, gy + g / 2 - g * 0.25, g * 0.5, true);
    }
    b += T(F[700], "PROFIL INSTAGRAM", 18, x + cw / 2, y6 + h6 - 40, C.slate, { tracking: 0.3, anchor: "middle" });
  }
  // Couverture de formation
  {
    const x = cell(3), cx = x + 40, cwid = cw - 80, ch = 600;
    b += `<rect x="${x}" y="${y6}" width="${r(cw)}" height="${h6}" rx="40" fill="${C.white}"/>`;
    b += `<rect x="${cx}" y="${y6 + 40}" width="${r(cwid)}" height="${ch}" rx="26" fill="${C.navy}"/>`;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) b += `<g opacity="0.09">${symbol(id, C.gold, cx + 20 + i * 150, y6 + 70 + j * 150, 110)}</g>`;
    b += symbol(id, C.gold, cx + 40, y6 + 80, 70, true);
    b += T(F[700], "MODULE 2", 20, cx + 40, y6 + 420, C.gold, { tracking: 0.3 });
    b += para(F[800], "Apprendre à gérer son budget", 40, cx + 40, y6 + 480, cwid - 80, C.white, 1.25).svg;
    b += T(F[700], "PLENTY", 18, cx + 40, y6 + 40 + ch - 34, "#C9D1DB", { tracking: 0.3 });
    b += T(F[700], "COUVERTURE DE FORMATION", 18, x + cw / 2, y6 + h6 - 40, C.slate, { tracking: 0.3, anchor: "middle" });
  }
  const H = y6 + h6 + 150;
  b = `<rect width="${W}" height="${H}" fill="${C.ivory}"/>` + b;
  b += T(F[500], "Slogan conservé : « Comprendre. Maîtriser. Construire. » · Variante proposée, à valider : « Le savoir au service de la liberté. »", 24, M, H - 60, C.slate);
  return svg(W, H, b, null, `Planche ${info.label}`);
}

function comparison() {
  const W = 2400, H = 1500, M = 100;
  let b = `<rect width="${W}" height="${H}" fill="${C.ivory}"/>`;
  b += T(F[700], "PLENTY · TROIS PROPOSITIONS DE LOGO", 26, M, 130, C.slate, { tracking: 0.3 });
  b += T(F[800], "Comparatif des concepts", 70, M, 225, C.navy);
  b += T(F[600], "Recommandation DamCompany : Concept 01 · Freedom", 30, W - M, 225, "#8A6A2F", { anchor: "end" });
  const cw = (W - 2 * M - 2 * 50) / 3;
  Object.keys(SYMBOLS).forEach((id, i) => {
    const x = M + i * (cw + 50), y = 300;
    b += `<rect x="${r(x)}" y="${y}" width="${r(cw)}" height="760" rx="40" fill="${C.navy}"${id === "freedom" ? ` stroke="${C.gold}" stroke-width="5"` : ""}/>`;
    const V = LAYOUTS.vertical(id, C.gold, C.gold, 0), s = 2.6;
    b += `<g transform="translate(${r(x + cw / 2 - (V.w * s) / 2)} ${y + 140}) scale(${s})">${V.body}</g>`;
    b += T(F[700], CONCEPTS[id].label.toUpperCase(), 22, x + cw / 2, y + 680, C.gold, { tracking: 0.25, anchor: "middle" });
    b += T(F[500], `Inspiration : ${CONCEPTS[id].inspiration}`, 22, x + cw / 2, y + 718, "#C9D1DB", { anchor: "middle" });
    // Petites tailles : header et favicon
    const yy = y + 800;
    b += `<rect x="${r(x)}" y="${yy}" width="${r(cw)}" height="300" rx="40" fill="${C.white}"/>`;
    const Hh = LAYOUTS.horizontal(id, C.gold, C.navy, 0), hs = 0.5;
    b += `<g transform="translate(${r(x + 50)} ${yy + 60}) scale(${hs})">${Hh.body}</g>`;
    [64, 32, 16].forEach((z, k) => {
      const ix = x + 50 + k * 110;
      b += `<rect x="${r(ix)}" y="${yy + 170}" width="${z}" height="${z}" rx="${z * 0.22}" fill="${C.navy}"/>${symbol(id, C.gold, ix + z * 0.15, yy + 170 + z * 0.15, z * 0.7, true)}`;
    });
    b += T(F[500], "Header · favicons 64, 32 et 16 px", 20, x + cw - 50, yy + 260, C.slate, { anchor: "end" });
  });
  b += T(F[500], "Les noms Freedom, Wisdom et Heritage sont internes : seul le nom Plenty apparaît sur les logos.", 24, M, H - 50, C.slate);
  return svg(W, H, b, null, "Comparatif des concepts Plenty");
}

{
  const dir = mk("previews");
  for (const id of Object.keys(SYMBOLS)) {
    const s = board(id);
    fs.writeFileSync(path.join(dir, `planche-${DIRS[id]}.svg`), s);
    await png(s, path.join(dir, `planche-${DIRS[id]}.png`), 2400);
  }
  await png(comparison(), path.join(dir, "comparatif-concepts.png"), 2400);
  await sharp(path.join(dir, "comparatif-concepts.png")).resize(1200).png().toFile(path.join(dir, "comparatif-concepts-1200.png"));
}

// ---------------------------------------------------------------------------
// 4. Application au site (concept retenu)
// ---------------------------------------------------------------------------
{
  const appDir = path.join(root, "src/app");
  const favSvg = appIcon(SITE_CONCEPT, 22, 0.78, true);
  fs.writeFileSync(path.join(appDir, "icon.svg"), favSvg);
  await ico((z) => appIcon(SITE_CONCEPT, 22, z <= 16 ? 0.84 : 0.78, true, z <= 16), path.join(appDir, "favicon.ico"));
  // Icônes PNG explicites (navigateurs et robots qui ignorent le SVG)
  await png(appIcon(SITE_CONCEPT, 0, 0.62), path.join(root, "public/icon-192.png"), 192);
  await png(appIcon(SITE_CONCEPT, 0, 0.62), path.join(root, "public/icon-512.png"), 512);
  await png(appIcon(SITE_CONCEPT, 0, 0.62), path.join(appDir, "apple-icon.png"), 180);
  await png(ogImage(SITE_CONCEPT), path.join(root, "public/og.png"), 1200);
  // Icônes du manifeste (public/branding/plenty/favicons/<concept>/icon-*.png) : déjà générées ci-dessus.
}

console.log(`${count} SVG de logo générés dans public/branding/plenty (+ PNG, JPEG, favicons, motifs, planches).`);
