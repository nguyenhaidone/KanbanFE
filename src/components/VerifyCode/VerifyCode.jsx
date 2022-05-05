import React, { useState, useEffect } from "react";
import "./VerifyCode.scss";
import { useTranslation } from "react-i18next";
import ReactCodeInput from "react-verification-code-input";
import { handleSendVerifyCode } from "../../libs/apis/auth.api";
import { useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [verifyCode, setVerifyCode] = useState();
  const [timeCounter, setTimeCounter] = useState(120);
  const [loading, setLoading] = useState(false);
  const handleOnComplete = (value) => {
    console.log(value);
    setLoading(true);
    handleSendVerifyCode(value).then((response) => {
      console.log(response);
      navigate("/login");
    });
  };
  //   useEffect(() => {
  //     setTimeout(() => setTimeCounter(timeCounter - 1), 1000);
  //   });
  return (
    <>
      <ReactCodeInput
        type="text"
        fields={6}
        onComplete={(value) => handleOnComplete(value)}
        onChange={(value) => setVerifyCode(value)}
        loading={loading}
        title={t("text.verifyCode")}
      />
    </>
  );
};

export default React.memo(VerifyCode);
