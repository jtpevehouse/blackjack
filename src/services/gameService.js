const config = require("../config.json");
const { HARD_CAP, DEALER_SOFT_CAP } = config;

//Checks to see if the dealer or player has won or if the game is a draw
export function checkIfGameOver(dealerTotal, playerTotal, playerStanding) {
  //Check if player and dealer both have blackjack
  if (
    (dealerTotal > HARD_CAP && playerTotal > HARD_CAP) ||
    (dealerTotal === HARD_CAP && playerTotal === HARD_CAP)
  ) {
    return "draw";
  }

  //Check if either player has won on blackjack
  if (dealerTotal === HARD_CAP && (playerStanding || playerTotal > HARD_CAP)) {
    return "Dealer";
  } else if (playerTotal === HARD_CAP && dealerTotal > DEALER_SOFT_CAP) {
    return "Player";
  }

  //Check if either player bust
  if (playerTotal > HARD_CAP) {
    return "Dealer";
  } else if (dealerTotal > HARD_CAP) {
    return "Player";
  }

  //Check to see if player stood and dealer is up
  if (playerStanding && dealerTotal > playerTotal) {
    return "Dealer";
  }

  //Check to see if the player won because the dealer was forced to stand
  if (
    playerStanding &&
    dealerTotal >= DEALER_SOFT_CAP &&
    playerTotal > dealerTotal
  ) {
    return "Player";
  }

  //Check to see if the player and dealer stood to a draw
  if (
    playerStanding &&
    dealerTotal >= DEALER_SOFT_CAP &&
    playerTotal === dealerTotal
  ) {
    return "draw";
  }

  return "";
}

//Gets the values that should be set for the hand that was passed in
export function getUpdatedValues(total, newCard, cards, hasAce) {
  const newCards = [newCard, ...cards];
  let newTotal = total + newCard.value;

  if ((newCard.value === 11 && total > 10) || (newTotal > HARD_CAP && hasAce)) {
    hasAce = false;
    newTotal -= 10;
  } else if (newCard.value === 11 && total <= 10) {
    hasAce = true;
  }

  return { newTotal, newCards, hasAce };
}
