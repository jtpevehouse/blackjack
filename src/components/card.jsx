import React from "react";
import "./card.css";

const Card = ({ data: card }) => {
  const faceId =
    typeof card.face === "string" ? card.face.charAt(0) : card.face;
  const suitId = card.suit.charAt(0).toUpperCase();

  const cardUrl = `/img/cards/${faceId}${suitId}.png`;

  return (
    <img
      className="playing-card"
      src={window.location.origin + cardUrl}
      alt={`${card.face} of ${card.suit}`}
    />
  );
};

export default Card;
