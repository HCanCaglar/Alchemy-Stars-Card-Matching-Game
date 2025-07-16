import "./App.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import GamePage from "./pages/GamePage";
import CountdownScreen from "./components/CountdownScreen";
import GameLost from "./pages/GameLost";
import GameWon from "./pages/GameWon";
import "./styles.less";
import PlaylistPlayer from "./components/PlaylistPlayer";

function Content() {
  const location = useLocation();

  let className = "";
  if (location.pathname === "/") {
    className = "welcome-video";
  } else if (location.pathname === "/countdown") {
    className = "countdown-video";
  } else if (location.pathname === "/game") {
    className = "game-video";
  } else if (location.pathname === "/lost" || location.pathname === "/won") {
    className = "over-video";
  }

  return (
    <div className={className}>
      <Routes>
        <Route path="/" exact element={<WelcomeScreen />} />
        <Route path="/countdown" element={<CountdownScreen />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/lost" element={<GameLost />} />
        <Route path="/won" element={<GameWon />} />
      </Routes>
      <div>
        <PlaylistPlayer />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Content />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
