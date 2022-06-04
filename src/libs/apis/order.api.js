import axios from "axios";
import { API_ROUTE } from "../../utils/constants";
import { getToken, setToken, getEmail } from "../../utils/localStorageService";

export const createOrderApi = async (body) => {
  const request = await axios.post(`${API_ROUTE}/v1/order`, body, {
    headers: {
      x_authorization: getToken().accessToken,
    },
  });
  console.log(request);
  return request.data.data;
};

export const listOrderBuyUserApi = async () => {
  const request = await axios.get(`${API_ROUTE}/v1/order/list-order`, {
    headers: {
      x_authorization: getToken().accessToken,
    },
  });
  return request.data.data;
};
