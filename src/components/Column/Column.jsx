import React, { useState, useEffect, useRef } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { useTranslation } from "react-i18next";
import Card from "components/Card/Card";
import { cloneDeep } from "lodash";
import { mapOrder } from "utils/ultis";
import { Dropdown, Form, Button } from "react-bootstrap";
import ConfirmModal from "components/Common/ConfirmModal";
import { MODAL_ACTION_CONFIRM } from "utils/constants";
import { saveContent, selectAllInlineText } from "utils/contentEditable";
import { createNewCardlApi } from "../../libs/apis/card.api";
import { updateColumnlApi } from "../../libs/apis/column.api";

import "./Column.scss";

const Column = (props) => {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "_id");
  const { t } = useTranslation();
  const [isShowConfirmPopup, setIsShowConfirmPopup] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const newCardTextareaRef = useRef(null);
  const [newCardTitle, setNewCardTitle] = useState("");

  // const onCardDrop = (card) => {
  //   console.log(card);
  // };

  const [isCreateInputOpen, setIsCreateInputOpen] = useState(false);
  const handleToggleInput = () => {
    setIsCreateInputOpen(!isCreateInputOpen);
  };

  const handleOnCreate = () => {
    if (!newCardTitle) {
      newCardTextareaRef.current.focus();
      return;
    }

    const newCardToAdd = {
      // id: Math.random().toString(36).substr(2, 5),
      boardId: column.boardId,
      columnId: column._id,
      title: newCardTitle.trim(),
    };
    createNewCardlApi(newCardToAdd).then((card) => {
      let newColumns = cloneDeep(column);

      newColumns.cards.push(card);
      newColumns.cardOrder.push(card._id);

      onUpdateColumn(newColumns);
      setNewCardTitle("");
      setIsCreateInputOpen(false);
    });
  };

  const handleShowConfirmation = () =>
    setIsShowConfirmPopup(!isShowConfirmPopup);

  const handleActionConfirmPopup = (type) => {
    console.log(type);
    if (type === MODAL_ACTION_CONFIRM) {
      /**
       * *something stuff here
       */
      const newColumn = {
        ...column,
        _destroy: true,
      };
      updateColumnlApi(newColumn, newColumn._id).then((updatedCol) => {
        onUpdateColumn(updatedCol);
      });
    }
    setIsShowConfirmPopup(!isShowConfirmPopup);
  };

  const handleColumnTitleChange = (e) => {
    setColumnTitle(e.target.value);
  };

  const handleColumnTitleBlur = (e) => {
    if (columnTitle !== column.title) {
      const newColumn = {
        ...column,
        title: columnTitle,
      };
      updateColumnlApi(newColumn, newColumn._id).then((updatedCol) => {
        updatedCol.cards = newColumn.cards;
        onUpdateColumn(updatedCol);
      });
    }
  };

  const onChangeInput = (e) => {
    setNewCardTitle(e.target.value);
  };

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  useEffect(() => {
    if (newCardTextareaRef && newCardTextareaRef.current) {
      newCardTextareaRef.current.focus();
      newCardTextareaRef.current.select();
    }
  }, [isCreateInputOpen]);

  return (
    <>
      <div className="columns">
        <header className="column-drag-handle">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Enter column title..."
            className="trello-content-editable"
            value={columnTitle}
            onBlur={handleColumnTitleBlur}
            spellCheck="false"
            onClick={selectAllInlineText}
            onChange={handleColumnTitleChange}
            onKeyDown={saveContent}
            onMouseDown={(e) => e.preventDefault()}
          />
          <div className="column-dropdown-actions">
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                size="sm"
                className="dropdown-btn"
              />

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShowConfirmation}>
                  {t("text.removeCard")}
                </Dropdown.Item>
                <Dropdown.Item>{t("text.moveAll")}</Dropdown.Item>
                <Dropdown.Item>{t("text.more")}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>
        <div className="card-list">
          <Container
            groupName="col"
            // onDragStart={(e) => console.log("drag started", e)}
            // onDragEnd={(e) => console.log("drag end", e)}
            onDrop={(dropResult) => onCardDrop(column._id, dropResult)}
            getChildPayload={(index) => cards[index]}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            // onDragEnter={() => {
            //   console.log("drag enter:", column._id);
            // }}
            // onDragLeave={() => {
            //   console.log("drag leave:", column._id);
            // }}
            // onDropReady={(p) => console.log("Drop ready: ", p)}
            dropPlaceholder={{
              animationDuration: 300,
              showOnTop: true,
              className: "column-drop-preview",
            }}
            dropPlaceholderAnimationDuration={200}
          >
            {cards.map((card, index) => (
              <Draggable key={index}>
                <Card card={card} />
              </Draggable>
            ))}
          </Container>
          {isCreateInputOpen && (
            <div className="add-new-card">
              <Form.Control
                size="sm"
                as="textarea"
                rows="3 "
                placeholder={t("text.enterNewCardTitle")}
                className="textarea-enter-new-card"
                ref={newCardTextareaRef}
                value={newCardTitle}
                onChange={onChangeInput}
                onKeyDown={(e) => e.key === "Enter" && handleOnCreate()}
              />
              <Button variant="success" size="sm" onClick={handleOnCreate}>
                {t("text.addNewCard")}
              </Button>
              <span className="cancel-add-new" onClick={handleToggleInput}>
                <i className="fa fa-close icon"></i>
              </span>
            </div>
          )}
        </div>
        <footer>
          {!isCreateInputOpen && (
            <div className="footer-actions" onClick={handleToggleInput}>
              <i className="fa fa-plus icon"></i>
              {t("text.addAnotherCard")}
            </div>
          )}
        </footer>
        {isShowConfirmPopup && (
          <ConfirmModal
            show={isShowConfirmPopup}
            onAction={handleActionConfirmPopup}
          />
        )}
      </div>
    </>
  );
};

export default React.memo(Column);
