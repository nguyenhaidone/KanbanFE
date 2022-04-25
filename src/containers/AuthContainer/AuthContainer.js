import React, { useState, useEffect } from "react";
import { checkAuth } from "../../utils/localStorageService";
import { currentUserDetailApi } from "../../libs/apis/auth.api";
import { Navigate, useLocation } from "react-router-dom";

const AuthContainer = (props) => {
  let location = useLocation();
  const [isAuth, setIsAuth] = useState(checkAuth());
  const [currentUser, setCurrent] = useState({});
  const getUserInfo = () => {
    currentUserDetailApi().then((data) => {
      setCurrent(data);
    });
  };
  useEffect(() => {
    setIsAuth(checkAuth());
    getUserInfo();
    // setCurrent(currentUser);
  }, []);
  if (!currentUser)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return props.children;
};

export default React.memo(AuthContainer);
