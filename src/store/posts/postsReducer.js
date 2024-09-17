import {
  POST_DELETE,
  POSTS_REQUEST,
  POSTS_REQUEST_ERROR,
  POSTS_REQUEST_SUCCESS,
} from "./postsAction";

const initialStat = {
  isLoading: false,
  data: [],
  error: null,
};

export const postsReducer = (state = initialStat, action) => {
  switch (action.type) {
    case POSTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case POSTS_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: null,
      };
    }
    case POSTS_REQUEST_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    case POST_DELETE: {
      console.log("+++");
      return {
        ...state,
        data: state.data.filter((item) => {
          return item.id !== action.id;
        }),
        isLoading: false,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
};
