import React from "react";
import CardDisplay from "../components/CardDisplay";
import TimeLeft from "../components/TimeLeft";
import PlaylistPlayer from "../components/PlaylistPlayer";

const GamePage = () => {
  return (
    <div className="game-page">
      <CardDisplay />

      <div className="time-video">
        <TimeLeft />
        <PlaylistPlayer />
      </div>
    </div>
  );
};

export default GamePage;
