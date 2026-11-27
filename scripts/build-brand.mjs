// Génère le logo FINORA Academy (SVG vectorisés + PNG haute résolution).
// Usage : node scripts/build-brand.mjs
import fs from "node:fs";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "public/brand");
const pngOut = path.join(out, "png");
fs.mkdirSync(pngOut, { recursive: true });

const C = { navy: "#101F2C", night: "#08131F", gold: "#D4B77A", ivory: "#F7F5EF", white: "#FFFFFF", black: "#0B0D10" };
const font = (w) => {
  const buf = fs.readFileSync(path.join(root, `node_modules/@fontsource/manrope/files/manrope-latin-${w}-normal.woff`));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};
const f800 = font(800), f700 = font(700);

// Texte vectorisé avec interlettrage (tracking en em).
function text(f, str, size, tracking) {
  let x = 0; const parts = [];
  for (const ch of str) {
    const g = f.charToGlyph(ch);
    parts.push(g.getPath(x, 0, size).toPathData(2));
    x += (g.advanceWidth / f.unitsPerEm) * size + tracking * size;
  }
  const width = x - tracking * size;
  const capH = ((f.tables.os2.sCapHeight || 700) / f.unitsPerEm) * size;
  return { d: parts.join(""), width, capH };
}

// Monogramme : un F dont le bras supérieur s'élève, comme une courbe de progression.
// Grille 64 × 64. Le bras supérieur se termine par une pointe ascendante.
const MARK = `<path d="M17 54V26.5H38.5L49 16" fill="none" stroke="currentColor" stroke-width="7.5" stroke-linejoin="miter" stroke-miterlimit="10"/><path d="M41.5 11.5H53.5V23.5Z" fill="currentColor"/><path d="M17 40.5H35" fill="none" stroke="currentColor" stroke-width="7.5"/>`;
const mark = (color, x = 0, y = 0, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" color="${color}" style="color:${color}">${MARK}</g>`;

const W1 = text(f800, "FINORA", 40, 0.06);
const W2 = text(f700, "ACADEMY", 12.5, 0.42);

function svg(w, h, body, bg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="FINORA Academy">${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ""}${body}</svg>`;
}

const variants = {
  "sur-fond-sombre": { mark: C.gold, word: C.white, sub: C.gold },
  "sur-fond-clair": { mark: C.gold, word: C.navy, sub: "#A88A4E" },
  blanc: { mark: C.white, word: C.white, sub: C.white },
  noir: { mark: C.black, word: C.black, sub: C.black },
  dore: { mark: C.gold, word: C.gold, sub: C.gold },
};

// Logo principal : monogramme + FINORA / ACADEMY empilés.
function principal(v) {
  const h = 64, gap = 13, tx = 64 + gap;
  const w = Math.ceil(tx + Math.max(W1.width, W2.width) + 2);
  const y1 = 32 + 2, y2 = y1 + 20;
  return svg(w, h, `${mark(v.mark)}<path transform="translate(${tx} ${y1})" fill="${v.word}" d="${W1.d}"/><path transform="translate(${tx + 1} ${y2})" fill="${v.sub}" d="${W2.d}"/>`);
}
// Logo horizontal : FINORA ACADEMY sur une ligne.
function horizontal(v) {
  const s = text(f700, "ACADEMY", 22, 0.28);
  const tx = 64 + 16, sx = tx + W1.width + 14;
  const w = Math.ceil(sx + s.width + 2), base = 32 + W1.capH / 2;
  return svg(w, 64, `${mark(v.mark)}<path transform="translate(${tx} ${base})" fill="${v.word}" d="${W1.d}"/><path transform="translate(${sx} ${base})" fill="${v.sub}" d="${s.d}"/>`);
}
// Logo vertical : monogramme centré au-dessus du nom.
function vertical(v) {
  const w = Math.ceil(Math.max(W1.width, W2.width) + 8), m = 72;
  const mx = (w - m) / 2;
  return svg(w, 152, `${mark(v.mark, mx, 0, m / 64)}<path transform="translate(${(w - W1.width) / 2} ${m + 16 + W1.capH})" fill="${v.word}" d="${W1.d}"/><path transform="translate(${(w - W2.width) / 2} ${m + 16 + W1.capH + 24})" fill="${v.sub}" d="${W2.d}"/>`);
}
const monogram = (v) => svg(64, 64, mark(v.mark));
// Icône d'application / favicon : monogramme doré sur bleu profond.
const appIcon = () => svg(64, 64, `<rect width="64" height="64" rx="14" fill="${C.navy}"/>${mark(C.gold, 9.6, 9.6, 0.7)}`);

const files = [];
for (const [name, v] of Object.entries(variants)) {
  files.push([`finora-principal-${name}`, principal(v)]);
  files.push([`finora-horizontal-${name}`, horizontal(v)]);
  files.push([`finora-vertical-${name}`, vertical(v)]);
  if (!name.startsWith("sur-fond")) files.push([`finora-monogramme-${name}`, monogram(v)]);
}
files.push(["finora-icone", appIcon()]);

for (const [name, s] of files) {
  fs.writeFileSync(path.join(out, `${name}.svg`), s);
  const width = name.includes("monogramme") || name === "finora-icone" ? 1024 : 2400;
  await sharp(Buffer.from(s), { density: 600 }).resize({ width }).png().toFile(path.join(pngOut, `${name}.png`));
}

// Favicons et icônes de l'application Next.js.
const appDir = path.join(root, "src/app");
fs.writeFileSync(path.join(appDir, "icon.svg"), appIcon());
await sharp(Buffer.from(appIcon()), { density: 600 }).resize(180).png().toFile(path.join(appDir, "apple-icon.png"));
await sharp(Buffer.from(appIcon()), { density: 600 }).resize(512).png().toFile(path.join(pngOut, "finora-icone-512.png"));
await sharp(Buffer.from(appIcon()), { density: 600 }).resize(192).png().toFile(path.join(pngOut, "finora-icone-192.png"));
// Image de partage Open Graph (1200 × 630).
{
  const v = variants["sur-fond-sombre"], logo = principal(v);
  const tag = text(f700, "Maîtrisez votre argent, construisez votre avenir.", 34, 0);
  const og = svg(1200, 630, `<defs><radialGradient id="g" cx="0.85" cy="0" r="0.8"><stop offset="0" stop-color="#D4B77A" stop-opacity="0.22"/><stop offset="1" stop-color="#D4B77A" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="630" fill="url(#g)"/><g transform="translate(100 210) scale(2.2)">${logo.replace(/^<svg[^>]*>|<\/svg>$/g, "")}</g><path transform="translate(100 480)" fill="#FFFFFF" fill-opacity="0.75" d="${tag.d}"/>`, C.navy);
  await sharp(Buffer.from(og)).png().toFile(path.join(root, "public/og.png"));
}
console.log(`${files.length} logos générés dans public/brand`);
