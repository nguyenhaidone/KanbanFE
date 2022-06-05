import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LIST_COLOR_THEME } from "../../utils/constants";
import "./BoardDetail.scss";
import Avatar from "react-avatar";
import { storage } from "../../firebase/index";
import useAuth from "../../libs/hook/useAuth";
import { Container, Modal, Form, Button } from "react-bootstrap";
import {
  updateBoardApi,
  updateBoardHistory,
  removeMemberByCreaterApi,
} from "../../libs/apis/board.api";
import { messageUpdateBoardInfo } from "../../utils/historyMapping";

const BoardDetail = (props) => {
  const { boardInfo } = props;
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [boardTitle, setBoardTitle] = useState(boardInfo.title);
  const [backgroundColor, setBackgroundColor] = useState(null);
  const [imageBackground, setImageBackground] = useState(null);
  const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: "Thiếu tên bảng",
    heading: "Yêu cầu nhập tên bảng",
    variant: "danger",
  });
  const [alertShow, setAlertShow] = useState(false);
  const [listMembers, setListMembers] = useState([]);
  const [memberRemoved, setMemberRemoved] = useState("");

  const isImage = (boardBgColor) => {
    const spread = [...`${boardBgColor}`];
    return spread[0] !== "#" ? true : false;
  };

  const handleOnUpload = () => {
    console.log(imageBackground);
    if (!boardTitle) {
      setAlertMessage({
        message: "Thiếu tên bảng",
        heading: "Yêu cầu nhập tên bảng",
        variant: "danger",
      });
      setAlertShow(true);
    } else if (imageBackground) {
      const uploadTask = storage
        .ref(`images/${imageBackground.name}`)
        .put(imageBackground);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(imageBackground.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              setImageBackground(url);
              if (boardTitle.length === 0) {
                setAlertMessage({
                  message: "Thiếu tên bảng",
                  heading: "Yêu cầu nhập tên bảng",
                  variant: "danger",
                });
                setAlertShow(true);
              } else {
                updateBoardApi(boardInfo._id, {
                  boardBackgroundColor: url,
                  title: boardTitle,
                }).then((response) => {
                  console.log(response);
                  setAlertMessage({
                    message: "Thành công",
                    heading: "Cập nhật bảng thành công",
                  });
                  setAlertShow(true);
                });
              }
              const message = messageUpdateBoardInfo(
                auth.user.fullname,
                boardInfo.title
              );
              updateBoardHistory(boardInfo._id, message);
            });
        }
      );
    } else {
      updateBoardApi(boardInfo._id, {
        boardBackgroundColor: backgroundColor,
        title: boardTitle,
      }).then((response) => {
        console.log(response);
        setAlertMessage({
          message: "Thành công",
          heading: "Cập nhật bảng thành công",
        });
        setAlertShow(true);
      });
      const message = messageUpdateBoardInfo(
        auth.user.fullname,
        boardInfo.title
      );
      updateBoardHistory(boardInfo._id, message);
    }
  };

  const handleOnChangeImg = (e) => {
    if (e.target.files[0]) {
      setImageBackground(e.target.files[0]);
    }
  };

  const handleOnRemoveMember = () => {
    removeMemberByCreaterApi(boardInfo._id, memberRemoved).then((data) => {
      setListMembers(data.members);
      setAlertMessage({
        message: "Xoá thành viên thành công",
        heading: "Xoá thành viên",
        variant: "success",
      });
      setAlertShow(true);
      handleCloseRemove();
    });
  };

  const handleCloseRemove = () => setIsRemovePopupOpen(!isRemovePopupOpen);

  useEffect(() => {
    setListMembers(boardInfo.members || []);
    isImage(boardInfo.boardBackgroundColor || "")
      ? setImageBackground(boardInfo.boardBackgroundColor)
      : setBackgroundColor(boardInfo.boardBackgroundColor);
  }, [listMembers]);

  return (
    <>
      <>
        <Modal show={alertShow} onHide={() => setAlertShow(!alertShow)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {alertMessage.heading || t("text.notification")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {alertMessage.message || t("text.notification")}
          </Modal.Body>
        </Modal>
      </>
      <>
        <Modal show={isRemovePopupOpen} onHide={handleCloseRemove}>
          <Modal.Header closeButton>
            <Modal.Title>{t("text.requestToLeave")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{t("text.areYouSureKichThisMember")}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseRemove}>
              {t("text.closeButton")}
            </Button>
            <Button variant="primary" onClick={handleOnRemoveMember}>
              {t("text.acceptButton")}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <div className="wrap-container-board-detail">
        <Container>
          <div className="wrap-board-detail-title">
            <Avatar
              name={boardInfo.title}
              round={true}
              size="128"
              color={boardInfo.boardBackgroundColor}
            />
            <span className="wrap-board-label">
              {boardInfo.title || "Bang"}
            </span>
          </div>
          <Form style={{ margin: "8px 0" }}>
            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  color: "#11324D",
                  fontSize: "22px",
                  fontWeight: "300",
                }}
              >
                {t("text.whatIsBoardName")}
              </Form.Label>
              <Form.Control
                style={{ width: "400px" }}
                type="boardName"
                placeholder={boardInfo.title}
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  color: "#11324D",
                  fontSize: "22px",
                  fontWeight: "300",
                }}
              >
                {t("text.colorBackground", { colorCode: backgroundColor })}
              </Form.Label>
              <div className="list-color">
                {LIST_COLOR_THEME.map((color, index) => (
                  <div
                    key={index}
                    className="color-option"
                    style={{ backgroundColor: `${color}` }}
                    value={color}
                    // onClick={handleOnColorClick}
                  ></div>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  color: "#11324D",
                  fontSize: "22px",
                  fontWeight: "300",
                }}
              >
                {t("text.chooseBackgroundImg")}
              </Form.Label>
              <div className="list-color">
                <div className="file btn">
                  {t("text.changePhoto")}
                  <input
                    type="file"
                    name="file"
                    onChange={handleOnChangeImg}
                    accept="image/*"
                  />
                </div>
              </div>
            </Form.Group>

            <Button variant="primary" onClick={handleOnUpload}>
              {t("text.acceptButton")}
            </Button>
          </Form>
          <span
            style={{
              color: "#11324D",
              fontSize: "22px",
              fontWeight: "300",
            }}
          >
            {t("text.listMembers")}
          </span>
          <div className="wrap-list-member">
            {listMembers &&
              listMembers.map((member, index) => (
                <div className="member-option" key={index}>
                  <div className="member-info">
                    <Avatar name={member} round={true} size="32" />
                    <div className="member-email">{member}</div>
                  </div>
                  <div
                    className="member-action"
                    onClick={() => {
                      setMemberRemoved(member);
                      handleCloseRemove();
                    }}
                  >
                    {t("text.requestToLeave")}
                  </div>
                </div>
              ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default React.memo(BoardDetail);
