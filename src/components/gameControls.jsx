import React from "react";

const GameControls = ({ onGet, onStand, onPlayAgain, gameOver }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default GameControls;
