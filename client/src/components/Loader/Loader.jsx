import style from "./Loader.module.css";

export function Loader({ text = "Loading…" }) {
    return (
        <div className={style.loader} role="status">
            <span className={style.hat} aria-hidden="true"></span>
            <p>{text}</p>
        </div>
    );
}
