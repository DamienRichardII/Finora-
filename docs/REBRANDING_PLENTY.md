# Rebranding FINORA Academy → Plenty

Date : 28/11/2026 · Agence : DamCompany · Client : Chris
Statut : branche `feat/rebranding-plenty`, **non fusionnée** tant que le concept de logo n'est pas choisi.

## 1. Ce qui a été fait

### Identité
- 3 concepts de logo inspirés de symboles Adinkra, en tracés vectoriels : **01 Freedom** (Fawohodie, recommandé), **02 Wisdom** (Nyansapao), **03 Heritage** (combinaison). Géométrie : `src/components/brand/symbols.ts`.
- Logotype PLENTY (Manrope SemiBold, capitales espacées) ; variante « Plenty » testée sur les planches.
- Générateur : `scripts/build-plenty-brand.mjs` (`npm run brand`). Sortie dans `public/branding/plenty/` : 99 SVG de logo, PNG transparents 4096 px, PNG sur blanc et sur bleu nuit, JPEG 4096 px, favicons ICO/SVG, icônes 180/192/512/1024 et maskable, photos de profil 1080 px, images de partage 1200 × 630, 4 motifs, 3 planches de présentation et 1 planche comparative.
- Page de comparaison `/branding-preview` : visible en local et sur les préversions Vercel, renvoie 404 en production (`VERCEL_ENV=production`), non indexée, absente du sitemap. À supprimer après le choix.

### Site
- Configuration de marque centralisée : `src/config/brand.ts` (`BRAND` : nom, slogan, accroche, SEO, signature e-mail, concept de logo, couleurs). `src/content/site.ts` en dérive.
- Toutes les mentions visibles de FINORA Academy remplacées par `BRAND.name` : header, footer, hero, accueil, À propos, Formations, Packs, Ateliers, Parrainage, FAQ, Contact, Connexion, bandeau cookies, pages légales, textes alternatifs des photos du fondateur, objets des e-mails envoyés par les formulaires.
- Hero : symbole + PLENTY + « Éducation financière ». Header et footer : symbole + PLENTY.
- SEO : titre « Plenty — Votre plateforme d'éducation financière », meta description proposée, Open Graph, Twitter Card, données structurées (logo), favicon (`src/app/favicon.ico`, `icon.svg`, `apple-icon.png`), Web App Manifest (`src/app/manifest.ts`), image de partage `public/og.png`.
- Documentation : README, CLAUDE.md, BRAND_GUIDELINES (v2.0), CLIENT_GUIDE, PROJECT_BRIEF, DEPLOYMENT, CHANGELOG.

### Volontairement inchangé
- Fonctionnalités, structure des pages, direction artistique, animations, photos du fondateur, visuels.
- Identifiants techniques : clé de consentement `finora-consent-v1` et événement `finora-consent` (changer la clé ferait réapparaître le bandeau cookies chez les visiteurs ayant déjà répondu), nom du paquet npm `finora-academy`, dépôt GitHub, projet et URL Vercel.
- Ancienne identité FINORA dans `public/brand/` et ancien script `scripts/legacy-build-brand-finora.mjs` : archivés, non supprimés, plus utilisés.

### Hors périmètre actuel (n'existe pas encore dans le code)
Espace adhérent, espace administrateur, tunnel de paiement, e-mails transactionnels (bienvenue, vérification, mot de passe, paiement, réservation, parrainage, factures) : ces écrans et modèles arrivent avec la phase 4 (en pause). Ils devront lire `BRAND` et utiliser `BRAND.emailSignature` (« L'équipe Plenty / Comprendre. Maîtriser. Construire. »).

## 2. Tests
| Contrôle | Résultat |
|---|---|
| `npm run lint` | OK |
| `npx tsc --noEmit` | OK |
| `next build` | OK (32 pages, dont `/manifest.webmanifest` et `/branding-preview`) |
| Recherche « FINORA » dans `src/` | Seuls restent les identifiants techniques ci-dessus |
| Rendu 390 px et 1440 px (accueil, À propos, `/branding-preview`) | OK, aucun débordement horizontal |
| Balises `<title>`, Open Graph, icônes, manifeste dans le HTML servi | OK |
| SVG : absence d'image encodée et de valeur invalide | OK |

Pas de suite de tests automatisés dans le projet à ce stade.

## 3. Procédure de renommage externe (à exécuter seulement après accord)
Ordre conseillé, une étape à la fois, en vérifiant le site après chacune :

1. **Choix du logo** : régler `BRAND.logoConcept` puis `SITE_CONCEPT` dans le script, lancer `npm run brand`, fusionner la PR.
2. **Domaine** : acheter le domaine choisi avec Chris ; dans Vercel > Settings > Domains, l'ajouter au projet, configurer les DNS indiqués, attendre le certificat. Garder `finora-chi-roan.vercel.app` actif.
3. **Variable `NEXT_PUBLIC_SITE_URL`** : la passer au nouveau domaine dans Vercel (production), redéployer. Elle alimente les URLs canoniques, le sitemap et l'Open Graph.
4. **Redirections** : rediriger l'ancienne URL Vercel et, le cas échéant, l'ancien domaine vers le nouveau en 308 (Vercel > Domains > Redirect, ou `redirects` dans `next.config`).
5. **Projet Vercel** : renommer en `plenty` (Settings > General). L'URL `*.vercel.app` change ; vérifier qu'aucun service ne l'utilise encore avant.
6. **Dépôt GitHub** : renommer `Finora-` en `plenty` (Settings > General). GitHub redirige l'ancienne adresse ; mettre à jour les clones (`git remote set-url origin …`) et vérifier que l'intégration Vercel suit le dépôt.
7. **Supabase** (phase 4) : Authentication > URL Configuration : Site URL = nouveau domaine, ajouter les Redirect URLs (`https://<domaine>/auth/callback`, préversions Vercel). Modèles d'e-mails d'authentification : nom Plenty et signature.
8. **Stripe** (phase 4, mode test d'abord) : nom public du compte, logo et couleurs (Settings > Branding), URL du webhook `https://<domaine>/api/stripe/webhook` (créer le nouveau point de terminaison, mettre à jour le secret dans Vercel, supprimer l'ancien seulement après vérification), URLs de succès et d'annulation.
9. **E-mails** : `EMAIL_FROM="Plenty <bonjour@<domaine>>"`, vérifier le domaine chez Resend (SPF, DKIM).
10. **Nom du paquet** (`package.json`) : renommage optionnel et sans impact fonctionnel.

## 4. Reste à faire en externe
- Choix du concept de logo par Chris (préversion, page `/branding-preview`).
- Vérification juridique du nom « Plenty » et du logo (INPI, EUIPO), classes 41 (éducation) et 36 si besoin.
- Choix et achat du domaine officiel, puis étapes 2 à 9 ci-dessus.
- Validation éventuelle de la variante de slogan « Le savoir au service de la liberté. ».
- Mise à jour des réseaux sociaux (photo de profil fournie dans `public/branding/plenty/social/`).
