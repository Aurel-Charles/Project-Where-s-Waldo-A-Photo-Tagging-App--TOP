import './App.css'
import { GameImage } from './components/GameImage/GameImage'
import level1 from './assets/level1.webp'

function App() {
  

  return (
    <>
      <h1> {import.meta.env.VITE_APP_TITLE}</h1>
      <GameImage imgUrl={level1}/>
    </>
  )
}

export default App
