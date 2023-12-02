import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCategory, getProductCategory } from "./categoryService";

const initialState = {
  productCategories: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const productCategory = createAsyncThunk(
  "product-category/get-productCategory",
  async (_, { rejectWithValue }) => {
    try {
      return await getProductCategory();
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

export const createCategories = createAsyncThunk(
  "category/create-category",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      return await createCategory({ data, token });
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

export const productCategorySlice = createSlice({
  name: "productCategory",
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(productCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(productCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productCategories = payload;
        state.message = "success";
      })
      .addCase(productCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.productCategories = [];
        state.message = payload;
      })
      .addCase(createCategories.pending, state => {
        state.isLoading = true;
      })
      .addCase(createCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productCategories = payload;
        state.message = "success";
      })
      .addCase(createCategories.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.productCategories = [];
        state.message = payload;
      });
  },
});

export default productCategorySlice.reducer;