import React, { useRef, useEffect } from "react";
import "./PaypalPayment.scss";

const PaypalPayment = () => {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          console.log(data);
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "payment success",
                amount: {
                  value: 650.0,
                  current: "CAD",
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: async (error) => {
          console.log(error);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default React.memo(PaypalPayment);
