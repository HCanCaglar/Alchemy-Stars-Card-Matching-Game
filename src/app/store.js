import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userSlice";
import gameSlice from "../features/game/gameSlice";
export const store = configureStore({
  reducer: {
    users: userSlice,
    cards: gameSlice,
  },
});
