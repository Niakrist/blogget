import {
  SEARCH_REQUEST,
  SEARCH_REQUEST_ERROR,
  SEARCH_REQUEST_SUCCESS,
} from "./searchAction";

const initialState = {
  isLoading: false,
  posts: [],
  after: "",
  error: null,
  isLast: false,
  page: "",
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case SEARCH_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.posts,
        error: null,
        after: action.after,
        isLast: !action.after,
      };
    case SEARCH_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        posts: [],
        error: action.error,
      };
    default:
      return state;
  }
};
