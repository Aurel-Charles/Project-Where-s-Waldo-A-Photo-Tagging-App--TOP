# Brainstorm — Client (Where's Waldo)

Récap de la phase de conception du front.

## Le principe du jeu

1. Le joueur clique sur l'image.
2. Une **boîte de ciblage** apparaît, centrée sur le clic, avec un **menu** des personnages.
3. Il choisit un nom → le front envoie la tentative au serveur.
4. Bonne réponse : un marqueur est placé sur le personnage. Mauvaise : message d'erreur.
5. Dans les deux cas, la boîte disparaît.

Le menu est indispensable : il oblige le joueur à dire **qui** il pense avoir trouvé. Sans lui, cliquer partout au hasard suffirait.

## Organisation des composants

```
App                       → navigation, choix de l'image
└── Game                  → toute la logique d'une partie
    ├── GameImage         → l'image, le clic, la boîte
    │   ├── TargetBox     → le carré + le menu des personnages
    │   └── Marker        → un marqueur par personnage trouvé
    └── EndScreen         → temps final + formulaire du nom
```

### Où vit chaque state

| Composant | States | Pourquoi |
|---|---|---|
| `App` | image choisie, navigation | Sert à toute l'app, pas qu'à une partie |
| `Game` | `gameId`, `characters`, `found`, fin de partie | N'existe que pendant une partie. Contient aussi la fonction qui envoie une tentative (`onGuess`). |
| `GameImage` | `target` | Ne sert qu'à afficher la boîte et à envoyer la position |
| `TargetBox`, `Marker`, `EndScreen` | aucun | Affichent ce qu'on leur passe en props |

Règle : garder chaque state **le plus bas possible**, là où il sert.

## Le clic : pixels → pourcentages

Les positions sont stockées en % de l'image, pour fonctionner sur toutes les tailles d'écran.

```
FENÊTRE DU NAVIGATEUR
|<──────── e.clientX = 570 ─────────>✛ (le clic)
|<── rect.left = 150 ──>┌────────────┼──────────────────┐
|                       │   IMAGE    ✛                  │
|                       │<── 420 ──> │                  │
|                       └───────────────────────────────┘
|                       |<────── rect.width = 1000 ────>|
```

- `e.clientX` / `e.clientY` : position du clic depuis le bord de la **fenêtre**
- `e.currentTarget.getBoundingClientRect()` : position (`left`, `top`) et taille (`width`, `height`) de l'**image** dans la fenêtre

```js
const rect = e.currentTarget.getBoundingClientRect();
const x = ((e.clientX - rect.left) / rect.width) * 100;
const y = ((e.clientY - rect.top) / rect.height) * 100;
```

Bonne candidate pour une fonction dans `utils/`, facile à tester.

En React : `onClick={handleClick}` sur l'image, pas `addEventListener`.

## Le state `target`

- `null` → pas de boîte
- `{ x, y }` → une boîte à cet endroit

Un seul state suffit : pas besoin d'un booléen en plus (ils risqueraient de ne plus être d'accord).

### Ouverture / fermeture

- Clic sur l'image et `target === null` → calculer `x`, `y`, puis `setTarget({ x, y })`
- Clic sur l'image et `target !== null` → `setTarget(null)` (on ferme au lieu de déplacer)
- Choix d'un personnage dans le menu → envoyer la tentative avec `target`, **puis** `setTarget(null)`

La position n'est perdue qu'une fois qu'elle a servi : au moment du choix dans le menu, la boîte est encore ouverte et `target` contient toujours la position.

## La boîte en CSS

- Un conteneur en `position: relative`, avec l'image et la boîte dedans. L'image remplit le conteneur.
- La boîte : `position: absolute`, `left: ${target.x}%`, `top: ${target.y}%`
- Taille en **%** de l'image (`width: 4%`, `height: 4%`), pour correspondre à la tolérance de ±2 % du serveur sur tous les écrans. En pixels, la boîte serait trop grande sur mobile par rapport à ce que le serveur accepte.
- Centrée sur le clic avec `transform: translate(-50%, -50%)` (les % de `translate` sont relatifs à l'élément lui-même, pas au parent).

## Appels à l'API

| Moment | Requête |
|---|---|
| Choix de l'image (extra credit) | `GET /pictures` |
| Début de partie | `POST /games` avec `{ pictureId }` → garder l'`id` reçu dans `gameId` |
| Chargement du menu | `GET /pictures/:id/characters` (noms et `id`, pas de positions) |
| Choix d'un personnage | `POST /games/:gameId/guesses` avec `{ characterId, x, y }` |
| Fin de partie | `PATCH /games/:gameId` avec `{ player }` |
| Classement | `GET /pictures/:id/leaderboard` |

L'URL de l'API vient de `import.meta.env.VITE_API_URL`.

## Étapes (d'après l'énoncé)

1. ~~Réfléchir sur papier~~ ✔
2. Front sans backend : `GameImage` + `TargetBox`, avec une fausse liste de personnages en dur
3. Brancher la validation avec le serveur
4. Placer les marqueurs sur les bonnes réponses
5. Chrono + popup de fin pour entrer son nom
6. Jouer avec !
7. Déployer
