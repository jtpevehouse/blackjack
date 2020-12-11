import React from "react";
import "./gameHeader.css";

const GameHeader = ({ winner }) => {
  return (
    <div className="game-header">
      {winner ? (
        <h1>{winner === "draw" ? "It was a draw!" : `${winner} Won!`}</h1>
      ) : (
        <h1>Pevehouse Blackjack</h1>
      )}
    </div>
  );
};

export default GameHeader;
