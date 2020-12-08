import React, { Component } from "react";
import PlayerHand from "./playerHand";
import DealerHand from "./dealerHand";
import GameControls from "./gameControls";
import GameHeader from "./gameHeader";

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
      <div className="container">
        <GameHeader gameOver={gameOver} />
        <div className="row">
          <div className="col">
            <h3>Player: {playerTotal}</h3>
            <PlayerHand cards={playerCards} total={playerTotal} />
          </div>
          <div className="col">
            <h3>Dealer: {dealerTotal}</h3>
            <DealerHand cards={dealerCards} />
          </div>
        </div>
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
