import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const LeaderBoard = () => {
  const [leaderboardData, setLeaderBoardData] = useState([]);
  const playerName = useSelector((state) => state.users.userName);
  const newHighScoreAchievedForCurrentPlayer = useSelector(
    (state) => state.users.newHighestScoreAchieved
  );

  useEffect(() => {
    const leaderBoardKey = localStorage.getItem("cardMatchingGameLeaderboard");
    let loadedLeaderboard = [];
    if (leaderBoardKey) {
      loadedLeaderboard = JSON.parse(leaderBoardKey);
    }
    loadedLeaderboard.sort((a, b) => {
      if (b.highestScore === a.highestScore) {
        return a.userName.localeCompare(b.userName);
      }
      return b.highestScore - a.highestScore;
    });
    setLeaderBoardData(loadedLeaderboard);
  }, []);

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          textDecoration: "underline",
        }}
      >
        LeaderBoard
      </h2>
      <table className="leaderboard-table">
        <thead>
          <tr className="leader-table-head">
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={entry.userName}>
              <td>{index + 1}</td>
              <td>{entry.userName}</td>
              <td>{entry.highestScore}</td>
              <td>
                {entry.userName === playerName &&
                  newHighScoreAchievedForCurrentPlayer && <span> (NEW!)</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
