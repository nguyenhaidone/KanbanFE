import React from "react";

import "./Card.scss";

const Card = (props) => {
  const { card, handleOpenPopup } = props;
  const handleOnOpen = () => {
    handleOpenPopup();
  };
  return (
    <div onClick={handleOnOpen}>
      <div className="card-item">
        {card.cover && <img src={card.cover} alt="cover" />}
        {card.title}
      </div>
    </div>
  );
};

export default React.memo(Card);
