import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetGame, clearGameOverMessage } from "../features/game/gameSlice";
import LeaderBoard from "../components/LeaderBoard";

const GameWon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRestart = () => {
    dispatch(clearGameOverMessage());

    dispatch(resetGame());
    navigate("/countdown");
  };

  const handleExit = () => {
    dispatch(resetGame());
    dispatch(clearGameOverMessage());
    navigate("/");
  };
  return (
    <div className="game-over ">
      <h1>You have won!</h1>
      <button
        className="button"
        onClick={handleRestart}
        style={{ margin: "15px" }}
      >
        Wanna play again?
      </button>
      <button
        className="button"
        onClick={handleExit}
        style={{ margin: "15px" }}
      >
        Quit the game
      </button>
      <LeaderBoard />
    </div>
  );
};

export default GameWon;
