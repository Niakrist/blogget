import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_API } from "../../api/const";

export const postsRequestAsync2 = createAsyncThunk(
  "posts2/fetch",
  async (neWpage, thunkAPI) => {
    let { page } = thunkAPI.getState().posts;

    if (neWpage) {
      page = neWpage;
      thunkAPI.dispatch(postsSlice.actions.setNewPage(page));
    }

    let { token } = thunkAPI.getState().token;
    let { after, loading, isLast } = thunkAPI.getState().posts;
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

        return { bestPostsData, data, page };
      }
    } catch (error) {
      return error;
    }
  }
);

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
      state.data = [];
      state.isLoading = false;
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
        state.data = [...state.data, ...action.payload.bestPostsData];
        state.error = null;
        state.after = action.payload.data.after;
        state.isLast = !action.payload.data.after;
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

export const { setNewPage } = postsSlice.actions;

export default postsSlice.reducer;
