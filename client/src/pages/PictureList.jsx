import { useEffect, useState } from "react"
import { apiFetch } from "../utils/api"
import { Link } from "react-router"
import style from "./PictureList.module.css"
import { Loader } from "../components/Loader/Loader"

export function PictureList() {
    const [pictures , setPictures] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        async function getPictures() {
            setError(null)
            try {
                const data = await apiFetch("/pictures")
                setPictures(data.pictures)
            } catch (error) {
                console.error(error)
                setError(error)
            }finally{
                setLoading(false)
            }
        }
        getPictures()
    }
    ,[]
)

    return (
        <section className={style.page}>
            <h2>Choose a scene</h2>
            {error && <p className="error">{error.message}</p>}
            { loading ? 
            <Loader/> 
            :
            <ul className={style.grid}>
                {pictures.map((p) => (
                    <li key={p.id} className={style.card}>
                        <img className={style.picture} src={p.url} alt="" />
                        <div className={style.body}>
                            <h3>{p.title}</h3>
                            <Link to={`/play/${p.id}`} className="btn">Play this scene</Link>
                        </div>
                    </li>
                ))}
            </ul>
            }
        </section>
    )
}
