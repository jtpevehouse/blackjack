//Checks to see if the dealer or player has won or if the game is a draw
export function checkIfGameOver(dealerTotal, playerTotal, playerStanding) {
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

  //Check to see if player stood and dealer is up
  if (playerStanding && dealerTotal > playerTotal) {
    return "Dealer";
  }

  //Check to see if the player won because the dealer was forced to stand
  if (playerStanding && dealerTotal >= 16 && playerTotal > dealerTotal) {
    return "Player";
  }

  //Check to see if the player and dealer stood to a draw
  if (playerStanding && dealerTotal >= 16 && playerTotal === dealerTotal) {
    return "draw";
  }

  return "";
}
