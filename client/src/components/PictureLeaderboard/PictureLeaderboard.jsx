import { useEffect, useState } from "react"
import { apiFetch } from "../../utils/api"
import { convertMsToMinSec } from "../../utils/convertMs"
import style from "./PictureLeaderboard.module.css"
import { Loader } from "../Loader/Loader"

export function PictureLeaderboard({pictureId}) {
    const [leaderboard, setLeaderboard] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        async function getBoard() {
            setError(null)
            try {
                const data = await apiFetch(`/pictures/${pictureId}/leaderboard`)
                setLeaderboard(data.leaderboard)
            } catch (error) {
                console.error(error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        getBoard()
    }
    ,[pictureId]
    )

    return (
        <div>
            {error && <p className="error">{error.message}</p>}
            {loading ? (
                <Loader text="Loading…" />
            ) : leaderboard.length > 0 ? (
                <ol className={style.list}>
                    {leaderboard.map((game, index) => (
                        <li key={index} className={style.row}>
                            <span className={style.rank}>{index + 1}</span>
                            <span className={style.player}>{game.player}</span>
                            <span className={style.time}>{convertMsToMinSec(game.duration)}</span>
                        </li>
                    ))}
                </ol>
            ) : (
                !error && <p className={style.empty}>No scores yet. Be the first to finish this scene.</p>
            )}
        </div>
    )
}
