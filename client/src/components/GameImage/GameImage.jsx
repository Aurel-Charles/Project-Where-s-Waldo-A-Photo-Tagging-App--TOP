import { useState } from "react"
import styles from "./GameImage.module.css"
import { TargetBox } from "./TargetBox";

export function GameImage({imgUrl}) {
    const [target , setTarget] = useState(null)

    // hardcoded for dev
    const characters = [
        { id: 1, name: "Waldo" },
        { id: 2, name: "Wizard" },
        { id: 3, name: "Wilma" },
      ];

    function handleClick(e) {
        if (target) {
            setTarget(null)
            return
        }
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setTarget({x,y})
    }

    function handleCharacterSelect(characterId) {
        console.log(characters.find(c => c.id === characterId));
        // check the character position
        setTarget(null)
    }

    return (
        <div className={styles.imageBox}>
            <img src={imgUrl} alt="" className={styles.image} onClick={handleClick} />
            {target !== null && <div className={styles.box} style={{left : `${target.x}%`, top : `${target.y}%`}} ></div> }
            {target !== null && <TargetBox target={target} characters={characters} onCharacterSelect={handleCharacterSelect}/> }
        </div>
    )
}