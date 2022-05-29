import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LIST_COLOR_THEME } from "../../utils/constants";
import "./PopupCreateNew.scss";
import useAuth from "../../libs/hook/useAuth";

const PopupCreateNew = ({
  handleOnClose,
  setBoardDetailCreated,
  handleOnAccept,
  description,
  title,
}) => {
  const { t } = useTranslation();
  const [boardTitle, setBoardTitle] = useState("");
  const [boardColor, setBoardColor] = useState("");
  // const [template, setTemplate] = useState(false);
  const auth = useAuth();

  const handleInputChange = (e) => {
    setBoardTitle(e.target.value);
    setBoardDetailCreated({
      title: e.target.value,
      creater: auth.user ? auth.user.email : "",
      boardBackgroundColor: boardColor,
    });
  };

  const handleOnColorClick = (event) => {
    event.preventDefault();
    const value = event.target.getAttribute("value");
    setBoardDetailCreated({
      title: boardTitle,
      creater: auth.user ? auth.user.email : "",
      boardBackgroundColor: value,
    });
    setBoardColor(value);
  };

  const handleOnClosePopup = () => {
    handleOnClose();
  };
  const handleOnAcceptPopup = () => {
    if (boardTitle.length === 0) {
      alert("Nhap dung dinh dang");
    } else {
      handleOnAccept();
    }
  };

  // useEffect(() => {
  //   if (auth.user.plan === PREMIUM_PLAN) {
  //     setTemplate(true);
  //   }
  //   console.log(auth.user.plan);
  // }, [auth]);

  return (
    <div className="wrap-popup">
      <div className="popup">
        <div className="title">
          <span>{title || t("text.createBoard")}</span>
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
          {description && (
            <p style={{ marginTop: "8px" }}>{t(`text.${description}`)}</p>
          )}
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
          <button className="close" onClick={handleOnClosePopup}>
            {t("text.closeButton")}
          </button>
          <button className="accept" onClick={handleOnAcceptPopup}>
            {t("text.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PopupCreateNew);
