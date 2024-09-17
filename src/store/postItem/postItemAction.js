import axios from "axios";
import { URL_API } from "../../api/const";

export const POST_ITEM_REQUEST = "POST_ITEM_REQUEST";
export const POST_ITEM_REQUEST_SUCCESS = "POST_ITEM_REQUEST_SUCCESS";
export const POST_ITEM_REQUEST_ERROR = "POST_ITEM_REQUEST_ERROR";
export const POST_ITEM_DELETE = "POST_ITEM_DELETE";

export const postItemRequest = () => {
  return { type: POST_ITEM_REQUEST };
};

export const postItemRequestSuccess = (data) => {
  return { type: POST_ITEM_REQUEST_SUCCESS, data };
};

export const postItemRequestError = (error) => {
  return { type: POST_ITEM_REQUEST_ERROR, error };
};

export const postItemDelete = (id) => {
  return { type: POST_ITEM_DELETE, id };
};

export const postItemRequestAsunc = (id) => (dispatch, getState) => {
  const { token } = getState().token;
  if (!token) return;
  const fetchPostIten = async () => {
    const response = await axios.get(`${URL_API}/comments/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    dispatch(postItemRequestSuccess(response.data));
  };
  fetchPostIten();
};
