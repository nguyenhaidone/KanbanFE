import React from "react";
import { useTranslation } from "react-i18next";
import { ButtonGroup } from "react-bootstrap";
import ChangeLanguageButton from "components/ChangeLanguageButton/ChangeLanguagueButton";
import "./AppBar.scss";
import Avatar from "react-avatar";

const AppBar = () => {
  const { t, i18n } = useTranslation();

  const name = "Nguyễn Hải Đăng";

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="navbar-app">
      <h1 className="navbar-logo">Kanban</h1>
      <div className="info">
        <h1>{t("text.helloFriend", { name: name })}</h1>
      </div>
      <div className="group-info">
        <div className="wrap-icon">
          <i className="fa fa-bell"></i>
        </div>
        <Avatar name={name} round={true} size="36" />
        <ChangeLanguageButton />
      </div>
    </div>
  );
};

export default React.memo(AppBar);
