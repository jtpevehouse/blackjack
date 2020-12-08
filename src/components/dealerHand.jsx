import React, { Component } from "react";
import Card from "./card";

class Hand extends Component {
  render() {
    const { cards } = this.props;

    if (cards.length !== 0) {
      return (
        <div>
          {cards.map((card) => (
            <Card key={card.index} data={card} />
          ))}
        </div>
      );
    } else {
      return <p>No cards in hand</p>;
    }
  }
}

export default Hand;
