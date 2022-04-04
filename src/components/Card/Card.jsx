import React from "react";

import "./Card.scss";

const Card = (props) => {
  const { card } = props;
  return (
    <>
      <div className="card-item">
        {card.cover && <img
          src={card.cover}
          alt="cover"
        />}
        {card.title}
      </div>
    </>
  );
};

export default React.memo(Card);
