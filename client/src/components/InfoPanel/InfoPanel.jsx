import style from "./InfoPanel.module.css"

export function InfoPanel({characters, found, message}) {


    return(
        <div>
            <h2>Info</h2>
            <section>
                <h3>Game</h3>

            </section>
            <section>
                <h3>Characters to left to find</h3>
                {found && characters && characters.map( (c)=> (
                    found.some((f) => f.id === c.id) ?
                    <p key={c.id} className={style.found} >{c.name}</p>
                    :
                    <p key={c.id} >{c.name}</p>
                ) )}
            </section>
            <section>
                {message !== "" && 
                    <>
                    <h3>Message:</h3>
                    <p>{message}</p>
                    </>
                }
            </section>
        </div>
    )
}