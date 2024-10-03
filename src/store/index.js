import { tokenMiddleaware, tokenReducer } from "./tokenReducer";
import { commentReducer } from "./commentReducer";

import { authReducer } from "./auth/authReducer";
import { postsReducer } from "./posts/postsReducer";
import { postItemReducer } from "./postItem/postItemReducer";
import commentSlice from "./comment/commentSlice.js";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    comment: commentReducer,
    auth: authReducer,
    posts: postsReducer,
    comments: commentSlice,
    // postItem: postItemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleaware),
});

// export const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(tokenMiddleaware, thunk))
// );
