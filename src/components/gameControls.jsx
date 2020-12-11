import React from "react";
import "./gameControls.css";

const GameControls = ({ onGet, onStand, onPlayAgain, cardCount, winner }) => {
  let controlsToRender = (
    <div>
      <button className="btn btn-success m-2" onClick={() => onGet()}>
        Hit Me!
      </button>
      <button className="btn btn-danger" onClick={() => onStand()}>
        Stand
      </button>
    </div>
  );

  if (winner !== "") {
    controlsToRender = (
      <button className="btn btn-success m-2" onClick={() => onPlayAgain()}>
        Play Again
      </button>
    );
  }

  if (cardCount === 0) {
    controlsToRender = (
      <button className="btn btn-success m-2" onClick={() => onGet()}>
        Start Game
      </button>
    );
  }

  return <div className="controls">{controlsToRender}</div>;
};

export default GameControls;
