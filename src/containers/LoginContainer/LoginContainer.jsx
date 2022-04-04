import React from "react";
import "./LoginContainer.scss";
import ChangeLanguageButton from "components/ChangeLanguageButton/ChangeLanguagueButton";
import Login from "components/Login/Login";

const LoginContainer = () => {
  return (
    <div className="wrap-login">
      <ChangeLanguageButton />
      <div className="wrap-container">
        <Login />
      </div>
    </div>
  );
};

export default React.memo(LoginContainer);
