import React from "react";
import { useTranslation } from "react-i18next";

import "./BoardBar.scss";

const BoardBar = (props) => {
  const { boardInfo } = props;
  const { t } = useTranslation();
  return (
    <>
      <nav className="navbar-board">{boardInfo.title || t("text.boardTitle")}</nav>
    </>
  );
};

export default React.memo(BoardBar);
