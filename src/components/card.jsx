import React, { Component } from "react";
import "./card.css";

class Card extends Component {
  state = { faceUp: false };

  render() {
    const { data: card, owner, gameOver, indexInHand } = this.props;

    const faceId =
      typeof card.face === "string" ? card.face.charAt(0) : card.face;
    const suitId = card.suit.charAt(0).toUpperCase();

    const cardDisplayUrl =
      owner === "dealer" && gameOver === "" && indexInHand !== 0
        ? `${window.location.origin}/img/cards/red_back.png`
        : `${window.location.origin}/img/cards/${faceId}${suitId}.png`;

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
