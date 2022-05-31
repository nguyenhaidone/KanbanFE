export const messageUpdateCreateBoard = (name, board) => {
  return {
    message: {
      timestamp: new Date(),
      username: name,
      messageInfo: "messageUpdateCreateBoard",
      board: board,
    },
  };
};

export const messageUpdateBoardInfo = (name, board) => {
  return {
    message: {
      timestamp: new Date(),
      username: name,
      messageInfo: "messageUpdateBoardInfo",
      board: board,
    },
  };
};

export const messageUpdateColumnOrder = (name, board, column) => {
  return {
    message: {
      timestamp: new Date(),
      username: name,
      messageInfo: "messageUpdateColumnOrder",
      board: board,
      column: column,
    },
  };
};

export const messageUpdateCardStatus = (name, board, card) => {
  return {
    message: {
      timestamp: new Date(),
      username: name,
      messageInfo: "messageUpdateCardStatus",
      board: board,
      card: card,
    },
  };
};

export const messageAddNewMemberStatus = (name, member) => {
  return {
    message: {
      timestamp: new Date(),
      username: name,
      messageInfo: "messageAddNewMemberStatus",
      member: member,
    },
  };
};

export const messageDeleteMember = (name, member) => {
  return {
    message: {
      timestamp: new Date(),
      username: name,
      messageInfo: "messageDeleteMember",
      member: member,
    },
  };
};

export const messageDeleteColumn = (name, column) => {
  return {
    message: {
      timestamp: new Date(),
      username: name,
      messageInfo: "messageDeleteColumn",
      column: column,
    },
  };
};

export const messageCreateColumn = (name, column) => {
  return {
    message: {
      timestamp: new Date(),
      username: name,
      messageInfo: "messageCreateColumn",
      column: column,
    },
  };
};

export const messageCreateCard = (name, card) => {
  return {
    message: {
      timestamp: new Date(),
      username: name,
      messageInfo: "messageCreateCard",
      card: card,
    },
  };
};
