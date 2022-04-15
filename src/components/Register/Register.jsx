import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import GoogleLoginButton from "components/GoogleLogin/GoogleLogin";
import React,{useState} from "react";
import "./Register.scss";
import * as Yup from "yup";

const Register = () => {
  const { t } = useTranslation();

  const Schema = Yup.object().shape({
    email: Yup.string()
      .email(`${t("text.validEmail")}`)
      .max(255)
      .required(`${t("text.requiredEmail")}`),
    password: Yup.string()
      .min(6)
      .required(`${t("text.validPassword")}`),
    rePassword: Yup.string()
      .min(6)
      .oneOf([Yup.ref("password"), null], `${t("text.rePasswordError")}`)
      .required(`${t("text.rePasswordError")}`),
    username: Yup.string().required(`${t("text.nameRequired")}`),
    // rememberMe: Yup.boolean().default(false),
  });

  const initialValue = {
    email: "",
    password: "",
    rePassword: "",
    username: "",
  };

  const handleOnSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="login-popup">
      <div className="title-group">
        <div className="main-title">
          <span>{t("text.registerNow")}</span>
        </div>
        <div className="sub-title">
          <span>{t("text.promotion30days")}</span>
        </div>
      </div>
      <Formik
        onSubmit={handleOnSubmit}
        initialValues={initialValue}
        validationSchema={Schema}
        validateOnChange={false}
      >
        {(props) => {
          console.log(props);
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
              <div className="wrap-input">
                <label className="password-label">
                  {t("text.rePasswordLabel")}
                </label>
                <input
                  type="password"
                  name="rePassword"
                  className="rePassword-input"
                  value={props.values.rePassword}
                  onChange={props.handleChange}
                  placeholder={t("text.rePasswordPlaceholder")}
                />
                {props.errors &&
                props.errors.rePassword &&
                props.errors.rePassword !== "undefined" ? (
                  <div className="wrap-error">
                    <span className="error-mes">{props.errors.rePassword}</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="wrap-input">
                <label className="username-label">{t("text.nameLabel")}</label>
                <input
                  type="text"
                  name="username"
                  className="password-input"
                  value={props.values.username}
                  onChange={props.handleChange}
                  placeholder={t("text.namePlaceholder")}
                />
                {props.errors &&
                props.errors.username &&
                props.errors.username !== "undefined" ? (
                  <div className="wrap-error">
                    <span className="error-mes">{props.errors.username}</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <button
                type="submit"
                className="submit-btn"
              >
                {t("text.register")}
              </button>
            </form>
          );
        }}
      </Formik>
      <span className="or">{t("text.or")}</span>
      <GoogleLoginButton />
      <div className="other">
        <a href="/login" className="link-register">
          {t("text.alreadyHaveAccount")}
        </a>
      </div>
    </div>
  );
};

export default React.memo(Register);
