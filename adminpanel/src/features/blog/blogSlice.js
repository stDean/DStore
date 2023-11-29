import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBlogs } from "./blogService";

const initialState = {
  blogs: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const Blogs = createAsyncThunk(
  "blog-category/get-blogs",
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

export const blogsSlice = createSlice({
  name: "customer",
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
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
        state.blogs = [];
        state.message = payload;
      });
  },
});

export default blogsSlice.reducer;
