import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ButtonGroup } from "react-bootstrap";
import ChangeLanguageButton from "components/ChangeLanguageButton/ChangeLanguagueButton";
import "./AppBar.scss";
import Avatar from "react-avatar";
import useAuth from "../../libs/hook/useAuth";

const AppBar = () => {
  const auth = useAuth();
  const { t, i18n } = useTranslation();

  let name = auth.user.fullname !== "" ? auth.user.fullname : auth.user.email;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="navbar-app">
      <h1 className="navbar-logo">Kanban</h1>
      <div className="info">
        <h1>
          {t("text.helloFriend", {
            name: name,
          })}
        </h1>
      </div>
      <div className="group-info">
        <div className="wrap-icon">
          <i className="fa fa-bell"></i>
        </div>
        <Avatar
          name={auth.user.avatar !== "" ? auth.user.avatar : name}
          round={true}
          size="36"
        />
        <ChangeLanguageButton />
      </div>
    </div>
  );
};

export default React.memo(AppBar);
