import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import setting from "../../images/setting.svg";
import history from "../../images/histories2.svg";
import useAuth from "../../libs/hook/useAuth";
import {
  addNewMemberApi,
  updateBoardHistory,
  removeCurrentUserApi,
} from "../../libs/apis/board.api";
import { messageAddNewMemberStatus } from "../../utils/historyMapping";
import ItemHistory from "../ItemHistory/ItemHistory";

import "./BoardBar.scss";

const BoardBar = (props) => {
  const { boardInfo } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmLeaveBoard, setShowConfirmLeaveBoard] = useState(false);
  const [showPopupHistory, setShowPopupHistory] = useState(false);
  const [showEmailSubscription, setShowEmailSubscription] = useState(false);
  const navigate = useNavigate();
  const [inviteEmail, setInviteEmail] = useState("");
  const { t } = useTranslation();
  const auth = useAuth();
  const boardMessage =
    boardInfo.message &&
    boardInfo.message.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

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
  const handleOnLeaveBoard = () => {
    removeCurrentUserApi(boardInfo._id)
      .then((data) => {
        data ? navigate("/homepage") : alert("Fail");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(boardMessage);
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
              <div
                className="circle-button"
                onClick={() => navigate(`/board/details/${boardInfo._id}`)}
              >
                {t("text.boardDetail")}
              </div>
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
              <div
                className="circle-button"
                onClick={() => setShowConfirmLeaveBoard(!showEmailSubscription)}
              >
                {t("text.leave")}
              </div>
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
        {showConfirmLeaveBoard && (
          <Modal.Footer>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Text className="text-muted">
                  {t("text.ifYouLeaveThisBoard")}
                </Form.Text>
              </Form.Group>

              <Button
                variant="primary"
                onClick={handleOnLeaveBoard}
              >
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
          <div className="wrap-list-history">
            {/* <div>{t("text.paymentFail")}</div> */}
            {boardMessage &&
              boardMessage.map((item) => <ItemHistory {...item} />)}
          </div>
        </Modal.Body>
      </Modal>
      <nav className="navbar-board">
        <div
          className="board-title-label"
          onClick={() => navigate(`/board/${boardInfo._id}`)}
        >
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
