import React from "react";
import "./BoardItems.scss";

const BoardItems = (props) => {
  const { img, title } = props;

  const handleOnClick = () => {};
  const isImage = (boardBgColor) => {
    const spread = [...`${boardBgColor}`];
    return spread[0] !== "#" ? true : false;
  };
  return (
    <div className="wrap-items" onClick={handleOnClick}>
      <img
        src={
          img && isImage(img)
            ? img
            : `https://picsum.photos/250/110?random=${Math.random()}`
        }
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
