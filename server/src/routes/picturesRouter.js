import { Router } from "express";
import { getCharacters, getLeaderBoard } from "../controllers/picturesController.js";


export const picturesRouter = Router()

picturesRouter.get('/:id/characters', getCharacters)
picturesRouter.get('/:id/leaderboard', getLeaderBoard)