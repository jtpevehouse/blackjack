import React, { Component } from "react";
import Hand from "./hand";
import GameControls from "./gameControls";
import GameHeader from "./gameHeader";
import "./gameBoard.css";

class GameBoard extends Component {
  render() {
    const {
      playerCards,
      dealerCards,
      playerTotal,
      dealerTotal,
      handleGetCard,
      handlePlayerStand,
      handlePlayAgain,
      gameOver,
    } = this.props;

    return (
      <div className="game-board">
        <GameHeader gameOver={gameOver} />
        <Hand
          cards={dealerCards}
          total={dealerTotal}
          gameOver={gameOver}
          owner="dealer"
        />
        <Hand
          cards={playerCards}
          total={playerTotal}
          gameOver={gameOver}
          owner="player"
        />
        <GameControls
          onGet={handleGetCard}
          onStand={handlePlayerStand}
          onPlayAgain={handlePlayAgain}
          gameOver={gameOver}
        />
      </div>
    );
  }
}

export default GameBoard;
