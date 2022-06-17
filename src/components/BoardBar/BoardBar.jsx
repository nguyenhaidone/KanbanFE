import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import setting from "../../images/setting.svg";
import history from "../../images/histories2.svg";
import Avatar from "react-avatar";
import useAuth from "../../libs/hook/useAuth";
import {
  addNewMemberApi,
  updateBoardHistory,
  updateBoardApi,
  removeCurrentUserApi,
} from "../../libs/apis/board.api";
import { messageAddNewMemberStatus } from "../../utils/historyMapping";
import ItemHistory from "../ItemHistory/ItemHistory";

import "./BoardBar.scss";

const BoardBar = (props) => {
  const { boardInfo } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmLeaveBoard, setShowConfirmLeaveBoard] = useState(false);
  const [showConfirmDeleteBoard, setShowConfirmDeleteBoard] = useState(false);
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
        window.location.reload();
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
  const handleOnDeleteBoard = () => {
    updateBoardApi(boardInfo._id, { _destroy: true }).then(() => {
      navigate("/homepage");
    });
  };
  // console.log(boardMessage);
  const popover = (
    <Popover id="popover-basic" style={{ height: "300px", overflowY: "auto" }}>
      <Popover.Header as="h3">{t("text.listMembers")}</Popover.Header>
      <Popover.Body>
        {/* And here's some <strong>amazing</strong> content. It's very engaging.
        right? */}
        {boardInfo.members &&
          boardInfo.members.map((member, index) => (
            <div className="member-option" key={index}>
              <div className="member-info">
                <Avatar name={member} round={true} size="24" />
                <div className="member-email">{member}</div>
              </div>
            </div>
          ))}
      </Popover.Body>
    </Popover>
  );
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
              {boardInfo.creater && boardInfo.creater === auth.user._id && (
                <div
                  className="circle-button"
                  onClick={() =>
                    setShowConfirmDeleteBoard(!showConfirmDeleteBoard)
                  }
                >
                  {t("text.deleteBoard")}
                </div>
              )}
              {boardInfo.creater && boardInfo.creater === auth.user._id && (
                <div
                  className="circle-button"
                  onClick={() =>
                    setShowEmailSubscription(!showEmailSubscription)
                  }
                >
                  {t("text.addPeople")}
                </div>
              )}
            </div>
            <div className="wrap-row">
              <div
                className="circle-button"
                onClick={() => navigate(`/board/details/${boardInfo._id}`)}
              >
                {t("text.chart")}
              </div>
              <div className="circle-button" onClick={handleShowPopupHistory}>
                {t("text.activities")}
              </div>
              {boardInfo.creater && boardInfo.creater !== auth.user._id && (
                <div
                  className="circle-button"
                  onClick={() =>
                    setShowConfirmLeaveBoard(!showEmailSubscription)
                  }
                >
                  {t("text.leave")}
                </div>
              )}
            </div>
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

              <Button
                variant="primary"
                // type="submit"
                onClick={handleOnInvite}
              >
                {t("text.acceptButton")}
              </Button>
            </Form>
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

              <Button variant="primary" onClick={handleOnLeaveBoard}>
                {t("text.acceptButton")}
              </Button>
            </Form>
          </Modal.Footer>
        )}
        {showConfirmDeleteBoard && (
          <Modal.Footer>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Text className="text-muted">
                  {t("text.areYouSureDeleteBoard")}
                </Form.Text>
              </Form.Group>

              <Button variant="primary" onClick={handleOnDeleteBoard}>
                {t("text.acceptButton")}
              </Button>
            </Form>
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
        <div className="wrap-list-member-joined">
          <span className="member-label">{t("text.listMembers")}: </span>
          {boardInfo.members && boardInfo.members.length < 3 ? (
            boardInfo.members.map((item, index) => (
              <div className="icon-member" key={index}>
                <Avatar name={item} round={true} size="32" />
              </div>
            ))
          ) : (
            <>
              <div className="icon-member">
                <Avatar
                  name={boardInfo.members ? boardInfo.members[0] : "member"}
                  round={true}
                  size="32"
                />
              </div>
              <div className="icon-member">
                <Avatar
                  name={boardInfo.members ? boardInfo.members[1] : "member"}
                  round={true}
                  size="32"
                />
              </div>
              <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={popover}
              >
                <div className="icon-member">
                  <Avatar
                    name={`+${
                      boardInfo.members ? boardInfo.members.length - 2 : 0
                    }`}
                    round={true}
                    size="32"
                  />
                </div>
              </OverlayTrigger>
            </>
          )}
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
