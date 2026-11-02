import { useEffect, useState } from "react"
import { apiFetch } from "../../utils/api"
import { GameImage } from "../GameImage/GameImage"
import { InfoPanel } from "../InfoPanel/InfoPanel"
import { EndScreen } from "../EndScreen/EndScreen"
import { useParams } from "react-router"
import style from "./Game.module.css"

export function Game() {
    const {pictureId} = useParams()

    const [characters , setCharacters] = useState(null)
    const [imgUrl , setImgUrl] = useState(null)
    const [title , setTitle] = useState("")

    const [gameId , setGameId] = useState(null)
    const [loadingGame , setLoadingGame] = useState(false)
    const [found, setFound] = useState([])
    const [message, setMessage] = useState("")
    const [endGame, setEndGame] = useState(null)
    const [error, setError] = useState(null)

    useEffect(()=> {
        async function getCharacters() {
            try {
                const data = await apiFetch(`/pictures`)
                const picture = data.pictures.find((p)=> p.id === Number(pictureId))
                if (!picture) {
                    setError(new Error("Picture not found"))
                    return
                  }
                setImgUrl(picture.url)
                setTitle(picture.title)
                const characterPos = await apiFetch(`/pictures/${pictureId}/characters`)
                setCharacters(characterPos.characters)
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
        else {
            setMessage(`Good! you found ${name}`)
        }
    }

    return (
        <section className={style.game}>
            <div className={style.board}>
                {title && <h2 className={style.title}>{title}</h2>}
                {error && <p className="error">{error.message}</p>}

                {gameId === null ? (
                    <div className={style.start}>
                        {imgUrl && <img className={style.preview} src={imgUrl} alt="" />}
                        <div className={style.startOverlay}>
                            <p>The timer starts as soon as you press Start.</p>
                            <button
                                className="btn"
                                disabled={loadingGame || characters === null || imgUrl === null}
                                onClick={ ()=> handleStart(pictureId) }
                            >
                                {loadingGame ? "Starting…" : "Start"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <GameImage imgUrl={imgUrl} characters={characters} onGuess={handleGuess} found={found} disabled={endGame !== null}/>
                )}
            </div>

            <InfoPanel characters={characters} found={found} message={message} />

            {endGame !== null &&
                <EndScreen endGame={endGame}/>
            }
        </section>
    )
}
