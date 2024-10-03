import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_API } from "../../api/const";

export const postsRequestAsync = createAsyncThunk(
  "posts/fetch",
  async (newPage, thunkAPI) => {
    let page = thunkAPI.getState().posts.page;
    const { token } = thunkAPI.getState().token;

    const after = thunkAPI.getState().posts.after;
    const loading = thunkAPI.getState().posts.loading;
    const isLast = thunkAPI.getState().posts.isLast;
    if (!token) return;
    if (!token || loading || isLast) return;
    try {
      const response = await axios.get(
        `${URL_API}/${page}?limit=8${after ? "&after=" + after : ""}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

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
      }
    } catch (error) {
      return error;
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
    after: "",
    isLast: false,
    page: "",
  },
  reducers: {},
  extraReducers: {},
});
