# Bug Tracker — Laboratoire de débogage (SED2515)

Application interne de suivi des bogues logiciels. Le projet vous est remis **déjà développé** par une autre équipe. Votre travail n’est pas de le reconstruire, mais d’**analyser**, **diagnostiquer** et **corriger** les problèmes qui empêchent un fonctionnement fiable.

## Objectif

Rendre l’application pleinement utilisable :

- afficher les bogues
- créer un bogue
- modifier un bogue (titre, description, sévérité, statut)
- supprimer un bogue
- filtrer la liste

Les données doivent rester cohérentes **après un rafraîchissement de page** et correspondre au contenu de `db.json`.

## Pile technique

| Couche | Technologie |
| --- | --- |
| Frontend | React, TypeScript, Vite, React Router |
| État | Redux Toolkit + Redux DevTools |
| HTTP | Axios |
| API simulée | json-server |
| Données | `db.json` |

## Démarrage

Prérequis : Node.js 18 ou plus récent.

```bash
npm install
npm run dev
```

Cela lance :

- l’API json-server sur [http://localhost:3001](http://localhost:3001)
- l’interface Vite sur [http://localhost:5173](http://localhost:5173)

Scripts séparés si nécessaire :

```bash
npm run server
npm run client
```

Installez aussi l’extension navigateur **Redux DevTools**.

## Contrat de l’API

json-server expose les ressources suivantes. Vous pouvez (et devez) les vérifier avec **Postman** ou l’onglet **Network**.

| Méthode | Endpoint | Rôle |
| --- | --- | --- |
| `GET` | `/bugs` | Liste des bogues |
| `GET` | `/bugs/:id` | Détail d’un bogue |
| `POST` | `/bugs` | Création |
| `PUT` | `/bugs/:id` | Mise à jour complète |
| `DELETE` | `/bugs/:id` | Suppression |

Exemple de ressource :

```json
{
  "id": 1,
  "title": "Login page crash",
  "description": "Application crashes after login",
  "severity": "High",
  "status": "Open"
}
```

`severity` : `"Low"` | `"Medium"` | `"High"`  
`status` : `"Open"` | `"In Progress"` | `"Closed"`

Une collection Postman est fournie dans `postman/Bug-Tracker.postman_collection.json`.

## Architecture du code

```
src/
  api/          client Axios et appels HTTP
  services/     adaptation des réponses API
  redux/        store, slice, thunks
  components/   table, filtres, formulaires, badges
  pages/        liste, création, édition
  types/        modèles TypeScript
```

## Méthode de travail attendue

Ne corrigez pas « au hasard ». Pour chaque anomalie :

1. Reproduire le symptôme.
2. Formuler une hypothèse.
3. Confirmer l’hypothèse avec un outil.
4. Appliquer une correction minimale.
5. Vérifier qu’aucune régression n’a été introduite.

Outils à utiliser selon le cas :

- **Network** (Chrome DevTools) — URL, méthode HTTP, code de statut, corps de requête/réponse
- **Redux DevTools** — actions dispatchées, contents de `action` et de `state`
- **Postman** — comportement réel de l’API, indépendamment du frontend
- **Débogueur** (breakpoints) — valeurs réelles au moment de l’appel
- **TypeScript** — erreurs de compilation et incohérences de types

## Livrable

- Code corrigé, application fonctionnelle de bout en bout
- Court rapport (voir `CONSIGNE.md`) : pour chaque problème trouvé, symptôme, outil utilisé, cause, correction

Ne commitez pas `node_modules`.
