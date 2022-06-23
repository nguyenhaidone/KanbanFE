import axios from "axios";
import { getToken } from "../../utils/localStorageService";
import { API_ROUTE } from "../../utils/constants";

export const createNewCardApi = async (body) => {
  const request = await axios.post(`${API_ROUTE}/v1/cards`, body, {
    headers: {
      x_authorization: getToken().accessToken,
    },
  });
  console.log(request.data.data);
  return request.data.data;
};

export const updateCardApi = async (body, id) => {
  const request = await axios.put(`${API_ROUTE}/v1/cards/${id}`, body, {
    headers: {
      x_authorization: getToken().accessToken,
    },
  });
  console.log(request.data.data);
  return request.data.data;
};
