import React from "react";

const Card = (props) => {
  const { data: card } = props;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">{card.face}</div>
        <div className="col">{card.suit}</div>
        <div className="col">({card.value})</div>
      </div>
    </div>
  );
};

export default Card;
