import { createStore } from "redux";
import { getToken, setToken } from "../api/token";

const UPDATE_COMMENT = "UPDATE_COMMENT";
const UPDATE_TOKEN = "UPDATE_TOKEN";
const DELETE_TOKEN = "DELETE_TOKEN";

const initionalState = {
  comment: "Привет редакс",
  token: getToken(),
};

export const actionUpdateComment = (data) => {
  return { type: UPDATE_COMMENT, comment: data };
};

const rootReducer = (state = initionalState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return { ...state, comment: action.comment };
    case UPDATE_TOKEN:
      setToken(action.token);
      return { ...state, token: action.token };
    case DELETE_TOKEN:
      setToken("");
      return { ...state, token: "" };
    default:
      return state;
  }
};

export const store = createStore(rootReducer);
