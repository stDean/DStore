import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToWishList, getProducts, getWishList } from "./productService";

const initialState = {
  products: [],
  userWishList: [],
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

export const addWishList = createAsyncThunk(
  "wish/add-wish",
  async ({ productId, token }, { rejectWithValue }) => {
    try {
      return await addToWishList({ productId, token });
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

export const getUserWishList = createAsyncThunk(
  "wish/get-wish",
  async ({ token }, { rejectWithValue }) => {
    try {
      return await getWishList({ token });
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(Products.pending, state => {
        state.isLoading = true;
      })
      .addCase(Products.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = payload;
      })
      .addCase(Products.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.products = [];
        state.message = payload;
      })
      .addCase(addWishList.pending, state => {
        state.isLoading = true;
      })
      .addCase(addWishList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Product added to wishlist";
      })
      .addCase(addWishList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Something went wrong";
      })
      .addCase(getUserWishList.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUserWishList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userWishList = payload.wishlist;
        state.message = "Product added to wishlist";
      })
      .addCase(getUserWishList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Something went wrong";
      });
  },
});

export default productSlice.reducer;
