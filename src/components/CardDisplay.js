import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCards, flipCards, checkMatch } from "../features/game/gameSlice";

const CardDisplay = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cardArray);
  const flippedPairsId = useSelector((state) => state.cards.flippedPairsId);

  useEffect(() => {
    const cardNames = [
      "Navigator",
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
      let mathingCard1 = {
        pairName: name,
        isFlipped: false,
        isMatched: false,
        id: count,
      };
      cardArray.push(mathingCard1);
      count = count + 1;
      let mathingCard2 = {
        pairName: name,
        isFlipped: false,
        isMatched: false,
        id: count,
      };
      cardArray.push(mathingCard2);
      count = count + 1;
    });

    const shuffleArray = (arr) => {
      const randArr = [...arr];
      for (var i = randArr.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randArr[i], randArr[j]] = [randArr[j], randArr[i]];
      }
      return randArr;
    };

    const shuffledArray = shuffleArray(cardArray);
    dispatch(setCards(shuffledArray));
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
    <div>
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
