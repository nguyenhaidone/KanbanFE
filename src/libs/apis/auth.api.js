import axios from "axios";
import { API_ROUTE } from "../../utils/constants";

export const loginApi = async (body) => {
  const request = await axios.post(`${API_ROUTE}/v1/auth/login`, body);
  console.log(request.data.data);
  return request.data.data;
};

export const registerApi = async (body) => {
  const request = await axios.post(`${API_ROUTE}/v1/auth/register`, body);
  console.log(request.data.data);
  return request.data.data;
};

export const refreshToken = async (body) => {
  const request = await axios.post(`${API_ROUTE}/v1/auth/login`, body);
  console.log(request.data.data);
  return request.data.data;
};

export const socialLoginApi = async (body) => {
  const request = await axios.post(`${API_ROUTE}/v1/auth/social-login`, body);
  console.log(request.data.data);
  return request.data.data;
};
