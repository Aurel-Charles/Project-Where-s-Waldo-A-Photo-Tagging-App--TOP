import { useState } from "react";
import { Link } from "react-router";
import { convertMsToMinSec } from "../../utils/convertMs.js";
import { apiFetch } from "../../utils/api.js";
import style from "./EndScreen.module.css";

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
                setConfirmMsg(`Thanks ${player}, your score has been saved.`)
            } catch (error) {
                console.error(error)
                setError(error)
            }
        }
        updatePlayer()
    }


    return (
        <div className={style.backdrop}>
            <div className={style.card} role="dialog" aria-labelledby="end-title">
                <h2 id="end-title">You found them all!</h2>
                <p className={style.timeLabel}>Your time</p>
                <p className={style.time}>{convertMsToMinSec(endGame.duration)}</p>

                {error && !error.errors && <p className="error">{error.message}</p>}

                {confirmMsg !== null ? (
                    <>
                        <p className={style.confirm}>{confirmMsg}</p>
                        <div className={style.actions}>
                            <Link to="/leaderboard" className="btn">See the leaderboard</Link>
                            <Link to="/play" className="btn btn-secondary">Play another scene</Link>
                        </div>
                    </>
                ) : (
                    <form className={style.form} onSubmit={onSubmit}>
                        <label htmlFor="player">Add your name to the leaderboard</label>
                        <input
                            id="player"
                            className={style.input}
                            type="text"
                            maxLength={20}
                            autoFocus
                            onChange={onChangePlayer}
                            value={player}
                        />
                        {error?.errors && <p className="error">{error.errors[0].msg}</p>}
                        <div className={style.actions}>
                            <button className="btn" type="submit">Save my score</button>
                            <Link to="/play" className="btn btn-secondary">Skip</Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
