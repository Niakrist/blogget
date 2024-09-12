const UPDATE_COMMENT = "UPDATE_COMMENT";

const initionalState = {
  comment: "Привет редакс",
};

export const actionUpdateComment = (data) => {
  return { type: UPDATE_COMMENT, comment: data };
};

export const commentReducer = (state = initionalState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return { ...state, comment: action.comment };
    default:
      return state;
  }
};
