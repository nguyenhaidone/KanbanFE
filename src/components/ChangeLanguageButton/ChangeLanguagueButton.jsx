import React from "react";
import { useTranslation } from "react-i18next";
import { ButtonGroup } from "react-bootstrap";
import "./ChangeLanguageButton.scss";

const ChangeLanguageButton = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ButtonGroup aria-label="Basic example">
      <button
        onClick={() => {
          changeLanguage("vn");
        }}
        style={{
          backgroundColor: `${i18n.language === "vn" ? "#957DAD" : "#ffffff"}`,
          color: `${i18n.language === "en" ? "#957DAD" : "#ffffff"}`,
        }}
        className="vn-btn"
      >
        {t("text.vn")}
      </button>
      <button
        onClick={() => {
          changeLanguage("en");
        }}
        style={{
          backgroundColor: `${i18n.language === "en" ? "#957DAD" : "#ffffff"}`,
          color: `${i18n.language === "en" ? "#ffffff" : "#957DAD"}`,
        }}
        className="en-btn"
      >
        {t("text.en")}
      </button>
    </ButtonGroup>
  );
};

export default React.memo(ChangeLanguageButton);
