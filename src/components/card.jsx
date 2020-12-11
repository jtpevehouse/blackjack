import React, { Component } from "react";
import "./card.css";

class Card extends Component {
  state = { faceUp: false };

  render() {
    const {
      data: card,
      owner,
      gameOver,
      indexInHand,
      totalCardCount,
    } = this.props;

    const faceId =
      typeof card.face === "string" ? card.face.charAt(0) : card.face;
    const suitId = card.suit.charAt(0).toUpperCase();

    let cardDisplayUrl = `${window.location.origin}/img/cards/${faceId}${suitId}.png`;

    if (
      owner === "Dealer" &&
      totalCardCount > 1 &&
      indexInHand !== totalCardCount - 1 &&
      gameOver === ""
    ) {
      cardDisplayUrl = `${window.location.origin}/img/cards/red_back.png`;
    }

    return (
      <div className="playing-card">
        <img
          className="playing-card-image"
          src={cardDisplayUrl}
          alt={`${card.face} of ${card.suit}`}
        />
      </div>
    );
  }
}

export default Card;
