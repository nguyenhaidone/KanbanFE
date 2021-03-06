import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useAuth from "../../libs/hook/useAuth";
import Avatar from "react-avatar";
import { updateUserInfo } from "../../libs/apis/auth.api";
import { listOrderBuyUserApi } from "../../libs/apis/order.api";
import "./Profile.scss";
import { Modal, Button, Form } from "react-bootstrap";
import { formatToDMY } from "../../utils/formatDateTime";
import { storage } from "../../firebase/index";
import { FREE_PLAN } from "utils/constants";
import { getDaysLeft } from "../../utils/formatDateTime";
import ItemHistory from "../ItemHistory/ItemHistory";
import Loading from "../Loading/Loading";

const Profile = (props) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [tab, setTab] = useState({
    personalInformation: true,
    myBoards: false,
  });
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [profilePopup, setProfilePopup] = useState(false);
  const [listOrder, setListOrder] = useState([]);
  const [profile, setProfile] = useState({
    fullName: auth.user.fullname,
    phoneNumber: auth.user.phoneNumber,
    address: auth.user.address,
    profession: auth.user.profession,
    dateOfBirth: auth.user.dateOfBirth,
  });
  const [avatar, setAvatar] = useState(auth.user.avatar || null);

  const handleSetProfilePopup = () => setProfilePopup(!profilePopup);
  const handleOnSubmitUpdate = async () => {
    try {
      await handleOnUpload();
      await updateUserInfo({
        fullname: profile.fullName,
        phoneNumber: profile.phoneNumber,
        address: profile.address,
        profession: profile.profession,
        dateOfBirth: profile.dateOfBirth,
      }).then((response) => {
        console.log(response);
        setProfile({
          avatar: response.avatar,
          fullName: response.fullname,
          phoneNumber: response.phoneNumber,
          address: response.address,
          profession: response.profession,
          dateOfBirth: response.dateOfBirth,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeImg = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleOnUpload = () => {
    const uploadTask = storage.ref(`images/${avatar.name}`).put(avatar);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(avatar.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUrl(url);
            updateUserInfo({
              avatar: url,
            }).then((response) => {
              console.log(response);
              setProfile({
                avatar: response.avatar,
                fullName: response.fullname,
                phoneNumber: response.phoneNumber,
                address: response.address,
                profession: response.profession,
                dateOfBirth: response.dateOfBirth,
              });
            });
          });
      }
    );
  };

  useEffect(() => {
    setProfile({
      fullName: auth.user.fullname,
      phoneNumber: auth.user.phoneNumber,
      address: auth.user.address,
      profession: auth.user.profession,
      dateOfBirth: auth.user.dateOfBirth,
    });
    setAvatar(auth.user.avatar || null);
    setUrl(auth.user.avatar || null);
    listOrderBuyUserApi().then((data) => {
      setListOrder(data);
    });
  }, [auth]);

  return (
    <>
      <Modal
        show={profilePopup}
        onHide={handleSetProfilePopup}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {t("text.aboutMe")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="profile-img">
            {avatar ? (
              <img src={url || avatar} alt="" />
            ) : (
              <Avatar name={auth.user.fullname} round={true} size="200" />
            )}
            <div className="file btn btn-lg btn-primary">
              {t("text.changePhoto")}
              <input type="file" name="file" onChange={handleOnChangeImg} />
            </div>
          </div>
          <Form style={{ height: "300px", overflowY: "auto" }}>
            <Form.Group className="mb-3" controlId="formGroupFullName">
              <Form.Label>{t("text.fullName")}</Form.Label>
              <Form.Control
                // type="fullName"
                placeholder={t("text.fullName")}
                value={profile.fullName || ""}
                name="fullName"
                onChange={(e) =>
                  setProfile({ ...profile, fullName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhoneNumber">
              <Form.Label>{t("text.phoneNumber")}</Form.Label>
              <Form.Control
                // type="phoneNumber"
                placeholder={t("text.phoneNumber")}
                value={profile.phoneNumber || ""}
                name="phoneNumber"
                onChange={(e) =>
                  setProfile({ ...profile, phoneNumber: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupProfession">
              <Form.Label>{t("text.profession")}</Form.Label>
              <Form.Control
                // type="profession"
                placeholder={t("text.profession")}
                value={profile.profession || ""}
                name="profession"
                onChange={(e) =>
                  setProfile({ ...profile, profession: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupProfession">
              <Form.Label>{t("text.dateOfBirth")}</Form.Label>
              <Form.Control
                // type="profession"
                placeholder={t("text.dateOfBirth")}
                value={profile.dateOfBirth || ""}
                name="dateOfBirth"
                onChange={(e) =>
                  setProfile({ ...profile, dateOfBirth: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupProfession">
              <Form.Label>{t("text.address")}</Form.Label>
              <Form.Control
                // type="profession"
                placeholder={t("text.address")}
                value={profile.address || ""}
                name="address"
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
              />
            </Form.Group>
          </Form>
          <div className="d-grid gap-2 mt-2">
            <Button variant="primary" onClick={handleOnSubmitUpdate} size="lg">
              {t("text.update")}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="container emp-profile" style={{ background: "none" }}>
        <form method="post" className="form-styling">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                {!auth.isAuth ? (
                  <Loading />
                ) : auth.user.avatar ? (
                  <img src={url} alt="" />
                ) : (
                  <Avatar name={auth.user.fullname} round={true} size="200" />
                )}
              </div>
            </div>
            <div className="col-md-6">
              {!auth.isAuth ? (
                <Loading />
              ) : (
                <div className="profile-head">
                  <h3>{auth.user.fullname}</h3>
                  {/* <h6>Web Developer and Designer</h6> */}
                  <p className="proile-rating">
                    {t("text.currentPlan")} :{" "}
                    <span>
                      {auth.user.plan === FREE_PLAN
                        ? t("text.free")
                        : t("text.exclusivePlan")}
                    </span>
                  </p>
                  {auth.user.plan && auth.user.extensionDate && (
                    <p className="proile-rating">
                      <span>
                        {t("text.daysLeft", {
                          days: getDaysLeft(auth.user.extensionDate),
                        })}
                      </span>
                    </p>
                  )}
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className={
                          tab.personalInformation
                            ? "nav-link active"
                            : "nav-link"
                        }
                        id="home-tab"
                        data-toggle="tab"
                        onClick={() =>
                          setTab({
                            personalInformation: true,
                            myBoards: false,
                          })
                        }
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        {t("text.aboutMe")}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={
                          tab.personalInformation
                            ? "nav-link"
                            : "nav-link active"
                        }
                        id="profile-tab"
                        data-toggle="tab"
                        onClick={() =>
                          setTab({
                            personalInformation: false,
                            myBoards: true,
                          })
                        }
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        {t("text.orderHistory")}
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="col-md-2">
              <Button
                className="profile-edit-btn"
                name="btnAddMore"
                onClick={handleSetProfilePopup}
              >
                {t("text.editProfile")}
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                {!auth.isAuth ? (
                  <Loading />
                ) : (
                  <>
                    <div
                      className={
                        tab.personalInformation
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <label>{t("text.fullName")}</label>
                        </div>
                        <div className="col-md-6">
                          <p>{auth.user.fullname}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Email</label>
                        </div>
                        <div className="col-md-6">
                          <p>{auth.user.email}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>{t("text.phoneNumber")}</label>
                        </div>
                        <div className="col-md-6">
                          <p>
                            {auth.user.phoneNumber || t("text.haveNotUpdate")}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>{t("text.profession")}</label>
                        </div>
                        <div className="col-md-6">
                          <p>
                            {auth.user.profession || t("text.haveNotUpdate")}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>{t("text.address")}</label>
                        </div>
                        <div className="col-md-6">
                          <p>{auth.user.address || t("text.haveNotUpdate")}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>{t("text.dateOfBirth")}</label>
                        </div>
                        <div className="col-md-6">
                          <p>
                            {formatToDMY(auth.user.dateOfBirth) ||
                              t("text.haveNotUpdate")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        tab.personalInformation
                          ? "tab-pane fade list-order"
                          : "tab-pane fade show active list-order"
                      }
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      {listOrder.map((item) => (
                        <div className="wrap-item-history" key={item._id}>
                          <ItemHistory
                            fullname={auth.user.fullname}
                            createdOrderAt={item.createdOrderAt}
                            status={item.status}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default React.memo(Profile);
