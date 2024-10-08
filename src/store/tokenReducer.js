import { setToken } from "../api/token";

const UPDATE_TOKEN = "UPDATE_TOKEN";
const DELETE_TOKEN = "DELETE_TOKEN";

const initionalState = {
  token: "",
};

export const actionUpdateToken = (token) => {
  return { type: UPDATE_TOKEN, token };
};

export const actionDeleteToken = () => {
  localStorage.removeItem("bearer");
  return { type: DELETE_TOKEN };
};

export const tokenMiddleaware = (store) => (next) => (action) => {
  if (action.type === UPDATE_TOKEN) {
    setToken(action.token);
  }

  if (action.type === DELETE_TOKEN) {
    setToken("");
  }
  next(action);
};

export const tokenReducer = (state = initionalState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return { ...state, token: action.token };
    case DELETE_TOKEN:
      return { ...state, token: "" };
    default:
      return state;
  }
};
