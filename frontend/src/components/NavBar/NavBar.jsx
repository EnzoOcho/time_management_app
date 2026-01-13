import React from 'react'
import {NavLink} from "react-router-dom"
import "./NavBar.css"

const NavBar = () => {
  return (
    <nav>
        <h1>Nombre</h1>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signin">Signin</NavLink>
    </nav>
  )
}

export default NavBar