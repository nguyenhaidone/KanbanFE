import axios from "axios";
import { API_ROUTE } from "../../utils/constants";
import { getToken } from "../../utils/localStorageService";

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
  const request = await axios.post(`${API_ROUTE}/v1/auth/login`, body);
  // console.log(request.data.data);
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

export const currentUserDetailApi = async () => {
  try {
    const request = await axios.get(
      `${API_ROUTE}/v1/auth/current-user-detail`,
      {
        headers: {
          x_authorization: getToken().accessToken,
        },
      }
    );
    console.log(request.data.data);
    return request.data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
