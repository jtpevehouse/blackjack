import React, { Component } from "react";

class GameOver extends Component {
  render() {
    const {
      playerTotal,
      dealerTotal,
      playerCards,
      dealerCards,
      winCondition,
    } = this.props;

    return (
      <div className="container">
        <h1>Game Over!</h1>
        {winCondition === "draw" ? (
          <h2>It was a draw!</h2>
        ) : (
          <h2>{winCondition} won!</h2>
        )}
        <div className="row">
          <div className="col">
            <h3>Player had: {playerTotal}</h3>
            <ul>
              {playerCards.map((card) => (
                <li key={card.index}>
                  {card.face} of {card.suit}
                </li>
              ))}
            </ul>
          </div>
          <div className="col">
            <h3>Dealer had: {dealerTotal}</h3>
            <ul>
              {dealerCards.map((card) => (
                <li key={card.index}>
                  {card.face} of {card.suit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default GameOver;
