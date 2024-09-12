import { createStore } from "redux";
import { getToken } from "../api/token";

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

export const actionUpdateToken = (token) => {
  return { type: UPDATE_TOKEN, token };
};

export const actionDeleteToken = () => {
  localStorage.removeItem("bearer");
  return { type: DELETE_TOKEN };
};

const rootReducer = (state = initionalState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return { ...state, comment: action.comment };
    case UPDATE_TOKEN:
      console.log("UPDATE_TOKEN");
      return { ...state, token: action.token };
    case DELETE_TOKEN:
      console.log("DELETE_TOKEN");
      return { ...state, token: "" };
    default:
      return state;
  }
};

export const store = createStore(rootReducer);
