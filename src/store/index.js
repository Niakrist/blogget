import { tokenMiddleaware, tokenReducer } from "./tokenReducer";
import { commentReducer } from "./commentReducer";

import { authReducer } from "./auth/authReducer";
import { postsReducer } from "./posts/postsReducer";
import postsSlice from "./posts/postsSlice";
import commentSlice from "./comment/commentSlice.js";
import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./search/searchReducer.js";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga.js";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    comment: commentReducer,
    auth: authReducer,
    posts: postsSlice,
    comments: commentSlice,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleaware, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
