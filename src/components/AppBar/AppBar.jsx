import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import ChangeLanguageButton from "components/ChangeLanguageButton/ChangeLanguagueButton";
import "./AppBar.scss";
import Avatar from "react-avatar";
import { removeToken } from "../../utils/localStorageService";
import useAuth from "../../libs/hook/useAuth";

const AppBar = () => {
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const [showDetail, setShowDetail] = useState(false);
  const navigate = useNavigate();

  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);

  let name = auth.user.fullname !== "" ? auth.user.fullname : auth.user.email;

  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // };

  const handleOnUpgradeClick = () => {
    navigate("/payment-plan");
  };

  const handleOnLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <>
      <Modal show={showDetail} onHide={handleCloseDetail}>
        <Modal.Header closeButton>
          <Modal.Title>{t("text.userInfo")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrap-user-quick-view">
            <div className="wrap-user-avatar-quick-view">
              {auth.user.avatar === "" ? (
                <Avatar
                  name={name}
                  round={true}
                  size="64"
                  onClick={handleShowDetail}
                />
              ) : (
                <img src={auth.user.avatar} width="100%" alt="giaodien" />
              )}
            </div>
            <div className="wrap-user-name-quick-view">{name}</div>
            <div
              className="wrap-user-quick-view-button"
              onClick={() => navigate("/profile")}
            >
              {t("text.userInfo")}
            </div>
            <div
              className="wrap-user-quick-view-button"
              onClick={() => navigate("/payment-plan")}
            >
              {t("text.upgradeAccount")}
            </div>
            <div className="wrap-user-quick-view-button">
              {t("text.setting")}
            </div>
            <div
              className="wrap-user-quick-view-button"
              onClick={handleOnLogout}
            >
              {t("text.logout")}
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetail}>
            {t("text.closeButton")}
          </Button>
          <Button variant="primary" onClick={handleCloseDetail}>
            {t("text.acceptButton")}
          </Button>
        </Modal.Footer> */}
      </Modal>
      <div className="navbar-app">
        <h1 className="navbar-logo" onClick={() => navigate("/")}>
          Kanban
        </h1>
        <div className="info">
          {/* <h1>
          {t("text.helloFriend", {
            name: name,
          })}
        </h1> */}
        </div>
        <div className="group-info">
          <div className="wrap-icon">
            <i className="fa fa-bell"></i>
          </div>
          <div className="wrap-icon" onClick={handleOnUpgradeClick}>
            <i className="fa fa-diamond"></i>
          </div>
          {auth.user.avatar === "" ? (
            <Avatar
              name={name}
              round={true}
              size="64"
              onClick={handleShowDetail}
            />
          ) : (
            <img
              src={auth.user.avatar}
              width="32"
              height="32"
              style={{ borderRadius: "50%" }}
              onClick={handleShowDetail}
              alt="anhbia"
            />
          )}

          <ChangeLanguageButton />
        </div>
      </div>
    </>
  );
};

export default React.memo(AppBar);
