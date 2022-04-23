import React from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import "./PopupCardDetail.scss";

const PopupCardDetail = (props) => {
  const {
    boardTitle,
    cover,
    columnTitle,
    assignee,
    createdAt,
    creater,
    cardTitle,
    description,
    image,
    handlePopupClose,
  } = props;
  const { t } = useTranslation();

  const Schema = Yup.object().shape({
    title: Yup.string().min(1),
    description: Yup.string(),
    // image: Yup.string,
  });

  const initialValue = {
    title: cardTitle || "card title",
    description: description || "",
    image: image || "",
  };
  const handleOnSubmit = () => {};

  const handleOnClose = () => {
    handlePopupClose();
  };

  return (
    <div className="wrap-card-popup">
      <div className="card-popup">
        <Formik
          onSubmit={handleOnSubmit}
          initialValues={initialValue}
          validationSchema={Schema}
          validateOnChange={false}
        >
          {(props) => {
            return (
              <form
                className="form-card-detail"
                onSubmit={props.handleSubmit}
                onKeyPress={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
              >
                <div className="header-card-detail">
                  <span className="wrap-title-card-detail">
                    {boardTitle || "Board title"}
                  </span>
                  <span className="wrap-close" onClick={handleOnClose}>
                    {t("text.closeButton")}
                  </span>
                </div>
                <div className="card-detail-container">
                  <div className="wrap-title-column">
                    <div className="wrap-column-title">
                      {columnTitle || "Column title"}
                    </div>
                    {
                      <span className="wrap-assignee">
                        {t("text.assignee", { assignee: assignee || "Dang" })}
                      </span>
                    }
                  </div>
                  <div className="wrap-content-card-detail">
                    {cover ? (
                      <div className="wrap-img-background">
                        <img
                          src={
                            cover ||
                            "https://c8.alamy.com/comp/PF3NWT/desktop-source-code-and-technology-background-developer-or-programer-with-coding-and-programming-wallpaper-by-computer-language-and-source-code-com-PF3NWT.jpg"
                          }
                          alt="cover"
                          width="100%"
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    <input
                      type="text"
                      className="title-card-detail"
                      name="title"
                      value={props.values.title}
                      onChange={props.handleChange}
                    />
                    <div className="created-at">
                      {t("text.createdAt", {
                        time: createdAt || "6:30 12/10/2022",
                      })}
                    </div>
                    <div className="creater">
                      {t("text.creater", { creater: creater || "Dang" })}
                    </div>
                    <div className="description">
                      <div className="description-title">
                        {t("text.description")}
                      </div>
                      <textarea
                        name="description"
                        id="description"
                        cols="30"
                        value={props.values.description}
                        onChange={props.handleChange}
                        rows="10"
                        className="description-textarea"
                        placeholder={t("text.description")}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="group-card-detail-button">
                  <button className="close-card-detail" onClick={handleOnClose}>
                    {t("text.closeButton")}
                  </button>
                  <button className="submit-card-detail" type="submit">
                    {t("text.confirm")}
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default React.memo(PopupCardDetail);
