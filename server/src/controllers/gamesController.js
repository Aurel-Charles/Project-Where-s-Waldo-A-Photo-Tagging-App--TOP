import { countCharacterFoundByGame, countCharactersByPictureId, createFoundCharacter, getCharacterPosition, getFoundCharacter, getGameById, getPictureById, insertGames, updateGameById, updateGames } from "../db/queries.js";
import { isGuessesCorrect } from "../utils/isGuessesCorrect.js";
import { HttpError } from "../utils/HttpErrorHandler.js";
import { isInteger } from "../utils/isInteger.js";
import { isPercentage } from "../utils/isPercentage.js";


export async function postGames(req, res) {
    const pictureId = isInteger(req.body?.pictureId)
    const pictureExist = await getPictureById(pictureId)
    if (pictureExist === null) {
        throw new HttpError("Picture not found", 404)
    }
    
    const newGame = await insertGames(pictureId)
    
    res.status(201).json(newGame)
}

export async function postGamesGuesses(req, res) {
    // validating Params and Body req
    const gameId = isInteger(req.params?.id)
    const characterId = isInteger(req.body?.characterId)
    const x = isPercentage(req.body?.x)
    const y = isPercentage(req.body?.y)

    
    // validating Game 
    const game = await getGameById(gameId)
    if (game === null) throw new HttpError("Game not found", 404)
    if (game.end !== null) throw new HttpError("Game is already finished", 409)

    // get character position 
    const character = await getCharacterPosition(game.pictureId, characterId) 
    if (character === null) throw new HttpError("Character not found", 404)
    const validCoor =  {x: character.x, y: character.y}
    const userCoor = {x, y}

    // check the guess
    const correct = isGuessesCorrect(userCoor, validCoor)
    if (!correct) { //false
       return res.json({correct})
    }
                    //true 
    const alreadyFound = await getFoundCharacter(gameId, characterId)
    if (alreadyFound !== null) {
        return res.json({correct: true, alreadyFound: true})
    } 

    await createFoundCharacter(gameId, characterId)

    // check if game is over
    const charactersInPicture = await countCharactersByPictureId(game.pictureId)
    const charactersFound = await countCharacterFoundByGame(game.id)

    if ( charactersFound === charactersInPicture) {
        const end = new Date()
        const data = {
            gameId : game.id,
            end : end,
            duration : end - game.start
        }
        const gameEnded = await updateGames(data)
        return res.json({correct, character , gameEnded})
    }
    

    res.json({correct,character})
}

export async function patchNameByGame(req, res) {
    const gameId = isInteger(req.params?.id)

    // 
    const game = await getGameById(gameId)
    if (game === null) throw new HttpError("Game not found", 404)
    if (game.end === null) throw new HttpError("Game is not finished", 409)
    if (game.player !== null) throw new HttpError("Player name already set", 409)


    const data = {player:  req.body.player}
    const updatedgame = await updateGameById(gameId, data)

    res.json({updatedgame})
}