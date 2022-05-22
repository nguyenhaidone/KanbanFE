import React from "react";
import "./BoardItems.scss";

const BoardItems = (props) => {
  const { id, img, title, index } = props;

  const handleOnClick = (id) => {};
  return (
    <div className="wrap-items" onClick={handleOnClick}>
      <img
        src={img ? img : `https://picsum.photos/250/110?random=${Math.random()}`}
        alt="board-item"
      />
      <div className="wrap-title">
        <span>
          {title ? title : "https://picsum.photos/seed/picsum/600/800"}
        </span>
      </div>
    </div>
  );
};

export default React.memo(BoardItems);
