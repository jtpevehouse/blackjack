import React, { Component } from "react";
import GameBoard from "./components/gameBoard";
import { getCard, resetCardsDrawn } from "./services/cardService";
import { checkIfGameOver } from "./services/gameService";
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
      } = this.getUpdatedValues(
        dealerTotal,
        dealerCard,
        dealerCards,
        dealerHasAce
      );

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
      } = this.getUpdatedValues(
        playerTotal,
        playerCard,
        playerCards,
        playerHasAce
      );

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

  //Gets the values that should be set for the hand that was passed in
  getUpdatedValues = (total, newCard, cards, hasAce) => {
    if (newCard.value === 11 && total > 10) {
      hasAce = false;
      newCard.value = 1;
    } else if (newCard.value === 11 && total <= 10) {
      hasAce = true;
    }

    const newCards = [newCard, ...cards];
    let newTotal = total + newCard.value;

    if (newTotal > 21 && hasAce) {
      hasAce = false;
      newTotal -= 10;
    }

    return { newTotal, newCards, hasAce };
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

    while (dealerTotal < 16) {
      let gameOver = checkIfGameOver(dealerTotal, playerTotal, playerStanding);
      if (gameOver) {
        return this.setState({ gameOver, dealerCards, dealerTotal });
      }

      let dealerCard = getCard();

      const {
        newTotal: newDealerTotal,
        newCards: newDealerCards,
        hasAce,
      } = this.getUpdatedValues(
        dealerTotal,
        dealerCard,
        dealerCards,
        dealerHasAce
      );

      dealerCards = newDealerCards;
      dealerTotal = newDealerTotal;
      dealerHasAce = hasAce;
    }

    let gameOver = checkIfGameOver(dealerTotal, playerTotal, playerStanding);
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
      draw: false,
      playerStanding: false,
      winner: "",
      gameOver: "",
    });
    resetCardsDrawn();
  };

  render() {
    const { playerTotal, gameOver, playerCards, dealerCards } = this.state;

    return (
      <GameBoard
        playerCards={playerCards}
        dealerCards={dealerCards}
        playerTotal={playerTotal}
        gameOver={gameOver}
        handleGetCard={this.handleGetCard}
        handlePlayAgain={this.handlePlayAgain}
        handlePlayerStand={this.handlePlayerStand}
      />
    );
  }
}

export default App;
