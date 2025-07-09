import React, { useEffect, useRef } from "react";
import CardDisplay from "../components/CardDisplay";
import TimeLeft from "../components/TimeLeft";
const GamePage = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <div className="game-page">
      <CardDisplay />
      <TimeLeft />
    </div>
  );
};

export default GamePage;
