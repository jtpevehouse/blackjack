//Checks to see if the dealer or player has won or if the game is a draw
export function checkIfGameOver(
  dealerTotal,
  playerTotal,
  winner,
  playerStayed,
  getDealerCard
) {
  //Check to see if handleStay set the winner property
  if (winner !== "") {
    return winner;
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
  if (playerStayed && dealerTotal > playerTotal) {
    return "Dealer";
  } else if (playerStayed && dealerTotal < playerTotal) {
    getDealerCard();
  }
}

//Check to see if the player choosing to stay has ended the game or
//if the dealer should draw again
export function handleStay(dealerTotal, playerTotal, getDealerCard) {
  if (dealerTotal > playerTotal) {
    return { winner: "Dealer" };
  }

  if (
    (dealerTotal < playerTotal && dealerTotal <= 16) ||
    (dealerTotal === playerTotal && dealerTotal <= 16)
  ) {
    getDealerCard();
    return { playerStayed: true };
  }

  if (dealerTotal === playerTotal && dealerTotal >= 16) {
    return { winner: "draw" };
  }

  if (dealerTotal < playerTotal && dealerTotal >= 16) {
    return { winner: "Player" };
  }
}
