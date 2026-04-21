import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import './App.css'
import HomePage from '../HomePage/HomePage'
import Graphics from '../Graphics/Graphics'

function App() {
  const pages = {
    HomePage: { label: 'Home', component: <HomePage /> },
    Graphics: { label: 'Graphics', component: <Graphics /> }
  }
  const [actualPage, setActualPage] = useState(pages.HomePage.component)


  return (
    <>
      <header>
        <div className="logo">
          <img src="./img/vacation.svg" width={70} alt="Home" />
        </div>

        <div className="selectPageContainer">
          <button className="selectPage" onClick={() => setActualPage(pages.HomePage.component)}> <img src="./img/home.svg" width={45} alt="Home" /> </button>
          <button className="selectPage" onClick={() => setActualPage(pages.Graphics.component)}><img src="./img/graphics.svg" width={45} alt="Graphics" /></button>
        </div>
      </header>

      {actualPage}
    </>
  )
}

export default App
