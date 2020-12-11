import React from "react";
import "./gameControls.css";

const GameControls = ({ onGet, onStand, onPlayAgain, cardCount, winner }) => {
  let controlsToRender = (
    <div>
      <button className="btn btn-primary" onClick={() => onGet()}>
        <h4>Hit Me!</h4>
      </button>
      <button className="btn btn-danger" onClick={() => onStand()}>
        <h4>Stand</h4>
      </button>
    </div>
  );

  if (winner !== "") {
    controlsToRender = (
      <button className="btn btn-primary" onClick={() => onPlayAgain()}>
        <h4>Play Again</h4>
      </button>
    );
  }

  if (cardCount === 0) {
    controlsToRender = (
      <button className="btn btn-primary" onClick={() => onGet()}>
        <h4>Start Game</h4>
      </button>
    );
  }

  return <div className="controls">{controlsToRender}</div>;
};

export default GameControls;
