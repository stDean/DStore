import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCoupon,
  deleteCoupon,
  editCoupon,
  getCoupon,
  getCoupons,
} from "./couponService";

const initialState = {
  coupons: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const Coupons = createAsyncThunk(
  "brand/get-coupons",
  async (token, { rejectWithValue }) => {
    try {
      return await getCoupons(token);
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

export const createCoupons = createAsyncThunk(
  "coupon/create-coupon",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      return await createCoupon({ data, token });
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

export const singleCoupon = createAsyncThunk(
  "blog-cat/get-blog-cat",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await getCoupon({ id, token });
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

export const editCoupons = createAsyncThunk(
  "blog-cat/edit-blog-cat",
  async ({ token, data, id }, { rejectWithValue }) => {
    try {
      return await editCoupon({ data, token, id });
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

export const deleteCoupons = createAsyncThunk(
  "blog-cat/delete-blog-cat",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      return await deleteCoupon({ token, id });
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

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(Coupons.pending, state => {
        state.isLoading = true;
      })
      .addCase(Coupons.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = payload;
        state.message = "success";
      })
      .addCase(Coupons.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.coupons = [];
        state.message = payload;
      })
      .addCase(createCoupons.pending, state => {
        state.isLoading = true;
      })
      .addCase(createCoupons.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = payload;
        state.message = "created";
      })
      .addCase(createCoupons.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.coupons = [];
        state.message = payload;
      })
      .addCase(singleCoupon.pending, state => {
        state.isLoading = true;
      })
      .addCase(singleCoupon.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = payload;
        state.message = "single coupon";
      })
      .addCase(singleCoupon.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.coupons = [];
        state.message = payload;
      })
      .addCase(editCoupons.pending, state => {
        state.isLoading = true;
      })
      .addCase(editCoupons.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = payload;
        state.message = "updated";
      })
      .addCase(editCoupons.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.coupons = [];
        state.message = payload;
      })
      .addCase(deleteCoupons.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteCoupons.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coupons = payload;
        state.message = "deleted";
      })
      .addCase(deleteCoupons.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.coupons = [];
        state.message = payload;
      });
  },
});

export default couponSlice.reducer;
