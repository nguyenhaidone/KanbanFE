import React, { useState, useEffect } from "react";
import "./CheckoutConfirmation.scss";
import PaypalPayment from "components/PaypalPayment/PaypalPayment";

const CheckoutConfirmation = () => {
  const [checkout, setCheckout] = useState(false);

  return (
    <>
      {checkout ? (
        <PaypalPayment />
      ) : (
        <button onClick={() => setCheckout(true)}>Checkout</button>
      )}
    </>
  );
};

export default React.memo(CheckoutConfirmation);
