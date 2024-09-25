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
    dispatch(postItemRequest());
    try {
      let post = {};
      const comments = [];
      const response = await axios.get(`${URL_API}/comments/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      const { data } = response.data[0];

      for (const item of response.data[1].data.children) {
        if (item.data.id && item.data.author && item.data.created) {
          comments.push({
            idComment: item.data.id,
            authorComment: item.data.author,
            textComment: item.data.body,
            createdComment: item.data.created,
            upsComment: item.data.ups,
          });
        }
      }

      post = {
        id: data.children[0].data.id,
        title: data.children[0].data.title,
        author: data.children[0].data.author,
        markdown: data.children[0].data.selftext,
      };

      dispatch(postItemRequestSuccess([post, comments]));
    } catch (error) {
      console.log(`Перехват ошибки: ${error}`);
      dispatch(postItemRequestError(error));
    }
  };
  fetchPostIten();
};
