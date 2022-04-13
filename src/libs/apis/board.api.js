import axios from "axios";
import { API_ROUTE } from "../../utils/constants";

export const boardDetailApi = async (id) => {
  const request = await axios.get(`${API_ROUTE}/v1/boards/${id}`);
  console.log(request.data.data);
  return request.data.data;
};
