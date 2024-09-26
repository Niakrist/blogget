import axios from "axios";
import { URL_API } from "../../api/const";

export const POSTS_REQUEST = "POSTS_REQUEST";
export const POSTS_REQUEST_SUCCESS = "POSTS_REQUEST_SUCCESS";
export const POSTS_REQUEST_ERROR = "POSTS_REQUEST_ERROR";
export const POST_DELETE = "POST_DELETE";

export const postsRequest = () => {
  return { type: POSTS_REQUEST };
};

export const postsRequestSuccess = (data) => {
  return { type: POSTS_REQUEST_SUCCESS, data };
};
export const postsRequestError = (error) => {
  return { type: POSTS_REQUEST_ERROR, error };
};

export const postDelete = (id) => {
  return { type: POST_DELETE, id };
};

export const postsRequestAsync = () => (dispatch, getState) => {
  const { token } = getState().token;

  if (!token) return;
  dispatch(postsRequest());
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${URL_API}/best`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      const { data } = response.data;

      const bestPostsData = [];
      if (data.children) {
        for (const item of data.children) {
          bestPostsData.push({
            id: item.data.id,
            author: item.data.author,
            // created: item.data.created,
            createdUtc: item.data.created_utc,
            // postHint: item.data.post_hint,
            // score: item.data.score,
            ups: item.data.ups,
            markdown: item.data.selftext,
            title: item.data.title,
            thumbnail: item.data.thumbnail,
          });
        }

        dispatch(postsRequestSuccess(bestPostsData));
      }
    } catch (error) {
      dispatch(postsRequestError(error));
    }
  };
  fetchPosts();
};
