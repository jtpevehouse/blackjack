import React, { Component } from "react";
import GameBoard from "./components/gameBoard";
import { getCard, resetCardsDrawn } from "./services/cardService";
import { checkIfGameOver, getUpdatedValues } from "./services/gameService";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {
    playerCards: [],
    dealerCards: [],
    playerTotal: 0,
    dealerTotal: 0,
    playerHasAce: false,
    dealerHasAce: false,
    gameOver: "",
    draw: false,
    playerStanding: false,
    winner: "",
  };

  //Handle drawing a card for the player and the dealer
  handleGetCard = () => {
    let {
      playerTotal,
      playerCards,
      playerHasAce,
      playerStanding,
      dealerTotal,
      dealerCards,
      dealerHasAce,
    } = this.state;

    //Add a card to the dealer's hand if they have a total less than 17
    if (dealerTotal < 17) {
      let dealerCard = getCard();

      const {
        newTotal: newDealerTotal,
        newCards: newDealerCards,
        hasAce,
      } = getUpdatedValues(dealerTotal, dealerCard, dealerCards, dealerHasAce);

      dealerCards = newDealerCards;
      dealerTotal = newDealerTotal;
      dealerHasAce = hasAce;
    }

    //Add a card to the player's hand unless they stood
    if (playerStanding === false) {
      let playerCard = getCard();
      const {
        newTotal: newPlayerTotal,
        newCards: newPlayerCards,
        hasAce,
      } = getUpdatedValues(playerTotal, playerCard, playerCards, playerHasAce);

      playerCards = newPlayerCards;
      playerTotal = newPlayerTotal;
      playerHasAce = hasAce;
    }

    //Check to see if the new values will end the game
    const gameOver = checkIfGameOver(dealerTotal, playerTotal, playerStanding);

    //Update the state variables with the new values
    this.setState({
      playerTotal,
      playerCards,
      playerHasAce,
      playerStanding,
      dealerTotal,
      dealerCards,
      dealerHasAce,
      gameOver,
    });
  };

  //Once the player has stood, have the dealer draw cards until  16 <= dealer's total < 21
  handlePlayerStand = () => {
    let {
      dealerTotal,
      dealerCards,
      dealerHasAce,
      playerTotal,
      playerStanding,
    } = this.state;
    playerStanding = true;

    let gameOver = checkIfGameOver(dealerTotal, playerTotal, playerStanding);
    if (gameOver) {
      return this.setState({ gameOver, dealerCards, dealerTotal });
    }

    while (dealerTotal < 16) {
      let dealerCard = getCard();

      const {
        newTotal: newDealerTotal,
        newCards: newDealerCards,
        hasAce,
      } = getUpdatedValues(dealerTotal, dealerCard, dealerCards, dealerHasAce);

      dealerCards = newDealerCards;
      dealerTotal = newDealerTotal;
      dealerHasAce = hasAce;
    }

    gameOver = checkIfGameOver(dealerTotal, playerTotal, playerStanding);
    if (gameOver) {
      return this.setState({ gameOver, dealerTotal, dealerCards });
    }
    this.setState({
      dealerTotal,
      dealerCards,
      dealerHasAce,
      playerStanding: true,
    });
  };

  //Reset the game back to it's initial state
  handlePlayAgain = () => {
    this.setState({
      playerCards: [],
      dealerCards: [],
      playerTotal: 0,
      dealerTotal: 0,
      playerHasAce: false,
      dealerHasAce: false,
      draw: false,
      playerStanding: false,
      winner: "",
      gameOver: "",
    });
    resetCardsDrawn();
  };

  render() {
    const {
      playerTotal,
      dealerTotal,
      gameOver,
      playerCards,
      dealerCards,
    } = this.state;

    return (
      <GameBoard
        playerCards={playerCards}
        dealerCards={dealerCards}
        playerTotal={playerTotal}
        dealerTotal={dealerTotal}
        gameOver={gameOver}
        handleGetCard={this.handleGetCard}
        handlePlayAgain={this.handlePlayAgain}
        handlePlayerStand={this.handlePlayerStand}
      />
    );
  }
}

export default App;
