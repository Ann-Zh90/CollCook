import React from "react";
import {Link, NavLink} from "react-router-dom";
import logo from "../../images/logo.jpg"
import s from "./Header.module.css"

const Header: React.FC = () => {

    const setActive = (e: { isActive: boolean }) => {
        return e.isActive ? `${s.activeLink}` : ""
    }

    return <header className={s.header}>
        <div className={s.container}>
            <div className={s.logoContainer}>
                <Link to="/">
                    <div className={s.logoWrapper}><img src={logo} className={s.logo} alt="logo"/></div>
                </Link>
            </div>
            <nav className={s.navbar}>
                <NavLink to="/recipes" className={setActive}>Recipes</NavLink>
                <NavLink to="/blog" className={(e: { isActive: boolean }) => {
                    return e.isActive ? `${s.activeLink}` : ""
                }}>Blog</NavLink>
                <NavLink to="/about" className={setActive}>About Us</NavLink>

            </nav>
        </div>
    </header>
}

export default Header;