import style from "./TargetBox.module.css"

export function TargetBox({target, characters, onCharacterSelect}) {
    // Near the right edge, open the menu on the left of the box so it stays visible
    const openLeft = target.x > 70

    const position = openLeft
        ? { right: `${100 - target.x + 3}%`, top: `${target.y}%` }
        : { left: `${target.x + 3}%`, top: `${target.y}%` }

    return (
        <div className={style.targetBox} style={position} role="menu" aria-label="Who did you find?">
            {characters.map((c) => (
                <button key={c.id} role="menuitem" className={style.option} onClick={()=> onCharacterSelect(c.id)}>
                    {c.name}
                </button>
            ))}
        </div>
    )
}
