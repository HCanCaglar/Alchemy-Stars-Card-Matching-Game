import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cardArray: [],
  timer: 60,
  matchedPairCount: 0,
  gameStatus: "onGoing",
  flippedPairsId: [],
};
const gameSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards(state, action) {
      state.cardArray = action.payload;
    },
    flipCards: (state, action) => {
      const cardIdToFlip = action.payload;

      const cardIndex = state.cardArray.findIndex(
        (card) => card.id === cardIdToFlip
      );

      if (cardIndex !== -1) {
        const clickedCard = state.cardArray[cardIndex];

        if (clickedCard.isMatched) {
          return;
        }
        const isAlreadyFlipped = state.flippedPairsId.includes(cardIdToFlip);

        if (isAlreadyFlipped) {
          return;
        } else {
          if (state.flippedPairsId.length < 2) {
            clickedCard.isFlipped = true;
            state.flippedPairsId.push(cardIdToFlip);
          } else {
            return;
          }
        }
      }
    },
    checkMatch: (state, action) => {
      const firstId = state.flippedPairsId[0];
      const secondId = state.flippedPairsId[1];
      const firstCard = state.cardArray.find((card) => card.id === firstId);
      const secondCard = state.cardArray.find((card) => card.id === secondId);
      if (firstCard.pairName === secondCard.pairName) {
        firstCard.isMatched = true;
        secondCard.isMatched = true;
        state.matchedPairCount = state.matchedPairCount + 1;
        state.flippedPairsId = [];
      } else {
        firstCard.isFlipped = false;
        secondCard.isFlipped = false;
        state.flippedPairsId = [];
      }
    },
    decrementTimer: (state, action) => {
      // we dont use while/loops inside reducers this causes a bug, instead decrementtimer is dispatched each second in the TimeLeft code
      state.timer = state.timer - 1;
    },
    setGameStatus: (state, action) => {
      state.gameStatus = action.payload;
    },
  },
});

export const {
  setCards,
  flipCards,
  checkMatch,
  decrementTimer,
  setGameStatus,
} = gameSlice.actions;
export default gameSlice.reducer;
