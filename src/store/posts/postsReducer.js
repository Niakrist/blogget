import {
  POST_DELETE,
  POSTS_CHANGE_PAGE,
  POSTS_REQUEST,
  POSTS_REQUEST_AFTER,
  POSTS_REQUEST_ERROR,
  POSTS_REQUEST_SUCCESS,
  POSTS_REQUEST_SUCCESS_AFTER,
} from "./postsAction";

const initialStat = {
  isLoading: false,
  data: [],
  error: null,
  after: "",
  isLast: false,
  page: "",
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
    case POSTS_REQUEST_SUCCESS_AFTER: {
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...action.data],
        error: null,
      };
    }
    case POSTS_REQUEST_AFTER: {
      return {
        ...state,
        isLoading: false,
        error: null,
        after: action.after,
        isLast: !action.after,
      };
    }
    case POSTS_REQUEST_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    case POSTS_CHANGE_PAGE:
      return {
        ...state,
        after: "",
        isLast: false,
        page: action.page,
      };
    case POST_DELETE: {
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
