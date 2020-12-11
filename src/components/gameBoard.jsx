import React, { Component } from "react";
import Player from "./player";
import GameControls from "./gameControls";
import GameHeader from "./gameHeader";
import { getCard, resetCardsDrawn } from "../services/cardService";
import { checkIfGameOver, getUpdatedValues } from "../services/gameService";
import { ToastContainer, toast } from "react-toastify";
import { DEALER_SOFT_CAP, INITIAL_GAME_STATE } from "../config.json";
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
    winner: "",
    playerStanding: false,
  };

  componentDidUpdate() {
    const { dealerCards, winner } = this.state;

    //If this is the start of the game, draw an extra card
    if (dealerCards.length === 1) {
      this.handleGetCard();
    }

    //Display a notification if the game has ended
    let toastProps = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    };

    if (winner !== "" && winner !== "draw") {
      toast.info(`${winner} won!`, toastProps);
    } else if (winner !== "" && winner === "draw") {
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
    const winner = checkIfGameOver(dealerTotal, playerTotal, playerStanding);

    //Update the state variables with the new values
    this.setState({
      playerTotal,
      playerCards,
      playerHasAce,
      playerStanding,
      dealerTotal,
      dealerCards,
      dealerHasAce,
      winner,
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

    let winner = checkIfGameOver(dealerTotal, playerTotal, playerStanding);
    if (winner) {
      return this.setState({ winner, dealerCards, dealerTotal });
    }

    while (dealerTotal < DEALER_SOFT_CAP && dealerTotal <= playerTotal) {
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

    winner = checkIfGameOver(dealerTotal, playerTotal, playerStanding);
    if (winner) {
      return this.setState({ winner, dealerTotal, dealerCards });
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
    this.setState(INITIAL_GAME_STATE);
    resetCardsDrawn();
  };

  render() {
    const {
      playerCards,
      dealerCards,
      playerTotal,
      dealerTotal,
      winner,
    } = this.state;

    return (
      <div className="game-board">
        <ToastContainer />
        <GameHeader winner={winner} />
        <Player
          cards={dealerCards}
          total={dealerTotal}
          winner={winner}
          owner="Dealer"
        />
        <Player
          cards={playerCards}
          total={playerTotal}
          winner={winner}
          owner="Player"
        />
        <GameControls
          onGet={this.handleGetCard}
          onStand={this.handlePlayerStand}
          onPlayAgain={this.handlePlayAgain}
          cardCount={dealerCards.length}
          winner={winner}
        />
      </div>
    );
  }
}

export default GameBoard;
