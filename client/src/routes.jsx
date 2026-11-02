import App from "./App";
import { Game } from "./components/Game/Game";
import { Home } from "./pages/Home";
import { Leaderboard } from "./pages/Leaderboard";
import { PictureList } from "./pages/PictureList";

export const routes = [
    {
      path: "/",
      element : <App/>,
      children: [
        {index : true ,element : <Home/> },
        {path : "play",element : <PictureList/> },
        {path : "leaderboard",element : <Leaderboard/> },
        { path: "play/:pictureId", element: <Game /> }
      ]
    }
]