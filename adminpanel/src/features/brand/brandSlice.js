import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  createBrand,
  deleteBrand,
  editBrand,
  getBrand,
  getBrands,
} from "./brandService";

const initialState = {
  brands: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const resetState = createAction("reset");

export const Brands = createAsyncThunk(
  "brand/get-brands",
  async (_, { rejectWithValue }) => {
    try {
      return await getBrands();
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

export const Brand = createAsyncThunk(
  "brand/get-brand",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await getBrand(id);
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

export const brandEdit = createAsyncThunk(
  "brand/edit-brand",
  async ({ token, data, id }, { rejectWithValue }) => {
    try {
      return await editBrand({ data, token, id });
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

export const brandDelete = createAsyncThunk(
  "brand/delete-brand",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      return await deleteBrand({ token, id });
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
      .addCase(resetState, () => initialState)
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
      })
      .addCase(Brand.pending, state => {
        state.isLoading = true;
      })
      .addCase(Brand.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = payload;
        state.message = "single brand";
      })
      .addCase(Brand.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.brands = [];
        state.message = payload;
      })
      .addCase(brandEdit.pending, state => {
        state.isLoading = true;
      })
      .addCase(brandEdit.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = payload;
        state.message = "updated";
      })
      .addCase(brandEdit.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.brands = [];
        state.message = payload;
      })
      .addCase(brandDelete.pending, state => {
        state.isLoading = true;
      })
      .addCase(brandDelete.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = payload;
        state.message = "deleted";
      })
      .addCase(brandDelete.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.brands = [];
        state.message = payload;
      });
  },
});

export default brandSlice.reducer;
