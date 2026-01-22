import React from 'react'
import "./LoginPage.css"
import { useState } from "react";
import useApi from "../Hooks/useApi.js";
import { useNavigate } from "react-router-dom"

const SignUpPage = () => {

  const navigate = useNavigate()
  const { postData } = useApi()

  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    await postData("/auth/register", { nombre, email, password });
    await postData("/auth/login", { email, password })
    setNombre("")
    setEmail("")
    setPassword("")

    navigate("/mainpage")
  };

  return (
    <section className="login_page">
      <div className="form_box">
        <div className="signin_icon">
          <img src="/signin_icon.svg" alt="" />
        </div>
        <form onSubmit={handleSignIn}>
          <h2>Crea un Usuario</h2>

          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="submit_btn" type="submit">Ingresar</button>
        </form>
      </div>

    </section>
  );
}

export default SignUpPage