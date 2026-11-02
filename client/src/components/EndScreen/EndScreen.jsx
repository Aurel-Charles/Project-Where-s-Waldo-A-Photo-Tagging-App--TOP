import { useState } from "react";
import { convertMsToMinSec } from "../../utils/convertMs.js";
import { apiFetch } from "../../utils/api.js";

export function EndScreen({endGame}) {
    const [player, setPlayer] = useState("")
    const [confirmMsg, setConfirmMsg] = useState(null)
    const [error, setError] = useState(null)

    function onChangePlayer(e) {
        setPlayer(e.target.value)
    }
    
    function onSubmit(e) {
        e.preventDefault()
        setError(null)
        async function updatePlayer() {
            try {
                const gameId = endGame.id
                await apiFetch(`/games/${gameId}`, "PATCH", {player})
                setConfirmMsg(`Thank's ${player}, your score has been saved`)
            } catch (error) {
                console.error(error)
                setError(error)
            }
        }
        updatePlayer()
    }


    return (
        <div>
        {error && !error.errors && <p> {error.message} </p>}
        <p>Game Ended</p>
        {confirmMsg !== null ? 
            <p> {confirmMsg} </p>
        :
            <>
            <p>{convertMsToMinSec(endGame.duration)}</p>
            <form onSubmit={onSubmit} >
                <label htmlFor="player">Type your name if you want</label>
                <input id="player" type="text" onChange={onChangePlayer} value={player} />
                {error?.errors && <p> {error.errors[0].msg} </p>}
                <button type="submit">Confirm</button>
            </form>
            </>
        }
        </div>
    )
}