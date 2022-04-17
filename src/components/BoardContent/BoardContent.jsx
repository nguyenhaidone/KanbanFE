import React, { useState, useEffect, useRef } from "react";
import Column from "components/Column/Column";
import { Container, Draggable } from "react-smooth-dnd";
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import "./BoardContent.scss";
import { isEmpty, cloneDeep } from "lodash";
import { initialData } from "actions/initialData";
import { useTranslation } from "react-i18next";
import { mapOrder } from "utils/ultis";
import { applyDrag } from "../../utils/dnd";
import { boardDetailApi, updateBoardlApi } from "../../libs/apis/board.api";
import {
  createNewColumnlApi,
  updateColumnlApi,
} from "../../libs/apis/column.api";

import { updateCardlApi } from "../../libs/apis/card.api";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [column, setColumn] = useState([]);
  const [isCreateInputOpen, setIsCreateInputOpen] = useState(false);
  const handleToggleInput = () => {
    setIsCreateInputOpen(!isCreateInputOpen);
  };
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const newColumnInputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    boardDetailApi("62431b548b415403a7495ecc").then((board) => {
      if (board) {
        setBoard(board);

        setColumn(mapOrder(board.columns, board.columnOrder, "_id"));
      }
    });
  }, []);

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus();
      newColumnInputRef.current.select();
    }
  }, [isCreateInputOpen]);

  if (isEmpty(board)) {
    return <div className="not-found">{t("text.boardNotFound")}</div>;
  }

  const onColumnDrop = (dropResult) => {
    let newColumn = cloneDeep(column);
    newColumn = applyDrag(newColumn, dropResult);

    let newBoard = cloneDeep(board);
    newBoard.columnOrder = newColumn.map((c) => c._id);
    newBoard.columns = newColumn;
    /**
     * !call api update column order
     */
    setBoard(newBoard);
    setColumn(newColumn);
    updateBoardlApi(newBoard._id, newBoard).catch((error) => {
      console.log(error);
      setBoard(board);
      setColumn(column);
    });
  };

  const onCardDrop = (columnId, dropResult) => {
    //log history when change column
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumn = cloneDeep(column);

      let curColumn = newColumn.find((c) => c._id === columnId);

      curColumn.cards = applyDrag(curColumn.cards, dropResult);
      curColumn.cardOrder = curColumn.cards.map((i) => i._id);

      setColumn(newColumn);

      if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
        //move card inside col
        //update order current col
        updateColumnlApi(curColumn, curColumn._id).catch((error) => {
          setColumn(newColumn);
        });
      } 
      else {
        //move card between 2 cols
        //update order current col and col._id of card moving
        // console.log(curColumn)
        updateColumnlApi(curColumn, curColumn._id).catch((error) => {
          setColumn(newColumn);
        });

        // console.log(dropResult);
        if (dropResult.addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload);
          currentCard.columnId = curColumn._id;
          // console.log(currentCard);
          updateCardlApi(currentCard, currentCard._id);
        }
      }
    }
  };

  const handleOnCreate = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus();
      return;
    }

    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim(),
    };

    createNewColumnlApi(newColumnToAdd).then((newCol) => {
      // console.log(newCol);
      let newColumns = [...column];
      newColumns.push(newCol);

      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map((c) => c._id);
      newBoard.columns = newColumns;
      setBoard(newBoard);
      setColumn(newColumns);
      setNewColumnTitle("");
      setIsCreateInputOpen(false);
    });
  };

  const onChangeInput = (e) => {
    setNewColumnTitle(e.target.value);
  };

  const onUpdateColumn = (newColumnToUpdate) => {
    const columnIdtoUpdate = newColumnToUpdate._id;
    let newColumn = [...column];
    const columnIndexToUpdate = newColumn.findIndex(
      (i) => i._id === columnIdtoUpdate
    );
    if (newColumnToUpdate._destroy) {
      //removed
      newColumn.splice(columnIndexToUpdate, 1);
    } else {
      newColumn.splice(columnIndexToUpdate, 1, newColumnToUpdate);
    }
    let newBoard = { ...board };
    newBoard.columnOrder = newColumn.map((c) => c._id);
    newBoard.columns = newColumn;
    setBoard(newBoard);
    setColumn(newColumn);
    // console.log(columnIndexToUpdate);
  };

  return (
    <>
      <nav className="workspace">
        <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "cards-drop-preview",
          }}
          getChildPayload={(index) => column[index]}
        >
          {column.map((column, index) => (
            <Draggable key={index}>
              <Column
                column={column}
                onCardDrop={onCardDrop}
                onUpdateColumn={onUpdateColumn}
              />
            </Draggable>
          ))}
        </Container>
        <BootstrapContainer className="trello-container">
          {!isCreateInputOpen ? (
            <Row>
              <Col className="add-new-column" onClick={handleToggleInput}>
                <i className="fa fa-plus icon"></i>
                {t("text.addAnotherList")}
              </Col>
            </Row>
          ) : (
            <Row>
              <Col className="enter-new-column">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder={t("text.enterNewColumnTitle")}
                  className="input-enter-new-column"
                  ref={newColumnInputRef}
                  value={newColumnTitle}
                  onChange={onChangeInput}
                  onKeyDown={(e) => e.key === "Enter" && handleOnCreate()}
                />
                <Button variant="success" size="sm" onClick={handleOnCreate}>
                  {t("text.addList")}
                </Button>
                <span className="cancel-add-new" onClick={handleToggleInput}>
                  <i className="fa fa-close icon"></i>
                </span>
              </Col>
            </Row>
          )}
        </BootstrapContainer>
      </nav>
    </>
  );
};

export default React.memo(BoardContent);
