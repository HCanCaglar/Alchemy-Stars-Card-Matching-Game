import React from "react";
import CardDisplay from "../components/CardDisplay";
import TimeLeft from "../components/TimeLeft";

const GamePage = () => {
  return (
    <div className="game-page">
      <CardDisplay />

      <div className="time-video">
        <TimeLeft />
      </div>
    </div>
  );
};

export default GamePage;
