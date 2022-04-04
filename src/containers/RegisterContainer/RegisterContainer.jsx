import React from "react";
import "./RegisterContainer.scss";
import ChangeLanguageButton from "components/ChangeLanguageButton/ChangeLanguagueButton";
import Register from "components/Register/Register";

const RegisterContainer = () => {
  return (
    <div className="wrap-register">
      <ChangeLanguageButton />
      <div className="wrap-container">
        <Register />
      </div>
    </div>
  );
};

export default React.memo(RegisterContainer);
