import React, { Component } from "react";
import Card from "./card";

class PlayerHand extends Component {
  render() {
    const { cards } = this.props;

    return (
      <div>
        {cards.map((card) => (
          <Card key={card.index} data={card} />
        ))}
      </div>
    );
  }
}

export default PlayerHand;
