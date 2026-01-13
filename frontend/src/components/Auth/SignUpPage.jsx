import React from 'react'
import "./LoginPage.css"
import { useState } from "react";
import useApi from "../hooks/useApi.js";
import {useNavigate} from "react-router-dom"

const SignUpPage = () => {

  const navigate = useNavigate()
  const { postData } = useApi()

  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
        e.preventDefault();
    console.log({nombre, email, password})
         const res = await postData("/auth/register", {nombre, email, password });

         console.log(res)

         navigate("/mainpage")
        // if (res?.token) {
        //     // Guardar token en localStorage
        //     localStorage.setItem("token", res.token);

        // }
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