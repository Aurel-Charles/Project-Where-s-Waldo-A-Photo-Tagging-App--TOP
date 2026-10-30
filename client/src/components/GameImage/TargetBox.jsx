import style from "./TargetBox.module.css"

export function TargetBox({target, characters, onCharacterSelect}) {

    

    return (
        <div className={style.targetBox} style={{left : `${target.x + 5}%`, top : `${target.y}%`}} >
            {characters.map((c) => (
                <button key={c.id} onClick={()=> onCharacterSelect(c.id)}> {c.name} </button>
            ))}
        </div>
    )
}