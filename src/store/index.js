import { combineReducers, createStore, applyMiddleware } from "redux";

import { composeWithDevTools } from "@redux-devtools/extension";
import { tokenMiddleaware, tokenReducer } from "./tokenReducer";
import { commentReducer } from "./commentReducer";

const rootReducer = combineReducers({
  token: tokenReducer,
  comment: commentReducer,
});

const logger = (store) => (next) => (action) => {
  console.log(action);
  next(action);
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(tokenMiddleaware))
);
