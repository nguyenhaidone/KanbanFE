import axios from "axios";
import { API_ROUTE } from "../../utils/constants";
import { getToken } from "../../utils/localStorageService";

export const boardDetailApi = async (id) => {
  const request = await axios.get(`${API_ROUTE}/v1/boards/${id}`, {
    headers: {
      x_authorization: getToken().accessToken,
    },
  });
  console.log(request.data.data);
  return request.data.data;
};

export const updateBoardApi = async (id, body) => {
  const request = await axios.put(`${API_ROUTE}/v1/boards/${id}`, body, {
    headers: {
      x_authorization: getToken().accessToken,
    },
  });
  console.log(request.data.data);
  return request.data.data;
};

export const createNewBoardApi = async (body) => {
  const request = await axios.post(`${API_ROUTE}/v1/boards`, body, {
    headers: {
      x_authorization: getToken().accessToken,
    },
  });
  console.log(request.data.data);
  return request.data.data;
};

export const getBoardOfCurrentUserApi = async () => {
  const request = await axios.get(`${API_ROUTE}/v1/boards`, {
    headers: {
      x_authorization: getToken().accessToken,
    },
  });
  console.log(request.data.data);
  return request.data.data;
};

export const addNewMemberApi = async (body, boardId) => {
  const request = await axios.put(
    `${API_ROUTE}/v1/boards/add-new-user/${boardId}`,
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

export const getListBoardJoinedOfCurrentUser = async () => {
  const request = await axios.get(
    `${API_ROUTE}/v1/boards/get-list-board-joined-by-current-user`,
    {
      headers: {
        x_authorization: getToken().accessToken,
      },
    }
  );
  console.log(request.data.data);
  return request.data.data;
}
