import axios from "axios";
import { API_ROUTE } from "../../utils/constants";
import { getToken } from "../../utils/localStorageService";

export const createNewColumnApi = async (body) => {
  const request = await axios.post(`${API_ROUTE}/v1/columns`, body, {
    headers: {
      x_authorization: getToken().accessToken,
    },
  });
  console.log(request.data.data);
  return request.data.data;
};

export const updateColumnApi = async (body, id) => {
  const request = await axios.put(`${API_ROUTE}/v1/columns/${id}`, body, {
    headers: {
      x_authorization: getToken().accessToken,
    },
  });
  console.log(request.data.data);
  return request.data.data;
};
