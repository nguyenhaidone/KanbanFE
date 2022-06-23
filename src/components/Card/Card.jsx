import React, { useState, useEffect } from "react";
import { Modal, Dropdown, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getTimeRemaining } from "../../utils/formatDateTime";
import useAuth from "libs/hook/useAuth";
import { formatToDMY } from "../../utils/formatDateTime";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { updateCardApi } from "../../libs/apis/card.api";
import Avatar from "react-avatar";
import "./Card.scss";

const Card = (props) => {
  const { card, handleOpenPopup, board } = props;
  const { t } = useTranslation();
  const [isCardShow, setIsCardShow] = useState(false);
  const auth = useAuth();
  const [description, setDescription] = useState(card.description || "");
  const [assignee, setAssignee] = useState(card.assignee || "");
  const [deadline, setDeadline] = useState(card.deadline || new Date());
  const [dayLeft, setDayLeft] = useState({
    total: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleOnOpen = () => {
    setIsCardShow(!isCardShow);
    handleOpenPopup();
  };
  const handleSetAssignee = (email) => {
    setAssignee(email);
  };
  const handleOnUpdate = () => {
    console.log(card);
    updateCardApi(
      {
        columnId: card.columnId,
        boardId: card.boardId,
        deadline: deadline,
        assignee: assignee,
        description: description,
      },
      card._id
    ).then((data) => {
      console.log(data);
    });
  };
  useEffect(() => {
    setDayLeft(getTimeRemaining(deadline));
  }, [deadline]);
  return (
    <>
      <Modal
        show={isCardShow}
        onHide={() => {
          setIsCardShow(!isCardShow);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("text.task")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-title-label">
            <span>{card.title}</span>
          </div>
          <div className="card-creater-label">
            <span>
              {t("text.creater", {
                creater: card.creater ? card.creater : auth.user.fullname,
              })}
            </span>
            <span>
              {t("text.createdAt", {
                time: card.createdAt ? formatToDMY(card.createdAt) : new Date(),
              })}
            </span>
          </div>
          <div className="wrap-card-content">
            <div className="label-description">{t("text.description")}</div>
            <textarea
              className="title-card-detail"
              type="text"
              value={description}
              placeholder={t("text.description")}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <div className="label-description">{t("text.taskAssignee")}</div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {assignee ? assignee : t("text.taskAssignee")}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {board && board.members ? (
                  board.members.map((member) => (
                    <Dropdown.Item onClick={() => handleSetAssignee(member)}>
                      {member}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item
                    onClick={() => handleSetAssignee(auth.user.fullname)}
                  >
                    {auth.user.fullname}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <div className="label-description">{t("text.deadline")}</div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label={t("text.deadline")}
                value={deadline}
                onChange={(newValue) => {
                  setDeadline(newValue);
                }}
              />
            </LocalizationProvider>
            <div className="sub-time-left">
              {t("text.timeLeft", {
                day: dayLeft.days,
                hours: dayLeft.hours,
                minutes: dayLeft.minutes,
              })}
            </div>
          </div>
          <div className="mb-2">
            <Button variant="primary" onClick={handleOnUpdate}>
              {t("text.acceptButton")}
            </Button>{" "}
            <Button variant="secondary">{t("text.closeButton")}</Button>
          </div>
        </Modal.Body>
      </Modal>
      <div onClick={handleOnOpen}>
        <div className="card-item">
          {card.cover && <img src={card.cover} alt="cover" />}
          {card.title}
          {assignee && (
            <div className="card-assignee">
              <Avatar name={assignee} round={true} size="32" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(Card);
