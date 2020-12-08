import React, { Component } from "react";
import PlayerHand from "./playerHand";
import DealerHand from "./dealerHand";
import GameControls from "./gameControls";
import GameHeader from "./gameHeader";
import { getCard } from "../services/cardService";

class GameBoard extends Component {
  state = {
    playerCards: [],
    dealerCards: [],
    playerTotal: 0,
    dealerTotal: 0,
    draw: false,
    playerStayed: false,
    winner: "",
  };

  handleGetCard = () => {
    const { dealerTotal } = this.state;
    if (dealerTotal < 17) {
      this.getDealerCard();
    }

    this.getPlayerCard();
  };

  getPlayerCard = () => {
    const playerCard = getCard();
    const playerCards = [playerCard, ...this.state.playerCards];
    const playerTotal = this.state.playerTotal + playerCard.value;

    this.setState({ playerCards, playerTotal });
  };

  getDealerCard = () => {
    const dealerCard = getCard();
    const dealerCards = [dealerCard, ...this.state.dealerCards];
    const dealerTotal = this.state.dealerTotal + dealerCard.value;
    this.setState({ dealerCards, dealerTotal });
  };

  checkIfGameOver = () => {
    const { playerTotal, dealerTotal } = this.state;

    //Check to see if handleStay set the winner property
    if (this.state.winner !== "") {
      return this.state.winner;
    }

    //Check if player and dealer both have blackjack
    if (
      (dealerTotal > 21 && playerTotal > 21) ||
      (dealerTotal === 21 && playerTotal === 21)
    ) {
      return "draw";
    }

    //Check if either player has blackjack
    if (dealerTotal === 21) {
      return "Dealer";
    } else if (playerTotal === 21) {
      return "Player";
    }

    //Check if either player bust
    if (playerTotal > 21) {
      return "Dealer";
    } else if (dealerTotal > 21) {
      return "Player";
    }

    //Check to see if player stayed and dealer is up
    if (this.state.playerStayed && dealerTotal > playerTotal) {
      return "Dealer";
    } else if (this.state.playerStayed && dealerTotal < playerTotal) {
      this.getDealerCard();
    }
  };

  handleStay = () => {
    const { dealerTotal, playerTotal } = this.state;

    if (dealerTotal > playerTotal) {
      this.setState({ winner: "Dealer" });
      return;
    }

    if (
      (dealerTotal < playerTotal && dealerTotal <= 16) ||
      (dealerTotal === playerTotal && dealerTotal <= 16)
    ) {
      this.getDealerCard();
      this.setState({ playerStayed: true });
      return;
    }

    if (dealerTotal === playerTotal && dealerTotal >= 16) {
      this.setState({ winner: "draw" });
    }

    if (dealerTotal < playerTotal && dealerTotal >= 16) {
      this.setState({ winner: "Player" });
      return;
    }
  };

  //Reset the game back to it's initial state
  handlePlayAgain = () => {
    this.setState({
      playerCards: [],
      dealerCards: [],
      playerTotal: 0,
      dealerTotal: 0,
      draw: false,
      playerStayed: false,
      winner: "",
    });
  };

  render() {
    const { playerCards, dealerCards, playerTotal } = this.state;
    const gameOver = this.checkIfGameOver();

    return (
      <div className="container">
        <GameHeader gameOver={gameOver} />
        <div className="row">
          <div className="col">
            <h3>Player: {playerTotal}</h3>
            <PlayerHand cards={playerCards} total={playerTotal} />
          </div>
          <div className="col">
            <h3>Dealer</h3>
            <DealerHand cards={dealerCards} />
          </div>
        </div>
        <GameControls
          onGet={this.handleGetCard}
          onStay={this.handleStay}
          onPlayAgain={this.handlePlayAgain}
          gameOver={gameOver}
        />
      </div>
    );
  }
}

export default GameBoard;
