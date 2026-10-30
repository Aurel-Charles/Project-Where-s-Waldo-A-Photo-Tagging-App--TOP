# Brainstorm — Server (Where's Waldo)

Récap de la phase de conception de l'API.

## Modèle de données

Pas de comptes utilisateurs : ce qui démarre quand le joueur ouvre la page, c'est une **partie** (`Game`), pas une personne.

| Table | Champs | Rôle |
|---|---|---|
| **Picture** | `id`, `url`, `title` | Une image du jeu. `title` sert à la liste de choix (extra credit). |
| **Character** | `id`, `name` | Un personnage (Waldo, le Magicien…), partagé entre toutes les parties. |
| **CharacterPosition** | `pictureId`, `characterId`, `x`, `y` | Liaison image ↔ personnage. Un même personnage peut être dans plusieurs images, à des positions différentes. |
| **Game** | `id`, `pictureId`, `start`, `end`, `duration`, `player` | Une partie. `end`, `duration` et `player` restent vides tant qu'elle n'est pas finie. |
| **FoundCharacter** | `gameId`, `characterId`, `foundAt` | Liaison partie ↔ personnage trouvé. |

### Points clés

- **Positions en pourcentages**, pas en pixels : `x` = % de la largeur depuis la gauche, `y` = % de la hauteur depuis le haut. Elles restent vraies quelle que soit la taille d'affichage. Choisir une convention (0–100 ou 0–1) et la garder partout.
- **Un point suffit** pour la position d'un personnage : son centre.
- **`@@unique([gameId, characterId])`** sur `FoundCharacter` : un personnage ne peut être compté qu'une fois par partie. Sinon, recliquer trois fois sur Waldo donnerait 3 lignes et la partie serait déclarée gagnée.
- **Pas de table Leaderboard** : le classement, ce sont les parties terminées d'une image, triées par `duration` (`orderBy`).
- `duration` est redondant avec `start` / `end`, mais simplifie le tri.

## Routes

| Méthode | Route | Body | Rôle |
|---|---|---|---|
| `GET` | `/pictures` | — | Liste des images (extra credit) |
| `GET` | `/pictures/:id/characters` | — | `id` et `name` des personnages de l'image, pour le menu. **Jamais les positions.** |
| `GET` | `/pictures/:id/leaderboard` | — | Parties terminées avec un nom, triées par `duration` |
| `POST` | `/games` | `{ pictureId }` | Crée la partie avec `start = now()`, renvoie son `id` |
| `POST` | `/games/:id/guesses` | `{ characterId, x, y }` | Teste une tentative (voir ci-dessous) |
| `PATCH` | `/games/:id` | `{ player }` | Enregistre le nom du joueur en fin de partie |

### Pourquoi ces méthodes

- `POST /games` : on **crée** une partie. Pas d'`:id` dans la route, la partie n'existe pas encore.
- `POST /games/:id/guesses` : on crée une tentative, rattachée à une partie. Une tentative peut être bonne ou fausse, d'où `guesses` plutôt que `found`.
- `PATCH /games/:id` : on **modifie** un champ (`player`) d'une partie qui existe déjà.

## Logique de `POST /games/:id/guesses`

1. Retrouver la partie par son `id` (404 si elle n'existe pas). L'image se déduit de `game.pictureId` : le front n'a pas besoin de l'envoyer, et ne peut donc pas tricher dessus.
2. Chercher la position du personnage dans cette image (`CharacterPosition`).
3. **Test de la zone (±2 %)** : c'est bon si
   - `x - 2 <= clicX <= x + 2`
   - **et** `y - 2 <= clicY <= y + 2`
4. Si c'est bon : créer une ligne `FoundCharacter` avec `foundAt`.
5. Si le nombre de personnages trouvés pour cette partie = le nombre de personnages de l'image : remplir `end` et `duration`.
6. Répondre avec l'état de la partie.

### Ce que renvoie la réponse

- Si la tentative est bonne ou non.
- La liste des personnages avec leur position **uniquement s'ils ont été trouvés dans cette partie**, `null` sinon. Sinon, n'importe qui peut lire toutes les réponses dans l'onglet Réseau.
- Si la partie est terminée (`end`, `duration`).

## Chrono et score

- Le chrono est **entièrement géré par le serveur** : `start` au `POST /games`, `end` quand le dernier personnage est trouvé. Le joueur n'a jamais la main sur ces valeurs.
- Avant d'enregistrer le nom (`PATCH /games/:id`), vérifier :
  - que la partie existe (404 sinon)
  - que `end` n'est **pas** `null` → la partie est terminée
  - que `player` **est** `null` → aucun nom déjà enregistré
  - sinon, refuser (400 ou 403)
- Le serveur ne peut pas savoir si la requête vient de l'app React ou de Postman : on vérifie toujours **l'état de la partie**, jamais la provenance.

## Règle générale de sécurité

Moins le client envoie d'infos que le serveur connaît déjà, moins il peut tricher.
