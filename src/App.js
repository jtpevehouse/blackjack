import React, { Component } from "react";
import GameBoard from "./components/gameBoard";
import { getCard } from "./services/cardService";
import { checkIfGameOver, handleStay } from "./services/gameService";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {
    playerCards: [],
    dealerCards: [],
    playerTotal: 0,
    dealerTotal: 0,
    draw: false,
    playerStayed: false,
    winner: "",
  };

  //Handle drawing a card for the player and the dealer if the dealer can draw
  handleGetCard = () => {
    const { dealerTotal } = this.state;
    if (dealerTotal < 17) {
      this.getDealerCard();
    }

    this.getPlayerCard();
  };

  //Add a card to the player's hand and update values accordingly
  getPlayerCard = () => {
    const playerCard = getCard();
    const playerCards = [playerCard, ...this.state.playerCards];
    const playerTotal = this.state.playerTotal + playerCard.value;

    this.setState({ playerCards, playerTotal });
  };

  //Add a card to the dealer's hand and update values accordingly
  getDealerCard = () => {
    const dealerCard = getCard();
    const dealerCards = [dealerCard, ...this.state.dealerCards];
    const dealerTotal = this.state.dealerTotal + dealerCard.value;
    this.setState({ dealerCards, dealerTotal });
  };

  //Pass state values to the gameService handleStay function
  onStay = () => {
    const { dealerTotal, playerTotal } = this.state;
    this.setState(handleStay(dealerTotal, playerTotal, this.getDealerCard));
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
    const { dealerTotal, playerTotal, winner, playerStayed } = this.state;
    const gameOver = checkIfGameOver(
      dealerTotal,
      playerTotal,
      winner,
      playerStayed,
      this.getDealerCard
    );

    return (
      <GameBoard
        playerCards={this.state.playerCards}
        dealerCards={this.state.dealerCards}
        playerTotal={this.state.playerTotal}
        gameOver={gameOver}
        handleGetCard={this.handleGetCard}
        handlePlayAgain={this.handlePlayAgain}
        handleStay={this.onStay}
      />
    );
  }
}

export default App;
