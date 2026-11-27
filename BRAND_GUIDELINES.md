# Charte graphique — FINORA Academy (v1.0, proposition à valider)

Version mise en page : `public/brand/FINORA-charte-graphique.pdf` (source : `brand/charte.html`).

## Logo
**Monogramme** : un F géométrique dont le bras supérieur s'élève en flèche de progression (comprendre → maîtriser → construire). Dessin volontairement architectural, sans codes du trading.

| Fichier (public/brand) | Usage |
|---|---|
| `finora-principal-*` | Logo principal : monogramme + FINORA / ACADEMY empilés |
| `finora-horizontal-*` | Une ligne, pour bandeaux et signatures e-mail |
| `finora-vertical-*` | Monogramme centré au-dessus du nom, réseaux sociaux, couvertures |
| `finora-monogramme-*` | Monogramme seul |
| `finora-icone.svg` / `png/finora-icone-512.png` | Favicon, icône d'application (or sur bleu profond) |

Variantes : `sur-fond-sombre` (texte blanc, accents or), `sur-fond-clair` (texte bleu profond), `blanc`, `noir`, `dore`. Tous les SVG ont un fond transparent ; PNG 2400 px (logos) et 1024 px (monogrammes) dans `public/brand/png`. Les textes sont vectorisés (aucune police requise).

Règles : zone de protection = hauteur du bras médian ; taille minimale 24 px (monogramme), 120 px (principal) ; ne pas déformer, recolorer hors palette, ajouter ombre ou contour. Régénération : `npm run brand`.

## Couleurs
| Nom | HEX | Token Tailwind | Usage |
|---|---|---|---|
| Bleu profond | `#101F2C` | `navy` | Hero, navigation, footer, boutons secondaires |
| Or champagne | `#D4B77A` | `gold` | Logo, CTA, accents (jamais pour du texte courant sur clair) |
| Blanc ivoire | `#F7F5EF` | `ivory` | Arrière-plans |
| Blanc pur | `#FFFFFF` | `white` | Cartes et contenus |
| Gris ardoise | `#64748B` | — | Référence palette |
| Ardoise texte | `#5A6779` | `slate` | Textes secondaires (AA 5,3:1 sur ivoire) |
| Bleu nuit | `#08131F` | `night` | Footer, mode sombre, contrastes |
| Or encre | `#8A6A2F` | `gold-ink` | Petits textes dorés sur fond clair (AA 4,6:1) |
| Or clair | `#E6D3A8` | `gold-light` | Survol des boutons dorés |

Proportions : 60 % ivoire/blanc, 30 % bleu profond, 10 % or.

## Typographies
- **Manrope** (titres) : 800 pour les grands titres, 700 pour les sous-titres, interlettrage -2 %.
- **Inter** (textes et interfaces) : 400 / 500 / 600.
- Auto-hébergées via `@fontsource-variable` (pas d'appel à Google Fonts : RGPD et performance).

## Design system (code)
| Élément | Fichier |
|---|---|
| Tokens (couleurs, polices, rayons, ombres) | `src/app/globals.css` |
| Bouton (`gold`, `navy`, `outline-light`, `outline-dark`, `ghost` × `sm/md/lg`) | `src/components/ui/button.tsx` |
| Conteneur, titre de section, champ de formulaire, badges | `src/components/ui/*` |
| Apparition au scroll (respecte `prefers-reduced-motion`) | `src/components/ui/reveal.tsx` |
| Logo React | `src/components/brand/logo.tsx` |

Principes : cartes arrondies 20 px, ombres douces, boutons en pilule, icônes Lucide, sections de 80 à 112 px de hauteur de marge, fonds sombres avec halo doré très léger (`.bg-navy-grain`).

## Ton éditorial
On dit : comprendre, apprendre, progresser, construire ; exemples concrets ; risques toujours mentionnés. On ne dit jamais : « devenez riche », rendement garanti, « liberté financière en X jours », ni que FINORA Academy est une banque ou un conseiller agréé. L'avertissement pédagogique figure dans le footer et sur chaque page formation.
