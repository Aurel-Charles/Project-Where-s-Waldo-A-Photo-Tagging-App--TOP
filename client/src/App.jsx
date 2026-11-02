import './App.css'
import level1 from './assets/level1.webp'
import { Game } from './components/Game/Game'

function App() {
  

  return (
    <>
      <h1> {import.meta.env.VITE_APP_TITLE}</h1>
      <Game pictureId={1} imgUrl={level1} />
    </>
  )
}

export default App
