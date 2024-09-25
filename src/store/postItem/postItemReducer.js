import {
  POST_ITEM_DELETE,
  POST_ITEM_REQUEST,
  POST_ITEM_REQUEST_ERROR,
  POST_ITEM_REQUEST_SUCCESS,
} from "./postItemAction";

const initialState = {
  isLoading: true,
  data: [],
  error: null,
};

export const postItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ITEM_REQUEST:
      return {
        ...state,
        isLoading: true,
        data: [],
        error: null,
      };
    case POST_ITEM_REQUEST_SUCCESS:
      const el = {
        ...state,
        isLoading: false,
        data: action.data,
        error: null,
      };
      console.log("action.data: ", action.data);
      return el;
    case POST_ITEM_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        data: [],
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
