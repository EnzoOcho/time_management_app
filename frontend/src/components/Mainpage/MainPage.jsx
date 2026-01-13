import React, { useEffect, useState } from 'react'
import "./MainPage.css"
import GraphSection from './GraphSection'
import Cronometro from './Cronometro'
import useApi from '../hooks/useApi'
import { useNavigate } from 'react-router-dom'
// import { jwtDecode } from "jwt-decode";


const MainPage = () => {

    const { getUserData, patchUserData } = useApi()

    const navigate = useNavigate()

    const [data, setData] = useState([])

    const today = () => {
        let fechaa = new Date()
        let dia = fechaa.getDate()
        const mes = fechaa.getMonth() + 1;
        let año = fechaa.getFullYear()

        let fechaCompleta = `${dia}/${mes}/${año}`
        console.log(fechaa)
        console.log(dia)
        console.log(año)
        console.log(mes)
        console.log(fechaCompleta)
    }

    const showdata = () => {
        console.log(userData)
        console.log(data)
    }

    const logout = async () => {
        try {
            const res = await fetch('http://localhost:5000/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })

            if (res.ok) {
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }


    // importar la info de las cookies y mostrarla en pantalla
    const [userData, setUserData] = useState({})

    useEffect(() => {
        getUserData("/auth/getDatos").then(user => {
            setUserData(user)
            setData(user.data)
            console.log("USUARIO:", user)
        })
    }, [])

    //lugar donde mostrar solo los ultimos 7 dias
    const [lastSevenDays, setLastSevenDays] = useState([])
    useEffect(() => {
        let arr = []
        for (let i = 0; i < 7; i++) {
            if (data[data.length - 1 - i]) {
                arr.unshift(data[data.length - 1 - i])
            }
        }
        setLastSevenDays(arr)
    }, [data])

    return (
        <section className='main_page'>
            <div className='parent'>
                <div className='user_section'>
                    {userData ? (
                        <>
                            <h2>Hola, {userData.nombre}</h2>
                            <p>{userData.email}</p>
                        </>
                    ) : (
                        <p>No estás logueado</p>
                    )}
                    <button onClick={showdata}>algo</button>
                    <button onClick={logout}>logout</button>
                </div>
                <Cronometro setData={setData} patchUserData={patchUserData} data={data} />
                <GraphSection data={lastSevenDays} />
            </div>

        </section>
    )
}

export default MainPage