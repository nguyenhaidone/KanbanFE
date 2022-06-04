import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./ItemHistory.scss";

const ItemHistory = (data) => {
  const {
    username,
    board,
    card,
    column,
    member,
    messageInfo,
    timestamp,
    status,
    fullname,
    createdOrderAt,
  } = data;
  const { t } = useTranslation();
  let message;

  if (messageInfo) {
    switch (messageInfo) {
      case "messageUpdateCreateBoard":
        message = t("text.messageUpdateCreateBoard", {
          name: username,
          board: board,
        });
        break;
      case "messageUpdateBoardInfo":
        message = t("text.messageUpdateBoardInfo", {
          name: username,
          board: board,
        });
        break;
      case "messageUpdateColumnOrder":
        message = t("text.messageUpdateColumnOrder", {
          name: username,
          column: column,
        });
        break;
      case "messageUpdateCardStatus":
        message = t("text.messageUpdateCardStatus", {
          name: username,
          board: board,
          card: card,
        });
        break;
      case "messageAddNewMemberStatus":
        message = t("text.messageAddNewMemberStatus", {
          name: username,
          member: member,
        });
        break;
      case "messageDeleteMember":
        message = t("text.messageDeleteMember", {
          name: username,
          member: member,
        });
        break;
      case "messageDeleteColumn":
        message = t("text.messageDeleteColumn", {
          name: username,
          column: column,
        });
        break;
      case "messageCreateColumn":
        message = t("text.messageCreateColumn", {
          name: username,
          column: column,
        });
        break;
      case "messageCreateCard":
        message = t("text.messageCreateCard", {
          name: username,
          card: card,
        });
        break;

      default:
        break;
    }
  } else {
    switch (status) {
      case "COMPLETED":
        message = t("text.orderSuccess", {
          name: fullname,
        });
        break;

      default:
        break;
    }
  }

  return (
    <div className="item-history">
      <div className="first-cell">
        <span data-i18n="[html]content.body">{message}</span>
      </div>
      <div className="second-cell">
        <span>{timestamp || createdOrderAt}</span>
      </div>
    </div>
  );
};

export default React.memo(ItemHistory);
