import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createColor,
  deleteColor,
  editColor,
  getColor,
  getColors,
} from "./colorService";

const initialState = {
  colors: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const Colors = createAsyncThunk(
  "color/get-colors",
  async (_, { rejectWithValue }) => {
    try {
      return await getColors();
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

export const createColors = createAsyncThunk(
  "color/create-color",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      return await createColor({ data, token });
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

export const singleColor = createAsyncThunk(
  "color/get-color",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await getColor({ id });
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

export const editColors = createAsyncThunk(
  "color/edit-color",
  async ({ token, data, id }, { rejectWithValue }) => {
    try {
      return await editColor({ data, token, id });
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

export const deleteColors = createAsyncThunk(
  "color/delete-color",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      return await deleteColor({ token, id });
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

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(Colors.pending, state => {
        state.isLoading = true;
      })
      .addCase(Colors.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = payload;
        state.message = "success";
      })
      .addCase(Colors.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colors = [];
        state.message = payload;
      })
      .addCase(createColors.pending, state => {
        state.isLoading = true;
      })
      .addCase(createColors.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = payload;
        state.message = "success";
      })
      .addCase(createColors.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colors = [];
        state.message = payload;
      })
      .addCase(singleColor.pending, state => {
        state.isLoading = true;
      })
      .addCase(singleColor.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = payload;
        state.message = "single color";
      })
      .addCase(singleColor.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colors = [];
        state.message = payload;
      })
      .addCase(editColors.pending, state => {
        state.isLoading = true;
      })
      .addCase(editColors.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = payload;
        state.message = "updated";
      })
      .addCase(editColors.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colors = [];
        state.message = payload;
      })
      .addCase(deleteColors.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteColors.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = payload;
        state.message = "deleted";
      })
      .addCase(deleteColors.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colors = [];
        state.message = payload;
      });
  },
});

export default colorSlice.reducer;
