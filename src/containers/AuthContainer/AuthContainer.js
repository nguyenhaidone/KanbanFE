import React, { useState, useEffect } from "react";
import { checkAuth } from "../../utils/localStorageService";
import { currentUserDetailApi } from "../../libs/apis/auth.api";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../libs/hook/useAuth";

const AuthContainer = (props) => {
  let location = useLocation();
  const [isAuth, setIsAuth] = useState(checkAuth());

  useEffect(() => {
    setIsAuth(checkAuth());
  });
  console.log(checkAuth());
  if (!isAuth)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return props.children;
};

export default React.memo(AuthContainer);
