import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteImg, uploadImg } from "./uploadService";

const initialState = {
  images: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const imageUpload = createAsyncThunk(
  "product/upload-image",
  async ({ token, data }, thunkApi) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadImg({ data: formData, token });
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.msg) {
        return thunkApi.rejectWithValue(error.response.data.msg);
      } else {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  }
);

export const deleteImage = createAsyncThunk(
  "product/delete-image",
  async ({ token, id }, thunkApi) => {
    try {
      return await deleteImg({ id, token });
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.msg) {
        return thunkApi.rejectWithValue(error.response.data.msg);
      } else {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  }
);

export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(imageUpload.pending, state => {
        state.isLoading = true;
      })
      .addCase(imageUpload.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.images = payload;
        state.message = "success";
      })
      .addCase(imageUpload.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.images = [];
        state.message = payload;
      })
      .addCase(deleteImage.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteImage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.images = payload;
        state.message = "success";
      })
      .addCase(deleteImage.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.images = [];
        state.message = payload;
      });
  },
});

export default imageSlice.reducer;
