import React from "react";
const GameOverMessage = ({ message }) => {
  return (
    <div className="game-over-div">
      <div className="game-over-message">{message}</div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const messageStyle = {
  backgroundColor: "#fff",
  color: "#000",
  padding: "30px 60px",
  borderRadius: "12px",
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",
};

export default GameOverMessage;
