import React from 'react'
import "./App.css"
import NavBar from './components/NavBar/NavBar';
import RoutesHandler from "./components/RoutingComponent/Routes"

const App = () => {
  return (
    <section className='app'>
      <NavBar/>
      <RoutesHandler/>
    </section>
  )
}

export default App