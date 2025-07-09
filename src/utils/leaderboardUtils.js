export const updateLeaderboard = (playerName, currentScore) => {
  let newHighScoreAchieved = false;

  const existingLeaderboardString = localStorage.getItem(
    "cardMatchingGameLeaderboard"
  );
  let leaderboard = existingLeaderboardString
    ? JSON.parse(existingLeaderboardString)
    : [];

  let userFoundInLeaderboard = false;
  leaderboard = leaderboard.map((user) => {
    if (user.userName === playerName) {
      userFoundInLeaderboard = true;
      if (currentScore > user.highestScore) {
        user.highestScore = currentScore;
        newHighScoreAchieved = true;
      }
    }
    return user;
  });

  if (!userFoundInLeaderboard) {
    leaderboard.push({ userName: playerName, highestScore: currentScore });
    newHighScoreAchieved = true;
  }

  leaderboard.sort((a, b) => {
    if (b.highestScore === a.highestScore) {
      return a.userName.localeCompare(b.userName);
    }
    return b.highestScore - a.highestScore;
  });

  localStorage.setItem(
    "cardMatchingGameLeaderboard",
    JSON.stringify(leaderboard)
  );

  return newHighScoreAchieved;
};
