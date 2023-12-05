import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  createBLogPost,
  deleteBlog,
  editBlog,
  getBlog,
  getBlogs,
} from "./blogService";

const initialState = {
  blogs: [],
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

export const createBlog = createAsyncThunk(
  "blog/create-blog",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      return await createBLogPost({ data, token });
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
      return await getBlog(id);
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

export const editBlogs = createAsyncThunk(
  "blog/edit-blog",
  async ({ token, data, id }, { rejectWithValue }) => {
    try {
      return await editBlog({ data, token, id });
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

export const deleteBlogs = createAsyncThunk(
  "blog/delete-blog",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      return await deleteBlog({ token, id });
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
        state.blogs = [];
        state.message = payload;
      })
      .addCase(createBlog.pending, state => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = payload;
        state.message = "success";
      })
      .addCase(createBlog.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blogs = [];
        state.message = payload;
      })
      .addCase(singleBlog.pending, state => {
        state.isLoading = true;
      })
      .addCase(singleBlog.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = payload;
        state.message = "single blog";
      })
      .addCase(singleBlog.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blogs = [];
        state.message = payload;
      })
      .addCase(editBlogs.pending, state => {
        state.isLoading = true;
      })
      .addCase(editBlogs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = payload;
        state.message = "updated";
      })
      .addCase(editBlogs.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blogs = [];
        state.message = payload;
      })
      .addCase(deleteBlogs.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteBlogs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = payload;
        state.message = "deleted";
      })
      .addCase(deleteBlogs.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blogs = [];
        state.message = payload;
      });
  },
});

export default blogsSlice.reducer;
