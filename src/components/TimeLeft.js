import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCards,
  flipCards,
  checkMatch,
  decrementTimer,
  setGameStatus,
} from "../features/game/gameSlice";
import { useNavigate } from "react-router-dom";

const TimeLeft = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timer = useSelector((state) => state.cards.timer);
  const matchedPairCount = useSelector((state) => state.cards.matchedPairCount);
  const gameStatus = useSelector((state) => state.cards.gameStatus);

  useEffect(() => {
    let timerId;

    if (matchedPairCount === 8 && gameStatus === "onGoing") {
      dispatch(setGameStatus("won"));
      navigate("/win");
    } else if (gameStatus === "onGoing" && timer === 0) {
      timerId = setTimeout(() => {
        dispatch(setGameStatus("lost"));
        navigate("/lose");
      }, 100);
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
  }, [gameStatus, timer, matchedPairCount, dispatch, navigate]);

  return <div>Time Left: {timer}</div>;
};

export default TimeLeft;
