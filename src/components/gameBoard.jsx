import React, { Component } from "react";
import Player from "./player";
import GameControls from "./gameControls";
import GameHeader from "./gameHeader";
import { getCard, resetCardsDrawn } from "../services/cardService";
import { checkIfGameOver, getUpdatedValues } from "../services/gameService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./gameBoard.css";

class GameBoard extends Component {
  state = {
    playerCards: [],
    dealerCards: [],
    playerTotal: 0,
    dealerTotal: 0,
    playerHasAce: false,
    dealerHasAce: false,
    gameOver: "",
    playerStanding: false,
    winner: "",
  };

  componentDidUpdate() {
    const { dealerCards, gameOver } = this.state;

    //If this is the start of the game, draw an extra card
    if (dealerCards.length === 1) {
      this.handleGetCard();
    }

    //Display a notification if the game has ended
    let toastProps = {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    };

    if (gameOver !== "" && gameOver !== "draw") {
      toast.info(`${gameOver} won!`, toastProps);
    } else if (gameOver !== "" && gameOver === "draw") {
      toast.info("It was a draw!", toastProps);
    }
  }

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

    while (dealerTotal < 16 && dealerTotal <= playerTotal) {
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
      playerStanding: false,
      winner: "",
      gameOver: "",
    });
    resetCardsDrawn();
  };

  render() {
    const {
      playerCards,
      dealerCards,
      playerTotal,
      dealerTotal,
      gameOver,
    } = this.state;

    return (
      <div className="game-board">
        <ToastContainer />
        <GameHeader gameOver={gameOver} />
        <Player
          cards={dealerCards}
          total={dealerTotal}
          gameOver={gameOver}
          owner="Dealer"
        />
        <Player
          cards={playerCards}
          total={playerTotal}
          gameOver={gameOver}
          owner="Player"
        />
        <GameControls
          onGet={this.handleGetCard}
          onStand={this.handlePlayerStand}
          onPlayAgain={this.handlePlayAgain}
          cardCount={dealerCards.length}
          gameOver={gameOver}
        />
      </div>
    );
  }
}

export default GameBoard;
