import React, { useState, useEffect, useRef } from "react";
import { currentUserDetailApi } from "../../libs/apis/auth.api";
import { getToken } from "../../utils/localStorageService";

export default function useAuth() {
  const [authContext, setAuthContext] = useState({
    isAuth: false,
    user: {
      email: "",
      fullname: "",
      address: "",
      phoneNumber: "",
      avatar: "",
      dateOfBirth: "",
      plan: "",
      permission: "",
      metadata: {
        key: "",
        value: "",
      },
      private_metadata: {
        key: "",
        value: "",
      },
      isActive: false,
    },
  });

  const refreshToken = {
    refreshToken: getToken().refreshToken,
  };

  useEffect(() => {
    let isMounting = true;
    (async function getDetail() {
      try {
        await currentUserDetailApi(refreshToken).then((data) => {
          if (isMounting) setAuthContext({ isAuth: true, user: data });
          console.log(data);
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })();
    return () => (isMounting = false);
  }, []);

  return authContext;
}
