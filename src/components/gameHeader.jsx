import React from "react";
import "./gameHeader.css";

const GameHeader = ({ gameOver }) => {
  return (
    <div className="game-header">
      {gameOver ? (
        <h1>{gameOver === "draw" ? "Draw!" : `${gameOver} Won!`}</h1>
      ) : (
        <h1>Pevehouse Blackjack</h1>
      )}
    </div>
  );
};

export default GameHeader;
