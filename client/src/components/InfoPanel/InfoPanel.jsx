import style from "./InfoPanel.module.css"

export function InfoPanel({characters, found, message}) {
    const total = characters ? characters.length : 0

    return(
        <aside className={style.panel}>
            <div className={style.head}>
                <h3>To find</h3>
                {characters && <span className={style.count}>{found.length} / {total}</span>}
            </div>

            <ul className={style.list}>
                {characters && characters.map((c) => {
                    const isFound = found.some((f) => f.id === c.id)
                    return (
                        <li key={c.id} className={isFound ? `${style.item} ${style.found}` : style.item}>
                            <span className={style.check} aria-hidden="true">{isFound ? "✓" : ""}</span>
                            {c.name}
                            {isFound && <span className={style.srOnly}> (found)</span>}
                        </li>
                    )
                })}
            </ul>

            <p className={style.message} aria-live="polite">
                {message}
            </p>
        </aside>
    )
}
