import axios from "axios";
import { URL_API } from "../../api/const";

export const POSTS_REQUEST = "POSTS_REQUEST";
export const POSTS_REQUEST_SUCCESS = "POSTS_REQUEST_SUCCESS";
export const POSTS_REQUEST_SUCCESS_AFTER = "POSTS_REQUEST_SUCCESS_AFTER";
export const POSTS_REQUEST_AFTER = "POSTS_REQUEST_AFTER";
export const POSTS_REQUEST_ERROR = "POSTS_REQUEST_ERROR";
export const POST_DELETE = "POST_DELETE";

export const postsRequest = () => {
  return { type: POSTS_REQUEST };
};

export const postsRequestSuccess = (data) => {
  return { type: POSTS_REQUEST_SUCCESS, data };
};

export const postsRequestSuccessAfter = (data) => {
  return { type: POSTS_REQUEST_SUCCESS_AFTER, data };
};

export const postsRequestError = (error) => {
  return { type: POSTS_REQUEST_ERROR, error };
};

export const postsRequestAfter = (after) => {
  return { type: POSTS_REQUEST_AFTER, after };
};

export const postDelete = (id) => {
  return { type: POST_DELETE, id };
};

export const postsRequestAsync = () => (dispatch, getState) => {
  const { token } = getState().token;
  const after = getState().posts.after;
  const loading = getState().posts.loading;
  const isLast = getState().posts.isLast;

  if (!token || loading || isLast) return;

  dispatch(postsRequest());
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${URL_API}/best?limit=8${after ? "&after=" + after : ""}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      const { data } = response.data;

      dispatch(postsRequestAfter(data.after));

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

        if (!after) {
          dispatch(postsRequestSuccess(bestPostsData));
        } else {
          dispatch(postsRequestSuccessAfter(bestPostsData));
        }
      }
    } catch (error) {
      dispatch(postsRequestError(error));
    }
  };
  fetchPosts();
};
