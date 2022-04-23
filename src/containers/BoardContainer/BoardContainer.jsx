import React, { useState } from "react";
import "./BoardContainer.scss";
import ChangeLanguageButton from "components/ChangeLanguageButton/ChangeLanguagueButton";
import AppBar from "components/AppBar/AppBar";
import BoardBar from "components/BoardBar/BoardBar";
import BoardContent from "components/BoardContent/BoardContent";
import PopupCardDetail from "components/PopupCardDetail/PopupCardDetail";

const BoardContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSetOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="wrap-board-container">
      {isOpen && <PopupCardDetail handlePopupClose={handleSetOpen} />}
      <AppBar />
      <BoardBar />
      <BoardContent handleOpenPopup={handleSetOpen} />
    </div>
  );
};

export default React.memo(BoardContainer);
