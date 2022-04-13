import React from "react";
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from "utils/constants";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ConfirmModal = (props) => {
  const { t } = useTranslation();

  const { title, content, show, onAction } = props;
  return (
    <>
      <Modal
        show={show}
        onHide={() => onAction("close")}
        keyboard={false}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title || t("text.confirm")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content || t("text.areYouSureAboutThat")}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => onAction(MODAL_ACTION_CLOSE)}
          >
            {t("text.declineButton")}
          </Button>
          <Button
            variant="primary"
            onClick={() => onAction(MODAL_ACTION_CONFIRM)}
          >
            {t("text.acceptButton")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(ConfirmModal);
