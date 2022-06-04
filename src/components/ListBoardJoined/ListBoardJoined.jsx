import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ListBoardJoined.scss";
// import { createNewBoardApi } from "../../libs/apis/board.api";
import { useNavigate } from "react-router-dom";
import BoardItems from "components/BoardItems/BoardItems";
// import PopupCreateNew from "components/PopupCreateNew/PopupCreateNew";
import useAuth from "../../libs/hook/useAuth";
import { getListBoardJoinedOfCurrentUser } from "../../libs/apis/board.api";

const ListBoardJoined = () => {
  const [listBoardJoinedOfCurrentUser, setListBoardJoinedOfCurrentUser] =
    useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  const [boardDetailCreated, setBoardDetailCreated] = useState({
    title: "",
    boardBackgroundColor: "",
    creater: auth.user ? auth.user.email : "",
  });
  const { t } = useTranslation();

  const getBoardOfCurrentUser = async () => {
    await getListBoardJoinedOfCurrentUser().then((data) => {
      setListBoardJoinedOfCurrentUser(data);
    });
  };

  // console.log(listBoardJoinedOfCurrentUser);
  useEffect(() => {
    getBoardOfCurrentUser();
    setBoardDetailCreated({
      ...boardDetailCreated,
      creater: auth.user ? auth.user.email : "",
    });
  }, []);

  return (
    <>
      <div className="wrap-list">
        <div className="title">
          <span>{t("text.listBoardJoined")}</span>
        </div>
        <div className="list-board">
          {listBoardJoinedOfCurrentUser.map((item, index) => {
            return (
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
            );
          })}
          {/* <div className="wrap-board-items">
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default React.memo(ListBoardJoined);
