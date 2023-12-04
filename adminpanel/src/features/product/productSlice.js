import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, deleteProduct, editProduct, getProduct, getProducts } from "./productService";

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

export const singleProduct = createAsyncThunk(
  "product/get-product",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await getProduct({id});
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

export const editProducts = createAsyncThunk(
  "product/edit-product",
  async ({ token, data, id }, { rejectWithValue }) => {
    try {
      return await editProduct({ data, token, id });
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

export const deleteProducts = createAsyncThunk(
  "product/delete-product",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      return await deleteProduct({ token, id });
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
      })
      .addCase(singleProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(singleProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = payload;
        state.message = "single product";
      })
      .addCase(singleProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.products = [];
        state.message = payload;
      })
      .addCase(editProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(editProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = payload;
        state.message = "updated";
      })
      .addCase(editProducts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.products = [];
        state.message = payload;
      })
      .addCase(deleteProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = payload;
        state.message = "deleted";
      })
      .addCase(deleteProducts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.products = [];
        state.message = payload;
      });
  },
});

export default productSlice.reducer;
