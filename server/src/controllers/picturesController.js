import { getCharactersByPictures, getLeaderBoardByPictureId, getPictureById } from "../db/queries.js";
import { HttpError } from "../utils/HttpErrorHandler.js";
import { isInteger } from "../utils/isInteger.js";

export async function getCharacters(req , res ){
    const pictureId = isInteger(req.params.id)
    const pictureExist = await getPictureById(pictureId)
    if (pictureExist === null) {
        throw new HttpError("Picture not found", 404)
    }
    const characters = await getCharactersByPictures(pictureId)
    res.send({characters})
}

export async function getLeaderBoard(req, res) {
    const pictureId = isInteger(req.params.id)
    const pictureExist = await getPictureById(pictureId)
    if (pictureExist === null) {
        throw new HttpError("Picture not found", 404)
    }
    const leaderboard = await getLeaderBoardByPictureId(pictureId)
    res.json(leaderboard)
}