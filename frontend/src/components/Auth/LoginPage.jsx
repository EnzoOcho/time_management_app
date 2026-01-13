import { useState } from "react";
import useApi from "../hooks/useApi";
import "./LoginPage.css"
import {useNavigate} from "react-router-dom"

const LoginPage = () => {
    const { postData } = useApi();

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await postData("/auth/login", { email, password });
        console.log(res)
        if (res?.success) {
            

             navigate("/mainpage")
        }
    };

    return (
        <section className="login_page">
            <div className="form_box">
                <div className="signin_icon">
                    <img src="/login_icon.svg" alt="" />
                </div>
                <form onSubmit={handleLogin}>
                    <h2>Inicia Sesión</h2>

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
};

export default LoginPage;