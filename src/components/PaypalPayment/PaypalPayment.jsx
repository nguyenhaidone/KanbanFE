import React, { useRef, useEffect, useState } from "react";
import { createOrderApi } from "../../libs/apis/order.api";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import successTick from "../../images/successTick.svg";
import error from "../../images/error.svg";
import { useNavigate } from "react-router-dom";
import "./PaypalPayment.scss";

const PaypalPayment = () => {
  const paypal = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);

  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);

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
                  value: 0.9,
                  current: "CAD",
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          const purchase_unit = order.purchase_units[0];
          const body = {
            orderId: order.id,
            plan: "PREMIUM",
            status: order.status,
            createdOrderAt: order.create_time,
            amount: purchase_unit.amount,
            payee: purchase_unit.payee,
          };
          await createOrderApi(body).then((data) => {
            console.log(data);
            handleShowSuccess();
          });
          /**
           * !navigate page success
           */
        },
        onError: async (error) => {
          console.log(error);
          handleShowError();
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <>
      <Modal show={showSuccess} onHide={handleCloseSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>{t("text.notification")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrap-payment-alert">
            <img src={successTick} width="20%" height="20%" alt="success" />
            <div>{t("text.paymentSuccess")}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccess}>
            {t("text.closeButton")}
          </Button>
          <Button variant="primary" onClick={handleCloseSuccess}>
            {t("text.acceptButton")}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showError} onHide={handleCloseError}>
        <Modal.Header closeButton>
          <Modal.Title>{t("text.notification")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrap-payment-alert">
            <img src={error} width="20%" height="20%" alt="success" />
            <div>{t("text.paymentFail")}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseError}>
            {t("text.closeButton")}
          </Button>
          <Button variant="primary" onClick={handleCloseError}>
            {t("text.acceptButton")}
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <div ref={paypal}></div>
      </div>
    </>
  );
};

export default React.memo(PaypalPayment);
