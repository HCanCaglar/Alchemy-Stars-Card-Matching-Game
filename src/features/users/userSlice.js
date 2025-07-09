import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  highestScore: 0,
  loggedIn: false,
  newHighestScoreAchieved: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName(state, action) {
      state.userName = action.payload.userName;
    },
    setHighestScore(state, action) {
      state.highestScore = action.payload.highestScore;
    },
    setLoggedIn(state, action) {
      state.loggedIn = action.payload.loggedIn;
    },
    setNewHighestScoreAchieved: (state, action) => {
      state.newHighestScoreAchieved = action.payload;
    },
  },
});

export const {
  setUserName,
  setHighestScore,
  setLoggedIn,
  setNewHighestScoreAchieved,
} = userSlice.actions;

export default userSlice.reducer;
