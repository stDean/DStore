import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  getBlog,
  getBlogs,
} from "./blogService";

const initialState = {
  blogs: [],
  blog: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const Blogs = createAsyncThunk(
  "blog/get-blogs",
  async (_, { rejectWithValue }) => {
    try {
      return await getBlogs();
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const singleBlog = createAsyncThunk(
  "blog/get-blog",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await getBlog({ id });
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const resetState = createAction("reset");

export const blogsSlice = createSlice({
  name: "blog",
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(resetState, () => initialState)
      .addCase(Blogs.pending, state => {
        state.isLoading = true;
      })
      .addCase(Blogs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = payload;
        state.message = "success";
      })
      .addCase(Blogs.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
      })
      .addCase(singleBlog.pending, state => {
        state.isLoading = true;
      })
      .addCase(singleBlog.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blog = payload;
        state.message = "single blog";
      })
      .addCase(singleBlog.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
      });
  },
});

export default blogsSlice.reducer;
