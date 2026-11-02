import style from "./Marker.module.css"

export function Marker({character}) {
    return (

            <div className={style.marker} style={{left : `${character.x}%`, top : `${character.y}%`}} >
                <p className={style.name} >{character.name}</p>
            </div>
    )
}