# Changelog

## [0.7.0] — 2026-11-28 — Rebranding Plenty (en attente du choix du logo)

### Ajouté
- Nouvelle identité Plenty : 3 concepts de logo inspirés des symboles Adinkra (Freedom, Wisdom, Heritage), déclinaisons SVG, PNG 4096 px, JPEG, favicons, icônes, visuels réseaux sociaux, motifs et planches (`public/branding/plenty`, `npm run brand`).
- Configuration de marque centralisée `src/config/brand.ts`, Web App Manifest, favicon ICO, page `/branding-preview` (hors production).

### Modifié
- FINORA Academy devient Plenty sur tout le site, dans le SEO, l'Open Graph, les données structurées et les e-mails des formulaires.
- Documentation mise à jour ; rapport et procédure de renommage externe dans `docs/REBRANDING_PLENTY.md`.

## [0.6.1] — 2026-11-28 — KPI mobile

### Modifié
- Mobile : le premier écran du hero occupe toute la hauteur visible (logo, slogan, CTA) ; les KPI n'apparaissent qu'au scroll.

## [0.6.0] — 2026-11-28 — Photos du fondateur

### Ajouté
- Deux photos du fondateur en WebP (`src/assets/fondateur`, 105 et 147 Ko), servies en tailles responsives par `next/image`.
- Accueil : portrait au bureau dans la section fondateur, à la place du visuel d'ambiance et du monogramme.
- À propos : portrait détouré posé sur une carte ivoire dégradée.

## [0.5.0] — 2026-11-27 — Visuels

### Ajouté
- 5 visuels d'ambiance (natures mortes, aucune personne) convertis en WebP (73 à 97 Ko), dans `src/assets/visuels` : images responsives `next/image`, flou de chargement, textes alternatifs.
- Hero : visuel globe et livre assombri derrière le logo. Pages Formations, Ateliers, Parrainage, À propos : bannière visuelle.
- Vignettes des 8 modules et panneau vidéo des pages module illustrés ; section fondateur illustrée sans être présentée comme une photo de Chris.

## [0.4.0] — 2026-11-27 — Mise en production du site vitrine

### Modifié
- Hero allégé : logo dominant, slogan sur une ligne, deux CTA centrés, KPI animés au scroll (8 modules, 100 % en ligne, 24/7).
- Suppression de toutes les mentions de démonstration à l'écran : bandeau, badges « Exemple », « À compléter », note sur les tarifs.
- Avis clients masqués tant qu'aucun avis réel n'est publié ; diplômes masqués tant qu'ils ne sont pas fournis.
- Ateliers présentés par thématique, sans date ni tarif inventés, avec un lien « Connaître les prochaines dates ».
- Pages légales : hébergeur (Vercel) renseigné ; seuls les champs d'identité de l'entreprise restent entre crochets.
- Mode démo désactivé par défaut (`NEXT_PUBLIC_DEMO_MODE=true` pour le réactiver).

## [0.3.0] — 2026-11-27 — Branding et site public

### Ajouté
- Identité FINORA Academy : monogramme « F ascendant », logo principal/horizontal/vertical, versions blanc/noir/doré/fond sombre/fond clair, SVG transparents + PNG HD, favicon, icône Apple, image Open Graph, charte graphique PDF.
- Design system : tokens Tailwind, boutons, champs, badges, apparition au scroll.
- Landing page : header sticky responsive, hero, bénéfices, 8 modules, fondateur, packs, ateliers, parrainage, avis (emplacements), FAQ, CTA final, footer avec newsletter.
- Pages : à propos, formations, 8 pages module, packs, ateliers, parrainage, FAQ, contact, connexion, inscription, mentions légales, confidentialité, CGV, cookies, 404.
- SEO : métadonnées par page, Open Graph, sitemap, robots, JSON-LD (EducationalOrganization, Course, FAQPage), polices auto-hébergées.

### Réellement fonctionnel
- Navigation, menu mobile, FAQ, bandeau et préférences cookies (stockés dans le navigateur).
- Formulaires contact et newsletter : validation serveur, anti-robot, limitation. **L'envoi réel nécessite** `RESEND_API_KEY`, `EMAIL_FROM`, `CONTACT_TO_EMAIL` ; sans eux, un message explicite s'affiche (aucun faux succès).
- Bouton « Réserver » d'un atelier : ouvre le formulaire de contact pré-rempli (en attendant le système de réservation, phase 7).
- Sélection d'un pack → page inscription avec récapitulatif du pack.

### Non encore fonctionnel (affiché comme tel)
- Connexion / inscription : champs désactivés avec mention « espace adhérent en cours de mise en service » (phase 4).
- Paiement, espace adhérent, back-office, messagerie, réservation en ligne : phases 4 à 7.

### Contenus provisoires (identifiés à l'écran)
Tarifs des packs, ateliers (« Exemple »), avis (« Démonstration »), biographie/diplômes/photo de Chris (« À compléter »), objectifs des modules (« Programme provisoire »), documents juridiques (crochets).
