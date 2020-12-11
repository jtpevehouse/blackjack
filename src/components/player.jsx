import React, { Component } from "react";
import Card from "./card";
import "./player.css";

class Player extends Component {
  render() {
    const { cards, owner, total, winner } = this.props;

    const playerHeader =
      owner === "Dealer" && winner === "" ? owner : `${owner}: ${total}`;

    return (
      <div className="player">
        <h2>{playerHeader}</h2>
        <div className="cards-in-hand">
          {cards.map((card, indexInHand) => (
            <Card
              key={card.index}
              data={card}
              owner={owner}
              winner={winner}
              indexInHand={indexInHand}
              totalCardCount={cards.length}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Player;
