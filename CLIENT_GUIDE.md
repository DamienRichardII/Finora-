# Guide client — Plenty

Bonjour Chris, ce guide explique ce qui est prêt, comment modifier vos contenus et ce dont nous avons besoin de votre part.

## Ce qui est prêt
- Votre identité visuelle (logo et charte : `public/branding/plenty/` et `BRAND_GUIDELINES.md`).
- Le site public complet, consultable sur ordinateur, tablette et smartphone.
- Le site n'affiche aucune mention de démonstration. Les informations manquantes listées ci-dessous restent à fournir : tant qu'elles manquent, les sections concernées sont masquées (avis, diplômes, réseaux sociaux) ou présentées sans date (ateliers). Les pages légales contiennent encore des champs entre crochets (raison sociale, SIREN, adresse, médiateur…) à remplir avant l'ouverture commerciale.
- Les tarifs affichés restent des hypothèses à valider avant toute vente.

## Modifier les contenus (en attendant l'espace administrateur)
Jusqu'à la phase 7, les textes sont regroupés dans quelques fichiers que DamCompany met à jour pour vous :

| Contenu | Fichier |
|---|---|
| Coordonnées, réseaux sociaux, biographie, photo, diplômes | `src/content/site.ts` |
| Titres et descriptions des 8 modules | `src/content/modules.ts` |
| Packs et tarifs | `src/content/plans.ts` |
| Ateliers | `src/content/workshops.ts` |
| FAQ | `src/content/faq.ts` |

Avec l'espace administrateur (phase 7), vous modifierez tout cela vous-même, sans code.

## Checklist des informations à fournir
- [x] Nom officiel **Plenty** validé
- [ ] Choix du logo parmi les 3 concepts (page `/branding-preview` de la préversion)
- [ ] Vérification INPI / EUIPO du nom et du logo
- [ ] Validation du logo et de la charte graphique
- [ ] Photographies professionnelles (portrait, et si possible visuels en situation)
- [ ] Biographie
- [ ] Diplômes et qualifications (avec justificatifs : seuls les diplômes vérifiés seront affichés)
- [ ] Titres définitifs des huit modules
- [ ] Vidéos des formations
- [ ] Ressources pédagogiques (PDF)
- [ ] Packs et tarifs définitifs
- [ ] Modèle de paiement (mensuel, annuel, paiement unique)
- [ ] Conditions du parrainage (récompenses, conditions, durée, limites)
- [ ] Modalités des ateliers (dates, lieux, tarifs, conditions d'annulation)
- [ ] Informations légales de l'entreprise (raison sociale, SIREN, adresse, TVA, médiateur)
- [ ] Adresse e-mail professionnelle
- [ ] Réseaux sociaux
- [ ] Nom de domaine
- [ ] Compte Stripe (créé et vérifié à votre nom)
- [ ] Conditions générales de vente validées

## Coûts récurrents à prévoir (estimations, à confirmer avant souscription)
Hébergement Vercel Pro, Supabase (gratuit au départ, Pro conseillé pour les sauvegardes), commission Stripe par paiement, Resend (gratuit jusqu'à un certain volume), hébergement vidéo (selon le volume), nom de domaine. Aucun service payant ne sera souscrit sans votre accord.

## Important
Plenty est un organisme d'éducation financière : elle ne doit pas délivrer de conseil en investissement personnalisé sans les qualifications et autorisations requises, ni promettre de rendement.
