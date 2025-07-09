import "./App.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import GamePage from "./pages/GamePage";
import CountdownScreen from "./components/CountdownScreen";
import GameLost from "./pages/GameLost";
import GameWon from "./pages/GameWon";
import "./styles.less";
import PlaylistPlayer from "./components/PlaylistPlayer";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PlaylistPlayer />
        <Routes>
          <Route path="/" exact element={<WelcomeScreen />} />
          <Route path="/countdown" element={<CountdownScreen />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/lost" element={<GameLost />} />
          <Route path="/won" element={<GameWon />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
