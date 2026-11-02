import { useState } from "react"
import styles from "./GameImage.module.css"
import { TargetBox } from "./TargetBox";
import { getXYCoor } from "../../utils/getXYCoor";
import { Marker } from "./Marker";

export function GameImage({imgUrl, characters, onGuess, found, disabled}) {
    const [target , setTarget] = useState(null)


    function handleClick(e) {
        if (disabled) return
        if (target) {
            setTarget(null)
            return
        }
        const rect = e.currentTarget.getBoundingClientRect();
        const coor = getXYCoor(rect, e.clientX, e.clientY)
        setTarget(coor)
    }

    function handleCharacterSelect(characterId) {
        onGuess(characterId, target)
        setTarget(null)
    }

    return (
        <div className={`${styles.imageBox} ${disabled ? styles.finished : ""}`}>
            <img src={imgUrl} alt="Crowded scene to search" className={styles.image} onClick={handleClick} />
            {target !== null && <div className={styles.box} style={{left : `${target.x}%`, top : `${target.y}%`}} ></div> }
            {target !== null && <TargetBox target={target} characters={characters} onCharacterSelect={handleCharacterSelect}/> }
            {found.map((c)=> (
                    <Marker key={c.id} character={c} />
                ) )
             }
        </div>
    )
}
