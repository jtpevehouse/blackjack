import React from "react";
import "./gameControls.css";

const GameControls = ({ onGet, onStand, onPlayAgain, gameOver }) => {
  return (
    <div className="controls">
      {gameOver === "" ? (
        <div>
          <button className="btn btn-success m-2" onClick={() => onGet()}>
            Hit Me!
          </button>
          <button className="btn btn-danger" onClick={() => onStand()}>
            Stand
          </button>{" "}
        </div>
      ) : (
        <button className="btn btn-success m-2" onClick={() => onPlayAgain()}>
          Play Again
        </button>
      )}
    </div>
  );
};

export default GameControls;
