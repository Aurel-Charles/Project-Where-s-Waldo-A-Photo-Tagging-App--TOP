import { Outlet } from "react-router";
import { Header } from "../Header/Header";
import style from "./Layout.module.css";

export function Layout() {
    return (
        <>
            <Header />
            <main className={style.main}>
                <Outlet />
            </main>
        </>
    );
}
