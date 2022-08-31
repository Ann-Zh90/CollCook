import React, {Fragment} from "react";
import Header from "../Header/Header";
import {Outlet} from "react-router-dom";

import s from "./MainContent.module.css"

const MainContent: React.FC = () => {
    return (
        <div className={s.wrapper}>
            <Header/>
            <nav className={s.navDishes}>
                Different dishes
            </nav>
            <main className={s.main}>
                <Outlet/>
            </main>
            <footer className={s.footer}>
                <div>by Anna Zhyla</div>
                <div>All rights are reserved </div>
            </footer>
        </div>
    )
}

export default MainContent