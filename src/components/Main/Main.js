import React from 'react'
import Promo from '../Promo/Promo'
import Info from '../Info/Info'
import Tech from '../Tech/Tech'
import AboutStudent from '../AboutStudent/AboutStudent'
import Portfolio from '../Portfolio/Portfolio'

const Main = () => {
  return (
    <main className="main">
      <Promo />
      <Info />
      <Tech />
      <AboutStudent />
      <Portfolio />
    </main>
  )
}

export default Main
