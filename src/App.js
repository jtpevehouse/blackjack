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
    playerHasAce: false,
    dealerHasAce: false,
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
    const { playerTotal, playerCards, playerHasAce } = this.state;
    let playerCard = getCard();

    //Check to see if card is an ace and if it should have a value of 1 or 11
    if (playerCard.value === 11 && playerTotal > 10) {
      this.setState({ playerHasAce: false });
      playerCard.value = 1;
    } else if (playerCard.value === 11 && playerTotal <= 10) {
      this.setState({ playerHasAce: true });
    }

    const newPlayerCards = [playerCard, ...playerCards];
    let newPlayerTotal = playerTotal + playerCard.value;

    //Check to see if the player has bust and if they have an ace that needs to be changed
    //to have a value of 1 to prevent the bust
    if (newPlayerTotal > 21 && playerHasAce) {
      this.setState({ playerHasAce: false });
      newPlayerTotal -= 10;
    }

    this.setState({ playerCards: newPlayerCards, playerTotal: newPlayerTotal });
  };

  //Add a card to the dealer's hand and update values accordingly
  getDealerCard = () => {
    const { dealerTotal, dealerCards, dealerHasAce } = this.state;
    let dealerCard = getCard();

    //Check to see if card is an ace and if it should have a value of 1 or 11
    if (dealerCard.value === 11 && dealerTotal > 10) {
      this.setState({ dealerHasAce: false });
      dealerCard.value = 1;
    } else if (dealerCard.value === 11 && dealerTotal <= 10) {
      this.setState({ dealerHasAce: true });
    }

    const newDealerCards = [dealerCard, ...dealerCards];
    let newDealerTotal = this.state.dealerTotal + dealerCard.value;

    //Check to see if the player has bust and if they have an ace that needs to be changed
    //to have a value of 1 to prevent the bust
    if (newDealerTotal > 21 && dealerHasAce) {
      this.setState({ dealerHasAce: false });
      newDealerTotal -= 10;
    }

    this.setState({ dealerCards: newDealerCards, dealerTotal: newDealerTotal });
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
