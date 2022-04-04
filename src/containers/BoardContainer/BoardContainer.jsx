import React from "react";
import "./BoardContainer.scss";
import ChangeLanguageButton from "components/ChangeLanguageButton/ChangeLanguagueButton";
import AppBar from "components/AppBar/AppBar";
import BoardBar from "components/BoardBar/BoardBar";
import BoardContent from "components/BoardContent/BoardContent";

const BoardContainer = () => {
  return (
    <>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </>
  );
};

export default React.memo(BoardContainer);
