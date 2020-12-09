import React, { Component } from "react";
import Card from "./card";
import "./hand.css";

class Hand extends Component {
  render() {
    const { cards, owner, total, gameOver } = this.props;

    const handHeader =
      owner === "dealer" && gameOver === "" ? owner : `${owner}: ${total}`;

    return (
      <div className="hand">
        <h2>{handHeader}</h2>
        <div className="cards-in-hand">
          {cards.map((card, indexInHand) => (
            <Card
              key={card.index}
              data={card}
              owner={owner}
              gameOver={gameOver}
              indexInHand={indexInHand}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Hand;
