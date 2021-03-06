import axios from "axios";
import { API_ROUTE } from "../../utils/constants";
import { getToken } from "../../utils/localStorageService";

export const boardDetailApi = async (id) => {
  const request = await axios.get(`${API_ROUTE}/v1/boards/${id}`, {
    headers: {
      x_authorization: getToken().accessToken,
    },
  });
  // console.log(request.data.data);
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
};

export const updateBoardHistory = async (boardId, message) => {
  const request = await axios.put(
    `${API_ROUTE}/v1/boards/message/${boardId}`,
    message,
    {
      headers: {
        x_authorization: getToken().accessToken,
      },
    }
  );
  console.log(request.data.data);
  return request.data.data;
};

export const removeCurrentUserApi = async (boardId) => {
  const request = await axios.put(
    `${API_ROUTE}/v1/boards/remove-current-user/${boardId}`,
    {},
    {
      headers: {
        x_authorization: getToken().accessToken,
      },
    }
  );
  console.log(request.data.data);
  return request.data.data;
};

export const removeMemberByCreaterApi = async (boardId, email) => {
  const request = await axios.put(
    `${API_ROUTE}/v1/boards/remove-current-user-by-creater/${boardId}`,
    {
      member: email,
    },
    {
      headers: {
        x_authorization: getToken().accessToken,
      },
    }
  );
  console.log(request.data.data);
  return request.data.data;
};

export const addNewPeopleToBlackListApi = async (boardId, email) => {
  const request = await axios.put(
    `${API_ROUTE}/v1/boards/add-new-user-to-blackList/${boardId}`,
    {
      email: email,
    },
    {
      headers: {
        x_authorization: getToken().accessToken,
      },
    }
  );
  console.log(request.data.data);
  return request.data.data;
};

export const removePeopleFromBlackListApi = async (boardId, email) => {
  const request = await axios.put(
    `${API_ROUTE}/v1/boards/remove-user-from-blackList/${boardId}`,
    {
      email: email,
    },
    {
      headers: {
        x_authorization: getToken().accessToken,
      },
    }
  );
  console.log(request.data.data);
  return request.data.data;
};
