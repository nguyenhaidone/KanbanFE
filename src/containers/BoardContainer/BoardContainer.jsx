import React, { useState, useEffect } from "react";
import "./BoardContainer.scss";
import AppBar from "components/AppBar/AppBar";
import BoardBar from "components/BoardBar/BoardBar";
import BoardContent from "components/BoardContent/BoardContent";
// import PopupCardDetail from "components/PopupCardDetail/PopupCardDetail";
import { boardDetailApi } from "../../libs/apis/board.api";

const BoardContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  let url = window.location.href;
  const boardId = url.substring(url.lastIndexOf("/") + 1);
  const [board, setBoard] = useState({});
  const handleSetOpen = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    boardDetailApi(boardId).then((board) => {
      if (board) {
        setBoard(board);
      }
    });
  }, []);
  return (
    // <div className="wrap-board-container">
    <>
      {isOpen && <></>}
      <AppBar />
      <BoardBar boardInfo={board} />
      <BoardContent handleOpenPopup={handleSetOpen} />
    </>
    // </div>
  );
};

export default React.memo(BoardContainer);
