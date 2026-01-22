import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Homepage from '../Homepage/Homepage'
import LoginPage from "../Auth/LoginPage"
import SignUpPage from '../Auth/SignUpPage'

import MainPage from '../Mainpage/MainPage'

const RoutesHandler = () => {
  return (
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='signin' element={<SignUpPage/>}/>
        
        <Route path='mainpage' element={<MainPage/>}/>
    </Routes>
  )
}

export default RoutesHandler