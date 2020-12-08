import React from "react";

const GameHeader = ({ gameOver }) => {
  return (
    <React.Fragment>
      {gameOver ? (
        <h1>{gameOver === "draw" ? "Draw!" : `${gameOver} Won!`}</h1>
      ) : (
        <h1>Pevehouse Blackjack</h1>
      )}
    </React.Fragment>
  );
};

export default GameHeader;
