import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBrands } from "./brandService";

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

export const brandSlice = createSlice({
  name: "customer",
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
      });
  },
});

export default brandSlice.reducer;
