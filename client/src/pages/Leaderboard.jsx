import { useEffect, useState } from "react"
import { apiFetch } from "../utils/api"
import { PictureLeaderboard } from "../components/PictureLeaderboard/PictureLeaderboard"
import style from "./Leaderboard.module.css"

export function Leaderboard() {
    const [pictures , setPictures] = useState([])
    const [error, setError] = useState(null)


    useEffect(()=> {
        async function getPictures() {
            setError(null)
            try {
                const data = await apiFetch("/pictures")
                setPictures(data.pictures)
            } catch (error) {
                console.error(error)
                setError(error)
            }
        }
        getPictures()
    }
    ,[]
)
    return (
        <section className={style.page}>
            <h2>Leaderboard</h2>
            <p className={style.intro}>The ten fastest players for each scene.</p>
            {error && <p className="error">{error.message}</p>}

            {pictures.length > 0 ? (
                <ul className={style.list}>
                    {pictures.map((p) => (
                        <li key={p.id} className={style.card}>
                            <img className={style.picture} src={p.url} alt="" />
                            <div className={style.scores}>
                                <h3>{p.title}</h3>
                                <PictureLeaderboard pictureId={p.id} />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                !error && <p className={style.intro}>No scenes available yet.</p>
            )}
        </section>
    )
}
