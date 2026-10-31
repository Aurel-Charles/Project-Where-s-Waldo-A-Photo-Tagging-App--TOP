import { Router } from "express";
import { patchNameByGame, postGames, postGamesGuesses } from "../controllers/gamesController.js";
import { handleValidation, validatePlayer,  } from "../middlewares/validators.js";

export const gamesRouter = Router()

gamesRouter.post("/", postGames)
gamesRouter.post("/:id/guesses", postGamesGuesses)
gamesRouter.patch("/:id/", validatePlayer , handleValidation , patchNameByGame)