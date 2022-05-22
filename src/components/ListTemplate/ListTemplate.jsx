import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ListTemplate.scss";
import { createNewBoardApi } from "../../libs/apis/board.api";
import { createNewColumnApi } from "../../libs/apis/column.api";
import { useNavigate } from "react-router-dom";
import BoardItems from "components/BoardItems/BoardItems";
import PopupCreateNew from "components/PopupCreateNew/PopupCreateNew";
import useAuth from "../../libs/hook/useAuth";
import { template } from "../../template/template";
import { getBoardOfCurrentUserApi } from "../../libs/apis/board.api";
import { createNewCardApi } from "../../libs/apis/card.api";
import { PREMIUM_PLAN } from "utils/constants";

const ListTemplate = () => {
  const [templateChosen, setTemplateChosen] = useState({
    type: "",
    description: "",
    title: "",
    column: [],
  });
  const navigate = useNavigate();
  const auth = useAuth();

  const [boardDetailCreated, setBoardDetailCreated] = useState({
    title: "",
    boardBackgroundColor: "",
    creater: auth.user ? auth.user.email : "",
  });
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const handleCreateNewBoard = (item) => {
    setIsOpen(!isOpen);
    setTemplateChosen({
      type: item.type,
      description: item.description,
      title: item.title,
      column: item.column,
    });
  };
  const handleOnClose = () => {
    setIsOpen(!isOpen);
  };
  const handleOnAccept = () => {
    createNewBoardApi(boardDetailCreated).then((data) => {
      console.log(data);
      templateChosen.column.forEach((column) => {
        const columnBody = {
          title: column.title,
          boardId: data._id,
        };
        createNewColumnApi(columnBody).then((response) => {
          console.log(response);
          const cardBody = {
            title: column.title,
            boardId: data._id,
            columnId: response._id,
            cover: column.image || "",
          };
          console.log(cardBody);
          createNewCardApi(cardBody).then((responseCreated) => {
            console.log(responseCreated);
            navigate(`/board/${data._id}`);
          });
        });
      });
    });
  };

  //   const getBoardOfCurrentUser = async () => {
  //     await getBoardOfCurrentUserApi().then((data) => {
  //       setListBoardOfCurrentUser(data);
  //     });
  //   };

  //   useEffect(() => {
  //     getBoardOfCurrentUser();
  //     setBoardDetailCreated({
  //       ...boardDetailCreated,
  //       creater: auth.user ? auth.user.email : "",
  //     });
  //   }, []);

  return (
    <>
      {isOpen && (
        <PopupCreateNew
          handleOnClose={handleOnClose}
          handleOnAccept={handleOnAccept}
          setBoardDetailCreated={setBoardDetailCreated}
          description={templateChosen.description}
          title={templateChosen.title}
        />
      )}
      <div className="wrap-list">
        <div className="title">
          <span>{t("text.createWithTemplate")}</span>
        </div>
        <div className="list-board">
          {auth.user.plan !== PREMIUM_PLAN ? (
            <div className="let-sign-premium-plan">
              <span>{t("text.letSignPremiumPlan")}</span>
            </div>
          ) : (
            template.map((item, index) => {
              return (
                <div
                  className="wrap-board-items"
                  key={index}
                  onClick={() => handleCreateNewBoard(item)}
                >
                  <BoardItems title={item.title} index={index} />
                </div>
              );
            })
          )}
          {/* <div className="wrap-board-items">
            <div className="add-new" onClick={handleCreateNewBoard}>
              <i className="fa fa-plus-square"></i>
              <div className="message">
                <span>{t("text.createNewBoard", { number: 9 })}</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default React.memo(ListTemplate);
