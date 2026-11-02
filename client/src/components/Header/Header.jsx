import { Link, NavLink } from "react-router";
import style from "./Header.module.css";

export function Header() {
    function linkClass({ isActive }) {
        return isActive ? `${style.link} ${style.active}` : style.link;
    }

    return (
        <header className={style.header}>
            <div className={style.inner}>
                <h1 className={style.logo}>
                    <Link to="/">{import.meta.env.VITE_APP_TITLE}</Link>
                </h1>
                <nav className={style.nav} aria-label="Main">
                    <NavLink to="/" end className={linkClass}>Home</NavLink>
                    <NavLink to="/play" className={linkClass}>Play</NavLink>
                    <NavLink to="/leaderboard" className={linkClass}>Leaderboard</NavLink>
                </nav>
            </div>
        </header>
    );
}
