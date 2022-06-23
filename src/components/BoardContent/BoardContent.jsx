import React, { useState, useEffect, useRef } from "react";
import Column from "components/Column/Column";
import Loading from "components/Loading/Loading";
import { Container, Draggable } from "react-smooth-dnd";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import "./BoardContent.scss";
import { isEmpty, cloneDeep } from "lodash";
// import { initialData } from "actions/initialData";
import { useTranslation } from "react-i18next";
import { mapOrder } from "utils/ultis";
import { applyDrag } from "../../utils/dnd";
import {
  boardDetailApi,
  updateBoardApi,
  updateBoardHistory,
} from "../../libs/apis/board.api";
import {
  createNewColumnApi,
  updateColumnApi,
} from "../../libs/apis/column.api";
import {
  messageUpdateCardStatus,
  messageCreateColumn,
} from "../../utils/historyMapping";
import { updateCardApi } from "../../libs/apis/card.api";
import useAuth from "libs/hook/useAuth";

const BoardContent = (props) => {
  const auth = useAuth();
  const { handleOpenPopup } = props;
  let url = window.location.href;
  const boardId = url.substring(url.lastIndexOf("/") + 1);
  const [board, setBoard] = useState({});
  const [column, setColumn] = useState([]);
  const [isCreateInputOpen, setIsCreateInputOpen] = useState(false);
  const [isCardShow, setIsCardShow] = useState(false);
  const handleToggleInput = () => {
    setIsCreateInputOpen(!isCreateInputOpen);
  };
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const newColumnInputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchBoardAPI = () =>
      boardDetailApi(boardId).then((board) => {
        if (board) {
          setBoard(board);

          setColumn(mapOrder(board.columns, board.columnOrder, "_id"));
        }
      });
    fetchBoardAPI();
  }, []);

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus();
      newColumnInputRef.current.select();
    }
  }, [isCreateInputOpen]);

  if (isEmpty(board)) {
    return <Loading />;
  }

  const onColumnDrop = (dropResult) => {
    if (!board.blackList.includes(auth.user.email)) {
      let newColumn = cloneDeep(column);
      newColumn = applyDrag(newColumn, dropResult);

      let newBoard = cloneDeep(board);
      newBoard.columnOrder = newColumn.map((c) => c._id);
      newBoard.columns = newColumn;
      console.log(newColumn);
      /**
       * !call api update column order
       */
      setBoard(newBoard);
      setColumn(newColumn);
      updateBoardApi(newBoard._id, newBoard).catch((error) => {
        console.log(error);
        setBoard(board);
        setColumn(column);
      });
    }
  };
  // console.log(board);

  const onCardDrop = (columnId, dropResult) => {
    if (!board.blackList.includes(auth.user.email)) {
      // console.log(columnId, dropResult);
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        let newColumn = cloneDeep(column);
        let curColumn = newColumn.find((c) => c._id === columnId);

        curColumn.cards = applyDrag(curColumn.cards, dropResult);
        curColumn.cardOrder = curColumn.cards.map((i) => i._id);

        setColumn(newColumn);
        // console.log(column)

        if (
          dropResult.removedIndex !== null &&
          dropResult.addedIndex !== null
        ) {
          updateColumnApi(curColumn, curColumn._id).catch((error) => {
            setColumn(newColumn);
          });
        } else {
          updateColumnApi(curColumn, curColumn._id).catch((error) => {
            setColumn(newColumn);
          });

          if (dropResult.addedIndex !== null) {
            let currentCard = cloneDeep(dropResult.payload);
            currentCard.columnId = curColumn._id;
            currentCard.cover = curColumn.cover || "";
            currentCard.updatedAt = curColumn.updatedAt || "";
            updateCardApi(currentCard, currentCard._id);
            const message = messageUpdateCardStatus(
              auth.user.fullname,
              board.title,
              currentCard.title
            );
            updateBoardHistory(boardId, message);
          }
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

    createNewColumnApi(newColumnToAdd).then((newCol) => {
      // console.log(newCol);
      const message = messageCreateColumn(
        auth.user.fullname,
        newColumnToAdd.title
      );
      updateBoardHistory(boardId, message);
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

  const isImage = (boardBgColor) => {
    const spread = [...`${boardBgColor}`];
    return spread[0] !== "#" ? true : false;
  };

  const handleShowCardDetail = () => {
    setIsCardShow(!isCardShow);
  };

  return (
    <>
      <nav
        className="workspace"
        style={
          isImage(board.boardBackgroundColor)
            ? {
                backgroundImage: `url(${board.boardBackgroundColor})`,
                backgroundSize: "contain",
              }
            : { backgroundColor: `${board.boardBackgroundColor}` }
        }
      >
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
                handleOpenPopup={handleShowCardDetail}
                board={board}
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
