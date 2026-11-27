# Guide client — FINORA Academy

Bonjour Chris, ce guide explique ce qui est prêt, comment modifier vos contenus et ce dont nous avons besoin de votre part.

## Ce qui est prêt
- Votre identité visuelle (logo et charte : `public/brand/FINORA-charte-graphique.pdf`).
- Le site public complet, consultable sur ordinateur, tablette et smartphone.
- Un bandeau « Version de démonstration » rappelle que les tarifs, ateliers et avis sont des exemples.

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
- [ ] Validation du nom **FINORA Academy** (et vérification INPI)
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
FINORA Academy est un organisme d'éducation financière : elle ne doit pas délivrer de conseil en investissement personnalisé sans les qualifications et autorisations requises, ni promettre de rendement.
