import React from "react";
import "./GoogleLogin.scss";
import { useTranslation } from "react-i18next";
import GoogleLogin from "react-google-login";
import { GoogleLoginDto } from "./googleLoginDto";
import { socialLoginApi } from "../../libs/apis/auth.api";
import { setToken } from "../../utils/localStorageService";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log(response);
    const dataMapping = GoogleLoginDto(response.profileObj);
    socialLoginApi(dataMapping).then((data) => {
      setToken(data.accessToken, data.refreshToken);
      navigate("/homepage");
    });
  };

  return (
    <GoogleLogin
      clientId="532459309976-u4anma0797gt5vfgahcran9fib07vdi2.apps.googleusercontent.com"
      //   render={(renderProps) => (
      //     <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
      //       {t("text.loginByGoogle")}
      //     </button>
      //   )}
      buttonText={t("text.loginByGoogle")}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default React.memo(GoogleLoginButton);
