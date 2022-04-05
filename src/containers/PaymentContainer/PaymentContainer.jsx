import React from "react";
import "./PaymentContainer.scss";
import AppBar from "components/AppBar/AppBar";
import CardPayment from "components/CardPayment/CardPayment";

const PaymentContainer = () => {
  return (
    <>
      <AppBar />
      <div className="wrap-payment">
        <div className="wrap-container">
          <CardPayment isFree={"true"} />
          <CardPayment />
        </div>
      </div>
    </>
  );
};

export default React.memo(PaymentContainer);
