import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ListBoardItems.scss";
import { createNewBoardApi } from "../../libs/apis/board.api";
import { useNavigate } from "react-router-dom";
import BoardItems from "components/BoardItems/BoardItems";
import PopupCreateNew from "components/PopupCreateNew/PopupCreateNew";
import useAuth from "../../libs/hook/useAuth";
import { getBoardOfCurrentUserApi } from "../../libs/apis/board.api";

const ListBoardItems = () => {
  const [listBoardOfCurrentUser, setListBoardOfCurrentUser] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  const [boardDetailCreated, setBoardDetailCreated] = useState({
    title: "",
    boardBackgroundColor: "",
    creater: auth.user ? auth.user.email : "",
  });
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const handleCreateNewBoard = () => {
    setIsOpen(!isOpen);
  };
  const handleOnClose = () => {
    setIsOpen(!isOpen);
  };
  const handleOnAccept = () => {
    console.log(boardDetailCreated);
    // setTimeout(() => {
    //   console.log(boardDetailCreated);
    // }, 1000);
    createNewBoardApi(boardDetailCreated).then((data) => {
      console.log(data);
      navigate(`/board/${data._id}`);
    });
  };

  const getBoardOfCurrentUser = async () => {
    await getBoardOfCurrentUserApi().then((data) => {
      setListBoardOfCurrentUser(data);
    });
  };

  console.log(listBoardOfCurrentUser);
  useEffect(() => {
    getBoardOfCurrentUser();
    setBoardDetailCreated({
      ...boardDetailCreated,
      creater: auth.user ? auth.user.email : "",
    });
  }, []);

  // const handleOnBoardClick = (id) => {
  //   navigate(`/board/${id}`);
  // };

  return (
    <>
      {isOpen && (
        <PopupCreateNew
          handleOnClose={handleOnClose}
          handleOnAccept={handleOnAccept}
          setBoardDetailCreated={setBoardDetailCreated}
        />
      )}
      <div className="wrap-list">
        <div className="title">
          <span>{t("text.kanbanWorkspace")}</span>
        </div>
        <div className="list-board">
          {listBoardOfCurrentUser.map((item, index) => {
            return (
              <div
                className="wrap-board-items"
                key={index}
                onClick={() => navigate(`/board/${item._id}`)}
              >
                <BoardItems title={item.title} />
              </div>
            );
          })}
          <div className="wrap-board-items">
            <div className="add-new" onClick={handleCreateNewBoard}>
              <i className="fa fa-plus-square"></i>
              <div className="message">
                <span>{t("text.createNewBoard", { number: 9 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ListBoardItems);
