import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { exchangeConvert } from "../../utils/exchangeRate";

import "./CardPayment.scss";

const CardPayment = (props) => {
  const { isFree } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const listFreePlanBenefit = [t("text.limitBoard"), t("text.cannotInvite")];
  const listPurchasePlanBenefit = [
    t("text.unlimitedBoard"),
    t("text.canInvite"),
    t("text.otherFeature"),
  ];

  const handleSetOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleOnClick = (e) => {
    props.isFree ? setIsOpen(!isOpen) : alert("alo alo");
  };

  return (
    <>
      {/* {isOpen && ( */}
      <Modal show={isOpen} onHide={handleSetOpen}>
        <Modal.Header closeButton>
          <Modal.Title>{t("text.notification")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{t("text.youUsingCurrentPlan")}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleSetOpen}>
            {t("text.closeButton")}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* )} */}
      <div className="wrap-card">
        <div className="wrap-plan">
          <div className="wrap-label">
            {isFree ? t("text.basicPlan") : t("text.exclusivePlan")}
          </div>
          <div className="wrap-money">
            {isFree
              ? t("text.free")
              : i18n.language === "en"
              ? `${exchangeConvert("USD")}/${t("text.month")}`
              : `${exchangeConvert("VND")}/${t("text.month")}`}
          </div>
          <div className="wrap-button">
            <button className="purchase" onClick={handleOnClick}>
              {isFree ? t("text.currentPlan") : t("text.purchaseNow")}
            </button>
          </div>
          <div className="wrap-list-benefit">
            {isFree
              ? listFreePlanBenefit.map((item, index) => (
                  <div className="items" key={index}>
                    <i class="fa fa-check"></i>
                    <div className="benefit">{item}</div>
                  </div>
                ))
              : listPurchasePlanBenefit.map((item, index) => (
                  <div className="items" key={index}>
                    <i class="fa fa-check"></i>
                    <div className="benefit">{item}</div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(CardPayment);
