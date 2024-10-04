import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_API } from "../../api/const";

export const postsSlice = createSlice({
  name: "posts2",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
    after: "",
    isLast: false,
    page: "",
  },
  reducers: {
    setNewPage: (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = null;
      state.after = "";
      state.isLast = false;
      state.page = action.payload;
    },
    addPosts: (state, action) => {
      state.data = [...state.data, ...action.payload.bestPostsData];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postsRequestAsync2.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isLast = false;
      })
      .addCase(postsRequestAsync2.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.bestPostsData;
        state.error = null;
        state.after = action.payload.data.after;
        state.isLast = !action.after;
        state.page = action.payload.page;
      })
      .addCase(postsRequestAsync2.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.payload;
        state.after = "";
        state.isLast = "";
        state.page = "";
      });
  },
});

export const postsRequestAsync2 = createAsyncThunk(
  "posts2/fetch",
  async (neWpage, thunkAPI) => {
    let { token } = thunkAPI.getState().token;
    let { after, loading, isLast, page } = thunkAPI.getState().posts;
    const oldPost = thunkAPI.getState().posts.data;

    if (neWpage) {
      page = neWpage;
      thunkAPI.dispatch(postsSlice.actions.setNewPage(page));
    }

    if (!page || !token || loading || isLast) return;

    try {
      const response = await axios.get(
        `${URL_API}/best?limit=8${after ? "&after=" + after : ""}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      const { data } = await response.data;

      let bestPostsData = [];
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
          return { bestPostsData, data, page };
        } else {
          bestPostsData = [...oldPost, ...bestPostsData];
          return { bestPostsData, data, page };
        }
      }
    } catch (error) {
      return error;
    }
  }
);

export const { setNewPage } = postsSlice.actions;

export default postsSlice.reducer;
