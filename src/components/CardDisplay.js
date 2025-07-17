import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCards,
  flipCards,
  checkMatch,
  setIsPreviewing,
} from "../features/game/gameSlice";
import GameOverMessage from "./GameOverMessage";
const CardDisplay = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cardArray);
  const flippedPairsId = useSelector((state) => state.cards.flippedPairsId);
  const gameOverMessage = useSelector((state) => state.cards.gameOverMessage);
  const showGameOverMessage = useSelector(
    (state) => state.cards.showGameOverMessage
  );
  const navigatorName = useSelector((state) => state.users.userName);
  const hasInitialized = useRef(false);

  useEffect(() => {
    console.log("🔥 useEffect triggered");

    if (hasInitialized.current) {
      console.log("🚫 Already initialized, skipping");
      return;
    }

    hasInitialized.current = true;
    console.log("✅ First time initialization");

    const cardNames = [
      navigatorName || "Navigator",
      "Vice",
      "Carleen",
      "Goldie",
      "Eicy",
      "Giles",
      "Gram",
      "Jeno",
    ];

    let count = 0;
    let cardArray = [];
    cardNames.forEach((name) => {
      cardArray.push({
        pairName: name,
        isFlipped: false,
        isMatched: false,
        id: count++,
      });
      cardArray.push({
        pairName: name,
        isFlipped: false,
        isMatched: false,
        id: count++,
      });
    });

    const shuffleArray = (arr) => {
      const randArr = [...arr];
      for (let i = randArr.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randArr[i], randArr[j]] = [randArr[j], randArr[i]];
      }
      return randArr;
    };

    const shuffledArray = shuffleArray(cardArray);

    console.log("🔄 Dispatching setIsPreviewing(true)");
    dispatch(setIsPreviewing(true));

    const previewArray = shuffledArray.map((card) => ({
      ...card,
      isFlipped: true,
    }));
    dispatch(setCards(previewArray));

    setTimeout(() => {
      const readyArray = previewArray.map((card) => ({
        ...card,
        isFlipped: false,
      }));
      dispatch(setCards(readyArray));

      console.log("✅ Dispatching setIsPreviewing(false)");
      dispatch(setIsPreviewing(false));
    }, 1000);
  }, []);

  useEffect(() => {
    if (flippedPairsId.length == 2) {
      const timer = setTimeout(() => {
        dispatch(checkMatch());
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [flippedPairsId, dispatch]);

  const handleCardClick = (card) => {
    if (flippedPairsId.length === 2) {
      return;
    }
    dispatch(flipCards(card.id));
  };

  return (
    <div className="cards-div">
      {showGameOverMessage && <GameOverMessage message={gameOverMessage} />}
      <ul className="cards-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={[
              "card",
              card.isFlipped ? "card-flipped" : "",
              card.isMatched ? "card-matched" : "",
            ]
              .join(" ")
              .trim()}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-inner">
              <div className="card-face card-front">?</div>
              <div className="card-face card-back">{card.pairName}</div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CardDisplay;
