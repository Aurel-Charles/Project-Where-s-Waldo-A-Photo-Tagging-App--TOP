import { Router } from "express";
import { getAllPictures, getCharacters, getLeaderBoard } from "../controllers/picturesController.js";


export const picturesRouter = Router()

picturesRouter.get('/', getAllPictures)
picturesRouter.get('/:id/characters', getCharacters)
picturesRouter.get('/:id/leaderboard', getLeaderBoard)