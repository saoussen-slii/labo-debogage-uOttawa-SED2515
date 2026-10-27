# Consigne — Laboratoire 8 · Débogage

Cours : **SED2515 — Développement Web**  
Application : **Bug Tracker**

## Mise en situation

Vous héritez d’une application de suivi de bogues écrite par une autre équipe. L’interface donne l’impression d’être complète, mais plusieurs défauts empêchent un usage correct. Votre mandat est celui d’un développeur qui doit **diagnostiquer** puis **réparer** le système existant.

Vous ne devez pas réécrire l’application. Conservez l’architecture en place (`api`, `services`, `redux`, composants, pages).

## Travail à faire

1. Démarrer le projet (`npm install` puis `npm run dev`).
2. Explorer l’interface comme un utilisateur : liste, filtres, création, modification, suppression.
3. Identifier les comportements anormaux.
4. Pour chacun, recueillir des preuves (captures Network, Redux DevTools, Postman, erreurs TypeScript, valeurs vues dans le débogueur).
5. Corriger le code.
6. Revalider le scénario complet, **y compris après rafraîchissement du navigateur**.

## Critères de succès

L’application est acceptée lorsque toutes les conditions suivantes sont vraies :

- la liste des bogues s’affiche à partir de l’API
- aucune rafale de requêtes inutiles n’est envoyée en continu
- la création d’un bogue persiste dans `db.json`
- la modification (titre, description, sévérité **et statut**) persiste après rafraîchissement
- la suppression retire le bogue de l’interface **et** du fichier `db.json`
- le projet TypeScript compile sans erreur (`npx tsc -b --pretty false`)
- le store Redux reflète l’état réel du serveur après chaque opération réussie

## Rapport

Remettez un rapport court (2 à 4 pages) contenant, pour chaque problème :

| Symptôme observé | Outil de diagnostic | Cause identifiée | Fichier corrigé |
| --- | --- | --- | --- |
| … | Network / Redux DevTools / Postman / Debugger / TypeScript | … | … |

Inutile d’inventer des problèmes qui n’existent pas. Documentez uniquement ce que vous avez réellement observé et corrigé.

## Consignes importantes

- Travaillez de façon incrémentale : une cause, une correction, une vérification.
- L’API json-server est volontairement simple. Si Postman obtient un résultat différent de l’interface, le défaut est presque certainement dans le frontend.
- Ne désactivez pas TypeScript (`any` partout, `@ts-ignore` généralisé) pour « faire compiler ». Les types font partie du diagnostic.
