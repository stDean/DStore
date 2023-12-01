import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, getProducts } from "./productService";

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const Products = createAsyncThunk(
  "product/get-products",
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
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

export const createProducts = createAsyncThunk(
  "product/create-product",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      return await createProduct({ data, token });
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

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(Products.pending, state => {
        state.isLoading = true;
      })
      .addCase(Products.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = payload;
        state.message = "success";
      })
      .addCase(Products.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.products = [];
        state.message = payload;
      })
      .addCase(createProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = payload;
        state.message = "success";
      })
      .addCase(createProducts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.products = [];
        state.message = payload;
      });
  },
});

export default productSlice.reducer;
