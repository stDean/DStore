import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createBrand, getBrands } from "./brandService";

const initialState = {
  brands: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const Brands = createAsyncThunk(
  "brand/get-brands",
  async (token, { rejectWithValue }) => {
    try {
      return await getBrands(token);
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

export const createBrands = createAsyncThunk(
  "brand/create-brand",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      return await createBrand({ data, token });
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

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(Brands.pending, state => {
        state.isLoading = true;
      })
      .addCase(Brands.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = payload;
        state.message = "success";
      })
      .addCase(Brands.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.brands = [];
        state.message = payload;
      })
      .addCase(createBrands.pending, state => {
        state.isLoading = true;
      })
      .addCase(createBrands.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = payload;
        state.message = "success";
      })
      .addCase(createBrands.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.brands = [];
        state.message = payload;
      });
  },
});

export default brandSlice.reducer;
