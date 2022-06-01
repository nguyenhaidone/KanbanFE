import axios from "axios";
import { API_ROUTE } from "../../utils/constants";
import { getToken, setToken, getEmail } from "../../utils/localStorageService";

export const loginApi = async (body) => {
  const request = await axios.post(`${API_ROUTE}/v1/auth/login`, body);
  // console.log(request.data.data);
  return request.data.data;
};

export const registerApi = async (body) => {
  const request = await axios.post(`${API_ROUTE}/v1/auth/register`, body);
  // console.log(request.data.data);
  return request.data.data;
};

export const refreshToken = async (body) => {
  const request = await axios.post(`${API_ROUTE}/v1/auth/refresh-token`, body, {
    headers: {
      x_authorization: getToken().accessToken,
    },
  });
  return request.data.data;
};

export const socialLoginApi = async (body) => {
  const request = await axios.post(`${API_ROUTE}/v1/auth/social-login`, body);
  console.log(request.data.data);
  return request.data.data;
};

export const userDetailApi = async (email) => {
  const request = await axios.get(`${API_ROUTE}/v1/auth/user-detail/${email}`, {
    headers: {
      x_authorization: getToken().accessToken,
    },
  });
  // console.log(request.data.data);
  return request.data.data;
};

export const currentUserDetailApi = async (refreshToken) => {
  try {
    const request = await axios.get(
      `${API_ROUTE}/v1/auth/current-user-detail`,
      {
        headers: {
          x_authorization: getToken().accessToken,
        },
      }
    );
    // console.log(request.data.data);
    return request.data.data;
  } catch (error) {
    try {
      const getNewToken = await axios.post(
        `${API_ROUTE}/v1/auth/refresh-token`,
        refreshToken,
        {
          headers: {
            x_authorization: getToken().accessToken,
          },
        }
      );
      const request = await axios.get(
        `${API_ROUTE}/v1/auth/current-user-detail`,
        {
          headers: {
            x_authorization: getNewToken.data.data,
          },
        }
      );
      return request.data.data;
    } catch (error) {
      throw new Error(error);
    }
  }
};

export const handleSendVerifyCode = async (verifyCode) => {
  const body = {
    email: getEmail(),
    verifyCode: verifyCode,
  };

  const request = await axios.post(`${API_ROUTE}/v1/auth/verify-code`, body);

  // console.log(request);
  return request.data.data;
};

export const updateUserInfo = async (body) => {
  const request = await axios.put(
    `${API_ROUTE}/v1/auth/update-user-info`,
    body,
    {
      headers: {
        x_authorization: getToken().accessToken,
      },
    }
  );
  console.log(request.data.data);
  return request.data.data;
};
