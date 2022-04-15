import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import GoogleLoginButton from "components/GoogleLogin/GoogleLogin";
import React from "react";
import "./Login.scss";
import * as Yup from "yup";
import { loginApi } from "../../libs/apis/auth.api";
// import { useHistory } from "react-router-dom";

const Login = () => {
  const { t } = useTranslation();
  // const history = useHistory();

  const Schema = Yup.object().shape({
    email: Yup.string()
      .email(`${t("text.validEmail")}`)
      .max(255)
      .required(`${t("text.requiredEmail")}`),
    password: Yup.string()
      .min(6)
      .required(`${t("text.validPassword")}`),
    rememberMe: Yup.boolean().default(false),
  });

  const initialValue = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleOnSubmit = (values) => {
    const data = { email: values.email, password: values.password };
    loginApi(data).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="login-popup">
      <div className="title-group">
        <div className="main-title">
          <span>{t("text.welcomeBack")}</span>
        </div>
        <div className="sub-title">
          <span>{t("text.letMeHelpYouManageYourWorkBetter")}</span>
        </div>
      </div>
      <Formik
        onSubmit={handleOnSubmit}
        initialValues={initialValue}
        validationSchema={Schema}
        validateOnChange={false}
      >
        {(props) => {
          return (
            <form
              className="form-login"
              onSubmit={props.handleSubmit}
              onKeyPress={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            >
              <div className="wrap-input">
                <label className="email-label">{t("text.yourEmail")}</label>
                <input
                  type="text"
                  name="email"
                  className="email-input"
                  placeholder={t("text.exampleEmail")}
                  value={props.values.email}
                  onChange={props.handleChange}
                />
                {props.errors &&
                props.errors.email &&
                props.errors.email !== "undefined" ? (
                  <div className="wrap-error">
                    <span className="error-mes">{props.errors.email}</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="wrap-input">
                <label className="password-label">
                  {t("text.yourPassword")}
                </label>
                <input
                  type="password"
                  name="password"
                  className="password-input"
                  value={props.values.password}
                  onChange={props.handleChange}
                  placeholder={t("text.validPassword")}
                />
                {props.errors &&
                props.errors.password &&
                props.errors.password !== "undefined" ? (
                  <div className="wrap-error">
                    <span className="error-mes">{props.errors.password}</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="wrap-checkbox">
                <input
                  type="checkbox"
                  onChange={props.handleChange}
                  name="rememberMe"
                  id="rememberMe"
                  checked={props.values.rememberMe}
                />
                <label className="password-label">{t("text.rememberMe")}</label>
              </div>
              <button
                type="submit"
                className="submit-btn"
              >
                {t("text.loginIn")}
              </button>
            </form>
          );
        }}
      </Formik>
      <span className="or">{t("text.or")}</span>
      <GoogleLoginButton />
      <div className="other">
        <a href="/register" className="link-register">
          {t("text.dontHaveAccount")}
        </a>
        <a href="/forget-password" className="link-register">
          {t("text.forgottenYourPassword")}
        </a>
      </div>
    </div>
  );
};

export default React.memo(Login);
