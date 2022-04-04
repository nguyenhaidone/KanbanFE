import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./ListBoardItems.scss";
import { useNavigate } from "react-router-dom";
import BoardItems from "components/BoardItems/BoardItems";
import PopupCreateNew from "components/PopupCreateNew/PopupCreateNew";

const ListBoardItems = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const handleCreateNewBoard = () => {
    setIsOpen(!isOpen);
  };
  const handleOnClose = () => {
    setIsOpen(!isOpen);
  };
  const handleOnAccept = () => {
    navigate("/board");
  };
  return (
    <>
      {isOpen && (
        <PopupCreateNew
          handleOnClose={handleOnClose}
          handleOnAccept={handleOnAccept}
        />
      )}
      <div className="wrap-list">
        <div className="title">
          <span>{t("text.kanbanWorkspace")}</span>
        </div>
        <div className="list-board">
          <div className="wrap-board-items">
            <BoardItems />
          </div>
          <div className="wrap-board-items">
            <BoardItems />
          </div>
          <div className="wrap-board-items">
            <BoardItems />
          </div>
          <div className="wrap-board-items">
            <BoardItems />
          </div>
          <div className="wrap-board-items">
            <BoardItems />
          </div>
          <div className="wrap-board-items">
            <BoardItems />
          </div>
          <div className="wrap-board-items">
            <div className="add-new" onClick={handleCreateNewBoard}>
              <i className="fa fa-plus-square"></i>
              <div className="message">
                <span>{t("text.createNewBoard", { number: 9 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ListBoardItems);
