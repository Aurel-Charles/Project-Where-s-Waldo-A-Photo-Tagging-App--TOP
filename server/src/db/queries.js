import { prisma } from "./prisma.js";


// Pictures related Queries
export async function getPictureById(id) {
    const picture = await prisma.picture.findUnique({
        where : {
            id : id
        }
    })
    return picture
}

export async function getLeaderBoardByPictureId(pictureId) {
    const leaderboard = await prisma.game.findMany({
        where : {
            pictureId :pictureId,
            end : {not: null}
        },
        orderBy : {duration : "asc"},
        take: 10,
        select: {
            player: true,
            duration: true
        }
    })

    return leaderboard.map((game)=> ({...game, player: game.player === null ? "Anonymous" : game.player }))
}


// Characters related Queries
export async function getCharactersByPictures(pictureId) {
    const characters = await prisma.characterPosition.findMany({
        where : {
            pictureId : pictureId
        },
        select : {
            character : true
        }
    })

    return characters.map((item) => item.character)
}

export async function getCharacterPosition(pictureId, characterId) {
    const characterPosition = await prisma.characterPosition.findUnique({
        where : {
            pictureId_characterId: {pictureId ,  characterId}
        },
        select : {
            character: {
                select : {
                    id : true,
                    name: true
                }
            },
            x :true,
            y :true
        }
    })
    if (characterPosition === null) {
        return null
    }
    const character = {
        id : characterPosition.character.id,
        name : characterPosition.character.name,
        x: characterPosition.x,
        y: characterPosition.y,
    }

    return character
}

export async function getFoundCharacter(gameId, characterId) {
    const character = await prisma.foundCharacter.findUnique({
        where : {
            gameId_characterId :{ gameId, characterId}
        }
    })
    return character
}

export async function createFoundCharacter(gameId, characterId) {
    const character = await prisma.foundCharacter.create({
        data : {
            gameId : gameId,
            characterId : characterId
        }
    })
    return character
}

export async function countCharactersByPictureId(pictureId) {
    const characters = await prisma.characterPosition.count({
        where : {
            pictureId : pictureId
        }
    })
    return characters
}

// Games related Queries
export async function insertGames(pictureId) {
    const game = await prisma.game.create({
        data : {
            pictureId : pictureId
        }
    })
    return game
}

export async function updateGames(data) {
    const game = await prisma.game.update({
        where:{
            id : data.gameId
        },
        data : {
            end : data.end,
            duration: data.duration
        }
    })
    return game
}


export async function getGameById(id) {
    const game = await prisma.game.findUnique({
        where : {
            id : id
        }
    })
    return game
}

export async function updateGameById(gameId, data) {
    const game = await prisma.game.update({
        where : {
            id : gameId
        },
        data : {
            player : data.player
        }
    })
    return game
}



export async function countCharacterFoundByGame(gameId) {
    const charactersFound = await prisma.foundCharacter.count({
        where: {
            gameId : gameId
        }
    })   
    return charactersFound
}

