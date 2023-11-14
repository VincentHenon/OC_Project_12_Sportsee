import React from 'react'
import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"
import logoPath from "../Assets/Media/logo.svg"

/**
  * React component for displaying the header.
  * @returns jsx
*/
function Header() {
    return (
        <header>
            <Link to="/"><img className="logo" src={logoPath} alt="logo for SportSee" /></Link>
            <nav className="navbar">
                <NavLink to="/" className="Home" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>Accueil</NavLink>
                <NavLink to="/profile" className="Profile" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>Profil</NavLink>
                <NavLink to="/settings" className="Settings" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>Réglage</NavLink>
                <NavLink to="/community" className="Community" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>Communauté</NavLink>
            </nav>
        </header> 
    )
}

export default Header