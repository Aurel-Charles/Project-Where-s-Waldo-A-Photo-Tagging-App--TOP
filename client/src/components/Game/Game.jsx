import { useEffect, useState } from "react"
import { apiFetch } from "../../utils/api"
import { GameImage } from "../GameImage/GameImage"
import { InfoPanel } from "../InfoPanel/InfoPanel"
import { EndScreen } from "../EndScreen/EndScreen"

export function Game({pictureId, imgUrl}) {
    const [characters , setCharacters] = useState(null)
    const [gameId , setGameId] = useState(null)
    const [loadingGame , setLoadingGame] = useState(false)
    const [found, setFound] = useState([])
    const [message, setMessage] = useState("")
    const [endGame, setEndGame] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=> {
        async function getCharacters() {
            try {
                const data = await apiFetch(`/pictures/${pictureId}/characters`)
                setCharacters(data.characters)
            } catch (error) {
                console.error(error)
                setError(error)
            }
        }
        getCharacters()
    },
    [pictureId]
    )

    function handleStart(pictureId) {
        setError(null)
        async function startGame() {
            try {
                setLoadingGame(true)
                const data = await apiFetch(`/games`, "POST", {pictureId})
                console.log(data);
                setGameId(data.id)
            } catch (error) {
                console.error(error)
                setError(error)
            }finally{
                setLoadingGame(false)
            }
        }
        startGame()
    }

    function handleGuess(characterId, coor) {
        const body = {
            characterId,
            x : coor.x, 
            y : coor.y
        }
        async function checkGuess() {
            try {
                const data = await apiFetch(`/games/${gameId}/guesses`, "POST", body)
                console.log(data);

                if (data.correct && !data.alreadyFound) {
                    setFound( (prev) => [...prev, data.character])
                }
                handleMessage(data,characterId)
            } catch (error) {
                console.error(error)
                setError(error)
            }
        }
        checkGuess()
    }

    function handleMessage({correct, alreadyFound, gameEnded}, characterId) {
        if (!correct) {
            return setMessage(`Look better, try again!`)
        }
        const name = characters.find((c) => c.id === characterId).name
        if (alreadyFound ) {
            setMessage(`You already found ${name}`)
        }
        else if (gameEnded) {
            setEndGame(gameEnded)
            setMessage(`Congratulation! You found them all`)
        }
        else if (!gameEnded  ) {
            setMessage(`Good! you found ${name}`)
        }
        
    } 

    console.log(endGame);
    
    return (
        <>
        {error && <p> {error.message} </p>}

        <InfoPanel characters={characters} found={found} message={message} />
        {gameId === null ? 
            <button disabled={loadingGame || characters === null} onClick={ ()=> handleStart(pictureId) } >START</button> 
            :
            <GameImage imgUrl={imgUrl} characters={characters} onGuess={handleGuess} found={found} disabled={endGame !== null}/>
        }

        {endGame !== null && 
            <EndScreen endGame={endGame}/>
        }
        </>
    )
}
