import { combineReducers, createStore, applyMiddleware } from "redux";

import { composeWithDevTools } from "@redux-devtools/extension";
import { tokenMiddleaware, tokenReducer } from "./tokenReducer";
import { commentReducer } from "./commentReducer";

import { thunk } from "redux-thunk";
import { authReducer } from "./auth/authReducer";

const rootReducer = combineReducers({
  token: tokenReducer,
  comment: commentReducer,
  auth: authReducer,
});

const logger = (store) => (next) => (action) => {
  console.log(action);
  next(action);
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(tokenMiddleaware, thunk))
);
