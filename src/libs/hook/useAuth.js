import { useState, useEffect } from "react";
import { currentUserDetailApi } from "../../libs/apis/auth.api";
import { getToken } from "../../utils/localStorageService";

export default function useAuth() {
  const [authContext, setAuthContext] = useState({
    isAuth: false,
    user: {
      _id: "",
      email: "",
      fullname: "",
      address: "",
      phoneNumber: "",
      avatar: "",
      dateOfBirth: "",
      plan: "",
      metadata: {
        key: "",
        value: "",
      },
      private_metadata: {
        key: "",
        value: "",
      },
      isActive: false,
      extensionDate: "",
      permission: "",
      profession: "",
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
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })();
    return () => (isMounting = false);
  }, []);

  return authContext;
}
