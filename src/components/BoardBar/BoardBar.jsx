import React from "react";
import { useTranslation } from "react-i18next";

import "./BoardBar.scss";

const BoardBar = () => {
  const { t } = useTranslation();
  return (
    <>
      <nav className="navbar-board">{t("text.boardTitle")}</nav>
    </>
  );
};

export default React.memo(BoardBar);
