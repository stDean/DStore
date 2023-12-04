import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteProdCat,
  editProdCat,
  getProdCat,
  getProductCategory,
} from "./categoryService";

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

export const singleProdCat = createAsyncThunk(
  "prod-cat/get-prod-cat",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await getProdCat({ id });
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

export const editProdCats = createAsyncThunk(
  "prod-cat/edit-prod-cat",
  async ({ token, data, id }, { rejectWithValue }) => {
    try {
      return await editProdCat({ data, token, id });
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

export const deleteProdCats = createAsyncThunk(
  "prod-cat/delete-prod-cat",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      return await deleteProdCat({ token, id });
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
      })
      .addCase(singleProdCat.pending, state => {
        state.isLoading = true;
      })
      .addCase(singleProdCat.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productCategories = payload;
        state.message = "single prod cat";
      })
      .addCase(singleProdCat.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.productCategories = [];
        state.message = payload;
      })
      .addCase(editProdCats.pending, state => {
        state.isLoading = true;
      })
      .addCase(editProdCats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productCategories = payload;
        state.message = "updated";
      })
      .addCase(editProdCats.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.productCategories = [];
        state.message = payload;
      })
      .addCase(deleteProdCats.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteProdCats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productCategories = payload;
        state.message = "deleted";
      })
      .addCase(deleteProdCats.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.productCategories = [];
        state.message = payload;
      });
  },
});

export default productCategorySlice.reducer;
