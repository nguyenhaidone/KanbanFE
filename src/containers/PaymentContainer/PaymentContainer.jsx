import React from "react";
import "./PaymentContainer.scss";
import { useTranslation } from "react-i18next";
import AppBar from "components/AppBar/AppBar";
import CardPayment from "components/CardPayment/CardPayment";

const PaymentContainer = () => {
  const { t } = useTranslation();

  return (
    <>
      <AppBar />
      <div className="wrap-payment">
        <div className="wrap-payment-title">
          <span className="payment-title">{t("text.paymentTitles")}</span>
          <span className="payment-subtitle">{t("text.upgradeBenefit")}</span>
        </div>
        <div className="wrap-container">
          <CardPayment isFree={"true"} />
          <CardPayment />
        </div>
      </div>
    </>
  );
};

export default React.memo(PaymentContainer);
