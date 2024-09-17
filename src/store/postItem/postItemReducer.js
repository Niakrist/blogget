import {
  POST_ITEM_DELETE,
  POST_ITEM_REQUEST,
  POST_ITEM_REQUEST_ERROR,
  POST_ITEM_REQUEST_SUCCESS,
} from "./postItemAction";

const initialState = {
  isLoading: false,
  data: [],
  error: null,
};

export const postItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ITEM_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case POST_ITEM_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: null,
      };
    case POST_ITEM_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case POST_ITEM_DELETE:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: state.data.filter((item) => item.id !== action.id),
      };
    default:
      return {
        ...state,
      };
  }
};
