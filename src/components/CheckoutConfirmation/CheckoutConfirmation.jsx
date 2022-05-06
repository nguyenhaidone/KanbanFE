import React, { useState, useEffect } from "react";
import "./CheckoutConfirmation.scss";
import paymentImg from "../../images/payment.svg";
import certificateImg from "../../images/certificate.svg";
import PaypalPayment from "components/PaypalPayment/PaypalPayment";
import { useTranslation } from "react-i18next";
import useAuth from "../../libs/hook/useAuth";

const CheckoutConfirmation = () => {
  const { t } = useTranslation();
  const [checkout, setCheckout] = useState(false);
  const auth = useAuth();
  console.log(auth.user.fullname);

  const listPurchasePlanBenefit = [
    t("text.unlimitedBoard"),
    t("text.canInvite"),
    t("text.otherFeature"),
  ];

  return (
    <div className="wrap-checkout-container">
      <div className="wrap-left-side">
        <img src={paymentImg} width="40%" height="40%" alt="payment" />
        <div className="wrap-plan">
          <div className="wrap-money">{t("text.exclusivePlan")}</div>
          {/* <div className="wrap-money">
            {isFree
              ? t("text.free")
              : i18n.language === "en"
              ? `${exchangeConvert("USD")}/${t("text.month")}`
              : `${exchangeConvert("VND")}/${t("text.month")}`}
          </div> */}
          {/* <div className="wrap-button">
            <button className="purchase" onClick={handleOnClick}>
              {isFree ? t("text.currentPlan") : t("text.purchaseNow")}
            </button>
          </div> */}
          <div className="wrap-list-benefit">
            {listPurchasePlanBenefit.map((item, index) => (
              <div className="items" key={index}>
                <i class="fa fa-check"></i>
                <div className="benefit">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="wrap-right-side">
        <img src={certificateImg} width="20%" height="20%" alt="payment" />
        <div className="wrap-money">
          {t("text.checkoutThanks", { name: "bạn" })}
        </div>
        <div className="wrap-sub-thanks">
          {t("text.subCheckoutThanks")}
        </div>
        {checkout ? (
          <PaypalPayment />
        ) : (
          <div className="wrap-button-checkout">
            <button onClick={() => setCheckout(true)}>
              {t("text.checkout")}
            </button>
          </div>
        )}
        <div className="wrap-sub-detail">{t("text.moreDetail", { email: auth.user.email })}</div>
      </div>
    </div>
  );
};

export default React.memo(CheckoutConfirmation);
