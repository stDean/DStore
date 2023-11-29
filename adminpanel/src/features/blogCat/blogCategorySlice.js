import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBlogCategory } from "./blogCategoryService";

const initialState = {
  blogCategories: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const blogCategory = createAsyncThunk(
  "blog-category/get-blogCategory",
  async (_, { rejectWithValue }) => {
    try {
      return await getBlogCategory();
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

export const blogCategorySlice = createSlice({
  name: "customer",
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(blogCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(blogCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogCategories = payload;
        state.message = "success";
      })
      .addCase(blogCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blogCategories = [];
        state.message = payload;
      });
  },
});

export default blogCategorySlice.reducer;
