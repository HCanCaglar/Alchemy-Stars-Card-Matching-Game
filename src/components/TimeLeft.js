import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementTimer,
  setGameStatus,
  setGameOverMessage,
  setShowGameOverMessage,
} from "../features/game/gameSlice";
import { useNavigate } from "react-router-dom";
import { updateLeaderboard } from "../utils/leaderboardUtils";
import {
  setNewHighestScoreAchieved,
  setHighestScore,
} from "../features/users/userSlice";

const TimeLeft = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timer = useSelector((state) => state.cards.timer);
  const matchedPairCount = useSelector((state) => state.cards.matchedPairCount);
  const gameStatus = useSelector((state) => state.cards.gameStatus);
  const playerName = useSelector((state) => state.users.userName);
  const isPreviewing = useSelector((state) => state.cards.isPreviewing);

  useEffect(() => {
    if (isPreviewing) return;
    let timerId;

    if (matchedPairCount === 8 && gameStatus === "onGoing") {
      dispatch(setGameStatus("won"));
      const didAchieveNewHighScore = updateLeaderboard(playerName, timer);
      dispatch(setNewHighestScoreAchieved(didAchieveNewHighScore));
      if (didAchieveNewHighScore) {
        dispatch(setHighestScore({ highestScore: timer }));
      }
      navigate("/won");
    } else if (gameStatus === "onGoing" && timer === 0) {
      dispatch(setGameOverMessage("Time's up!"));
      dispatch(setShowGameOverMessage(true));
      timerId = setTimeout(() => {
        dispatch(setGameStatus("lost"));
        navigate("/lost");
      }, 1500);
    } else if (gameStatus === "onGoing" && timer > 0) {
      timerId = setTimeout(() => {
        dispatch(decrementTimer());
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [
    gameStatus,
    timer,
    playerName,
    matchedPairCount,
    dispatch,
    navigate,
    isPreviewing,
  ]);

  return <div className="time-left">Time Left: {timer}</div>;
};

export default TimeLeft;
