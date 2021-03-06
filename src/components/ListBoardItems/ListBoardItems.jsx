import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ListBoardItems.scss";
import { createNewBoardApi } from "../../libs/apis/board.api";
import { updateBoardHistory } from "../../libs/apis/board.api";
import { useNavigate } from "react-router-dom";
import BoardItems from "components/BoardItems/BoardItems";
import Loading from "components/Loading/Loading";
import PopupCreateNew from "components/PopupCreateNew/PopupCreateNew";
import useAuth from "../../libs/hook/useAuth";
import { getBoardOfCurrentUserApi } from "../../libs/apis/board.api";
import { FREE_PLAN } from "../../utils/constants";
import { messageUpdateCreateBoard } from "../../utils/historyMapping";
import LazyLoad from "react-lazyload";
import { isEmpty } from "lodash";
import PageLoading from "../PageLoading/PageLoading";

const ListBoardItems = () => {
  const [listBoardOfCurrentUser, setListBoardOfCurrentUser] = useState([]);
  const [totalBoard, setTotalBoard] = useState(10);
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
    // console.log(boardDetailCreated);
    createNewBoardApi(boardDetailCreated).then((data) => {
      // console.log(data);
      const message = messageUpdateCreateBoard(auth.user.fullname, data.title);
      updateBoardHistory(data._id, message).then(() => {
        navigate(`/board/${data._id}`);
      });
    });
  };

  const getBoardOfCurrentUser = async () => {
    await getBoardOfCurrentUserApi().then((data) => {
      if (auth.user.plan === FREE_PLAN) setTotalBoard(10 - data.length);
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
  }, [auth]);

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
          {!auth.isAuth && <Loading />}
          {/* {isEmpty(listBoardOfCurrentUser) && <Loading />} */}
          {listBoardOfCurrentUser.map((item, index) => {
            return (
              <LazyLoad key={index} placeholder={<PageLoading />}>
                <div
                  className="wrap-board-items"
                  key={index}
                  onClick={() => navigate(`/board/${item._id}`)}
                >
                  <BoardItems
                    title={item.title}
                    index={index}
                    img={item.boardBackgroundColor}
                  />
                </div>
              </LazyLoad>
            );
          })}
          <div className="wrap-board-items">
            <div className="add-new" onClick={handleCreateNewBoard}>
              <i className="fa fa-plus-square"></i>
              <div className="message">
                <span>
                  {auth.user.plan === FREE_PLAN
                    ? t("text.createNewBoard", { number: totalBoard })
                    : t("text.createNewBoardWithPremiumPlan")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ListBoardItems);
