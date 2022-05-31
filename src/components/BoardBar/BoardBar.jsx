import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Form } from "react-bootstrap";
import setting from "../../images/setting.svg";
import history from "../../images/histories2.svg";
import useAuth from "../../libs/hook/useAuth";
import { addNewMemberApi, updateBoardHistory } from "../../libs/apis/board.api";
import { messageAddNewMemberStatus } from "../../utils/historyMapping";

import "./BoardBar.scss";

const BoardBar = (props) => {
  const { boardInfo } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupHistory, setShowPopupHistory] = useState(false);
  const [showEmailSubscription, setShowEmailSubscription] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const { t } = useTranslation();
  const auth = useAuth();

  const handleClosePopup = () => setShowPopup(false);
  const handleShowPopup = () => setShowPopup(true);

  const handleClosePopupHistory = () => setShowPopupHistory(false);
  const handleShowPopupHistory = () => setShowPopupHistory(true);

  const handleOnInvite = () => {
    console.log({ email: inviteEmail }, boardInfo._id);
    if (inviteEmail === "") {
      alert(`${t("text.validEmail")}`);
    } else {
      const sendInviteEmail = addNewMemberApi(
        { email: inviteEmail },
        boardInfo._id
      );
      const message = messageAddNewMemberStatus(
        auth.user.fullname,
        inviteEmail
      );
      updateBoardHistory(boardInfo._id, message).then((data) => {
        console.log(data);
      });
      console.log(sendInviteEmail);
    }
  };
  return (
    <>
      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header closeButton>
          <Modal.Title>{t("text.setting")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrap-setting-popup">
            <div className="wrap-board-label">
              {t("text.boardName", { boardName: boardInfo.title })}
            </div>
            <div className="wrap-board-label">
              {t("text.author", { author: auth.user.fullname })}
            </div>
            <div className="wrap-row">
              <div className="circle-button">{t("text.boardDetail")}</div>
              <div className="circle-button">{t("text.deleteBoard")}</div>
              <div
                className="circle-button"
                onClick={() => setShowEmailSubscription(!showEmailSubscription)}
              >
                {t("text.addPeople")}
              </div>
            </div>
            <div className="wrap-row">
              <div className="circle-button">{t("text.chart")}</div>
              <div className="circle-button">{t("text.activities")}</div>
            </div>
            {/* <div className="wrap-row">
            </div> */}
          </div>
        </Modal.Body>
        {showEmailSubscription && (
          <Modal.Footer>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email"
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  {t("text.emailInvitation")}
                </Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handleOnInvite}>
                {t("text.acceptButton")}
              </Button>
            </Form>
            {/* <Button variant="secondary" onClick={handleClosePopup}>
            {t("text.closeButton")}
          </Button>
          <Button variant="primary" onClick={handleClosePopup}>
            {t("text.acceptButton")}
          </Button> */}
          </Modal.Footer>
        )}
      </Modal>
      <Modal show={showPopupHistory} onHide={handleClosePopupHistory}>
        <Modal.Header closeButton>
          <Modal.Title>{t("text.histories")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrap-payment-alert">
            <div>{t("text.paymentFail")}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePopupHistory}>
            {t("text.closeButton")}
          </Button>
          <Button variant="primary" onClick={handleClosePopupHistory}>
            {t("text.acceptButton")}
          </Button>
        </Modal.Footer>
      </Modal>
      <nav className="navbar-board">
        <div className="board-title-label">
          {boardInfo.title || t("text.boardTitle")}
        </div>
        <div className="board-bar-icon">
          <div className="img-icon-setting" onClick={handleShowPopup}>
            <img src={setting} width="24px" height="24px" alt="setting" />
          </div>
          <div className="img-icon-setting" onClick={handleShowPopupHistory}>
            <img src={history} width="24px" height="24px" alt="history" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default React.memo(BoardBar);
