import React from "react";

const Card = (props) => {
  const { data: card } = props;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {card.face} of {card.suit}
        </div>
      </div>
    </div>
  );
};

export default Card;
