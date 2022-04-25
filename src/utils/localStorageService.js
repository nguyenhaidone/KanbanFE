import { LOCAL_STORAGE_KEY } from "../configurations/localStorageConfig";

export const setToken = (accessToken, refreshToken) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
  localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
};

export const getToken = () => {
  const tokenFromLocalStorage = {
    accessToken: localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN),
    refreshToken: localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN),
  };
  return tokenFromLocalStorage;
};

export const removeToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
};

export const checkAuth = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) &&
    localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN)
    ? true
    : false;
};
