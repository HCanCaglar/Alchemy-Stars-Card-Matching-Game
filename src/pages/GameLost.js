import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetGame, clearGameOverMessage } from "../features/game/gameSlice";
import { setNewHighestScoreAchieved } from "../features/users/userSlice";
import LeaderBoard from "../components/LeaderBoard";

const GameWon = () => {
  const time = useSelector((state) => state.cards.timer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRestart = () => {
    dispatch(resetGame());
    dispatch(setNewHighestScoreAchieved(false));
    dispatch(clearGameOverMessage());

    navigate("/countdown");
  };
  const handleExit = () => {
    dispatch(resetGame());
    dispatch(setNewHighestScoreAchieved(false));
    dispatch(clearGameOverMessage());

    navigate("/");
  };
  return (
    <div>
      <h1>You have Lost!</h1>
      <button onClick={handleRestart}>Try again?</button>
      <button onClick={handleExit}>Quit the game</button>
      <LeaderBoard />
    </div>
  );
};

export default GameWon;
