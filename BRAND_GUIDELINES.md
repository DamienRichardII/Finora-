# Charte graphique — Plenty (v2.0, logo en attente de validation)

Nom officiel : **Plenty** (jamais « Plenty Academy »). Slogan : « Comprendre. Maîtriser. Construire. » Accroche : « Maîtrisez votre argent, construisez votre avenir. » Variante proposée, non validée : « Le savoir au service de la liberté. »

Configuration de marque unique : `src/config/brand.ts` (nom, accroches, SEO, signature e-mail, concept de logo, couleurs).

## Logo
Trois concepts inspirés de symboles Adinkra, réinterprétés de façon contemporaine (ce ne sont ni des reproductions ni de nouveaux symboles traditionnels) :

| Concept (nom interne) | Inspiration | Idée |
|---|---|---|
| 01 · Freedom (recommandé) | Fawohodie | Liberté, indépendance, émancipation et responsabilité : l'autonomie financière par l'éducation |
| 02 · Wisdom | Nyansapao | Le nœud de la sagesse : intelligence, ingéniosité, patience |
| 03 · Heritage | Fawohodie et Nyansapao | Nœud entrelacé ouvert en X, tenu par deux barres |

Seul le nom « Plenty » apparaît sur les logos. Logotype : PLENTY en capitales Manrope SemiBold, interlettrage 0,3 em (la version « Plenty » en bas de casse est réservée aux usages éditoriaux). Le concept affiché sur le site se règle dans `BRAND.logoConcept`.

Fichiers (`public/branding/plenty/`, générés par `npm run brand`, ne pas éditer à la main) :

| Dossier | Contenu |
|---|---|
| `concept-0X-*/svg` | `plenty-{horizontal,vertical,symbole}-{principal,dore-sur-bleu-nuit,dore-sur-blanc,noir-sur-blanc,blanc-sur-bleu-nuit,bleu-nuit-sur-ivoire,transparent}.svg`, plus `-{dore,blanc,noir,bleu-nuit}-transparent.svg` |
| `concept-0X-*/png` | PNG transparents 4096 px, PNG sur fond blanc et sur fond bleu nuit |
| `concept-0X-*/jpg` | JPEG 4096 px (or sur bleu profond) |
| `favicons/concept-0X-*` | `favicon.ico` (16/32/48), `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `app-icon-1024.png` |
| `social/concept-0X-*` | Photo de profil 1080 px (SVG et PNG), image de partage 1200 × 630 |
| `patterns` | Motifs raccordables à faible opacité (SVG) et aperçus |
| `previews` | Planche par concept (SVG et PNG) et planche comparative |

Tous les SVG sont de vrais tracés vectoriels (textes convertis en contours). Règles : zone de protection = un quart de la hauteur du symbole ; taille minimale 16 px (symbole, trait épaissi), 120 px (logo horizontal) ; ne pas déformer, recolorer hors palette, ajouter ombre, dégradé ou effet métallique.

Respect culturel : ne pas inventer de signification historique, ne pas reprendre l'identité d'Atelier Adinkra (logo, typographie, encadrements). Vérifier la disponibilité juridique du nom et du logo (INPI, EUIPO) avant exploitation commerciale.

Archive : l'ancienne identité FINORA Academy reste dans `public/brand/` (non supprimée, plus utilisée par le site).

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
| Logo React (`BrandSymbol`, `Wordmark`, `Logo`) | `src/components/brand/logo.tsx`, géométrie `src/components/brand/symbols.ts` |

Principes : cartes arrondies 20 px, ombres douces, boutons en pilule, icônes Lucide, sections de 80 à 112 px de hauteur de marge, fonds sombres avec halo doré très léger (`.bg-navy-grain`).

## Ton éditorial
On dit : comprendre, apprendre, progresser, construire ; exemples concrets ; risques toujours mentionnés. On ne dit jamais : « devenez riche », rendement garanti, « liberté financière en X jours », ni que Plenty est une banque ou un conseiller agréé. L'avertissement pédagogique figure dans le footer et sur chaque page formation.
