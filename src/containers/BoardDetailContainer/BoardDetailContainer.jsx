import React, { useState, useEffect } from "react";
import "./BoardDetailContainer.scss";
import AppBar from "components/AppBar/AppBar";
import BoardBar from "components/BoardBar/BoardBar";
import BoardDetail from "components/BoardDetail/BoardDetail";
import { boardDetailApi } from "../../libs/apis/board.api";

const BoardDetailContainer = () => {
  let url = window.location.href;
  const boardId = url.substring(url.lastIndexOf("/") + 1);
  const [board, setBoard] = useState({});
  useEffect(() => {
    boardDetailApi(boardId).then((board) => {
      if (board) {
        setBoard(board);
      }
    });
  }, []);
  return (
    <>
      <AppBar />
      <BoardBar boardInfo={board} />
      <BoardDetail boardInfo={board} />
    </>
  );
};

export default React.memo(BoardDetailContainer);
