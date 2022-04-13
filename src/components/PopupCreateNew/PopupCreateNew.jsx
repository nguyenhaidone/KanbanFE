import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LIST_COLOR_THEME } from "../../utils/constants";
import "./PopupCreateNew.scss";

const PopupCreateNew = (props) => {
  const { t } = useTranslation();
  const [boardTitle, setBoardTitle] = useState("");
  const [boardColor, setBoardColor] = useState("");

  const handleInputChange = (e) => {
    setBoardTitle(e.target.value);
  };

  const handleOnColorClick = (event) => {
    event.preventDefault();
    const value = event.target.getAttribute("value");
    setBoardColor(value);
  };

  const handleOnClose = () => {
    props.handleOnClose();
  };
  const handleOnAccept = () => {
    boardTitle.length === 0
      ? alert("Nhap dung dinh dang")
      : props.handleOnAccept();
  };

  return (
    <div className="wrap-popup">
      <div className="popup">
        <div className="title">
          <span>{t("text.createBoard")}</span>
        </div>
        <form className="form">
          <label className="label-title">{t("text.whatIsBoardName")}</label>
          <input
            type="text"
            name="title"
            onChange={handleInputChange}
            placeholder={t("text.newBoardExample")}
            value={boardTitle}
          />
          <label className="label-title">
            {t("text.colorBackground", { colorCode: boardColor })}
          </label>
          <div className="list-color">
            {LIST_COLOR_THEME.map((color, index) => (
              <div
                key={index}
                className="color-option"
                style={{ backgroundColor: `${color}` }}
                value={color}
                onClick={handleOnColorClick}
              ></div>
            ))}
          </div>
        </form>
        <div className="group-button">
          <button className="close" onClick={handleOnClose}>
            {t("text.closeButton")}
          </button>
          <button className="accept" onClick={handleOnAccept}>
            {t("text.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PopupCreateNew);
