import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_API } from "../../api/const";

export const commentsSliceAsync = createAsyncThunk(
  "comments/fetch",
  async (id, thunkAPI) => {
    console.log("++++");

    const { token } = thunkAPI.getState().token;

    if (!token) return;
    try {
      let post = {};
      const comments = [];
      const response = await axios.get(`${URL_API}/comments/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      const { data } = response.data[0];

      console.log("data: ", data);

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
      return [post, comments];
    } catch (error) {
      console.log(`Перехват ошибки: ${error}`);
      return { error: error.toString() };
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    isLoading: true,
    data: [],
    error: null,
  },
  reducers: {
    commentRequest: (state) => {
      state.isLoading = true;
      state.data = [];
      state.error = null;
    },
    commentRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.error = null;
    },
    commentRequestError: (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(commentsSliceAsync.pending, (state) => {
        console.log("pending: ", state);
        state.isLoading = true;
        state.data = [];
        state.error = null;
      })
      .addCase(commentsSliceAsync.fulfilled, (state, action) => {
        console.log("fulfilled: ", action.payload);
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(commentsSliceAsync.rejected, (state, action) => {
        console.log("rejected: ", action);
        state.isLoading = false;
        state.data = [];
        state.error = action.payload.message;
      });
  },
});

export const { commentRequest, commentRequestSuccess, commentRequestError } =
  commentSlice.actions;

export default commentSlice.reducer;
