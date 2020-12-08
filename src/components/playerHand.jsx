import React, { Component } from "react";
import Card from "./card";

class PlayerHand extends Component {
  render() {
    const { cards } = this.props;
    const cardList = cards.map((card) => <Card key={card.index} data={card} />);

    if (cards.length !== 0) {
      return <div>{cardList}</div>;
    } else {
      return <p>No cards in hand</p>;
    }
  }
}

export default PlayerHand;
